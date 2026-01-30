import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string()
    .pattern(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/)
    .max(20)
    .allow('', null)
    .optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const carSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  model: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow('', null).optional(),
  rental_price_per_day: Joi.number().positive().required(),
  buy_price: Joi.number().positive().allow(null).optional(),
  sell_price: Joi.number().positive().allow(null).optional(),
  car_type: Joi.string().valid('luxury', 'suv', 'sedan', 'convertible', 'van').required(),
  event_suitability: Joi.array().items(Joi.string()).default([]),
  availability_status: Joi.string().valid('available', 'rented', 'sold', 'maintenance').default('available'),
  specs: Joi.object().default({}),
});

export const requestSchema = Joi.object({
  car_id: Joi.string().uuid().required(),
  request_type: Joi.string().valid('rent', 'buy', 'sell').required(),
  with_driver: Joi.boolean().default(false),
  event_date: Joi.date().iso().allow(null).optional(),
  event_type: Joi.string().max(100).allow(null, '').optional(),
  agreement_text: Joi.string().allow('', null).optional(),
  payment_method: Joi.string().allow(null, '').optional(),
});

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: any, res: any, next: any) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      return res.status(400).json({ errors });
    }

    req.body = value;
    next();
  };
};
