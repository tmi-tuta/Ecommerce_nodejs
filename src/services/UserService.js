const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone, user_role } = newUser;
        const hashedPassword = await bcrypt.hash(password, 10);
        const accessToken = jwt.sign({ email }, 'your_access_token_secret', { expiresIn: '1h' });
        const refreshToken = jwt.sign({ email }, 'your_refresh_token_secret', { expiresIn: '7d' });
        try {
            const createUser = await User.create({
                name, 
                email, 
                password: hashedPassword, 
                user_role,
                phone,
                access_token: accessToken,
                refresh_token: refreshToken
            });
            if (createUser) {
                resolve({
                    status: 'success',
                    message: 'create account success.'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

const loginService = async(email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Email hoặc mật khẩu không hợp lệ.');
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Email hoặc mật khẩu không hợp lệ.');
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    return { user, token };
}

module.exports = {
    createUser,
    loginService
};