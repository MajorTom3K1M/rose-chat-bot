const { handleEvent } = require('./line.controller')

const WebHook = function (req, res) {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch(err => console.log(err));
}

module.exports = WebHook;
