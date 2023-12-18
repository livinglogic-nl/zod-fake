// tests/03-literals.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Literals', () => {
  it('returns exact literal for literal string', () => {
    expect(generateMock(z.literal('tuna'))).toBe('tuna');
  });
  it('returns exact literal for literal number', () => {
    expect(generateMock(z.literal(12))).toBe(12);
  });
  it('returns exact literal for literal bigint', () => {
    expect(generateMock(z.literal(2n))).toBe(2n);
  });
  it('returns exact literal for literal boolean', () => {
    expect(generateMock(z.literal(true))).toBe(true);
  });
  it('returns exact literal for literal symbol', () => {
    const symbol = Symbol('terrific');
    expect(generateMock(z.literal(symbol))).toBe(symbol);
  });
});
