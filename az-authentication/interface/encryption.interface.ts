export abstract class IEncryptionService {
    static encrypt: (payload: string) => Promise<any>;
    static decrypt: (payload: string) => Promise<any>;
}