const bcrypt = require('bcryptjs');

function hashPassword(password) {
    return bcrypt.hash(password);
}

function hashPasswordSync(password) {
    return bcrypt.hashSync(password);
}

module.exports = { hashPassword, hashPasswordSync };