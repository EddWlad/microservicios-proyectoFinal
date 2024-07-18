import { JwtAdapter, bcryptAdapter } from "../../config";
import { User } from "../../data/postgres/models/user.model";
import { CustomError, LoginUserDto, UserEntity, ValidateTokenDto } from "../../domain";

export class AuthService {
  constructor() { }

  public async loginUser(userName: string) {
    const user = await User.findOne({
      where: { use_email: userName },
      relations: ['use_role'],
    });

    return {
      success: true,
      data: user,
      error: null
    };
  }
  public async renewToken(validateTokenDto: ValidateTokenDto) {
    const token = await JwtAdapter.generateToken({ id: validateTokenDto.use_code });

    if (!token) throw CustomError.internalServer("Error while creating JWT");

    return {
      token,
    };
  }
}
