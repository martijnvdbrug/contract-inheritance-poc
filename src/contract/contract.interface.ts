import {Signature} from '../signature/signature.interface';

export interface Contract {
  id: string
  car: string
  pricePerMonth: number
  signatures: Signature[]
}