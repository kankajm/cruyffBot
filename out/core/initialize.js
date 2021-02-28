"use strict";
// 
// Written by Jaroslav Kaňka 
// 2021
//
Object.defineProperty(exports, "__esModule", { value: true });
const systemInfo = require('./systemInfo');
function initializeBot(botName, botID) {
    // Prints basic info about server and status
    console.log(`Bot is online!`);
    console.log(`Server is running on ${systemInfo.systemName}, Node.js version: ${systemInfo.nodeVersion}`);
    console.log(`Name: ${botName}`);
    console.log(`ID: ${botID}`);
}
exports.default = initializeBot;
