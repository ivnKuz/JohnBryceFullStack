import { hashPassword } from "./crypto"
import { v4 } from "uuid";


describe('hashPassword function tests', ()=>{

    test('generates a valid md5', () => {
        const result = hashPassword(v4(), v4());
        
        expect(result).toBeDefined();
        expect(result.length).toBe(32);
        expect(result).toMatch(/^[a-f0-9]{32}$/gi);
        });
        
        test('generates the same hash for the same plain text password and salt', ()=>{
            const password = v4();
            const salt = v4();
            const hash1 = hashPassword(password, salt);
            const hash2 = hashPassword(password, salt);
            expect(hash1).toEqual(hash2);
        })

        test('generates a different hash for different password and salt', ()=> {
            const salt = v4();
            const hash1 = hashPassword(v4(), salt);
            const hash2 = hashPassword(v4(), salt);
            expect(hash1).not.toEqual(hash2);
        })
})
