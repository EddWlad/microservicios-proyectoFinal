import { DeepPartial } from "typeorm";
import { Role } from "../../data";
import {
  CreateRoleDto,
  CustomError,
  RoleEntity,
  UpdateRoleDto,
  UserEntity,
} from "../../domain";

export class RoleService {
  public async createRole(createRoleDto: CreateRoleDto) {
    const existRol = await Role.findOne({
      where: { rol_name: createRoleDto.rol_name },
    });

    if (existRol) throw CustomError.badRequest("Role already exist");
    try {
      const role = Role.create(createRoleDto as DeepPartial<Role>);

      await role.save();

      const roleEntity = RoleEntity.fromObject(role);
      return roleEntity;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async getRole(rol_code:string) {
    let role:Role | null;
    try {
      role = await Role.findOne({where:{rol_code}});
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
    if (!role) throw CustomError.notFound("Role not exist");
    return role;
  }
  public async getRoles() {
    try {
      const role = await Role.find();
      return role;
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
  }
  public async updateRole(updateRoleDto: UpdateRoleDto) {
    const existRol = await Role.findOne({
      where: { rol_name: updateRoleDto.rol_name },
    });

    if (!existRol) throw CustomError.badRequest("Rol already exist");

    try {
      const role = await Role.update(
        { rol_code: updateRoleDto.rol_code },
        updateRoleDto as DeepPartial<Role>
      );
      if (role.affected == 0) throw CustomError.internalServer("Error updating role");

      return updateRoleDto;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async deleteRole(rol_code: string) {
    try {
    
      const role = await Role.update(
        { rol_code  },
        { rol_status: false },
      );
  
      if (role.affected == 0) throw CustomError.internalServer("Error delete role");
  
      return role;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
