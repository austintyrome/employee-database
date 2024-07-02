const router = require('express').Router();
const Role = require('../../models/role');

const Ask = require('../../lib/input')
const ask = new Ask();


router.get('/', async (req, res) => {
    try {
        const rolesList = await Role.findAll();
        if (!rolesList) {
            res.status(404).json({message: 'no roles found'});
        }
        res.status(200).json({message: `roles found. res.body = ${res.body}, res.params = ${res.params}, ${rolesList}`})
    } catch (err) {
        res.status(500).json(err)
    }
    ask.init();
});


router.post('/', async (req, res) => {
    try {
        const addRole = await Role.create(req.body);
        res.status(200).json(addRole)
    } catch (err) {
        res.status(500).json(err);
    }
    ask.init();
});


module.exports = router;