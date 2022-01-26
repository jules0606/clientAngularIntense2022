import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = false;
  public url = "http://localhost:8010/api/utilisateurs/";

  constructor(private http:HttpClient) {
  }

  logIn(login: string, mdp: string): Observable<string>{
    return this.http.get<string>(this.url + login + '/' + mdp);
  }

  logOut() {
    this.loggedIn = false;
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    // renvoie une promesse !
    return isUserAdmin;
  }

}
