import { expect } from 'chai';
import { convertPercentageToNumber } from './convertPercentageToNumber';

describe('convertPercentageToNumber', () => {
    it('handles non-numerical `percentage` param', () => {
        expect(convertPercentageToNumber('fifty', 200)).to.equal(0);
    });

    it('handles non-numerical `total` param', () => {
        expect(convertPercentageToNumber(50, null)).to.equal(0);
    });

    it('returns 0 if `percentage` > 100', () => {
        expect(convertPercentageToNumber(101, 200)).to.equal(0);
    });

    it('returns a number equivalent to a percentage of the given total', () => {
        expect(convertPercentageToNumber(50, 200)).to.equal(100);
    });
});
