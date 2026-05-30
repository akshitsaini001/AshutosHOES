const ExpressError = require("./ExpressError.js");

const {itemSchema} = require("./Schema.js");
const validateItem = (req , res,  next)=>{
    const {error} = itemSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}

module.exports = validateItem;