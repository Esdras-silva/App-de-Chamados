
export type userDTO = Object &{
    name:string;
    company:string;
    email:string;
    mode: 'user' | 'admin';

}