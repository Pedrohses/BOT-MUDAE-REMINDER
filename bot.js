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

  const sendReminder = async () => {
    try {
      const channel = await client.channels.fetch(channelId);
      if (channel) {
        channel.send(`<@${userId}> 🌟 lembrete de usar o $p do Mudae!`);
        console.log('Lembrete enviado com sucesso!'); // Adicione um log
      } else {
        console.error('Canal não encontrado!');
      }
    } catch (error) {
      console.error('Erro ao enviar lembrete:', error);
    }
  };

  // ---------------------------------------------------
  // AQUI ESTÁ O TESTE:
  console.log('Enviando primeiro lembrete para teste...');
  sendReminder(); // <--- CHAME A FUNÇÃO UMA VEZ AQUI
  // ---------------------------------------------------

  // E aqui você agenda para o futuro
  setInterval(sendReminder, intervalo);
});

client.login(process.env.TOKEN);
