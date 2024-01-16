export class NewUser {
    nombre: string;
    apellido: string;
    nombreUsuario: string;
    email: string;
    password: string;
    telefono: number;
    birthday: Date;
    roles:string[];
    about:string;
    constructor(nombre: string, apellido: string ,nombreUsuario:string, email: string, password: string, telefono:number, birthday: Date, roles: string[], about:string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
        this.telefono = telefono;
        this.birthday = birthday;
        this.roles = roles;
        this.about = about;
    }
}
