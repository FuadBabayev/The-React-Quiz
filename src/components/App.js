import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NetxButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const seconds_per_question = 30;
const initialState = {
  questions: [],
  status: "loading",   // 'loading', 'error', 'ready', 'active', 'finished' // ! instead of each time write isLoading, isError... Multiple states
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining : null
};
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, /*questions : action.payload,*/ status: 'error' };
    case 'start':
      return { ...state, /*questions : action.payload,*/ status: 'active', secondsRemaining: state.questions.length * seconds_per_question };
    case 'newAnswer':
      const question = state.questions[state.index];
      return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }
    // return { ...state, index: (action.payload < state.questions.length) ? state.index + action.payload : state.questions.length }
    case 'finish':
      return { ...state, highScore: state.points > state.highScore ? state.points : state.highScore, status: 'finished' }
    case 'restart':
      return {...initialState, questions: state.questions,  status: 'ready'}
      // return { ...state, index: 0, answer: null, points: 0, status: 'ready' } 
      // ! bu cur yazmaq meslehetli deyil cunki her sey restart olunmalidir yeni elaver etdiyimiz statelerde
    case 'tick':
      return {...state, secondsRemaining: state.secondsRemaining - 1, status : state.secondsRemaining === 0 ? 'finished' : state.status}
    default:
      throw new Error('Unknown action')
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highScore, secondsRemaining } = state;
  // const [links, setLinks] = useState({});
  const numberQuestions = questions.length;   // ! Derived State
  const maxPossiblePoints = questions.reduce((prev, curr) => {
    return prev + curr.points
  }, 0)

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'dataReceived', payload: data })
        // setLinks(data);
      })
      .catch((error) => {
        dispatch({ type: 'dataFailed', /*payload : error.message*/ })
        // console.warn(error.message);
      })
  }, []);
  // console.log(state);
  // console.log(links);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numberQuestions={numberQuestions} dispatchEvent={dispatch} />}
        {status === 'active' && (<>
          <Progress index={index} numberQuestions={numberQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
          <Question data={questions[index]} dispatchEvent={dispatch} answer={answer} />
          <Footer>
            <Timer secondsRemaining={secondsRemaining} dispatchEvent={dispatch} />
            <NextButton dispatchEvent={dispatch} answer={answer} numberQuestions={numberQuestions} index={index} />
          </Footer>
        </>)
        }
        {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highScore={highScore} dispatchEvent={dispatch} />}
        {/* {status === 'loading' ? <Loader /> 
        : status === 'error' ? <Error />
        : status === 'ready' ? <StartScreen numberQuestions={numberQuestions} dispatchEvent={dispatch}/> 
        : status === 'active' ? <Question /> 
        : null} */}
      </Main>
    </div>
  );
}

export default App;