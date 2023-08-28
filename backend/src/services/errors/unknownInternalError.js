import InternalError from "./internalError.js";

export default class UnknownInternalError extends InternalError { 
    constructor() {
        super("Unknown internal service error. "); 
    }
}