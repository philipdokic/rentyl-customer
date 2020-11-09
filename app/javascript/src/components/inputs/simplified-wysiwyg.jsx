// Dependencies
// -----------------------------------------------
import React from 'react';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import styled from 'styled-components';

// Styles
// -----------------------------------------------
const TextArea = styled.figure`
  margin-bottom: 16px;

  .rdw-editor-toolbar {
    padding: 6px 5px 0;
    border-radius: 2px;
    border: 1px solid #e5e2e2;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    background: white;
    flex-wrap: wrap;
    font-size: 15px;
    margin-bottom: 5px;
    user-select: none;
  }

  .rdw-inline-wrapper,
  .rdw-list-wrapper,
  .rdw-history-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
  }

  .rdw-option-wrapper {
    border: 1px solid #e5e2e2;
    padding: 5px;
    min-width: 35px;
    height: 30px;
    border-radius: 2px;
    margin: 0 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: white;
    text-transform: capitalize;

    :hover {
      box-shadow: -1px -1px 0px #bfbdbd inset;
    }
  }

  .rdw-option-disabled {
    opacity: 0.3;
    cursor: default;
  }

  .rdw-option-active {
    box-shadow: 1px 1px 0px #bfbdbd inset;
  }

  .rdw-editor-main {
    min-height: 256px;
    background: #ffffff;
    border: 1px solid #e5e2e2;
    border-radius: 0;
    color: #404040;
    font-family: 'Open Sans';
    height: 100%;
    max-height: calc(100vh - 160px);
    padding: 12px;
    overflow: auto;
    resize: vertical;
    width: 100%;
    position: relative;
  }

  .public-DraftEditorPlaceholder-root {
    color: #e5e2e2;
  }

  .public-DraftEditorPlaceholder-inner {
    position: absolute;
  }
`;

// -----------------------------------------------
// COMPONENT->SIMPLIFIED-WYSIWYG -----------------
// -----------------------------------------------
export default class SimplifiedWysiwyg extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props, _railsContext) {
    super(props);
    const editorState = this.initializeEditorState();
    this.state = {
      content: this.props.content,
      editorState: editorState
    };
  }

  // Initialize Editor State
  // ---------------------------------------------
  initializeEditorState = () => {
    if (this.props.content) {
      const contentState = stateFromHTML(this.props.content);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  };

  // On Editor State Change
  // ---------------------------------------------
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  // On Content State Change
  // ---------------------------------------------
  onContentStateChange = contentState => {
    const content = draftToHtml(contentState, null, false, null);
    let stateChange = {};
    stateChange['content'] = content;
    this.setState(stateChange, () => {
      this.props.onContentChange(this.props.name, this.state.content);
    });
  };

  // Render
  // ---------------------------------------------
  render() {
    const { contentState, editorState } = this.state;
    const toolbar_wide = {
      inline: {
        inDropdown: false,
        options: ['bold', 'italic', 'underline']
      },
      list: {
        inDropdown: false,
        options: ['unordered', 'ordered']
      },
      options: ['inline', 'list', 'history']
    };

    return (
      <TextArea>
        <Editor
          contentState={contentState}
          editorState={editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onContentStateChange={this.onContentStateChange}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={toolbar_wide}
          placeholder={this.props.placeholder}
        />
      </TextArea>
    );
  }
}
