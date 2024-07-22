export default class UserDto {
    constructor(user){
        this.Nombre = user.Nombre,
        this.Apellido = user.Apellido,
        this.email = user.email,
        this.password = user.password,
        this.role = user.role
    }

}


