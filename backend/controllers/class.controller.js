const Class = require('../models/Class');

exports.getAllClasses = async (req, res) => {
    const classes = await Class.findAll();
    res.json(classes);
};

exports.getClassById = async (req, res) => {
    const classInstance = await Class.findByPk(req.params.id);
    if (classInstance) {
        res.json(classInstance);
    } else {
        res.status(404).send('Class not found');
    }
};

exports.createClass = async (req, res) => {
    const classInstance = await Class.create(req.body);
    res.json(classInstance);
};

exports.updateClass = async (req, res) => {
    const classInstance = await Class.findByPk(req.params.id);
    if (classInstance) {
        await classInstance.update(req.body);
        res.json(classInstance);
    } else {
        res.status(404).send('Class not found');
    }
};

exports.deleteClass = async (req, res) => {
    const classInstance = await Class.findByPk(req.params.id);
    if (classInstance) {
        await classInstance.destroy();
        res.send('Class deleted');
    } else {
        res.status(404).send('Class not found');
    }
};