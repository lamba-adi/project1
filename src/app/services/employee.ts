export class Login{
    constructor(email : string,pswd : string){
        this.EmpEmail=email;
        this.EmpPassword=pswd;
    }
    EmpEmail: string;
    EmpPassword: string;
}