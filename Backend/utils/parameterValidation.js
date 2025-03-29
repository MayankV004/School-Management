import Joi from "joi";

const parameterSchema = Joi.object({
    latitude: Joi.number()
        .min(-90)
        .max(90)
        .required()
        .messages({
          'number.min': 'Latitude must be between -90 and 90',
          'number.max': 'Latitude must be between -90 and 90'
        }),
      
      longitude: Joi.number()
        .min(-180)
        .max(180)
        .required()
        .messages({
          'number.min': 'Longitude must be between -180 and 180',
          'number.max': 'Longitude must be between -180 and 180'
        })
})
export const validateParameter = (parameter) => {
  return parameterSchema.validate(parameter);
};