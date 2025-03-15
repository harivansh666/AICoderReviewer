import React, { useContext } from 'react'
import axios from 'axios'
import { Response } from '../context/Response.context'
import GradientAiRobot from '../assets/Graident-Ai-Robot.png';

export default function Takeinput() {
    const [input, setInput] = React.useState('')
    const { response, setresponse } = useContext(Response)



    const handlesubmit = (e) => {
        // console.log(response)
        e.preventDefault()

        axios.post('http://localhost:8080/ai/get-review', { code: input }).then((response) => {
            setresponse(response.data)
        })
            .catch(error => {
                console.log(error)
            })
    }
    return (

        <div className='w-1/2 h-screen flex-col box-content bg-blue-500'>
            <img src={GradientAiRobot} alt="image not found" className='w-10 h-10 absolute' />
            <h1 className='font-bold text-2xl content-center justify-self-center text-white'>Generete Code</h1>

            <textarea value={input} onChange={e => { setInput(e.target.value) }} className=' resize-none w-[100%] h-[500px] p-3 text-white outline-none border-3 border-white' name="code" id=""></textarea>

            <button className='w-20 h-10 text-black font-bold ml-1 mb-1 bg-white rounded-md self-center' type='submit' onClick={handlesubmit}>Generate</button>
        </div>

    )
}
