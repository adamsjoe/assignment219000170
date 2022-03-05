import AnswerComponent from "../components/AnswerComponent";
import HintComponent from "../components/HintComponent";
import QuestionComponent from "../components/QuestionComponent";

function QuestionPage(props) {
  return (
    <div className="container">
        <h1 className="text-center">{props.questionTitle} problem</h1>
        <div className="row">            
            <QuestionComponent 
              image={props.image} 
              text={props.text}
            />
            <HintComponent 
              titleCol={props.hintColHeading}
              genCol={props.genColHeading}
              specCol={props.specColHeading}
              info={props.hintData} 
              image_1={props.hint_image_1}
            />
        </div>
        <div className="row">
            <AnswerComponent answersarray={props.answers} />
        </div>
    </div> 
  )
}

export default QuestionPage;