// UPTIME ROBOT KEEP-ALIVE SERVER
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot is Running - KINGVON-XMD-V1'));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// MAIN BOT CODE STARTS BELOW
const { default: makeWASocket, useMultiFileAuthState, makeInMemoryStore, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const media = require('./lib/media');
const { generateCode, expireCode } = require('./lib/code'); // dynamic code generator

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ["KINGVON-XMD", "Safari", "1.0.0"]
    });

    store.bind(sock.ev);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (!m.message) return;
        if (m.key.fromMe) return;

        const body = m.message.conversation || m.message.extendedTextMessage?.text || '';

        const from = m.key.remoteJid;
        const sender = m.key.participant || m.key.remoteJid;
        const command = body.split(' ')[0].toLowerCase();

        // Random emoji reaction
        const randomEmojis = ["🤕", "✅", "🚀", "🚁", "👾", "⚡", "🌟", "☠️"];
        const randomReact = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
        sock.sendMessage(from, { react: { text: randomReact, key: m.key } });

        // Handle Commands
        switch (command) {
            case '.menu':
                const menuText = `
╭═══『KINGVON-XMD BOT MENU』══⊷

➥ Main Commands
.menu - Show this menu
.ping - Bot status
.vv - Tag a view-once message
.antidelete on/off - Recover deleted messages
.bug - Open bug menu
.sticker - Make sticker
.download - Download media
.autobio - Auto-update bio

➥ Group Commands
.opentime [time] - Schedule group open
.closetime [time] - Schedule group close
.promote @user - Make admin
.demote @user - Remove admin
.gclink - Get group link
.antilink on/off - Anti-link group
.remove +[code] - Kick numbers
.terminate - Delete group (admin only)
.del (tag msg) - Delete message
.tag - Mention everyone
.hidetag - Mention hidden

➥ Fun Menu
.vv - Tag view-once
.sticker - Create sticker
.uptime - Bot uptime
.url - Generate picture link
.vv2 - View-once unlock

➥ Owner Settings (KINGVON)
.block @user - Block user
.unblock @user - Unblock user
.code number - Generate pairing code

➥ Special
.danger - Force kick admins
.grandson - Instantly kill group

➥ Auto Features
Auto emoji reaction: 🤕 ✅ 🚀 🚁 👾 ⚡ 🌟 ☠️
                `;
                await sock.sendMessage(from, { text: menuText }, { quoted: m });
                break;

            case '.ping':
                await sock.sendMessage(from, { text: 'pong!' }, { quoted: m });
                break;

            case '.uptime':
                const uptime = process.uptime();
                await sock.sendMessage(from, { text: `Uptime: ${Math.floor(uptime / 60)} minutes` }, { quoted: m });
                break;

            case '.sticker':
                const quoted = m.quoted ? m.quoted : m;
                const mime = (quoted.msg || quoted).mimetype || '';

                if (/image/.test(mime)) {
                    const mediaPath = await media.saveMediaMessage(quoted, 'sticker.webp');
                    await media.sendSticker(sock, from, mediaPath);
                    fs.unlinkSync(mediaPath); // Clean up
                } else {
                    await sock.sendMessage(from, { text: 'Reply to an image to make sticker.' }, { quoted: m });
                }
                break;

            case '.code':
                if (sender.includes('254720326316')) { // Only KINGVON can use
                    const targetNumber = body.split(' ')[1];
                    if (!targetNumber) return sock.sendMessage(from, { text: 'Please specify a number.' }, { quoted: m });

                    const generated = await generateCode(targetNumber);
                    await sock.sendMessage(from, { text: `Here’s the pairing code for ${targetNumber}:\n\n${generated}\n\n(Expires in 3 minutes)` }, { quoted: m });

                    expireCode(generated, 180000); // Expire in 3 mins
                    setTimeout(async () => {
                        await sock.sendMessage(from, { text: `The pairing code for ${targetNumber} has expired.` });
                    }, 300000); // Autodelete 5 minutes
                } else {
                    await sock.sendMessage(from, { text: 'Only KINGVON can generate codes.' }, { quoted: m });
                }
                break;

            case '.block':
                if (sender.includes('254720326316')) {
                    const mention = body.split(' ')[1];
                    if (!mention) return sock.sendMessage(from, { text: 'Mention a user to block.' }, { quoted: m });
                    await sock.updateBlockStatus(mention + '@s.whatsapp.net', 'block');
                    await sock.sendMessage(from, { text: `Blocked ${mention}` }, { quoted: m });
                }
                break;

            case '.unblock':
                if (sender.includes('254720326316')) {
                    const mention = body.split(' ')[1];
                    if (!mention) return sock.sendMessage(from, { text: 'Mention a user to unblock.' }, { quoted: m });
                    await sock.updateBlockStatus(mention + '@s.whatsapp.net', 'unblock');
                    await sock.sendMessage(from, { text: `Unblocked ${mention}` }, { quoted: m });
                }
                break;

            default:
                break;
        }
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            if ((lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('BOT CONNECTED');
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

startBot();
