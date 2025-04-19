const { sticker } = require('../lib/sticker');
const { fetchJson } = require('../lib/fetcher');
const axios = require('axios');
const { exec } = require('child_process');

module.exports = {

  // Make sticker from image
  sticker: async (client, m) => {
    if (!m.quoted) return m.reply('Reply to an image/video to make a sticker!');
    let mime = (m.quoted.msg || m.quoted).mimetype || '';
    if (!/image|video/.test(mime)) return m.reply('Only images or short videos are allowed.');
    let media = await m.quoted.download();
    let stickerData = await sticker(media, { packname: "KINGVON-XMD", author: "Sticker Maker" });
    client.sendMessage(m.chat, { sticker: stickerData }, { quoted: m });
  },

  // URL to media download
  url: async (client, m, args) => {
    if (!args[0]) return m.reply('Send a valid URL!');
    let response = await fetchJson(`https://api.kingvonxmd.xyz/download?url=${args[0]}`);
    if (!response.status) return m.reply('Failed to download.');
    client.sendMessage(m.chat, { video: { url: response.result.url } }, { quoted: m });
  },

  // Text-to-voice
  vv: async (client, m, args) => {
    if (!args[0]) return m.reply('Send a text to convert to voice.');
    let text = args.join(' ');
    exec(`gtts-cli "${text}" --output temp.mp3`, async (err) => {
      if (err) return m.reply('Error.');
      client.sendMessage(m.chat, { audio: { url: './temp.mp3' }, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
    });
  },

  // Another text-to-voice with another style
  vv2: async (client, m, args) => {
    if (!args[0]) return m.reply('Send a text.');
    let text = args.join(' ');
    exec(`say "${text}" -o temp.aiff && ffmpeg -i temp.aiff temp.mp3`, async (err) => {
      if (err) return m.reply('Error.');
      client.sendMessage(m.chat, { audio: { url: './temp.mp3' }, mimetype: 'audio/mp4', ptt: true }, { quoted: m });
    });
  },

  // Bot Uptime
  uptime: async (client, m) => {
    let uptime = process.uptime();
    let hours = Math.floor(uptime / 3600);
    let minutes = Math.floor((uptime % 3600) / 60);
    let seconds = Math.floor(uptime % 60);
    m.reply(`🤖 Bot Uptime: ${hours}h ${minutes}m ${seconds}s`);
  },

  // Auto Reaction to any command
  autoreact: async (client, m) => {
    const emojis = ['✅','🚀','👑','🔥','⚡','🌟'];
    let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    client.sendMessage(m.chat, { react: { text: randomEmoji, key: m.key } });
  }

};
