import React from 'react'

const Country = ({ data }) => {

    return (
        <div>
            <h1>{data.name}</h1>
            <p>capital {data.capital}</p>
            <p>population {data.population}</p>
            <h2>languages</h2>
            <ul>
                {data.languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img alt='flag' style={{ width: '100px' }} src={data.flag}></img>
        </div>
    )
}

export default Country