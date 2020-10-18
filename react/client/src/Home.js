import React from 'react'
import {Link} from 'react-router-dom'
//import './Home.css'


function Home() {
    return (
    <div>
        <h1 style={{ height: 200 }}>compressr</h1>

        <div class="typewriter">
           <h2>say hello to concise, meaningful writing.</h2>
        </div>

        <div class ="getstarted">


          <Link to="/tryitout">
               <button type="button">
                    get started
               </button>
           </Link>
        </div>
    </div>
    )
}

export default Home;