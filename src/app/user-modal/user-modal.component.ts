import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { DepartamentoService } from '../departamento.service';
import { CargoService } from '../cargo.service';
import { Departamento, Cargo, User } from '../user/user.class';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {
  userForm: FormGroup;
  departments: Departamento[] = [];
  cargos: Cargo[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private departamentoService: DepartamentoService,
    private cargoService: CargoService,
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.userForm = this.fb.group({
      usuario: [data ? data.usuario : '', Validators.required],
      primerNombre: [data ? data.primerNombre : '', Validators.required],
      segundoNombre: [data ? data.segundoNombre : ''],
      primerApellido: [data ? data.primerApellido : '', Validators.required],
      segundoApellido: [data ? data.segundoApellido : ''],
      departamento: [data ? data.departamento : null, Validators.required],
      cargo: [data ? data.cargo : null, Validators.required]
    });

    // Obtener departamentos y cargos del servicio
    this.departamentoService.obtenerDepartamentos().subscribe(departments => this.departments = departments);
    this.cargoService.obtenerCargos().subscribe(cargos => this.cargos = cargos);
  }

  onSave(): void {
    if (this.userForm.valid) {
      const userData: User = {
        id: this.data ? this.data.id : 0,
        usuario: this.userForm.value.usuario,
        primerNombre: this.userForm.value.primerNombre,
        segundoNombre: this.userForm.value.segundoNombre,
        primerApellido: this.userForm.value.primerApellido,
        segundoApellido: this.userForm.value.segundoApellido,
        departamento: this.departments.find(dep => dep.id === this.userForm.value.departamento)!,
        cargo: this.cargos.find(cargo => cargo.id === this.userForm.value.cargo)!,
        idDepartamento: this.userForm.value.departamento,
        idCargo: this.userForm.value.cargo
      };

      // Lógica para guardar o actualizar el usuario en el servicio
      // this.userService.saveOrUpdateUser(userData).subscribe(...);
      if (this.data?.isEditing != null && this.data?.isEditing){
        this.userService.editarUsuario(this.data.id, this.data).subscribe(
          (response) => {
            console.log('Usuario actualizado:', response);
            // Aquí puedes agregar lógica adicional después de actualizar el usuario
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
          }
        );
      }else{
        this.userService.agregarUsuario(userData).subscribe(
          (response) => {
            console.log('Usuario creado:', response);
            window.location.reload();
          },
          (error) => {
            console.error('Error al crear usuario:', error);
          }
        );
      }
      this.dialogRef.close();

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

