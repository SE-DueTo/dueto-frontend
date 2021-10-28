import { useEffect, useState } from "react";
import { Site } from "./utils";

export const Main = ()=>{
    return (
        <Site showLogin={true}>
            <Background>
                <Title/>
            </Background>
        </Site>
    )
}

function Title():JSX.Element {
    const [count, setCount] = useState(0);

    const increment = ()=>{        
        setCount((count) => ((count+1) % 20))
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            increment()
        }, 1000)

        return (()=>{
            clearInterval(interval)
        })
    }, [])

    return (
        <div onClick={increment}>
            <h1>DueTo</h1>
            <h3>Coming Soon{".".repeat(count)}</h3>
        </div>
    )
}

type BackgroundProps = {
    children?: JSX.Element[] | JSX.Element
}

const Background:React.FC<BackgroundProps> = ({children}) => (
    
    <div className="App">
        <header className="App-header">
            {children}
        </header>
    </div>
    
)