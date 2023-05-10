const { SlashCommandBuilder } = require('discord.js');
const { message } = require('statuses');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('mj_interact')
		.setDescription('Replies to MJ'),
	async execute(interaction) {
        channel.messages.fetch({ limit: 100 }).then(messages => {
            console.log(`Received ${messages.size} messages`);
            //Iterate through the messages here with the variable "messages".
            messages.forEach(message => {
                console.log(message.content),
                console.log(message.content.includes("Midjourney Bot"))
            })
            if(message.attachments.first()) {
                    if(message.attachments.first() <= 1 && message.attachments.first().filename.includes("png")) {
                        download(message.attachments.first().url, `E:/Downloads_AI/test/images/${message.attachments.first().filename}`, function() {
                            console.log('done');
                        });
                    }
                }
        });
        await interaction.reply('Pong!');
                    }, }              

// client.on(Events.InteractionCreate, async interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const { mj_interact } = interaction;

// 	if (mj_interact === 'react') {
// 		const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
// 		message.react('😄');
// 	}
// });