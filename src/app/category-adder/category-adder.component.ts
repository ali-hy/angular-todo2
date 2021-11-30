import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../tasks.service';

export class myErorStateMatcher implements ErrorStateMatcher{
  isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    // let isSubmitted = form && form.submitted;
    return (control && control.invalid && control.dirty)
  }

}

@Component({
  selector: 'app-category-adder',
  templateUrl: './category-adder.component.html',
  styleUrls: ['./category-adder.component.css']
})
export class CategoryAdderComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CategoryAdderComponent>, private taskService: TasksService) {}
  
  ngOnInit(){
    
  }
  
  get catTitle() {return this.catFormControl.value}
  catFormControl = new FormControl('', Validators.required);
  matcher = new myErorStateMatcher();
  
  submit(){
    if(this.catTitle.trim().length > 0) {this.dialogRef.close();
    this.taskService.addCategory(this.catTitle.trim());}
  }

  clickAdd(e){
    document.getElementById("add-category-btn")?.click();
  }

}