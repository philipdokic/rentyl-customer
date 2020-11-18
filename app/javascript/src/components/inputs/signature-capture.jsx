// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import Measure from 'react-measure';
import SignaturePad from 'react-signature-pad-wrapper';
import styled from 'styled-components';
import { toast } from 'react-toastify';

// Components
// -----------------------------------------------
import Ripple from '../miscellaneous/ripple';
//import { Trash } from 'cxThemeComponents/icons';
import displayError from '../errors/display';

// Styles
// -----------------------------------------------
const SignatureContainer = styled.div`
  border: 1px solid #e5e2e2;
  flex: 1 1 auto;
`;

const SignatureButtonContainer = styled.div`
  width: 100%;

  p {
    border-top: 1px solid #e5e2e2;
    margin: 0 8px 4px;
    text-align: center;
  }

  a.button {
    width: 50%;
    margin: 0;
  }
`;

// -----------------------------------------------
// COMPONENT->SIGNATURE-CAPTURE ------------------
// -----------------------------------------------
export default class SignatureCapture extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      signature: null,
      saving: false,
      width: 446,
      height: 150
    };
  }

  // Clear Signature
  // ---------------------------------------------
  clearSignature = e => {
    e.preventDefault();
    this.signaturePad.clear();
  };

  // Delete Signature
  // ---------------------------------------------
  deleteSignature = () => {
    axios.delete(`/signatures/${this.state.signature.id}`)
    .then(response => {
      this.setState({ signature: null }, () => {
        this.props.afterDelete && this.props.afterDelete();
      });
    })
    .catch(error => {
      displayError({ message: 'Signature could not be deleted', error });
    })
  };

  // Save Signature
  // ---------------------------------------------
  saveSignature = e => {
    e.preventDefault();

    if (this.signaturePad.isEmpty()) {
      toast.error('Please provide a signature.');
      return;
    }

    const signature = this.signaturePad.toDataURL();
    this.setState({ saving: true }, () => {
      axios.post(`/signatures`, {
        params: {data_uri: signature}
      })
      .then(response => {
        this.setState({ saving: false, signature: response.data.signature }, () => {
          this.props.afterSave && this.props.afterSave(response.data.signature);
        });
      })
      .catch(error => {
        displayError({ message: 'Error creating signature', error })
      })
    });
  };

  // Render Edit
  // ---------------------------------------------
  // Measure will calculate the dimensions of the
  // child element on initial load and whenever it
  // is resized
  renderEdit = () => (
    <Measure
      bounds
      onResize={contentRect => this.updateCanvasSize(contentRect.bounds)}
    >
      {({ measureRef }) => (
        <div ref={measureRef}>
          <SignaturePad
            height={this.state.height}
            width={this.state.width}
            options={{ backgroundColor: '#f5f5f5' }}
            ref={ref => (this.signaturePad = ref)}
          />
          <SignatureButtonContainer>
            <p>Sign Above</p>
            <a
              className="button"
              style={{ backgroundColor: '#E8714F' }}
              onClick={e => this.clearSignature(e)}
            >
              Clear
            </a>
            <a className="button" onClick={e => this.saveSignature(e)}>
              Save
            </a>
          </SignatureButtonContainer>
        </div>
      )}
    </Measure>
  );

  // Render View
  // ---------------------------------------------
  renderView = () => (
    <div style={{ position: 'relative' }}>
      <img
        style={{ width: '100%' }}
        src={this.state.signature.url}
        alt="signature"
      />
      {/* <Trash
        style={{
          position: 'absolute',
          right: '8px',
          bottom: '8px',
          cursor: 'pointer'
        }}
        onClick={this.deleteSignature}
      /> */}
    </div>
  );

  // Update Canvas Size
  // ---------------------------------------------
  updateCanvasSize = dimensions => {
    // Necessary to do this for high DPI devices with higher pixel ratios
    // signaturePad will attempt to resize/transform the canvas, so this is making sure
    // we always get back to where we started
    const pixelRatio = window.devicePixelRatio || 1;
    let deviceWidth = dimensions.width / pixelRatio;
    let deviceHeight = 150 / pixelRatio;

    this.setState({ width: deviceWidth, height: deviceHeight }, () => {
      // handleResize() comes from the source code for the
      // signaturePad package we are using. Check github, but basically we combine
      // this call with the Measure package to handle correct sizing of the signature
      // pad. Measure is called on initial load and whenever the div in the return of the
      // render is changed.
      this.signaturePad.handleResize();

      // handleResize does some funky transformations to the canvas, so the following
      // undoes them to make sure the canvas is the stroke is the correct size/transformation
      // and the background color is filling the entire canvas
      const ctx = this.signaturePad._canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(0, 0, dimensions.width, 150);
    });
  };

  // Render
  // ---------------------------------------------
  render() {
    if (this.state.saving) {
      return (
        <div
          style={{
            width: '100%',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #E5E2E2'
          }}
        >
          <Ripple color="#50E3C2" />
        </div>
      );
    }

    return (
      <div style={{ border: '1px solid #E5E2E2', flex: '1 1 auto' }}>
        {this.state.signature ? this.renderView() : this.renderEdit()}
      </div>
    );
  }
}
