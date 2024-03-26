export class ArrayUtils {
  public static times<T>(iterations: number, fn: () => T): T {
    const result = [];
    for (let i = 0; i < iterations; i++) {
      result.push(fn());
    }

    return result[iterations - 1];
  }
}