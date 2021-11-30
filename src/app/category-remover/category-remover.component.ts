import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../tasks.service';

@Component({
  selector:"category-remover",
  templateUrl:'./category-remover.component.html',
  styleUrls:["./category-remover.component.css"]
})
export class CategoryRemoverComponent implements OnInit{
  constructor(private taskService: TasksService, private dialog: MatDialog){
  }
  ngOnInit(){
  }
  get categorytoremove(){return this.taskService.getCategorytoremove()}
  removeTodos=false;
  toggleRemoveTodos(){
    this.removeTodos=!this.removeTodos;
  }

  removeCategory(){
    this.taskService.removeCategory(this.categorytoremove.id, this.removeTodos); 
  }
}
