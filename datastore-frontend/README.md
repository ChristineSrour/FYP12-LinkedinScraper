**Datastore Module Documentation**

**Dependencies**

Install necessary dependencies by running the following command:
```npm install dotenv express mongoose cors```

**Run**

Run `datastore.bat`

**How It Works**

**Database Connection**
- The module establishes a connection to a MongoDB database using Mongoose.
- The MongoDB connection string is retrieved from the environment variable DATABASE_URL using the `.env` package.

**Express Server Setup**
- An Express server is created to handle HTTP requests.
- CORS middleware is used to enable cross-origin resource sharing.
- The server listens on port 3000 by default.

**Routes**
- The module defines routes for interacting with the data stored in the database.

POST /api/post
- This route handles the creation or update of user data.
- It expects a JSON payload containing user information such as URL, name, bio, location, coordinates, education, and experience.
- If a user with the same URL already exists in the database, the route updates the user's information if any changes are detected.
- If no user with the same URL exists, a new user is created in the database.

GET /api/getAll
- This route retrieves all user data from the database.

**Model**
- The module defines a Mongoose model for user data storage.
- The model schema includes fields for URL, name, bio, location, coordinates, education, and experience.
- Coordinates are stored as an array of numbers representing latitude and longitude.
- Education and experience are stored as arrays of objects containing information about institutes, majors, positions, companies, and dates.

**Functionality Highlights**
- Database Interaction: Users can save or update their information, which is stored in a MongoDB database.
- RESTful API: Routes adhere to REST principles, providing clear endpoints for CRUD operations.
- Data Validation: User input is validated before saving to the database using Mongoose schema validation.


**Visualization Module Documentation**

**Dependencies**

Install React Leaflet and Axios: 
```npm install react-leaflet axios leaflet```

**Run**   

Run `visualization.bat`

**Features**
- Displays a map with markers representing individuals.
- Allows users to filter individuals based on location, major, graduation year, and company.
- Sidebar displays details of individuals in a selected location, with an option to redirect to that person's LinkedIn profile.

**How It Works**

**State Management**

The component utilizes React's `useState` hook to manage various states:

- `data`: Holds the fetched data from the API.
- `filters`: Manages the filter options selected by the user.
- `loading`: Tracks the loading state of the data fetch operation.
- `error`: Stores any errors that occur during data fetching.
- `sidebarOpen`: Controls the visibility of the sidebar displaying individual details.
- `selectedLocation`: Keeps track of the location selected on the map.
- `personsInLocation`: Stores details of individuals in the selected location.

**Data Fetching**

- When the component mounts, it executes an asynchronous function (`fetchData`) using the `useEffect` hook.
- `fetchData` uses Axios to fetch data from the specified API endpoint (`http://localhost:3000/api/getAll`).
- Upon successful retrieval, the fetched data is stored in the `data` state, and the loading state is set to false.
- If an error occurs during fetching, the error message is stored in the `error` state, and the loading state is set to false.

**Filtering Data**

- The component filters the fetched data based on the selected filter options (location, major, graduation year, and company).
- The `filteredData` variable applies filter criteria to the data using the Array `filter` method and returns a new array containing filtered individuals.

**Map Rendering**

- The component renders a map using the `MapContainer`, `TileLayer`, and `CircleMarker` components from React Leaflet.
- Each individual in the filtered data is represented by a circular marker on the map.
- Clicking on a marker triggers the `openSidebar` function, which opens the sidebar and displays details of individuals in the selected location.

**Sidebar Display**

- The sidebar displays details of individuals in the selected location.
- It renders individual names, majors, and graduation years.
- Clicking the close button (`closeSidebar` function) closes the sidebar.

**Functionality Highlights**

- Filtering: Users can filter individuals based on location, major, graduation year, and company.
- Interactive Map: Clicking on markers displays detailed information about individuals in the sidebar.
- Reset Filters: Users can reset filter options to their initial state.
- Dynamic Data Display: The map dynamically updates to reflect filtered data changes.

