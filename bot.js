import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', () => {
  console.log(`Bot logado como ${client.user.tag}`);
  
  const channelId = process.env.DISCORD_CHANNEL_ID;
  const userId = process.env.DISCORD_USER_ID;
  const intervalo = 60 * 60 * 1000; // 1h em milissegundos

  setInterval(() => {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      channel.send(`<@${userId}> 🌟 lembrete de usar o $p do Mudae!`);
    }
  }, intervalo);
});

client.login(process.env.TOKEN);
