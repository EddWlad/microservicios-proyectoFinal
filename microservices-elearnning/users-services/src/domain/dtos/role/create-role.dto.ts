import { Validators } from "../../../config";

export class CreateRoleDto {
  private constructor(
    public rol_name: string,
    public rol_description: string,
    public rol_status: boolean,
    public rol_creator_user: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateRoleDto?] {
    const { rol_name, rol_description, rol_status, rol_creator_user} = object;
    let rol_statusBoolean = rol_status;
    if (!rol_name) return ["Missin name"];
    if (!rol_status) return ["Missin status"];
    if (typeof rol_status !== "boolean") {
      rol_statusBoolean = rol_status === "true";
    }

    return [
      undefined,
      new CreateRoleDto(
        rol_name,
        rol_description,
        rol_statusBoolean,
        rol_creator_user
      ),
    ];
  }
}
