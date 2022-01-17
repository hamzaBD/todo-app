import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
 users: User[]=[];
 //usersSubscription: Subscription = new Subscriptio;
  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.initilase()

  }
  initilase(){
    this.userService.usersSub.subscribe((data)=>{
      this.users = data
      console.log("reeeeeeeeeeeeeeeeeeeeead", this.users)

    });
    this.userService.emitUsers()
  }
  ngOnDestroy(): void {
      //this.usersSubscription.unsubscribe();
  }

}
