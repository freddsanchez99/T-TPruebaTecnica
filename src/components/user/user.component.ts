import {Component, Input, SimpleChanges} from '@angular/core';
import {User} from './user.class'
import { SharedService } from 'src/services/shared.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { ChangeDetectorRef } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

var ELEMENT_DATA: User[] = [];

@Component({
  selector: 'user-component',
  styleUrls: ['user.component.css'],
  templateUrl: 'user.component.html',
})
export class UserComponent {
  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'departamento', 'cargo', 'acciones'];
  dataSource = ELEMENT_DATA;
  departamentoSeleccionado = "";
  cargoSeleccionado = "";
  usuariosDelDepartamento: User[] = [];
  usuariosPorCargo: User [] = [];


  constructor(private userService: UserService, private sharedService: SharedService
            , private dialog: MatDialog, private cdr: ChangeDetectorRef) { 
    this.sharedService.departamentoSeleccionado$.subscribe(departamento => {
      this.departamentoSeleccionado = departamento;
      console.log("Se recibe:", this.departamentoSeleccionado);
      this.cargarUsuariosPorDepartamento(this.departamentoSeleccionado);
    });

    this.sharedService.cargoSeleccionado$.subscribe(cargo => {
      this.cargoSeleccionado = cargo;
      console.log("Se recibe:", this.cargoSeleccionado);
      this.cargarUsuariosPorCargo(this.cargoSeleccionado);
    });
    
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
    
  }

  obtenerUsuarios(): void {
    this.userService.obtenerUsuarios()
      .subscribe(
        usuarios => {
          console.log(usuarios);
          this.dataSource = usuarios;
        },
        error => {
          console.error('Error al obtener usuarios:', error);
        }
      );
  }

  eliminarUsuario(usuario: string) {
    this.userService.eliminarUsuario(usuario).subscribe(
      () => {
        console.log(`Usuario ${usuario} eliminado exitosamente.`);
        window.location.reload();
      },
      error => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  cargarUsuariosPorDepartamento(departamento: string): void {
    console.log(departamento);
    if (departamento) {
      this.userService.getUsuariosByDepartamento(departamento).subscribe(
        (usuarios: any[]) => {
          this.usuariosDelDepartamento = usuarios;
          console.log(this.usuariosDelDepartamento);
          this.dataSource = this.usuariosDelDepartamento;
          this.cdr.detectChanges();
        },
        error => {
          console.error('Error al cargar usuarios:', error);
        }
      );
    } else {
      this.usuariosDelDepartamento = [];
    }
  }

  cargarUsuariosPorCargo(cargo: string): void {
    console.log(cargo);
    if (cargo) {
      this.userService.getUsuariosByCargo(cargo).subscribe(
        (usuarios: any[]) => {
          this.usuariosPorCargo = usuarios;
          console.log(this.usuariosPorCargo);
          this.dataSource = this.usuariosPorCargo;
          this.cdr.detectChanges();
        },
        error => {
          console.error('Error al cargar usuarios:', error);
        }
      );
    } else {
      this.usuariosPorCargo = [];
    }
  }

  openDialog(item?: any, isEditing?: boolean): void {
    if (isEditing != null && isEditing){
      item.isEditing = isEditing;
      console.log("is editing: ",item.isEditing)
    }
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '500px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo fue cerrado');
    });
  }
}
