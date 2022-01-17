import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { Projet } from "../models/projet.model";
import { TodoService } from "../services/todo.service";

@Component({
  selector: 'my-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit, OnDestroy{
  toDay: Date|null=null;
  todos: Projet[]=[];
  todoSub!: Subscription
  constructor(private todoservice: TodoService, private router: Router ){

  }
  ngOnInit(): void {
    this.toDay= this.todoservice.toDay;
  this.todoSub=this.todoservice.todoSubject.subscribe((value:Projet[])=>{
    this.todos= value;

  },
  (error)=>{
     console.log("Ereur: ", error)
  },
  ()=>{
    console.log("observable complité")
  }
  )
  this.todoservice.emitTodos()

  }
  ngOnDestroy(): void {
      this.todoSub.unsubscribe()
  }
  onChangeIsmodif(i:number){
    this.todoservice.onChangeIsmodif(i)

  }
  onChangeStatus(i:number){
    this.todoservice.onChangeStatus(i)

  }
  onView(id:number){
    this.router.navigate(["Single-todo", id]);

  }
}
