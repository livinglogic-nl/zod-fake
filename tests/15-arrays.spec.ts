// tests/15-arrays.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Arrays', () => {
  it('generates an array with 0 or 1 items', () => {
    const mocks = Array.from({length:10}).map(() => {
      return generateMock(z.string().array());
    });

    const noItems = mocks.find(arr => arr.length === 0);
    expect(Array.isArray(noItems)).toBe(true);
    expect(noItems.length).toBe(0);

    const oneItem = mocks.find(arr => arr.length === 1);
    expect(Array.isArray(oneItem)).toBe(true);
    expect(oneItem.length).toBe(1);
  });

  it('generates an array with 1 item', () => {
    const oneItem = generateMock(z.string().array().nonempty());
    expect(Array.isArray(oneItem)).toBe(true);
    expect(oneItem.length).toBe(1);
  });

  it('generates an array with at least 5 items', () => {
    const fiveItems = generateMock(z.string().array().min(5));
    expect(Array.isArray(fiveItems)).toBe(true);
    expect(fiveItems.length).toBe(5);
  });

  it('generates an array with at most 5 items', () => {
    const fiveItems = generateMock(z.string().array().max(5));
    expect(Array.isArray(fiveItems)).toBe(true);
    expect(fiveItems.length).toBeLessThan(6);
  });

  it('generates an array with exactly 5 items', () => {
    const fiveItems = generateMock(z.string().array().length(5));
    expect(Array.isArray(fiveItems)).toBe(true);
    expect(fiveItems.length).toBe(5);
  });

  it.skip('generates an array with optionals', () => {
  });

  it.skip('optionally generates an array', () => {
  });

});
