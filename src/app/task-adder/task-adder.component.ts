import { Component, OnInit, HostListener } from '@angular/core';
import { Task, category_type } from '../task';
import { TasksService } from '../tasks.service';



@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.css']
})
export class TaskAdderComponent implements OnInit {
  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    
  }

  newTitle:string = "";
  
  addTask():void{
    if(this.newTitle.trim() == "") return;
    this.taskService.addTask({title: this.newTitle, creationDate: new Date()} as Task);
    this.newTitle = "";
  }

  clickAdd(event: Event){
    document.getElementById("add-task-btn")?.click();
  }
}
