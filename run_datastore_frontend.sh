#!/bin/bash

# Start the database

./datastore-frontend/DATASTORE/datastore.sh

# Wait for the database to start 
sleep 5


# Start the frontend
./datastore-frontend/VISUALISATION_Linkedin/linkedin-app/visualisation.sh


