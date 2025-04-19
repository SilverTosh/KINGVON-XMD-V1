const { getBuffer } = require('../lib/myfunc');
const axios = require('axios');
const moment = require('moment');

module.exports = {
  
  // Tag view-once message
  vv: async (client, m) => {
    if (!m.quoted) return m.reply('Reply to a view-once message.');
    if (!m.quoted.viewOnce) return m.reply('This is not a view-once message.');
    let msg = m.quoted.message;
    client.sendMessage(m.chat, msg, { quoted: m });
  },

  // Another method for view-once
  vv2: async (client, m) => {
    if (!m.quoted) return m.reply('Reply to a view-once message.');
    if (!m.quoted.viewOnce) return m.reply('This is not a view-once message.');
    let msg = m.quoted.message;
    client.sendMessage(m.chat, msg);
  },

  // Sticker maker
  sticker: async (client, m, args) => {
    const mime = (m.quoted ? m.quoted : m).mimetype || '';
    if (/image|video/.test(mime)) {
      let media = await m.quoted.download();
      client.sendImageAsSticker(m.chat, media, m, { packname: "KINGVON-XMD", author: "KINGVON" });
    } else {
      m.reply('Reply to an image or short video.');
    }
  },

  // Uptime command
  uptime: async (client, m) => {
    let uptime = process.uptime() * 1000;
    let time = moment.duration(uptime).humanize();
    m.reply(`🤖 Bot uptime: ${time}`);
  },

  // Generate image url
  url: async (client, m) => {
    const mime = (m.quoted ? m.quoted : m).mimetype || '';
    if (!/image/.test(mime)) return m.reply('Reply to an image to get its URL.');
    let media = await m.quoted.download();
    let buffer = await getBuffer(media);
    let res = await axios.post('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY', {
      image: buffer.toString('base64')
    });
    if (res.data && res.data.data && res.data.data.url) {
      m.reply(`🔗 Image URL:\n${res.data.data.url}`);
    } else {
      m.reply('❌ Failed to generate URL.');
    }
  }

};
