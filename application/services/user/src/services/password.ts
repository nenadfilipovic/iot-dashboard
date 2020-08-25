import bcrypt from 'bcryptjs';

class Password {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
  static async compare(
    suppliedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(suppliedPassword, storedPassword);
  }
}

export { Password };
