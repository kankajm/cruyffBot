"use strict";
// 
// Written by Jaroslav Kaňka 
// 2021
//
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const os_name_1 = __importDefault(require("os-name"));
module.exports = { systemName: os_name_1.default(os_1.default.platform(), os_1.default.release()),
    nodeVersion: process.version };
