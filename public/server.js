import { Client as _Client } from "discord.js";
import { Client, GatewayIntentBits } from "discord.js";
import express, { json, staticz } from "express";
import cors from "cors";
const app = express();
const port = 5501;
//const serverIP = "67.182.53.30";
const token = "process.env.TOKEN";
const channelId = "1089659519082188970";
app.use(cors());
const client = new _Client({ intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages] });
  
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
  client.login(token);
  
  app.use(json());
  app.use(staticz("public"));
  
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