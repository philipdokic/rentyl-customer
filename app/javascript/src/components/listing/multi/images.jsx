// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper, useLightbox } from "simple-react-lightbox";

// -----------------------------------------------
// COMPONENT->IMAGES -----------------------------
// -----------------------------------------------
class Images extends React.Component {

  // Setup Images
  // ---------------------------------------------
  setupImages = () => {
    let images = [];
    for (let i = 0; i < this.props.listing.property_images.length; i++) {
      const image = this.props.listing.property_images[i];
      let image_obj = {};
      image_obj['src'] = image.url;
      image_obj['src_xl'] = image.url;
      image_obj['thumbnail'] = image.url;
      image_obj['caption'] = image.label;
      images.push(image_obj);
    }
    return images;
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
        <a onClick={() => openLightbox(props.imageToOpen)}>
          <div
            className="jumbotron"
            style={{ backgroundImage: `url(${images[0].src_xl})` }}
          >
            <div className="jumbotron-button">See Photos</div>
          </div>
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

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Images);