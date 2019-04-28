const {config,handleEvent,handleMessageEvent} = require('./../config/line.controller')

const WebHook = function (req, res) {
    res.sendStatus(200)
    /*
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
    */
}

module.exports = WebHook;
