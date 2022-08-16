import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PetService } from '../pet.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  photoUrls: string[];
  tags: {id: number, name: string}[];
  loadedPets: Post[] = [];
  selectedValue: string = 'available';

  constructor(
    private router: Router, 
    private petService: PetService,
    private toast: NgToastService) {}


  ngOnInit() {
    this.petService.fetchPosts(this.selectedValue).subscribe(posts => {
      this.loadedPets = posts;
    }); 
  }
  
  onCreatePost(form: NgForm){ 
    this.petService.createAndStorePost(
      form.value.id, 
      form.value.name,
      form.value.status)
      .subscribe(responseData =>{
      console.log(responseData);
      this.router.navigate(['pets-list']);
      this.ngOnInit();
      this.toast.success({detail: "Success", summary: "Pet was added successfully!", duration: 5000});
    }, error =>{
      this.toast.error({detail: "Error", summary: "Something went wrong!", duration: 5000});
      });
  }

  onCancel(){
    this.router.navigate(['pets-list']);
  }

}
