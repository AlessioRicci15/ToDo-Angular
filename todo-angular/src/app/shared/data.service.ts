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
          })
        )
      });
    };
    init();
  }

  getAllTodos() {
    return this.todos
  }

  toggleCompleted(index: number, todo: Todo) {
    const tog = async () => {
      const data = {
        title: todo.text,
        completed: todo.completed
      };
      fetch(this.url + (index + 1), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    };
    tog();
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
    if (this.newOne) {
      const add = async () => {
        const data = {
          title: todo.text,
          completed: todo.completed
        };
        fetch(this.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
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
      fetch(this.url + (index + 1), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    };
    edi();
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
                  fetch(this.url + element.id, {
                    method: 'DELETE',
                  })
                };
                del();
              }
            })
          ).then((result) => {
            idtodos.shift()
            idtodos.forEach(element => {
              const idadd = async () => {
                const data = {
                  title: element.text,
                  completed: element.completed
                };
                fetch(this.url, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
              };
              idadd();
            })
          }
          )
        });
      };
      ediID();

    }
  }

  deleteTodo(index: number) {
    this.updateIndexes(index);
    this.todos.splice(index, 1)
    const del = async () => {
      fetch(this.url + (index + 1), {
        method: 'DELETE',
      })
    };
    del();
  }
}
