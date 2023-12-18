// tests/12-optionals.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Optionals', () => {
  it('generates undefined every now and then if schema is optional', () => {
    const mocks = Array.from({length:10}).map(() => {
      return generateMock(z.string().optional());
    });
    expect(mocks.filter(s => s === undefined).length).toBeGreaterThan(0);
    expect(mocks.filter(s => s !== undefined).length).toBeGreaterThan(0);
  });
});
