import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordSMSService from '@modules/users/services/SendForgotPasswordSMSService';

export default class ForgotPasswordSMSController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { number } = request.body;

    const sendForgotPasswordSMS = container.resolve(
      SendForgotPasswordSMSService,
    );

    await sendForgotPasswordSMS.execute({
      number,
    });

    return response.status(204).json();
  }
}
