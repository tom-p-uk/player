import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Image from './Image';
import { createSandbox } from 'sinon';

const setElementGetBoundingClientRect = keyValPair => {
    const defaultReturnValue = {
        top: 100,
        bottom: 100,
        left: 100,
        right: 100
    };

    Element.prototype.getBoundingClientRect = () =>
        Object.assign(defaultReturnValue, keyValPair);
};

describe('<Image />', () => {
    const sandbox = createSandbox();
    const props = {
        id: '123',
        alt: '',
        className: '',
        setMovedListener: () => null
    };

    before(() => {
        sandbox.stub(window, 'innerHeight').value(100);
        sandbox.stub(window, 'innerWidth').value(100);
    });

    after(() => {
        sandbox.restore();
    });

    it('does not render img element when `top` val of wrapper div exceeds window.innerHeight', () => {
        setElementGetBoundingClientRect({ top: 200 });

        const wrapper = mount(<Image {...props} />);
        const imgElement = wrapper.find(`[data-test-id="image-${props.id}"]`);

        expect(imgElement.exists()).to.equal(false);
    });

    it('does not render img element when `bottom` val of wrapper div is less than 0', () => {
        setElementGetBoundingClientRect({ bottom: -1 });

        const wrapper = mount(<Image {...props} />);
        const imgElement = wrapper.find(`[data-test-id="image-${props.id}"]`);

        expect(imgElement.exists()).to.equal(false);
    });

    it('does not render img element when `left` val of wrapper div exceeds window.innerWidth', () => {
        setElementGetBoundingClientRect({ left: 200 });

        const wrapper = mount(<Image {...props} />);
        const imgElement = wrapper.find(`[data-test-id="image-${props.id}"]`);

        expect(imgElement.exists()).to.equal(false);
    });

    it('does not render img element when `right` val of wrapper div is less than 0', () => {
        setElementGetBoundingClientRect({ right: -1 });

        const wrapper = mount(<Image {...props} />);
        const imgElement = wrapper.find(`[data-test-id="image-${props.id}"]`);

        expect(imgElement.exists()).to.equal(false);
    });

    it('renders an image if all conditions are satisfied', () => {
        setElementGetBoundingClientRect();

        const wrapper = mount(<Image {...props} />);
        const imgElement = wrapper.find(`[data-test-id="image-${props.id}"]`);

        expect(imgElement.exists()).to.equal(true);
    });
});
