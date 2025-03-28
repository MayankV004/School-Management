import Joi from 'joi';

const schoolSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(255)
    .required()
    .messages({
      'string.empty': 'School name cannot be empty',
      'string.min': 'School name must be at least 2 characters long',
      'string.max': 'School name cannot exceed 255 characters'
    }),
  
  address: Joi.string()
    .trim()
    .min(5)
    .max(255)
    .required()
    .messages({
      'string.empty': 'Address cannot be empty',
      'string.min': 'Address must be at least 5 characters long',
      'string.max': 'Address cannot exceed 255 characters'
    }),
  
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
});

export const validateSchool = (school) => {
  return schoolSchema.validate(school);
};