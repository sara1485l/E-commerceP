const { Auth } = require('../models/auth');
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    try {
        const { username, password, email, number = 0 } = req.body;

      
        const existingUser = await Auth.findOne({ 
            $or: [{ username }, { email }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new Auth({
            username,
            password,
            email,
            number
        });

        await newUser.save();
        
        res.status(201).json({ 
            message: 'User registered successfully',
            user: { 
                username: newUser.username, 
                email: newUser.email,
                number: newUser.number,
                role: newUser.role 
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const auth = await Auth.findOne({ username });
        if (!auth) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await auth.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ 
            message: 'Login successful',
            user: { 
                username: auth.username, 
                email: auth.email,
                number: auth.number,
                role: auth.role 
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    register,
    login
};