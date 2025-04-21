module.exports = {
  name: 'group',
  command: ['opentime', 'closetime', 'promote', 'demote', 'gclink', 'remove', 'terminate', 'tag', 'hidetag'],
  description: 'Manage groups',

  async run(conn, m, args, { command, isGroupAdmin }) {
    if (!m.isGroup) return m.reply('This command works only in groups.');
    if (!isGroupAdmin) return m.reply('Admins only.');

    switch (command) {
      case 'opentime':
        m.reply('Group is now OPEN.');
        break;
      case 'closetime':
        m.reply('Group is now CLOSED.');
        break;
      case 'promote':
        await conn.groupParticipantsUpdate(m.chat, [args[0]], 'promote');
        m.reply(`Promoted ${args[0]}`);
        break;
      case 'demote':
        await conn.groupParticipantsUpdate(m.chat, [args[0]], 'demote');
        m.reply(`Demoted ${args[0]}`);
        break;
      case 'gclink':
        const invite = await conn.groupInviteCode(m.chat);
        m.reply(`Group Invite: https://chat.whatsapp.com/${invite}`);
        break;
      case 'remove':
        await conn.groupParticipantsUpdate(m.chat, [args[0]], 'remove');
        m.reply(`Removed ${args[0]}`);
        break;
      case 'terminate':
        await conn.groupLeave(m.chat);
        break;
      case 'tag':
        m.reply('Tagging group members...');
        break;
      case 'hidetag':
        m.reply('Hidden tag to all members...');
        break;
    }
  }
};
