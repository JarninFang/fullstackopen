import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [stats, setStats] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    })

    const handleClick = (type) => {
        //console.log({...stats, : stats[type]+1});
        setStats({ ...stats, [type]: stats[type] + 1})
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => handleClick('good')} text='good' />
            <Button handleClick={() => handleClick('neutral')} text='neutral' />
            <Button handleClick={() => handleClick('bad')} text='bad' />
            <Stats stats={stats} />
        </div>
    )
}

const Stats = ({ stats }) => {
    return (
        (stats.good + stats.bad + stats.neutral > 0) ?
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <Statistic text='good' value={stats.good}/>
                    <Statistic text='neutral' value={stats.neutral}/>
                    <Statistic text='bad' value={stats.bad}/>
                    <Statistic text='all' value={stats.good+stats.bad+stats.neutral}/>
                    <Statistic text='average' value={(stats.good+stats.bad+stats.neutral)/3}/>
                    <Statistic text='positive' value={stats.good/(stats.good+stats.bad+stats.neutral)*100+"%"}/>
                </tbody>
            </table>
        </div> : 
        <div>
            <h1>statistics</h1>
            <h2>No feedback given</h2>
        </div>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td> 
            <td>{value}</td>
        </tr>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));