import { HttpRequest } from '@azure/functions';
import AuthController from '../../controller/AuthController';
import AuthService from '../../service/AuthService';
import { CustomError } from '../../utils/Error';

jest.mock('../../service/AuthService');

const MockedAuthService = AuthService as jest.Mock<AuthService>;

describe('Az-Authentication AuthController tests', () => {

    const request = {} as HttpRequest;

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        MockedAuthService.mockClear();
    });

    it('Should instance the auth service through class constructor.', () => {
        new AuthController(new AuthService());
        expect(MockedAuthService).toBeCalledTimes(1);
    });

    it('Should clean mock instance for each call.', () => {
        expect(MockedAuthService).not.toHaveBeenCalled();
        new AuthController(new AuthService());
        expect(MockedAuthService).toBeCalledTimes(1);
    });

    it('Should auth controller throw an exception if service fails', async () => {
        
        const authServiceAuthenticationMock = jest
        .spyOn(AuthService.prototype, 'authentication')
        .mockRejectedValue('something');
        
        try {
            await new AuthController(new AuthService()).authenticate(request);
            fail('Expected the error to be thrown');
        } catch (e) {
            expect(authServiceAuthenticationMock).toHaveBeenCalled();
            expect(e.message).toBe('Failed to authenticate request');
            expect(e instanceof CustomError).toBeTruthy();
            expect(e.statusCode).toBe(403);
        }
    });
});