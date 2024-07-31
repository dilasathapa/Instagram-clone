const bcrypt = require('bcryptjs')
const User = require('../models/user.model');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET

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

const loginUser = async(req, res)=>{
    const {email, password} = req.body;
    try {
       const userexists = await User.findOne({where : email})
       if(!userexists){
            return res.status(401).json({error : 'User Not Found with Given email'})
       }
       const isMatching = bcrypt.compare(password, userexists.password)

       if(!isMatching){
        return res.status(401).json({error : 'Invalid password'})
       }

       
       const token = jwt.sign({id: userexists.id, username : userexists.username}, JWT_SECRET, {expiresIn : '7d'})
       res.status(200).json({token, message : 'Login Successfully'})

    } catch (error) {
        res.status(500).json({error : error.message})
        console.log(error)
    }
}

module.exports = {registerUser, loginUser}