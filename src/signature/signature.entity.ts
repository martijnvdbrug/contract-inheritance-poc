import {Signature} from './signature.interface';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId, TableInheritance} from 'typeorm';
import {ContractEntity} from '../contract/contract.entity';

@Entity()
@TableInheritance({column: {type: 'varchar', name: 'type'}})
export abstract class SignatureEntity implements Signature {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  signedBy: string;

  @ManyToOne(type => ContractEntity, c => c.signatures)
  contract: ContractEntity;


}