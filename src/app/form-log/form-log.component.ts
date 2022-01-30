import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

export class User {
  login!: string;
  admin!: boolean;
  token!: string;
}

@Component({
  selector: 'app-form-log',
  templateUrl: './form-log.component.html',
  styleUrls: ['./form-log.component.css']
})
export class FormLogComponent implements OnInit {
  public formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
    this.formLogin = this.formBuilder.group( {
      login: '',
      mdp: ''
    })
  }

  ngOnInit(): void {

  }

  connection(): void {
    this.authService.logIn(this.formLogin.value.login, this.formLogin.value.mdp).subscribe( (response: User) => {
      if(response) {
        this.snackbar.open('Authentification réussie', 'Undo', {
          duration: 1500
        });
        this.authService.setJWT(response.token);
        this.authService.setAdmin(response.admin);
        this.router.navigateByUrl('/assignments').then( _ => {});
      } else {
        this.snackbar.open('Mauvais login ou mot de passe', 'Undo', {
          duration: 1500
        });
      }
    })
  }
}
