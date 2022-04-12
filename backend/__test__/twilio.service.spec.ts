import { Twilio } from 'twilio';
import { TwilioService } from '../src/services/twilio.service';
import { EnvironmentProvider } from '../src/utils/environment.provider';
import { TWILIO } from '../src/config/twilio.config';
import type { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';

jest.mock('../src/utils/environment.provider');
jest.mock('twilio', () => {
  const MockTwilio = jest.fn().mockImplementation(() => {
    return {
      messages: {
        create(payload: MessageListInstanceCreateOptions) {
          return payload;
        },
      },
    };
  });

  return {
    Twilio: MockTwilio,
  };
});

describe('Twilio SMS Provider', () => {
  const mockAccountSid = 'mock twilio account sid';
  const mockAuthToken = 'mock auth token';

  let twilioClient: Twilio;
  let mockTwilioService: TwilioService;
  let provider: EnvironmentProvider;

  beforeEach(() => {
    twilioClient = new Twilio(mockAccountSid, mockAuthToken);
    provider = new EnvironmentProvider();
    mockTwilioService = new TwilioService(twilioClient, provider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(mockTwilioService).toBeDefined();
  });

  it('should be able to send an SMS message', async () => {
    const mockPayload = { to: '5141234567', body: 'Hello World!' };

    jest
      .spyOn(provider, 'get')
      .mockImplementation(jest.fn((prop: string) => prop));

    expect(await mockTwilioService.sendSMS(mockPayload)).toEqual({
      messagingServiceSid: TWILIO.MessagingService,
      ...mockPayload,
    });
  });
});
