const { Auth } = require('../models/auth');

const authenticate = async (req, res, next) => {
    try {
        const { username, password } = req.headers;
        
        if (!username || !password) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const auth = await Auth.findOne({ username });
        if (!auth) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await auth.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        req.user = auth;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

module.exports = { authenticate, isAdmin };