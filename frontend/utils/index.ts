export const formatPhoneNumber = (input: string) =>
  input.length === 10
    ? `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(
        6,
        10
      )}`
    : input;
