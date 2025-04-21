const { writeFileSync, unlinkSync } = require('fs');

module.exports = {
  name: 'sticker-maker',
  command: ['sticker', 'stiker'],
  description: 'Convert image or video to sticker',

  async run(conn, m, args) {
    if (!m.hasMedia) return m.reply('Reply/send an image or video to convert.');

    const media = await m.download();
    await conn.sendImageAsSticker(m.chat, media, m, {
      packname: 'KINGVON-XMD',
      author: 'Created by KINGVON'
    });
  }
};
