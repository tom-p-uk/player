import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import { expect } from 'chai';
import Video from './Video';
import { beforeEach } from 'mocha';

describe('<Video />', () => {
    const onTimeUpdateStub = stub();
    const onLoadedDataStub = stub();

    beforeEach(() => {
        onTimeUpdateStub.resetHistory();
        onLoadedDataStub.resetHistory();
    });

    const props = {
        setRef: () => null,
        onKeyPress: () => null,
        onMouseOver: () => null,
        onMouseLeave: () => null,
        onTimeUpdate: onTimeUpdateStub,
        onLoadedData: onLoadedDataStub
    };

    it('calls `onTimeUpdate` with correct event object when `timeupdate` event occurs', () => {
        const event = { target: { currentTime: 50 } };
        const wrapper = shallow(<Video {...props} />);
        wrapper
            .find('[data-test-id="video-element"]')
            .simulate('timeupdate', event);

        const onTimeUpdateArg = onTimeUpdateStub.args[0][0];

        expect(onTimeUpdateArg).to.eql(event);
    });

    it('calls `onLoadedData` when `loadeddata` event occurs', () => {
        const wrapper = shallow(<Video {...props} />);
        wrapper.find('[data-test-id="video-element"]').simulate('loadeddata');

        expect(onLoadedDataStub.called).to.equal(true);
    });
});
