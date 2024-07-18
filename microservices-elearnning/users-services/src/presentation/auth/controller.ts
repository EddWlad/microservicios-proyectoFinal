import { Response, Request } from "express";
import { CustomError, LoginUserDto, ValidateTokenDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  //DI
  constructor(public readonly authService: AuthService) { }
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ success: false, data: null, error: error.message });
    }
    console.log(error);
    return res.status(500).json({success: false, data: null, error: 'Internal server error' });
  }
  loginUser = (req: Request, res: Response) => {
    const [error, loginDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json(error);

    this.authService.loginUser(loginDto!).
      then((user) => res.json(user))
      .catch(error => this.handleError(error, res));
  };
  renewToken = (req: Request, res: Response) => {
    const [error, tokenDto] = ValidateTokenDto.create(req.body.user);

    if (error) return res.status(400).json(error);
    this.authService.renewToken(tokenDto!).
      then((token) => res.json({ user: req.body.user, ...token }))
      .catch(error => this.handleError(error, res));
  }


}
