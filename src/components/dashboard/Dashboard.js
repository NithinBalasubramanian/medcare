import React from 'react'

function Dashboard() {

    let user = localStorage.getItem('name');

    return (
        <>
            <div className="headerCart">
                <h1> Hello { user }</h1>
            </div>
            <div className="mainCart">
                <h1>Dashboard charts</h1>
            </div>
        </>
    )
}

export default Dashboard
