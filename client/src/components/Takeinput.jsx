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

    const highlight = (code) => {
        return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    };
    return (

        <>
            <div className='basis-1/2 h-screen flex-col box-content bg-blue-500 rounded-2xl'>

                <div className='flex flex-row absolute'>
                    <img src={GradientAiRobot} alt="image not found" className='w-10 h-10 ml-1.5 ' />
                    <SplitText
                        text="Codermaster"
                        className="h-14 text-sm font-semi mt-3 text-center  text-white  "
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
                <Editor
                    value={input}
                    onValueChange={code => setInput(code)}
                    highlight={highlight}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        // fontSize: 14,
                        backgroundColor: '#242424',
                        color: '#d4d4d4',
                        minHeight: '500px',
                        borderRadius: '8px',
                        marginBottom: '16px',
                    }}
                />

                {/* <textarea value={input} onChange={e => { setInput(e.target.value); }} placeholder='Give Me Code Master...' className=' bg-blue-900 resize-none w-[100%] h-[500px] p-3 text-white outline-none border-3 border-white' name="code" id="">
                </textarea> */}


                <button className='w-20 h-10 text-black font-base ml-4 mb-1 bg-white rounded-md self-center cursor-pointer' type='submit' onClick={handlesubmit}>Generate</button>

            </div >
        </>
    )
}
