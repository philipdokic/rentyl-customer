// Dependencies
// -----------------------------------------------
import React from 'react';
import Lightbox from 'react-images';

export default class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      isLightboxOpen: false
    };
  }

  setupImages = () => {
    let images = [];
    for (let i = 0; i < this.props.property_images.length; i++) {
      const image = this.props.property_images[i];
      let image_obj = {};
      image_obj['src'] = image.image.url;
      image_obj['src_xl'] = image.image.url;
      image_obj['thumbnail'] = image.image.tiny.url;
      image_obj['caption'] = image.label;
      images.push(image_obj);
    }
    for (let i = 0; i < this.props.unit_images.length; i++) {
      const image = this.props.unit_images[i];
      let image_obj = {};
      image_obj['src'] = image.image.url;
      image_obj['src_xl'] = image.image.url;
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
    const IMAGES = this.setupImages();
    return (
      <section>
        {IMAGES.length ? (
          <div>
            <a href="#" onClick={e => this.openLightbox(0, e)}>
              <div
                className="jumbotron"
                style={{ backgroundImage: `url(${IMAGES[0].src_xl})` }}
              >
                <div className="jumbotron-button">See Photos</div>
              </div>
            </a>
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
          </div>
        ) : (
          <div className="jumbotron"></div>
        )}
      </section>
    );
  }
}
