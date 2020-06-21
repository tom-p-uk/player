import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Player from './Player';

describe('<Player />', function() {
    it('renders Video component', () => {
        const wrapper = shallow(<Player />);
        const videoComponent = wrapper.find('Video');

        expect(videoComponent.exists()).to.equal(true);
    });

    it('renders PlayPause component', () => {
        const wrapper = shallow(<Player />);
        const playPauseComponent = wrapper.find('PlayPause');

        expect(playPauseComponent.exists()).to.equal(true);
    });

    it('renders VideoProgress component', () => {
        const wrapper = shallow(<Player />);
        const videoProgressComponent = wrapper.find('VideoProgress');

        expect(videoProgressComponent.exists()).to.equal(true);
    });
});
