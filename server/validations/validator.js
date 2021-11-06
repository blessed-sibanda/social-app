const { validationResult } = require('express-validator');

const validationErrors = (req) => {
  const errors = validationResult(req);
  let fields = [];
  errors.array().forEach((e) => {
    let param = e.param;
    if (!fields.includes(param)) fields.push(param);
  });
  let result = {};
  fields.forEach((f) => (result[f] = []));
  let errorsArr = errors.array();

  if (fields.length > 0) {
    errorsArr.forEach((e) => {
      result[e.param].push(e.msg);
    });
  }
  if (!errors.isEmpty()) {
    return result;
  }
  return null;
};

export const handleValidationErrors = (req) => {
  const errors = validationErrors(req);
  if (errors) {
    throw errors;
  }
};
