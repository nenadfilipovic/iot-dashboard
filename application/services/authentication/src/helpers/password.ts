import bcrypt from 'bcryptjs';

class Password {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
  static async compare(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(storedPassword, suppliedPassword);
  }
}

export { Password };
