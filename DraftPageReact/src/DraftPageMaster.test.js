import React from 'react';
import ReactDOM from 'react-dom';
import DraftPageMaster from './DraftPageMaster';
/** AG-Grid seems to have an issue with how jest uses the render() function
 * @see https://github.com/ag-grid/ag-grid/issues/3488
 * 
 */
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DraftPageMaster/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });