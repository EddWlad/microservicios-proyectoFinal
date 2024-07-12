import { JwtAdapter, bcryptAdapter } from "../../config";
import { User } from "../../data/postgres/models/user.model";
import { CustomError, LoginUserDto, UserEntity, ValidateTokenDto } from "../../domain";

export class AuthService {
  constructor() { }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await User.findOne({
      where: { use_email: loginUserDto.email },
      relations: ['use_role'],
    });
    if (!user) throw CustomError.badRequest("Incorrect username or password");
    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.use_password
    );
    if (!isMatching)
      throw CustomError.badRequest("Incorrect username or password");

    const { use_password, use_emailValidated, use_nui, use_code, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.use_code });

    if (!token) throw CustomError.internalServer("Error while creating JWT");

    return {
      success: true,
      data: {
        user: { name: userEntity.use_name, lastname: userEntity.use_lastname, role: userEntity.use_role.rol_name, email: userEntity.use_email, img: userEntity.use_img },
        token: token
      },
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
