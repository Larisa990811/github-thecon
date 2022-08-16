
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../post.model';
import { Router } from '@angular/router';
import { PetService } from '../pet.service';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  pet: Post;
  petInfo: {id: number, name: string, status: string };
  backIcon = faArrowLeftLong;
  loadedPets: Post[] = [];
  selectedValue: string = 'available';

  constructor(
    private petService: PetService, 
    private router: Router, 
    private toast: NgToastService) {
  }

  ngOnInit(){
    this.petService.share
    .subscribe(x => {
      this.petInfo = x;
      console.log(this.petInfo);
    });
    this.petService.fetchPosts(this.selectedValue).subscribe(posts => {
      this.loadedPets = posts;
    });  
  }

  onEditPost(form: NgForm){ 
    this.petService.editPost({id: form.value.id, name: form.value.name, status: form.value.status})
    .subscribe((result)=>{
      this.router.navigate(['pets-list']);
      this.ngOnInit();
      this.toast.success({detail: "Success", summary: "Pet was edited successfully!", duration: 5000});
      console.log(result);
    }, error =>{
      this.toast.error({detail: "Error", summary: "Something went wrong!", duration: 5000});
    });
  }

  onCancel(){
    this.router.navigate(['pets-list']);
  }
}
