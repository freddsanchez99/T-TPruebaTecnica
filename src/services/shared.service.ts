// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private departamentoSeleccionadoSource = new BehaviorSubject<string>('');
  departamentoSeleccionado$ = this.departamentoSeleccionadoSource.asObservable();

  private cargoSeleccionadoSource = new BehaviorSubject<string>('');
  cargoSeleccionado$ = this.cargoSeleccionadoSource.asObservable();

  actualizarDepartamentoSeleccionado(departamento: string): void {
    this.departamentoSeleccionadoSource.next(departamento);
    console.log("departamento enviado a  usercomponent");
  }

  actualizarCargoSeleccionado(cargo: string): void {
    this.cargoSeleccionadoSource.next(cargo);
    console.log("cargo enviado a  usercomponent");
  }
}

