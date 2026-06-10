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
  'https://files.catbox.moe/qdema8.jpg',
  'https://files.catbox.moe/e847jg.jpg',
  'https://files.catbox.moe/pbhccu.jpg',
  'https://files.catbox.moe/7hgd31.jpg',
  'https://files.catbox.moe/d00kkd.jpg',
  'https://files.catbox.moe/ick0pr.jpg',
  'https://files.catbox.moe/wcvxk4.jpg',
  'https://files.catbox.moe/1p2ddm.jpg',
  'https://files.catbox.moe/npuer5.png',
  'https://files.catbox.moe/orrjum.jpg',
  'https://files.catbox.moe/bl3gvy.png',
  'https://files.catbox.moe/awlwp7.jpg',
  'https://files.catbox.moe/2w47ua.jpg',
  'https://files.catbox.moe/00oj9s.png',
  'https://files.catbox.moe/tj6l7r.png',
  'https://files.catbox.moe/pl2a8g.png',
  'https://files.catbox.moe/spy0zw.png',
  'https://files.catbox.moe/w01ehz.png',
  'https://files.catbox.moe/eo1ips.png',
  'https://files.catbox.moe/t37xxy.png',
  'https://files.catbox.moe/72sibd.png',
  'https://files.catbox.moe/j4k49y.png',
  'https://files.catbox.moe/knzzn8.jpg',
  'https://files.catbox.moe/co2xrm.jpg',
  'https://files.catbox.moe/0traez.jpg',
  'https://files.catbox.moe/q5v6iv.jpg',
  'https://files.catbox.moe/9nkkh0.jpg',
  'https://files.catbox.moe/a9k48z.jpg',
  'https://files.catbox.moe/8dsbia.jpg',
  'https://files.catbox.moe/v10ypi.jpg',
  'https://files.catbox.moe/rgs3f9.jpg',
  'https://files.catbox.moe/2ya3gc.jpg',
  'https://files.catbox.moe/8zh27d.jpg',
  'https://files.catbox.moe/sz207b.jpg',
];

const bhVideos = [
  'https://files.catbox.moe/haqyqc.mp4',
  'https://files.catbox.moe/4a4ezg.mp4',
  'https://files.catbox.moe/vet3hg.mp4',
  'https://files.catbox.moe/emjp2r.mp4',
  'https://files.catbox.moe/tpr8wg.mp4',
  'https://files.catbox.moe/ob1p7j.mp4',
  'https://files.catbox.moe/c8ohy0.mp4',
  'https://files.catbox.moe/dn06qe.mp4',
  'https://files.catbox.moe/t3xg6l.mp4',
  'https://files.catbox.moe/uxs2i2.mp4',
  'https://files.catbox.moe/fejtjs.mp4',
  'https://files.catbox.moe/724jdv.mp4',
  'https://files.catbox.moe/jndwli.mp4',
  'https://files.catbox.moe/ox6gk4.mp4',
  'https://files.catbox.moe/o6rwil.mp4',
  'https://files.catbox.moe/s3bygp.mp4',
  'https://files.catbox.moe/6gppcg.mp4',
  'https://files.catbox.moe/ci8d0p.mp4',
  'https://files.catbox.moe/930nk7.mp4',
  'https://files.catbox.moe/vaght7.mp4',
  'https://files.catbox.moe/6a5dcd.mp4',
  'https://files.catbox.moe/hrbbnt.mp4',
  'https://files.catbox.moe/vybykc.mp4',
  'https://files.catbox.moe/455tw2.mp4',
  'https://files.catbox.moe/eg8pw3.mp4',
  'https://files.catbox.moe/f484vj.mp4',
  'https://files.catbox.moe/oc1upm.m4v',
  'https://files.catbox.moe/1selbx.mp4',
  'https://files.catbox.moe/5jpztm.mp4',
  'https://files.catbox.moe/vcvavi.mp4',
  'https://files.catbox.moe/nvdo6z.mp4',
  'https://files.catbox.moe/skx1ne.mov',
  'https://files.catbox.moe/seubon.mp4',
  'https://files.catbox.moe/32q2uf.mov',
  'https://files.catbox.moe/ryz0yi.mp4',
  'https://files.catbox.moe/kvd10s.mov',
  'https://files.catbox.moe/zu4xf1.mp4',
  'https://files.catbox.moe/4duq9x.mov',
];

const allMedia = [...images, ...videos];
const bhAllMedia = [...bhImages, ...bhVideos];

let remImages = [...images];
let remVideos = [...videos];
let remAll = [...allMedia];
let remBhImages = [...bhImages];
let remBhVideos = [...bhVideos];
let remBhAll = [...bhAllMedia];

function getRandom(pool, reset) {
  if (pool.length === 0) pool.push(...reset());
  const index = Math.floor(Math.random() * pool.length);
  return pool.splice(index, 1)[0];
}

function getRandomImage()   { return getRandom(remImages,   () => [...images]); }
function getRandomVideo()   { return getRandom(remVideos,   () => [...videos]); }
function getRandomMedia()   { return getRandom(remAll,      () => [...allMedia]); }
function getRandomBhImage() { return getRandom(remBhImages, () => [...bhImages]); }
function getRandomBhVideo() { return getRandom(remBhVideos, () => [...bhVideos]); }
function getRandomBhMedia() { return getRandom(remBhAll,    () => [...bhAllMedia]); }

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
          { name: 'Random',  value: 'random' },
          { name: 'Picture', value: 'picture' },
          { name: 'Video',   value: 'video' },
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
    .setDescription('Sends random bh media')
    .addStringOption(option =>
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

    const pool  = type === 'picture' ? images    : type === 'video' ? videos    : allMedia;
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
    const type = interaction.options.getString('type') || 'random';
    const amount = interaction.options.getInteger('amount') || 1;
    const ephemeral = interaction.options.getBoolean('private') ?? false;

    const pool   = type === 'picture' ? bhImages    : type === 'video' ? bhVideos    : bhAllMedia;
    const getter = type === 'picture' ? getRandomBhImage : type === 'video' ? getRandomBhVideo : getRandomBhMedia;

    const selected = [];
    for (let i = 0; i < Math.min(amount, pool.length); i++) {
      selected.push(getter());
    }

    await interaction.reply({ content: selected[0], ephemeral });
    for (let i = 1; i < selected.length; i++) {
      await interaction.followUp({ content: selected[i], ephemeral });
    }
  }
});

registerCommands();
client.login(TOKEN);
