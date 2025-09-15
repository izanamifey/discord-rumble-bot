require("dotenv").config();
const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require("discord.js");

// Init bot client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Commands collection
client.commands = new Collection();

// Example /battle command
client.commands.set("battle", {
  data: {
    name: "battle",
    description: "Start a new rumble battle",
  },
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("⚔️ Rumble Royale")
      .setDescription("React with ❤️ to join the battle!\nGame starts soon...")
      .setColor("Red")
      .setThumbnail("https://i.imgur.com/F0jzq9T.png"); // thumbnail image (example)

    await interaction.reply({ embeds: [embed] });
  },
});

// Example /era command
client.commands.set("era", {
  data: {
    name: "era",
    description: "Change the current battle era",
  },
  async execute(interaction) {
    const eras = ["🌸 Flower", "🦖 Jurassic", "⚔️ World War", "🌌 Astronomy"];
    const era = eras[Math.floor(Math.random() * eras.length)];

    const embed = new EmbedBuilder()
      .setTitle("🌍 Era Changed!")
      .setDescription(`The new battle era is: **${era}**`)
      .setColor("Blue");

    await interaction.reply({ embeds: [embed] });
  },
});

// Slash command handler
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "⚠️ Error while executing command!", ephemeral: true });
  }
});

// Ready event
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Login
client.login(process.env.DISCORD_TOKEN);
