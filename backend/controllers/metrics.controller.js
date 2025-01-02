const Metrics = require('../models/Metrics');

exports.createMetrics = async (req, res) => {
    try {
        const metrics = await Metrics.create(req.body);
        res.status(201).json(metrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMetricsById = async (req, res) => {
    const { metricsId } = req.params;
    try {
        const metrics = await Metrics.findByPk(metricsId);
        if (!metrics) {
            return res.status(404).json({ message: 'Metrics not found' });
        }
        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMetrics = async (req, res) => {
    const { metricsId } = req.params;
    try {
        const metrics = await Metrics.findByPk(metricsId);
        if (!metrics) {
            return res.status(404).json({ message: 'Metrics not found' });
        }
        await metrics.update(req.body);
        res.status(200).json(metrics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMetrics = async (req, res) => {
    const { metricsId } = req.params;
    try {
        const metrics = await Metrics.findByPk(metricsId);
        if (!metrics) {
            return res.status(404).json({ message: 'Metrics not found' });
        }
        await metrics.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};