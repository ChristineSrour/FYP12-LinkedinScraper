const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
 
async function login(page) {
    await page.goto('https://www.linkedin.com');
    await page.waitForSelector('#session_key');
    await page.type('#session_key', 'arthurlancord@gmail.com');
    await page.waitForSelector('#session_password');
    await page.type('#session_password', '`V?#55CIJM("|+@');
    await page.waitForSelector('.sign-in-form__submit-btn--full-width');
    await page.click('.sign-in-form__submit-btn--full-width');
    await page.waitForNavigation();
}
 
async function scrapeProfiles() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
 
    try {
        await login(page);
 
        const profileUrls = JSON.parse(fs.readFileSync('./fetcher-extractor/URLs.json'));
        const profilesData = []; // Array to store profile data
 
        for (const url of profileUrls) {
            await page.goto(url, { timeout: 90000 });
            await page.waitForSelector('.artdeco-card');
 
            const name = await page.$eval('h1.text-heading-xlarge', element => element.innerText.trim());
            const bio = await page.$eval('div.text-body-medium.break-words', element => element.textContent.trim());
            const location = await page.$eval('div.mt2 > span.text-body-small', element => element.textContent.trim());
 
            const coordinates = await getCoordinates(location);
 
            const profileData = { url, name, bio, location, coordinates };
            profilesData.push(profileData); // Add profile data to array
        }
 
        await fs.writeFileSync('./fetcher-extractor/profilesFromUrls.json', JSON.stringify(profilesData, null, 2)); // Write array to JSON file
 
        console.log('Profile data stored in profilesFromUrls.json');
 
    } catch (error) {
        console.error('Error scraping profiles:', error);
    } finally {
        await browser.close();
    }
}
 
async function getCoordinates(location) {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: location,
                format: 'json',
                limit: 1
            }
        });
 
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return [parseFloat(lat), parseFloat(lon)];
        } else {
            console.error('No results found for location:', location);
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
}
 
scrapeProfiles();
