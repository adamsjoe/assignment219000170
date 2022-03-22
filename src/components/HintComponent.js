import '../styles/customStyle.css';
import React, {useEffect, useState} from 'react';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import VideoModal from './VideoModal';
import ImageModal from './ImageModal';


function HintComponent(props) {

  const [showVidModal, setShowVidModal] = useState(false)
  const [showImgModal, setShowImgModal] = useState(false)

  const [vidMsg, setVidMsg] = useState("")
  const [vidSize, setVidSize] = useState("")
  const [vidTxt, setVidTxt] = useState("")

  const [img, setImage] = useState("")
  const [imageSize, setImageSize] = useState("")

  function showVideoModal(vidTheMsg, size, txt) {
    setVidMsg(vidTheMsg)
    setVidSize(size)
    setVidTxt(txt)
    setShowVidModal(true)
  }

  function showImageModal(imgUrl, size) {
    setImage(imgUrl)
    setImageSize(size)
    setShowImgModal(true)
  }
  
  return (
    <div className="col-sm">
      <h3 className="text-center">{props.titleCol}</h3>
      <div className="p-3 mb-2 bg-light ">
          <div className="row">
            <div className="col-2 text-center">
              <p><br/></p>    
            </div>            
            <div className="col-5 text-center">
              <p className='headerGeneral'>{props.genCol}</p>    
            </div>
            <div className="col-5 text-center">
              <p className='headerProblemSpecific'>{props.specCol}</p>    
            </div>            
          </div>

          <VideoModal showVModal={showVidModal} onClose={() => setShowVidModal(false)} videoMessage={vidMsg} size={vidSize} firebaseDocument={vidTxt}/>
          <ImageModal showIModal={showImgModal} onClose={() => setShowImgModal(false)} image={img} size={imageSize}/>

          <div className="row p-3">
            <div className="col-2">
              <p>Overall solution strategy</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <button className="buttonGeneral" onClick={() => showVideoModal(props.prob_s_vid, 'med', props.prob_s_txt)}>VIDEO</button> 
              <button className="buttonGeneral" onClick={() => showImageModal(props.prob_s_im, 'med')}>SUMMARY</button>
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">             
              <button className="buttonProblemSpecific" onClick={() => showVideoModal(props.spec_strat_bala_s_vid, 'med', props.spec_strat_bala_s_txt)}>VIDEO</button>                             
              <button className="buttonProblemSpecific" onClick={() => showImageModal(props.spec_strat_bala_s_im, 'med')}>SUMMARY</button>                          
            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2">
              <p>Moments</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <button className="buttonGeneral" onClick={() => showVideoModal(props.mom_s_vid, 'med', props.mom_s_txt)}>VIDEO</button> 
              <button className="buttonGeneral" onClick={() => showImageModal(props.mom_s_im, 'med')}>SUMMARY</button>
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
              <button className="buttonProblemSpecific" onClick={() => showVideoModal(props.specMom_s_vid, 'med', props.specMom_s_txt)}>VIDEO</button> 
              <button className="buttonProblemSpecific" onClick={() => showImageModal(props.specMom_s_im, 'med')}>SUMMARY</button>                             
            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2">
              <p>Gravity</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <button className="buttonGeneral" onClick={() => showVideoModal(props.grav_s_vid, 'med', props.grav_s_txt)}>VIDEO</button>
              <button className="buttonGeneral" onClick={() => showImageModal(props.grav_s_im, 'med')}>SUMMARY</button>
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
              <button className="buttonProblemSpecific" onClick={() => showVideoModal(props.spec_grav_s_vid, 'med', props.spec_grav_s_txt)}>VIDEO</button>
              <button className="buttonProblemSpecific" onClick={() => showImageModal(props.spec_grav_s_im, 'med')}>SUMMARY</button>                               
            </div>            
          </div>

      </div>
  </div>
  );
}

export default HintComponent;