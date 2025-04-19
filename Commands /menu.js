const menu = (prefix) => {
  return `
╭───『 KINGVON-XMD BOT MENU 』
│
├─ ✦ Main Commands
│ ${prefix}menu – Show this menu
│ ${prefix}ping – Bot status
│ ${prefix}vv – Tag a view-once message
│ ${prefix}antidelete on/off – Recover deleted messages
│ ${prefix}bug – Open bug menu
│ ${prefix}sticker – Make sticker
│ ${prefix}download – Download media
│ ${prefix}autobio – Turn autobio on/off
│
├─ ✦ Group Commands
│ ${prefix}opentime [time] – Schedule group open
│ ${prefix}closetime [time] – Schedule group close
│ ${prefix}promote @user – Promote to admin
│ ${prefix}demote @user – Remove admin
│ ${prefix}gclink – Get group invite link
│ ${prefix}antilink on/off – Anti-link protection
│ ${prefix}antidelete on/off – Message recovery
│ ${prefix}remove +[code] – Remove by code
│ ${prefix}terminate – Delete the group (admin only)
│ ${prefix}del (tag msg) – Delete a message
│ ${prefix}tag – Mention all
│ ${prefix}hidetag – Hide mentions
│
├─ ✦ Fun Menu
│ ${prefix}vv
│ ${prefix}vv2
│ ${prefix}sticker
│ ${prefix}uptime
│ ${prefix}url – Generate image link
│
├─ ✦ Owner Settings
│ ${prefix}code [number] – Generate pairing code
│ ${prefix}block [number] – Block a user
│ ${prefix}unblock [number] – Unblock a user
│
├─ ✦ Von Special (KINGVON Only)
│ ${prefix}danger – Force kick admins
│ ${prefix}grandson – Instantly kill a group
│
├─ ✦ Automatic Features
│ ↳ Random emoji reaction to all commands
│ 🤕 ✅ 🚀 🚁 👾 ⚡ 🌟 ☠️
│
╰───『 Powered by KINGVON 』
`;
};

module.exports = menu;
