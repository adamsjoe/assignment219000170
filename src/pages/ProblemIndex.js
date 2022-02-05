import NavbarComponent from "../components/NavbarComponent";

function ProblemIndex() {
  return (
    <div className="container headingLine">
        <div className="row">
          <NavbarComponent />
        </div>
        <h1 className="text-center">Problem Index</h1>
        <div className="row">            
        {/* import the pages and use routes - pick up the url for the next page? */}
        </div>
    </div>
  )
}

export default ProblemIndex;