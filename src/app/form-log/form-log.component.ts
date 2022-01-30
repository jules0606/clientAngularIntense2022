import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-log',
  templateUrl: './form-log.component.html',
  styleUrls: ['./form-log.component.css']
})
export class FormLogComponent implements OnInit {
  public formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.formLogin = this.formBuilder.group( {
      login: '',
      mdp: ''
    })
  }

  ngOnInit(): void {

  }

  connection(): void {
    this.authService.logIn(this.formLogin.value.login, this.formLogin.value.mdp).subscribe( response => {
      if(response) {
        this.router.navigateByUrl('/assignments').then( _ => {});
      }
    })
  }
}
