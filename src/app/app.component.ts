import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks$ = this.taskService.ftasks$;
  constructor(private taskService: TasksService) {
  }

}
