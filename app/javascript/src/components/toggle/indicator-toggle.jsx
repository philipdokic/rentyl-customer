// Dependencies
// -----------------------------------------------
import React from 'react';

const IndicatorToggle = (props) => {

  const toggleAction = e => {
    e.preventDefault();
    if (props.args) {
      props.toggleAction(
      props.toggleItemId,
      props.toggleStatus,
      props.args
      );
    } else {
      props.toggleAction(props.toggleItemId, props.toggleStatus);
    }
  };


    return (
      <a
        className="indicator-toggle-link"
        href="#"
        onClick={e => toggleAction(e)}
      >
        <i
          className={`indicator-toggle ${
            props.toggleStatus ? 'toggled-true' : ''
          }`}
        />
        <span>
          {props.toggleStatus
            ? props.toggleTrueLabel
            : props.toggleFalseLabel}
        </span>
      </a>
    );
}


export default IndicatorToggle
