import {ContractInput} from './contract-input.interface';
import {Contract} from './contract.interface';
import {getRepository} from 'typeorm';
import {ContractEntity} from './contract.entity';

export class ContractService {

  /**
   * Create a contract based on given input
   * @param contract
   */
  static async create(contract: ContractInput): Promise<Contract> {
    return getRepository(ContractEntity).save({
      car: contract.car,
      pricePerMonth: contract.pricePerMonth
    });
  }

  /**
   * Get contract by id, including signatures
   * @param id
   */
  static async get(id: string): Promise<Contract> {
    return getRepository(ContractEntity)
        .findOneOrFail({
          where: {id},
          relations: ['signatures']
        });
  }

}