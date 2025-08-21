## Installing MongoDB (macOS)

If you are using macOS and do not have MongoDB installed, you can install it using Homebrew:

```sh
brew tap mongodb/brew
brew install mongodb-community
```

After installation, start MongoDB:
```sh
brew services start mongodb-community
```

To stop MongoDB:
```sh
brew services stop mongodb-community
```

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


## Connecting to MongoDB and Checking Data

### 1. Ensure MongoDB is Running
Start MongoDB locally (if not already running):
```sh
brew services start mongodb-community
```
or
```sh
mongod
```

### 2. Connect Backend to MongoDB
The backend is configured to use MongoDB at `mongodb://localhost:27017/todo_db`.
No further action is needed unless you want to change the database URI.

### 3. Check Tables (Collections) and Data
Open a new terminal and start the MongoDB shell:
```sh
mongo
```
Switch to your database:
```sh
use todo_db
```
List all collections (tables):
```sh
show collections
```
View all tasks in the `tasks` collection:
```sh
db.tasks.find().pretty()
```

### 4. Add Data via API
You can add tasks using the frontend or with curl:
```sh
curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Test Task","description":"Check DB"}'
```

### 5. View Data in MongoDB
Repeat the shell commands above to see new data in your collections.

---
Make sure both servers are running for full functionality.
For API documentation, visit [http://localhost:3000/api] after starting the backend.
