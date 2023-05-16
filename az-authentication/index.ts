import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import AuthController from './controller/AuthController';
import AuthService from './service/AuthService';
import constants from './utils/constants';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    const authController = new AuthController(new AuthService());

    let result: any;
    try {
        if( req.method === 'POST' ) {
            result = await authController.authenticate(req);
        } else {
            result = await authController.authorize(req);
        }
        context.res = {
            status: 200,
            headers: constants.HEADERS,
            body: result,
        };
    } catch (ex: any) {
        context.log('Exception ocurred while listening auth', ex);
        context.res = {
            status: ex.statusCode,
            headers: constants.HEADERS,
            body: {
                message: ex.message,
                code: ex.statusCode,
            },
        };
    }
};

export default httpTrigger;