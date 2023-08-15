import APIError from "./apiError";
import InternalError from "./internalError";

// unknown error. requires debugging API. displayed as unknown error to user. 
export default class UnknownInternalError extends InternalError { 
    constructor() { 
        super("Unknown internal API Error"); 
    }
}