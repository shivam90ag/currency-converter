import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import CustomValidators from '../forms/CustomValidators';
import { RegisterService } from './register.service'
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register-component.css'],
    providers: [RegisterService]
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    isSubmitted: boolean = false;
    isUserExists: boolean = false;
    isSubmitting : boolean = false;
    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private registerService: RegisterService) { }
    ngOnChanges() {
        this.isUserExists = false;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, CustomValidators.validateEmail]],
            password: ['', [Validators.required]],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]]
        });
    }
    submitForm(): void {
        // console.log(this.registerForm);
        this.isSubmitted = true;
        if (this.registerForm.valid) {
            this.isSubmitting = true;
            this.registerService.register({
                username: this.registerForm.controls['email'].value,
                password: this.registerForm.controls['password'].value,
                firstname: this.registerForm.controls['firstname'].value,
                lastname: this.registerForm.controls['lastname'].value
            })
                .then((data) => {
                    this.isSubmitted = false;
                    this.isSubmitting = false;
                    this.router.navigate(['/dashboard']);
                }).catch((err) => {
                    if (err.status === 401) {
                        this.isUserExists = true;
                    }
                    this.isSubmitting = false;
                    this.isSubmitted = false;
                    console.log(err);
                })
        }
    }
}
