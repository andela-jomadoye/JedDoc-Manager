import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import * as RoleActions from '../../actions/roleActions';
import ManageRoleRow from '../roles/manageRoleRow.jsx';
import { deleteFlashMessage } from '../../actions/flashMessages';
import ManageRoleTableHead from './manageRoleTableHead.jsx';

class manageRolesPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * This method runs when the component mounts
   *
   *
   * @memberof manageRolesPage
   */
  componentWillMount() {
    this.props.loadUserRoles();
  }

  /**
   * This method deletes a role
   *
   * @param {number} roleId
   *
   * @memberof manageRolesPage
   */
  handleDelete(roleId) {
    event.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this role!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false,
    },
    () => {
      this.props.DeleteUserRoles(roleId);
      this.props.deleteFlashMessage(1);
      swal('Deleted!', 'This document has been deleted.', 'success');
    });
  }
  render() {
    const { roles } = this.props;
    return (
      <div className="container">
        <h1> welcome to manage role page for Admin</h1>
        <table className="striped">
          <ManageRoleTableHead />
        <tbody>
        {roles && roles.map(role => <ManageRoleRow
          handleDelete={this.handleDelete}
          key={role.id}
          role={role}/>,
        )}
        </tbody>
      </table>
      </div>
    );
  }
}

manageRolesPage.propTypes = {
  loadUserRoles: PropTypes.func.isRequired,
  roles: PropTypes.array,
  roleId: PropTypes.number,
  DeleteUserRoles: PropTypes.func.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired,
};

/**
 * The function maps dispatch to props
 *
 * @param {function} dispatch
 * @returns dispatch
 */
function mapDispatchToProps(dispatch) {
  return {
    loadUserRoles: () => dispatch(RoleActions.loadUserRoles()),
    DeleteUserRoles: roleId => dispatch(RoleActions.DeleteUserRoles(roleId)),
    deleteFlashMessage: a => dispatch(deleteFlashMessage(a)),
  };
}

/**
 * This function maps state to props
 *
 * @param {object} state
 * @returns {object}
 */
function mapStateToProps(state) {
  return {
    roles: state.role.allRoles,
  };
}
export default
  connect(mapStateToProps, mapDispatchToProps)(manageRolesPage);
