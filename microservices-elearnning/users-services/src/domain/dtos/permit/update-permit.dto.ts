import { Validators } from "../../../config";

export class UpdatePermitDto {
  private constructor(
    public per_code: string,
    public per_role: string,
    public per_module: string,
    public per_read: boolean,
    public per_write: boolean,
    public per_update: boolean,
    public per_delete: boolean,
    public per_creator_user: string
  ) {}

  static create(object: { [key: string]: any },per_code:string): [string?, UpdatePermitDto?] {
    const {
      per_role,
      per_module,
      per_read,
      per_write,
      per_update,
      per_delete,
      per_creator_user,
    } = object;
    let per_readBoolean = per_read;
    let per_writeBoolean = per_write;
    let per_updateBoolean = per_update;
    let per_deleteBoolean = per_delete;

    if (!per_code) return ["Missin permit ID"];
    if (!Validators.isUUID(per_code)) return ["Invalid permit ID"];

    if (!per_role) return ["Missin role"];
    if (!Validators.isUUID(per_role)) return ["Invalid role ID"];

    if (!per_module) return ["Missin module"];
    if (!Validators.isUUID(per_module)) return ["Invalid module ID"];

    if (!per_creator_user) return ["Missin creator user"];
    if (!Validators.isUUID(per_creator_user)) return ["Invalid user ID"];

    if (typeof per_read !== "boolean") {
      per_readBoolean = per_read === "true";
    }
    if (typeof per_read !== "boolean") {
      per_writeBoolean = per_write === "true";
    }
    if (typeof per_read !== "boolean") {
      per_updateBoolean = per_update === "true";
    }
    if (typeof per_read !== "boolean") {
      per_deleteBoolean = per_delete === "true";
    }

    return [
      undefined,
      new UpdatePermitDto(
        per_code,
        per_role,
        per_module,
        per_readBoolean,
        per_writeBoolean,
        per_updateBoolean,
        per_deleteBoolean,
        per_creator_user
      ),
    ];
  }
}
