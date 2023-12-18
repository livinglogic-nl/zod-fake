import { rand, string, int, bool, email, firstname, lastname, uuid, date } from 'snow-fake';

import { expand } from 'regex-to-strings';

const generateObject = (zodSchema) => {
  const result = {};
  Object.entries(zodSchema.shape).forEach(([name,zodSchema]) => {
    result[name] = generateMock(zodSchema);
  });
  return result;
}

const rand255 = () => Math.round(255*Math.random());

const ipv4 = () => {
  return [ rand255(), rand255(), rand255(), rand255() ].join('.');
}

const expandRegex = (regex) => 
  expand(regex).getIterator().next().value

const getMin = (checks) => {
  if(!checks.min) { return; }
  const { value, inclusive } = checks.min;
  return (inclusive === false) ? value + 1 : value;
}
const getMax = (checks) => {
  if(!checks.max) { return; }
  const { value, inclusive } = checks.max;
  return (inclusive === false) ? value - 1 : value;
}

const randRange = (min, max) => {
  const len = max-min;
  return min + Math.round(len*Math.random());
}


export const getChecks = (zodSchema) => {
  return zodSchema._def.checks?.reduce((a,v) => {
    return { ...a, [v.kind]: v };
  }, {}) ?? {};
}

export const getMinMax = (checks) => {
  let [min,max] = [getMin(checks), getMax(checks)];
  if(checks.length) {
    min = max = checks.length.value;
  }
  return {
    min,
    max,
  }
}


export const generateMock = (zodSchema) => {
  const checks = getChecks(zodSchema);
  const { min, max } = getMinMax(checks);

  switch(zodSchema._def.typeName) {
    case 'ZodString':
      if(checks.email) { return email(); }
      if(checks.uuid) { return uuid(); }
      if(checks.regex) {
        return expandRegex(checks.regex.regex);
      }
      if(checks.includes) {
        const s = string();
        const r = Math.floor(Math.random*s.length);
        return [
          s.substring(0,r),
          checks.includes.value,
          s.substring(r),
        ].join('');
      }
      if(checks.startsWith) { return checks.startsWith.value + string(); }
      if(checks.endsWith) { return string() + checks.endsWith.value; }
      if(checks.datetime) { return date(); }
      if(checks.ip) { return ipv4(); }
      return string({ min, max });
    case 'ZodNumber':
      return int({ min,max });
    case 'ZodBoolean': return bool();
    case 'ZodLiteral': return zodSchema.value;
    case 'ZodObject': return generateObject(zodSchema);
    case 'ZodEnum':
      return rand(zodSchema._def.values);
    case 'ZodOptional':
      if(Math.random() < 0.5) { return undefined; }
      return generateMock(zodSchema._def.innerType);

    case 'ZodNullable':
      if(Math.random() < 0.5) { return null; }
      return generateMock(zodSchema._def.innerType);
    case 'ZodArray':
      const { _def } = zodSchema;
      const arr = [];
      let minLength = _def.minLength?.value;
      let maxLength = _def.maxLength?.value;
      const exactLength = _def.exactLength?.value;
      if(exactLength) {
        minLength = maxLength = exactLength;
      } else {
        minLength = minLength ?? Math.min(0,maxLength ?? 1);
        maxLength = maxLength ?? Math.max(1,minLength);
      }
      const count = randRange(minLength,maxLength);
      for(let i=0; i<count; i++) {
        arr.push(generateMock(zodSchema._def.type));
      }
      return arr;

    case 'ZodUndefined': return undefined;
    case 'ZodNull': return null;
    case 'ZodVoid': return undefined;

  }
  console.log(zodSchema._def.typeName);
  return string();
}
