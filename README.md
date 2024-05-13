# Full Stack LinkedIn Scraper Project README

## Overview

This project is aimed at scraping LinkedIn profiles, extracting relevant information, filtering it, and storing it in a database. Below are the detailed instructions to set up and run the project.
## Run Project
1. **Check Data.json**
   - Verify the existence of `Data.json` file that contains all the content of the current database.

2. **Run**
   - Execute the following commands:
     The following commands will run *Dependencies Download* and *URL Frontier + Fetcher + Extractor*

     ```
     chmod +x run.sh
     ```
     ```
     ./run.sh
     ```
     The following commands will run dependencies download

3. **Run Datastore and Visualization Separately**
   - Execute the following commands:
     ```
     chmod +x run_datastore_frontend.sh
     ```
     ```
     ./datastore-frontend/run_DF.sh
     ```
In case this didn't work, this is a manual step by step

## Prerequisites

- Node.js must be installed on your computer.
- Ensure all project dependencies are installed. If not, navigate to your project directory in the command line and run `npm install`.
- Verify that all scripts are correctly set up to export their main functions and handle file I/O operations asynchronously.

## Execution Order and Instructions

1. **Extract URLs**
   - Script: `url-extractor.js`
   - Location: `./URL-frontier/url-extractor.js`
   - Command: `node ./URL-frontier/url-extractor.js`
   - Output Check: Ensure `profiles_groups.json` is created in the `./URL-frontier` directory.
   - Purpose: Extracts URLs and saves them for further processing.

2. **Scrape Profiles from URLs**
   - Script: `scrapeProfilesFromUrls.js`
   - Location: `./fetcher-extractor/scrapeProfilesFromUrls.js`
   - Command: `node ./fetcher-extractor/scrapeProfilesFromUrls.js`
   - Output Check: Ensure `profilesFromUrls.json` is created in the `./fetcher-extractor` directory.
   - Purpose: Scrapes profiles based on the extracted URLs.

3. **Scrape Educational Information**
   - Script: `scrapeEducation.js`
   - Location: `./fetcher-extractor/scrapeEducation.js`
   - Command: `node ./fetcher-extractor/scrapeEducation.js`
   - Output Check: Ensure `ProfilesWithEducation.json` is created in the `./fetcher-extractor` directory.
   - Purpose: Extracts educational information from profiles.

4. **Filter by Major**
   - Script: `filterMajor.js`
   - Location: `./fetcher-extractor/filterMajor.js`
   - Command: `node ./fetcher-extractor/filterMajor.js`
   - Output Check: Ensure `ProfilesWithEducation_Major_Filtered.json` is created in the `./fetcher-extractor` directory.
   - Purpose: Filters the profiles to include only certain majors.

5. **Filter by Institute Name**
   - Script: `filterInstituteName.js`
   - Location: `./fetcher-extractor/filterInstituteName.js`
   - Command: `node ./fetcher-extractor/filterInstituteName.js`
   - Output Check: Ensure `ProfilesWithEducation_InstitueName_Major_Filtered.json` is created in the `./fetcher-extractor` directory.
   - Purpose: Filters the profiles to include only certain educational institutions.

6. **Scrape Professional Experience Information**
   - Script: `scrapeExperience.js`
   - Location: `./fetcher-extractor/scrapeExperience.js`
   - Command: `node ./fetcher-extractor/scrapeExperience.js`
   - Output Check: Ensure `ProfilesWithExperience.json` is created in the `./fetcher-extractor` directory.
   - Purpose: Extracts professional experience information from profiles.

7. **Start backend server**
   - Navigate to `DATASTORE` directory
     
     ```
     cd DATASTORE
     ```
   - Command:
     ```
     node index.js
     ```
     And let the server run in the background.

8. **Post Data to Database**
   - Script: `postToDataBase.js`
   - Location: `./fetcher-extractor/postToDataBase.js`
   - Command: `node ./fetcher-extractor/postToDataBase.js`
   - Purpose: POST the final filtered and enriched profile data to a database.

9. **Run Visualization**
   - Navigate to `VISUALISATION_Linkedin/linkedin-app` directory
     
     ```
     cd VISUALISATION_Linkedin/linkedin-app
     ```
   - Command:
     ```
     npm start
     ```

## Conclusion

Follow this guide to manually execute each script in the specified order. Ensure that each script's output file is correctly produced before proceeding to the next step to maintain data integrity and flow consistency.
