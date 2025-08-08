<h2>1) MUST DO:</h2>

- Create a `.env` file and add the variables `MONGO_CONN_STRING`, `PORT`, `SESSION_SECRET`, `CLIENT_URL`, so that the program can find them when it needs them.
- The `CLIENT_URL` will differ between production and development.
- The `MONGO_CONN_STRING` is a string that you will be given once you activate the free version of mongo DB atlas that is used for data persistence in this project.

<h2>2) Running in development mode</h2>

- `secure: true` is a session setting (find it in app.ts) and must be set to false in development, unless you have your own ssl certificate and set up client and server to communicate securely somehow.
- Vite + React apps set the frontend to be `http://localhost:5173`. Set the `CLIENT_URL` variable to `http://localhost:5173` in development.
- Use **`npm i`** to install all the necessary npm packages listed in package.json.
- Use **`npm run dev`** to run connect to mongo db and run the server.

<h2>2) Running in production mode</h2>

- set a varibale called `NODE_ENV` to `production` inside the `.env` file.
- set the variable `CLIENT_URL` to the domain name that can make calls to the backend service.
