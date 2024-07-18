import { Validators, regularExps } from "../../../config";

export class UpdateUserDto {
  private constructor(
    public use_code: string,
    public use_name: string,
    public use_lastname: string,
    public use_email: string,
    public use_nui: string,
    public use_password: string,
    public use_phone: string,
    public use_address: string,
    public use_status: number,
    public use_role: string,
    public use_img: string
  ) {}

  static create(
    object: { [key: string]: any },
    use_code: string
  ): [string?, UpdateUserDto?] {
    const {
      use_name,
      use_lastname,
      use_email,
      use_nui,
      use_password,
      use_phone,
      use_address,
      use_status,
      use_role,
      use_img,
    } = object;

    if (!use_code) return ["Missin user ID"];
    if (!Validators.isUUID(use_code)) return ["Invalid user ID"];
    if (!use_name) return ["Missin name"];
    if (!use_lastname) return ["Missin lastname"];
    if (!use_nui) return ["Missin nui"];
    if (!use_email) return ["Missin email"];
    if (!regularExps.email.test(use_email)) return ["Email is not valid"];
    if (!use_password) return ["Missin password"];
    if (use_password.length < 6) return ["Password too short"];
    if (!use_phone) return ["Missin phone"];
    if (!use_address) return ["Missin address"];
    if (!use_status) return ["Missin status"];
    if (!use_role) return ["Missin role"];
    if (!Validators.isUUID(use_role)) return ["Invalid rol ID"];

    return [
      undefined,
      new UpdateUserDto(
        use_code,
        use_name,
        use_lastname,
        use_email,
        use_nui,
        use_password,
        use_phone,
        use_address,
        use_status,
        use_role,
        use_img
      ),
    ];
  }
}
