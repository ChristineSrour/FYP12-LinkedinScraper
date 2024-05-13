#!/bin/bash

# Ensure Node.js and npm are installed
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null
then
    echo "Node.js and npm are required but not installed. Exiting."
    exit 1
fi

# Navigate to the project directory (modify this path to your actual project directory)
cd /path/to/your/project

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Function to check if a file exists
check_file() {
    if [ ! -f "$1" ]; then
        echo "Error: File $1 not found. Exiting."
        exit 1
    fi
}

# Extract URLs
echo "Running URL Extractor..."
node ./URL-frontier/url-extractor.js
check_file "./URL-frontier/profiles_groups.json"

# Scrape Profiles from URLs
echo "Scraping Profiles from URLs..."
node ./fetcher-extractor/scrapeProfilesFromUrls.js
check_file "./fetcher-extractor/profilesFromUrls.json"

# Scrape Educational Information
echo "Scraping Educational Information..."
node ./fetcher-extractor/scrapeEducation.js
check_file "./fetcher-extractor/ProfilesWithEducation.json"

# Filter by Major
echo "Filtering by Major..."
node ./fetcher-extractor/filterMajor.js
check_file "./fetcher-extractor/ProfilesWithEducation_Major_Filtered.json"

# Filter by Institute Name
echo "Filtering by Institute Name..."
node ./fetcher-extractor/filterInstituteName.js
check_file "./fetcher-extractor/ProfilesWithEducation_InstitueName_Major_Filtered.json"

# Scrape Professional Experience Information
echo "Scraping Professional Experience Information..."
node ./fetcher-extractor/scrapeExperience.js
check_file "./fetcher-extractor/ProfilesWithExperience.json"

# Start the backend server
echo "Starting backend server..."
cd DATASTORE
node index.js &

# Post Data to Database
echo "Posting Data to Database..."
node ../fetcher-extractor/postToDataBase.js

echo "All tasks completed successfully."
