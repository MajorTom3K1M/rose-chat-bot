const handleEvent = require('../util/handleEvent')

module.exports = WebHook = function (req, res) {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.status(200).json(result));
}

