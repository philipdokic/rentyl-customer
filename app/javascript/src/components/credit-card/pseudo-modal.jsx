// Dependencies
// -----------------------------------------------
import React from 'react';

// -----------------------------------------------
// COMPONENT->PSEUDO-MODAL -----------------------
// -----------------------------------------------
export default class PseudoModal extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
    return (
      <aside className="modal-overlay">
        <a className="modal-close" onClick={this.props.closePortal}>
          ×
        </a>
        <section className="modal">
          {this.props.header ? (
            <header className="modal-header">
              <span>{this.props.header}</span>
              <a className="modal-close" onClick={this.props.closePortal}>
                ×
              </a>
            </header>
          ) : null}
          {this.props.children}
        </section>
      </aside>
    );
  }
}
