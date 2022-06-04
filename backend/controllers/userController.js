//@desc    Register new user
//@route   Post /api/users
//@access  Public
const registerUser = (req, res) => {
    res.json({ message: 'register user'})
}

//@desc    Authenticate a user
//@route   Post /api/users/login
//@access  Public
const loginUser = (req, res) => {
    res.json({ message: 'login user'})
}

//@desc    Get user data
//@route   Get /api/users/me
//@access  Public
const getMe = (req, res) => {
    res.json({ message: 'User data display'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}