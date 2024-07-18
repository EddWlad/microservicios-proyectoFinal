import { Validators } from "../../../config";

export class UpdateRoleDto {
  private constructor(
    public rol_code: string,
    public rol_name: string,
    public rol_description: string,
    public rol_status: boolean
  ) {}

  static create(
    object: { [key: string]: any },
    rol_code: string
  ): [string?, UpdateRoleDto?] {
    const { rol_name, rol_description, rol_status } = object;
    let rol_statusBoolean = rol_status;

    if (!rol_code) return ["Missin Rol ID"];
    if (!Validators.isUUID(rol_code)) return ["Invalid user ID"];
    if (!rol_name) return ["Missin name"];

    if (!rol_status) return ["Missin status"];
    if (typeof rol_status !== "boolean") {
      rol_statusBoolean = rol_status === "true";
    }

    return [
      undefined,
      new UpdateRoleDto(rol_code, rol_name, rol_description, rol_statusBoolean),
    ];
  }
}
