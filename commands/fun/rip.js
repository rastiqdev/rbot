
const { MessageAttachment } = require('discord.js');
const canvacord = require("canvacord");
module.exports = {
  name: "rip",
  description: "Effet rip sur une image",
  usage: "rip <utilisateur ou lien d'image>",
  category: "fun",
  run: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    let rip = await canvacord.Canvas.rip(user.displayAvatarURL({format: 'png', dynamic: false}));
    let attachment = new MessageAttachment(rip, "rip.png");
    return message.channel.send(attachment);
    }
}