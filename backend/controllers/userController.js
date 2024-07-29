const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const registerUser = async(req, res)=>{
    const {username, fullname, email, password} = req.body;
    try {
        const existingUserByEmail = await User.findOne({where : {email}})
        if(existingUserByEmail){
            return res.status(422).json({ error: 'User already exists with that email' })
        }

        const existingUserByUsername = await User.findOne({where : {username}})
        if(existingUserByUsername){
            return res.status(422).json({error : 'User already exists with that username'})
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            fullname,
            email,
            password : hashPassword
        })
        res.status(200).json({user : newUser, message : 'Registered Successfully'})

    } catch (error) {
        resizeBy.status(500).json({error : error.message});
    }
}

module.exports = {registerUser}