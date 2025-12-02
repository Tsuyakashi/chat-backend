const service = require('../services/openAiService');

class Controller {
    async getResponse (req, res) {
        try {
            const response = await service.getResponse(req.body);
            const messages = response.choices.map(choices => choices.message);
            res.json(messages);
        } catch (err) {
            res.status(500).json({ message: 'An error occurred', error: err})
        }
    }
}

module.exports = new Controller();
