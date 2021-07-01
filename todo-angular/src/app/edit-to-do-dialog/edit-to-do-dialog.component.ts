import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'edit-to-do-dialog',
  templateUrl: './edit-to-do-dialog.component.html',
  styleUrls: ['./edit-to-do-dialog.component.scss']
})
export class EditToDoDialogComponent implements OnInit {

  showValidationErrors: boolean = false

  constructor(public dialogRef: MatDialogRef<EditToDoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return //this.showValidationErrors = true
    } else {
      //this.showValidationErrors = false
      const updateToDo = {
        ...this.todo,
        ...form.value
      }
      this.dialogRef.close(updateToDo)
    }
  }
}
