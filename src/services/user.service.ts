import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7139/api/Usuarios';


  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  eliminarUsuario(usuario: string): Observable<any> {
    const url = `${this.apiUrl}/${usuario}`;
    return this.http.delete(url);
  }

  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  editarUsuario(usuario: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.put(url, usuario);
  }

  getUsuariosByDepartamento(codigoDepartamento: string): Observable<any[]> {
    const url = `${this.apiUrl}/ByDepartamento/${codigoDepartamento}`;
    return this.http.get<any[]>(url);
  }

  getUsuariosByCargo(codigoCargo: string): Observable<any[]> {
    const url = `${this.apiUrl}/ByCargo/${codigoCargo}`;
    return this.http.get<any[]>(url);
  }

}
