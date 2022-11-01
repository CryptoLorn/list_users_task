const {User} = require('../models/user.model');

module.exports = {
    create: async (req, res) => {
        try {
            const {name, rank} = req.body;

            if (rank < 0 || rank > 10) {
                throw new Error('rank can\'t be < 0 or > 10');
            }

            const user = await User.create({name, rank});

            return res.json(user);
        } catch (e) {
            res.status(400).json({message: 'rank can\'t be < 0 or > 10'});
        }
    },

    getAll: async (req, res) => {
        try {
            const users = await User.findAll();

            users.sort((a, b) => a.rank < b.rank ? -1 : 1);

            return res.json(users);
        } catch (e) {
            console.log(e);
        }
    },

    updateById: async (req, res) => {
        try {
            const {id} = req.params;
            const {name, rank} = req.body;

            if (rank < 0 || rank > 10) {
                throw new Error('rank can\'t be < 0 or > 10')
            }

            const user = await User.update({name, rank}, {where: {id}});

            return res.json(user);
        } catch (e) {
            res.status(400).json({message: 'rank can\'t be < 0 or > 10'})
        }
    },

    deleteById: async (req, res) => {
        try {
            const {id} = req.params;

            const user = await User.destroy({where: {id}});

            return res.json(user);
        } catch (e) {
            console.log(e);
        }
    }
}