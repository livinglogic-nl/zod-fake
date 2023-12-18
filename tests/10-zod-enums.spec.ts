// tests/10-zod-enums.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Zod enums', () => {
  it('generates one of the zod enum values', () => {
    expect(generateMock(z.enum(['Salmon', 'Tuna', 'Trout']))).toMatch(/Salmon|Tuna|Trout/);
  });
});
