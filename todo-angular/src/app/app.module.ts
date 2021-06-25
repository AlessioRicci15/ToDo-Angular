import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditToDoDialogComponent } from './edit-to-do-dialog/edit-to-do-dialog.component';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToolTipDirective } from './shared/tool-tip.directive';
import { TollTipSingletonDirective } from './shared/tool-tip-singleton.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    EditToDoDialogComponent,
    ToolTipDirective,
    TollTipSingletonDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
