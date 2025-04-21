module.exports = {
  name: 'user',
  command: ['owner', 'donate', 'menu'],
  description: 'User and general commands',

  async run(conn, m, args, { command }) {
    switch (command) {
      case 'owner':
        await conn.sendContact(m.chat, [{ name: 'KINGVON', number: '254720326316' }], m);
        break;

      case 'donate':
        m.reply(`
╭─❏ *Support KINGVON-XMD* ❏
│ • M-Pesa: 254720326316
│ • PayPal: Coming Soon
│ • Patreon: Coming Soon
╰───────────────
_Thanks for supporting!_
        `);
        break;

      case 'menu':
        m.reply(`
╭─❏ *KINGVON-XMD MENU* ❏
│
│  *Status Commands*
│   ↳ .ping
│   ↳ .uptime
│
│  *Sticker Commands*
│   ↳ .sticker
│
│  *Downloader Commands*
│   ↳ .download <url>
│
│  *Group Commands*
│   ↳ .promote @user
│   ↳ .demote @user
│   ↳ .gclink
│   ↳ .terminate
│
│  *Owner Commands*
│   ↳ .block <number>
│   ↳ .unblock <number>
│   ↳ .code <number>
│
│  *Fun Commands*
│   ↳ .vv
│   ↳ .url
│
╰───────────────
        `);
        break;
    }
  }
};
