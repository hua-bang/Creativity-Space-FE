export type PartialKey<
  T extends Record<string, any>, 
  K extends keyof T
> = Partial<Pick<T, K>> & Omit<T, K>; 

export type RequiredKey<
  T extends Record<string, any>, 
  K extends keyof T
> = Partial<Omit<T, K>> & Required<Pick<T, K>>;