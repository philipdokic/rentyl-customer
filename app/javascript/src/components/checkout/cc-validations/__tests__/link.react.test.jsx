import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Link from '../link';

configure({ adapter: new Adapter() });

test('Link renders properly', () => {
  const googleLink = renderer.create(
    <Link to="http://www.google.com">Google</Link>
  );
  const googleTree = googleLink.toJSON();

  expect(googleTree).toMatchSnapshot();
});

test('Link correctly parses internal vs external links', () => {
  const googleInstance = shallow(<Link to="http://www.google.com" />)
    .instance()
    .render();
  const listingsInstance = shallow(<Link to="/listings" />)
    .instance()
    .render();
  const homeInstance = shallow(<Link to="/" />)
    .instance()
    .render();

  expect(googleInstance.type).toBe('a');
  expect(googleInstance.props.href).toBe('http://www.google.com');
  expect(listingsInstance.type).not.toBe('a');
  expect(listingsInstance.props.to).toBe('/listings');
  expect(homeInstance.type).not.toBe('a');
  expect(homeInstance.props.to).toBe('/');
});

test('Link removes hostname from internal links to correctly use react router', () => {
  const linkInstance = shallow(
    <Link to={`http://${window.location.hostname}/locations`} />
  )
    .instance()
    .render();

  expect(linkInstance.props.to).toBe('/locations');
});
