const Session = require('../models/Session');

exports.getAllSessions = async (req, res) => {
    const sessions = await Session.findAll();
    res.json(sessions);
};

exports.getSessionById = async (req, res) => {
    const session = await Session.findByPk(req.params.id);
    if (session) {
        res.json(session);
    } else {
        res.status(404).send('Session not found');
    }
};

exports.createSession = async (req, res) => {
    const session = await Session.create(req.body);
    res.json(session);
};

exports.updateSession = async (req, res) => {
    const session = await Session.findByPk(req.params.id);
    if (session) {
        await session.update(req.body);
        res.json(session);
    } else {
        res.status(404).send('Session not found');
    }
};

exports.deleteSession = async (req, res) => {
    const session = await Session.findByPk(req.params.id);
    if (session) {
        await session.destroy();
        res.send('Session deleted');
    } else {
        res.status(404).send('Session not found');
    }
};