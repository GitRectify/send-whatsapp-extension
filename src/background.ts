import { getCountryDialCode } from './countryCodes';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'sendWhatsApp',
    title: 'Send WhatsApp message',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'sendWhatsApp' && info.selectionText) {
    getUserCountry().then(countryCode => {
      const phoneNumber = formatPhoneNumber(extractPhoneNumber(info.selectionText), countryCode);
      if (phoneNumber) {
        const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&type=phone_number&app_absent=0`;
        chrome.tabs.create({ url: url });
      }
    }).catch(error => {
      console.error(error.message);
    });
  }
});

function extractPhoneNumber(text?: string): string {
  if (!text) {
    throw new Error('No phone text provided')
  }
  const phoneNumber = text.replace(/\D/g, '');
  if (phoneNumber.length === 0) {
    throw new Error('No phone number is provided');
  }
  return phoneNumber;
}

function getUserCountry() {
  return fetch('https://api.country.is/')
    .then(response => response.json())
    .then(data => data.country)
    .catch(error => console.error('Failed to fetch country:', error));
}

function formatPhoneNumber(phoneNumber: string, countryCode: string) {
  const dialCode = getCountryDialCode(countryCode);
  if (dialCode) {
    const normalizedPhoneNumber = phoneNumber.replace(/^0+/, '');  // Remove leading zeros
    return dialCode + normalizedPhoneNumber;
  } else {
    return phoneNumber;  // Default to the number without modification if country code is not found
  }
}
