// Middleware for validating id parameter for update and delete operations
function validateid(schema){
    return(req, res, next)=>{
    const {error} = schema.validate(parseInt(req.params.id));

    if(error){
        next(error);
    }
    else{
        next();
    }
}
}

// Middleware for validating request body against a given schema
function validationhandler(schema){
    return(req, res, next)=>{
        const data = req.body;

        const {error} = schema.validate(data);

        if(error){
            next(error);
        }
        else{
            next();
        }
    }
}

export {validationhandler, validateid};