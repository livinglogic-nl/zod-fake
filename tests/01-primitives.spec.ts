// tests/01-primitives.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';


const generateUntil = (schema, variations) => {
  const results:any[] = [];
  const todo = variations.map((func,i) => ({ func,i }));
  for(let i=0; i<100; i++) {
    const result = generateMock(schema);

    const done = todo.find((v) => v.func(result));
    if(done) {
      results[done.i] = result;
      todo.splice(todo.indexOf(done),1);
      if(todo.length === 0) {
        return results;
      }
    }
  }
  throw Error('generateUntil did not satisfy all variations within 100 increments');
}


describe('Primitives', () => {
  it('most primitives are tested in their respective files', () => {
  });

  it('generates undefined', () => {
    expect(generateMock(z.undefined())).toBe(undefined);
  });

  it('generates null', () => {
    expect(generateMock(z.null())).toBe(null);
  });
  it('generates undefined for type void', () => {
    expect(generateMock(z.void())).toBe(undefined);
  });

  it('any returns a string or undefined', () => {
    const [anyString, anyUndefined] = generateUntil([
      (v) => typeof(v) === 'string',
      (v) => v === undefined;
    ]);



  });

  it.skip('unknown returns a string or undefined', () => {
  });

  it.skip('never', () => {
  });
});


