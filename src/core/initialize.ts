// 
// Written by Jaroslav Kaňka 
// 2021
//

const systemInfo = require('./systemInfo');

export default function initializeBot(botName: string, botID: number): void {
    // Prints basic info about server and status
    console.log(`Bot is online!`);
    console.log(`Server is running on ${systemInfo.systemName}, Node.js version: ${systemInfo.nodeVersion}`);
    console.log(`Name: ${botName}`);
    console.log(`ID: ${botID}`);
}