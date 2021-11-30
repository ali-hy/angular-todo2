import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task, category_type, mock_categories } from '../task';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CategoryAdderComponent } from '../category-adder/category-adder.component';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  constructor(private taskService: TasksService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  get categoriesList() {
    return this.taskService.getCategories();
  }
  
  selectedCategory = this.taskService.getSelectedCategory();
  showCompleted = this.taskService.showCompleted;


  toggleShowCompleted(){
    this.taskService.toggleShowCompleted();
  }

  selectCategory(cat?: number){
    this.taskService.selectCategory(cat); 
    this.selectedCategory = this.taskService.getSelectedCategory();
  }

  addCategoryRef: MatDialogRef<CategoryAdderComponent>;
  
  openAddCategoryDialog(){
    this.addCategoryRef = this.dialog.open(CategoryAdderComponent);
  }

  promptRemoveCategory(catid){
    this.taskService.promptRemoveCategory(catid);
  }
  
}

