import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { PayloadToken } from '@interfaces/PayloadToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  saveToken(token:string){
    setCookie('token', token, { expires: 2, path: '/' });
  }
  getToken() {
    const token = getCookie('token');
    return token;
  }
  removeToken() {
    removeCookie('token');
  }
  isValidToken() {
    const token = this.getToken();
    if (!token || token === 'undefined') {
      return false;
    }
  
    const decToken = jwtDecode<JwtPayload>(token);

    if (decToken && decToken?.exp) {
      const tokenFecha = new Date(0);
      tokenFecha.setUTCSeconds(decToken.exp);
      const actual = new Date();
      return tokenFecha.getTime() > actual.getTime();
    }
    return false;
  }
  getPayload(){
    const token = this.getToken();
    if (token) {
      return jwtDecode<PayloadToken>(token);
    }
    return null;
  }
}
