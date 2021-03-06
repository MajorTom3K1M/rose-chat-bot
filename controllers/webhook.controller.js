const handleEvent = require('../actions/handleEvent')

module.exports = WebHook = (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.status(200).json(result));
}

