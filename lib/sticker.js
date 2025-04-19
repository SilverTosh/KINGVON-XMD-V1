if (body.startsWith('.sticker')) {
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';

    if (/image/.test(mime)) {
        const mediaPath = await media.saveMediaMessage(quoted, 'sticker.webp');
        await media.sendSticker(sock, from, mediaPath);
        fs.unlinkSync(mediaPath); // Remove the file after sending
    } else {
        await sock.sendMessage(from, { text: 'Please reply to an image.' }, { quoted: m });
    }
}
