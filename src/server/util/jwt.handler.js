let jwt = require('jsonwebtoken');

module.exports = {

    generateJWTToken: (payload) => {
        return jwt.sign(payload, process.env.SESSION_SECRET || 'xxxxxxxxxxxxx');
    },

    verifyJWTToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SESSION_SECRET || 'xxxxxxxxxxxxx', (err, decoded) => {
                if (err) {
                    reject();
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}