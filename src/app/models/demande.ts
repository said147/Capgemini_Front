import { Materiel } from "./materiel";

export class Demande {
  
    date!:Date;
    Allocation_motive!:string;
    materiel:Materiel[]=[];
   
}
