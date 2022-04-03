import dotenv from 'dotenv';
import { ServiceLocator } from 'src/utils/decorators';
import { Twilio } from 'twilio';

dotenv.config();

export const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export enum TWILIO {
  MessagingService = 'TWILIO_MESSAGING_SERVICE_SID',
}

ServiceLocator.getInstance().set<Twilio>(Twilio, twilioClient);
