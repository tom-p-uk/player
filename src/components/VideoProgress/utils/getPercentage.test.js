import { expect } from 'chai';
import { getPercentage } from './getPercentage';

describe('getPercentage', () => {
    it('handles non-numerical `percentage` param', () => {
        expect(getPercentage(undefined, 200)).to.equal(0);
    });

    it('handles non-numerical `duration` param', () => {
        expect(getPercentage(50, {})).to.equal(0);
    });

    it('returns 0 if `num` > `total', () => {
        expect(getPercentage(101, 100)).to.equal(0);
    });

    it('returns the given number as a percentage of the given total', () => {
        expect(getPercentage(50, 200)).to.equal(25);
    });
});
