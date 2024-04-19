import { extractPhoneNumber } from './phoneNumber';

describe('extractPhoneNumber', () => {
  it('should return formatted phone number', () => {
    const countryCode = 'US';
    const maybePhoneNumber = '+1 (555) 123-4567';
    const expectedPhoneNumber = '15551234567';

    const result = extractPhoneNumber(countryCode, maybePhoneNumber);

    expect(result).toBe(expectedPhoneNumber);
  });

  it('should handle local phone number', () => {
    const countryCode = 'IL';
    const maybePhoneNumber = '052-534-4907';
    const expectedPhoneNumber = '972525344907';

    const result = extractPhoneNumber(countryCode, maybePhoneNumber);

    expect(result).toBe(expectedPhoneNumber);
  });

  it('should disregard country code if full number is provided', () => {
    const countryCode = 'IL';
    const maybePhoneNumber = '+1 (555) 123-4567';
    const expectedPhoneNumber = '15551234567';

    const result = extractPhoneNumber(countryCode, maybePhoneNumber);

    expect(result).toBe(expectedPhoneNumber);
  });

  it('should return empty string if maybePhoneNumber is undefined', () => {
    const countryCode = 'US';
    const maybePhoneNumber = undefined;

    expect(() => {
      extractPhoneNumber(countryCode, maybePhoneNumber);
    }).toThrow();
  });
});