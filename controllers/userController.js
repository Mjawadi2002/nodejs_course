const User = require('../models/userModel');

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
        const { name, email, password } = req.body;// ya5ou les donnes elli ena nektebhom f postman mn body
        const user = new User({ name, email, password });//creation du objet user
        await user.save();//sauvgardi user mta3i f la base de donne + automatiquement creation du dossier users par default + atribution du id aleatoire a chaque user
        res.status(201).json(user);
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

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};



