"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../config/environment");
var api_1 = __importDefault(require("../config/api"));
var axios_instance_1 = __importDefault(require("../config/axios-instance"));
exports.AuthData = {};
exports.getToken = function (req, res, next) {
    console.log(exports.AuthData);
    var code = req.header('code');
    if (!code)
        res.status(400).send('Authendication token is missing.');
    else if (!exports.AuthData[code]) {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': "Basic " + Buffer.from(environment_1.ClientID + ":" + environment_1.ClientSecret).toString('base64')
            },
            url: api_1.default.getToken,
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: environment_1.redirectUri
            }
        };
        axios_instance_1.default(options)
            .then(function (response) {
            if (code != null) {
                exports.AuthData[code] = response.data;
                exports.AuthData[code].expires_in = new Date().getTime() + 3600000;
            }
            ; // expires in  3600s
            next();
        })
            .catch(function (err) { res.status(400).send('Getting new access token is failed.'); });
    }
    else {
        if (exports.AuthData[code].expires_in < new Date().getTime()) {
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': "Basic " + Buffer.from(environment_1.ClientID + ":" + environment_1.ClientSecret).toString('base64')
                },
                url: api_1.default.getToken,
                params: {
                    grant_type: 'refresh_token',
                    refresh_token: exports.AuthData[code].refresh_token
                }
            };
            axios_instance_1.default(options)
                .then(function (response) {
                if (code != null) {
                    exports.AuthData[code] = response.data;
                    exports.AuthData[code].expires_in = new Date().getTime() + 3600000;
                }
                ; // expires in  3600s
                next();
            })
                .catch(function (err) { res.status(400).send('Refresh token is failed.'); });
        }
        else
            next();
    }
};
