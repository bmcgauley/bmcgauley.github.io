
const Discord = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");

const express = require("express")
//const cors = require("cors")
const app = express();
const port = 5500;
//const serverIP = "67.182.53.30";
const token = "MTA5ODc3MTk0NTcwNjc1NDA4OA.Gu80q_.hQiMJDQv7PPe_Qh0ucHvgq1ireEiHSUXqvnRD0";
const channelId = "1089659519526772876";
//app.use(cors());
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages] });
  
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.login(token);
  
  app.use(express.json());
  app.use(express.static("public"));
  
  app.post("/send", async (req, res) => {
    const channel = client.channels.cache.get(channelId);
  
    if (!channel) {
      console.error("Channel not found!");
      res.status(500).json({ message: "Channel not found!" });
      return;
    }
  
    try {
      await channel.send("Hello, this is a message from the bot!");
      res.json({ message: "Message sent!" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Error sending message" });
    }
  });

  
  app.listen(port,  () => {
    console.log(`Server listening at http://localhost:${port}`);
  });