function validateid(schema){
    return(req, res, next)=>{
    const {error} = schema.validate(parseInt(req.query.id));

    if(error){
        next(error);
    }
    else{
        next();
    }
}
}

function validationhandler(schema){
    return(req, res, next)=>{
        let data

        if(req.body.body == undefined){
            data = req.body;
        } else {
            data = JSON.parse(req.body.body);
        }


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