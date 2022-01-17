import { Address } from "./adress.model";

export class User{
  constructor(public firstname: string,
              public lastname: string,
              public email:string,
              public description: string,
              public dateBirth: string,
              public adress?: Address,
              public aliases?: string[],


    ){

  }
}
