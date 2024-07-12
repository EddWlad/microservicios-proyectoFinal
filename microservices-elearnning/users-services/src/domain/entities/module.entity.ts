import { CustomError } from "../errors/custom.error";

export class ModuleEntity {

    constructor(
        public mod_code: string,
        public mod_title: string,
        public mod_description: string,
        public mod_status: boolean,
        public mod_creator_user: String,
    ){}
    static fromObject(object: { [key: string]: any }) {
        const {
            mod_code,
            mod_title,
            mod_description,
            mod_status,
            mod_creator_user,
           } = object;

           if (!mod_code) throw CustomError.badRequest("Missing id");
           if (!mod_title) throw CustomError.badRequest("Missing title");

           if (!mod_status) throw CustomError.badRequest("Missing status");
           if (!mod_creator_user) throw CustomError.badRequest("Missing user creator");

           return new ModuleEntity(
            mod_code,
            mod_title,
            mod_description,
            mod_status,
            mod_creator_user,
           );
    }
}