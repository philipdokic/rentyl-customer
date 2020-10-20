// // Dependencies
// // -----------------------------------------------
// import React from 'react';
// import styled from 'styled-components';
// import assign from 'lodash/assign';

// // Components
// // -----------------------------------------------
// import SimplifiedWysiwyg from './simplified-wysiwyg';
// import WidgetDatePicker from 'sharedComponents/WidgetDatePicker';
// import displayError from 'sharedComponents/ErrorDisplay';

// // Services
// // -----------------------------------------------
// import { ConversationService, OpportunityService } from 'cxApi';

// // Styled Components
// // -----------------------------------------------
// const ContactFormContainer = styled.form`
//   width: 95%;
//   max-width: 575px;
//   margin: 20px auto;
//   height: min-content;

//   h3 {
//     font-weight: 600;
//   }

//   p,
//   h3 {
//     text-align: center;
//   }

//   @media (max-width: 500px) {
//     .home-editor.rdw-editor-main {
//       min-height: 150px;
//     }
//   }
// `;

// const SubmitButton = styled.button`
//   margin: 0 auto;
//   width: 128px
//   height: 40px;
//   font-size: 16px;
//   display: block;
//   cursor: pointer;

//   &:disabled {
//     opacity: .3;
//     cursor: default;
//   }
// `;

// var Recaptcha = require('react-recaptcha');

// // -----------------------------------------------
// // COMPONENT->CONTACT-FORM -----------------------
// // -----------------------------------------------
// export default class ContactForm extends React.Component {
//   // -----------------------------------------------
//   validateFields = () => {
//     if (
//       this.state.name &&
//       this.state.email &&
//       this.state.telephone &&
//       this.state.startDate &&
//       this.state.endDate &&
//       this.state.body &&
//       this.state.notBot
//     ) {
//       this.setState({ incomplete: false });
//     }
//   };

//   // -----------------------------------------------
//   // VALIDATE-FIELDS -------------------------------
//   // -----------------------------------------------
//   onChange = (name, value) => {
//     let changeState = {};

//     changeState[name] = value;
//     this.setState(changeState, () => {
//       this.validateFields();
//     });
//   };

//   onDatesChange = ({ startDate, endDate }) => {
//     this.setState({ startDate, endDate });
//   };

//   // -----------------------------------------------
//   // ON-CHANGE -------------------------------------
//   // -----------------------------------------------
//   onSubmit = () => {
//     const { name, email, telephone, body, startDate, endDate } = this.state;
//     const messageParams = {
//       name: name,
//       email: email,
//       telephone: telephone,
//       check_in: startDate,
//       check_out: endDate,
//       body: body
//     };
//     const allParams = assign({}, messageParams, this.props);

//     ConversationService.create(allParams).then(response => {
//       const conversationId = {
//         conversation_id: response.id
//       };
//       const opportunityData = assign(
//         {},
//         response,
//         this.props,
//         messageParams,
//         conversationId
//       );
//       OpportunityService.create(opportunityData);
//       this.setState({ sent: true });
//     })
//       .catch(err =>
//         displayError({ message: 'Error creating conversation', err })
//       );
//   };

//   // -----------------------------------------------
//   // ON-SUBMIT -------------------------------------
//   // -----------------------------------------------

//   // NOT BEING USED
//   // verifyCallback = response => {
//   //   if (response) {
//   //     this.setState({ notBot: true }, () => {
//   //       this.validateFields();
//   //     });
//   //   }
//   // };

//   // -----------------------------------------------
//   // VERIFY-CALLBACK -------------------------------
//   // onloadCallback = () => {
//   //   // Need this onload callback to get verify callback to actually fire. Don't know why...
//   // };
//   // -----------------------------------------------
//   renderContactForm = () => (
//     <div>
//       <div style={{ display: 'flex' }}>
//         <div style={{ width: '50%' }}>
//           <label>Name (Required)</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             onChange={e => this.onChange(e.target.name, e.target.value)}
//             required={true}
//           />
//         </div>
//         <div style={{ width: '50%' }}>
//           <label>Email (Required)</label>
//           <input
//             type="text"
//             name="email"
//             placeholder="Email Address"
//             onChange={e => this.onChange(e.target.name, e.target.value)}
//             required={true}
//           />
//         </div>
//       </div>

//       <label>Phone (Required)</label>
//       <input
//         type="text"
//         name="telephone"
//         placeholder="(555) 555-5555"
//         onChange={e => this.onChange(e.target.name, e.target.value)}
//         required={true}
//       />
//       <div style={{ marginBottom: '16px' }}>
//         <label> Stay Dates (Required) </label>
//         <WidgetDatePicker
//           startDate={this.state.startDate}
//           endDate={this.state.endDate}
//           onDatesChange={this.onDatesChange}
//           style={{ marginBottom: '20px' }}
//           displayFormat={this.props.displayFormat}
//           readOnly
//         />
//       </div>

//       <label>Message (Required)</label>
//       <SimplifiedWysiwyg
//         name="body"
//         placeholder="Write your message here..."
//         onContentChange={this.onChange}
//       />
//       {/*<Recaptcha
//         sitekey="6LdVCU8UAAAAAGVjM7Tse4keYGCphzby1NQt2gEY"
//         render="explicit"
//         onloadCallback={this.onloadCallback}
//         verifyCallback={this.verifyCallback}
//       />*/}
//       <SubmitButton
//         type="button"
//         onClick={this.onSubmit}
//         disabled={this.state.incomplete}
//       >
//         SUBMIT
//       </SubmitButton>
//     </div>
//   );

//   // -----------------------------------------------
//   // RENDER-REVIEW-FORM ----------------------------
//   // -----------------------------------------------
//   renderMessage = messageSent => {
//     return messageSent ? (
//       <p>
//         Thank you for your submission. We will get back to you as soon as
//         possible!
//       </p>
//     ) : (
//       <p>
//         Have a question? Use the form below and we will respond with answers as
//         soon as possible!
//       </p>
//     );
//   };

//   // -----------------------------------------------
//   // RENDER-MESSAGE --------------------------------

//   constructor(props) {
//     super(props);

//     this.state = {
//       name: null,
//       email: null,
//       telephone: null,
//       body: null,
//       startDate: null,
//       endDate: null,
//       incomplete: true,
//       sent: false,
//       notBot: true
//     };
//   }

//   render() {
//     return (
//       <ContactFormContainer>
//         {this.renderMessage(this.state.sent)}
//         {!this.state.sent && this.renderContactForm()}
//       </ContactFormContainer>
//     );
//   }
// }
