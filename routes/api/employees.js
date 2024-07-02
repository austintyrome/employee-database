const router = require('express').Router();
const Employee = require('../../models/employee')

const Ask = require('../../lib/input')
const ask = new Ask();


router.get('/', async (req, res) => {
    try {
        const employeeList = await Employee.findAll();
        if (!employeeList) {
            res.status(404).json({message: 'no roles found'});
        }
        res.status(200).json({message: `roles found. res.body = ${res.body}, res.params = ${res.params}, ${employeeList}`})
    } catch (err) {
        res.status(500).json(err)
    }
    ask.init();
});

router.get('/names', async (req, res) => {
    try {
        const employeeNames = await Employee.findAll({attributes: ['id', 'first_name', 'last_name']})
        if (!employeeNames) {
            res.status(404).json({message: 'no employees found'});
        }
        res.status(200).json({message: `employees found. res.body = ${res.body}, res.params = ${res.params}, ${employreNames}`})
    } catch (err) {
        res.status(500).json(err)
    }
    ask.init();
});

router.put('/:id', async (req, res) => {
    try {
        const employee_id = req.params.id;
        const updatedRole = req.body
        const [updated] = await Employee.update(updatedRole, { where: { id: employee_id }});

        if (updated) {
            const updatedEmployee = await Employee.findOne({ where: { id: employee_id }});
            res.json({ message: 'Employee role updated successfully', employee: updatedEmployee })
        } else {
            res.status(404).json({ message: 'Employee not found!' })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update employee' });
    }
    ask.init();
})

router.post('/', async (req, res) => {
    try {
        const addNewEmployee = await Employee.create(req.body);
        res.status(200).json({ message: 'New employee added'}, addNewEmployee)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add new employee'})
    }
});

module.exports = router;