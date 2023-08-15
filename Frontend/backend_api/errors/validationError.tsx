import APIError from "./apiError";

// the layer above does not comply with the contract with the layer below. 
export default class ValidationError extends APIError { 
}