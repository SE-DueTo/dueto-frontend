import './App.css';
import { Component } from 'react';

type countState = {
    count: number
}
class Title extends Component {
    interval: NodeJS.Timer;
    
    state: countState = {
        count: 0,
    }
    componentDidMount() {
        this.interval = setInterval(()=>{
            this.increment()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }
    increment = () => {
        this.setState((state: countState):countState => (
            {
                count: (state.count + 1) % 20,
            }
        ))
    }
    render() {
        return (
            <div onClick={this.increment}>
                <h1>DueTo</h1>
                <h3>Coming Soon{".".repeat(this.state.count)}</h3>
            </div>
        )
    }
}

type BackgroundProps = {
    children: JSX.Element[]
}
class Background extends Component {

    constructor(props:BackgroundProps) {
        super(props)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {this.props.children}
                </header>
            </div>
        )
    }
}

class App extends Component {
    render() {
        return (
            <Background>
                    <Title/>
            </Background>
        )
    }
}

export default App;