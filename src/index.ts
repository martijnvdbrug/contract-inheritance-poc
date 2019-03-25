import {Connection, createConnection} from 'typeorm';
import {ContractService} from './contract/contract.service';
import {ContractEntity} from './contract/contract.entity';
import {SignatureEntity} from './signature/signature.entity';
import {ElectronicSignatureEntity} from './electronic-signature/electronic-signature.entity';
import {ElectronicSignatureService} from './electronic-signature/electronic-signature.service';
import {PaymentSignatureService} from './payment-signature/payment-signature.service';
import * as shortid from 'shortid';
import {PaymentSignatureEntity} from './payment-signature/payment-signature.entity';

export let connection: Connection;
(async () => {

  connection = await createConnection({
    type: 'sqlite',
    database: './db.sqlite',
    synchronize: true,
    entities: [
      ContractEntity,
      SignatureEntity,
      ElectronicSignatureEntity,
      PaymentSignatureEntity
    ]
  });

  // Create a contract
  let contract = await ContractService.create({
    car: 'Tesla model 3 performance',
    pricePerMonth: 750
  });

  // Sign electronically
  await ElectronicSignatureService.sign({
    contractId: contract.id,
    name: 'Elon Musk',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Elon_Musk_Signature.svg'
  });

  // Sign with payment
  await PaymentSignatureService.sign({
    contractId: contract.id,
    name: 'Martijn van de Brug',
    transactionId: shortid.generate()
  });

  contract = await ContractService.get(contract.id);
  console.log(`Signed contract for car '${contract.car}', with a price of €${contract.pricePerMonth},- per month.`);

  for (let signature of contract.signatures) {

    // We can still resolve the signatures to their original types when needed:
    if (signature.constructor.name === ElectronicSignatureEntity.name) {
      const eSignature = <ElectronicSignatureEntity> signature;
      console.log(`   Electronically signed by ${eSignature.signedBy} with signature: ${eSignature.imageUrl}`);
    } else if (signature.constructor.name === PaymentSignatureEntity.name) {
      const pSignature = <PaymentSignatureEntity> signature;
      console.log(`   Signed with payment by ${pSignature.signedBy} with transactionId '${pSignature.transactionId}'`);
    }
  }

  process.exit(0);
})();