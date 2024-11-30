import { formatCurrency } from "../../utils/money.js";


describe('formatCurrency()', () => {
    it('Converts cents to dollars', () => {
        expect(formatCurrency(2045)).toEqual('20.45');
    }),
        
        it('Converts cents to dollars with two decimal places', () => {
            expect(formatCurrency(2046.67)).toEqual('20.47');

        });
    it('Works with zero', () => {
        expect(formatCurrency(2000)).toEqual('20.00')
    })
})
    


