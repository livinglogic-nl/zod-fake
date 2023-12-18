// tests/02-coercion-for-primitives.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Coercion for primitives', () => {
  it('generates a random string for coerced string', () => {
    const first = generateMock(z.coerce.string());
    expect(typeof(first)).toBe('string');
    expect(first.length).toBeGreaterThan(0);
  });

  it('generates a random number for coerced number', () => {
    const first = generateMock(z.coerce.number());
    expect(typeof(first)).toBe('number');
  });

  it('generates a random boolean for coerced boolean', () => {
    const first = generateMock(z.coerce.boolean());
    expect(typeof(first)).toBe('boolean');
  });

  it.skip('bigint is not supported', () => {
  });
  it.skip('date is not supported', () => {
  });
});
