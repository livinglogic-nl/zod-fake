// tests/13-nullables.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Nullables', () => {
  it('generates null every now and then if schema is nullable', () => {
    const mocks = Array.from({length:10}).map(() => {
      return generateMock(z.string().nullable());
    });
    expect(mocks.filter(s => s === null).length).toBeGreaterThan(0);
    expect(mocks.filter(s => s !== null).length).toBeGreaterThan(0);
  });
});
