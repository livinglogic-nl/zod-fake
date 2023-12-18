// tests/04-strings.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Strings', () => {
  it('generates a string no longer than max characters', () => {
    expect(generateMock(z.string().max(5)).length).toBeLessThan(6);
  });

  it('generates a string no less than min characters', () => {
    expect(generateMock(z.string().min(5)).length).toBeGreaterThan(4);
  });

  it('generates a string of exactly length characters', () => {
    expect(generateMock(z.string().length(5)).length).toBe(5);
  });

  it('generates an email string', () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    expect(generateMock(z.string().email())).toMatch(emailRegex);
  });

  it.skip('generates an url string', () => {
  });

  it.skip('generates an emoji string', () => {
  });

  it('generates a uuid string', () => {
    const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
    expect(generateMock(z.string().uuid())).toMatch(uuidRegex);
  });

  it.skip('cuid is not supported', () => {
  });

  it.skip('cuid2 is not supported', () => {
  });

  it.skip('ulid is not supported', () => {
  });

  it('generates a string compatible with a regex', () => {
    const regex = /[A-z]{3}-[0-9]{3}/;
    expect(generateMock(z.string().regex(regex))).toMatch(regex);
  });

  it('generates a string including a string', () => {
    expect(generateMock(z.string().includes('fantastic'))).toMatch(/fantastic/);
  });

  it('generates a string including a string', () => {
    expect(generateMock(z.string().includes('fantastic'))).toMatch(/fantastic/);
  });

  it('generates a string starting with a string', () => {
    expect(generateMock(z.string().startsWith('https://'))).toMatch(/^https:\/\//);
  });

  it('generates a string ending with a string', () => {
    expect(generateMock(z.string().endsWith('.com'))).toMatch(/\.com$/);
  });

  it('generates a datetime string', () => {
    const dateTimeRegex =
      /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.?[0-9]*Z/
    expect(generateMock(z.string().datetime())).toMatch(dateTimeRegex);
  });

  it.skip('generates a datetime string with exact ms precision', () => {
  });
  it.skip('generates a datetime string with timezone offset (instead of Z)', () => {
  });

  it('generates an ipv4', () => {
    const ipRegex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;
    expect(generateMock(z.string().ip())).toMatch(ipRegex);
  });
  it.skip('generates an ipv6', () => {
  });
});


