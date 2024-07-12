import { CustomError } from "../errors/custom.error";

export class PermitEntity {

    constructor(
        public per_code: string,
        public per_role: string,
        public per_module: string,
        public per_read: boolean,
        public per_write: boolean,
        public per_update: boolean,
        public per_delete: boolean,
        public per_creator_user: string,
    ){}
    static fromObject(object: { [key: string]: any }) {
        const {
            per_code,
            per_role,
            per_module,
            per_read,
            per_write,
            per_update,
            per_delete,
            per_creator_user,
           } = object;

           if (!per_code) throw CustomError.badRequest("Missing id");
           if (!per_role) throw CustomError.badRequest("Missing role");

           if (!per_module) throw CustomError.badRequest("Missing module");
           if (!per_creator_user) throw CustomError.badRequest("Missing user creator");

           return new PermitEntity(
            per_code,
            per_role,
            per_module,
            per_read,
            per_write,
            per_update,
            per_delete,
            per_creator_user,
           );
    }
}