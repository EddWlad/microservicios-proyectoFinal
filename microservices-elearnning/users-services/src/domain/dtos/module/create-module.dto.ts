import { Validators } from "../../../config";

export class CreateModuleDto {
  private constructor(
    public mod_title: string,
    public mod_description: string,
    public mod_status: boolean,
    public mod_creator_user: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateModuleDto?] {
    const { mod_title, mod_description, mod_status, mod_creator_user } = object;

    if (!mod_title) return ["Missin name"];
    if (!mod_status) return ["Missin status"];
    
    if (!mod_creator_user) return ["Missin creator user"];
    if (!Validators.isUUID(mod_creator_user)) return ["Invalid user ID"];

    return [
      undefined,
      new CreateModuleDto(
        mod_title,
        mod_description,
        mod_status,
        mod_creator_user
      ),
    ];
  }
}
