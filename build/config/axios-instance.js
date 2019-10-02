"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios').default;
var instance = axios.create({
    timeout: 20000,
});
exports.default = instance;
