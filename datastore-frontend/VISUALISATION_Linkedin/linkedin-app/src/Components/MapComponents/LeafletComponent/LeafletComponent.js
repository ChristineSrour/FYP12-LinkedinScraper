import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from "axios";

const MapWithFilters = () => {
  const initialFilters = {
    location: 'All',
    major: 'All',
    graduationYear: 'All',
    company: 'All'
  };

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [personsInLocation, setPersonsInLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getAll');
        const data = await response.data;
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    closeSidebar();
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Extract unique location names from data
  const locationNames = [...new Set(data.map(person => person.location))];
  const majorCounts = countMajors(data);
  const sortedMajors = Object.keys(majorCounts).sort((a, b) => majorCounts[b] - majorCounts[a]);
  const uniqueYears = [...new Set(
      data.flatMap(person => person.education.filter(edu => edu.instituteName === "Saint Joseph University of Beirut").map(edu => edu.dates.slice(-4)))
  )]
      .sort((a, b) => b - a); // Sort in descending order
  const companyNames = [...new Set(data.flatMap(person => person.experience.map(work => work.company)))].sort();

  const filteredData = data.filter(person => {
    const hasOtherMajorFromStJoseph = person.education.some(edu => {
      return edu.major === 'Other' && edu.instituteName === "Saint Joseph University of Beirut";
    });

    const hasNonOtherMajorFromStJoseph = person.education.some(edu => {
      return edu.major !== 'Other';
    });


    return (filters.location === 'All' || person.location === filters.location) &&
        (filters.major === 'All' ||
            (filters.major === 'Other' && hasOtherMajorFromStJoseph && !hasNonOtherMajorFromStJoseph) ||
            (filters.major !== 'All' && filters.major !== 'Other' && person.education.some(edu => edu.major === filters.major && edu.instituteName === "Saint Joseph University of Beirut"))) &&
        (filters.graduationYear === 'All' ||
            person.education.some(edu => {
              const lastFourDigits = edu.dates.slice(-4);
              return lastFourDigits === filters.graduationYear && edu.instituteName === "Saint Joseph University of Beirut";
            })
        ) &&
        (filters.company === 'All' || person.experience.some(work => work.company === filters.company && work.dates.includes('Present')));
  });

  const openSidebar = (location) => {
    setSelectedLocation(location);
    setSidebarOpen(true);
    setPersonsInLocation(filteredData.filter(person => person.location === location));
  };

  const closeSidebar = () => {
    setSelectedLocation(null);
    setSidebarOpen(false);
    setPersonsInLocation([]);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div>
        <div className="TextInput">
          <div className="totalPercen">
            <div>
              Total:
            </div>
            <div className="total">
              {filteredData.length}
            </div>
            <div className="percen">
              {((filteredData.length / data.length) * 100).toFixed(2)} %
            </div>
          </div>
          <div className="filtersColumn">
            <div className="filtersRow">
              <label className="location">
                Location
                <select className="locationO" value={filters.location} onChange={(e) => handleFilterChange('location', e.target.value)}>
                  <option value="All">All</option>
                  {locationNames.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </label>

              <label className="major">
                Major
                <select className="majorO" value={filters.major} onChange={(e) => handleFilterChange('major', e.target.value)}>
                  <option value="All">All</option>
                  {sortedMajors.map((major, index) => (
                      <option key={index} value={major}>{major}</option>
                  ))}
                </select>
              </label>
              <label className="year">
                Graduation Year
                <select className="yearO" value={filters.graduationYear} onChange={(e) => handleFilterChange('graduationYear', e.target.value)}>
                  <option value="All">All</option>
                  {uniqueYears.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="company">
              Company
              <select className="companyO" value={filters.company} onChange={(e) => handleFilterChange('company', e.target.value)}>
                <option value="All">All</option>
                {companyNames.filter(company => data.some(person => person.experience.some(exp => exp.company === company && exp.dates.includes('Present')))).map((company, index) => (
                    <option key={index} value={company}>{company}</option>
                ))}
              </select>
            </label>
            <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
          </div>
        </div>
        <div className="mapSide">
          <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={true} style={{ height: '500px', width: '89.8%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filteredData.map(person => {
              if (person.coordinates && person.coordinates.length === 2) {
                return (
                    <CircleMarker
                        key={person.url}
                        center={[person.coordinates[0], person.coordinates[1]]}
                        radius={5}
                        fillColor="blue"
                        color="blue"
                        eventHandlers={{
                          click: () => openSidebar(person.location)
                        }}
                    >
                      <Tooltip>
                        <div>Click To View</div>
                      </Tooltip>
                    </CircleMarker>
                );
              }
              return null;
            })}
          </MapContainer>

          {sidebarOpen && (
              <div className="sidebar">
                <div className="sidebar-header">
                  <button className="close-button" onClick={closeSidebar}>Close</button>
                  <h2>{selectedLocation}</h2>
                </div>
                <div className="sidebar-content">
                  <ul>
                    {personsInLocation.map(person => (
                        <li key={person.url}>
                          <a href={person.url} target="_blank" rel="noopener noreferrer">
                            <div className="person-info">
                              <div className="person-name">{person.name}</div>
                              <div className="person-major">
                                {person.education.find(edu => edu.instituteName === "Saint Joseph University of Beirut" && edu.major !== "Other") ?
                                    person.education.find(edu => edu.instituteName === "Saint Joseph University of Beirut" && edu.major !== "Other").major :
                                    (person.education.find(edu => edu.instituteName === "Saint Joseph University of Beirut" && edu.major === "Other") ? "Other" : "Other")
                                }
                              </div>
                              <div className="person-graduation-year">
                                {person.education.find(edu => edu.instituteName === "Saint Joseph University of Beirut" && edu.major !== "Other") ?
                                    person.education.find(edu => edu.instituteName === "Saint Joseph University of Beirut" && edu.major !== "Other").dates.slice(-4) :
                                    (person.education.find(edu => edu.instituteName === "Saint Joseph University of Beirut" && edu.major === "Other") ?
                                        person.education.find(edu => edu.instituteName === "Saint Joseph University of Beirut" && edu.major === "Other").dates.slice(-4) : "-")
                                }
                              </div>

                            </div>
                          </a>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

const countMajors = (data) => {
  const majorCounts = {};
  data.forEach(person => {
    if (person.education.some(edu => edu.instituteName === "Saint Joseph University of Beirut")) {
      person.education.forEach(edu => {
        const major = edu.major;
        if (major in majorCounts) {
          majorCounts[major]++;
        } else {
          majorCounts[major] = 1;
        }
      });
    }
  });
  return majorCounts;
};

export default MapWithFilters;
