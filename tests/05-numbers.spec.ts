// tests/05-numbers.md
import { z } from 'zod';
import { generateMock, getChecks, getMinMax } from '..';
import { describe, it, expect } from 'bun:test';

describe('Numbers', () => {
  it('generates a number greater than 5', () => {
    expect(generateMock(z.number().gt(5))).toBeGreaterThan(5);
  });

  it('generates a number greater than or equal to 5', () => {
    expect(generateMock(z.number().gte(5))).toBeGreaterThan(4);
  });

  it('generates a number less than 5', () => {
    expect(generateMock(z.number().lt(5))).toBeLessThan(5);
  });

  it('generates a number less than or equal to 5', () => {
    expect(generateMock(z.number().lte(5))).toBeLessThan(6);
  });

  it('generates an int', () => {
    expect(generateMock(z.number().int()).toString()).toMatch(/^[0-9]+$/);;
  });

  it.skip('generates a float', () => {
  });

  it('generates a positive number', () => {
    expect(generateMock(z.number().positive())).toBeGreaterThan(0);
  });

  it('generates a non-negative number', () => {
    expect(generateMock(z.number().nonnegative())).toBeGreaterThan(-1);
  });

  it('generates a negative number', () => {
    expect(generateMock(z.number().negative())).toBeLessThan(0);
  });

  it('generates a non-positive number', () => {
    expect(generateMock(z.number().nonpositive())).toBeLessThan(1);
  });

  it.skip('generates a multiple of a number', () => {
  });

  it.skip('generates a finite number', () => {
  });

  it('generates a safe number', () => {
    const { min, max } = getMinMax(getChecks(z.number().safe()));
    expect(min).toBe(Number.MIN_SAFE_INTEGER);
    expect(max).toBe(Number.MAX_SAFE_INTEGER);
  });
});
