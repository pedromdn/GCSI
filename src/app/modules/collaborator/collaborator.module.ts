import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorComponent } from './collaborator.component';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { CreateComponent } from './components/create/create.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [CollaboratorComponent,TableComponent,CreateComponent,EmptyStateComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: CollaboratorComponent,
        children: [
          { path: '', redirectTo: 'table', pathMatch: 'full' },
          { path: 'table', component: TableComponent },
          { path: 'create', component: CreateComponent },
        ],
      },
    ]),
  ]
})
export class CollaboratorModule { }
