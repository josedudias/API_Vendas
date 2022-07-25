import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { Twilio } from "twilio";
import twilioAuth from '@config/sms/twilioAuth';
import { ISendForgotPasswordSMS } from '../domain/models/ISendForgotPasswordSMS';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ number }: ISendForgotPasswordSMS): Promise<void> {
    const user = await this.usersRepository.findByNumber(number);
    const accountSid = twilioAuth.twilio.account;
    const authToken = twilioAuth.twilio.token_twilio;
    const twilioNumber = twilioAuth.twilio.number_twilio;

    const client = new Twilio(accountSid, authToken);

    if (!user) {
      throw new AppError('O usuário não existe.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    client.messages
    .create({
      from: twilioNumber,
      to: number,
      body: `O seu link para resetar a senha é: ${process.env.APP_WEB_URL}/reset_password?token=${token}`,
    })

  }
}

export default SendForgotPasswordEmailService;
