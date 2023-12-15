import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ICollaborator } from "src/app/interfaces/user.interface";
import { CollaboratorService } from "src/app/services/collaborator.service";
import { ToastrService } from "ngx-toastr";

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
    this.update_id = this.activated_route.snapshot.params["id"];
    this.buildForm();
    if (this.update_id) {
      this.getCollaborator(this.update_id);
    }
  }

  ngOnInit() {}

  setImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.collaborator.photo = e.target.result;
        this.photo = file;
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

  submitForm() {
    this.setForm();
    this.update_id
      ? this.updateCollaborator(this.update_id)
      : this.createCollaborator();
  }

  setForm() {
    if (this.update_id) {
      this.formData.append("_method", "PUT");
    }
    if (this.photo) {
      this.formData.append("photo", this.photo);
    }
    this.formData.append("name", this.form.get("name").value);
    this.formData.append("last_name1", this.form.get("last_name1").value);
    this.formData.append("last_name2", this.form.get("last_name2").value);
    this.formData.append("company", this.form.get("company").value);
    this.formData.append("area", this.form.get("area").value);
    this.formData.append("department", this.form.get("department").value);
    this.formData.append("position", this.form.get("position").value);
    this.formData.append("status", this.form.get("status").value);
  }
  createCollaborator(): void {
    if (this.form.valid) {
      this.setForm();

      this.collaborator_service.createCollaborator(this.formData).subscribe({
        next: (res: any) => {
          this.router.navigate(["/table"]);
          this.toastr.success("", "Colaborador creado", {
            positionClass: "toast-bottom-center",
          });
        },
        error: (err) => {
          this.toastr.error(err.message, "Error creando colaborador", {
            positionClass: "toast-bottom-center",
          });
        },
      });
    }
  }

  updateCollaborator(id: number): void {
    if (this.form.valid) {
      this.collaborator_service.updateCollaborator(id, this.formData).subscribe({
          next: (res: any) => {
            this.router.navigate(["/table"]);
            this.toastr.success("", "Colaborador actualizado", {
              positionClass: "toast-bottom-center",
            });
          },
          error: (err) => {
            this.toastr.error(err.message, "Error actualizando colaborador", {
              positionClass: "toast-bottom-center",
            });
          },
        });
    }
  }

  getCollaborator(id: number): void {
    this.collaborator_service.getCollaborator(id).subscribe({
      next: (res: any) => {
        this.collaborator = res.employee;
        this.updateFormValues();
      },
      error: (err) => {
        this.toastr.error(
          err.message,
          "Error obteniendo datos de colaborador",
          {
            positionClass: "toast-bottom-center",
          }
        );
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
      status: this.collaborator.status,
    });
  }
}
