const axios = require('axios');

module.exports = {
  name: 'downloader',
  command: ['download'],
  description: 'Download media from a direct link',

  async run(conn, m, args) {
    if (!args[0]) return m.reply('Please provide a direct media URL.');

    try {
      const response = await axios.get(args[0], { responseType: 'arraybuffer' });
      await conn.sendFile(m.chat, response.data, 'file', '', m);
    } catch (e) {
      m.reply('Error downloading file.');
    }
  }
};
