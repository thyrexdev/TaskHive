import { hashPassword, verifyPassword } from '../../src/utils/password';

describe('password utils', () => {
  it('hashes and verifies correctly', async () => {
    const plain = 'my-secret-123!';
    const hashed = await hashPassword(plain);
    expect(typeof hashed).toBe('string');
    const ok = await verifyPassword(hashed, plain);
    expect(ok).toBe(true);

    const bad = await verifyPassword(hashed, 'wrong');
    expect(bad).toBe(false);
  });
});
