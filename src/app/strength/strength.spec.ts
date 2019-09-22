import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe', () => {

    it('sould display week if the number is 5', () =>{
        let pipe = new StrengthPipe();

        let value = pipe.transform(5);

        expect(value).toEqual('5 (weak)');
    });

    it('sould display strong if the number is 10', () =>{
        let pipe = new StrengthPipe();

        let value = pipe.transform(10);

        expect(value).toEqual('10 (strong)');
    });

    it('sould display unbelievable if the number is 20', () =>{
        let pipe = new StrengthPipe();

        let value = pipe.transform(20);

        expect(value).toEqual('20 (unbelievable)');
    })
})