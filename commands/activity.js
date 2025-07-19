import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import axios from 'axios';

export default {
  data: new SlashCommandBuilder()
    .setName('activity')
    .setDescription('Get Rec Room activity')
    .addStringOption(option =>
      option.setName('user').setDescription('Enter the username').setRequired(true)
    ),
  async execute(interaction) {
    const username = interaction.options.getString('user');
    
    try {
      const res = await axios.get(`http://localhost:3000/activity/${username}`);
      const data = res.data;

      if (!data) {
        await interaction.reply({ content: '🚫 No data found for this user.', flags: 64 });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle('RecRoom Observer')
        .setDescription(`**Favorites** » @${data.username}\n*in ${data.roomName}*`)
        .addFields(
          { name: 'Max Capacity', value: `${data.maxCapacity}`, inline: true },
          { name: 'In Progress?', value: `${data.inProgress}`, inline: true },
          { name: 'Full?', value: `${data.isFull}`, inline: true },
          { name: 'Private?', value: `${data.isPrivate}`, inline: true },
          { name: 'Location', value: `${data.location}`, inline: false },
          { name: 'Room ID', value: `${data.roomId}`, inline: true },
          { name: 'Instance ID', value: `${data.instanceId}`, inline: true },
          { name: 'Platform', value: `${data.platform}`, inline: true },
          { name: 'Subroom ID', value: `${data.subroomId}`, inline: true },
          { name: 'Voice Server ID', value: `${data.voiceServerId}`, inline: true },
          { name: 'Voice Auth ID', value: `${data.voiceAuthId}`, inline: true },
          { name: 'IP Address', value: `${data.ipAddress}`, inline: true },
          { name: 'Port', value: `${data.port}`, inline: true }
        )
        .setColor('#00aaff')
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: '🚫 An error occurred while fetching data.',
        flags: 64,
      });
    }
  },
};