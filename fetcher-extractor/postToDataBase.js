const axios = require('axios');
const data = require('./ProfilesWithEducation.json');

async function postDataToAPI() {
    for (const entry of data) {
        const formattedData = {
            url: entry.url,
            name: entry.name,
            bio: entry.bio,
            location: entry.location,
            coordinates: entry.coordinates,
            education: entry.Education,
            experience: entry.Experience
        };

        try {
            const response = await axios.post('http://localhost:3000/api/post', formattedData);
            console.log('Post successful for:', entry.name);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error posting data for:', entry.name);
            console.error('Error:', error.message);
        }
    }
}

postDataToAPI();
