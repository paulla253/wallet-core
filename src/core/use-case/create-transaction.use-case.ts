import { ICreateTransactionUseCase } from '../_share/use-case/create-transaction.use-case.interface';
import {
  ICreateTransactionInputDTO,
  ICreateTransactionOutputDTO,
} from '../_share/use-case/dto/create-transaction.dto';
import { Transaction } from '../entity/transaction.entity';
import { EEvent, IEventDispatcher } from '../event/event-dispatcher.interface';
import { ITransactionUnitOfWork } from '../unit-of-work/transaction-uow.interface';

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly uow: ITransactionUnitOfWork,
    private readonly eventDispatcher: IEventDispatcher,
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

      await this.uow.accountRepository.updateBalance(accountFrom);
      await this.uow.accountRepository.updateBalance(accountTo);

      await this.uow.transactionRepository.save(transaction);

      await this.uow.complete();
    } catch (error) {
      await this.uow.rollback();
      throw error;
    }

    const balanceUpdatedOutput = {
      accountIdFrom: input.accountIdFrom,
      accountIdTo: input.accountIdTo,
      balanceAccountIdFrom: accountFrom.value,
      balanceAccountIdTo: accountTo.value,
    };

    await this.eventDispatcher.send({
      event: EEvent.UPDATE_BALANCE,
      payload: balanceUpdatedOutput,
    });

    await this.eventDispatcher.send({
      event: EEvent.TRANSACTION,
      payload: transaction,
    });

    return {
      id: transaction.value.id,
      accountIdFrom: input.accountIdFrom,
      accountIdTo: input.accountIdTo,
      amount: input.amount,
    };
  }
}
