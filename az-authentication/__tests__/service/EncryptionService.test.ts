import EncryptionService from '../../service/EncryptionService';

jest.mock('../../service/AuthService');

describe('Az-Authentication EncryptionService tests', () => {

    let payload: string = '';

    it('Should return something from encrypt method', async () => {
        const logSpy = jest.spyOn(console, 'log');

        const encryptionService = await EncryptionService.encrypt(payload);
        
        expect(logSpy).toBeCalledTimes(1);
        expect(logSpy).toBeCalledWith('Method not settled');
        expect(encryptionService).toBe(payload);
    });
});