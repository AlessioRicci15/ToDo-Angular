import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  todos: Todo[] = [];
  url: string = "http://localhost:3000/todo/"
  newOne: boolean = true

  constructor() {
    const init = async () => {
      await fetch(this.url, { method: "get" }).then(response => {
        response.json().then((result) =>
          result.forEach((element: any) => {
            this.newOne = false
            this.addTodo(new Todo(element.title, element.completed))
          }))});
    };
    init();
  }

  getAllTodos() {
    return this.todos
  }

  add(data: any) {
    fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  update(data: any, index: number) {
    fetch(this.url + index, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }

  delete(index: number) {
    fetch(this.url + index, {
      method: 'DELETE'
    })
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
    if (this.newOne) {
      const add = async () => {
        const data = {
          title: todo.text,
          completed: todo.completed
        };
        this.add(data)
      };
      add();
    }
    this.newOne = true
  }

  updateTodo(index: number, updatedTodo: Todo) {
    this.todos[index] = updatedTodo
    const edi = async () => {
      const data = {
        title: updatedTodo.text,
        completed: updatedTodo.completed
      };
      this.update(data, index);
    };
    edi();
  }

  toggleCompleted(index: number, todo: Todo) {
    const tog = async () => {
      const data = {
        title: todo.text,
        completed: todo.completed
      };
      this.update(data, index + 1);
    };
    tog();
  }

  deleteTodo(index: number) {
    const del = async () => {
      this.delete(index + 1)
    }
    del();
    this.updateIndexes(index);
    this.todos.splice(index, 1)
  }

  updateIndexes(index: number) {
    var idtodos: Todo[] = [];
    if (index < this.todos.length) {
      const ediID = async () => {
        await fetch(this.url, { method: "get" }).then(response => {
          response.json().then((result) =>
            result.forEach((element: any) => {
              if (element.id > index) {
                var todo = new Todo(element.title, element.completed)
                idtodos.push(todo)
                const del = async () => {
                  this.delete(element.id)
                };
                del();
              }})).then((result) => {
              idtodos.shift()
              idtodos.forEach(element => {
                const idadd = async () => {
                  const data = {
                    title: element.text,
                    completed: element.completed
                  };
                  this.add(data)
                };
                idadd();
              })})});};
      ediID();
    }
  }
}
