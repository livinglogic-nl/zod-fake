// tests/00-basic-usage.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Basic usage', () => {
  it('generates a random string', () => {
    const first = generateMock(z.string());
    expect(typeof(first)).toBe('string');
    expect(first.length).toBeGreaterThan(0);

    const second = generateMock(z.string());
    expect(typeof(second)).toBe('string');
    expect(second.length).toBeGreaterThan(0);

    expect(first).not.toEqual(second);
  });

  it('generates an object with random values', () => {
    const zodSchema = z.object({
      username: z.string(),
    });
    const first = generateMock(zodSchema);
    expect(typeof(first)).toBe('object');
    expect(typeof(first.username)).toBe('string');

    const second = generateMock(zodSchema);
    expect(typeof(second)).toBe('object');
    expect(typeof(second.username)).toBe('string');
    expect(first.username).not.toEqual(second.username);
  });
});
