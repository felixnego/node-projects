const model = require("../models/friends.model");

function addFriend(req, res) {
    if (!req.body.name) {
        return res.status(400).json({
            error: "Name property of Friend is required."
        });
    }

    const newFriend = {
        name: req.body.name,
        id: model.length
    }
    model.push(newFriend);

    return res.json(newFriend);
}

function getFriends(req, res) {
    return res.json(model);
}

function getFriend(req, res) {
    const friendId = Number(req.params.model);
    const friend = model[friendId];

    if (friend) {
        return res.status(200).json(friend);
    } else {
        return res.status(404).json({
            error: "Friend does not exist"
        })
    }
}

module.exports = {
    addFriend, getFriend, getFriends
}