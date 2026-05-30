const Joi = require("joi");

const itemSchema = Joi.object({item:Joi.object({
    name:Joi.string().required(),
    price:Joi.number().required(),
    description:Joi.string().required(),
    isDiscount:Joi.boolean().required(),
    percent_discount:Joi.string().min(1).max(95).required(),
    image:Joi.string().required(),
    rating:Joi.number().min(1).max(5).required(),
    gender:Joi.string().required()

    }).required()
})

module.exports = {itemSchema};