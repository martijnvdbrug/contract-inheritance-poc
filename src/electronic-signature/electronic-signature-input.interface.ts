import {SignatureInput} from '../signature/signature-input.interface';

export interface ElectronicSignatureInput extends SignatureInput {
  imageUrl: string
}