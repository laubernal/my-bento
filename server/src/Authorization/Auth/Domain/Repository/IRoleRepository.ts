import { Role } from "Authorization/Auth/Domain/Entity/Role";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IRoleRepository extends IRepository<Role> {
  
}