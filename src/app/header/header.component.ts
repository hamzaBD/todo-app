import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  nombrePairsSub!: Subscription;
  salutationSub!: Subscription;
  constructor() {

  }

  ngOnInit(): void {
    const salutation = new Observable((observer)=>{
      observer.next("hello");
      observer.next("world");
      observer.complete();
    })

   this.salutationSub= salutation.subscribe(
      (value)=>{console.log("hhhhhhhhhhhh", value);},
      (error)=>{console.log("errooooooooor", error);},
      ()=>{console.log("observable complité")},
    )

 /*    const nombresParis = new Observable((observer)=>{
      let value = 0;
      const interval = setInterval(()=>{
        if(value % 2 ===0){
            observer.next(value)
        }
        value++;
      }, 1000)
      return ()=>clearInterval(interval)
    }) */

    /* this.nombrePairsSub=nombresParis.subscribe(
      (value)=>{
        console.log(value);
      }
    ) */
  }
  ngOnDestroy(): void {
    this.nombrePairsSub.unsubscribe();
    this.salutationSub.unsubscribe();


  }

}
