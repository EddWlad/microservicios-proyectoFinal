import { Response, Request } from "express";
import { CustomError, UpdateRoleDto } from "../../domain";
import { CreateRoleDto } from "../../domain/dtos/role/create-role.dto";
import { RoleService } from "../services/role.service";

export class RoleController {
  constructor(public readonly roleService: RoleService) {}
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
  createRole = (req: Request, res: Response) => {
    const [error, createDto] = CreateRoleDto.create({
      ...req.body,
      rol_creator_user: req.body.user.use_code,
    });
    if (error) return res.status(400).json(error);
    this.roleService
      .createRole(createDto!)
      .then((role) => res.json({ success: true, data: role, error: null }))
      .catch((error) => {
        this.handleError(error, res);
      });
  };
  getRoles = (req: Request, res: Response) => {
    this.roleService
      .getRoles()
      .then((role) => res.json({ success: true, data: role, error: null }))
      .catch((error) => this.handleError(error, res));
  };
  getRole = (req: Request, res: Response) => {
    const id = req.params.id;
    this.roleService
      .getRole(id)
      .then((role) => res.json({ success: true, data: role, error: null }))
      .catch((error) => this.handleError(error, res));
  };
  updateRole = (req: Request, res: Response) => {
    const id = req.params.id;
    const [error, updateDto] = UpdateRoleDto.create(req.body, id);

    if (error) return res.status(400).json(error);

    this.roleService
      .updateRole(updateDto!)
      .then((role) => res.json({ success: true, data: role, error: null }))
      .catch((error) => this.handleError(error, res));
  };
  deleteRole = (req: Request, res: Response) => {
    const id = req.params.id;
    this.roleService
      .getRole(id)
      .then((role) => res.json({ success: true, data: role, error: null }))
      .catch((error) => this.handleError(error, res));
  };
}
