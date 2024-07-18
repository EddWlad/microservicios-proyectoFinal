import { Response, Request } from "express";
import {
  CreateUserDto,
  CustomError,
  PaginationDto,
  UpdateUserDto,
} from "../../domain";
import { UserService } from "../services/user.service";

export class UserController {
  //DI
  constructor(public readonly userService: UserService) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json({ success: false, data: null, error: error.message });
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: null, error: "Internal server error" });
  };
  createUser = (req: Request, res: Response) => {
    const [error, registerDto] = CreateUserDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json(error);

    this.userService
      .createUser(registerDto!)
      .then((user) => res.json({ success: true, data: user, error: null }))
      .catch((error) => this.handleError(error, res));
  };
  getUsers = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (error) return res.status(400).json(error);

    this.userService
      .getUsers(paginationDto!)
      .then((users) =>
        res.status(200).json({ success: true, data: users, error: null })
      )
      .catch((error) => this.handleError(error, res));
  };
  getUser = (req: Request, res: Response) => {
    const id = req.params.id;
    this.userService
      .getUser(id)
      .then((user) => res.json({ success: true, data: user, error: null }))
      .catch((error) => this.handleError(error, res));
  };
  updateUser = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateDto] = UpdateUserDto.create(req.body, id);

    if (error) return res.status(400).json(error);

    this.userService
      .updateUser(updateDto!)
      .then((user) => res.json({ success: true, data: user, error: null }))
      .catch((error) => this.handleError(error, res));
  };
  valiateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.userService
      .validateEmail(token)
      .then(() => res.json("Email validated"))
      .catch((error) => this.handleError(error, res));
  };
}
