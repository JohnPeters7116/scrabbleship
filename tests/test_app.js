import chai from 'chai'
import React from 'react'
import App from '../src/components/app'
import {shallow} from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let expect = chai.expect
describe("<App/>", ()=>{
    console.log('the app object', <App/>)
    "use strict";
    it('renders one <h1> tag', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('h1')).to.have.length(1)
    });
    it('title is ScrabbleShip', () => {
        const wrapper = shallow(<App/>);
        expect(wrapper.find('h1').text()).to.be.equal('ScrabbleShip')
    });
})