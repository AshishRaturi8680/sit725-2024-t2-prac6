const { getAllPhones, addPhone } = require('../../models/mongoModel'); // Ensure this file exists and path is correct
const { MongoClient } = require('mongodb');
jest.mock('mongodb');

describe('Mongo Model', () => {
    let req, res;

    beforeAll(() => {
        req = { body: { brand: 'TestBrand', model: 'TestModel' } };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    it('should get all phones', async () => {
        MongoClient.prototype.db = jest.fn().mockReturnThis();
        MongoClient.prototype.collection = jest.fn().mockReturnValue({
            find: jest.fn().mockReturnThis(),
            toArray: jest.fn().mockResolvedValue([{ brand: 'TestBrand', model: 'TestModel' }]),
        });

        await getAllPhones(req, res);
        expect(res.json).toHaveBeenCalledWith({ statusCode: 200, data: [{ brand: 'TestBrand', model: 'TestModel' }], message: 'Get all phones successful' });
    });

    it('should add a phone', async () => {
        MongoClient.prototype.db = jest.fn().mockReturnThis();
        MongoClient.prototype.collection = jest.fn().mockReturnValue({
            insertOne: jest.fn().mockResolvedValue({ insertedId: '123' }),
        });

        await addPhone(req, res);
        expect(res.json).toHaveBeenCalledWith({ statusCode: 201, data: { insertedId: '123' }, message: 'Phone added successfully' });
    });
});
