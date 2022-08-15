const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes } = require('discord.js');
const axios = require('axios')
require('dotenv').config()

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: "premier-league",
    description: 'premier league table'
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
(async () => {
  try {

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'premier-league') {
    // const channel = client.channels.get('1008663182514061383')
    const channel = client.channels.cache.get('1008663182514061383')
    const repsonse = await axios.get('https://www.goal.com/en/ajax/match/standings?matchId=79nq0mzhyjn0hzydburymqn84')
    console.log(repsonse)

    // const exampleEmbed = new EmbedBuilder()
    //   .setColor(0x0099FF)
    //   .setTitle('Some title')
    //   .setURL('https://discord.js.org/')
    //   .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    //   .setDescription('Some description here')
    //   .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    //   .addFields(
    //     { name: 'Regular field title', value: 'Some value here' },
    //     { name: '\u200B', value: '\u200B' },
    //     { name: 'Inline field title', value: 'Some value here', inline: true },
    //     { name: 'Inline field title', value: 'Some value here', inline: true },
    //   )
    //   .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    //   .setImage('https://i.imgur.com/AfFp7pu.png')
    //   .setTimestamp()
    //   .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
    // channel.send({ embeds: [exampleEmbed] })
  }


});

// client.on('messageCreate', message => {
//   console.log({ message })
//   // message.reply("message.content")
// })

client.login(process.env.TOKEN);