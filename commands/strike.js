
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('strike')
    .setDescription('Attack a target IP')
    .addStringOption(option =>
      option.setName('ip').setDescription('IP address to target').setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('port').setDescription('Port number').setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('duration').setDescription('Duration of the attack in seconds').setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('threads').setDescription('Number of threads to use').setRequired(true)
    ),
  async execute(interaction) {
    const ip = interaction.options.getString('ip');
    const port = interaction.options.getInteger('port');
    const duration = interaction.options.getInteger('duration');
    const threads = interaction.options.getInteger('threads');

    await interaction.reply(`🚨 Attack started on IP: ${ip}:${port} for ${duration} seconds with ${threads} threads.`);
  }
};
