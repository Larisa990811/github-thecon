import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Post } from '../post.model';
import { faEye, faPen, faTrash, faPlus, faFilter, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { PetService } from '../pet.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'status', 'actions'];
  selectedValue: string = 'available';
  eyeIcon = faEye;
  penIcon  = faPen;
  trashIcon = faTrash;
  plusIcon = faPlus;
  filterIcon = faFilter;
  refreshIcon = faArrowsRotate;
  loadedPets: Post[] = [];
  closeResult: string = '';
  selectedId: string = '';
  selectedName: string = '';
  selectedStatus: string = '';
  displayStyle = "none";

  @ViewChild(MatSort) sort: MatSort;

  constructor( 
    private router: Router,
    private petService: PetService, 
    private toast: NgToastService) {}

  ngOnInit() {
    this.petService.fetchPosts(this.selectedValue).subscribe(posts => {
      this.loadedPets = posts;
    }, error =>{
      this.toast.error({detail: "Error", summary: "Data could not be loaded!", duration: 5000});
    });  
  }

  onFetchPosts() {
    // Send Http request
    this.petService.fetchPosts(this.selectedValue).subscribe(posts => {
      this.loadedPets = posts;
    }, error =>{
      this.toast.error({detail: "Error", summary: "Data could not be loaded!", duration: 5000});
    });
  }

  onClearPosts() {
    // Send Http request
    this.petService.deletePost(this.selectedId).subscribe((results) => {
      this.ngOnInit();
      this.toast.success({detail: "Success", summary: "Pet was deleted successfully!", duration: 5000});
      this.displayStyle = "none";
    }, error =>{
      this.toast.error({detail: "Error", summary: "Something went wrong!", duration: 5000});
    });
  }

  selectedRow(row){
    this.petService.sendPetInfo({
      id: this.selectedId = row.id ? row.id : 'no id information',
      name: this.selectedName = row.name ? row.name : 'no name information',
      status: this.selectedStatus = row.status ? row.status : 'no status information',
      selectedValue: this.selectedValue ? this.selectedValue : 'available'
    });
    // this.router.navigate(['info']);
  }

  onNewPet(){
    this.router.navigate(['add'])
  }

  openDeletePopup() {
    this.displayStyle = "block";
  }

  closeDeletePopup() {
    this.displayStyle = "none";
  }

  onDetails(pet: Post) {
  this.petService.sendPetInfo({
    id: pet.id ? pet.id : 'no id information',
    name: pet.name ? pet.name : 'no name information',
    status: pet.status ? pet.status : 'no status information',
    selectedValue: this.selectedValue ? this.selectedValue : 'available'
  });
  this.router.navigate(['info']);
  }

  onEdit(pet: Post) {
  this.petService.sendPetInfo({
    id: pet.id ? pet.id : 'no id information',
    name: pet.name ? pet.name : 'no name information',
    status: pet.status ? pet.status : 'no status information',
    selectedValue: this.selectedValue ? this.selectedValue : 'available'
  });
  this.router.navigate(['edit']);
  }

  onFilterPets(selectedFilterValue){
    this.selectedValue = selectedFilterValue;
    console.log(selectedFilterValue);
    this.petService.fetchPosts(this.selectedValue).subscribe(posts => {
      this.loadedPets = posts;
    }, error =>{
      this.toast.error({detail: "Error", summary: "Data could not be loaded!", duration: 5000});
    });  
  }

  // onRefresh(){
  //   this.ngOnInit();
  // }
}
