import { modelFactory } from './createNextRailState';
import { expect } from 'chai';

describe('createRailState model factory', () => {
    let model;

    before(() => {
        model = modelFactory();
        model.viewportWidth = 299;
        model.tileWidths = [100, 100, 100, 100];
    });

    describe('when its `nextIndex` getter method is called', () => {
        it('it increments its index until the calculated offet value is greater than or equal to the screen width property', () => {
            model.index = 0;

            expect(model.nextIndex).to.equal(2);
        });
    });

    describe('when its `prevIndex` getter method is called', () => {
        it('it decrements its index until the calculated offet value is greater than or equal to the screen width property', () => {
            model.index = 3;

            expect(model.prevIndex).to.equal(1);
        });
    });
});
