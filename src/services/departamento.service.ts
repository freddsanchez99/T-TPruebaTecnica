import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'https://localhost:7139/api/Departamentos';

  constructor(private http: HttpClient) { }

  obtenerDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
