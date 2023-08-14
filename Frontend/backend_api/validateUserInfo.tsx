import ValidationError from "./errors/validationError";

export default function validateInfo({
    username, 
    password,
    email
}: { 
    username: string | null, 
    password: string | null, 
    email: string | null, 
}) {
     // cannot figure out the bug???? Just need to try catch!!!
     if(!username && !email) { 
        throw new ValidationError("Missing both username and password"); 
    }

    if(username && (typeof username != "string")) { 
        throw new ValidationError("Username is not a string"); 
    }

    if(email && (typeof email != "string")) { 
        throw new ValidationError("Email is not a string"); 
    }

    if(typeof password != "string") { 
        throw new ValidationError("Password is not a string"); 
    }
}
