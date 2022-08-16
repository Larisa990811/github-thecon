import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddFormComponent } from "./add-form/add-form.component";
import { EditFormComponent } from "./edit-form/edit-form.component";
import { PetInfoComponent } from "./pet-info/pet-info.component";
import { PetsListComponent } from "./pets-list/pets-list.component";

const appRoutes: Routes = [
{ path: '', redirectTo: '/pets-list', pathMatch: 'full'},
{ path: 'pets-list', component: PetsListComponent, children: [
    { path: '', component: PetsListComponent},
    { path: ':id', component: PetInfoComponent},
]},
{ path: 'add', component: AddFormComponent},
{ path: 'info', component: PetInfoComponent },
{ path: 'edit', component: EditFormComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {


}