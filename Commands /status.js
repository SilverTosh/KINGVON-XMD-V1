const os = require('os');
const moment = require('moment');

module.exports = {

  // .ping command
  ping: async (client, m) => {
    const used = process.memoryUsage();
    const cpu = os.cpus()[0].model;
    const platform = os.platform();
    const uptime = process.uptime();
    
    let msg = `🏓 *Pong!*\n\n`;
    msg += `*CPU:* ${cpu}\n`;
    msg += `*Platform:* ${platform}\n`;
    msg += `*RAM:* ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB\n`;
    msg += `*Uptime:* ${moment.duration(uptime, "seconds").humanize()}`;
    
    await client.sendMessage(m.chat, { text: msg });
  },

  // .uptime command
  uptime: async (client, m) => {
    const uptime = process.uptime();
    m.reply(`⏰ Bot Uptime: ${moment.duration(uptime, "seconds").humanize()}`);
  },

  // .menu command
  menu: async (client, m) => {
    const menuText = `

╭━━━〔 *KINGVON-XMD BOT MENU* 〕━━━╮

*Main Commands*
.menu – Show this menu
.ping – Bot status
.vv – View-once opener
.antidelete on/off – Recover deleted messages
.bug – Bug menu
.sticker – Make sticker
.download – Download media
.autobio – Turn autobio on/off

*Fun Menu*
.vv
.sticker
.uptime
.url

*Group Commands*
.opentime [time] – Schedule group open
.closetime [time] – Schedule group close
.promote @user – Make user admin
.demote @user – Remove admin
.gclink – Group invite link
.antilink on/off – Anti-link on/off
.antidelete on/off – Recover deleted msgs
.remove +[code] – Remove users
.terminate – Delete group (admin only)
.del (tag) – Delete message
.tag – Tag all members
.hidetag – Tag hidden

*Owner Settings (KINGVON Only)*
.code [number] – Generate pairing code
.block @user – Block user
.unblock @user – Unblock user
.danger – Restart bot
.grandson – Kill group (fun)
.vv2 – Special action

*Automatic Features:*
- Bot randomly reacts to commands: 🤕 ✅ 🚀 🚁 👾 ⚡ 🌟 ☠️

╰━━━〔 Powered by KINGVON 〕━━━╯
    `;
    await client.sendMessage(m.chat, { text: menuText });
  }

};
