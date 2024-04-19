import { getUserCountry } from './services/country';
import { extractPhoneNumber } from './services/phoneNumber';

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
      const phoneNumber = extractPhoneNumber(countryCode, info.selectionText);
      if (phoneNumber) {
        const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&type=phone_number&app_absent=0`;
        chrome.tabs.create({ url: url });
      }
    }).catch(error => {
      console.error(error.message);
    });
  }
});
