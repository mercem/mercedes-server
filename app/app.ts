import express = require('express');
import axios from './config/axios-instance';
import api from './config/api';
import {redirectUri, ClientID, ClientSecret} from './config/environment';
import {getToken, AuthData} from './helpers/middleware';

const app: express.Application = express();
const port = process.env.PORT || 3000;

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



app.get('/', (req, res) => res.send('Mercedes-Challenge API'));

app.get('/vehicles', getToken, (req, res) => {
  const code = req.header('code');
  let options = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${code && AuthData[code].access_token}`
    },
    url: api.getCarData+'/vehicles',
  }
  axios(options)
    .then((response:any) => {
      res.send(response.data);
    })
    .catch((err: any) =>{res.status(400).send(err)});
});

app.get('/vehicles/:id', getToken, (req, res) => {
  const id = req.params.id;
  const code = req.header('code');
  let options = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${code && AuthData[code].access_token}`
    },
    url: `${api.getCarData}/vehicles/${id}`,
  }
  axios(options)
    .then((response:any) => {
      res.send(response.data);
    })
    .catch((err: any) =>{res.status(400).send(err)});
});

//TIRES
app.get('/vehicles/:id/tires', getToken, (req, res) => {
  const id = req.params.id;
  const code = req.header('code');
  let options = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${code && AuthData[code].access_token}`
    },
    url: `${api.getCarData}/vehicles/${id}/tires`,
  }
  axios(options)
    .then((response:any) => {
      res.send(response.data);
    })
    .catch((err: any) =>{res.status(400).send(err)});
});

//DOORS
app.get('/vehicles/:id/doors', getToken, (req, res) => {
  const id = req.params.id;
  const code = req.header('code');
  let options = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${code && AuthData[code].access_token}`
    },
    url: `${api.getCarData}/vehicles/${id}/doors`,
  }
  axios(options)
    .then((response:any) => {
      res.send(response.data);
    })
    .catch((err: any) =>{res.status(400).send(err)});
});

app.post('/vehicles/:id/doors', getToken, (req, res) => {
  const id = req.params.id;
  const code = req.header('code');
  const {command} = req.body;
  let options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${code && AuthData[code].access_token}`
    },
    data: {
      command
    },
    url: `${api.getCarData}/vehicles/${id}/doors`,
  }
  axios(options)
    .then((response:any) => {
      res.send(response.data);
    })
    .catch((err: any) =>{res.status(400).send(err)});
});

//LOCATION
app.get('/vehicles/:id/location', getToken, (req, res) => {
  const id = req.params.id;
  const code = req.header('code');
  let options = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${code && AuthData[code].access_token}`
    },
    url: `${api.getCarData}/vehicles/${id}/location`,
  }
  axios(options)
    .then((response:any) => {
      res.send(response.data);
    })
    .catch((err: any) =>{res.status(400).send(err)});
});

//ODOMETER
app.get('/vehicles/:id/odometer', getToken, (req, res) => {
  const id = req.params.id;
  const code = req.header('code');
  let options = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${code && AuthData[code].access_token}`
    },
    url: `${api.getCarData}/vehicles/${id}/odometer`,
  }
  axios(options)
    .then((response:any) => {
      res.send(response.data);
    })
    .catch((err: any) =>{res.status(400).send(err)});
});

//FUEL
app.get('/vehicles/:id/fuel', getToken, (req, res) => {
  const id = req.params.id;
  const code = req.header('code');
  let options = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${code && AuthData[code].access_token}`
    },
    url: `${api.getCarData}/vehicles/${id}/fuel`,
  }
  axios(options)
    .then((response:any) => {
      res.send(response.data);
    })
    .catch((err: any) =>{res.status(400).send(err)});
});

//STATE OF CHARGE
app.get('/vehicles/:id/stateofcharge', getToken, (req, res) => {
  const id = req.params.id;
  const code = req.header('code');
  let options = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${code && AuthData[code].access_token}`
    },
    url: `${api.getCarData}/vehicles/${id}/stateofcharge`,
  }
  axios(options)
    .then((response:any) => {
      res.send(response.data);
    })
    .catch((err: any) =>{res.status(400).send(err)});
});


app.listen(port, () => console.log(`Listening on port ${port}!`));