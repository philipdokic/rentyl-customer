// // Dependencies
// // -----------------------------------------------
// import React from 'react';
// import PropTypes from 'prop-types';

// // -----------------------------------------------
// // COMPONENT->SEARCH-INFO ------------------------
// // -----------------------------------------------
// export default class SearchInfo extends React.Component {
//   static propTypes = {};

//   constructor(props) {
//     super(props);
//   }

//   // renderFiltered = () => {
//   //   const translate = this.props.translate;
//   //   if(this.props.filteredResultsLength === 1) {
//   //     return {
//   //       __html: translate(`cx.search.num_results.filtered.single_html`, {num:this.props.totalProperties, num_filtered:this.props.filteredResultsLength})
//   //     }
//   //   } else {
//   //     return {
//   //       __html: translate(`cx.search.num_results.filtered.plural_html`, {num:this.props.totalProperties, num_filtered:this.props.filteredResultsLength})
//   //     }
//   //   }
//   // }

//   renderUnfiltered = () => {
//     const translate = this.props.translate;
//     if (this.props.totalProperties === 1) {
//       return {
//         __html: translate(`cx.search.num_results.unfiltered.single_html`, {
//           num: this.props.totalProperties
//         })
//       };
//     } else {
//       return {
//         __html: translate(`cx.search.num_results.unfiltered.plural_html`, {
//           num: this.props.totalProperties
//         })
//       };
//     }
//   };

//   render() {
//     const translate = this.props.translate;
//     if (this.props.isLoaded && this.props.totalProperties) {
//       return (
//         <section className="search-info">
//           {/*{this.props.totalProperties === this.props.filteredResultsLength ?*/}
//           <span dangerouslySetInnerHTML={this.renderUnfiltered()} />
//           {/*<span dangerouslySetInnerHTML={this.renderFiltered()}/>*/}
//           {/*}*/}
//         </section>
//       );
//     }
//     return null;
//   }
// }
