const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

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

async function scrapeExperience() {
  const browser = await puppeteer.launch({ headless: false }); 
  const page = await browser.newPage(); 
  await page.setDefaultNavigationTimeout(0);

  try {
    await login(page);

    const profilesData = JSON.parse(fs.readFileSync('./fetcher-extractor/ProfilesWithEducation_InstitueName_Major_Filtered.json'));

    const allexperienceDetails = [];

    for (const profile of profilesData) {
      const profileUrl = profile.url.split('?')[0];
      const experienceUrl = profileUrl + '/details/experience/';
      await page.goto(experienceUrl, { timeout: 90000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.waitForSelector('li.pvs-list__paged-list-item');
      const experienceDetails = await page.evaluate(() => {
        const experienceItems = Array.from(document.querySelectorAll('li.pvs-list__paged-list-item'));
        const experienceData = experienceItems.map(item => {
          const nestedItems = item.querySelectorAll('li.pvs-list__paged-list-item');

          if (nestedItems.length > 0) {
            return Array.from(nestedItems).map(nestedItem => {
              const positionElement = nestedItem.querySelector('span[aria-hidden="true"]');
              const companyElement = item.querySelector('span[aria-hidden="true"]');
              const datesElement = nestedItem.querySelector('span.t-14.t-normal > .pvs-entity__caption-wrapper');

              const position = positionElement ? positionElement.textContent.trim() : 'N/A';
              const company = companyElement ? companyElement.textContent.trim().split(' · ')[0] : 'N/A';
              const dates = datesElement ? datesElement.textContent.trim() : 'N/A';

              return { position, company, dates };
            });
          } else {
            const positionElement = item.querySelector('span[aria-hidden="true"]');
            const companyElement = item.querySelector('.t-14.t-normal > span[aria-hidden="true"]');
            const datesElement = item.querySelector('span.t-14.t-normal > .pvs-entity__caption-wrapper');

            const position = positionElement ? positionElement.textContent.trim() : 'N/A';
            const company = companyElement ? companyElement.textContent.trim().split(' · ')[0] : 'N/A';
            const dates = datesElement ? datesElement.textContent.trim() : 'N/A';

            return { position, company, dates };
          }
        }).flat().filter(entry => entry.position && entry.dates);

        const uniqueExperienceData = [];
        const positionsAndDates = new Set();

        experienceData.forEach(entry => {
          const key = `${entry.position}-${entry.dates}`;
          if (!positionsAndDates.has(key)) {
            uniqueExperienceData.push(entry);
            positionsAndDates.add(key);
          }
        });

        return uniqueExperienceData;
      });

      allexperienceDetails.push({
        ...profile,
        Experience: experienceDetails
      });

      await fs.writeFileSync('./fetcher-extractor/ProfilesWithExperience.json', JSON.stringify(allexperienceDetails, null, 2));

    }

  } catch (error) {
    console.error('Error scraping experience:', error);
  } finally {
    await browser.close(); 
  }
}

scrapeExperience();
