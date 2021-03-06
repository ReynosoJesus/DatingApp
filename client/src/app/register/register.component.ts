import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {}
  registerForm!: FormGroup;
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
    })
    this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  register() {
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe(response=>{
    //   console.log(response);
    //   this.cancel();
    // },error=>{
    //   console.log(error);
    //   this.toastr.error(error.error);
    // })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  matchValues(matchTo: string): ValidatorFn {
    /*You got the undefined error as you are not check the parent && parent.controls exists or not,
     since the Validation fn will be extecuted many times as Angular way.*/
    return (control: AbstractControl) => {
      if (control.parent && control.parent.controls) {
        return control?.value === (control.parent.controls as { [key: string]: AbstractControl })
        [matchTo].value ? null : { isMatching: true };
      }
      return null;
    }
  }

}
