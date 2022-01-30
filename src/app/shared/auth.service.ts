import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../form-log/form-log.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = false;
//  public url = "http://localhost:8010/api/utilisateurs";
  public url = "https://jules0606-api-2022.herokuapp.com/api/utilisateurs";
  private userAdmin: boolean = false;
  private JWT: string = '';

  constructor(private http:HttpClient) {
  }

  logIn(login: string, mdp: string): Observable<User>{
    return this.http.post<User>(this.url, {login, mdp});
  }

  logOut() {
    this.loggedIn = false;
  }

  setAdmin(bool: boolean) {
    this.userAdmin = bool;
  }

  isAdmin() {
    return this.userAdmin;
  }

  setJWT(jwt: string) {
    this.JWT = jwt;
  }

}
