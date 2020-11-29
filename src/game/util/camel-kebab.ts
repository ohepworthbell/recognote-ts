/**
 *  Convert camelCase to kebab-case for element keys
 * 
 *  @note will need expanding to check for (e.g.) all uppercase
 *  characters, or strings starting with uppercase characters
 */
export default function camelToKebab(str: string) : string {
  // Test string
  let camelCase: boolean = /[A-Z]/.test(str);

  // If not camelcase, just return the string
  if(!camelCase) return str;

  // Replace uppercase letters with hyphen-uppercase
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}