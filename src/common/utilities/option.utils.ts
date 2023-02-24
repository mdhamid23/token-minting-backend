type None = { _type: "none" };
type Some<T> = { _type: "some"; value: T };
type OptionType<T> = None | Some<T>;

const none: None = { _type: "none" };
const some = <T>(value: T): Some<T> => ({ _type: "some", value });

// creators

const fromFn = <T>(fn: () => T): OptionType<T> => {
  try {
    return some(fn());
  } catch (error) {
    return none;
  }
};

const fromPromise = async <T>(fn: Promise<T>): Promise<OptionType<T>> =>
  fn.then((v) => some(v)).catch(() => none);

const toOptional =
  <I, O extends I>(fn: (i: I) => i is O) =>
  (arg: I): OptionType<O> => {
    try {
      return fn(arg) ? some(arg) : none;
    } catch (error) {
      return none;
    }
  };

const from = toOptional(<T>(arg: T | undefined | null): arg is T => !!arg);
const fromStrNumber = (i: any) =>
  typeof i === "string" && !isNaN(+i) ? some(+i) : none;

// consumers

const unwrap = <T>(opt: OptionType<T>): T => {
  if (opt._type !== "some") throw new Error("Could not unwrap option");
  return opt.value;
};

const unwrapOr = <T>(opt: OptionType<T>, fallback: T): T => {
  try {
    return unwrap(opt);
  } catch (error) {
    return fallback;
  }
};

const unwrapOrThrow = <T>(
  opt: OptionType<T>,
  options?: { msg?: string }
): T => {
  if (opt._type !== "some")
    throw new Error(
      typeof options?.msg === "string" ? options.msg : "Could not unwrap option"
    );
  return opt.value;
};

const OptionUtils = {
  from,
  fromFn,
  fromPromise,
  fromStrNumber,
  unwrap,
  unwrapOr,
  unwrapOrThrow,
};

export class Optional<T> {
  private option: OptionType<T>;
  constructor(val: OptionType<T>) {
    this.option = val;
  }

  static from<T>(arg: T | undefined | null): Optional<T> {
    return new Optional(OptionUtils.from(arg));
  }

  static fromEnv(envKey: string): Optional<string> {
    return new Optional(OptionUtils.from(process.env[envKey]));
  }

  static fromEnvNum(envKey: string): Optional<number> {
    return new Optional(OptionUtils.fromStrNumber(process.env[envKey]));
  }

  static fromFn<T>(fn: () => T): Optional<T> {
    return new Optional(OptionUtils.fromFn(fn));
  }

  static async fromAsync<T>(fn: Promise<T>): Promise<Optional<T>> {
    return new Optional(await OptionUtils.fromPromise(fn));
  }

  static fromStrNumber(i: any): Optional<number> {
    return new Optional(OptionUtils.fromStrNumber(i));
  }

  unwrap = () => OptionUtils.unwrap(this.option);
  unwrapOr = (fallback: T) => OptionUtils.unwrapOr(this.option, fallback);
  unwrapOrThrow = (msg: string) =>
    OptionUtils.unwrapOrThrow(this.option, { msg });
}
