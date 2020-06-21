import { expect } from 'chai';
import { getFormattedTime } from './getFormattedTime';

describe('getFormattedTime', () => {
    it('handles non-numerical param', () => {
        expect(getFormattedTime(null)).to.equal('');
    });

    it('returns string with hours, mins and secs separated by colons', () => {
        expect(getFormattedTime(300).split(':').length).to.equal(3);
    });

    it('zero pads hours, mins or secs if they are single digit numbers', () => {
        expect(getFormattedTime(4000).split(':')[0]).to.equal('01');
    });

    it('returns correctly formatted string', () => {
        expect(getFormattedTime(5722)).to.equal('01:35:22');
    });
});
