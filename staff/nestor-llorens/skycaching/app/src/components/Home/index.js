import React, { useEffect } from 'react'
// import './index.sass'
import logic from '../../logic'
import MapHome from '../Map-Home'
import { withRouter } from 'react-router-dom'

function Home ({ history, setUser}) {

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUser()

            setUser(user)
        })()
    }, [history.location])

    return (
    <main className="home">
        <section><MapHome /></section>
    
    </main>
    )
}

export default withRouter(Home)