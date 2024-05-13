@echo off

rem Change directory to the location of the datastore.bat script
cd DATASTORE

rem Start the database
call datastore.bat

rem Change directory back to the original location
cd ..

rem Wait for the database to start (optional, adjust the timeout as needed)
timeout /t 5

rem Change directory to the location of the visualisation.bat script
cd VISUALISATION_Linkedin\linkedin-app

rem Start the frontend
call visualisation.bat

rem Change directory back to the original location
cd ..\..
