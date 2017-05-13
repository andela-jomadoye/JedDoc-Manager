import React from 'react';
import { connect } from 'react-redux';
import * as DocumentAction from '../../actions/documentAction';
import { deleteFlashMessage } from '../../actions/flashMessages';

class DashboardDocumentView extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleView = this.handleView.bind(this);
  }
  componentDidMount() {
    $('.modal').modal();
  }

  handleView(event) {
    const docID = this.props.document.id;
    const modal = `#viewDocument${docID}`;
    // let siblings = $(this).siblings(modal);
    // console.log(siblings);

    // console.log(event);
    $(modal).modal('open');
     // $(this).siblings(modal).modal('open');;
  }

  handleDelete() {
    event.preventDefault();
    let myindex;
    const documentId = this.props.document.id;
    this.props.deleteDocument(documentId);
    this.props.deleteFlashMessage(1);
    const documents = this.props.MyDocuments.map(a => Object.assign({}, a));
    documents.forEach((document, index) => {
      if (document.id === documentId) {
        myindex = index;
      }
    });
    documents.splice(myindex, 1);
    this.setState({ MyDocuments: documents });
  }

  render() {
    const { document, myDocument, readOnly } = this.props;
    const viewDocument = '#viewDocument';
    const link = '#modal1';
    return (
    <div>
      <div className="col s3">
      {myDocument && <div>
        <a className=" modal-trigger btn-floating btn-small waves-effect waves-light red" onClick={this.handleView} key={document.id}><i className="material-icons">visibility</i></a>
          &nbsp;&nbsp;
            <a className="btn-floating btn-small waves-effect waves-light red" onClick={this.handleDelete}><i className="material-icons">delete</i></a>
          &nbsp;&nbsp;
          <a className="btn-floating btn-small waves-effect waves-light red" href={link}><i className="material-icons">mode_edit</i></a>
          <div id={`viewDocument${document.id}`} className="modal modal-fixed-footer">
            <div className="modal-content">
              <h4 className="center-align">{document.title}</h4>
              <hr />
              <p>{document.body}</p>
              <h4>Author: {document.User.fullname}</h4>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
            </div>
          </div>
        </div>
      }
        {readOnly &&
        <div>
          <a className=" modal-trigger btn-floating btn-small waves-effect waves-light red" onClick={this.handleView} key={document.id}><i className="material-icons">visibility</i></a>
          <div id={`viewDocument${document.id}`} className="modal modal-fixed-footer">
            <div className="modal-content">
              <h4 className="center-align">{document.title}</h4>
              <hr />
              <p>{document.body}</p>
              <h4>Author: {document.User.fullname}</h4>
            </div>
            <div className="modal-footer">
              <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
            </div>
          </div>
        </div>}
        <div className="card small">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src="http://materializecss.com/images/office.jpg" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{ document.title }</span>
            <span className="">Author: { document.User.fullname }</span>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{ document.title }<i className="material-icons right">close</i></span>
            <p>{`${document.body.substring(0, 150)}...`}</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

DashboardDocumentView.propTypes = {
  document: React.PropTypes.object.isRequired,
  myDocument: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  deleteDocument: React.PropTypes.func.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired,
  MyDocuments: React.PropTypes.array.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    deleteDocument: documentId => dispatch(DocumentAction.deleteDocument(documentId)),
    deleteFlashMessage: a => dispatch(deleteFlashMessage(a)),
  };
}

function mapStateToProps(state) {
  return {
    MyDocuments: state.documents.MyDocuments,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardDocumentView);