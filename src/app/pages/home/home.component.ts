import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { Todo } from '../../models/todo.interface';
import { TodoResponse } from '../../models/response.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule,CommonModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
 

  displayedColumns: string[] = ['select', 'id', 'title', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Todo>([]);
  selection = new SelectionModel<Todo>(true, []);

  todos: Todo[] = [];
  total: number = 0;
  skip: number = 0;
  limit: number = 0;

  constructor(private api: ApiService) {}

  // ngOnInit(): void {
  //   this.api.fetchTodos().subscribe(
  //     (response: Todo[]) => {
        
  //       this.dataSource.data = this.todos; // Update MatTableDataSource with fetched todos
  //       console.log('Fetched todos:', this.todos);
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.api.fetchTodos().subscribe(
      (response: TodoResponse) => {
        this.todos = response.todos;
        this.total = response.total;
        this.skip = response.skip;
        this.limit = response.limit;
        this.dataSource.data = this.todos; // Update MatTableDataSource with fetched todos
        console.log('Fetched todos:', this.todos);
      },
      error => {
        console.error('Error fetching todos:', error);
      }
    );
  }




  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}