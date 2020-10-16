// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';
import Lightbox from 'react-images';

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
      image_obj['src'] = image.image.large.url;
      image_obj['src_xl'] = image.image.xlarge.url;
      image_obj['thumbnail'] = image.image.tiny.url;
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
    const translate = ReactI18n.getIntlMessage;
    const IMAGES = this.setupImages();

    if (IMAGES.length) {
      return (
        <figure>
          <a
            href="#"
            className="units-images-link"
            onClick={e => this.openLightbox(0, e)}
            style={{ backgroundImage: `url(${IMAGES[0].src_xl})` }}
          ></a>
          <Lightbox
            images={IMAGES}
            currentImage={this.state.currentImage}
            backdropClosesModal={true}
            imageCountSeparator=" / "
            showThumbnails={true}
            isOpen={this.state.isLightboxOpen}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClose={this.closeLightbox}
            onClickThumbnail={this.gotoImage}
            width={1280}
          />
        </figure>
      );
    } else {
      return null;
    }
  }
}
