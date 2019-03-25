import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Contract} from './contract.interface';
import {SignatureEntity} from '../signature/signature.entity';

@Entity()
export class ContractEntity implements Contract {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  car: string;

  @Column()
  pricePerMonth: number;

  @OneToMany(type => SignatureEntity, s => s.contract,  {
    eager: true
  })
  signatures: SignatureEntity[];

}