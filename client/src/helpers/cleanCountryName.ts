/**
 * Cleans the country name by removing the word 'the' at the end of the string, which is commonly omitted
 * @param country 
 * @returns the country name without the word 'the' at the end
 */
export function cleanCountryName(country: string): string {
  return country.replace(/\s*\(the\)$/, '');
}