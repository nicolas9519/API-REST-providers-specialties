import * as Joi from '@hapi/joi'

export const getAll = Joi.object({
  offSet: Joi.number().optional(),
  limit: Joi.number().optional(),
  name: Joi.string().optional(),
  createdBy: Joi.number().optional(),
  updatedBy: Joi.number().optional(),
});
