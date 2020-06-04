import * as Joi from '@hapi/joi'
import validateMongoId from '../../utils/helperFunctions/validateMongoId';
import { PROVIDER_TYPES, PROVIDER_STAFF_STATUS, PROVIDER_STATUS } from '../../utils/constants';

export const getAll = Joi.object({
  offSet: Joi.number().optional(),
  limit: Joi.number().optional(),
});

export const create = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  specialty: Joi.custom(validateMongoId).required(),
  projectedStartDate: Joi.date().required(),
  providerType: Joi.string().valid(PROVIDER_TYPES).required(),
  staffStatus: Joi.string().valid(PROVIDER_STAFF_STATUS).required(),
  status: Joi.string().valid(PROVIDER_STATUS).required(),
  createdBy: Joi.number().required(),
  employerId: Joi.number().optional(),
  assignedTo: Joi.number()
    .when('employerId', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
});

export const update = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  specialty: Joi.custom(validateMongoId).required(),
  projectedStartDate: Joi.date().required(),
  providerType: Joi.string().valid(PROVIDER_TYPES).required(),
  staffStatus: Joi.string().valid(PROVIDER_STAFF_STATUS).required(),
  status: Joi.string().valid(PROVIDER_STATUS).required(),
  updatedBy: Joi.number().required(),
  employerId: Joi.number().optional(),
  assignedTo: Joi.number()
    .when('employerId', {
      is: Joi.exist(),
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
});
