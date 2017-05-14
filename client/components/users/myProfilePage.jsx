import React from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../actions/userAction';
import * as loginAction from '../../actions/loginActions';
import { deleteFlashMessage } from '../../actions/flashMessages';

class myProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadUserProfile(this.props.userId);
    this.state = {
      user: this.props.user,
      isUpdateingUser: true,
      showSubmitButton: false,
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
    this.setupUpdateUser = this.setupUpdateUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  updateUserState(event) {
    const field = event.target.name;
    const user = Object.assign({}, this.state.user);
    user[field] = event.target.value;
    return this.setState({
      user,
    });
  }
  updateUserProfile(event) {
    event.preventDefault();
    this.setState({ isUpdateingUser: true, showSubmitButton: false });
    this.props.updateUserProfile(this.state.user, this.props.user.id);
    this.props.deleteFlashMessage(1);
    // this.context.router.push('/courses');
  }
  setupUpdateUser(event) {
    event.preventDefault();
    this.setState({ isUpdateingUser: false, showSubmitButton: true });
    // this.context.router.push('/courses');
  }
  handleDelete(event) {
    event.preventDefault();
    this.props.deleteUserAccount(this.props.userId);
    this.props.logout();
  }
  render() {
    const { isUpdateingUser, showSubmitButton } = this.state;
    const disabled = isUpdateingUser;
    return (
      <div>
        <div className="container center-align">
          <h1>{this.props.user.fullname}, welcome to your profile page</h1>
          <hr />
          <div className="row">
            <form className="col s8 offset-s2" onSubmit={this.updateUserProfile}>
              <div className="row">
                <div className="input-field">
                  <input disabled={disabled} onChange={this.updateUserState} name="fullname" value={this.state.user.fullname} id="first_name" type="text" className="validate"/>
                  <label className="active" htmlFor="first_name">Full Name</label>
                </div>
                <div className="input-field">
                  <input disabled={disabled} onChange={this.updateUserState} name="username" value={this.state.user.username} id="last_name" type="text" className="validate"/>
                  <label className="active" htmlFor="last_name">UserName</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field">
                  <input disabled={disabled} onChange={this.updateUserState} name="password" value={this.state.user.password} id="password" type="password" className="validate"/>
                  <label className="active" htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field">
                  <input disabled={disabled} onChange={this.updateUserState} name="email" value={this.state.user.email} id="email" type="email" className="validate"/>
                  <label className="active" htmlFor="email">Email</label>
                </div>
              </div>
              <div>
                {!showSubmitButton && <button onClick={this.setupUpdateUser}className="btn waves-effect waves-light" name="action">Edit User
                  <i className="material-icons right">send</i>
                </button>}
                  {showSubmitButton && <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                  </button>}
                  <button className="btn waves-effect waves-light" onClick={this.handleDelete} name="action">Delete User
                    <i className="material-icons right">delete_forever</i>
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

myProfilePage.propTypes = {
  updateUserProfile: React.PropTypes.func.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired,
  loadUserProfile: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired,
  userId: React.PropTypes.number.isRequired,
  deleteUserAccount: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
};

myProfilePage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

/**
 * mapStateToProps
 *
 * @param {any} state
 * @returns {object} state
 */
function mapStateToProps(state) {
  const hasUserDetailsProperty = Object.prototype.hasOwnProperty
    .call(state.user, 'userDetails');
  if (hasUserDetailsProperty) {
    return {
      userId: state.login.user.id,
      user: state.user.userDetails,
    };
  }
  return {
    userId: state.login.user.id,
    user: state.login.user,
  };
}

/**
 * mapDispatchToProps
 *
 * @param {any} dispatch
 * @returns dispatch
 */
function mapDispatchToProps(dispatch) {
  return {
    loadUserProfile: userId => dispatch(userAction.loadUserProfile(userId)),
    logout: () => dispatch(loginAction.logout()),
    updateUserProfile: (user, userId) =>
      dispatch(userAction.updateUserProfile(user, userId)),
    deleteFlashMessage: a => dispatch(deleteFlashMessage(a)),
    deleteUserAccount: userId => dispatch(userAction.deleteUserAccount(userId)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(myProfilePage);