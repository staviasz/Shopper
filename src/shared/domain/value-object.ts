type Props = Record<string, any> | string;

export abstract class ValueObject<T extends Props = string> {
  protected constructor(private props: T) {}

  get value(): T {
    return this.props;
  }
}
