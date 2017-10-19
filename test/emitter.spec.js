const { describe, it } = require('mocha');
const { expect } = require('chai');
const Emitter = require('../dist/emitter');

describe('Emitter', () => {

  let em = new Emitter();
  let calls = [];

  it('should exist', () => {
    expect(Emitter).to.exist;
  });

  it('can be called with 1 argument', () => {
    expect(() => {
      em.on('foo');
    }).not.to.throw;
  });

  it('can be called with 2 arguments', () => {
    expect(() => {
      em.on('foo', (...args) => {
        calls.push(args);
      });
    }).not.to.throw;
  });

  it('successfully binds it', () => {
    expect(calls.length).to.equal(1);
  });
});
