import fs from 'fs';
const docs = fs.readFileSync('zod-readme.md').toString();

let lines = docs.split('\n');


const firstSection = '## Basic usage';
const lastSection = '## Guides and concepts';

let started = false;

let group = null;
const groups = [];

lines.forEach((line,i) => {
  if(!line.startsWith('## ')) { return; }
  if(line === firstSection) { started = true; }
  if(!started) { return; }

  if(group) { group.end = i-1; }
  if(line === lastSection) {
    started = false;
    return;
  }

  group = { name: line.substring(3), start: i }
  groups.push(group);
});

groups.forEach((group,i) => {
  const { name, start, end } = group;

  const prefix = i.toString().padStart(2,'0');

  const content = lines.slice(start, end).join('\n');
  const file = prefix+ '-' + name.toLowerCase().replace(/ /g,'-')+'.md';
  fs.writeFileSync(file, content);

  const testFile = file.replace('.md','.spec.ts');

  fs.writeFileSync(testFile, `
// tests/${file}
import { z } from 'zod';
import { generateMock } from '..';
import { describe, it, expect } from 'bun:test';

describe('${name}', () => {
  it('it works', () => {
    expect(1).toBe(1);
  });
});
  `.trim());

});
