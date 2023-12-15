import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './modules/collaborator/components/table/table.component';
import { CreateComponent } from './modules/collaborator/components/create/create.component';


const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full'},
  { path: 'table', component: TableComponent, },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: CreateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
