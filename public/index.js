// const fs = require('node:fs');
// const path = require('node:path');

// Require the necessary discord.js classes
//const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
//const { token } = require('./config.json');

// Create a new client instance
// const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });

// client.commands = new Collection();

// const foldersPath = path.join(__dirname, 'commands');
// const commandFolders = fs.readdirSync(foldersPath);

// for (const folder of commandFolders) {
// 	const commandsPath = path.join(foldersPath, folder);
// 	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// 	for (const file of commandFiles) {
// 		const filePath = path.join(commandsPath, file);
// 		const command = require(filePath);
// 		// Set a new item in the Collection with the key as the command name and the value as the exported module
// 		if ('data' in command && 'execute' in command) {
// 			client.commands.set(command.data.name, command);
// 		} else {
// 			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
// 		}
// 	}
// }
// client.on(Events.InteractionCreate, interaction => {
// 	console.log(interaction);
// });
// client.on(Events.InteractionCreate, interaction => {
// 	if (!interaction.isChatInputCommand()) return;
// 	console.log(interaction);
// });
// client.on(Events.InteractionCreate, async interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const command = interaction.client.commands.get(interaction.commandName);

// 	if (!command) {
// 		console.error(`No command matching ${interaction.commandName} was found.`);
// 		return;
// 	}

// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		if (interaction.replied || interaction.deferred) {
// 			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
// 		} else {
// 			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
// 		}
// 	}
// });









// const eventsPath = path.join(__dirname, 'events');
// const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// for (const file of eventFiles) {
// 	const filePath = path.join(eventsPath, file);
// 	const event = require(filePath);
// 	if (event.once) {
// 		client.once(event.name, (...args) => event.execute(...args));
// 	} else {
// 		client.on(event.name, (...args) => event.execute(...args));
// 	}
// }




// Log in to Discord with your client's token
// client.login(token);
// client.once(Events.ClientReady, c => {
//   console.log(`hi I'm ${c.user.tag}`)
// })

// client.on('ready', () => {
//     console.log("================");
//     console.log("|i am ready|");
//     console.log("================");
// });


// client.on('message', message => {
// 	if (command === 'ping') {
// 		message.channel.send('Pong.');
// }})

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`)
// })

// client.on("message", msg => {
//   if (msg.content === "ping") {
//     console.log('member said ping!')
//     msg.reply("pong");
//     console.log('Replied with pong')
//   }
// })

// //client.login(process.env.TOKEN);


// const channel = client.channels.cache.get("1105059180232061028");
// client.on(`message`, function (msg) {
//     if (msg.attachments.first()) {
//         //checks if an attachment is sent
//         if (msg.attachments.first().filename === `png`) {
//             //Download only png (customize this)
//             download(msg.attachments.first().url); //Function I will show later
//         }
//     }
// });
// //let request = require(`request`);
// //let fs = require(`fs`);
// function download(url){
// request.get(url)
// .on('error', console.error)
// .pipe(fs.createWriteStream('meme.png'));
// }

import express from "../node_modules/express";
import getImage from "./discord.js";

const app = express();

app.get("/rasbign", async (req, res) => {
  const prompt = req.query.prompt;
  const url = await getImage(prompt);
  res.send(url);
});

app.listen(8080);