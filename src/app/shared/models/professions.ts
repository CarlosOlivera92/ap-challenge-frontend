interface Company {
    id: number;
    company: string
}
export class Professions {
    id?:number
    description:string
    position:string
    since:Date
    until:Date
    usuario: { id: any; };
    company: any
}
