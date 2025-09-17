app.get('/users', authenticate, isAdmin, async (req, res) => {
    try {
        const users = await Auth.find({}, { password: 0 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.put('/users/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { password, ...updateData } = req.body;

        
        if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const updatedUser = await Auth.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.delete('/users/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        // Users can only delete their own account unless they're admin
        if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const deletedUser = await Auth.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});
