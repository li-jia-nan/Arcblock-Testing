export const serializer = <T>(value: T): string => {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return '';
  }
};

export const deserializer = <T>(value: string): T | null => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};
