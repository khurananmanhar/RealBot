//require('dotenv').config();
//const token = process.env.token;
//const memberCount = require('./member-count.js')
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { prefix, bot_age, bot_info } = require('./config.json');


//const client = new Discord.Client();

const fs = require('fs');
const { channel } = require('diagnostics_channel');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command)
	
}

client.once('ready', () => {
	console.log('Ready!');

client.user.setActivity("?help", { type: "PLAYING"})
});

client.on('messageCreate',message => {
	if (message.author.bot) return;
	//memberCount(client)
//roleClaim(client)
// message.reply(message)
if(message.content.toLowerCase().includes('real')){
	message.channel.send('real')
	fs.readFile('number.txt', 'utf8', function (err,data) {
		if (err) {
		  return console.log(err);
		}
		// message.channel.send(data)
		let realNumber = parseInt(data)
		realNumber += 1
		// message.channel.send(toString(realNumber))
		fs.writeFileSync('number.txt', realNumber.toString());
		message.channel.send(`Real has been said ${realNumber.toString()} time(s)`)
	  });
}


	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

if(!client.commands.has(command)) return;

try {
	client.commands.get(command).execute(message, args);
} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
}

		 if(!message.content.startsWith(prefix) || message.author.bot) return;
});


client.login(token);