const { generatePairingCode } = require('../lib/pairing');

module.exports = {
  name: 'owner',
  command: ['block', 'unblock', 'code'],
  description: 'Owner-only features',

  async run(conn, m, args, { command, isOwner }) {
    if (!isOwner) return m.reply('Only KINGVON can use this.');

    if (command === 'block') {
      let user = args[0];
      if (!user) return m.reply('Provide number.');
      await conn.updateBlockStatus(user + '@s.whatsapp.net', 'block');
      m.reply(`Blocked ${user}`);
    } else if (command === 'unblock') {
      let user = args[0];
      if (!user) return m.reply('Provide number.');
      await conn.updateBlockStatus(user + '@s.whatsapp.net', 'unblock');
      m.reply(`Unblocked ${user}`);
    } else if (command === 'code') {
      if (!args[0]) return m.reply('Enter a number.');
      const pairing = await generatePairingCode(args[0]);
      m.reply(`Your pairing code is: *${pairing}*`);
    }
  }
};
