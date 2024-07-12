import { Validators } from "../../../config";
import { Permit } from "../../../data";

export class CreatePermitDto {
  private constructor(
    public per_role: string,
    public permits: Permit[],
    public per_creator_user: string
  ) { }

  static create(object: { [key: string]: any }): [string?, CreatePermitDto?] {
    const {
      per_role,
      permits,
      per_creator_user,
    } = object;

    
    for (const element of permits) {
      if (!element.per_role) return ["Missin role"];
      if (!Validators.isUUID(element.per_role)) return ["Invalid role ID"];

      if (!element.per_module) return ["Missing module"];
      if (!Validators.isUUID(element.per_module)) return ["Invalid module ID"];
      
      if (typeof element.per_read !== 'boolean') return ["Invalid read permission"];
      if (typeof element.per_write !== 'boolean') return ["Invalid write permission"];
      if (typeof element.per_update !== 'boolean') return ["Invalid update permission"];
      if (typeof element.per_delete !== 'boolean') return ["Invalid delete permission"];

      element.per_creator_user = per_creator_user;

      if (!per_creator_user) return ["Missin creator user"];
      if (!Validators.isUUID(per_creator_user)) return ["Invalid user ID"];
    }


    return [
      undefined,
      new CreatePermitDto(
        per_role,
        permits,
        per_creator_user
      ),
    ];
  }
}
