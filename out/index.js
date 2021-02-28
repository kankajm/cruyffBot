"use strict";
// 
// Written by Jaroslav Kaňka 
// 2021
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports discord.js
const discord_js_1 = __importDefault(require("discord.js"));
// Imports moment.js
const moment_1 = __importDefault(require("moment"));
// Opening and reading secrets from .env files.
const dotenv = require('dotenv');
dotenv.config();
// Sets up bots prefix.
const BOT_PREFIX = '+';
// Sets up bots token
// @ts-expect-error: If token is not defined, bot will not start.
const BOT_TOKEN = process.env.DISCORD_TOKEN;
// Sets up bots embed color.
const BOT_EMBED_COLOR = "#FFB6C1";
const BOT_ADMIN_EMBED_COLOR = "#00FF00";
// Function for initializing the bot.
const initialize_1 = __importDefault(require("./core/initialize"));
//
// Defining bot staffs IDs in array
//
const botStaffs = [
    '556446675712081940',
    '426420338713427980',
    '681069547331256320',
    '655517783513235489',
    '788856333826785311',
    '161071543584030720'
];
//
// Bot is represented with an object --> client
//
const client = new discord_js_1.default.Client();
// Clears console on start
console.clear();
//
// Initialize the bot with logging system and bot info into the console.
// ./core/initialize.ts
//
client.once('ready', () => {
    // core/initialize.ts
    // @ts-expect-error: These objects are not null and will not be.
    initialize_1.default(client.user.username, client.user.id);
    // Spins up the Rich Presence
    // @ts-expect-error: String is defined.
    client.user.setPresence({ activity: { name: "+help | discord.gg/gifzone" }, status: 'idle' });
});
//
// Automatic avatar sending into special channels
//
client.on('ready', () => __awaiter(void 0, void 0, void 0, function* () {
    // Sends avatars into channels every 2sec
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        // Creates an object with specified guild.
        let guild = client.guilds.resolve('795960010659856434');
        // Picks random user on the guild.
        let randomUser = guild === null || guild === void 0 ? void 0 : guild.members.cache.random();
        // Gets his profile picture
        let randomPicture = randomUser.user.avatarURL({ dynamic: true });
        // If null return
        if (randomPicture === null) {
            return;
        }
        // Is is the profile picture animated do this
        if (randomPicture.includes('.gif')) {
            // Embed for picture.
            const embedPicture = new discord_js_1.default.MessageEmbed()
                .setColor(BOT_EMBED_COLOR)
                .setImage(`${randomPicture}`)
                .setTimestamp();
            // Send to gif channel
            return guild === null || guild === void 0 ? void 0 : guild.channels.cache.get('815181575288782869').send(embedPicture);
        }
        else {
            // Is is not null nor gif print it into static.
            // Embed for picture.
            const embedPicture = new discord_js_1.default.MessageEmbed()
                .setColor(BOT_EMBED_COLOR)
                .setImage(`${randomPicture}`)
                .setTimestamp();
            // Send to static channel
            return guild === null || guild === void 0 ? void 0 : guild.channels.cache.get('815181628858171433').send(embedPicture);
        }
    }), 2000);
}));
//
// Commands that can be used by everyone.
//
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    // Ignore messages that aren't from a guild
    if (!message.guild)
        return;
    // Bots avatar
    const botAvatar = (_a = client.user) === null || _a === void 0 ? void 0 : _a.avatarURL();
    // Assigns message author id to more readable variable.
    const messageAuthor = message.author.id;
    // Clears out the bot message of the BOT_PREFIX and creates an array of arguments.
    const args = message.content.slice(BOT_PREFIX.length).trim().split(' ');
    switch (args[0]) {
        // Public command userinfo: BOT_PREFIX + userinfo <@taguser>
        case 'userinfo': {
            // Declare bot avatar URL
            const authorAvatarURL = message.author.avatarURL();
            // Gets user ID by @username_and_discriminator
            const user = message.mentions.users.first();
            // Creates an user object to work with.
            // @ts-expect-error: String is defined.
            const member = message.guild.members.resolve(user);
            // If user writes +userinfo without @TAGGING make an handled error
            if ((member === null || member === void 0 ? void 0 : member.id) === undefined) {
                const embedError = new discord_js_1.default.MessageEmbed()
                    .setColor(BOT_EMBED_COLOR)
                    .addFields({ name: 'Error:', value: "You didn't mention the user to show!" });
                return message.channel.send(embedError);
            }
            // Creates a formatted string with all roles user have.
            let roleMap = (_b = message.member) === null || _b === void 0 ? void 0 : _b.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(", ");
            // Exceptions while formatting roleMap.
            // @ts-expect-error: roleMap is defined.
            if (roleMap.length > 1024)
                roleMap = "Too many roles to display";
            if (!roleMap)
                roleMap = "No roles";
            const embedUserInfo = new discord_js_1.default.MessageEmbed()
                .setColor(BOT_EMBED_COLOR)
                .setTitle(`User Info - ${member === null || member === void 0 ? void 0 : member.user.username}`)
                .setAuthor((_c = client.user) === null || _c === void 0 ? void 0 : _c.username, botAvatar)
                .setThumbnail(`${member.user.avatarURL({ dynamic: true })}`)
                .addFields({ name: 'ID:', value: member === null || member === void 0 ? void 0 : member.id }, { name: 'Name and discriminator:', value: member === null || member === void 0 ? void 0 : member.user.tag }, { name: 'Created at:', value: moment_1.default(member === null || member === void 0 ? void 0 : member.user.createdTimestamp).format('MMMM Do YYYY') }, { name: 'Joined at:', value: moment_1.default(member === null || member === void 0 ? void 0 : member.joinedTimestamp).format('MMMM Do YYYY') }, { name: 'Top role:', value: member === null || member === void 0 ? void 0 : member.roles.highest }, { name: 'Is bot?:', value: (member === null || member === void 0 ? void 0 : member.user.bot) ? 'Yes' : 'No' }, { name: 'Roles:', value: roleMap })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(embedUserInfo);
        }
        // Public command serverinfo: BOT_PREFIX + serverinfo
        case 'serverinfo': {
            // Declare bot avatar URL
            const authorAvatarURL = message.author.avatarURL();
            // Creates a formatted string with all roles server have.
            let serverRoleMap = message.guild.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(r => r)
                .join(", ");
            // Exceptions while formatting serverRoleMap.
            if (serverRoleMap.length > 1024)
                serverRoleMap = "Too many roles to display";
            if (!serverRoleMap)
                serverRoleMap = "No roles";
            const embedServerInfo = new discord_js_1.default.MessageEmbed()
                .setColor(BOT_EMBED_COLOR)
                .setTitle(`Server info - ${message.guild.name}`)
                .setAuthor((_d = client.user) === null || _d === void 0 ? void 0 : _d.username, botAvatar)
                .setThumbnail(`${message.guild.icon ? message.guild.iconURL() : ''}`)
                .addFields({ name: 'Member count:', inline: true, value: message.guild.memberCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }, { name: 'Role list:', value: serverRoleMap })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(embedServerInfo);
        }
        // Public command help: BOT_PREFIX + help
        case 'help': {
            // Declare bot avatar URL
            const authorAvatarURL = message.author.avatarURL();
            const embedHelp = new discord_js_1.default.MessageEmbed()
                .setColor(BOT_EMBED_COLOR)
                .setTitle(`Commands for the ${(_e = client.user) === null || _e === void 0 ? void 0 : _e.username}:`)
                .setAuthor((_f = client.user) === null || _f === void 0 ? void 0 : _f.username, botAvatar)
                .addFields({ name: 'Info about the selected user:', value: '```+userinfo @username```' }, { name: 'Info and statistics about the server:', value: '```+serverinfo```' }, { name: 'Ban user from the server (Admin only):', value: '```+ban @username```' }, { name: 'Kick user from the server (Admin only):', value: '```+kick @username```' }, { name: 'Unban user from the server (Admin only):', value: '```+unban @username```' })
                .setTimestamp()
                .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`, authorAvatarURL);
            return message.channel.send(embedHelp);
        }
    }
}));
//
// Commands only staff can do. (from botStaffs array)
//
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    // Ignore messages that aren't from a guild
    if (!message.guild)
        return;
    // Assigns message author id to more readable variable.
    const messageAuthor = message.author.id;
    // Checks if user ID is in botStaffs array. If is assigns value true.
    const isMessageAuthorStaff = botStaffs.includes(messageAuthor);
    // Clears out the bot message of the BOT_PREFIX and creates an array of arguments.
    const args = message.content.slice(BOT_PREFIX.length).trim().split(' ');
    // Bypasses unwanted users from using these commands.
    if (isMessageAuthorStaff)
        switch (args[0]) {
            // Ban command for admins: BOT_PREFIX + ban <@Name of an user, reason>
            case 'ban': {
                // Removes the original message.
                yield message.delete();
                // Gets user ID by @username_and_discriminator
                const user = message.mentions.users.first();
                // Creates an user object to work with.
                // @ts-expect-error: String is defined.
                const member = message.guild.members.resolve(user);
                // Creates a variable for ban reason to be fetched later.
                let banReason;
                // Checks if user is defined. If not stops the process and gives warning to the user.
                if (user === undefined || user === null) {
                    const embedError = new discord_js_1.default.MessageEmbed()
                        .setColor(BOT_ADMIN_EMBED_COLOR)
                        .addFields({ name: 'Error:', value: "You didn't mention the user to ban! Or user is already banned." });
                    return message.channel.send(embedError);
                }
                // If ban reason is not defined sets default value.
                if (args[2] != undefined) {
                    banReason = args[2];
                }
                else {
                    banReason = "Reason of ban is not defined.";
                }
                if (member) {
                    // Bans user from the server with given reason.
                    member.ban({
                        reason: banReason,
                    }).then(() => {
                        // After banning the user bot logs this process into the console and then gives that info to user.
                        console.log(`User ${user.tag} was banned due the reason: ${banReason}`);
                        const embedBanned = new discord_js_1.default.MessageEmbed()
                            .setColor(BOT_ADMIN_EMBED_COLOR)
                            .addFields({ name: 'Done:', value: `User ${user.tag} was banned due the reason: ${banReason}` });
                        return message.channel.send(embedBanned);
                    }).catch(err => {
                        // Logs the error into the console.
                        console.error(err);
                        // An error happened.
                        const embedError = new discord_js_1.default.MessageEmbed()
                            .setColor(BOT_ADMIN_EMBED_COLOR)
                            .addFields({ name: 'Error:', value: 'I was unable to ban the member due an error. I logged that error into the console.' });
                        return message.channel.send(embedError);
                    });
                }
                break;
            }
            // Unban command for admins: BOT_PREFIX + unban <@Name of an user + Discriminator>
            case 'unban': {
                // Removes the original message.
                yield message.delete();
                // If is <unbannedUser> empty stop the program and write the error on the screen.
                if (args[1] === undefined) {
                    const embedError = new discord_js_1.default.MessageEmbed()
                        .setColor(BOT_ADMIN_EMBED_COLOR)
                        .addFields({ name: 'Error:', value: 'Invalid user ID or mention.' });
                    return message.channel.send(embedError);
                }
                // Clears off the string for usage as an ID.
                let userID = args[1].replace('<@', '').replace('>', '');
                // Reads all of the bans that occurred on the server.
                yield message.guild.fetchBans().then((bans) => __awaiter(void 0, void 0, void 0, function* () {
                    // Tries to find user in it.
                    let member = bans.get(userID);
                    // If user is not in there shows an error.
                    if (!member) {
                        const embedError = new discord_js_1.default.MessageEmbed()
                            .setColor(BOT_ADMIN_EMBED_COLOR)
                            .addFields({ name: 'Error:', value: "Cannot find a ban for the given user." });
                        return message.channel.send(embedError);
                    }
                    else {
                        // Unbans the user.
                        // @ts-ignore
                        yield message.guild.members.unban(userID);
                        // Logs into the console.
                        // @ts-ignore
                        console.log(`${member.user.username} was unbanned by ${message.author.tag}`);
                        // Shows to client.
                        const embedUnBanned = new discord_js_1.default.MessageEmbed()
                            .setColor(BOT_ADMIN_EMBED_COLOR)
                            .addFields({ name: 'Done:', value: `User ${member.user.tag} was unbanned by ${message.author.tag}` });
                        return message.channel.send(embedUnBanned);
                    }
                }));
                break;
            }
            // Kick command for admins: BOT_PREFIX + kick <@Name of an user, reason>
            case 'kick': {
                // Removes the original message.
                yield message.delete();
                // Creates a variable for kick reason to be fetched later.
                let kickReason;
                // If kick reason is not defined sets default value.
                if (args[2] != undefined) {
                    kickReason = args[2];
                }
                else {
                    kickReason = "Reason of kick is not defined.";
                }
                // Gets user ID by @username_and_discriminator
                const user = message.mentions.users.first();
                // If user was mentioned.
                if (user) {
                    // Creates an user object to work with.
                    const member = message.guild.members.resolve(user);
                    // If the member is in the guild
                    if (member) {
                        // Kicks the user from the server with an defined reason.
                        member
                            .kick(kickReason)
                            .then(() => {
                            // Log action into the console.
                            console.log(`User ${user.tag} was kicked due the reason: ${kickReason}`);
                            // We let the message author know we were able to kick the person.
                            const embedKicked = new discord_js_1.default.MessageEmbed()
                                .setColor(BOT_ADMIN_EMBED_COLOR)
                                .addFields({ name: 'Done:', value: `User ${member.user.tag} was kicked by ${message.author.tag}` });
                            return message.channel.send(embedKicked);
                        })
                            .catch(err => {
                            // Log the error
                            console.error(err);
                            // Send the error as an embed.
                            const embedError = new discord_js_1.default.MessageEmbed()
                                .setColor(BOT_ADMIN_EMBED_COLOR)
                                .addFields({ name: 'Error:', value: "I was unable to kick the member due an error. I logged that error into the console." });
                            return message.channel.send(embedError);
                        });
                    }
                }
                else {
                    const embedError = new discord_js_1.default.MessageEmbed()
                        .setColor(BOT_ADMIN_EMBED_COLOR)
                        .addFields({ name: 'Error:', value: "You didn't mention the user to kick! Or user is not in this guild." });
                    return message.channel.send(embedError);
                }
                break;
            }
            // Purge command for admins: BOT_PREFIX + purge <number of lines / messages>
            case 'purge': {
                //
                // These are error messages.
                //
                if (!args[1])
                    return message.channel.send("Please specify an amount to delete (1-99)");
                if (isNaN(Number(args[1])))
                    return message.channel.send("Only numbers are allowed.");
                if (parseInt(args[1]) > 99)
                    return message.channel.send("The maximum amount of messages to delete is 99!");
                //
                // I'm using Try, Catch, Finally to prevent crashes due limitations from Discord API.
                //
                try {
                    // Deletes the selected amount od messages plus one that was created for this request.
                    // @ts-expect-error: It can be used here.
                    yield message.channel.bulkDelete(parseInt(args[1]) + 1);
                }
                catch (error) {
                    // If API send error due it's limitations is shows this message.
                    console.log(`${message.author.username} tried to delete older message than 14 days.`);
                }
                finally {
                    // When nothing happens programs inform user he can't delete messages older than 14 days.
                    yield message.channel.send('You can only delete messages that are under 14 days old.');
                }
                break;
            }
        }
}));
//
// Connects to a Discord API using an API token.
// Token is placed in ./out/.env
// Token is formatted in it like: DISCORD_TOKEN = xxxxxxxxx
//
// If is compiler showing an error here please ignore it. !!!!!
client.login(BOT_TOKEN).then(() => {
    console.log("Token is valid.");
});
