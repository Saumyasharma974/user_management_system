import User from '../models/User.js';

// Get profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);  // Get the user based on the userId from the auth token
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};

// Update profile
export const updateProfile = async (req, res) => {
    const { name, bio } = req.body;
    const file = req.file;  // Access the uploaded file

    const profilePicture = file ? `/uploads/${file.filename}` : null;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,  // Get user from authMiddleware
            { name, bio, profilePicture },
            { new: true }
        );

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};
