import {SignatureEntity} from '../signature/signature.entity';
import {ChildEntity, Column, Entity} from 'typeorm';

@ChildEntity()
export class PaymentSignatureEntity extends SignatureEntity {

  /**
   * TransactionId of the payment used to sign
   */
  @Column({nullable: true}) // nullable must be true, because the DB also accepts ElectronicSignatures without a transactionId
  transactionId: string

}