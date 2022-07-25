import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrder } from '../domain/models/IOrder';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Pedido não encontrado.');
    }

    return order;
  }
}

export default ShowOrderService;
