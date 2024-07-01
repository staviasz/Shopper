export class InvalidPasswordFormatError extends Error {
  constructor(message?: string) {
    super(
      'A senha deve ter o mínimo de 6 caracteres e conter letras maiúsculas e minúsculas, números e símbolos como ! @ # $ % & * =',
    );
    this.name = 'InvalidPasswordFormatError';
    if (message) this.message = message;
  }
}
