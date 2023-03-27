import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit {
userInfo:any;
personalInfoForm:FormGroup
edit : boolean = false;
info = localStorage.getItem('user').split('/')
ngOnInit(): void {

  this.userInfo = {
    name:this.info[0],
    lastname:this.info[1],
    email:this.info[2],
    mobile:this.info[3],
    userID:this.info[4]
  }
  console.log(this.userInfo)

  this.personalInfoForm = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'name': new FormControl(null, [Validators.required]),
    'lastname': new FormControl(null, [Validators.required]),
    'mobile': new FormControl(null, [Validators.required,Validators.minLength(9), Validators.maxLength(9),]),
    'password': new FormControl(null, [Validators.required,Validators.minLength(8)])
  })
}

editMode(){
 this.edit = true;
 this.personalInfoForm.patchValue({
  'name':this.info[0],
  'lastname':this.info[1],
  'email':this.info[2],
  'mobile':this.info[3],
  'userID':this.info[4]
 })
}

onSubmit(){
  if (this.personalInfoForm.status == 'INVALID') {
    alert('გთხოვთ შეავსოთ ყველა საჭირო გრაფა')
  } else {
    console.log(this.personalInfoForm.value)
    alert('ეს ფუნქცია მალე დაემატება')
  }
}
}
