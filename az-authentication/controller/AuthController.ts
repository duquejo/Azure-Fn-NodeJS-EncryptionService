import { HttpRequest } from '@azure/functions';
import { IAuthService } from '../interface/auth.interface';
import { CustomError } from '../utils/Error';


export default class AuthController {

    private readonly authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async authenticate (req: HttpRequest) {
        try {
            return await this.authService.authentication(req);
        } catch (error) {
            throw new CustomError('Failed to authenticate request', 403);
        }
    }

    async authorize (req: HttpRequest) {
        return this.authService.authorization(req);
    }
}