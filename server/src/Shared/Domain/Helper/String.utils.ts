export class StringUtils {
  public static toSnakeCase(camelCaseWord: string): string {
    return camelCaseWord.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}