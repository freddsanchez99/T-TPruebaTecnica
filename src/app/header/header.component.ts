import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { DepartamentoService } from '../departamento.service';
import { CargoService } from '../cargo.service';
import { Cargo, Departamento } from '../user/user.class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cargos: Cargo[] = [];
  departamentos: Departamento[] = [];

  constructor(private departamentoService: DepartamentoService, private cargoService: CargoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerCargos();
    this.obtenerDepartamentos();
  }

  obtenerCargos(): void {
    this.cargoService.obtenerCargos().subscribe(
      cargos =>{
        this.cargos = cargos;
        console.log(this.cargos);
      } ,
      error => console.error('Error al obtener los cargos:', error)
    );
  }

  obtenerDepartamentos(): void {
    this.departamentoService.obtenerDepartamentos().subscribe(
      departamentos => {
        this.departamentos = departamentos
        console.log(this.departamentos);
      },
      error => console.error('Error al obtener los departamentos:', error)
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '500px',
      data: { /* Puedes pasar datos al dialogo aquí si es necesario */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo fue cerrado');
      // Aquí puedes realizar acciones después de que el dialogo se haya cerrado, si es necesario
    });
  }


}
