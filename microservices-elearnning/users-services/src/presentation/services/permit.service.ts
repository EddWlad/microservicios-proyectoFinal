import { DeepPartial } from "typeorm";
import { Permit } from "../../data";
import { CreatePermitDto, CustomError, PermitEntity, UpdatePermitDto } from "../../domain";

export class PermitService {
  public async createPermit(createPermitDto: CreatePermitDto) {
    try {
      await Permit.delete({ per_role: { rol_code: createPermitDto.per_role } })

      let permits = [];
      for (const permitData of createPermitDto.permits) {
        const permit = Permit.create(permitData as DeepPartial<Permit>);
        permits.push(permit);
      }
      await Permit.save(permits);

      const permitEntities = permits.map(permit => PermitEntity.fromObject(permit));
      return permitEntities;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  public async getPermits() {
    try {
      const permit = await Permit.find();
      return permit;
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
  }
  public async getPermit(per_code: string) {
    let permit: Permit | null;
    try {
      permit = await Permit.findOne({ where: { per_code } });
    } catch (error) {
      throw CustomError.internalServer("Internal Server Error");
    }
    if (permit) throw CustomError.notFound("Permit not exist");
    return permit;
  }
  public async updatePermit(updatePermitDto: UpdatePermitDto) {
    const existPermit = await Permit.findOne({
      where: { per_code: updatePermitDto.per_code },
    });

    if (existPermit) throw CustomError.badRequest("Permit already exist");

    try {
      const permit = await Permit.update(
        { per_code: updatePermitDto.per_code },
        updatePermitDto as DeepPartial<Permit>
      );
      if (permit.affected == 0) throw CustomError.internalServer("Error updating permit");

      return updatePermitDto;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
