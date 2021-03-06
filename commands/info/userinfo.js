const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "userinfo",
  aliases: ["whois", "user"],
  usage: "userinfo <mention>",
  description: "Avoir des stats avancées de vous ou de quelqu'un de mentionné",
  category: "info",
  run: async (client, message, args) => {


    let user;

    if (!args[0]) {
      user = message.member;
    } else {


      if (isNaN(args[0])) return message.channel.send(":x: ID d'utilisateur invalide.")


      user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => { return message.channel.send(":x: Unable to find this Person") })
    }

    if (!user) {
      return message.channel.send(":x: Impossible de trouver cette personne!")
    }


    //OPTIONS FOR STATUS

    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    }

    //NOW BADGES
    let badges = await user.user.flags
    badges = await badges.toArray();

    let newbadges = [];
    badges.forEach(m => {
      newbadges.push(m.replace("_", " "))
    })

    let embed = new MessageEmbed()
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    //ACTIVITY
    let array = []
    if (user.user.presence.activities.length) {

      let data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "Aucun"
        let xname = data[i].details || "Aucun"
        let zname = data[i].state || "Aucun"
        let type = data[i].type

        array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)

        if (data[i].name === "Spotify") {
          embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
        }

        embed.setDescription(array.join("\n"))

      }
    }

      //EMBED COLOR BASED ON member
      embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)

      //OTHER STUFF 
      embed.setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))

      //CHECK IF USER HAVE NICKNAME
      if (user.nickname !== null) embed.addField("Surnom", user.nickname)
      embed.addField("A rejoint le serveur le", moment(user.user.joinedAt).format("LLLL"))
        .addField("A créé son compte le", moment(user.user.createdAt).format("LLLL"))
        .addField("Informations", `ID: \`${user.user.id}\`\nTag: ${user.user.discriminator}\nBot: ${user.user.bot}\nUtilisateur supprimé: ${user.deleted}`)
        .addField("Badges", newbadges.join(", ").toLowerCase() || "Aucun")



      return message.channel.send(embed).catch(err => {
        return message.channel.send("Erreur : " + err)
      })



    }



  }