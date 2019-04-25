export class Timestamped<T> {
  constructor(public t: T) {
    this.timestamp = new Date();
  }

  public timestamp: Date;
}
