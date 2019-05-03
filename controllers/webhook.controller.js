const { handleEvent } = require('./line.controller')

const WebHook = function (req, res) {
    console.log("hello")
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
}

module.exports = WebHook;
