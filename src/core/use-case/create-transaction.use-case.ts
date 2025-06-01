import { ICreateTransactionUseCase } from '../_share/use-case/create-transaction.use-case.interface';
import {
  ICreateTransactionInputDTO,
  ICreateTransactionOutputDTO,
} from '../_share/use-case/dto/create-transaction.dto';
import { Transaction } from '../entity/transaction.entity';
import { ITransactionUnitOfWork } from '../unit-of-work/transaction.uow-interface';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly uow: ITransactionUnitOfWork,
    //private readonly eventDispatcher: EventDispatcherInterface,
    //private readonly transactionCreated: EventInterface,
    //private readonly balanceUpdated: EventInterface,
  ) {}

  async execute(
    input: ICreateTransactionInputDTO,
  ): Promise<ICreateTransactionOutputDTO> {
    const accountFrom = await this.uow.accountRepository.findById(
      input.accountIdFrom,
    );
    if (accountFrom === null)
      throw new Error('Conta de destino não encontrada');

    const accountTo = await this.uow.accountRepository.findById(
      input.accountIdTo,
    );
    if (accountTo === null) throw new Error('Conta de origem não encontrada');

    const transaction = new Transaction({
      accountFrom,
      accountTo,
      amount: input.amount,
    });

    try {
      await this.uow.start();

      //balanceUpdatedOutput = {
      //  accountIdFrom: input.accountIdFrom,
      //  accountIdTo: input.accountIdTo,
      //  balanceAccountIdFrom: accountFrom.balance,
      //  balanceAccountIdTo: accountTo.balance,
      //};

      await this.uow.accountRepository.updateBalance(accountFrom);
      await this.uow.accountRepository.updateBalance(accountTo);

      //this.balanceUpdated.setPayload(balanceUpdatedOutput);
      //this.eventDispatcher.dispatch(this.balanceUpdated);

      await this.uow.transactionRepository.save(transaction);
      //this.transactionCreated.setPayload(output);
      //this.eventDispatcher.dispatch(this.transactionCreated);

      await this.uow.complete();

      return {
        id: transaction.value.id,
        accountIdFrom: input.accountIdFrom,
        accountIdTo: input.accountIdTo,
        amount: input.amount,
      };
    } catch (error) {
      await this.uow.rollback();
      throw error;
    }
  }
}
