import { SlashCommandBuilder } from 'discord.js';
import { message } from 'statuses';
const mjuid = '936929561302675456'

export const data = new SlashCommandBuilder()
    .setName('mj_interact')
    .setDescription('Replies to MJ');
export async function execute(mjuid) {
    console.log('command executed...');
    msg.attachments.forEach(a => {
        if (a.name === mjuid) {
            fs.writeFileSync(`./${a.name}`, a.file); // Write the file to the system synchronously.
        } else if (a.name === null) {
            console.log("No attachment found.");
        }
    });
}
		
// client.on(Events.InteractionCreate, async interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const { mj_interact } = interaction;

// 	if (mj_interact === 'react') {
// 		const message = await interaction.reply({ content: 'You can react with Unicode emojis!', fetchReply: true });
// 		message.react('😄');
// 	}
// });
