import "dotenv/config";
import { validEnvVariables } from './utils/validateEnv.js';
import Express from "express";
import { NextFunction, Request, Response } from "express";
import { notesRouter } from "./route/notesRoute.js";
import { userRouter } from "./route/userRoute.js";
import morgan from 'morgan';
import createHttpError, { isHttpError } from "http-errors";
import cors from 'cors';
import session from 'express-session'
import MongoStore from 'connect-mongo';
import { isAuthenticatedUser } from "./middleware/authentication.js";


export const app = Express();

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your client-side URL
  credentials: true,
}));

app.use(morgan('dev'));

app.use(Express.json()); // allow the app to accept json bodies (server crashes when req are sent without this enabled)

app.use(session({
  secret: validEnvVariables.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000, // 1000 = 1000ms = 1sec
    secure: false, // change to TRUE in production ====>> IMPORTANT
    // httpOnly: true, // cookie can only be accessed directly when it reaches the server. JS code like document.cookie will not work with httpOnly.
  },
  rolling: true, // as long the user is using the website, the cookie is refreshed
  store: MongoStore.create({ // if we don't specify, the sessions will be stored in memory.
    mongoUrl: validEnvVariables.MONGO_CONN_STRING,
  }),
}));

app.use('/api/notes', isAuthenticatedUser, notesRouter);

app.use('/api/user', userRouter);

app.use((req, res, next) => { // next with underscore because eslint is configured to ignore the unused next if it's prefixed by an underscore.
  next(createHttpError(404, 'Resource not found'))
});

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;

  if (isHttpError(err)) {
    errorMessage = err.message;
    statusCode = err.statusCode
  }
  console.error(statusCode + ' - ' + errorMessage);
  console.error(err);
  
  res.status(statusCode).json({ error: errorMessage });
});

