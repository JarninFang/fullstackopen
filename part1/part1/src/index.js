import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const [counter, setCounter] = useState(0)

    const setToValue = (value) => {
        return setCounter(value);
    }

    return (
        <div>
            <Display counter={counter}/>
            <Button handleClick={() => setToValue(counter+1)} text='plus'/>
            <Button handleClick={() => setToValue(0)} text='zero'/>
        </div>
    )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}
let counter = 1

ReactDOM.render(
    <App counter={counter} />,
    document.getElementById('root')
)