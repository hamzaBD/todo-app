import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Projet } from 'src/app/models/projet.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
 todo= new Projet();
  constructor(private readonly todoservice: TodoService, private  router:Router) { }

  ngOnInit(): void {
  }
  addTodo(todo:Projet){
    this.todoservice.addTodo(todo);
    this.router.navigate(['todos']);
  }
}
