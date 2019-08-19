import React from 'react'


const Validate = (props) => {
    let validationMessage = "Text to short";
    if(props.inputLength > 5) {
        validationMessage = "Text too long";
    }
    return (
        <div>
            <p>{validationMessage}</p>
        </div>
    )
}

export default Validate