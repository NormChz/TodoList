import { ConflictError, UnauthorizedError } from "../errors/http_errors";

/**
 * Generic piece of the fetch process, used by all network operations.
 *
 * @param input URL.
 * @param init Method and other configurations.
 * @returns response data.
 */
export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  
  const response = await fetch(input, init);
  
  if (!response.ok) {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    switch(response.status) {
      case 401:
        throw new UnauthorizedError(errorMessage);
      case 409:
        throw new ConflictError(errorMessage);
      default:
        throw Error(`Request failed with status: ${response.status} | message: ${errorMessage}`);
    }
  }
  return response;
}