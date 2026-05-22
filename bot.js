const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = 'MTUwNTI4MjYxMjMzNDMwMTIyNA.GNLUeP.1thrCtLJ9xaAJSSvXf8upZQAZjmbPd3gEcJEyg';
const CLIENT_ID = '1505282612334301224';

const media = [
  'https://i.ibb.co/YFvHXgVr/IMG-0367.jpg',
  'https://i.ibb.co/1JtfvJX2/IMG-0364.jpg',
  'https://i.ibb.co/Lz7wf8Dv/IMG-0368.jpg',
  'https://i.ibb.co/BKtR79FV/IMG-0366.jpg',
  'https://files.catbox.moe/jfuuxb.jpeg',
  'https://files.catbox.moe/nnxbfq.jpeg',
  'https://files.catbox.moe/pxrmvd.png',
  'https://files.catbox.moe/y3lnau.jpeg',
  'https://files.catbox.moe/lxizx9.png',
  'https://files.catbox.moe/4qox4q.jpeg',
  'https://files.catbox.moe/nmyiy4.jpeg',
  'https://files.catbox.moe/bos2rr.jpeg',
  'https://files.catbox.moe/3yupte.jpeg',
  'https://files.catbox.moe/n3ba1c.jpeg',
  'https://files.catbox.moe/9ae8bt.jpeg',
  'https://files.catbox.moe/t3coaa.jpeg',
  'https://files.catbox.moe/lbiotk.jpeg',
  'https://files.catbox.moe/9dr6sr.m4v',
  'https://files.catbox.moe/02o0wi.m4v',
];

let remaining = [...media];

function getRandomMedia() {
  if (remaining.length === 0) remaining = [...media];
  const index = Math.floor(Math.random() * remaining.length);
  return remaining.splice(index, 1)[0];
}

const commands = [
  new SlashCommandBuilder()
    .setName('sr')
    .setDescription('Sends a random picture or video')
    .toJSON(),
];

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

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'sr') {
    const randomMedia = getRandomMedia();
    await interaction.reply({ content: randomMedia });
  }
});

registerCommands();
client.login(TOKEN);
