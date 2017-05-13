import React, { PropTypes } from 'react';

const WelcomePageDocList = ({ document }) => {
  return (
    <div>
      <div >
        <div className="col s4">
          <div className="card teal darken-1 z-depth-5">
            <div className="card-content white-text">
              <span className="card-title">{document.title}</span>
              <div className="divider"></div>
              <div className="divider"></div>
              <p>{`${document.body.substring(0, 150)}...`}</p>
            </div>
          </div>
         </div>
       </div>
    </div>
  );
};

WelcomePageDocList.propTypes = {
  document: PropTypes.object.isRequired,
};

export default WelcomePageDocList;