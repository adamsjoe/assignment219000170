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
              prob_s_im={props.prob_s_im}
              prob_s_vid={props.prob_s_vid}
              spec_strat_bala_s_im={props.spec_strat_balan_sImage}
              spec_strat_bala_s_vid={props.spec_strat_balan_sVideo}
              mom_s_im={props.mom_s_image}
              mom_s_vid={props.mom_s_video}
              specMom_s_im={props.spec_mom_s_image}
              specMom_s_vid={props.spec_mom_s_video}
              grav_s_im={props.gravity_sImage}
              grav_s_vid={props.gravity_sVideo}
              spec_grav_s_im={props.specGravity_sImage}
              spec_grav_s_vid={props.specGravity_sVideo}
            />
        </div>
        <div className="row">
            <AnswerComponent answersarray={props.answers} />
        </div>
    </div> 
  )
}

export default QuestionPage;