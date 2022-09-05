import { Injectable } from '@angular/core';
import { Observable, of, Subject,merge } from 'rxjs';
import { delay, filter, map, scan, startWith, switchMap, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task, mock_categories, category_type } from './task';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CategoryRemoverComponent } from './category-remover/category-remover.component';

const commands$ = new Subject();

var lastId:number = localStorage.getItem("LastId") == null ? 0 : JSON.parse(<any>localStorage.getItem("LastId"));

const tasksReducer = (todos: any, action: any) => {
  let index:any;
  switch(action.type){
    case "toggle":
      index = todos.findIndex((todo:any) => todo.id == action.payload);
      todos[index].completed = !todos[index].completed;
      localStorage.setItem("Tasks", JSON.stringify(todos));
      return [...todos];
    case "add":
      console.log("adding", action.payload);
      todos.push({...action.payload, id: ++lastId} as Task);
      localStorage.setItem("LastId", JSON.stringify(lastId));
      localStorage.setItem("Tasks", JSON.stringify(todos));
      return[...todos]
    case "delete":
      index = todos.findIndex((todo:any) => todo.id == action.payload);
      todos.splice(index,1);
      localStorage.setItem("Tasks", JSON.stringify(todos));
      return[...todos];
    case "filterCategory":
      todos = todos.filter(todo => todo.category !== undefined && todo.category.id != action.payload);
      localStorage.setItem("Tasks", JSON.stringify(todos));
      return[...todos];
    case "refresh":
      return[...todos];
    default: return todos;
  }
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient, private dialog: MatDialog) {
  }

  private tasksUrl = 'https://60d8582ca376360017f45fe2.mockapi.io/todos';
  apiTasks$  = this.http.get(this.tasksUrl);
  localTasks$ = of(this.loadTasks());

  taskSource$: Observable<any> = this.localTasks$.pipe(
    switchMap((todos:any) => {
      let tasks = todos != null ? this.localTasks$ : this.apiTasks$;
      return tasks;
    } ),
    tap((todos:any) => {lastId = lastId ? lastId : <number>todos[todos.length - 1].id;})
  );
  tasks$ = merge(this.taskSource$, commands$).pipe(
    scan(tasksReducer),
  );
  ftasks$ = this.tasks$.pipe(
    map((todos) => todos.filter((task:any) =>{
      console.log(task.category);
      
      return (this.showCompleted || !task.completed) && 
      (this.select_all || task.category!==undefined && this.selectedCategory.id == 
        task.category.id)})),
    tap((v)=>{console.log(v);
    })
  )

  remaining$ = this.tasks$.pipe(
    map((todos:any) => todos.filter((todo:any) => !todo.completed).length)
  )

  loadTasks(){
    let savedData= JSON.parse(<string>localStorage.getItem("Tasks"));
    return savedData;
  }
  loadCategories(){
    let savedData = JSON.parse(localStorage.getItem("Categories"));
    return savedData;
  }

  showCompleted = false;

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    commands$.next({type: "refresh"});
  }

  categoriesList = (this.loadCategories() != null ? this.loadCategories() : mock_categories);
  getCategories(){
    return this.categoriesList;
  }

  lastCategoryId:number = JSON.parse(localStorage.getItem("LastCategoryId")) != null ? JSON.parse(localStorage.getItem("LastCategoryId")) : Math.max(...this.categoriesList.map(i => i.id));
  selectedCategory = {id: -1} as category_type;
  get select_all() {return this.selectedCategory.id < 0;} 
  
  getSelectedCategory(){
    return this.selectedCategory;
  }

  toggleCompleted(id: number) {
    commands$.next({type: "toggle", payload: id});
  }
  addTask(task){
    console.log('selected Category:',  this.selectedCategory);
    
    commands$.next({type: "add", payload: {...task, category:this.selectedCategory}});
  }
  deleteTask(id: any){
    commands$.next({type: "delete", payload: id})
  }

  selectCategory(cat){
    this.selectedCategory = cat<0 ? {id:cat} as category_type :this.categoriesList.find(c=>c.id==cat);
    commands$.next({type:'refresh'});
  }

  addCategory(catTitle){
    this.categoriesList.push({id: ++this.lastCategoryId, cat_name: catTitle});
    localStorage.setItem("LastCategoryId", String(this.lastCategoryId));
    localStorage.setItem("Categories", JSON.stringify(this.categoriesList));
  }

  categorytoremove:any;
  getCategorytoremove(){
    return this.categorytoremove;
  }

  remCategoryRef:MatDialogRef<CategoryRemoverComponent>;
  promptRemoveCategory(cat){
    this.categorytoremove = this.categoriesList.find(c=>c.id==cat);
    this.remCategoryRef = this.dialog.open(CategoryRemoverComponent);
  }

  removeCategory(catid, removeTodos:boolean){
    this.remCategoryRef.close();
    if(removeTodos){
      commands$.next({type:"filterCategory", payload:catid});
    }
    document.getElementById("all-btn").click();
    this.categoriesList.splice(this.categoriesList.findIndex(c => c.id == catid), 1);
    localStorage.setItem("Categories", JSON.stringify(this.categoriesList)); 
  }
}
  