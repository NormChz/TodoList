import type { User } from "../model/user";
import { fetchData } from "./genFetchData";

interface SignUpCredentials {
  username?: string,
  email?: string,
  password?: string,
}

interface LoginCredentials {
  username?: string,
  password?: string,
}

export const getLoggedinUser = async (): Promise<User | null> => {

  const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/user', {
    method: 'GET',
    credentials: 'include'
  });

  if (response.ok) { // NOT USING fetchData here because the 401 error is handled differently here.
    return response.json();
  } else {
    const status = response.status;
    const errorBody = await response.json();
    const errorMessage = errorBody.message;
    if (status === 401) {
      return null; // returning null because on the first load, the user will never be authorized
    } else {
      throw new Error(`${response.status} - ${errorMessage}`)
    }
  }

  // const response = await fetchData('http://localhost:5000/api/user', {
  //   method: 'GET',
  //   credentials: 'include' // <-- instruct browser to send credentials, it will use the session ID.
  // });
  // return response.json();
}

export const signup = async (credentials: SignUpCredentials): Promise<User> => {
  const response = await fetchData(import.meta.env.VITE_API_BASE_URL + '/user/signup', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: 'include', // <-- instruct browser to send credentials, or session will be created every time.
  });
  return response.json();
}

export const login = async (credentials: LoginCredentials): Promise<User> => {

  const response = await fetchData(import.meta.env.VITE_API_BASE_URL + '/user/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: 'include', // <-- instruct browser to send credentials, or session will be created every time.
  });

  return response.json()
}

export const logout = async (): Promise<void> => {
  await fetchData(import.meta.env.VITE_API_BASE_URL + '/user/logout', {
    method: 'POST',
    credentials: 'include', // <-- instruct browser to send credentials, or session will be created every time.
  });
}