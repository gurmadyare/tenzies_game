import React from 'react'

const Die = ({value, hold, isHeld, id}) => {
  const diceImages = {
    1: 'public/dice(1).jpg',
    2: 'public/dice(2).jpg',
    3: 'public/dice(3).jpg',
    4: 'public/dice(4).jpg',
    5: 'public/dice(5).jpg',
    6: 'public/dice(6).jpg',
  }

  return (
    <div className='dice' onClick={() => hold(id)} style={{backgroundColor: isHeld ? '#59E391' : 'white'}}>
      <img src={diceImages[value]} alt="" className= {isHeld ? 'dice-held-img' : 'dice-img'}/>
    </div>
  )
}

export default Die 