import InternalError from "./internalError";

export default class UnknownInternalError extends InternalError { 
    constructor() {
        super("Unknown internal service error. "); 
    }
}