import React from 'react'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { faTumblrSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import randomColor from 'randomcolor'
import './App.css';


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        quotes: [],
        currentQuote: '',
        color: ''
    }
  }
 

  componentDidMount() {
    fetch("https://type.fit/api/quotes")
      .then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e));
            return res.json()
        })
        .then(resJson => {
            this.setState({quotes:resJson, currentQuote: resJson[6]});
        })
        .catch(error => {
            console.error({error});
        });
}

  newQuote(e){
    e.preventDefault()
    var randomQuote = this.state.quotes[Math.floor(Math.random()*(this.state.quotes.length))]
    var newColor= randomColor({luminosity: 'dark'})
    this.setState({currentQuote: randomQuote, color:newColor})
  }


  render(){

    return(
      <div className="App"  style={{backgroundColor:this.state.color }}>
         <h1>Quote Genereator</h1>
         <div id="quote-box">
            <div id="text">{this.state.currentQuote.text}</div>
            <div id="author">- {this.state.currentQuote.author}</div>
            <div id="buttons">
              <a href='https://twitter.com/intent/tweet' rel="noreferrer" target="_blank" className="button" id="tweet-quote"><FontAwesomeIcon  icon={faTwitterSquare}/></a>
              {' '}
              <a href='https://www.tumblr.com/'  rel="noreferrer" target="_blank" className="button" id="tumblr-quote"><FontAwesomeIcon  icon={faTumblrSquare}/></a>
              <button  style={{backgroundColor:this.state.color }} id="new-quote" onClick={(e)=>{this.newQuote(e)}}>New Quote</button>
              
              
            </div>
          </div>
      </div>
    )
  }
}

