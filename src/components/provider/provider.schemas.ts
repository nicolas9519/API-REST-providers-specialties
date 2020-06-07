import * as Joi from '@hapi/joi';
import { PROVIDER_STAFF_STATUS, PROVIDER_STATUS, PROVIDER_TYPES } from '../../utils/constants';
import validateMongoId from '../../utils/helperFunctions/validateMongoId';

export const getAll = Joi.object({
  offSet: Joi.number().optional(),
  limit: Joi.number().optional(),
});

export const providerSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  specialty: Joi.custom(validateMongoId).required(),
  projectedStartDate: Joi.date().required(),
  providerType: Joi.string().valid(...PROVIDER_TYPES).required(),
  staffStatus: Joi.string().valid(...PROVIDER_STAFF_STATUS).required(),
  status: Joi.string().valid(...PROVIDER_STATUS).required(),
  employerId: Joi.number().allow(null).optional(),
  assignedTo: Joi.number().allow(null).optional()
}).and('employerId', 'assignedTo')

export const create = providerSchema.append({
  createdBy: Joi.number().required(),
});

export const update = providerSchema.append({
  updatedBy: Joi.number().required(),
});
