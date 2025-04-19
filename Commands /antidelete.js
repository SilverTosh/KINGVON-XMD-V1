const store = require('../lib/store'); // Assuming you have a simple DB or JSON system

module.exports = {

  antidelete: async (client, m, text, isGroup) => {
    try {
      if (!isGroup) return m.reply('❌ This command can only be used in groups.');

      const args = text.trim().toLowerCase();
      if (!['on', 'off'].includes(args)) return m.reply('❌ Use .antidelete on or .antidelete off');

      if (args === 'on') {
        store.setAntidelete(m.chat, true);
        m.reply('✅ Anti-delete enabled in this group!');
      } else {
        store.setAntidelete(m.chat, false);
        m.reply('✅ Anti-delete disabled in this group.');
      }

    } catch (err) {
      console.error(err);
      m.reply('❌ Error setting anti-delete.');
    }
  },

  // This auto-recover when a message gets deleted
  onMessageDelete: async (client, message) => {
    try {
      const { key, message: msgContent, participant } = message;

      const isGroup = key.remoteJid.endsWith('@g.us');
      if (!isGroup) return;

      const antideleteEnabled = store.getAntidelete(key.remoteJid);
      if (!antideleteEnabled) return;

      if (!msgContent) return;

      let sender = participant ? participant : key.participant;
      let from = key.remoteJid;

      await client.sendMessage(from, { 
        text: `🗑 *AntiDelete*:\nUser: @${sender.split('@')[0]}\nRecovered message:\n\n${msgContent.conversation || 'Media message'}`, 
        mentions: [sender] 
      });

    } catch (err) {
      console.error('Error in anti-delete recover:', err);
    }
  }

};
