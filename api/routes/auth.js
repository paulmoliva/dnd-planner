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
        try {
            await newUser.save();
        } catch (e) {
            return res.status(500).json({ ok: false, message: 'There was a problem creating your account.' })
        }
        res.status(200).json({ ok: true, username, email, token })
    });
})

router.post('/login', async (req, res) => {
    const message = 'There was a problem logging you in.'
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
            const { username, email } = foundUser;
            const token = uuidv4();
            foundUser.token = token;
            try {
                await foundUser.save()
            } catch (e) {
                return res.status(401).json({ ok: false, message })
            }
            return res.status(200).json({ ok: true, token, username, email })
        }

        return res.status(401).json({ ok: false, message })
    });
})

module.exports = router;