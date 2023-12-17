import { string, int, bool, email, firstname, lastname, uuid, date } from 'snow-fake';

const getRandomValue = (name, zodDef) => {
  const { _def } = zodDef;
  const { checks, typeName } = _def;

  const getCheck = (kind) => checks.find(c => c.kind === kind);

  if(typeName === 'ZodString') {
    if(name.match(/firstname/i)) { return firstname(); }
    if(name.match(/lastname/i)) { return lastname(); }
    if(name.match(/uuid/i) || getCheck('uuid')) { return uuid(); }
    if(name.match(/email/i) || getCheck('email')) { return email(); }

    const min = getCheck('min')?.value;
    const max = getCheck('max')?.value;
    return string({ min, max });
  }
  if(typeName === 'ZodNumber') {
    const min = getCheck('min')?.value;
    const max = getCheck('max')?.value;
    return int({ min, max });
  }
  if(typeName === 'ZodBoolean') { return bool(); }
  if(typeName === 'ZodDate') { return date() };
  return string();
}

export const generateMock = (zodSchema) => {
  const result = {};
  Object.entries(zodSchema.shape).forEach(([name,obj]) => {
    result[name] = getRandomValue(name,obj);
  });
  return result;
}
