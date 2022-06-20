const { mongoUrl } = require('../config');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MongoClient, ServerApiVersion, Long } = require('mongodb');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('list')
        .setDescription('Shows your anime list or someone else\'s')
        .addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
    async execute(interaction) {
        const userTarget = interaction.options.getUser('target');
        let name = "";
        let userId = interaction.user.id;

        if (userTarget) {
            userId = userTarget.id;
            name = userTarget.username;
        }

        userId = Long.fromString(userId);

        const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect(err => {
            const collection = client.db("root").collection("users");
            collection.findOne({ id: userId }, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    const anime_list = result.anime_list;
                    let anime_list_string = "";
                    const nLen = anime_list.length;
                    for (let i = 0; i < nLen; i++) {
                        anime_list_string += anime_list[i] + "\n";
                    }
                    if (userTarget) {
                        interaction.reply({ content: `***${name}'s anime list:\n${anime_list_string}***`, ephemeral: false });
                    } else {
                        interaction.reply({ content: `***Your anime list:\n${anime_list_string}***`, ephemeral: true });
                    }
                    client.close();
                }
            });
        }
        );
    }
}
