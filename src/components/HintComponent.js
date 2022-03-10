import '../styles/customStyle.css';
import React, {useEffect, useState} from 'react';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import VideoModal from './VideoModal';
import ImageModal from './ImageModal';

function HintComponent(props) {
  
  const [showModalProblemS_vid, setShowModalProblemS_vid] = useState(false);
  const [showModalProblemS_summary, setShowModalProblemS_summary] = useState(false);
  
  const [specStratBalanS_vid, setSpecStratBalanS_vid] = useState(false);
  const [specStratBalanS_summary, setSpecStratBalanS_summary] = useState(false);

  const [mom_s_vid, setMom_s_vid] = useState(false);
  const [mom_s_summary, setMom_s_summary] = useState(false);

  const [specMom_s_vid, setSpecMom_s_vid] = useState(false);
  const [specMom_s_summary, setSpecMom_s_summary] = useState(false);

  const [showGrav_sVid, setShowGrav_sVid] = useState(false);
  const [showGrav_sSummary, setShowGrav_sSummary] = useState(false);

  const [showSpecGrav_sVid, setShowSpecGrav_sVid] = useState(false);
  const [showSpecGrav_sSummary, setShowSpecGrav_sSummary] = useState(false);
  
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

          <div className="row p-3">
            <div className="col-2">
              <p>Overall solution strategy</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <button className="buttonGeneral" onClick={()=>setShowModalProblemS_vid(true)}>VIDEO</button> 
              <VideoModal showModal={showModalProblemS_vid} onClose={() => setShowModalProblemS_vid(false)} videoMessage={props.prob_s_vid} size='med'/>              

              <button className="buttonGeneral" onClick={()=>setShowModalProblemS_summary(true)}>SUMMARY</button>
              <ImageModal showModal={showModalProblemS_summary} onClose={() => setShowModalProblemS_summary(false)} image={props.prob_s_im} size='med'/>
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
              <button className="buttonProblemSpecific" onClick={()=>setSpecStratBalanS_vid(true)}>VIDEO</button> 
              <VideoModal showModal={specStratBalanS_vid} onClose={() => setSpecStratBalanS_vid(false)} videoMessage={props.spec_strat_bala_s_vid} size='med'/>              
              
              <button className="buttonProblemSpecific" onClick={()=>setSpecStratBalanS_summary(true)}>SUMMARY</button>                            
              <ImageModal showModal={specStratBalanS_summary} onClose={() => setSpecStratBalanS_summary(false)} image={props.spec_strat_bala_s_im} size='med'/>

            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2">
              <p>Moments</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <button className="buttonGeneral" onClick={()=>setMom_s_vid(true)}>VIDEO</button> 
              <VideoModal showModal={mom_s_vid} onClose={() => setMom_s_vid(false)} videoMessage={props.mom_s_vid} size='med'/>              

              <button className="buttonGeneral" onClick={()=>setMom_s_summary(true)}>SUMMARY</button>
              <ImageModal showModal={mom_s_summary} onClose={() => setMom_s_summary(false)} image={props.mom_s_im} size='med'/>
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
              <button className="buttonProblemSpecific" onClick={()=>setSpecMom_s_vid(true)}>VIDEO</button> 
              <VideoModal showModal={specMom_s_vid} onClose={() => setSpecMom_s_vid(false)} videoMessage={props.specMom_s_vid} size='med'/>              

              <button className="buttonProblemSpecific" onClick={()=>setSpecMom_s_summary(true)}>SUMMARY</button>                             
              <ImageModal showModal={specMom_s_summary} onClose={() => setSpecMom_s_summary(false)} image={props.specMom_s_im} size='med'/>
            </div>            
          </div>

          <div className="row p-3">
            <div className="col-2">
              <p>Gravity</p>
            </div>            
            <div className="col-5 d-grid gap-2 borderGeneral">
              <button className="buttonGeneral" onClick={()=>setShowGrav_sVid(true)}>VIDEO</button>
              <VideoModal showModal={showGrav_sVid} onClose={() => setShowGrav_sVid(false)} videoMessage={props.grav_s_vid} size='med'/>              

              <button className="buttonGeneral" onClick={()=>setShowGrav_sSummary(true)}>SUMMARY</button>
              <ImageModal showModal={showGrav_sSummary} onClose={() => setShowGrav_sSummary(false)} image={props.grav_s_im} size='med'/>
            </div>

            <div className="col-5 d-grid gap-2 borderProblemSpecific">
              <button className="buttonProblemSpecific" onClick={()=>setShowSpecGrav_sVid(true)}>VIDEO</button>
              <VideoModal showModal={showSpecGrav_sVid} onClose={() => setShowSpecGrav_sVid(false)} videoMessage={props.spec_grav_s_vid} size='med'/>              

              <button className="buttonProblemSpecific" onClick={()=>setShowSpecGrav_sSummary(true)}>SUMMARY</button>                               
              <ImageModal showModal={showSpecGrav_sSummary} onClose={() => setShowSpecGrav_sSummary(false)} image={props.spec_grav_s_im} size='med'/>
            </div>            
          </div>

      </div>
  </div>
  );
}

export default HintComponent;