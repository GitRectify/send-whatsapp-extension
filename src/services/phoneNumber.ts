import { getCountryDialCode } from './countryCodes';

const parsePhoneNumber = (text?: string): string => {
  if (!text) {
    throw new Error('No phone text provided')
  }
  const phoneNumber = text.replace(/\D/g, '');
  if (phoneNumber.length === 0) {
    throw new Error('No phone number is provided');
  }
  return phoneNumber;
};

const formatPhoneNumber = (phoneNumber: string, countryCode: string) => {
  const dialCode = getCountryDialCode(countryCode);
  if (dialCode && !phoneNumber.startsWith(dialCode)) {
    const normalizedPhoneNumber = phoneNumber.replace(/^0+/, '');  // Remove leading zeros
    return dialCode + normalizedPhoneNumber;
  } else {
    return phoneNumber;  // Default to the number without modification if country code is not found
  }
};

export const extractPhoneNumber = (countryCode: string, maybePhoneNumber?: string): string => {
  return formatPhoneNumber(parsePhoneNumber(maybePhoneNumber), countryCode);
};
