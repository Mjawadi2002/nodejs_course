const User = require('../models/userModel');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcryptjs');
require('dotenv').config();

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);//res hiya reponse f partie postman wela frontend
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; //ya9ra les valeurs mn front

        const existingUser = await User.findOne({ email }); //nlawej 3ala user 3andou email foulani
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' }); //verification de email
        }
        const hashedPassword = await bcrypt.hash(password, 10); //encyption de password 10 fois
        const user = new User({ name, email, password: hashedPassword }); //sna3t user avec un mot de passe hashe
        await user.save(); // save user f data base mta3i
        return res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); //na9ra user id mn params
        if (!user) return res.status(404).json({ message: 'User not found' }); //nthabet kn user mawjoud wela
        res.status(200).json(user); //kn user mawjoud nraj3ou comme un retour json
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; //ya9ra mn front les valeurs passes
        const user = await User.findOne({ email }); //verification est ce que user mawjoud wela avec le email foulan ben foulen
        if (!user) return res.status(400).json({ message: 'Invalid email' });

        const isMatch = await bcrypt.compare(password, user.password); //verification de mot de passe
        if (!isMatch) return res.status(400).json({ message: 'Invalid  password' }); 

        const token = jwt.sign({ userId: user._id ,userName:user.name}, process.env.JWT_SECRET, { expiresIn: '1h' }); // generate token en associant data elli nheb nsajlha fih

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
};



