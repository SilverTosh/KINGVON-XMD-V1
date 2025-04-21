const { sendMessageWTyping } = require('../lib/simple');

module.exports = {
  name: 'status',
  command: ['ping', 'uptime'],
  description: 'Bot Status',

  async run(conn, m, args) {
    const uptime = process.uptime() * 1000;
    const format = (ms) => {
      let h = Math.floor(ms / 3600000);
      let m = Math.floor((ms % 3600000) / 60000);
      let s = Math.floor((ms % 60000) / 1000);
      return `${h}h ${m}m ${s}s`;
    };

    await conn.sendMessage(m.chat, { text: `🤖 *Bot Uptime:* ${format(uptime)}` }, { quoted: m });
  }
};
