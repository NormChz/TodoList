
import { app } from "./app.js";
import mongoose from "mongoose";
import { validEnvVariables } from "./utils/validateEnv.js";


const port = validEnvVariables.PORT;



mongoose.connect(validEnvVariables.MONGO_CONN_STRING) // if CONN_STRING is a  string, we can connect
  .then(() => {
    console.log('Mongoose connected');

    app.listen(port, () => {
      console.log('Listening to port: ', port);

    }); // guarantee that app listens only after mongo connected
  })
  .catch(console.error)
