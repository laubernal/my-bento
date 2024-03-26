export type UserSession = {
  name: string;
  email: string;
  permissions: { name: string }[];
  role: string;
};

export type Primitives = string | boolean | number | Date | null;

export type ValueObjectConstructor<T> = new (_value: any) => T;
