import { DeepPartial, Not } from "typeorm";
import { User } from "../../data";
import {
  CreateUserDto,
  CustomError,
  PaginationDto,
  UpdateUserDto,
  UserEntity,
} from "../../domain";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter, envs } from "../../config";
import { EmailService } from "./email.service";

export class UserService {
  constructor(
    private readonly emailService: EmailService,
    private readonly webservices_url: string
  ) {}

  public async createUser(registerUserDto: CreateUserDto) {
    const existUser = await User.findOne({
      where: { use_email: registerUserDto.use_email },
    });

    if (existUser) throw CustomError.badRequest("Email already exist");
    try {

      const user = User.create(registerUserDto as DeepPartial<User>);

      //encriptar la contraseña
      user.use_password = bcryptAdapter.hash(registerUserDto.use_password);
      await user.save();

      //Email de confirmacion
      await this.sendEmailValidationLink(
        user.use_email,
        user.use_name,
        user.use_lastname
      );

      const { use_password, ...userEntity } = UserEntity.fromObject(user);
      return {
        userEntity,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async updateUser(updateUserDto: UpdateUserDto) {
    const existUser = await User.findOne({
      where: { 
        use_email: updateUserDto.use_email,
        use_code: Not(updateUserDto.use_code)
       },
    });

    if (existUser) throw CustomError.badRequest("Email already exist");
    try {

      updateUserDto.use_password = bcryptAdapter.hash(updateUserDto.use_password);

      const user = await User.update(
        { use_code: updateUserDto.use_code },
        updateUserDto  as DeepPartial<User>,
      );

      if (user.affected==0) throw CustomError.badRequest("User not exist");

      const { use_password, ...userEntity } = UserEntity.fromObject(updateUserDto);
      return {
        userEntity,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async getUser(use_code: string) {
    let user:User | null;
    try {
      user = await User.findOne({where:{use_code}});
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
    if (user) throw CustomError.notFound("User not exist");
    return user;
  }
  public async getUsers(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    try {
      const [users, total] = await User.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/user?page=${page + 1}&limit=${limit}`,
        prev:
          page - 1 > 0
            ? `/api/user?page=${page - 1}&limit=${limit}`
            : null,
        users: users.map((user) => {
          const { use_password, ...rest } = user;
          return rest;
        }),
      };
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
  }
  private sendEmailValidationLink = async (
    email: string,
    name: string,
    lastname: string
  ) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `${this.webservices_url}/auth/validate-email/${token}`;
    const html = `
        <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0;">
    
            <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #007BFF;">Bienvenido a Nuestra Comunidad</h1>
                <p style="line-height: 1.6;">Estimado ${name} ${lastname},</p>
                <p style="line-height: 1.6;">¡Gracias por unirte a nuestra comunidad! Estamos emocionados de tenerte con nosotros.</p>
                <p style="line-height: 1.6;">Con tu cuenta, tendrás acceso a increíbles recursos y oportunidades. ¡Esperamos que disfrutes de la experiencia!</p>
                <p style="line-height: 1.6;">Para comenzar, puedes explorar nuestro sitio web y participar en las actividades disponibles.</p>
                <p style="line-height: 1.6;">Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                <p style="line-height: 1.6;">¡Bienvenido nuevamente y disfruta tu estancia!</p>
                <a href="${link}" style="display: inline-block; padding: 10px 20px; font-size: 16px; text-decoration: none; background-color: #007BFF; color: #fff; border-radius: 5px;">Explorar Ahora</a>
            </div>
    
        </div>
        `;
    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };
    const isSet = await this.emailService.sendEmail(options);

    if (!isSet) throw CustomError.internalServer("Error sending email");

    return true;
  };
  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized("Invalid Token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await User.findOne({
      where: { use_email: email },
    });
    if (!user) throw CustomError.internalServer("Email not exists");

    user.use_emailValidated = true;
    await user.save();

    return true;
  };
}
