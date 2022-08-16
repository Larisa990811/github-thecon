import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";


@Injectable({providedIn: 'root'})
export class PetService{
    loadedPosts: Post[] = [];
    selectedValue: string = 'available';
    //Interaction Info
    private petInfo = new BehaviorSubject<{id: number, name: string, status: string}>(null);
    //Expose the subject as an observable
    public share = this.petInfo.asObservable();

    constructor(private http: HttpClient, private router: Router){}

    ngOnInit() {
    }

    sendPetInfo(message){
        this.petInfo.next(message);
    }

    createAndStorePost(
        id: number,
        name: string,
        status: string,) {
        const postData =  {
            id: id, 
            name: name,
            status:status   
        };
        // Send Http request
        const url = 'https://petstore.swagger.io/v2/pet';
        return this.http.post(url, postData);
    }

    fetchPosts(selectedValue) {
        return this.http
        .get<{[key:string]: Post }>('https://petstore.swagger.io/v2/pet/findByStatus?status='+selectedValue)
        .pipe(
          map((responseData)=>{
          const postsArray: Post[] = [];
          for (const key in responseData){
            if (responseData.hasOwnProperty(key)){
              postsArray.push({...responseData[key], newId: key})
            }
          }
        return postsArray
        }));
    }

    editPost(data: {id: number, name: string, status: string }){ 
        return this.http.put('https://petstore.swagger.io/v2/pet', data);
    }

    deletePost(selectedId){
        return this.http.delete('https://petstore.swagger.io/v2/pet/' + selectedId)
    }
}