export const getUserCountry = (): Promise<string> => {
  return fetch('https://api.country.is/')
    .then((response) => response.json())
    .then((data) => data.country)
    .catch((error) => console.error('Failed to fetch country:', error));
};
