import APIError from "./apiError";
import InternalError from "./internalError";

// Internal server error. displayed as such to user. 
export default class ServerError extends InternalError { 
    constructor() { 
        super("Server error. Try again later"); 
    }
}