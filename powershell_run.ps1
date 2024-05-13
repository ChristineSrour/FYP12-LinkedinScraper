# Ensure Node.js and npm are installed
$nodeInstalled = Get-Command "node" -ErrorAction SilentlyContinue
$npmInstalled = Get-Command "npm" -ErrorAction SilentlyContinue
if (-not $nodeInstalled -or -not $npmInstalled) {
    Write-Host "Node.js and npm are required but not installed. Exiting."
    exit
}

# Navigate to the project directory (adjust the path to your project directory)
Set-Location "C:\Users\Chris\Desktop\ESIB\3emeAnneeCCE\FYP\FYP-12-LinkedinScraper\"

# Install project dependencies
Write-Host "Installing project dependencies..."
Start-Process "npm" -ArgumentList "install" -NoNewWindow -Wait

# Function to check if a file exists
function Check-File($file) {
    if (-not (Test-Path $file)) {
        Write-Host "Error: File $file not found. Exiting."
        exit
    }
}

# Extract URLs
<# Write-Host "Running URL Extractor..."
Start-Process "node" -ArgumentList "./URL-frontier/url-extractor.js" -NoNewWindow -Wait
Check-File "./URL-frontier/profiles_groups.json" #>

# Scrape Profiles from URLs
Write-Host "Scraping Profiles from URLs..."
Start-Process "node" -ArgumentList "./fetcher-extractor/scrapeProfilesFromUrls.js" -NoNewWindow -Wait
Check-File "./fetcher-extractor/profilesFromUrls.json"

# Scrape Educational Information
Write-Host "Scraping Educational Information..."
Start-Process "node" -ArgumentList "./fetcher-extractor/scrapeEducation.js" -NoNewWindow -Wait
Check-File "./fetcher-extractor/ProfilesWithEducation.json"

# Filter by Major
Write-Host "Filtering by Major..."
Start-Process "node" -ArgumentList "./fetcher-extractor/filterMajor.js" -NoNewWindow -Wait
Check-File "./fetcher-extractor/ProfilesWithEducation_Major_Filtered.json"

# Filter by Institute Name
Write-Host "Filtering by Institute Name..."
Start-Process "node" -ArgumentList "./fetcher-extractor/filterInstituteName.js" -NoNewWindow -Wait
Check-File "./fetcher-extractor/ProfilesWithEducation_InstitueName_Major_Filtered.json"

# Scrape Professional Experience Information
Write-Host "Scraping Professional Experience Information..."
Start-Process "node" -ArgumentList "./fetcher-extractor/scrapeExperience.js" -NoNewWindow -Wait
Check-File "./fetcher-extractor/ProfilesWithExperience.json"

# Start the backend server
Write-Host "Starting backend server..."
Set-Location "DATASTORE"
Start-Process "node" -ArgumentList "index.js" -NoNewWindow

# Post Data to Database
Set-Location ".."
Write-Host "Posting Data to Database..."
Start-Process "node" -ArgumentList "./fetcher-extractor/postToDataBase.js" -NoNewWindow -Wait

Write-Host "All tasks completed successfully."
