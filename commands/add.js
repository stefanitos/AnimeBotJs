const { SlashCommandBuilder } = require('@discordjs/builders');
import { parse } from 'node-html-parser';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Adds an anime to your list.')
        .addUserOption(option => option.setName('name').setDescription('The anime you want to add.')),
    async execute(interaction) {
        const anime_name = interaction.options.getUser('name');
        let userId = interaction.user.id;
        let html = await fetch(`https://gogoanime.sk/search.html?keyword=${anime_name}`)
        let element = parse(html.querySelector('#list'))

    }
}