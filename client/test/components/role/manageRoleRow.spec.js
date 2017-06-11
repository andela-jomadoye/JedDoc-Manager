import expect from 'expect';
import React from 'react';
import {
  shallow,
} from 'enzyme';
import manageRoleRow from '../../../components/roles/manageRoleRow.jsx';

/**
 * This function setup the component
 *
 * @returns {object}
 */
function setup() {
  const props = {
    handleDelete: () => ({}),
    role: {
      id: 2,
      title: 'admin',
    },
  };

  return shallow(<manageRoleRow {...props} />);
}
describe('manageRoleRow', () => {
  const wrapper = setup();
  it('renders the role and its title and ID', () => {
    expect(wrapper.find('table').root.node.props.role.id).toBe(2);
    expect(wrapper.find('table').root.node.props.role.title).toBe('admin');
  });

  it('does not render footer, li, ul, h5, img, form, h1, h2, h4, row',
    () => {
      expect(wrapper.find('h3').length).toBe(0);
      expect(wrapper.find('footer').length).toBe(0);
      expect(wrapper.find('li').length).toBe(0);
      expect(wrapper.find('ul').length).toBe(0);
      expect(wrapper.find('h5').length).toBe(0);
      expect(wrapper.find('img').length).toBe(0);
      expect(wrapper.find('form').length).toBe(0);
      expect(wrapper.find('h1').length).toBe(0);
      expect(wrapper.find('h2').length).toBe(0);
      expect(wrapper.find('h4').length).toBe(0);
      expect(wrapper.find('row').length).toBe(0);
    });
});