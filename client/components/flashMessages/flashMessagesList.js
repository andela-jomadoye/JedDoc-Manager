import React from 'react';
import { connect } from 'react-redux';
import { deleteFlashMessage } from '../../actions/flashMessages'

class FlashMessageList extends React.Component {
  render () {
    const signupToast = this.props.messages.map(message => {
      const {id, type, text } = message;
      Materialize.toast(`${text}`, 4000)
      }
    );
    return (
      <div>
      { signupToast }
      </div>
    );
  }
}

FlashMessageList.propTypes = {
  messages: React.PropTypes.array.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
}
function mapStateToProps(state) {
 return {
   messages: state.flashMessages
 };
};

export default connect(mapStateToProps, { deleteFlashMessage })(FlashMessageList);