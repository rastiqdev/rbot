const db = require("quick.db")

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns"],
  usage: "rwarns <@utilisateur>",
  description: "Enlever tout les warns d'une personne",
  category: "moderation",
  run: async (client, message, args) => {
    
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("Vous ne passerez pas ! (Vous n'avez pas la permission d'enlever les warns de quelqu'un.)")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send("Veuillez mentionner la personne dont vous voulez enlever les warns.")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("Les bots n'ont pas de warns.")
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send(`${message.mentions.users.first().username} n'a pas de warns`)
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.send(`Vos warns ont été enlevés par ${message.author.username} dans ${message.guild.name}`)
    await message.channel.send(`Les warns de ${message.mentions.users.first().username} ont été supprimés !`).then(msg => {
      setTimeout(() => {
        msg.delete();
      }, 5000);
    })
    let embed = new discord.MessageEmbed()
    .setTitle("Action: RWarns")
    .setDescription(`${user} (${user.id}) n'a plus ses warns}.`)
    .setColor("#ff2050")
    .setFooter(`RWarns par ${message.author.username}`);
    
    message.channel.send(embed).then(msg => {
      msg.delete();
    }, 5000)
    
    client.channels.cache.get(db.get(`logschannel_${message.guild.id}`)).send({embed: embed }) // Envoie de l'embed final dans le channel de LOG
    
  
    
}
}