const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { File } = require('megajs');

const TOKEN = 'MTUwNTI4MjYxMjMzNDMwMTIyNA.GNLUeP.1thrCtLJ9xaAJSSvXf8upZQAZjmbPd3gEcJEyg';
const CLIENT_ID = '1505282612334301224';
const MEGA_FOLDER    = 'https://mega.nz/folder/DmRAhBjZ#QnVdilMScaUwF-ZbnF2xog';
const BH_MEGA_FOLDER = 'https://mega.nz/folder/JjJE3BpK#EUO5aFLPJ7MwTo363iqIUQ';

// ── MEGA / SR setup ────────────────────────────────────────────────────────
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB — Discord's upload limit
const MEDIA_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.m4v', '.webm']);

let srAll    = [];
let srImages = [];
let srVideos = [];

const VIDEO_EXTS = new Set(['.mp4', '.mov', '.m4v', '.webm']);
// ~1 in 3 picks will be a video (if videos are available)
const VIDEO_WEIGHT = 0.33;

function getExt(name) {
  return name.slice(name.lastIndexOf('.')).toLowerCase();
}

async function loadSrFiles() {
  try {
    console.log('Loading /sr files from MEGA...');
    const folder = File.fromURL(MEGA_FOLDER);
    await folder.loadAttributes();

    for (const file of folder.children) {
      if (file.directory) continue;
      if (file.size > MAX_FILE_SIZE) {
        console.log(`Skipping ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB — over 25 MB limit)`);
        continue;
      }
      const ext = getExt(file.name);
      if (MEDIA_EXTS.has(ext)) {
        srAll.push(file);
        if (VIDEO_EXTS.has(ext)) srVideos.push(file);
        else srImages.push(file);
      }
    }

    console.log(`/sr ready: ${srAll.length} files loaded (${srImages.length} images, ${srVideos.length} videos)`);
  } catch (err) {
    console.error('MEGA load error:', err);
  }
}

function downloadBuffer(file) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const stream = file.download();
    stream.on('data',  c   => chunks.push(c));
    stream.on('end',   ()  => resolve(Buffer.concat(chunks)));
    stream.on('error', err => reject(err));
  });
}

