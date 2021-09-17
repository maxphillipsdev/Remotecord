import { Client, Intents, TextChannel } from "discord.js";
import { config } from "dotenv";
import express from "express";

import morgan from "morgan";

// Load .env
config();

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.once("ready", () => {
  console.log("Bot logged in!");
});

bot.login(process.env.DISCORD_TOKEN);

// Setup express server
const api = express();

// Middleware
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(morgan("tiny"));

api.get("/api/guilds", (req, res) => {
  const guilds = bot.guilds.cache.map((guild) => guild.id);
  res.send(guilds);
});

api.get("/api/guilds/:guildID/channels", (req, res) => {
  const channels = bot.guilds.cache.get(req.params.guildID)?.channels.cache;
  res.send(
    channels?.map((channel) => {
      return {
        id: channel.id,
        name: channel.name,
      };
    })
  );
});

api.post("/api/:channelID/message", (req, res) => {
  // const guild = bot.guilds.cache.get(req.params.guildID)
  const channel = bot.channels.cache.get(req.params.channelID) as TextChannel;
  try {
    channel.send(req.body.message);
    console.log(`sdhfjiksadh ${req.body.message}`);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

api.listen(process.env.PORT, () => {
  console.log(`Express server listening on port ${process.env.PORT}`);
});
