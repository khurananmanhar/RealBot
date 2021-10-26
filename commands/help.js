const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'Ping Command' ,
    execute(message, args){
        const data = [];
    const { commands } = message.client;

    if (!args.length) {
        data.push('Here\'s a list of all my commands:'); //push on data var to append the info you want 
        data.push(commands.map(command => command.name).join('\n'));
        data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

        return message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                message.reply('I\'ve sent you a DM with all my commands!');
            })
            .catch(error => {
                console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            });
    }
    
    }
}