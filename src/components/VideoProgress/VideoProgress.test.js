import React from 'react';
import { mount, shallow } from 'enzyme';
import { stub } from 'sinon';
import { expect } from 'chai';
import { VideoProgress } from './VideoProgress';
import { getPercentage } from './utils/getPercentage';
import { convertPercentageToNumber } from './utils/convertPercentageToNumber';
import { getFormattedTime } from './utils/getFormattedTime';

describe('<VideoProgress />', () => {
    const skipToTimeStub = stub();

    afterEach(() => {
        skipToTimeStub.resetHistory();
    });

    const props = {
        currentTime: 100,
        duration: 200,
        isUiHidden: false,
        skipToTime: skipToTimeStub,
        isLoaded: true
    };

    it('renders null if `isLoaded` prop is false', () => {
        const wrapper = shallow(
            <VideoProgress {...{ ...props, isLoaded: false }} />
        );

        const videoProgressWrapper = wrapper.find(
            '[data-test-id="video-progress-wrapper"]'
        );

        expect(videoProgressWrapper.exists()).to.equal(false);
    });

    it('renders an input element with a value calulated from `currentTime` and `duration` props', () => {
        const wrapper = mount(<VideoProgress {...props} />);
        const inputValue = wrapper.find('input').instance().value;
        const percentage = getPercentage(props.currentTime, props.duration);

        expect(parseFloat(inputValue)).to.equal(percentage);
    });

    it('input onChange event handler triggers a call of `skipToTime` with argument derived from event object and `duration` prop', () => {
        const percentage = 75;
        const wrapper = shallow(<VideoProgress {...props} />);
        wrapper
            .find('input')
            .simulate('change', { target: { value: percentage } });

        const numberFromPercentage = convertPercentageToNumber(
            percentage,
            props.duration
        );

        const args = skipToTimeStub.args[0];

        expect(args.includes(numberFromPercentage)).to.equal(true);
    });

    it('is hidden from view (opacity: 0) when `isUiHidden` prop is true', () => {
        const wrapper = shallow(
            <VideoProgress {...{ ...props, isUiHidden: true }} />
        );

        const { className } = wrapper
            .find('[data-test-id="video-progress-wrapper"]')
            .get(0).props;

        expect(className.includes('hidden')).to.equal(true);
    });

    it('is displayed (opacity: 1) when `isUiHidden` prop is false', () => {
        const wrapper = shallow(
            <VideoProgress {...{ ...props, isUiHidden: false }} />
        );

        const { className } = wrapper
            .find('[data-test-id="video-progress-wrapper"]')
            .get(0).props;

        expect(className.includes('hidden')).to.equal(false);
    });

    it('renders a span element containing `currentTime` as a formatted string', () => {
        const wrapper = shallow(<VideoProgress {...props} />);
        const currentValueText = wrapper
            .find('[data-test-id="current-time"]')
            .text();

        expect(currentValueText).to.equal(getFormattedTime(props.currentTime));
    });

    it('renders a span element containing `duration` as a formatted string', () => {
        const wrapper = shallow(<VideoProgress {...props} />);
        const durationText = wrapper.find('[data-test-id="duration"]').text();

        expect(durationText).to.equal(getFormattedTime(props.duration));
    });
});
