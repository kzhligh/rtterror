import { Frozen, Injectable } from 'src/utils/decorators';
import { Twilio } from 'twilio';
import type {
  MessageInstance,
  MessageListInstanceCreateOptions,
} from 'twilio/lib/rest/api/v2010/account/message';
import 'src/config/twilio.config';
import { NotificationProvider } from 'src/interfaces/NotificationProvider';
import { EnvironmentProvider } from 'src/utils/environment.provider';
import { TWILIO } from 'src/config/twilio.config';

@Frozen()
@Injectable()
export class TwilioService extends NotificationProvider {
  constructor(
    private readonly twilioClient: Twilio,
    private readonly provider: EnvironmentProvider
  ) {
    super();
  }

  /**
   * Sends an SMS using a Twilio phone number.
   *
   * @param { MessageListInstanceCreateOptions } payload
   *    SMS payload. Encapsulates data required to send an SMS.
   *    Example: { to: "5141231234", body: "Hello World!" }
   *
   * @returns { MessageInstance } MessageInstance for the SMS.
   */
  async sendSMS(
    payload: MessageListInstanceCreateOptions
  ): Promise<MessageInstance> {
    return this.twilioClient.messages.create({
      messagingServiceSid: this.provider.get(TWILIO.MessagingService),
      ...payload,
    });
  }
}
