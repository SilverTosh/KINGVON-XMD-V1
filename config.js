module.exports = {
  OWNER_NUMBER: '254720326316', // Your full number with country code
  OWNER_NAME: 'KINGVON', // Your owner name
  BOT_NAME: 'KINGVON-XMD', // Your bot's name
  SESSION_ID: '', // Will be filled after pairing
  PREFIXES: ['.', '#', '$', '&', '-', '+', '!', '*', '¶'], // All prefixes you allow
  FOOTER: 'KINGVON-XMD Bot', // Footer text for menus and messages
  THUMBNAIL: 'https://i.ibb.co/XXxXXxXX/thumb.jpg', // Menu thumbnail (can be any image link)
  AUTO_LIKE_STATUS: true, // Auto-like viewed statuses
  AUTO_VIEW_STATUS: true, // Auto-view statuses
  AUTO_REACT_COMMAND: true, // Random emoji reactions to any command
  AUTO_READ: false, // Auto-read messages
  AUTO_BIO: true, // Auto-update your WhatsApp bio
  PUBLIC_MODE: true, // Bot available to everyone (false = only owner)
  ANTILINK_ACTION: 'remove', // Options: 'remove', 'warn', 'delete'
  ANTIDELETE_ENABLED: true, // Recover deleted messages
  SUPPORT_GROUP_LINK: 'https://chat.whatsapp.com/XXXXXXXXXXXXX', // Your support WhatsApp group link

  // Special Owner Commands Settings
  DYNAMIC_CODE_ENABLED: true, // .code (user number) to generate a 3-min valid code
  CODE_EXPIRE_TIME_MS: 3 * 60 * 1000, // Code expiration: 3 minutes
  CODE_DELETE_TIME_MS: 5 * 60 * 1000, // Auto-delete .code message after 5 minutes
  CODE_FORMAT: 'alphanumeric', // Codes are mixed letters and numbers

  EMOJI_REACTIONS: ['🤕', '✅', '🚀', '🚁', '👾', '⚡', '🌟', '☠️'], // Random reactions list
};
