import React from 'react'
import Seat from './seat'

const Sofa = ( props ) => {
  return (
    <li>
      <img src='public/pics/sofas/three.png' alt='Image for four-seat sofa' className='saved-combinations-sofa'/>
      <ul className='saved-combinations-ul-bears'>
        { props.sofa.seats.map( ( seat ) => {
          return <Seat seat={ seat } key={ seat.seatId } />
        }) }
      </ul>
    </li>
  )
}

export default Sofa
