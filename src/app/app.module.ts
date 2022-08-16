import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AddFormComponent } from './add-form/add-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { PetsListComponent } from './pets-list/pets-list.component';
import { PetInfoComponent } from './pet-info/pet-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent, 
    AddFormComponent, 
    EditFormComponent, 
    PetsListComponent, 
    PetInfoComponent],
  imports: [
    BrowserModule, 
    FormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressAnimation: 'decreasing',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgToastModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
