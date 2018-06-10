import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
import { LoginService } from './login.service'
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login-component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isSubmitted: boolean = false;
    isSubmitting: boolean = false;
    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, CustomValidators.validateEmail]],
            password: ['', [Validators.required]]
        });
    }
    submitForm(){
        this.isSubmitted = true;
        if (this.loginForm.valid) {
            this.isSubmitting = true
            this.loginService.login({ username: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value })
                .then((data) => {
                    this.isSubmitted = false;
                    this.isSubmitting = false
                    this.router.navigate(['/dashboard']);
                }).catch((err) => {
                    this.isSubmitting = false
                    this.isSubmitted = false;
                    console.log(err);
                })
        }
    }
}
