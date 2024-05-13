const puppeteer = require('puppeteer');
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

async function scrapeEducation() {
  const browser = await puppeteer.launch({ headless: false }); 
  const page = await browser.newPage(); 
  await page.setDefaultNavigationTimeout(0);

  try {
    await login(page);

    const profilesData = JSON.parse(fs.readFileSync('./fetcher-extractor/profilesFromUrls.json'));

    const alleducationDetails = [];

    for (const profile of profilesData) {
      const profileUrl = profile.url.split('?')[0];
      const educationUrl = profileUrl + '/details/education/';
      await page.goto(educationUrl, { timeout: 90000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.waitForSelector('li.pvs-list__paged-list-item');
      const educationDetails = await page.evaluate(() => {
        const educationItems = Array.from(document.querySelectorAll('li.pvs-list__paged-list-item'));
        const educationData = educationItems.map(item => {
          const instituteNameElement = item.querySelector('span[aria-hidden="true"]');
          const majorElement = item.querySelector('.t-14.t-normal > span[aria-hidden="true"]');
          const datesElement = item.querySelector('span.t-14.t-normal > .pvs-entity__caption-wrapper');

          const instituteName = instituteNameElement ? instituteNameElement.textContent.trim() : '';
          const major = majorElement ? majorElement.textContent.trim() : '';
          const dates = datesElement ? datesElement.textContent.trim() : '';

          return { instituteName, major, dates };
        }).filter(entry => entry.instituteName && entry.dates);

        return educationData;
      });

      alleducationDetails.push({
        ...profile,
        Education: educationDetails
      });

      await fs.writeFileSync('./fetcher-extractor/ProfilesWithEducation.json', JSON.stringify(alleducationDetails, null, 2));
    }

    console.log('Education data stored in ProfilesWithEducation.json');

  } catch (error) {
    console.error('Error scraping profiles:', error);
  } finally {
    await browser.close(); 
  }
}

scrapeEducation();
