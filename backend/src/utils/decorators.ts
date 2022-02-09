import 'reflect-metadata';

enum Metadata {
  Type = 'design:type',
  ParamTypes = 'design:paramtypes',
  ReturnType = 'design:returntype',
}

interface Type<T> {
  new (...args: any[]): T;
}

export function Frozen() {
  return function (constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
  };
}

function InjectorFactory(resolver: ServiceLocator) {
  return function () {
    return function <T>(target: Type<T>) {
      if (resolver.has(target.name)) {
        return;
      } else {
        resolver.resolve(target);
      }
    };
  };
}

@Frozen()
export class ServiceLocator {
  private readonly container: Map<string, any> = new Map<string, any>();
  private static readonly instance = new ServiceLocator();

  private constructor() {}

  static getInstance(): ServiceLocator {
    return this.instance;
  }

  has(dependency: string): boolean {
    return this.container.has(dependency);
  }

  resolve<T>(target: Type<T>): T {
    const dependency: string = target.name;

    if (this.container.has(dependency)) {
      return this.container.get(dependency);
    }

    const tokens: Array<any> =
      Reflect.getMetadata(Metadata.ParamTypes, target) || [];
    const injections: Array<any> = tokens.map((token: Type<any>): any =>
      this.resolve(token)
    );

    const instance: T = new target(...injections);
    this.container.set(dependency, instance);

    return instance;
  }

  set<T>(target: Type<T>, instance: T): void {
    const dependency: string = target.name;

    if (!this.container.has(dependency)) {
      this.container.set(dependency, instance);
    }
  }
}

export const Injectable = InjectorFactory(ServiceLocator.getInstance());
