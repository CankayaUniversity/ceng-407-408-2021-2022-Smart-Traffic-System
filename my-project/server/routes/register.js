const express = require('express')
const router = express.Router()
const {verifyJWT} = require('../middleware/verifyJWT')

const {registerUser,loginUser} = require('../controllers/register')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/getUsername').get(verifyJWT, (req,res)=>{
    res.json({isLoggedIn: true, username: req.user.username})
})

module.exports = router