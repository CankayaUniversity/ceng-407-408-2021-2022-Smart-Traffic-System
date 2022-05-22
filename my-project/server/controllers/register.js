const { db } = require('../models/user')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {
    const user = req.body

    const takenUsername = await User.findOne({ username: user.username })
    const takenEmail = await User.findOne({ email: user.email })

    if (takenUsername || takenEmail) {
        res.json({ message: "Username or email has already been taken" })
    }
    else {

        user.password = await bcrypt.hash(req.body.password, 10)
        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })

        dbUser.save()
        res.json({ message: "Success" })
    }
}
const loginUser = async (req, res) => {
    const userLoggingIn = req.body

    User.findOne({ username: userLoggingIn.username })
        .then(dbUser => {
            if (!dbUser) {
                return res.json({
                    message: "Invalid Username or Password"
                })
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            username: dbUser.username,
                        }
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            { expiresIn: 86400 },
                            (err, token) => {
                                if (err) return res.json({ message: err })
                                return res.json({
                                    message: "Success",
                                    token: "Bearer" + token
                                })
                            }
                        )
                    }
                    else {
                        return res.json({
                            message: "Invalid Username or Password"
                        })
                    }
                })

        })
}

module.exports = {
    registerUser,
    loginUser
}
