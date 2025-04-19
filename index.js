const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const fs = require('fs');
const config = require('./config');

// Logger
const logger = pino({ level: 'silent' });

// Get a random emoji
function getRandomEmoji() {
    const emojis = ['🤕', '✅', '🚀', '🚁', '👾', '⚡', '🌟', '☠️'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Generate random 8-character code
function generateRandomCode(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('sessions');

    const sock = makeWASocket({
        logger,
        printQRInTerminal: true,
        auth: state,
        browser: [config.BOT_NAME, 'Chrome', '5.0'],
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                console.log("Reconnecting...");
                startBot();
            } else {
                console.log("Session logged out.");
            }
        } else if (connection === 'open') {
            console.log(`✅ ${config.BOT_NAME} connected!`);
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

        // Auto Random Reaction
        if (body.startsWith(config.PREFIX)) {
            if (config.AUTO_REACT.toLowerCase() === "yes") {
                await sock.sendMessage(from, { react: { text: getRandomEmoji(), key: msg.key } });
            }
        }

        // Command Handlers

        // .menu
        if (body === `${config.PREFIX}menu`) {
            await sock.sendMessage(from, { text: `
╭─「 KINGVON-XMD BOT MENU 」
│
├──「 Main Commands 」──
│ ✪ .menu
│ ✪ .ping
│ ✪ .vv
│ ✪ .antidelete on/off
│ ✪ .bug
│ ✪ .sticker
│ ✪ .download
│ ✪ .autobio
│
├──「 Group Commands 」──
│ ✪ .opentime [time]
│ ✪ .closetime [time]
│ ✪ .promote @user
│ ✪ .demote @user
│ ✪ .gclink
│ ✪ .antilink on/off
│ ✪ .remove +[code]
│ ✪ .terminate
│ ✪ .del (tag)
│ ✪ .tag
│ ✪ .hidetag
│
├──「 Fun Menu 」──
│ ✪ .vv
│ ✪ .vv2
│ ✪ .sticker
│ ✪ .uptime
│ ✪ .url
│
├──「 Owner Settings 」──
│ ✪ .block
│ ✪ .unblock
│ ✪ .code (number)
│
├──「 VON SPECIAL 」──
│ ✪ .danger
│ ✪ .grandson
│
├──「 Support 」──
│ ✪ Join Support Channel
│
├──「 Automatic Features 」──
│ ✪ Bot randomly reacts to all commands with emojis.
╰─────────────────⊷
            ` });
        }

        // .ping
        if (body === `${config.PREFIX}ping`) {
            await sock.sendMessage(from, { text: '🏓 KINGVON-XMD alive!' });
        }

        // .code (dynamic pairing code for owner)
        if (body.startsWith(`${config.PREFIX}code`)) {
            if (!sender.includes(config.OWNER_NUMBER)) {
                await sock.sendMessage(from, { text: "❌ Only KINGVON can generate codes!" });
                return;
            }
            const number = body.split(' ')[1];
            if (!number) {
                await sock.sendMessage(from, { text: "⚠️ Usage: .code 2547xxxxxxxx" });
                return;
            }
            const pairingCode = generateRandomCode();
            const sentMessage = await sock.sendMessage(from, { text: `🔗 Pairing code for *${number}*:\n\n*${pairingCode}*\n\n⏳ (Expires in 3 minutes)` });

            // Code expiry (after 3 minutes)
            setTimeout(async () => {
                console.log(`⌛ Code for ${number} expired.`);
            }, 180000); // 3 minutes

            // Message auto delete after 5 minutes
            setTimeout(async () => {
                try {
                    await sock.sendMessage(from, { delete: sentMessage.key });
                } catch (e) {
                    console.error('❗ Failed to delete pairing message:', e);
                }
            }, 300000); // 5 minutes
        }

        // Add handling for .sticker, .vv, .vv2, .uptime, .url, .block, .unblock if needed
    });

    sock.ev.on('creds.update', saveCreds);
}

startBot();
