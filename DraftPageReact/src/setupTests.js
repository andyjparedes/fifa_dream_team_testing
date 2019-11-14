import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// to run tests, npm test -- --coverage
configure({ adapter: new Adapter() });