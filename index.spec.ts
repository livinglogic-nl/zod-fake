import { z } from 'zod';
import { test, expect } from 'bun:test';

import { generateMock } from '.';

test('object with firstname returns an object with a string', () => {
  const mock = generateMock(z.object({
    firstname: z.string(),
  }));
  expect(typeof(mock.firstname)).toBe('string');
});

test('object with lastname returns an object with a string', () => {
  const mock = generateMock(z.object({
    lastname: z.string(),
  }));
  expect(typeof(mock.lastname)).toBe('string');
});


test('object with description returns an object with a string', () => {
  const mock = generateMock(z.object({
    description: z.string(),
  }));
  expect(typeof(mock.description)).toBe('string');
});

test('object with description min 20 chars returns an object with a string of min 20 chars', () => {
  const mock = generateMock(z.object({
    description: z.string().min(20),
  }));
  expect(typeof(mock.description)).toBe('string');
  expect(mock.description.length).toBeGreaterThan(19);
});

test('object with description max 20 chars returns an object with a string of max 20 chars', () => {
  const mock = generateMock(z.object({
    description: z.string().min(20).max(20),
  }));
  expect(typeof(mock.description)).toBe('string');
  expect(mock.description.length).toBe(20);
});

test('object with email type returns an object with an email', () => {
  const mock = generateMock(z.object({
    email: z.string().email(),
  }));
  expect(mock.email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
});

test('object with email field returns an object with an email', () => {
  const mock = generateMock(z.object({
    email: z.string(),
  }));
  expect(mock.email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
});

test('object with age returns an object with a number', () => {
  const mock = generateMock(z.object({
    age: z.number(),
  }));
  expect(typeof(mock.age)).toBe('number');
});

test('object with age with a range returns an object with a number in range', () => {
  const mock = generateMock(z.object({
    age: z.number().min(20).max(21),
  }));
  expect(mock.age).toBeGreaterThan(19);
  expect(mock.age).toBeLessThan(22);
});

test('object with enabled returns an object with a boolean', () => {
  const mock = generateMock(z.object({
    enabled: z.boolean(),
  }));
  expect(typeof(mock.enabled)).toBe('boolean');
});

test('object with uuid type returns an object with an uuid', () => {
  const mock = generateMock(z.object({
    uuid: z.string().uuid(),
  }));
  expect(mock.uuid).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);
});

test('object with uuid field returns an object with an uuid', () => {
  const mock = generateMock(z.object({
    uuid: z.string(),
  }));
  expect(mock.uuid).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/);
});

test('object with date type returns an object with a iso date string', () => {
  const mock = generateMock(z.object({
    created: z.date(),
  }));
  expect(mock.created).toMatch(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}Z/);
});
