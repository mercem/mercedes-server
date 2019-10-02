"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var axios_instance_1 = __importDefault(require("./config/axios-instance"));
var api_1 = __importDefault(require("./config/api"));
var middleware_1 = require("./helpers/middleware");
var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Content-Type, x-auth, code, Code');
    next();
});
app.get('/', function (req, res) { return res.send('Mercedes-Challenge API'); });
app.get('/vehicles', middleware_1.getToken, function (req, res) {
    var code = req.header('code');
    var options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + (code && middleware_1.AuthData[code].access_token)
        },
        url: api_1.default.getCarData + '/vehicles',
    };
    axios_instance_1.default(options)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (err) { res.status(400).send(err); });
});
app.get('/vehicles/:id', middleware_1.getToken, function (req, res) {
    var id = req.params.id;
    var code = req.header('code');
    var options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + (code && middleware_1.AuthData[code].access_token)
        },
        url: api_1.default.getCarData + "/vehicles/" + id,
    };
    axios_instance_1.default(options)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (err) { res.status(400).send(err); });
});
//TIRES
app.get('/vehicles/:id/tires', middleware_1.getToken, function (req, res) {
    var id = req.params.id;
    var code = req.header('code');
    var options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + (code && middleware_1.AuthData[code].access_token)
        },
        url: api_1.default.getCarData + "/vehicles/" + id + "/tires",
    };
    axios_instance_1.default(options)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (err) { res.status(400).send(err); });
});
//DOORS
app.get('/vehicles/:id/doors', middleware_1.getToken, function (req, res) {
    var id = req.params.id;
    var code = req.header('code');
    var options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + (code && middleware_1.AuthData[code].access_token)
        },
        url: api_1.default.getCarData + "/vehicles/" + id + "/doors",
    };
    axios_instance_1.default(options)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (err) { res.status(400).send(err); });
});
app.post('/vehicles/:id/doors', middleware_1.getToken, function (req, res) {
    var id = req.params.id;
    var code = req.header('code');
    var command = req.body.command;
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + (code && middleware_1.AuthData[code].access_token)
        },
        data: {
            command: command
        },
        url: api_1.default.getCarData + "/vehicles/" + id + "/doors",
    };
    axios_instance_1.default(options)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (err) { res.status(400).send(err); });
});
//LOCATION
app.get('/vehicles/:id/location', middleware_1.getToken, function (req, res) {
    var id = req.params.id;
    var code = req.header('code');
    var options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + (code && middleware_1.AuthData[code].access_token)
        },
        url: api_1.default.getCarData + "/vehicles/" + id + "/location",
    };
    axios_instance_1.default(options)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (err) { res.status(400).send(err); });
});
//ODOMETER
app.get('/vehicles/:id/odometer', middleware_1.getToken, function (req, res) {
    var id = req.params.id;
    var code = req.header('code');
    var options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + (code && middleware_1.AuthData[code].access_token)
        },
        url: api_1.default.getCarData + "/vehicles/" + id + "/odometer",
    };
    axios_instance_1.default(options)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (err) { res.status(400).send(err); });
});
//FUEL
app.get('/vehicles/:id/fuel', middleware_1.getToken, function (req, res) {
    var id = req.params.id;
    var code = req.header('code');
    var options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + (code && middleware_1.AuthData[code].access_token)
        },
        url: api_1.default.getCarData + "/vehicles/" + id + "/fuel",
    };
    axios_instance_1.default(options)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (err) { res.status(400).send(err); });
});
//STATE OF CHARGE
app.get('/vehicles/:id/stateofcharge', middleware_1.getToken, function (req, res) {
    var id = req.params.id;
    var code = req.header('code');
    var options = {
        headers: {
            'Accept': 'application/json',
            'Authorization': "Bearer " + (code && middleware_1.AuthData[code].access_token)
        },
        url: api_1.default.getCarData + "/vehicles/" + id + "/stateofcharge",
    };
    axios_instance_1.default(options)
        .then(function (response) {
        res.send(response.data);
    })
        .catch(function (err) { res.status(400).send(err); });
});
app.listen(port, function () { return console.log("Listening on port " + port + "!"); });
