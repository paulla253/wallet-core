import { Id } from './id.value-object';

describe('[Value-Object] Id', () => {
  it('should generate a valid UUID', () => {
    const id = new Id();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(id.value).toMatch(uuidRegex);
  });

  it('should expose the value through the getter', () => {
    const id = new Id();
    expect(typeof id.value).toBe('string');
    expect(id.value.length).toBeGreaterThan(0);
  });

  it('should generate different UUIDs for different instances', () => {
    const id1 = new Id();
    const id2 = new Id();
    expect(id1.value).not.toBe(id2.value);
  });
});
