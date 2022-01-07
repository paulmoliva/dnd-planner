var express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../../models');

const saltRounds = 10;
var router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        if (err) {
            return res.status(500).json({ ok: false })
        }
        const newUser = User.build({ username, email, hash })
        const token = uuidv4();
        newUser.token = token;
        await newUser.save();
        res.status(200).json({ ok: true, username, email, token })
    });
})

router.post('/login', async (req, res) => {
    const message = 'Login info invalid.'
    const { username, password } = req.body;
    
    let foundUser = await User.findOne({ where: { username } });

    if (!foundUser) {
        foundUser = await User.findOne({ where: { email: username } });
    }

    if (!foundUser) {
        return res.status(401).json({ ok: false, message })
    }

    bcrypt.compare(password, foundUser.hash, async function(err, result) {
        
        if (result && !err) {
            const token = uuidv4();
            foundUser.token = token;
            await foundUser.save()
            return res.status(200).json({ ok: true, token })
        }

        return res.status(401).json({ ok: false, message })
    });
})

module.exports = router;