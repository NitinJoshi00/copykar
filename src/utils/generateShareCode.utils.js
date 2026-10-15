const { customAlphabet } = require('nanoid');
const shareModel = require('../models/share.model.js');

const generateCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

async function generateShareCode() {
    let code;
    let exists = true;

    while (exists) {
        code = generateCode();
        exists = await shareModel.exists({ code });
    }

    return code;
}

module.exports = generateShareCode;