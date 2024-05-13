To run the project, 
chmod +x run.sh
./run.sh

Run datastore and visualisation seperately by :

chmod +x run_datastore_frontend.sh
./datastore-frontend/run_DF.sh

In case this didn't work, this is a manual step by step

Prerequisites:
•	Node.js must be installed on your computer.
•	Ensure all project dependencies are installed. If you haven't already, you can install them by navigating to your project directory in the command line and running npm install.
•	Verify that all scripts are correctly set up to export their main functions and handle file I/O operations asynchronously.
Execution Order and Instructions:
1.	Extract URLs
•	Script: url-extractor.js
•	Location: ./URL-frontier/url-extractor.js
•	Command: node ./URL-frontier/url-extractor.js
•	Output Check: Ensure profiles_groups.json is created in the ./URL-frontier directory before proceeding.
•	Purpose: This script extracts URLs and saves them for further processing.

2.	Scrape Profiles from URLs
•	Script: scrapeProfilesFromUrls.js
•	Location: ./fetcher-extractor/scrapeProfilesFromUrls.js
•	Command: node ./fetcher-extractor/scrapeProfilesFromUrls.js
•	Output Check: Ensure profilesFromUrls.json is created in the ./fetcher-extractor directory before proceeding.
•	Purpose: Scrapes profiles based on the URLs extracted in the previous step.
3.	Scrape Educational Information
•	Script: scrapeEducation.js
•	Location: ./fetcher-extractor/scrapeEducation.js
•	Command: node ./fetcher-extractor/scrapeEducation.js
•	Output Check: Ensure ProfilesWithEducation.json is created in the ./fetcher-extractor directory before proceeding.
•	Purpose: Extracts educational information from the profiles.
4.	Filter by Major
•	Script: filterMajor.js
•	Location: ./fetcher-extractor/filterMajor.js
•	Command: node ./fetcher-extractor/filterMajor.js
•	Output Check: Ensure ProfilesWithEducation_Major_Filtered.json is created in the ./fetcher-extractor directory before proceeding.
•	Purpose: Filters the profiles to include only certain majors.
5.	Filter by Institute Name
•	Script: filterInstituteName.js
•	Location: ./fetcher-extractor/filterInstituteName.js
•	Command: node ./fetcher-extractor/filterInstituteName.js
•	Output Check: Ensure ProfilesWithEducation_InstitueName_Major_Filtered.json is created in the ./fetcher-extractor directory before proceeding.
•	Purpose: Filters the profiles to include only certain educational institutions.
6.	Scrape Professional Experience Information
•	Script: scrapeExperience.js
•	Location: ./fetcher-extractor/scrapeExperience.js
•	Command: node ./fetcher-extractor/scrapeExperience.js
•	Output Check: Ensure ProfilesWithExperience.json is created in the ./fetcher-extractor directory before proceeding.
•	Purpose: Extracts professional experience information from the profiles.
7.	Start backend server
•	cd DATASTORE
•	node index.js & (to let server run in the background and continue)
8. 	Post Data to Database
•	Script: postToDataBase.js
•	Location: ./fetcher-extractor/postToDataBase.js
•	Command: node ./fetcher-extractor/postToDataBase.js
•	Purpose: Uploads the final filtered and enriched profile data to a database.
9. Run Datastore and Visualisation
•	datastore-frontend/run_DF.sh 

Conclusion: Follow this guide to manually execute each script in the specified order. Ensure that each script's output file is correctly produced before proceeding to the next step to maintain data integrity and flow consistency.

