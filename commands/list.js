const { SlashCommandBuilder } = require('@discordjs/builders');
const { MongoClient } = require('mongodb');
const { mongoUrl } = require('./config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Displays your anime list or someone else\'s.')
        .addStringOption(option => option.setName('user').setDescription('User to list anime for.')),
    async execute(interaction) {
        const user = interaction.options.getString('user');
        if (user) {
