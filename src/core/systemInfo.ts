// 
// Written by Jaroslav Kaňka 
// 2021
//

import os from 'os';
import osName from 'os-name';

module.exports = { systemName: osName(os.platform(), os.release()),
                   nodeVersion: process.version };