module.exports = {

  // Promote user to admin
  promote: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command only works in groups.');
    if (!m.isAdmin) return m.reply('Only group admins can use this command!');
    if (!m.mentionedJid[0]) return m.reply('Mention a user to promote!');
    await client.groupParticipantsUpdate(m.chat, [m.mentionedJid[0]], "promote");
    m.reply('✅ User promoted to admin!');
  },

  // Demote user from admin
  demote: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command only works in groups.');
    if (!m.isAdmin) return m.reply('Only group admins can use this command!');
    if (!m.mentionedJid[0]) return m.reply('Mention a user to demote!');
    await client.groupParticipantsUpdate(m.chat, [m.mentionedJid[0]], "demote");
    m.reply('✅ User demoted from admin!');
  },

  // Remove user from group
  remove: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command only works in groups.');
    if (!m.isAdmin) return m.reply('Only group admins can use this command!');
    if (!m.mentionedJid[0]) return m.reply('Mention a user to remove!');
    await client.groupParticipantsUpdate(m.chat, [m.mentionedJid[0]], "remove");
    m.reply('✅ User removed!');
  },

  // Group Open
  opentime: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command only works in groups.');
    if (!m.isAdmin) return m.reply('Only group admins can use this command!');
    await client.groupSettingUpdate(m.chat, 'not_announcement');
    m.reply('✅ Group opened!');
  },

  // Group Close
  closetime: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command only works in groups.');
    if (!m.isAdmin) return m.reply('Only group admins can use this command!');
    await client.groupSettingUpdate(m.chat, 'announcement');
    m.reply('✅ Group closed!');
  },

  // Tag all members
  tag: async (client, m) => {
    if (!m.isGroup) return m.reply('This command only works in groups.');
    if (!m.isAdmin) return m.reply('Only group admins can use this command!');
    let text = '🏷️ *Tagging all members:*\n\n';
    for (let mem of m.groupMetadata.participants) {
      text += `@${mem.id.split('@')[0]} `;
    }
    client.sendMessage(m.chat, { text: text, mentions: m.groupMetadata.participants.map(a => a.id) });
  },

  // Hide tag
  hidetag: async (client, m, args) => {
    if (!m.isGroup) return m.reply('This command only works in groups.');
    if (!m.isAdmin) return m.reply('Only group admins can use this command!');
    let text = args.join(' ') || '';
    client.sendMessage(m.chat, { text: text, mentions: m.groupMetadata.participants.map(a => a.id) }, { quoted: m });
  },

  // Delete specific message
  del: async (client, m) => {
    if (!m.isGroup) return m.reply('This command only works in groups.');
    if (!m.isAdmin) return m.reply('Only group admins can use this command!');
    if (!m.quoted) return m.reply('Reply to the message you want to delete.');
    await client.sendMessage(m.chat, { delete: m.quoted.key });
  },

  // Terminate group (Only owner)
  terminate: async (client, m) => {
    if (!m.isGroup) return m.reply('This command only works in groups.');
    if (m.sender !== '254720326316@s.whatsapp.net') return m.reply('Only KINGVON can use this command!');
    await client.groupLeave(m.chat);
    await client.groupUpdateSubject(m.chat, '❌ Terminated ❌');
    m.reply('Group terminated.');
  }

};
