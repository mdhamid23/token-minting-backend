//#region Types

export type DictionaryKey = string | number;
export type Comparer<T> = (x: T, y: T) => boolean;

//#endregion

export class Dictionary<K extends DictionaryKey, V> {
  private record: Record<K, V>;
  constructor(_record?: Record<K, V>) {
    if (_record) this.record = _record;
    else this.clear();
  }

  public add(key: K, value: V): void {
    this.record[key] = value;
  }

  public includesKey(_key: K) {
    return typeof this.record[_key] !== "undefined";
  }

  public includesValue(_value: V, _comparer?: Comparer<V>) {
    _comparer ??= (x, y) => x === y;
    return this.values.some((x) => _comparer?.(x, _value));
  }

  public clear(): void {
    this.record = {} as Record<K, V>;
  }

  public get keys(): K[] {
    return Object.keys(this.record).map((x) => x as K);
  }

  public get values(): V[] {
    return Object.values(this.record);
  }

  public valueOf(): Record<K, V> {
    return this.record;
  }

  public *entries(): IterableIterator<[K, V]> {
    return this.record;
  }

  public toString() {
    return JSON.stringify(this.record);
  }
}

export class List<T> extends Array<T> {
  public constructor(length: number);
  public constructor(...items: Array<T>);
  constructor(...items: Array<any>) {
    if (items && items.length === 1 && typeof items === "number")
      super(items[0]);
    else super(...items);
  }

  public pushRange(items: Array<T>): number {
    return this.push(...items);
  }

  public toSet(): Set<T> {
    return new Set(this);
  }

  public intersect(second: List<T>, comparer: Comparer<T>): List<T> {
    comparer ??= (x, y) => x === y;
    return new List<T>(
      ...this.filter((x) => second.some((y) => comparer(x, y)))
    );
  }

  public groupBy<U extends DictionaryKey>(
    keySelector: (x: T) => U
  ): Dictionary<U, List<T>> {
    return new Dictionary(
      this.reduce(
        (prev, curr) => ({
          ...prev,
          [keySelector(curr)]: new List(...prev[keySelector(curr)], curr),
        }),
        {} as Record<U, List<T>>
      )
    );
  }

  public distinct(by?: Comparer<T>) {
    by ??= (x, y) => x === y;
    return new List(
      ...this.reduce(
        (prev, curr, _, arr) =>
          arr.some((x) => by?.(x, curr)) ? prev : [...prev, curr],
        [] as T[]
      )
    );
  }

  public union(second: List<T>): List<T> {
    return new List(...this, ...second).distinct();
  }
}
