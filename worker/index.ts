import { Client, Intents } from "discord.js";
import { config } from "dotenv";
import express from "express";

import morgan from "morgan";

// Load morgan
const logger = morgan("tiny");

// Load .env
config();

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });

bot.once("ready", () => {
  console.log("Bot logged in!");
});

bot.login(process.env.DISCORD_TOKEN);

// Setup express server
const api = express();

api.get("/guilds", (req, res) => {
  const guilds = bot.guilds.cache.map((guild) => guild.id);
  res.send(guilds);
});

api.post("/:guildID/channelID/message", (req, res) => {});

api.listen(process.env.PORT, () => {
  console.log(`Express server listening on port ${process.env.PORT}`);
});
