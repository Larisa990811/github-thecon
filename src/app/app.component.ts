import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { MatSelectChange } from '@angular/material/select';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export interface PeriodicElement {
  index: number;
  name: string;
  status: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {index: 1, name: 'Hydrogen', status: 'Available', action: 'H'},
  {index: 2, name: 'Helium', status: 'Available', action: 'He'},
  {index: 3, name: 'Lithium', status: 'Available', action: 'Li'},
  {index: 4, name: 'Beryllium', status: 'Available', action: 'Be'},
  {index: 5, name: 'Boron', status: 'Available', action: 'B'},
  {index: 6, name: 'Carbon', status: 'Available', action: 'C'},
  {index: 7, name: 'Nitrogen', status: 'Available', action: 'N'},
  {index: 8, name: 'Oxygen', status: 'Available', action: 'O'},
  {index: 9, name: 'Fluorine', status: 'Available', action: 'F'},
  {index: 10, name: 'Neon', status: 'Available', action: 'Ne'},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  displayedColumns: string[] = ['index', 'name', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  dd = new MatTableDataSource<any>(this.loadedPosts);
  //filter
  selectedValue: string = 'available';
  eyeIcon = faEye;
  penIcon  = faPen;
  trashIcon = faTrash;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

}
