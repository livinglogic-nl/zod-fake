// tests/14-objects.md
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('Objects', () => {
  it('generates an object with multiple fields', () => {
    const obj = generateMock(z.object({
      name: z.string(),
      age: z.number(),
    }));

    expect(typeof(obj.name)).toBe('string')
    expect(typeof(obj.age)).toBe('number')
  });

  it('generates an object from extended schema', () => {
    const obj = generateMock(z.object({
      name: z.string(),
      age: z.number(),
    }).extend({
        breed: z.string(),
      }))
    expect(typeof(obj.name)).toBe('string')
    expect(typeof(obj.age)).toBe('number')
    expect(typeof(obj.breed)).toBe('string')
  });

  it('generates an object from merged schema', () => {
    const obj = generateMock(z.object({
      students: z.array(z.string())
    }).merge(z.object({ id: z.string() })));

    expect(obj.students).toBeDefined();
    expect(obj.id).toBeDefined();
  });

  it('generates an object from picked/omitted schema', () => {
    const Recipe = z.object({
      id: z.string(),
      name: z.string(),
      ingredients: z.array(z.string()),
    });

    const picked = generateMock(Recipe.pick({ name: true }));
    expect(picked.name).toBeDefined();
    expect(picked.id).not.toBeDefined();
    expect(picked.ingredients).not.toBeDefined();

    const omitted = generateMock(Recipe.omit({ id: true }));
    expect(omitted.name).toBeDefined();
    expect(omitted.ingredients).toBeDefined();
    expect(omitted.id).not.toBeDefined();

  });

  it.skip('generates an object from partial schema', () => {
  });

  it.skip('generates an object from deepPartial schema', () => {
  });

  it.skip('generates an object from required schema', () => {
  });

  it.skip('generates an object from passthrough schema', () => {
  });

  it.skip('generates an object from strict schema', () => {
  });

  it.skip('generates an object from catchall schema', () => {
  });
});
