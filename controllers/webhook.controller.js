const {  config, handleEvent, handleMessageEvent } = require('./line.controller')

const WebHook = function (req, res) {
    console.log(req);

    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
}

module.exports = WebHook;
