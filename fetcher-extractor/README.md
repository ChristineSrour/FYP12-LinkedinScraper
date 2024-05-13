### scrapeProfileFromURls.js
This script serves as the entry point for extracting profile data from LinkedIn URLs. Here's how it operates:

- **Input:** 
  - Reads LinkedIn profile URLs from a file named `URLs.json`.

- **Process:**
  - Utilizes Puppeteer to simulate a browser and navigate LinkedIn's login process.
  - Retrieves profile URLs from `URLs.json`.
  - Visits each profile URL to scrape essential information such as name, bio, location, and coordinates.
  - Coordinates are fetched by querying OpenStreetMap's Nominatim API based on location data.

- **Output:**
  - Stores the extracted profile data in a structured format within the file `profilesFromUrls.json`.

### scrapeEducation.js
This script extends the functionality of `scrapeProfileFromURls.js` by including educational details extraction. Here's its workflow:

- **Input:** 
  - Reads previously extracted profile data from `profilesFromUrls.json`.

- **Process:**
  - Utilizes Puppeteer to navigate to each profile's education section.
  - Extracts information about institutes, majors, and dates of education.
  - Integrates the education data with existing profile data.

- **Output:**
  - Updates the profile data with educational backgrounds and stores it in the file `ProfilesWithEducation.json`.

### filterMajor.js
This script focuses on categorizing majors into specific engineering disciplines. Here's how it operates:

- **Input:** 
  - Reads profile data with education details from `ProfilesWithEducation.json`.

- **Process:**
  - Filters majors into categories such as Mechanical Engineering, Computer and Communication Engineering, etc.
  - Updates the profile data with the categorized majors.

- **Output:**
  - Stores the updated profile data with filtered majors in the file `ProfilesWithEducation_Major_Filtered.json`.

### filterInstituteName.js
This script standardizes institute names for consistency. Here's its workflow:

- **Input:** 
  - Reads profile data with filtered majors from `ProfilesWithEducation_Major_Filtered.json`.

- **Process:**
  - Identifies variations of specific institute names and standardizes them to a unified format.
  
- **Output:**
  - Stores the updated profile data with standardized institute names in the file `ProfilesWithEducation_InstitueName_Major_Filtered.json`.

### ScrapeExperience.js
This script extends the data extraction process to include professional experience details. Here's how it operates:

- **Input:** 
  - Reads profile data with standardized institute names from `ProfilesWithEducation_InstitueName_Major_Filtered.json`.

- **Process:**
  - Utilizes Puppeteer to navigate to each profile's experience section.
  - Extracts information about positions, companies, and employment dates.
  - Ensures data integrity by removing duplicate entries.

- **Output:**
  - Integrates the experience data with existing profile data and stores it in the file `ProfilesWithExperience.json`.

### postDataToAPI.js
The final script focuses on integrating and posting the aggregated data to a local API endpoint. Here's its workflow:

- **Input:** 
  - Reads the combined profile, education, and experience data from `ProfilesWithExperience.json`.

- **Process:**
  - Formats the combined data into a suitable format for API consumption.
  - Sends HTTP POST requests to a specified API endpoint with the formatted data.
