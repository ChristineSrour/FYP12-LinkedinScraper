const fs = require('fs');
const puppeteer = require('puppeteer');
const { autoScroll } = require('./../utilities');

async function scrape(maximumMembers) {
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);

  try {
    await page.goto('https://www.linkedin.com');
    await page.waitForSelector('#session_key');
    await page.type('#session_key', 'ranimeelzein@outlook.com');
    await page.waitForSelector('#session_password');
    await page.type('#session_password', 'Ranouma0205$$@@');
    await page.waitForSelector('.sign-in-form__submit-btn--full-width');
    await page.click('.sign-in-form__submit-btn--full-width');
    await page.waitForNavigation();

    await page.goto('https://www.linkedin.com/groups/123660/members/');

    const allProfiles = new Set();
    let lastProfileUrl = "";

    while (allProfiles.size < maximumMembers) {
      await autoScroll(page);

      const profiles = await page.evaluate((lastProfileUrl) => {
        const profilesData = [];
        const resultElements = document.querySelectorAll('div.ui-entity-action-row a.ui-entity-action-row__link');

        let startIndex = 0;
        if (lastProfileUrl) {
          const urls = Array.from(resultElements).map(el => el.href);
          startIndex = urls.indexOf(lastProfileUrl) + 1;
        }

        for (let i = startIndex; i < resultElements.length; i++) {
          const url = resultElements[i].href;
          if (url) {
            profilesData.push({ url });
          }
        }

        return profilesData;
      }, lastProfileUrl);

      profiles.forEach(profile => {
        allProfiles.add(profile.url);
      });

      console.log(`Fetched ${profiles.length} profiles`);
      console.log(`Unique profiles collected so far: ${allProfiles.size}`);

      // Store the URL of the last profile to track where new profiles start
      lastProfileUrl = profiles.length > 0 ? profiles[profiles.length - 1].url : lastProfileUrl;

      // Write all profiles to file
      await fs.writeFileSync('./URL-frontier/profiles_groups.json', JSON.stringify(Array.from(allProfiles), null, 2));
      console.log(`Total profiles stored: ${allProfiles.size}`);

      const loadMoreButton = await page.$('button[class*="Show more results"]');
      if (loadMoreButton) {
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'networkidle0' }),
          loadMoreButton.click(),
        ]);
      } if (allProfiles.size >= maximumMembers) break;

    }

  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await browser.close();
  }
}

scrape(486);  