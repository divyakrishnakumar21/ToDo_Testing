# TodoApp

## Running the Frontend

1. Open a terminal and navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```
4. The app will be available at [http://localhost:3000](http://localhost:3000)

## Running the Backend

1. Open a separate terminal and navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run start:dev
   ```
4. The backend will run at [http://localhost:3000](http://localhost:3000)

## Running Frontend and Backend Together

To run both servers at the same time:
   ```
1. Open another terminal for the backend:
   ```sh
   cd backend
   npm run start:dev
   ```

2. Open one terminal for the frontend:
   ```sh
   cd frontend
   npm start

   Press y to use a different localhost

Both servers must be running simultaneously for the app to work correctly.

## Notes
- Make sure both servers are running for full functionality.
- The backend uses in-memory storage by default (data resets on restart).
- For front end http://localhost:3001/ 
- For API documentation, visit [http://localhost:3000/api] after starting the backend.
