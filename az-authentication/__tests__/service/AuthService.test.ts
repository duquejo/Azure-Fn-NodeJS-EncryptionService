import { HttpRequest } from '@azure/functions';
import AuthService from '../../service/AuthService';
import EncryptionService from '../../service/EncryptionService';
import { CustomError } from '../../utils/Error';

jest.mock('../../service/EncryptionService');

describe('Az-Authentication AuthService tests', () => {
    const request = {
        query: {},
        body: {},
        method: 'POST',
    } as HttpRequest;

    // Decryption service
    it('Should throw an exception if general request is malformed.', async () => {
        try {
            await new AuthService().authentication(request);
            fail('Expected the error to be thrown');
        } catch (e) {
            expect(e instanceof CustomError).toBeTruthy();
            expect(e.message).toBe('Malformed request');
            expect(e.statusCode).toBe(400);
        }
    });

        // Decryption service
        it('Should throw an exception if body request is malformed.', async () => {
            const { body, ...modRequest } = request;
            try {
                await new AuthService().authentication(modRequest);
                fail('Expected the error to be thrown');
            } catch (e) {
                expect(e instanceof CustomError).toBeTruthy();
                expect(e.message).toBe('Malformed request');
                expect(e.statusCode).toBe(400);
            }
        });

    it('Should throw an exception if decryption service fails.', async () => {
        request.body = {
            data: '12345'
        };

        const mockDecryptService = jest.fn().mockRejectedValue(jest.fn());
        EncryptionService.decrypt = mockDecryptService;

        try {
            await new AuthService().authentication(request);
            fail('Expected the error to be thrown');
        } catch (e) {
            expect(e instanceof CustomError).toBeTruthy();
            expect(e.message).toBe('Failed to decrypt payload');
            expect(e.statusCode).toBe(500);
        };

        mockDecryptService.mockClear();
    });

    it('Should return a successfull string from authentication method.', async () => {
        const expectedValue: string = 'it works!';
        request.body = {
            data: '12345'
        };
        const mockDecryptService = jest.fn().mockReturnValue(expectedValue);
        EncryptionService.decrypt = mockDecryptService;

        const result = await new AuthService().authentication(request);

        expect(result).toBe(expectedValue);

        mockDecryptService.mockClear();
    });

    // Encryption service
    it('should return something from encryption method', async () => {
        const result = await new AuthService().authorization(request);
        expect(result).toBe('it works!');
    });
});