import React, { useContext } from 'react'
import axios from 'axios'
import { Response } from '../context/Response.context'
import GradientAiRobot from '../assets/Graident-Ai-Robot.png';
import SplitText from "./SplitText";
import 'prismjs/themes/prism-tomorrow.css';
import Editor from 'react-simple-code-editor';


import Prism from 'prismjs';
import { useEffect } from 'react';

export default function Takeinput() {
    const [input, setInput] = React.useState('')
    useEffect(() => {
        Prism.highlightAll();
    }, [input]); // Re-highlight when input changes


    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };



    const { response, setresponse } = useContext(Response)
    const handleClear = () => {
        setInput('');
        setresponse('');
    };
    const handlesubmit = (e) => {
        if (!input) {
            alert('Please enter a code!')
            return;
        }
        // console.log(response)
        e.preventDefault()

        axios.post('https://aicoderreviewer-backend.onrender.com/ai/get-review', { code: input }).then((response) => {
            setresponse(response.data)
        })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <>

            <div className='basis-1/2 h-screen  bg-blue-500 rounded-2xl border-l-4 border-t-4 border-b-4 border-white'>

                <div className='flex flex-row absolute'>
                    <img src={GradientAiRobot} alt="image not found" className='w-10 h-10 ml-1.5 ' />
                    <SplitText
                        text="Codermaster"
                        className="h-14 text-sm font-medium uppercase mt-4  text-center  text-white  "
                        delay={80}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.2}
                        rootMargin="-10px"
                        onLetterAnimationComplete={handleAnimationComplete} />

                </div>

                <div className='h-[40px]  flex justify-center'>
                    <SplitText
                        text="Generate code"
                        className="h-20 text-2xl font-bold mt-2 text-center  text-white "
                        delay={80}
                        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                        easing="easeOutCubic"
                        threshold={0.2}
                        rootMargin="-50px"
                        onLetterAnimationComplete={handleAnimationComplete} />



                </div>


                <textarea
                    className='w-full h-[200px] md:h-[300px] lg:h-[400px] xl:h-[490px] 2xl:h-[800px] p-4 resize-none rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white-200 transition-all text-white '
                    placeholder="Give me some code..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <div className='flex w[30rem] h-10  absolute gap-4 p-4'>

                    <button className='w-20 h-10 left-5 absolute text-black font-base mb-1 bg-white hover:bg-zinc-300 rounded-md self-center cursor-pointer' type='submit' onClick={handlesubmit}>Generate</button>

                    <button className='w-20 h-10 left-30 absolute text-black font-base mb-1 bg-white hover:bg-zinc-300 rounded-md self-center cursor-pointer' type='submit' onClick={handleClear}>Clear</button>

                </div>
            </div >
        </>
    )
}
