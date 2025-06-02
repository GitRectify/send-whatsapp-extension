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
    console.log('Sending message from context menu', info.selectionText);
    sendWhatsApp(info.selectionText);
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'sendWhatsApp') {
    console.log('Sending message from popup', message.payload);
    sendWhatsApp(message.payload);
  }
  // Send response asynchronously
  return true;
});

function sendWhatsApp(maybePhoneNumber?: string) {
  getUserCountry()
    .then((countryCode) => {
      const phoneNumber = extractPhoneNumber(countryCode, maybePhoneNumber);
      if (phoneNumber) {
        const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&type=phone_number&app_absent=0`;
        chrome.tabs.create({ url: url });
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
}
