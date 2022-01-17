import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Projet } from "../models/projet.model";

@Injectable()

export class TodoService{

  toDay=new Date();
  todos:Projet[]=[];
  todoslice:Projet[]=[];
  todoSubject = new Subject<Projet[]>();
constructor(private http: HttpClient){



     setTimeout(()=>{
      this.todos =[{
        todoName:"Projet1",
        todoStatus: true,
        image:"http://placeimg.com/300/300/tech",
        description: "Vous pouvez désormais naviguer de façon privée. Les autres utilisateurs de cet appareil ne verront pas votre activité. Toutefois, les téléchargements, les favoris et les éléments de la liste",
        isModif:false
      },
      {
        todoName:"Projet2",
        todoStatus: false,
        image:"http://placeimg.com/300/300/tech",
        description: "Vous pouvez désormais naviguer de façon privée. Les autres utilisateurs de cet appareil ne verront pas votre activité. Toutefois, les téléchargements, les favoris et les éléments de la liste",

        isModif:false
      },
      {
        todoName:"Projet3",
        todoStatus: true,
        image:"http://placeimg.com/300/300/tech",
        description: "Vous pouvez désormais naviguer de façon privée. Les autres utilisateurs de cet appareil ne verront pas votre activité. Toutefois, les téléchargements, les favoris et les éléments de la liste",

        isModif:false
      },
      {
        todoName:"Projet4",
        todoStatus: false,
        image:"http://placeimg.com/300/300/tech",
        description: "Vous pouvez désormais naviguer de façon privée. Les autres utilisateurs de cet appareil ne verront pas votre activité. Toutefois, les téléchargements, les favoris et les éléments de la liste",

        isModif:false
      },
    ];
       this.emitTodos();
     }, 3000)

}
onChangeStatus(i: number): void{

    this.todos[i].todoStatus=  ! this.todos[i].todoStatus
    this.emitTodos();

}
onChangeIsmodif(i: number): void{

    this.todos[i].isModif=  !this.todos[i].isModif
    this.emitTodos();


}
getTodo(index:number):any{


    if(this.todos[index]){

      return this.todos[index];
    }else{
      return false
    }


}
addTodo(todo: Projet){
  this.todos.push(todo)
  this.todoSubject.next(this.todos);

}
emitTodos(){
  this.todoSubject.next(this.todos);
  this.saveTodosFromServer();
}

saveTodosFromServer():void {
  this.http.put("https://todo-list-app-f317b-default-rtdb.firebaseio.com/todos.json", this.todos).subscribe(
    ()=>{
      console.log("donnes enregistres avec succes")
    },
    (error)=>{
      console.log("Erreur de sauvegarde:"+error)
    }
  )
}
getTodosfromServer():void{
  this.http.get<Projet[]>("https://todo-list-app-f317b-default-rtdb.firebaseio.com/todos.json")
  .subscribe(
    (todo)=>{
      this.todos = todo;
    }, (error)=>{
      console.log("erreur de recuperation des données: "+ error)
    },
    ()=>{
      console.log("reccuperation des données terminée")
    }
  )
}
}
