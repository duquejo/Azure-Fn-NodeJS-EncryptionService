import { Context } from '@azure/functions';

import httpTrigger from '../index';

describe('AZ-Authentication Unit-tests', () => {
    const body = {
        data: 'Jkos7TJ/Ijt5Q4c6yD4lADpc7vp/gg8IvrNheKZ3mtcylEMr+9A6hJrG6/gTzqqenr+QP8DwIq827w3HKgcsqJ1SRC514q3wwkaNhgBDvHf/ow/k0IkFokVQb1hV6vwtdy6t/T1YHyxVFeFLF4jc35QA3UgsQ1H7hfTQc5ir5YliV5dwqFAu1jSBTsRZ3K0eO6aMY2B3ux9bqXE6e1Aqo5GQk0QGYgHWIlhFAiDEkbKWOcjNmGBH1lJYjvMtlGfnQw9PE0pGDqE52L+c3DhO7DLoWmopSctmcvgA7iRiTh5e+8mx1iSPDtzUhN+ObUivw5Z53RrnfZz1aerD4SFsOA=='
    };

    const decodedBody = {
        "name": "demo",
        "lastName": "demo",
        "phone": "1234567890"
    };

    let context: Context;
    beforeEach( () => {
        context = ({ log: jest.fn()} as unknown ) as Context;
    });

    // Authorization endpoint
    it('Should decode a valid payload and return status code 200', async() => {
        // Arrange
        const request = {
            query: {},
            method: 'POST',
            body
        };
        //Act
        await httpTrigger(context, request);
        // Assert
        expect(context.log).toBeCalledTimes(0);
        expect(context.res.status).toEqual(200);
        expect(context.res.body).toEqual(JSON.stringify(decodedBody));
    });

    it('Should fail if payload is malformed', async () => {
        // Arrange
        const request = {
            query: {},
            method: 'POST',
            body: {
                data: '12345',
            }
        };
        // Act
        await httpTrigger(context, request);
        // Assert
        expect(context.log).toBeCalledTimes(1);
        expect(context.res.status).toEqual(403);
        expect(context.res.body.message).toBe('Failed to authenticate request');
    });

    // Authorize endpoint
    it('Should authorize a request and return status code 200', async () => {
        // Arrange
        const request = {
            query: {},
            method: 'GET',
            body: {},
        };
        // Act
        await httpTrigger(context, request);
        // Assert
        expect(context.log).toBeCalledTimes(0);
        expect(context.res.status).toEqual(200);
    });
});