import './App.css'
import Takeinput from './components/Takeinput'
import Generatedout from './components/Generatedout'
import ResponseProvider from './context/Response.context';

function App() {
  return (
    <ResponseProvider >
      <div className='flex flex-row'>

        <Takeinput />
        <Generatedout />
      </div>

    </ResponseProvider>

  )
}

export default App
