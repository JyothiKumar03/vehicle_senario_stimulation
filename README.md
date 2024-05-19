# React.js Vehicle Simulation Application

This project is a React.js application for visualizing scenarios and vehicles in a mesh  using CRUD operations. It allows users to simulate vehicle movements based on scenario and vehicle parameters.

**Live Project URL ** : https://664a114cda79e8cbd4b95ecf--transcendent-rugelach-2de373.netlify.app/

## Features

- **Scenario Management**: Users can create, display, update, and delete scenarios. Each scenario includes an ID, name, and time.
- **Vehicle Management**: Users can create, display, update, and delete vehicles. Each vehicle includes an ID, name, initial position (X, Y), speed, and direction (Towards, Backwards, Upwards, Downwards).
- **Simulation**: Users can start a simulation from the home page by selecting a scenario. Vehicles will move based on their direction and speed until the scenario time is reached. Vehicles that go outside the container will hide.
- **Validation**: Proper validation is implemented to ensure users cannot add positions greater than the graph container size.

## Project Structure

The project consists of three main components:

1. **Frontend**: The React.js frontend built using TypeScript and Vite.
2. **Backend**: The Node.js, Typescript backend for handling CRUD operations and serving data stored in a JSON file.
3. **Data Storage**: Data is stored in a JSON file on the backend server.

## Technologies Used

- React.js
- TypeScript
- Vite
- Node.js
- JSON

## Setup Instructions

1. Clone the repository to your local machine: https://github.com/JyothiKumar03/vehicle_senario_stimulation
2. Navigate to the project directory:
```
cd frontend
npm install
cd ../server/app
npm install
```
3. Start the frontend and backend servers:
```
cd frontend
npm run dev
cd ../backend
npm start
```
The application can be deployed to any platform such as Vercel, Netlify, etc. Follow the platform-specific deployment instructions to deploy the frontend and backend.

## API Endpoints

- **GET /scenarios**: Retrieve all scenarios.
- **GET /scenarios/:id**: Retrieve a specific scenario by ID.
- **POST /scenarios**: Create a new scenario.
- **DELETE /scenarios/:id**: Delete a scenario by ID.
- **GET /vehicles**: Retrieve all vehicles.
- **GET /vehicles/:id**: Retrieve a specific vehicle by ID.
- **POST /vehicles**: Create a new vehicle.
- **DELETE /vehicles/:id**: Delete a vehicle by ID.

**ScreenShots** : 

<img width="950" alt="image" src="https://github.com/JyothiKumar03/vehicle_senario_stimulation/assets/88045362/50351bd3-d1d0-409c-b31f-1cc4a7a8a04f">
<img width="957" alt="image" src="https://github.com/JyothiKumar03/vehicle_senario_stimulation/assets/88045362/ccd3b4d2-7046-45ff-af9c-e8b8f8d5eebf">
<img width="958" alt="image" src="https://github.com/JyothiKumar03/vehicle_senario_stimulation/assets/88045362/35f29775-0042-4962-bcbb-83277f48ff65">
<img width="957" alt="image" src="https://github.com/JyothiKumar03/vehicle_senario_stimulation/assets/88045362/e5bac9ac-e0ed-466c-825a-5ffc1ebcbe7e">

As the website is hosted on free service, it might not be that efficient when compared to the localhost setup. Reload the website multiple times to activate the status of the client & server.




