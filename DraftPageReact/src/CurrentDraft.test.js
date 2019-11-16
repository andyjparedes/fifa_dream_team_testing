import React from 'react';
import ReactDOM from 'react-dom';
import CurrentDraft from './CurrentDraft';
import { shallow ,mount} from 'enzyme';
import DraftPageMaster from './DraftPageMaster'

/** AG-Grid seems to have an issue with how test uses the render() function
 * @see https://github.com/ag-grid/ag-grid/issues/3488
 * 
 */
it('renders without crashing', () => {
    const div = document.createElement('div');
    shallow(<DraftPageMaster/>);
    ReactDOM.unmountComponentAtNode(div);
  });
 