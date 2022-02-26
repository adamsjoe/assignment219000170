import AnswerComponent from "../components/AnswerComponent";
import HintComponent from "../components/HintComponent";
import QuestionComponent from "../components/QuestionComponent";

function QuestionPage(props) {
  console.log(">> ques", props)
  return (
    <div className="container">
        <h1 className="text-center">Balances problem</h1>
        <div className="row">            
            <QuestionComponent image={props.image} text={props.text}/>
            <HintComponent />
        </div>
        <div className="row">
            <AnswerComponent answersArray={props.answersArray} />
        </div>
    </div> 
  )
}

export default QuestionPage;