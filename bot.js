const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const TOKEN = 'MTUwNTI4MjYxMjMzNDMwMTIyNA.GNLUeP.1thrCtLJ9xaAJSSvXf8upZQAZjmbPd3gEcJEyg';
const CLIENT_ID = '1505282612334301224';

const images = [
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
  'https://i.postimg.cc/XZWB23cL/a.jpg',
  'https://i.postimg.cc/kVy6zZTn/b.jpg',
  'https://i.postimg.cc/qtr6m0x0/c.jpg',
  'https://i.postimg.cc/d7FZWvjw/d.jpg',
  'https://i.postimg.cc/FfvkPmVQ/e.jpg',
  'https://i.postimg.cc/LqVYw7N7/f.png',
  'https://i.postimg.cc/Fdsd4Z61/g-(1).png',
  'https://i.postimg.cc/1n5nQHdB/g-(1).jpg',
  'https://i.postimg.cc/wtkyZPwg/g-(1).jpg',
  'https://i.postimg.cc/9RFRhpkg/g-(2).jpg',
  'https://i.postimg.cc/WD7FCK5t/g-(2).png',
  'https://i.postimg.cc/yJTgt5Lk/g-(2).jpg',
  'https://i.postimg.cc/gXkXWD76/g-(3).jpg',
  'https://i.postimg.cc/2qxbMJ0q/g-(3).jpg',
  'https://i.postimg.cc/CBLBgN2Z/g-(4).jpg',
  'https://i.postimg.cc/cg4gSmz3/g-(5).jpg',
  'https://i.postimg.cc/mz2zswnQ/g-(6).jpg',
  'https://i.postimg.cc/k6X6mcHc/g-(7).jpg',
  'https://i.postimg.cc/ygYgHPGL/g-(8).jpg',
  'https://i.postimg.cc/v1vgkj0s/r.jpg',
];

const videos = [
  'https://files.catbox.moe/t3iytr.mp4',
  'https://files.catbox.moe/rqe6h6.mp4',
];

const allMedia = [...images, ...videos];

let remAll = [...allMedia];
let remVideos = [...videos];

function getRandomMedia() {
  if (remAll.length === 0) remAll = [...allMedia];
  const index = Math.floor(Math.random() * remAll.length);
  return remAll.splice(index, 1)[0];
}

function getRandomVideo() {
  if (remVideos.length === 0) remVideos = [...videos];
  const index = Math.floor(Math.random() * remVideos.length);
  return remVideos.splice(index, 1)[0];
}

const commands = [
  new SlashCommandBuilder()
    .setName('sr')
    .setDescription('Sends random picture(s) or video(s)')
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('How many to send (1-10)')
        .setMinValue(1)
        .setMaxValue(10)
        .setRequired(false)
    )
    .addBooleanOption(option =>
      option
        .setName('private')
        .setDescription('Only you can see it (default: everyone can see)')
        .setRequired(false)
    ),
  new SlashCommandBuilder()
    .setName('sr-video')
    .setDescription('Sends a random video')
    .addBooleanOption(option =>
      option
        .setName('private')
        .setDescription('Only you can see it (default: everyone can see)')
        .setRequired(false)
    ),
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

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'sr') {
    const amount = interaction.options.getInteger('amount') || 1;
    const ephemeral = interaction.options.getBoolean('private') ?? false;

    const selected = [];
    for (let i = 0; i < Math.min(amount, allMedia.length); i++) {
      selected.push(getRandomMedia());
    }

    await interaction.reply({ content: selected[0], ephemeral });
    for (let i = 1; i < selected.length; i++) {
      await interaction.followUp({ content: selected[i], ephemeral });
    }
  }

  if (interaction.commandName === 'sr-video') {
    const ephemeral = interaction.options.getBoolean('private') ?? false;
    await interaction.reply({ content: getRandomVideo(), ephemeral });
  }
});

registerCommands();
client.login(TOKEN);
