// Dependencies
// -----------------------------------------------
import React from 'react';
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";

// -----------------------------------------------
// COMPONENT->MULTI-UNIT-IMAGES ------------------
// -----------------------------------------------
export default class MultiUnitImages extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      isLightboxOpen: false
    };
  }

  // Setup Images
  // ---------------------------------------------
  setupImages = () => {
    let images = [];

    for (let i = 0; i < this.props.images.length; i++) {
      const image = this.props.images[i];
      let image_obj = {};
      image_obj['src'] = image.url['original'];
      image_obj['src_xl'] = image.url['large'];
      image_obj['thumbnail'] = image.url['tiny'];
      image_obj['caption'] = image.label;
      images.push(image_obj);
    }
    return images;
  };

  // Open Lightbox
  // ---------------------------------------------
  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      isLightboxOpen: true
    });
  };

  // Close Lightbox
  // ---------------------------------------------
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      isLightboxOpen: false
    });
  };

  // Go To Previous
  // ---------------------------------------------
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  // Go To Next
  // ---------------------------------------------
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };

  // Go To Image
  // ---------------------------------------------
  gotoImage = index => {
    this.setState({
      currentImage: index
    });
  };

  // Render
  // ---------------------------------------------
  render() {
    const images = this.setupImages();
    const options = {
      settings: {
        lightboxTransitionSpeed: 0.3
      },
      buttons: {
        showAutoplayButton: false,
        showDownloadButton: false,
        showThumbnailsButton: false
      }
    };
    const Button = props => {
      const { openLightbox } = useLightbox();
      return (
        <a
          className="units-images-link"
          onClick={() => openLightbox(props.imageToOpen)}
          style={{ backgroundImage: `url(${images[0].src_xl})` }}
        >
        </a>
      )
    }

    return (
      <SimpleReactLightbox>
        <section>
          {images.length ? (
            <div>
              <Button />
              <SRLWrapper images={images} options={options}/>
            </div>
          ) : (
            <div className="jumbotron"></div>
          )}
        </section>
      </SimpleReactLightbox>
    );
  }
}
