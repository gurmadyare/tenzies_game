import React from 'react'

const Die = ({value, hold, isHeld, id}) => {
  return (
    <div className='dice' onClick={() => hold(id)} style={{backgroundColor: isHeld ? '#59E391' : 'white'}}>
      <h3>{value}</h3>
    </div>
  )
}

export default Die 