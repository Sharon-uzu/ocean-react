import React, {useState} from 'react'

const Form = () => {
    const [names, setNames] = useState('')

    function handleNameChange(e){
        setNames(e.target.value)
    }

  return (
    <div>
        <input value={names} type="text" placeholder='Name' onChange={handleNameChange}/><br /><br />
        <button>Enter</button><br />
        
        <h2>{names}</h2>
    </div>
  )
}

export default Form