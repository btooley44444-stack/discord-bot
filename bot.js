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
  'https://files.catbox.moe/iwz83a.png',
  'https://files.catbox.moe/zmv62b.png',
  'https://files.catbox.moe/2ui37i.png',
  'https://files.catbox.moe/zqqz48.png',
  'https://files.catbox.moe/3mpuir.png',
  'https://files.catbox.moe/abkwi4.png',
  'https://files.catbox.moe/jvfb9u.png',
  'https://files.catbox.moe/o58iy8.png',
  'https://files.catbox.moe/albhmv.jpeg',
  'https://files.catbox.moe/1enxtg.jpeg',
  'https://files.catbox.moe/qhxy08.jpg',
  'https://files.catbox.moe/p7fl7y.jpeg',
];

const videos = [
  'https://files.catbox.moe/t3iytr.mp4',
  'https://files.catbox.moe/rqe6h6.mp4',
  'https://files.catbox.moe/6xym5u.mp4',
  'https://files.catbox.moe/w92804.mp4',
  'https://files.catbox.moe/4nixmg.mp4',
  'https://files.catbox.moe/5r8jka.mov',
  'https://files.catbox.moe/m36wh6.mov',
  'https://files.catbox.moe/8gxrez.mp4',
  'https://files.catbox.moe/c4mejo.mov',
  'https://files.catbox.moe/nhdbaw.mp4',
  'https://files.catbox.moe/cl05iu.m4v',
  'https://files.catbox.moe/7feudv.m4v',
];

