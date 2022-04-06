import { Frozen, Injectable } from './decorators';

@Frozen()
@Injectable()
export class EnvironmentProvider {
  private map: Map<string, string | undefined>;

  constructor() {
    const values = new Map<string, string | undefined>(
      Object.entries(new Map(Object.entries(global.process)).get('env'))
    );

    this.map = new Proxy<Map<string, string | undefined>>(values, {
      get(
        target: Map<string, string | undefined>,
        prop: string,
        receiver: any
      ) {
        const value = Reflect.get(target, prop, receiver);
        return typeof value == 'function' ? value.bind(target) : value;
      },
    });
  }

  get(key: string): string | undefined {
    return this.map.get(key);
  }
}
