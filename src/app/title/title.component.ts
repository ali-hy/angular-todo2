import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../task';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit, OnChanges {

  @Input() tasks!: any[];

  remaining = 0;
  constructor(private taskService: TasksService) { }


  ngOnChanges(change: SimpleChanges) {
    this.remaining = this.tasks.filter(todo => !todo.completed).length
  }
  ngOnInit(): void {
  }
  remaining$ = this.taskService.remaining$;

}
