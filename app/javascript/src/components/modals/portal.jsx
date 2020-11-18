// Dependencies
// -----------------------------------------------
import React from 'react';
import { PortalWithState } from 'react-portal';

// -----------------------------------------------
// COMPONENT->PORTAL-MODAL -----------------------
// -----------------------------------------------
export default class PortalModal extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // Render Submit Action
  // ---------------------------------------------
  renderSubmitAction = closePortal => {
    if (this.props.closeOnSubmit) {
      return <li>{this.props.submitAction(closePortal)}</li>;
    }
    return <li>{this.props.submitAction}</li>;
  };

  // Render Cancel Action
  // ---------------------------------------------
  renderCancelAction = closePortal => {
    if (this.props.hideCancelAction) return null;

    if (this.props.cancelAction) {
      return <li>{this.props.cancelAction(closePortal)}</li>;
    }

    return (
      <li>
        <a className="negative" onClick={closePortal}>
          Cancel
        </a>
      </li>
    );
  };

  // Render
  // ---------------------------------------------
  render() {
    return (
      <PortalWithState
        closeOnOutsideClick={!this.props.disableCloseOnOutsideClick}
        onClose={this.props.onClose}
        closeOnEsc
        defaultOpen={this.props.defaultOpen}
      >
        {({ openPortal, closePortal, isOpen, portal }) => (
          <React.Fragment>
            {this.props.openByClickOn(openPortal)}
            {portal(
              <aside className="consolidated-modal-overlay">
                {!this.props.header && !this.props.hideX && (
                  <a
                    className="consolidated-modal-close"
                    onClick={this.props.closePortal}
                  >
                    ×
                  </a>
                )}
                <section
                  className="consolidated-modal"
                  style={this.props.modalStyles}
                >
                  {this.props.header && (
                    <header className="consolidated-modal-header">
                      <span>{this.props.header}</span>
                      {!this.props.hideX && (
                        <a
                          className="consolidated-modal-close"
                          onClick={closePortal}
                        >
                          ×
                        </a>
                      )}
                    </header>
                  )}
                  {typeof this.props.children === 'function'
                    ? this.props.children(isOpen)
                    : this.props.children}
                  {this.props.submitAction && (
                    <ul style={this.props.actionStyles}>
                      {this.renderSubmitAction(closePortal)}
                      {this.renderCancelAction(closePortal)}
                    </ul>
                  )}
                </section>
              </aside>
            )}
          </React.Fragment>
        )}
      </PortalWithState>
    );
  }
}

// Default Props
// -----------------------------------------------
PortalModal.defaultProps = {
  openByClickOn: _openPortal => {},
  defaultOpen: false
};
