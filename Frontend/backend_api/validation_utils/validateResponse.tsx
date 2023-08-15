import ServerError from "../errors/serverError";
import UserError from "../errors/userError";
import InternalError from "../errors/internalError";
export default async function validateResponse(response: any, location: string = "unknown") { 
    const status = response.status; 

    console.log("Validating response from server: "); 
    console.log("Status: " + status); 

    if(status === 404) { 
        console.log("Received status 404"); 
        throw new ServerError(); 
    }

    let body; 
    try { 
        body = await response.json(); 
    } catch(error) { 
        console.error("Error: Parsing json body failed at " + location); 
        throw new ServerError(); 
    }

    if(status === 500) { 
        console.error("Error at user API. Server msg: " + body.msg); 
        throw new ServerError(); 
    }
    else if(status === 403) { 
        throw new UserError("Unauthorized access"); 
    }
    else if(status == 409) { 
        throw new UserError(body.msg); 
    }

    else if(status == 400) { 
        console.error("Error: invalid request. Server msg: " + body.msg); 
        throw new InternalError("Internal error"); 
    }
    else if(status != 200) { 
        console.error("Server return unknown status code. Server msg: " + body.msg); 
        throw new ServerError(); 
    }

    return {status, body}; 
}