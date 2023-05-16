import * as fs from 'fs/promises';
import * as path from 'path';
import * as forge from 'node-forge';

import { IEncryptionService } from '../interface/encryption.interface';
import { CustomError } from '../utils/Error';

export default class EncryptionService extends IEncryptionService {

    public static async encrypt(payload: string): Promise<string> {
        console.log('Method not settled');
        return payload;
    };

    public static async decrypt(payload: string): Promise<string> {
        try{
            const privateKeyPem = await fs.readFile(
                path.resolve(process.cwd(), '.', 'az-authentication', 'keys', 'private.pem'),
                'utf-8'
            );
            const privateKeyForge = forge.pki.privateKeyFromPem(privateKeyPem);
            const decodedPayload = forge.util.decode64(payload);
            return privateKeyForge.decrypt(decodedPayload);
        }catch(error) {
            throw new CustomError(error, 400);
        }
    };
}