import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditToDoDialogComponent } from '../edit-to-do-dialog/edit-to-do-dialog.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  todos: Todo[]
  showValidationErrors: boolean = false

  constructor(private dataService: DataService, private dialog: MatDialog) {
    this.todos = this.dataService.getAllTodos()
   }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm){
    if(form.invalid){
      return //this.showValidationErrors = true
    } else {
      this.dataService.addTodo(new Todo(form.value.text))
      //this.showValidationErrors = false
      form.reset()
    }
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed
  }

  editTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)

    let dialogRef = this.dialog.open(EditToDoDialogComponent, {
      width: '70%',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.dataService.updateTodo(index, result)
      }
  })
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.dataService.deleteTodo(index)
  }
}
