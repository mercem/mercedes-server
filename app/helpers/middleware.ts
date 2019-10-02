import {IAuthData} from './types';
import {redirectUri, ClientID, ClientSecret} from '../config/environment';
import api from '../config/api';
import axios from '../config/axios-instance';

export let AuthData: { [s: string]: IAuthData; } = {};

export let getToken = (req:any, res:any, next:any) => {
  let code = req.header('code');
  if(!code) res.status(400).send('Authendication token is missing.');
  else if(!AuthData[code]) {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${ClientID}:${ClientSecret}`).toString('base64')}`
      },
      url: api.getToken,
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      }
    }
    axios(options)
      .then((response:any) => {
        if(code != null) {AuthData[code]=response.data; AuthData[code].expires_in= new Date().getTime() + 3600000}; // expires in  3600s
        next();
      })
      .catch((err: any) =>{res.status(400).send('Getting new access token is failed.')});
  } 
  else {
    if(AuthData[code].expires_in < new Date().getTime()){
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${ClientID}:${ClientSecret}`).toString('base64')}`
        },
        url: api.getToken,
        params: {
          grant_type: 'refresh_token',
          refresh_token: AuthData[code].refresh_token
        }
      }
      axios(options)
        .then((response:any) => {
          if(code != null) {AuthData[code]=response.data; AuthData[code].expires_in= new Date().getTime() + 3600000}; // expires in  3600s
          next();
        })
        .catch((err: any) =>{res.status(400).send('Refresh token is failed.')});
    }
    else next();
  }
}