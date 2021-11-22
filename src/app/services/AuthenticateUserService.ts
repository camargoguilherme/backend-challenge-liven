import AppError from '../../errors/AppError';

class AuthenticateUserService {
  public async execute(username: string, password: string) {
    try {
      return null;
    } catch (error) {
      throw new AppError(error.message, error.data.status || 500);
    }
  }
}

export default new AuthenticateUserService();
