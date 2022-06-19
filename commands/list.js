const { SlashCommandBuilder } = require('@discordjs/builders');
const { mongoUrl } = require('../config.json');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Lists all your anime or someone elses')
        .addUserOption(option => option.setName('target').setDescription('The user\'s anime to show')),
    async execute(interaction) {
        const userTarget = interaction.options.getUser('target');
        const connection = await mongoose.connect(mongoUrl, { useNewUrlParser: true });
        // create new model for anime
    }
}
