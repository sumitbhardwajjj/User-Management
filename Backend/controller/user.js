const model = require("../models/user");
const USER = model.USERS;

exports.getAllUser = async (req, res) => {
    try {
        const users = await USER.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

exports.getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await USER.findById(id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

exports.replaceUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await USER.findOneAndReplace({ _id: id }, req.body);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await USER.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await USER.findOneAndDelete({ _id: id });
        res.status(204).json(deletedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}
