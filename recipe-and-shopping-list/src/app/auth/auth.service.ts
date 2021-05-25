import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEoUzSKmpOWxeVbfH09xe7kK7XCuLVmj8'

  constructor(
    private http:HttpClient,
  ) { }

  signUp(email: string, password: string) {
    if (!email || !password) throw new Error('Invalid Email and/or password in AuthService.signUp()')

    console.log('email =', email);
    console.log('password =', password);
    const body = {
      email,
      password,
      returnSecureToken: true,
    };

    return this.http.post<AuthResponseData>(
      this.signUpUrl,
      body
    )
  }
}
