// tests/08-booleans.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Booleans', () => {
  it('generates a boolean', () => {
    expect(typeof(generateMock(z.boolean()))).toBe('boolean');
  });
});
