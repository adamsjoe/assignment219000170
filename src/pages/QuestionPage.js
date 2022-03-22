import AnswerComponent from "../components/AnswerComponent";
import HintComponent from "../components/HintComponent";
import QuestionComponent from "../components/QuestionComponent";
import React, {useState, useEffect} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { unstable_batchedUpdates } from "react-dom";

function QuestionPage(props) {
  const firestore = firebase.firestore();
  const collectionId = "Questions";
  const documentId = "balances" 

  const [questionTitle, setQuestionTitle] = useState();

  // question things
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // answer things
  const [answers, setAnswers] = useState([]);
  const [totalAnswers, setTotalAnswers] = useState(0);


  // hint things
  const [hintTitle, setHintTitle] = useState("");
  const [genColTitle, setGenColTitle] = useState("");
  const [specColTitle, setSpecColTitle] = useState("");

  // states to handle hints
  const [problem_SVideo, setProblem_SVideo] = useState("")
  const [problem_SImage, setProblem_SImage] = useState("")
  const [problem_SText, setProblemSText] = useState("")

  const [spec_strat_balan_sVideo, setSpec_strat_balan_sVideo] = useState("")
  const [spec_strat_balan_sImage, setSpec_strat_balan_sImage] = useState("")
  const [spec_strat_balan_sText, setSpec_strat_balan_sText] = useState("")

  const [mom_sVideo, setMom_sVideo] = useState("")
  const [mom_sImage, setMom_sImage] = useState("")
  const [mom_sText, setMom_sText] = useState("")

  const [specMom_sVideo, setSpecMom_sVideo] = useState("")
  const [specMom_sImage, setSpecMom_sImage] = useState("")
  const [specMom_sText, setSpecMom_sText] = useState("")

  const [gravity_sVideo, setGravity_sVideo] = useState("")
  const [gravity_sImage, setGravity_sImage] = useState("")
  const [gravity_sText, setGravity_sText] = useState("")

  const [specGravity_sVideo, setSpecGravity_sVideo] = useState("")
  const [specGravity_sImage, setSpecGravity_sImage] = useState("")
  const [specGravity_sText, setSpecGravity_sText] = useState("")

  useEffect(() => {    
    
    const getFirebase = async () => {
      const snapshot = await firestore.collection(collectionId).doc(documentId).get();
      const questionData = snapshot.data();     

      unstable_batchedUpdates(() => {

        // question component information
        // get and set the question title
        setQuestionTitle(questionData.balances.balances.questions.title)

        // get and set the question text and image
        setQuestionText(questionData.balances.balances.fullquestion.question) 
        setImageUrl(questionData.balances.balances.fullquestion.imageUrl) 

        // answer component info
        // create a new answer array
        const answerArr = []; 
        let selectedAnswers = 0 

        // add the answer from firestore to the answerArr
        Object.keys(questionData.balances.balances.answers).forEach(key => {        
          const obj = questionData.balances.balances.answers[key]

          // will need to know which document the database holds the chosen info, so let's add it to the array
          obj['key'] = key
          answerArr.push(obj);         

          // count the number of times answers were "picked", (i.e. chosen)
          selectedAnswers += questionData.balances.balances.answers[key].chosen
        });

        // set the answers to be the answersArray
        setAnswers(answerArr) 
        setTotalAnswers(selectedAnswers)

        // hint component info
        // get and set hint title 
        setHintTitle(questionData.balances.balances.hint.titleColumn.title_1.columnTitle)
        
        // get and set general column title 
        setGenColTitle(questionData.balances.balances.hint.titleColumn.title_2.columnTitle)

        // get and set problem specific column title 
        setSpecColTitle(questionData.balances.balances.hint.titleColumn.title_3.columnTitle)

        // problem_s 
        setProblem_SVideo(questionData.balances.balances.hint.video.video_1.videoUrl)
        setProblem_SImage(questionData.balances.balances.hint.video.video_1.image)
        setProblemSText(questionData.balances.balances.hint.video.video_1.title)

        // spec_strat_balan_s
        setSpec_strat_balan_sVideo(questionData.balances.balances.hint.video.video_2.videoUrl)
        setSpec_strat_balan_sImage(questionData.balances.balances.hint.video.video_2.image)
        setSpec_strat_balan_sText(questionData.balances.balances.hint.video.video_2.title)

        // mom_s
        setMom_sVideo(questionData.balances.balances.hint.video.video_3.videoUrl)
        setMom_sImage(questionData.balances.balances.hint.video.video_3.image)
        setMom_sText(questionData.balances.balances.hint.video.video_3.title)

        // spec_mom_s
        setSpecMom_sVideo(questionData.balances.balances.hint.video.video_4.videoUrl)
        setSpecMom_sImage(questionData.balances.balances.hint.video.video_4.image)
        setSpecMom_sText(questionData.balances.balances.hint.video.video_4.title)

        // gravity_s
        setGravity_sVideo(questionData.balances.balances.hint.video.video_5.videoUrl)
        setGravity_sImage(questionData.balances.balances.hint.video.video_5.image)
        setGravity_sText(questionData.balances.balances.hint.video.video_5.title)

        // spec_gravity_s
        setSpecGravity_sVideo(questionData.balances.balances.hint.video.video_6.videoUrl)
        setSpecGravity_sImage(questionData.balances.balances.hint.video.video_6.image)
        setSpecGravity_sText(questionData.balances.balances.hint.video.video_6.title)
      })
    }
    getFirebase();    
    }, [firestore]
  );  
      
  return (    
    <div className="container">
      {console.log('\n\n\nQuestion Page: ', problem_SText)}
        <h1 className="text-center">{questionTitle} problem</h1>
        <div className="row">            
            <QuestionComponent 
              image={imageUrl} 
              text={questionText}
            />
            <HintComponent 
              titleCol={hintTitle}
              genCol={genColTitle}
              specCol={specColTitle}
              
              prob_s_im={problem_SImage}
              prob_s_vid={problem_SVideo}
              prob_s_txt={problem_SText}

              spec_strat_bala_s_im={spec_strat_balan_sImage}
              spec_strat_bala_s_vid={spec_strat_balan_sVideo}
              spec_strat_bala_s_txt={spec_strat_balan_sText}
              
              mom_s_im={mom_sImage}
              mom_s_vid={mom_sVideo}
              mom_s_txt={mom_sText}
              
              specMom_s_im={specMom_sImage}
              specMom_s_vid={specMom_sVideo}
              specMom_s_txt={specMom_sText}
              
              grav_s_im={gravity_sImage}
              grav_s_vid={gravity_sVideo}
              grav_s_txt={gravity_sText}
              
              spec_grav_s_im={specGravity_sImage}
              spec_grav_s_vid={specGravity_sVideo}
              spec_grav_s_txt={specGravity_sText}
            />
        </div>
        <div className="row">
            <AnswerComponent />
        </div>
    </div> 
  )
}

export default QuestionPage;