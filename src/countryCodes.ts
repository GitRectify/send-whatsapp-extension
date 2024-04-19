import { codes } from 'country-calling-code';

export const getCountryDialCode = (countryIsoCode: string): string | undefined => {
  return codes.find(({ isoCode2 }) => countryIsoCode)?.countryCodes[0]
} 