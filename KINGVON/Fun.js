const { getUrlLinkImage } = require('../lib/tools');

module.exports = {
  name: 'fun',
  command: ['vv', 'url'],
  description: 'Fun commands like view-once and URL upload',

  async run(conn, m, args, { command }) {
    if (command === 'vv') {
      m.reply('Reply to a view-once message to unlock.');
    } else if (command === 'url') {
      if (!m.hasMedia) return m.reply('Reply to an image.');
      const media = await m.download();
      const link = await getUrlLinkImage(media);
      m.reply(`Your uploaded image URL:\n${link}`);
    }
  }
};
