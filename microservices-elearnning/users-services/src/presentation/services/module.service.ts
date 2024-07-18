import { DeepPartial } from "typeorm";
import { Module } from "../../data";
import { CreateModuleDto, CustomError, ModuleEntity, UpdateModuleDto } from "../../domain";

export class ModuleService {
  public async createModule(createModuleDto: CreateModuleDto) {
    try {
      const existModule = await Module.findOne({
        where: { mod_title: createModuleDto.mod_title },
      });

      if (existModule) throw CustomError.badRequest("Module already exist");

      const module = Module.create(createModuleDto as DeepPartial<Module>);

      await module.save();

      const moduleEntity = ModuleEntity.fromObject(module);
      return moduleEntity;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  
  public async getModules() {
    try {
      const module = await Module.find();
      return module;
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
  }
  public async getModule(mod_code:string) {
    let module:Module | null;
    try {
      module = await Module.findOne({where:{mod_code}});
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
    if (module) throw CustomError.notFound("Module not exist");
    return module;
  }
  public async updateModule(updateModuleDto: UpdateModuleDto) {
    const existRol = await Module.findOne({
      where: { mod_title: updateModuleDto.mod_title },
    });

    if (existRol) throw CustomError.badRequest("Module already exist");

    try {
      const module = await Module.update(
        { mod_code: updateModuleDto.mod_code },
        updateModuleDto as DeepPartial<Module>
      );
      if (module.affected == 0) throw CustomError.internalServer("Error updating module");

      return updateModuleDto;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
