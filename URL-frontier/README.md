LinkedIn Profile Scraper
This Node.js script automates the process of scraping LinkedIn profiles from a specific group using Puppeteer, a headless browser library. The script navigates through LinkedIn, logs in with provided credentials, and collects profile URLs from the group's member listing.

Features
Logs into LinkedIn with a specified user account.
Navigates to a specified group's member page.
Collects and stores profile URLs up to a defined maximum number.
Handles pagination by automatically scrolling and clicking the "Show more results" button.
Writes all collected profiles to a JSON file.


Configuration
Modify the following variables in the script according to your needs:
maximumMembers: Set this to the maximum number of profiles you want to scrape.
Email and password in the page.type() functions to match your LinkedIn login details.
The group URL in page.goto() to the LinkedIn group from which you want to scrape profiles.

Output
The script outputs the collected profile URLs to a file named profiles_groups.json in the ./URL-frontier directory. Each URL is stored uniquely, ensuring no duplicates.