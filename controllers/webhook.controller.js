const { handleEvent } = require('./../config/line.controller')

const WebHook = function (req, res) {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
}

module.exports = WebHook;
