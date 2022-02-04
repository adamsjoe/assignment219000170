import AnswerComponent from "../components/AnswerComponent";
import HintComponent from "../components/HintComponent";
import QuestionComponent from "../components/QuestionComponent";

function QuestionPage() {
  return (
    <div className="container">
        <h1 className="text-center">Question Page</h1>
        <div className="row">
            <QuestionComponent />
            <HintComponent />
        </div>
        <div className="row">
            <AnswerComponent />
        </div>
    </div>
  )
}

export default QuestionPage;