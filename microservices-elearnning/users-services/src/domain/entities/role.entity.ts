import { CustomError } from "../errors/custom.error";

export class RoleEntity {

    constructor(
        public rol_code: string,
        public rol_name: string,
        public rol_description: string,
        public rol_status: boolean,
        public rol_creator_user: string,
    ){}
    static fromObject(object: { [key: string]: any }) {
        const {
            rol_code,
            rol_name,
            rol_description,
            rol_status,
            rol_creator_user,
           } = object;

           if (!rol_code) throw CustomError.badRequest("Missing id");
           if (!rol_name) throw CustomError.badRequest("Missing name");

           if (!rol_status) throw CustomError.badRequest("Missing status");

           return new RoleEntity(
            rol_code,
            rol_name,
            rol_description,
            rol_status,
            rol_creator_user,
           );
    }
}