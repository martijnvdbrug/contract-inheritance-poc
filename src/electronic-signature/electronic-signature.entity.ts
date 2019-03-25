import {SignatureEntity} from '../signature/signature.entity';
import {ChildEntity, Column, Entity} from 'typeorm';

@ChildEntity()
export class ElectronicSignatureEntity extends SignatureEntity {

  /**
   * URL to the image of the electronic signature
   */
  @Column({nullable: true})
  imageUrl: string

}