const bhImages = [
  // original
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
  // new
  'https://files.catbox.moe/nto6u9.jpg',
  'https://files.catbox.moe/earjuv.jpg',
  'https://files.catbox.moe/o6t55l.jpg',
  'https://files.catbox.moe/qn39af.jpg',
  'https://files.catbox.moe/n8n5br.jpg',
  'https://files.catbox.moe/hwjad8.jpg',
  'https://files.catbox.moe/2crn72.jpg',
  'https://files.catbox.moe/oxcqvq.jpg',
  'https://files.catbox.moe/bzwzw7.jpg',
  'https://files.catbox.moe/ich6l0.jpg',
  'https://files.catbox.moe/djlufm.jpg',
  'https://files.catbox.moe/7wod9i.jpg',
  'https://files.catbox.moe/d8b5z0.jpg',
  'https://files.catbox.moe/m4tj12.jpg',
  'https://files.catbox.moe/r81mgw.jpg',
  'https://files.catbox.moe/u3hdpg.jpg',
  'https://files.catbox.moe/2qvnq2.jpg',
  'https://files.catbox.moe/jgdoy6.jpg',
  'https://files.catbox.moe/f2g7dc.jpg',
  'https://files.catbox.moe/8efwei.jpg',
  'https://files.catbox.moe/4cktb0.jpg',
  'https://files.catbox.moe/dd0gq3.jpg',
  'https://files.catbox.moe/7v5cfn.jpg',
  'https://files.catbox.moe/1kih2z.jpg',
  'https://files.catbox.moe/62txsx.jpg',
  'https://files.catbox.moe/869pq3.jpg',
  'https://files.catbox.moe/6313k5.jpg',
  'https://files.catbox.moe/cv697x.jpg',
  'https://files.catbox.moe/ao2fk2.jpg',
  'https://files.catbox.moe/5p6fli.jpg',
  'https://files.catbox.moe/ow5rf1.jpg',
  'https://files.catbox.moe/tuqzxn.jpg',
  'https://files.catbox.moe/t3ycag.jpg',
  'https://files.catbox.moe/ktz82j.jpg',
  'https://files.catbox.moe/fkme4q.jpg',
  'https://files.catbox.moe/d0q1y6.jpg',
  'https://files.catbox.moe/mezk4x.jpg',
  'https://files.catbox.moe/1m71ax.jpg',
  'https://files.catbox.moe/wuewxe.jpg',
  'https://files.catbox.moe/3guatf.jpg',
  'https://files.catbox.moe/8qk2w5.jpg',
  'https://files.catbox.moe/89i2qc.jpg',
  'https://files.catbox.moe/637joj.jpg',
  'https://files.catbox.moe/kkqdkb.jpg',
  'https://files.catbox.moe/aufel5.jpg',
  'https://files.catbox.moe/unpoqx.jpg',
  'https://files.catbox.moe/cywva5.jpg',
  'https://files.catbox.moe/jxztae.jpg',
  'https://files.catbox.moe/vvuo5f.jpg',
  'https://files.catbox.moe/2qebfg.jpg',
  'https://files.catbox.moe/mqqjv3.jpg',
  'https://files.catbox.moe/lffr38.jpg',
  'https://files.catbox.moe/6ndakz.jpg',
  'https://files.catbox.moe/6358n3.jpg',
  'https://files.catbox.moe/j6xk9p.jpg',
  'https://files.catbox.moe/p2cead.jpg',
  'https://files.catbox.moe/lnori7.jpg',
  'https://files.catbox.moe/3w2y0k.jpg',
  'https://files.catbox.moe/zhwl8o.jpg',
  'https://files.catbox.moe/2o4ktk.jpg',
  'https://files.catbox.moe/ghjvhc.jpg',
  'https://files.catbox.moe/28njyz.jpg',
  'https://files.catbox.moe/cvwg06.jpg',
  'https://files.catbox.moe/ts8npf.jpg',
  'https://files.catbox.moe/g8471b.jpg',
  'https://files.catbox.moe/l6apo7.jpg',
  'https://files.catbox.moe/mok45y.jpg',
  'https://files.catbox.moe/im69v4.jpg',
  'https://files.catbox.moe/ozgpj2.jpg',
  'https://files.catbox.moe/2pqu94.jpg',
  'https://files.catbox.moe/mpy6ye.jpg',
  'https://files.catbox.moe/e5oq7c.jpg',
  'https://files.catbox.moe/emqb52.jpg',
  'https://files.catbox.moe/s69820.jpg',
  'https://files.catbox.moe/xwzhnv.jpg',
  'https://files.catbox.moe/b8desi.jpg',
  'https://files.catbox.moe/3reoy7.jpg',
  'https://files.catbox.moe/y8fw13.jpg',
  'https://files.catbox.moe/9xbccu.jpg',
  'https://files.catbox.moe/xyr40b.jpg',
  'https://files.catbox.moe/do032s.jpg',
  'https://files.catbox.moe/sy3h7t.jpg',
  'https://files.catbox.moe/4pc3nz.jpg',
  'https://files.catbox.moe/66ftwc.jpg',
  'https://files.catbox.moe/3730rg.jpg',
  'https://files.catbox.moe/bzpu5b.jpg',
  'https://files.catbox.moe/4tk5uh.jpg',
  'https://files.catbox.moe/i9hxgb.jpg',
  'https://files.catbox.moe/zjxf6g.jpg',
  'https://files.catbox.moe/rp8hh4.jpg',
  'https://files.catbox.moe/2ylr9a.jpg',
  'https://files.catbox.moe/qcjin7.jpg',
  'https://files.catbox.moe/72kdbw.jpg',
  'https://files.catbox.moe/ij21m0.jpg',
  'https://files.catbox.moe/ylzpab.jpg',
  'https://files.catbox.moe/4rxemq.jpg',
  'https://files.catbox.moe/47h07s.jpg',
  'https://files.catbox.moe/iz8qhf.jpg',
  'https://files.catbox.moe/3jofid.jpg',
  'https://files.catbox.moe/uw3fvu.jpg',
  'https://files.catbox.moe/82ai37.jpg',
  'https://files.catbox.moe/cg35l3.jpg',
  'https://files.catbox.moe/amoaj3.jpg',
  'https://files.catbox.moe/ihmmjq.jpg',
  'https://files.catbox.moe/nfm4yg.jpg',
  'https://files.catbox.moe/ye0rn9.jpg',
  'https://files.catbox.moe/a8dfaf.jpg',
  'https://files.catbox.moe/aiay09.jpg',
  'https://files.catbox.moe/ir4ccm.jpg',
  'https://files.catbox.moe/yzzevz.jpg',
  'https://files.catbox.moe/0sfcve.jpg',
  'https://files.catbox.moe/liu3io.jpg',
  'https://files.catbox.moe/tmbxmd.jpg',
  'https://files.catbox.moe/84o2z9.jpg',
  'https://files.catbox.moe/f4and0.jpg',
  'https://files.catbox.moe/gnuk5u.jpg',
  'https://files.catbox.moe/bmqkvq.jpg',
  'https://files.catbox.moe/cc9wtx.jpg',
  'https://files.catbox.moe/wuji3a.jpg',
  'https://files.catbox.moe/mchiwd.jpg',
  'https://files.catbox.moe/hvdxqi.jpg',
  'https://files.catbox.moe/41yja4.jpg',
  'https://files.catbox.moe/3i2dfm.jpg',
  'https://files.catbox.moe/e7ewpv.jpg',
  'https://files.catbox.moe/dhs7q3.jpg',
  'https://files.catbox.moe/l1c915.jpg',
  'https://files.catbox.moe/e7499b.jpg',
  'https://files.catbox.moe/s12v1r.jpg',
  'https://files.catbox.moe/s18unz.jpg',
  'https://files.catbox.moe/ryno49.jpg',
  'https://files.catbox.moe/ste2p9.jpg',
  'https://files.catbox.moe/pt0109.jpg',
  'https://files.catbox.moe/gapzty.jpg',
  'https://files.catbox.moe/2l9m5j.jpg',
  'https://files.catbox.moe/47b20h.jpg',
  'https://files.catbox.moe/99du0o.jpg',
  'https://files.catbox.moe/in8d04.jpg',
  'https://files.catbox.moe/7dgvfg.jpg',
  'https://files.catbox.moe/jfvxeb.jpg',
  'https://files.catbox.moe/3xdq6x.jpg',
  'https://files.catbox.moe/jkw3vb.jpg',
  'https://files.catbox.moe/77p2x0.jpg',
  'https://files.catbox.moe/9nd71r.jpg',
  'https://files.catbox.moe/zy098v.jpeg',
  'https://files.catbox.moe/l3jqvw.jpg',
  'https://files.catbox.moe/7mqg5x.jpeg',
  'https://files.catbox.moe/envx7s.jpg',
  'https://files.catbox.moe/3i9zz9.jpeg',
  'https://files.catbox.moe/gis234.jpg',
  'https://files.catbox.moe/lvkn2l.jpg',
  'https://files.catbox.moe/jmlg9y.jpeg',
  'https://files.catbox.moe/u3r4i8.jpeg',
  'https://files.catbox.moe/qyn0om.jpg',
  'https://files.catbox.moe/ts3tjh.png',
  'https://files.catbox.moe/u90fwe.jpeg',
  'https://files.catbox.moe/mqfknh.jpg',
  'https://files.catbox.moe/jytn96.jpg',
  'https://files.catbox.moe/re53y8.png',
  'https://files.catbox.moe/qqj67y.jpeg',
  'https://files.catbox.moe/cvmygy.png',
  'https://files.catbox.moe/bdhfex.jpeg',
  'https://files.catbox.moe/qnyf22.jpg',
  'https://files.catbox.moe/8hd4m0.PNG',
  'https://files.catbox.moe/iq1yft.jpeg',
  'https://files.catbox.moe/jjoejz.jpg',
  'https://files.catbox.moe/urnr7u.jpg',
  'https://files.catbox.moe/wql2fx.PNG',
  'https://files.catbox.moe/jj7jqi.jpeg',
  'https://files.catbox.moe/micj8v.jpg',
  'https://files.catbox.moe/av8bz8.jpeg',
  'https://files.catbox.moe/9qv9kl.PNG',
  'https://files.catbox.moe/gnoo5w.jpg',
  'https://files.catbox.moe/j2qnn4.jpeg',
  'https://files.catbox.moe/esp96n.PNG',
  'https://files.catbox.moe/tukkim.PNG',
  'https://files.catbox.moe/zbxqpc.jpg',
  'https://files.catbox.moe/nkgt5k.jpeg',
  'https://files.catbox.moe/e9985b.PNG',
  'https://files.catbox.moe/5bb956.jpg',
  'https://files.catbox.moe/t80ysu.jpeg',
  'https://files.catbox.moe/ar4kr1.jpeg',
  'https://files.catbox.moe/9rax01.png',
  'https://files.catbox.moe/iye3m7.jpg',
  'https://files.catbox.moe/ic2uig.jpg',
  'https://files.catbox.moe/50slpl.png',
  'https://files.catbox.moe/xgr8ww.jpeg',
  'https://files.catbox.moe/1nutio.png',
  'https://files.catbox.moe/83bbgf.png',
  'https://files.catbox.moe/beomtz.jpeg',
  'https://files.catbox.moe/9ppz3v.jpg',
  'https://files.catbox.moe/bgr4ey.PNG',
  'https://files.catbox.moe/u0y0ib.jpeg',
  'https://files.catbox.moe/p4g4ew.jpg',
  'https://files.catbox.moe/xv2u0b.jpg',
  'https://files.catbox.moe/bd3p5b.jpeg',
  'https://files.catbox.moe/3qudil.jpg',
  'https://files.catbox.moe/uyhced.jpeg',
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

let remImages   = [...images];
let remVideos   = [...videos];
let remAll      = [...allMedia];
let remBhImages = [...bhImages];
let remBhVideos = [...bhVideos];
let remBhAll    = [...bhAllMedia];

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
        .setDescription('How many to send (1-100)')
        .setMinValue(1)
        .setMaxValue(100)
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
    const type      = interaction.options.getString('type') || 'random';
    const amount    = interaction.options.getInteger('amount') || 1;
    const ephemeral = interaction.options.getBoolean('private') ?? false;

    const pool   = type === 'picture' ? images    : type === 'video' ? videos    : allMedia;
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
    const type      = interaction.options.getString('type') || 'random';
    const amount    = interaction.options.getInteger('amount') || 1;
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
