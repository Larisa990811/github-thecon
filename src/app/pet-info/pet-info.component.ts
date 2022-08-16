import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetService } from '../pet.service';
import { Post } from '../post.model';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.css']
})
export class PetInfoComponent implements OnInit {
  pet: Post;
  petInfo: {id: number, name: string, status: string };
  backIcon = faArrowLeftLong;
  id: number;

  constructor(
    private petService: PetService, 
    private router: Router, 
    private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.petService.share
    .subscribe(x => {
      this.petInfo = x;
      console.log(this.petInfo);
    });
  }

  getBack(){
    this.router.navigate(['pets-list'])
  }
}
