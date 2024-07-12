import { Validators } from "../../../config";

export class UpdateModuleDto {
  private constructor(
    public mod_code: string,
    public mod_title: string,
    public mod_description: string,
    public mod_status: boolean,
    public mod_creator_user: string
  ) {}

  static create(object: { [key: string]: any },mod_code:string): [string?, UpdateModuleDto?] {
    const { mod_title, mod_description, mod_status, mod_creator_user } = object;
    let mod_statusBoolean = mod_status;

    if (!mod_code) return ["Missin module ID"];
    if (!Validators.isUUID(mod_code)) return ["Invalid module ID"];

    if (!mod_title) return ["Missin name"];
    if (!mod_status) return ["Missin status"];

    if (!mod_status) return ["Missin status"];
    if (typeof mod_status !== "boolean") {
      mod_statusBoolean = mod_status === "true";
    }

    return [
      undefined,
      new UpdateModuleDto(
        mod_code,
        mod_title,
        mod_description,
        mod_statusBoolean,
        mod_creator_user
      ),
    ];
  }
}
