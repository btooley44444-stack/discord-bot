const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const { File } = require('megajs');

const TOKEN = 'MTUwNTI4MjYxMjMzNDMwMTIyNA.GNLUeP.1thrCtLJ9xaAJSSvXf8upZQAZjmbPd3gEcJEyg';
const CLIENT_ID = '1505282612334301224';
const MEGA_FOLDER = 'https://mega.nz/folder/DmRAhBjZ#QnVdilMScaUwF-ZbnF2xog';

// ── MEGA / SR setup ────────────────────────────────────────────────────────
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB — Discord's upload limit
const MEDIA_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.mov', '.m4v', '.webm']);

let srAll = [];

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
      if (MEDIA_EXTS.has(getExt(file.name))) srAll.push(file);
    }

    console.log(`/sr ready: ${srAll.length} files loaded`);
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

// ── BH arrays (unchanged) ─────────────────────────────────────────────────
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

const bhAllMedia = [...bhImages, ...bhVideos];

let remBhImages = [...bhImages];
let remBhVideos = [...bhVideos];
let remBhAll    = [...bhAllMedia];

function getRandom(pool, reset) {
  if (pool.length === 0) pool.push(...reset());
  const index = Math.floor(Math.random() * pool.length);
  return pool.splice(index, 1)[0];
}

function getRandomBhImage() { return getRandom(remBhImages, () => [...bhImages]); }
function getRandomBhVideo() { return getRandom(remBhVideos, () => [...bhVideos]); }
function getRandomBhMedia() { return getRandom(remBhAll,    () => [...bhAllMedia]); }

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
        .setDescription('How many to send (1–150)')
        .setMinValue(1)
        .setMaxValue(150)
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

// ── BH send helpers (URL-based, unchanged) ────────────────────────────────
async function sendInServer(interaction, selected, isPrivate) {
  await interaction.reply({ content: selected[0], ephemeral: isPrivate });
  for (let i = 1; i < selected.length; i++) {
    await interaction.followUp({ content: selected[i], ephemeral: isPrivate });
  }
}

async function sendViaDM(interaction, selected) {
  try {
    await interaction.reply({ content: '📬 Sending to your DMs!', ephemeral: true });
    for (const item of selected) {
      await interaction.user.send(item);
    }
  } catch {
    await interaction.editReply({ content: "❌ Couldn't DM you — make sure your DMs are open!" });
  }
}

// ── Client ─────────────────────────────────────────────────────────────────
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  await loadSrFiles();
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

    const picked = pickRandom(srAll, amount);

    try {
      // Download all files in parallel instead of one at a time
      const buffers = await Promise.all(
        picked.map(file =>
          downloadBuffer(file).then(buffer => ({ attachment: buffer, name: file.name }))
        )
      );

      if (destination === 'dm') {
        await interaction.editReply({ content: '📬 Sending to your DMs!' });
        // Send in batches of 10 (Discord's per-message attachment limit)
        for (let i = 0; i < buffers.length; i += 10) {
          await interaction.user.send({ files: buffers.slice(i, i + 10) });
        }
      } else {
        // First batch goes in the deferred reply, rest as follow-ups
        await interaction.editReply({ files: buffers.slice(0, 10) });
        for (let i = 10; i < buffers.length; i += 10) {
          await interaction.followUp({ files: buffers.slice(i, i + 10), ephemeral: isPrivate });
        }
      }
    } catch (err) {
      console.error('SR send error:', err);
      await interaction.editReply({ content: '❌ Something went wrong — the file may be too large for Discord.' });
    }
    return;
  }

  // ── /bh — sends catbox URLs directly (unchanged behaviour) ────────────
  const bhType = interaction.options.getString('type') || 'random';

  const getter = bhType === 'picture' ? getRandomBhImage
               : bhType === 'video'   ? getRandomBhVideo
               : getRandomBhMedia;

  const bhPool = bhType === 'picture' ? bhImages
               : bhType === 'video'   ? bhVideos
               : bhAllMedia;

  const selected = [];
  for (let i = 0; i < Math.min(amount, bhPool.length); i++) selected.push(getter());

  if (destination === 'dm') {
    await sendViaDM(interaction, selected);
  } else {
    await sendInServer(interaction, selected, isPrivate);
  }
});

registerCommands();
client.login(TOKEN);
