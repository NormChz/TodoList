<h1>1) MUST DO:</h1>

- Create a `.env.development` file and add a the variable `VITE_API_BASE_URL=http://localhost:<chosen-port-nr-for-backend-development>/api`
- Create a `.env.production` file: set the `VITE_API_BASE_URL=/api`
- `/api` is used in the url because that a choice made in the backend development (it could be anything, but the backend code and frontend code must coincide in this context)
- When uploading the files to a web server , i used NGINX to redirect the requests to `/api` to `http://localhost:5000`.

<h2>2) Running in development mode</h2>

Use **`npm i`** to install all the necessary npm packages listed in package.json.<br>
Use **`npm run dev`** to run the vite+react code on `http://localhost:5173`.