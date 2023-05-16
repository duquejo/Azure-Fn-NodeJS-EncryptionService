import { HttpRequest } from '@azure/functions';

export interface IAuthService {
    authentication: (req: HttpRequest) => Promise<any>,
    authorization: (req: HttpRequest) => Promise<any>,
}