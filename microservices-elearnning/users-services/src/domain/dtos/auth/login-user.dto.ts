import { regularExps } from "../../../config";

export class LoginUserDto {

    private constructor(
        public userName: string,
        public password: string,

      ) {}

      static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
        const {
          userName,
          password,
        } = object;
    
        if (!userName) return ["Missin email"];
        if (!password) return ["Missin password"];
    
        return [
          undefined,
          new LoginUserDto(
            userName,
            password,
          ),
        ];
      }
}