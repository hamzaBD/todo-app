import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/adress.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup|any;
  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userForm= this.fb.group({
      firstname: this.fb.control("", [Validators.required, Validators.minLength(5)]),
      lastname: this.fb.control("", [Validators.required, Validators.minLength(5)]),
      email: this.fb.control("",  [Validators.required, Validators.email, Validators.minLength(5)]),
      adress: this.fb.group({
        street: this.fb.control("", Validators.required),
        city: this.fb.control("", Validators.required),
        state: this.fb.control("", Validators.required),
        zipcode: this.fb.control("", Validators.required),
      }),

      description: this.fb.control("", [Validators.required,  Validators.minLength(5)]),
      dateBirth: this.fb.control("", Validators.required),
      aliases: this.fb.array([]),

    })
  }
  onSubmit():void{

    const dataUser= this.userForm.value;
    const adress = new Address(dataUser.street,
                               dataUser.city,
                               dataUser.state,
                               dataUser.zipcode
      );
      const aliases= dataUser.aliases? dataUser.aliases:[]
    const user = new User(dataUser.firstname,
                          dataUser.lastname,
                          dataUser.email,
                          dataUser.description,
                          dataUser.dateBirth,
                          adress,
                          aliases

      )


   this.userService.addUser(user);
   this.router.navigate(["users"])
  }
  getAliases(): FormArray{
    return this.userForm.get("aliases") as FormArray
  }
  addAliases(): void{
  console.log("daaaaaaaaaaatcha", this.userForm.value)
    this.getAliases().push(this.fb.control("", Validators.required))

  }

}
