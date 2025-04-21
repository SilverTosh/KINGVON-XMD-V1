module.exports = {
  name: 'antidelete',
  command: ['antidelete'],
  description: 'Recover deleted messages',

  async run(conn, m, args) {
    if (args[0] === 'on') {
      conn.antidelete = true;
      m.reply('Antidelete enabled.');
    } else if (args[0] === 'off') {
      conn.antidelete = false;
      m.reply('Antidelete disabled.');
    } else {
      m.reply('Use: .antidelete on / .antidelete off');
    }
  }
};
