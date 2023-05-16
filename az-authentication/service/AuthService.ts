
import { HttpRequest } from '@azure/functions';
import { IAuthService } from '../interface/auth.interface';
import EncryptionService from './EncryptionService';
import { CustomError } from '../utils/Error';

export default class AuthService implements IAuthService {

    public async authentication(req: HttpRequest) {
        if( ! req.body?.data ) {
            throw new CustomError('Malformed request', 400 );
        }

        const payload = JSON.stringify(req.body.data);
        try {
            return await EncryptionService.decrypt(payload);
        } catch (error) {
            throw new CustomError('Failed to decrypt payload');
        }
    };
    
    public async authorization(req: HttpRequest) {
        return 'it works!';
    };
}