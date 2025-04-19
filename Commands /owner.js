const { generateRandomCode } = require('../lib/myfunc');
const { serialize } = require('../lib/serialize');
const { saveCode, deleteExpiredCodes } = require('../lib/codeManager');

const OWNER_NUMBER = '254720326316'; // KINGVON owner number

module.exports = {

  // Block user
  block: async (client, m, args) => {
    if (!args[0]) return m.reply('Please provide the number to block.');
    let number = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await client.updateBlockStatus(number, "block");
    m.reply(`✅ Blocked ${args[0]}`);
  },

  // Unblock user
  unblock: async (client, m, args) => {
    if (!args[0]) return m.reply('Please provide the number to unblock.');
    let number = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await client.updateBlockStatus(number, "unblock");
    m.reply(`✅ Unblocked ${args[0]}`);
  },

  // Generate pairing code (.code command)
  code: async (client, m, args) => {
    if (!m.sender.includes(OWNER_NUMBER)) return m.reply('❌ Only KINGVON can use this command.');

    if (!args[0]) return m.reply('Please provide the number to generate pairing code for.');

    let userNumber = args[0].replace(/[^0-9]/g, '');
    let pairingCode = generateRandomCode(8); // 8 characters long

    // Save code to memory/storage (and auto-expire after 3 mins)
    saveCode(userNumber, pairingCode);

    m.reply(`🔗 Pairing Code for +${userNumber}:\n\n*${pairingCode}*\n\n(Expires in 3 minutes)`);

    // Auto delete after 5 minutes
    setTimeout(() => {
      client.sendMessage(m.chat, { delete: m.key });
    }, 5 * 60 * 1000);

    // Auto clean expired codes
    setTimeout(() => {
      deleteExpiredCodes();
    }, 3 * 60 * 1000);
  }

};
