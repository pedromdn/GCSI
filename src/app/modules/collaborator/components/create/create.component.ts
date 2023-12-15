import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICollaborator } from 'src/app/interfaces/user.interface';
import { CollaboratorService } from 'src/app/services/collaborator.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  collaborator = <ICollaborator>{};
  formData = new FormData();
  photo: any;
  statusOptions = [
    { id: 1, name: "Activo" },
    { id: 0, name: "Inactivo" },
  ];
  update_id: any;

  constructor(
    private fb: FormBuilder,
    private collaborator_service: CollaboratorService,
    private router: Router,
    private activated_route: ActivatedRoute,
    private toastr: ToastrService

  ) {
    this.update_id = this.activated_route.snapshot.params['id'];
    this.buildForm();
    console.log(this.update_id);
    if(this.update_id){
      this.getCollaborator(this.update_id)
    }
    
  }

  ngOnInit() {
   
  }
  deleteImage(img: any) {}

  setImage(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.collaborator.photo =  e.target.result;
        this.photo = file;
        // this.form.get("photo").setValue(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.max(50)]],
      last_name1: [null, [Validators.required, Validators.max(50)]],
      last_name2: [null, [Validators.required, Validators.max(50)]],
      company: [null, [Validators.required, Validators.max(100)]],
      area: [null, [Validators.required, Validators.max(100)]],
      department: [null, [Validators.required, Validators.max(100)]],
      position: [null, [Validators.required, Validators.max(100)]],
      photo: [null, []],
      status: [1, [Validators.required]],
    });
  }

  // setForm() {
  //   this.collaborator = {
  //     name: this.form.get("name").value,
  //     last_name1: this.form.get("last_name1").value,
  //     last_name2: this.form.get("last_name2").value,
  //     company: this.form.get("company").value,
  //     area: this.form.get("area").value,
  //     department: this.form.get("department").value,
  //     position: this.form.get("position").value,
  //     photo: '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'
  //     ,status: this.form.get("status").value,
  //   };
  // }

  submitForm() {
      // this.setForm();
      if(this.update_id){
        this.updateCollaborator(this.update_id);
      }else{
        this.createCollaborator();
      }
    
  }

  // createCollaborator(): void {
  //   console.log(this.collaborator);
    
  //   if(this.form.valid){
  //     this.collaborator_service.createCollaborator(this.collaborator).subscribe({
  //       next: (res: any) => {
  //         this.router.navigate(['/table'])
  //         this.toastr.success('', 'Colaborador creado',{
  //           positionClass:'toast-bottom-center'
  //         });
  //       },
  //       error: (err) => {
  //         this.toastr.error( err.message,'Error creando colaborador',{
  //           positionClass:'toast-bottom-center'
  //         }); 
  //       },
  //     });
  //   }
    
  // }
  setForm(){
    if(this.update_id){
      this.formData.append('_method', 'PUT');
    }
    if (this.photo) {
      this.formData.append('photo', this.photo);
    }
      this.formData.append('name', this.form.get('name').value);
      this.formData.append('last_name1', this.form.get('last_name1').value);
      this.formData.append('last_name2', this.form.get('last_name2').value);
      this.formData.append('company', this.form.get('company').value);
      this.formData.append('area', this.form.get('area').value);
      this.formData.append('department', this.form.get('department').value);
      this.formData.append('position', this.form.get('position').value);
      this.formData.append('status', this.form.get('status').value);
      
      
  }
  createCollaborator(): void {
    if (this.form.valid) {
      this.setForm();
  
      this.collaborator_service.createCollaborator(this.formData).subscribe({
        next: (res: any) => {
          this.router.navigate(['/table'])
          this.toastr.success('', 'Colaborador creado', {
            positionClass: 'toast-bottom-center'
          });
        },
        error: (err) => {
          this.toastr.error(err.message, 'Error creando colaborador', {
            positionClass: 'toast-bottom-center'
          });
        },
      });
    }
  }

  updateCollaborator(id: number): void {
    if(this.form.valid){
      this.setForm();
      this.collaborator_service.updateCollaborator(id, this.formData).subscribe({
        next: (res: any) => {
          this.router.navigate(['/table']);
          this.toastr.success('', 'Colaborador actualizado',{
            positionClass:'toast-bottom-center'
          });
        },
        error: (err) => {
          this.toastr.error( err.message,'Error actualizando colaborador',{
            positionClass:'toast-bottom-center'
          }); 
        },
      });
    }
  }

  getCollaborator(id: number): void {
    this.collaborator_service.getCollaborator(id).subscribe({
      next: (res: any) => {        
        this.collaborator = res.employee;
        console.log('>>>>',this.collaborator);
        
        this.updateFormValues();
      },
      error: (err) => {
        this.toastr.error( err.message,'Error obteniendo datos de colaborador',{
          positionClass:'toast-bottom-center'
        }); 
      },
    });
  }

  updateFormValues() {
    this.form.patchValue({
      name: this.collaborator.name,
      last_name1: this.collaborator.last_name1,
      last_name2: this.collaborator.last_name2,
      company: this.collaborator.company,
      area: this.collaborator.area,
      department: this.collaborator.department,
      position: this.collaborator.position,
      // photo: this.collaborator.photo,
      status: this.collaborator.status,
      
    });
    // if (this.collaborator.photo) {
    //   this.form.patchValue({
    //     photo: this.collaborator.photo,
    //   });
    // }
}
}
