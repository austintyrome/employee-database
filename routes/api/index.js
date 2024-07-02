const router = require('express').Router();

const employees = require('./employees');
const roles = require('./roles');
const departments = require('./departments');


const Department = require('../../models/department');
const Role = require('../../models/role');
const Employee = require('../../models/employee')

const models = {
    Department,
    Role,
    Employee,
  };
  

  Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

router.use('/employees', employees);
router.use('/roles', roles);
router.use('/departments', departments)

module.exports = router, models;