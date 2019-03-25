import {ElectronicSignatureInput} from './electronic-signature-input.interface';
import {getRepository} from 'typeorm';
import {ElectronicSignatureEntity} from './electronic-signature.entity';

export class ElectronicSignatureService {

  static async sign(input: ElectronicSignatureInput): Promise<ElectronicSignatureEntity> {
    return getRepository(ElectronicSignatureEntity).save({
      contract: {id: input.contractId},
      signedBy: input.name,
      imageUrl: input.imageUrl
    });
  }

}