import { RequestHandler } from "express";
import { UserModel } from "../model/user.js";
import createHttpError from "http-errors";
import bcrypt from 'bcrypt';

interface UserController {
  signupUser: RequestHandler<unknown, unknown, SignupBody, unknown>;
  loginUser: RequestHandler<unknown, unknown, LoginBody, unknown>;
  logoutUser: RequestHandler;
  getAuthUser: RequestHandler;
}

interface SignupBody {
  username?: string,
  email?: string,
  password?: string,
}

interface LoginBody {
  username?: string,
  password?: string,
}

export const userController: UserController = {
  signupUser: async (req, res, next) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {

      if (!username || !email || !password)
        throw createHttpError(400, 'Parameters missing.');

      const existingUser = await UserModel.findOne({ username: username });

      if (existingUser)
        throw createHttpError(409, 'Username already taken. Please choose a different one or log in instead.');

      const existingEmail = await UserModel.findOne({ email: email });

      if (existingEmail)
        throw createHttpError(409, 'A user with this email adress already exists. Please log in instead.');

      const pwHashed = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({ username: username, password: pwHashed, email: email });

      // before we return the response we establish the session
      req.session.userId = newUser._id;

      res.status(201).json(newUser);

    } catch (error) {
      next(error);
    }
  },

  loginUser: async (req, res, next) => {
    
    const username = req.body.username;
    const password = req.body.password;

    try {

      if (!username || !password)
        throw createHttpError(400, 'Parameters missing.');

      const existingUser = await UserModel.findOne({ username: username }).select('+password +email');

      if (!existingUser)
        throw createHttpError(401, 'Invalid credentials.');

      const passwordMatch = await bcrypt.compare(password, existingUser.password);

      if (!passwordMatch)
        throw createHttpError(401, 'Invalid credentials.');

      req.session.userId = existingUser._id; // assign the session ID which is of TYPE: mongoose.Types.ObjectId
      
      res.status(200).json(existingUser);

    } catch (error) {
      next(error);
    }
  },

  logoutUser: async (req, res, next) => {
    req.session.destroy(error => {
      if (error)
        next(error);
      else {
        // Important settings, if they don't match the cookie settings in use(session), 
        // the cookie will not be cleared.
        // Most of these settings are default and not specified in use(session), but here they must be specified.
        res.clearCookie('connect.sid', { 
          path: '/',
          secure: false,
          httpOnly: true,
          sameSite: 'lax',
        });
        res.sendStatus(200);
      }
    });
  },
  
  getAuthUser: async (req, res, next) => {

    try {
      const user = await UserModel.findById(req.session.userId).select('+email');
      res.status(200).json(user);

    } catch (error) {
      next(error)

    }
  }
}