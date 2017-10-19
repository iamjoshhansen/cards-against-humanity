export default class Emitter {

  private _callbacks:{[ev:string]:Array<(...args:Array<any>) => void>};

  constructor () {
    this._callbacks = {};
  }

  on (ev:string, cb:(...args:Array<any>) => void) : this {
    if ( ! (ev in this._callbacks)) {
      this._callbacks[ev] = [];
    }

    this._callbacks[ev].push(cb);

    return this;
  }

  off (ev:string) : this {
    if (ev in this._callbacks) {
      delete this._callbacks[ev];
    }

    return this;
  }

  emit (ev:string, ...args:Array<any>) : this {
    if (ev in this._callbacks) {
      this._callbacks[ev].forEach((cb) => {
        cb.apply(this, args);
      });
    }

    return this;
  }

}
