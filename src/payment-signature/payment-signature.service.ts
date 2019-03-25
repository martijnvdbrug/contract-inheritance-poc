import {getRepository} from 'typeorm';
import {PaymentSignatureEntity} from './payment-signature.entity';
import {PaymentSignatureInput} from './payment-signature-input.interface';

export class PaymentSignatureService {

  static async sign(input: PaymentSignatureInput): Promise<PaymentSignatureEntity> {
    return getRepository(PaymentSignatureEntity).save({
      contract: {id: input.contractId},
      signedBy: input.name,
      transactionId: input.transactionId
    });
  }

}