import {SignatureInput} from '../signature/signature-input.interface';

export interface PaymentSignatureInput extends SignatureInput {
  transactionId: string
}