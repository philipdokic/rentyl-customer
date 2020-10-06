// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';

export default class DetailsMultiUnitImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      isLightboxOpen: false
    };
  }

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

  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      isLightboxOpen: true
    });
  };
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      isLightboxOpen: false
    });
  };
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };
  gotoImage = index => {
    this.setState({
      currentImage: index
    });
  };

  render() {
    const translate = this.props.translate;
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
