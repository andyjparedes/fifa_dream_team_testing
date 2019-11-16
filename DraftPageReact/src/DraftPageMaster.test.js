import React from 'react';
import ReactDOM from 'react-dom';
import DraftPageMaster from './DraftPageMaster';
import { shallow ,mount} from 'enzyme';
import DialogBox from './DraftPageMaster';

/** AG-Grid seems to have an issue with how jest uses the render() function
 * @see https://github.com/ag-grid/ag-grid/issues/3488
 * 
 */
it('renders without crashing', () => {
    const div = document.createElement('div');
    shallow(<DraftPageMaster/>);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('correctly pulls in JSON Data', () => {
    const div = document.createElement('div');
    const wrapper = shallow(<DraftPageMaster/>);
    expect(wrapper.state().rows).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Has a random player successfully loaded (Lionel Messi)', () => {
    const div = document.createElement('div');
    const expected = [{
		NAME: "Lionel Messi",
		CLUB: "FC Barcelona",
		LEAGUE: "Spain Primera Division",
		POSITION: "CF",
		TIER: "Gold",
		RATING: "94",
		PACE: "88",
		SHOOTING: "91",
		PASSING: "88",
		DRIBBLING: "96",
		DEFENDING: "32",
		PHYSICAL: "61",
		LOADDATE: "2018-09-19 12:10:05"
	}]
    const wrapper = shallow(<DraftPageMaster/>);
    expect(wrapper.state().rows).toEqual(expect.arrayContaining(expected));
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Drafting a Player successfully goes onto next team', () => {
    const div = document.createElement('div');
    const wrapper = shallow(<DraftPageMaster/>);
    const instance = wrapper.instance();
    expect(wrapper.state().pickNum).toBe(1);
    instance.handleConfirmDraft();
    expect(wrapper.state().pickNum).toBe(2);

    ReactDOM.unmountComponentAtNode(div);
  });
  it('Drafting a Player successfully goes onto next team', () => {
    const div = document.createElement('div');
    const wrapper = shallow(<DraftPageMaster/>);
    const instance = wrapper.instance();
    expect(wrapper.state().pickNum).toBe(1);
    instance.handleConfirmDraft();
    expect(wrapper.state().pickNum).toBe(2);

    ReactDOM.unmountComponentAtNode(div);
  });
  it('Drafting a Player,on the Last team, for normal draft successfully gets the next team', () => {
    const div = document.createElement('div');
    const wrapper = shallow(<DraftPageMaster/>);
    wrapper.setState({draftType:"normal"})
    const instance = wrapper.instance();
    expect(wrapper.state().curTeam).toBe(1);
    instance.handleConfirmDraft();
    expect(wrapper.state().curTeam).toBe(2);
    instance.handleConfirmDraft();
    instance.handleConfirmDraft();
    instance.handleConfirmDraft();
    instance.handleConfirmDraft();
    expect(wrapper.state().curTeam).toBe(6);
    instance.handleConfirmDraft();
    expect(wrapper.state().curTeam).toBe(1);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Drafting a Player,on the Last team, for normal draft successfullysgets the next team', () => {
    const div = document.createElement('div');
    const wrapper = shallow(<DraftPageMaster/>);
    wrapper.setState({draftType:"snake"})
    const instance = wrapper.instance();
    expect(wrapper.state().curTeam).toBe(1);
    instance.handleConfirmDraft();
    expect(wrapper.state().curTeam).toBe(2);
    instance.handleConfirmDraft();
    instance.handleConfirmDraft();
    instance.handleConfirmDraft();
    instance.handleConfirmDraft();
    expect(wrapper.state().curTeam).toBe(6);
    instance.handleConfirmDraft();
    expect(wrapper.state().curTeam).toBe(6);
    instance.handleConfirmDraft();
    expect(wrapper.state().curTeam).toBe(5);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Drafting a Player,on the Last team, for normal draft, Finishes the draft', () => {
    const div = document.createElement('div');
    const wrapper = shallow(<DraftPageMaster/>);
    wrapper.setState({pickNum:72})
    const instance = wrapper.instance();
    instance.handleConfirmDraft();
    ReactDOM.unmountComponentAtNode(div);

  });
  it('Drafting a Player,on the Last team, for normal draft, Finishes the draft', () => {
    const div = document.createElement('div');
    const expected = [{
		NAME: "Lionel Messi",
		CLUB: "FC Barcelona",
		LEAGUE: "Spain Primera Division",
		POSITION: "CF",
		TIER: "Gold",
		RATING: "94",
		PACE: "88",
		SHOOTING: "91",
		PASSING: "88",
		DRIBBLING: "96",
		DEFENDING: "32",
		PHYSICAL: "61",
		LOADDATE: "2018-09-19 12:10:05"
	}]
    const wrapper = shallow(<DraftPageMaster/>);
    wrapper.setState({dev:true});
    const instance = wrapper.instance();
    instance.componentDidMount();
    expect(wrapper.state().rows).toEqual(expect.arrayContaining(expected));
    ReactDOM.unmountComponentAtNode(div);
    ReactDOM.unmountComponentAtNode(div);

  });
  it('Drafting a Player,on the Last team, for normal draft successfullys gets the next team', () => {
    const div = document.createElement('div');
    const wrapper = mount(<DialogBox/>);
    const instance = wrapper.instance();
    instance.handleClose();
    instance.handleConfirmDraft();
    ReactDOM.unmountComponentAtNode(div);
  });

  