
export class Departamento {
  id: number = 0;
  idUsuarioCreacion: number = 0;
  codigo: string = "";
  nombre: string = "";
  activo: boolean = false;
  users?: string[] = [];
}

export class Cargo {
  id: number = 0;
  idUsuarioCreacion: number = 0;
  codigo: string = "";
  nombre: string = "";
  activo: boolean = false;
  users?: string[] = [];
}

export class User {
  id: number = 0;
  usuario: string = "";
  primerNombre: string = "";
  segundoNombre?: string | null = "";
  primerApellido: string = "";
  segundoApellido?: string | null = "";
  departamento: Departamento = new Departamento();
  cargo: Cargo = new Cargo();
  idDepartamento: number = 0;
  idCargo: number = 0;
  isEditing?: boolean = false;
}