function pickRandom(pool, count) {
  const copy = [...pool];
  const out  = [];
  for (let i = 0; i < Math.min(count, copy.length); i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

// Weighted pick: each slot has VIDEO_WEIGHT chance of being a video (falls
// back to images if one pool runs out)
function pickWeighted(count) {
  const imgCopy = [...srImages];
  const vidCopy = [...srVideos];
  const out = [];
  const total = Math.min(count, srAll.length);

  for (let i = 0; i < total; i++) {
    const wantVideo = Math.random() < VIDEO_WEIGHT && vidCopy.length > 0;
    const pool = (wantVideo || imgCopy.length === 0) ? vidCopy : imgCopy;
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

// ── BH MEGA setup ────────────────────────────────────────────────────────
let bhAll    = [];
let bhImages = [];
let bhVideos = [];

async function loadBhFiles() {
  try {
    console.log('Loading /bh files from MEGA...');
    const folder = File.fromURL(BH_MEGA_FOLDER);
    await folder.loadAttributes();

    for (const file of folder.children) {
      if (file.directory) continue;
      if (file.size > MAX_FILE_SIZE) {
        console.log(`[bh] Skipping ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB — over 25 MB limit)`);
        continue;
      }
      const ext = getExt(file.name);
      if (MEDIA_EXTS.has(ext)) {
        bhAll.push(file);
        if (VIDEO_EXTS.has(ext)) bhVideos.push(file);
        else bhImages.push(file);
      }
    }

    console.log(`/bh ready: ${bhAll.length} files loaded (${bhImages.length} images, ${bhVideos.length} videos)`);
  } catch (err) {
    console.error('MEGA /bh load error:', err);
  }
}

function pickBhWeighted(count) {
  const imgCopy = [...bhImages];
  const vidCopy = [...bhVideos];
  const out = [];
  const total = Math.min(count, bhAll.length);

  for (let i = 0; i < total; i++) {
    const wantVideo = Math.random() < VIDEO_WEIGHT && vidCopy.length > 0;
    const pool = (wantVideo || imgCopy.length === 0) ? vidCopy : imgCopy;
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}

// ── option builders ────────────────────────────────────────────────────────
function addBaseOptions(cmd) {
  return cmd
    .addStringOption(option =>
      option
        .setName('destination')
        .setDescription('Where to send it (default: here in server)')
        .setRequired(false)
        .addChoices(
          { name: 'Here (server)', value: 'server' },
          { name: 'DM',           value: 'dm' },
        )
    )
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('How many to send (1–300)')
        .setMinValue(1)
        .setMaxValue(300)
        .setRequired(false)
    )
    .addBooleanOption(option =>
      option
        .setName('private')
        .setDescription('Only you can see it — only applies when sending in server (default: false)')
        .setRequired(false)
    );
}

function addBhOptions(cmd) {
  return addBaseOptions(
    cmd.addStringOption(option =>
      option
        .setName('type')
        .setDescription('What to send (default: random)')
        .setRequired(false)
        .addChoices(
          { name: 'Random',  value: 'random' },
          { name: 'Picture', value: 'picture' },
          { name: 'Video',   value: 'video' },
        )
    )
  );
}

const commands = [
  addBaseOptions(new SlashCommandBuilder().setName('sr').setDescription('Sends random media')),
  addBhOptions(new SlashCommandBuilder().setName('bh').setDescription('Sends random bh media')),
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

async function registerCommands() {
  try {
    console.log('Registering slash commands...');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Slash commands registered!');
  } catch (error) {
    console.error(error);
  }
}

// ── Client ─────────────────────────────────────────────────────────────────
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await Promise.all([loadSrFiles(), loadBhFiles()]);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const isSr = interaction.commandName === 'sr';
  const isBh = interaction.commandName === 'bh';
  if (!isSr && !isBh) return;

  const destination = interaction.options.getString('destination') || 'server';
  const amount      = interaction.options.getInteger('amount')     || 1;
  const isPrivate   = interaction.options.getBoolean('private')    ?? false;

  // ── /sr — downloads from MEGA and sends as attachment ─────────────────
  if (isSr) {
    if (srAll.length === 0) {
      await interaction.reply({ content: '❌ No files loaded yet — try again in a moment.', ephemeral: true });
      return;
    }

    await interaction.deferReply({ ephemeral: isPrivate });

    const picked = pickWeighted(amount);

    try {
      // Build a batch as soon as enough files are ready, then send it immediately
      // instead of waiting for every download to finish first.
      const BATCH = 10;
      let batch = [];
      let firstSent = false;

      const send = async (files) => {
        if (destination === 'dm') {
          if (!firstSent) {
            await interaction.editReply({ content: '📬 Sending to your DMs!' });
            firstSent = true;
          }
          await interaction.user.send({ files });
        } else {
          if (!firstSent) {
            await interaction.editReply({ files });
            firstSent = true;
          } else {
            await interaction.followUp({ files, ephemeral: isPrivate });
          }
        }
      };

      // Kick off all downloads at once; send each batch the moment it fills up
      await Promise.all(
        picked.map(file =>
          downloadBuffer(file)
            .then(async buffer => {
              batch.push({ attachment: buffer, name: file.name });
              if (batch.length >= BATCH) {
                const toSend = batch.splice(0, BATCH);
                await send(toSend);
              }
            })
            .catch(err => console.error(`Failed to download ${file.name}:`, err.message))
        )
      );

      // Send whatever is left in the final partial batch
      if (batch.length > 0) await send(batch);

      if (!firstSent) {
        await interaction.editReply({ content: '❌ All files failed to download — check the console for details.' });
      }
    } catch (err) {
      console.error('SR send error:', err.message, err.stack);
      await interaction.editReply({ content: `❌ Something went wrong: ${err.message}` });
    }
    return;
  }

  // ── /bh — downloads from MEGA and sends as attachment ───────────────────
  if (bhAll.length === 0) {
    await interaction.reply({ content: '❌ No /bh files loaded yet — try again in a moment.', ephemeral: true });
    return;
  }

  await interaction.deferReply({ ephemeral: isPrivate });

  const bhType  = interaction.options.getString('type') || 'random';
  let picked;
  if (bhType === 'picture') {
    picked = pickRandom([...bhImages], amount);
  } else if (bhType === 'video') {
    picked = pickRandom([...bhVideos], amount);
  } else {
    picked = pickBhWeighted(amount);
  }

  try {
    const BATCH = 10;
    let batch = [];
    let firstSent = false;

    const send = async (files) => {
      if (destination === 'dm') {
        if (!firstSent) {
          await interaction.editReply({ content: '📬 Sending to your DMs!' });
          firstSent = true;
        }
        await interaction.user.send({ files });
      } else {
        if (!firstSent) {
          await interaction.editReply({ files });
          firstSent = true;
        } else {
          await interaction.followUp({ files, ephemeral: isPrivate });
        }
      }
    };

    await Promise.all(
      picked.map(file =>
        downloadBuffer(file)
          .then(async buffer => {
            batch.push({ attachment: buffer, name: file.name });
            if (batch.length >= BATCH) {
              const toSend = batch.splice(0, BATCH);
              await send(toSend);
            }
          })
          .catch(err => console.error(`[bh] Failed to download ${file.name}:`, err.message))
      )
    );

    if (batch.length > 0) await send(batch);

    if (!firstSent) {
      await interaction.editReply({ content: '❌ All files failed to download — check the console for details.' });
    }
  } catch (err) {
    console.error('BH send error:', err.message, err.stack);
    await interaction.editReply({ content: `❌ Something went wrong: ${err.message}` });
  }
});

registerCommands();
client.login(TOKEN);
