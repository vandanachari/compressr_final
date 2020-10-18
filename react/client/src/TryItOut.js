import React from 'react'
import ReactDOM from 'react-dom'
import './TryItOut.css'

function TryItOut() {
  return (
    <div className="TryItOut">
    <h1>try it out</h1>
    <div class="typewriter">
        <h2>enter text in the field below and see compressr do its magic.</h2>
    </div>


      <QueryForm/>
    </div>
  );
}

class QueryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentences: [],
      ranks: [],
      words: [],
      metadata: [],
      numOfSentences: 0
  };
    //this.output = ''
    //this.render()
  }

  // callAPI() {
  //   fetch ("http://localhost:8080/api/analysis?text=Hello World!")
  //   .then(res => res.text())
  //   .then(data => this.setState({sentences: data}))
  // }

  // componentWillMount() {
  //   this.callAPI()
  // }

  SubmitHandler = (event) => {
    event.preventDefault();
    var text = ReactDOM.findDOMNode(this.refs.input).value;

    fetch('http://localhost:8080/api/analysis?text='+text)
    .then(res => res.json())
    .then(data => this.setState( () => {
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&FETCHED DATA HERE IS THE  FECTED DATA' + data)
      console.log(this.state.sentences)
      var tempArray = []
      var inc = 0
      for (const sentence of data.sentences) {
        tempArray.push(sentence.sentence)
        inc++
      }
      this.setState({numOfSentences: inc})
      this.setState({sentences: tempArray})
      tempArray = []

      for (const rank of data.sentences) {
        tempArray.push(rank.rank)
      }
      this.setState({ranks: tempArray})
      tempArray = []

      for (const word of data.entities) {
        tempArray.push(word.word)
      }
      this.setState({words: tempArray})
      tempArray = []

      for (const link of data.entities) {
        tempArray.push(link.link)
      }
      this.setState({metadata: tempArray})
      tempArray = []
    }))
  }

  buttonHandler = (e) => {
    this.setState({value: e.target.value})
    console.log(e.target.value)
  }

  render() {
    console.log(this.state)
    var specialSentences = []
    var excessSentences = []
    var answerArray = []
    var expectedSpecialSentences = 0
    var expectedExcessSentences = 0

    if (this.state.sentences.length > 5) {
      expectedSpecialSentences = this.state.sentences.length*0.2
      expectedExcessSentences = expectedSpecialSentences - 1
      if (expectedSpecialSentences < 10) {
        expectedSpecialSentences = 2
        expectedExcessSentences = 1
      }
    }

    var rankTolerance = 10.0
    while (specialSentences.length < expectedSpecialSentences) {
      rankTolerance -= 0.5
      //console.log('Heres the rank tolerance' + rankTolerance)
      for (const element in this.state.sentences) {
        //console.log(this.state.ranks[element])
        if (rankTolerance < this.state.ranks[element]) {
          specialSentences.push(this.state.sentences[element])
          //console.log('PUSHED ______ ' + this.state.sentences[element])
        }
      }
    }

    rankTolerance = 2.0
    while (excessSentences.length < expectedExcessSentences) {
      rankTolerance += 0.5
      //console.log('Heres the rank tolerance' + rankTolerance)
      for (const element in this.state.sentences) {
        if (rankTolerance > this.state.ranks[element]) {
          excessSentences.push(this.state.sentences[element])
          //console.log('PUSHED ______ ' + this.state.sentences[element])
        }
      }
    }

    for (const element in this.state.sentences) {
      var isSpecial = false
      var isExcess = false
      for (const specialElement of specialSentences) {
        //console.log(specialElement)
        //console.log(this.state.sentences[element])
        if (specialElement === this.state.sentences[element]) {
          isSpecial = true
          answerArray.push('<mark>' + specialElement)
        }
      }
      for (const excessElement of excessSentences) {
        //console.log(excessElement)
        //console.log(this.state.sentences[element])
        if (excessElement === this.state.sentences[element]) {
          isExcess = true
          answerArray.push('<strike>' + excessElement)
        }
      }
      if (!isSpecial && !isExcess) {
        answerArray.push(this.state.sentences[element])
      }
    }

    var exists = false
    var noDuplicates = []
    for (const elem of answerArray) {
      for (const element of noDuplicates) {
        if (elem === element) {
          exists = true
        }
      }
      if (!exists) {
        noDuplicates.push(elem)
      }
      exists = false
    }

    const listItems = noDuplicates.map((key, i) => {
        if (key.includes('<mark>')) {
          if (noDuplicates[i+1]  != null) {
            if (noDuplicates[i+1].includes('<mark>')) {
              return (<pa id={i}><mark>{key.replace('<mark>','') + ' '}</mark></pa>)
            }
          }
          return (<pa id={i}><mark>{key.replace('<mark>','')}</mark> </pa>)
        }
        if (key.includes('<strike>')) {
          return (<pa id={i}><strike>{key.replace('<strike>','')}</strike> </pa>)
        }
      return (<pa id={i}>{key + ' '}</pa>)
    })

    const words = this.state.words.map((key, i) => {
      console.log(this.state.metadata[i])
      if (!this.state.metadata[i].includes('undefined')) {
        console.log('HELLO ENTERED 175')
        return (<p id={i}><a href={this.state.metadata[i]}>{key}</a><br></br></p>)
      }
      return (<p id={i}>{key}</p>)
    })

    return (
      <div className="App">
          <link rel="shortcut icon" href="/favicon.ico"></link>
          <div id="inputForm">
            <form onSubmit={this.SubmitHandler}>
              <input type='submit'/>
            </form>
            <div id="wrapper">
              <div>
              <p id="enter"></p>
              </div>
                <textarea ref="input" id="input" type="text">Input text here.</textarea>



                <div id="answer">{listItems}</div>
                <div id="words">{words}</div>
              </div>
          </div>
      </div>
    )
  }
}



export default TryItOut;
