// Dependencies
// -----------------------------------------------
import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import displayError from '../errors/error-display';
import Ripple from '../miscellaneous/ripple';
//import { Trash } from 'cxThemeComponents/icons';

// Styles
// -----------------------------------------------
const DropContainer = styled.div`
  border: 4px dashed #e5e2e2;
  padding: 16px;
  text-align: center;
`;

// -----------------------------------------------
// COMPONENT->ID-PHOTO-UPLOADER ------------------
// -----------------------------------------------
export default class IdPhotoUploader extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isLoading: false,
      idPhoto: null
    };
  }

  // On Dropzone Drop
  // ---------------------------------------------
  onDropzoneDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      this.attemptUploadFile(acceptedFiles[0]);
    }
  };

  // Attempt Upload File
  // ---------------------------------------------
  attemptUploadFile = file_queued => {
    this.setState({ isLoaded: false, isLoading: true }, () => {
      var formData = new FormData();
      formData.append('document', file_queued);

      if (this.props.idSide) {
        formData.append('id_side', this.props.idSide);
      }

      axios.post(`/id_photos`, {
        params: formData
      })
      .then(response => {
        this.setState(
          {
            isLoaded: true,
            isLoading: false,
            idPhoto: response.data.id_photo
          },
          () =>
            this.props.afterUpload && this.props.afterUpload(response.data.id_photo)
        );
      })
      .catch(error => {
        this.setState({
          isLoaded: false,
          isLoading: false
        });
        displayError({ message: 'Error uploading photo', error });
      })
    });
  };

  // Delete ID Photo
  // ---------------------------------------------
  deleteIdPhoto = () => {
    axios.delete(`/id_photos/${this.state.idPhoto.id}`)
    .then(response => {
      this.setState({ idPhoto: null }, () => {
        this.props.afterPhotoDelete && this.props.afterPhotoDelete();
      });
    })
    .catch(error => {
      displayError({ message: 'Error deleting photo', error });
    })
  };

  // Render Loading
  // ---------------------------------------------
  renderLoading = () => {
    return <Ripple color="#50E3C2" />;
  };

  // Render Viewing
  // ---------------------------------------------
  renderViewing = () => {
    if (this.state.idPhoto) {
      return (
        <div style={{ position: 'relative' }}>
          <img
            src={this.state.idPhoto.url}
            style={{ width: '100%' }}
            alt="id-photo"
          />
          <Trash
            style={{
              position: 'absolute',
              right: '8px',
              bottom: '8px',
              cursor: 'pointer'
            }}
            onClick={this.deleteIdPhoto}
          />
        </div>
      );
    } else {
      return (
        <Dropzone
          activeClassName=""
          className={`card empty-state`}
          multiple={false}
          onDrop={this.onDropzoneDrop}
          ref={node => {
            this.dropzone = node;
          }}
          accept="image/*"
        >
          <DropContainer>
            <a className="button">
              {this.props.buttonText ||
                "Upload Photo of Driver's License or Passport"}
            </a>
            <p>or drag it into this box.</p>
          </DropContainer>
        </Dropzone>
      );
    }
  };

  // Render
  // ---------------------------------------------
  render() {
    return (
      <section>
        {this.state.isLoading ? this.renderLoading() : this.renderViewing()}
      </section>
    );
  }
}
