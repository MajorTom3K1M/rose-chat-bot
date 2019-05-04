const handleEvent = require('../util/handleEvent')

const WebHook = function (req, res) {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.status(200).json(result));
}

module.exports = WebHook;
