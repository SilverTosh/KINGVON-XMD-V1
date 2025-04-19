const fs = require('fs');
const path = require('path');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

// Save media locally
async function saveMediaMessage(message, filename) {
    const mediaType = Object.keys(message.message)[0];
    const stream = await downloadContentFromMessage(
        message.message[mediaType],
        mediaType.split('Message')[0]
    );

    const buffer = Buffer.from([]);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    const filePath = path.join(__dirname, '../media', filename);
    fs.writeFileSync(filePath, buffer);
    return filePath;
}

// Send Image
async function sendImage(sock, jid, pathOrUrl, caption = '') {
    await sock.sendMessage(jid, { image: { url: pathOrUrl }, caption });
}

// Send Video
async function sendVideo(sock, jid, pathOrUrl, caption = '') {
    await sock.sendMessage(jid, { video: { url: pathOrUrl }, caption });
}

// Send Audio
async function sendAudio(sock, jid, pathOrUrl, ptt = false) {
    await sock.sendMessage(jid, { audio: { url: pathOrUrl }, ptt });
}

// Send Document
async function sendDocument(sock, jid, pathOrUrl, fileName, mimetype) {
    await sock.sendMessage(jid, { document: { url: pathOrUrl }, fileName, mimetype });
}

// Send Sticker
async function sendSticker(sock, jid, pathOrUrl) {
    await sock.sendMessage(jid, { sticker: { url: pathOrUrl } });
}

module.exports = {
    saveMediaMessage,
    sendImage,
    sendVideo,
    sendAudio,
    sendDocument,
    sendSticker
};
