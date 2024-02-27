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

  eliminarUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  editarUsuario(id: number, usuario: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, usuario);
  }

}
