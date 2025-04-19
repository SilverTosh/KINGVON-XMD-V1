const { serialize } = require('../lib/serialize');

module.exports = {

  // Promote member
  promote: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command is for groups only.');
    if (!m.isAdmin) return m.reply('You must be an admin to use this.');
    if (!m.mentionedJid[0]) return m.reply('Mention a user to promote.');
    await client.groupParticipantsUpdate(m.chat, [m.mentionedJid[0]], "promote");
    m.reply('✅ User promoted to admin.');
  },

  // Demote member
  demote: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command is for groups only.');
    if (!m.isAdmin) return m.reply('You must be an admin to use this.');
    if (!m.mentionedJid[0]) return m.reply('Mention a user to demote.');
    await client.groupParticipantsUpdate(m.chat, [m.mentionedJid[0]], "demote");
    m.reply('✅ User demoted from admin.');
  },

  // Remove user
  remove: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command is for groups only.');
    if (!m.isAdmin) return m.reply('You must be an admin to use this.');
    if (!args[0]) return m.reply('Provide country code or tag a user to remove.');
    let number = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    await client.groupParticipantsUpdate(m.chat, [number], "remove");
    m.reply('✅ User removed.');
  },

  // Open group at specific time
  opentime: async (client, m, args) => {
    if (!m.isGroup) return m.reply('Group command only.');
    if (!m.isAdmin) return m.reply('Admin rights needed.');
    if (!args[0]) return m.reply('Provide time in minutes.');
    setTimeout(async () => {
      await client.groupSettingUpdate(m.chat, 'not_announcement');
      m.reply('✅ Group is now open!');
    }, parseInt(args[0]) * 60000);
    m.reply(`✅ Group will open in ${args[0]} minutes.`);
  },

  // Close group at specific time
  closetime: async (client, m, args) => {
    if (!m.isGroup) return m.reply('Group command only.');
    if (!m.isAdmin) return m.reply('Admin rights needed.');
    if (!args[0]) return m.reply('Provide time in minutes.');
    setTimeout(async () => {
      await client.groupSettingUpdate(m.chat, 'announcement');
      m.reply('✅ Group is now closed!');
    }, parseInt(args[0]) * 60000);
    m.reply(`✅ Group will close in ${args[0]} minutes.`);
  },

  // Group link
  gclink: async (client, m) => {
    if (!m.isGroup) return m.reply('This command is for groups only.');
    let code = await client.groupInviteCode(m.chat);
    m.reply(`🔗 Group Invite Link:\nhttps://chat.whatsapp.com/${code}`);
  },

  // Anti-link protection
  antilink: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command is for groups only.');
    if (!m.isAdmin) return m.reply('Admin rights needed.');
    if (!args[0]) return m.reply('Type "on" to activate or "off" to deactivate.');
    if (args[0] === 'on') {
      global.db.data.chats[m.chat].antilink = true;
      m.reply('✅ Anti-link activated.');
    } else if (args[0] === 'off') {
      global.db.data.chats[m.chat].antilink = false;
      m.reply('✅ Anti-link deactivated.');
    }
  },

  // Terminate (kill group)
  terminate: async (client, m) => {
    if (!m.isGroup) return m.reply('This command is for groups only.');
    if (!m.isAdmin) return m.reply('Only admins can terminate.');
    await client.groupLeave(m.chat);
    m.reply('☠️ Group terminated.');
  },

  // Tag everyone
  tag: async (client, m) => {
    if (!m.isGroup) return m.reply('This command is for groups only.');
    let members = (await client.groupMetadata(m.chat)).participants.map(v => v.id);
    client.sendMessage(m.chat, { text: members.map(v => '@' + v.split('@')[0]).join('\n'), mentions: members });
  },

  // Hide mentions (silent tag)
  hidetag: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command is for groups only.');
    let members = (await client.groupMetadata(m.chat)).participants.map(v => v.id);
    client.sendMessage(m.chat, { text: args.join(' '), mentions: members }, { quoted: m });
  },

  // Delete message (admin only)
  del: async (client, m, args) => {
    if (!m.isGroup) return m.reply('Group command only.');
    if (!m.isAdmin) return m.reply('Only admins can delete.');
    if (!m.quoted) return m.reply('Tag a message to delete.');
    await client.sendMessage(m.chat, { delete: m.quoted.key });
    m.reply('✅ Message deleted.');
  }

};
