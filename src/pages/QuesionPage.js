function QuestionPage() {
  return (
<div className="container">
            <h1 className="text-center">Question Page</h1>
            <div className="row">
                <div className="col-sm">
                    <h3 className="text-center">Question</h3>
                    <div className="p-3 mb-2 bg-light">
                        <div className="text-center">
                            <img className="mb-4 rounded img-fluid" src="https://i-want-to-study-engineering.org/figs/balances.png" />
                        </div>
                        <p>Three balances are supported on rigid pivots and connected by two flexible light strings as shown in the diagram above. Note that the centre balance operates upside down compared to the other two. What value of mass X will enable the system to balance?</p>
                    </div>
                </div>
                <div className="col-sm">
                    <h3 className="text-center">Hints</h3>
                    <div className="p-3 mb-2 bg-light">
                        <div className="row">
                            <div className="col-6 text-center">
                                <p>General</p>
                                <div className="mb-5 d-grid gap-2">
                                    <button type="button" className="btn btn-primary mb-1 p-2">Primary</button>
                                    <button type="button" className="btn btn-primary mb-1 p-2">Primary</button>                                    
                                </div>
                                <div className="mb-5 d-grid gap-2">
                                    <button type="button" className="btn btn-primary mb-1 p-2">Primary</button>
                                    <button type="button" className="btn btn-primary mb-1 p-2">Primary</button>                                    
                                </div>
                                <div className="mb-5 d-grid gap-2">
                                    <button type="button" className="btn btn-primary mb-1 p-2">Primary</button>
                                    <button type="button" className="btn btn-primary mb-1 p-2">Primary</button>                                    
                                </div>                                                                
                            </div>
                            <div className="col-6 text-center">
                                <p>General</p>
                                <div className="mb-5 d-grid gap-2">
                                    <button type="button" className="btn btn-success mb-1 p-2">Success</button>
                                    <button type="button" className="btn btn-success mb-1 p-2">Success</button>                                    
                                </div>
                                <div className="mb-5 d-grid gap-2">
                                    <button type="button" className="btn btn-success mb-1 p-2">Success</button>
                                    <button type="button" className="btn btn-success mb-1 p-2">Success</button>                                    
                                </div>
                                <div className="mb-5 d-grid gap-2">
                                    <button type="button" className="btn btn-success mb-1 p-2">Success</button>
                                    <button type="button" className="btn btn-success mb-1 p-2">Success</button>                                    
                                </div>                                                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h3 className="text-center">Answers</h3>
                    <div className="p-3 mb-2 bg-light">
                        <div className="row">
                            <div className="col-sm d-grid gap-2">
                                <button type="button" className="btn btn-secondary mb-2 p-4">Secondary</button>
                                <button type="button" className="btn btn-secondary mb-2 p-4">Secondary</button>
                            </div>
                            <div className="col-sm d-grid gap-2">
                                <button type="button" className="btn btn-secondary mb-2 p-4">Secondary</button>
                                <button type="button" className="btn btn-secondary mb-2 p-4">Secondary</button>
                            </div>                            
                        </div>  
                        <div className="row">
                            <div className="col-sm text-center">
                                <button type="button" className="btn btn-primary mb-2 p-4">Primary</button>
                            </div>
                        </div>                      
                    </div>
                </div>                
            </div>
        </div>
  )
}

export default QuestionPage;