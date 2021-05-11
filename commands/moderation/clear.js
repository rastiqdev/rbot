const discord = require("discord.js");

module.exports = {
  name: "clear",
  category: "moderation",
  description: "Supprimer des messages rapidement.",
  usage: "clear <nombre>",
  alises: ["purge"],
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous ne passerez pas ! (Vous n'avez pas la permission d'utiliser cette commande)");
        if (!args[0]) return message.channel.send("Vous devez indiquer le nombre de messages à supprimer !");
        if (isNaN(args[0])) return message.channel.send("L'argument spécifié n'est pas in nombre !");
        if (parseInt(args[0]) <= 0 || parseInt(args[0]) >= 99) return message.channel.send("Le nombre de messages à supprimer doit être compris entre 1 et 99.")
        message.channel.bulkDelete(parseInt(args[0]) + 1)
        message.channel.send(`Vous avez supprimé ${args[0]} message(s).`).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 5000);
        });
  }
}