const { sticker } = require('../lib/sticker'); // Assuming you have sticker helper

module.exports = {

  // .sticker command
  sticker: async (client, m, quoted, mime) => {
    try {
      let media = await client.downloadAndSaveMediaMessage(quoted || m);
      
      if (!media) {
        return m.reply('❌ Please send or reply to an image/video to make a sticker!');
      }

      await client.sendMessage(m.chat, { 
        sticker: { url: media } 
      }, { quoted: m });

    } catch (err) {
      console.error(err);
      m.reply('❌ Failed to create sticker.');
    }
  }

};
