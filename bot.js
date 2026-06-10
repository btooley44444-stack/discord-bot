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

const bhImages = [
  'https://i.postimg.cc/G8g0pFL1/onlyfansgateway-on-Telegram-1.jpg',
  'https://i.postimg.cc/hzZFGLDc/onlyfansgateway-on-Telegram-10.png',
  'https://i.postimg.cc/8JX8CRpp/onlyfansgateway-on-Telegram-12.png',
  'https://i.postimg.cc/S210K6y5/onlyfansgateway-on-Telegram-13.jpg',
  'https://i.postimg.cc/jwS0Kgr9/onlyfansgateway-on-Telegram-1320.jpg',
  'https://i.postimg.cc/8JX8CR10/onlyfansgateway-on-Telegram-178.jpg',
  'https://i.postimg.cc/TLN8PVd2/onlyfansgateway-on-Telegram-18.png',
  'https://i.postimg.cc/G8g0pFLp/onlyfansgateway-on-Telegram-21.jpg',
  'https://i.postimg.cc/ZBskq8TV/onlyfansgateway-on-Telegram-270.jpg',
  'https://i.postimg.cc/H8rq8rnC/onlyfansgateway-on-Telegram-28.png',
  'https://i.postimg.cc/ZBskq8bS/onlyfansgateway-on-Telegram-3.jpg',
  'https://i.postimg.cc/G8g0pFLt/onlyfansgateway-on-Telegram-30.png',
  'https://i.postimg.cc/ftq4bcwp/onlyfansgateway-on-Telegram-32.png',
  'https://i.postimg.cc/5QXhQXyJ/onlyfansgateway-on-Telegram-37.jpg',
  'https://i.postimg.cc/dkNM02qS/onlyfansgateway-on-Telegram-39.jpg',
  'https://i.postimg.cc/YGDcS6rK/onlyfansgateway-on-Telegram-4.png',
  'https://i.postimg.cc/SYnBYnRx/onlyfansgateway-on-Telegram-44.png',
  'https://i.postimg.cc/BL7WvTqz/onlyfansgateway-on-Telegram-49.jpg',
  'https://i.postimg.cc/JDYwhNr8/onlyfansgateway-on-Telegram-5.jpg',
  'https://i.postimg.cc/DJpVzr2j/onlyfansgateway-on-Telegram-551-(1).jpg',
  'https://i.postimg.cc/WqdBqdzp/onlyfansgateway-on-Telegram-63.jpg',
  'https://i.postimg.cc/kR20R2GX/onlyfansgateway-on-Telegram-64.png',
  'https://i.postimg.cc/rRDBRDs8/onlyfansgateway-on-Telegram-77.jpg',
  'https://i.postimg.cc/34fMwXK9/onlyfansgateway-on-Telegram-897.jpg',
  'https://i.postimg.cc/bDVXvxzm/onlyfansgateway-on-Telegram-898-(1).jpg',
  'https://i.postimg.cc/xJprdvf9/onlyfansgateway-on-Telegram-9.jpg',
  'https://i.postimg.cc/4nMkkQ2B/y-(1).jpg',
  'https://i.postimg.cc/56CcxQDK/y-(10).png',
  'https://i.postimg.cc/MvQkWfgP/y-(11).png',
  'https://i.postimg.cc/RNHrMJjm/y-(21).jpg',
  'https://i.postimg.cc/pmbwyXHM/y-(23).jpg',
  'https://i.postimg.cc/Bj9rtQ09/y-(24).jpg',
  'https://i.postimg.cc/ZWtG0KSk/y-(25).jpg',
  'https://i.postimg.cc/xq7DD3pp/y-(3).jpg',
];

const allMedia = [...images, ...videos];

let remImages = [...images];
let remVideos = [...videos];
let remAll = [...allMedia];
let remBh = [...bhImages];

function getRandom(pool, reset) {
  if (pool.length === 0) pool.push(...reset());
  const index = Math.floor(Math.random() * pool.length);
  return pool.splice(index, 1)[0];
}

function getRandomImage() { return getRandom(remImages, () => [...images]); }
function getRandomVideo() { return getRandom(remVideos, () => [...videos]); }
function getRandomMedia() { return getRandom(remAll, () => [...allMedia]); }
function getRandomBh() { return getRandom(remBh, () => [...bhImages]); }

const commands = [
  new SlashCommandBuilder()
    .setName('sr')
    .setDescription('Sends random media')
    .addStringOption(option =>
      option
        .setName('type')
        .setDescription('What to send (default: random)')
        .setRequired(false)
        .addChoices(
          { name: 'Random', value: 'random' },
          { name: 'Picture', value: 'picture' },
          { name: 'Video', value: 'video' },
        )
    )
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
    .setName('bh')
    .setDescription('Sends random bh picture(s)')
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
    const type = interaction.options.getString('type') || 'random';
    const amount = interaction.options.getInteger('amount') || 1;
    const ephemeral = interaction.options.getBoolean('private') ?? false;

    const pool = type === 'picture' ? images : type === 'video' ? videos : allMedia;
    const getter = type === 'picture' ? getRandomImage : type === 'video' ? getRandomVideo : getRandomMedia;

    const selected = [];
    for (let i = 0; i < Math.min(amount, pool.length); i++) {
      selected.push(getter());
    }

    await interaction.reply({ content: selected[0], ephemeral });
    for (let i = 1; i < selected.length; i++) {
      await interaction.followUp({ content: selected[i], ephemeral });
    }
  }

  if (interaction.commandName === 'bh') {
    const amount = interaction.options.getInteger('amount') || 1;
    const ephemeral = interaction.options.getBoolean('private') ?? false;

    const selected = [];
    for (let i = 0; i < Math.min(amount, bhImages.length); i++) {
      selected.push(getRandomBh());
    }

    await interaction.reply({ content: selected[0], ephemeral });
    for (let i = 1; i < selected.length; i++) {
      await interaction.followUp({ content: selected[i], ephemeral });
    }
  }
});

registerCommands();
client.login(TOKEN);
