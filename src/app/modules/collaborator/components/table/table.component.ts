import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICollaborator } from 'src/app/interfaces/user.interface';
import { CollaboratorService } from 'src/app/services/collaborator.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  collaborators: ICollaborator[] = []

  constructor(private collaborator_service: CollaboratorService,
    private router: Router,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.getCollaborators();
  }

  getCollaborators(): void {
    this.collaborator_service.getCollaborators().subscribe({
      next: (res: any) => {        
        this.collaborators = res.employee;
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error obteniendo colaboradores', {
          positionClass:'toast-bottom-center'
        }); 
        
      },
    });
  }

  deleteCollaborator(id: number): void {
    this.collaborator_service.deleteCollaborator(id).subscribe({
      next: (res: any) => {
        this.getCollaborators();
        this.toastr.success('', 'Colaborador eliminado',{
          positionClass:'toast-bottom-center'
        });        
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error eliminando colaborador',{
          positionClass:'toast-bottom-center'
        }); 
        
      },
    });
  }

  updateCollaborator(id: number): void {
    this.router.navigate(['/create', id]);
  }

}
