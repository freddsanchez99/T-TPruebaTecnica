import {Component} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {User} from './user.class'

import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

var ELEMENT_DATA: User[] = [];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'user-component',
  styleUrls: ['user.component.css'],
  templateUrl: 'user.component.html',
})
export class UserComponent {
  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'departamento', 'cargo', 'acciones'];
  dataSource = ELEMENT_DATA;


  constructor(private userService: UserService, private dialog: MatDialog) { }

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

  eliminarUsuario(id: number) {
    this.userService.eliminarUsuario(id).subscribe(
      () => {
        console.log(`Usuario con ID ${id} eliminado exitosamente.`);
        window.location.reload();
      },
      error => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  openDialog(item?: any, isEditing?: boolean): void {
    if (isEditing != null && isEditing){
      item.isEditing = isEditing;
    }
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '500px',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo fue cerrado');
      // Aquí puedes realizar acciones después de que el dialogo se haya cerrado, si es necesario
    });
  }
}
