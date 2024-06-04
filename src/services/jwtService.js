const jwt = require('jsonwebtoken');

const generalAccessToken = async(payload) => {
    const access = jwt.sign({
        payload,
    }, 'your_access_token_secret', { expiresIn: '1h' });
    return access;
}

const refreshTOken = async(payload) => {
    const refresh = jwt.sign({
        payload,
    }, 'your_refresh_token_secret', { expiresIn: '7d' });
    return refresh;
}

module.exports = {
    generalAccessToken,
    refreshTOken
}