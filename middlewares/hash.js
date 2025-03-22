const argon2 = require('argon2');

async function hashPassword(password) {
    try {
        // Gera o hash da senha
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        console.error('Erro ao gerar hash da senha:', err);
        throw new Error('Erro ao gerar hash da senha');
    }
}

async function verifyPassword(hash, password) {
    try {
        // console.log('hash:', hash);
        // console.log('password', password);
        // Compara a senha com o hash
        const isMatch = await argon2.verify(hash, password);
        return isMatch;
    } catch (err) {
        console.error('Erro ao verificar a senha:', err);
        throw new Error('Erro ao verificar a senha');
    }
}

module.exports = {hash:hashPassword, verify:verifyPassword};