import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() tasks!:any;
  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
  }
  
  selectedCategory = this.taskService.selectedCategory;
  
  delete(index: number){
    this.taskService.deleteTask(index);
  }

  changeCompleted(id: number):void{
    this.taskService.toggleCompleted(id);
  }

}
