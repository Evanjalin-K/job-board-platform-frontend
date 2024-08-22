import { useState } from "react"

const HomeContent = () => {
    const [bgImage, setBgImage ] = useState("https://media.istockphoto.com/id/907677754/photo/group-of-three-young-coworkers-working-on-laptop-computer-at-office-woman-holding-tablet-and.jpg?s=1024x1024&w=is&k=20&c=nM697nXaMf9L1nZfi1s9-vcETcUwb1yf2SwBCytwMG4=")

  return (
    <div style={{ backgroundImage: `url(${bgImage})`}}>
        <div className="container" >
            <div className="row">
                <div className="col-md-12 " >
                    <div className="card" style={{border:'none', backgroundColor: 'transparent', height: '70vh'}}>
                        <div className="card-body" >
                            <p style={{marginTop: "100px"}}> <strong>Welcome to Jobee..!  Your Ultimate Destination for Career Advancement and Job Opportunities</strong> </p>
                            <p><strong>At Jobee, we are dedicated to being your premier platform for navigating the complex world of career development and job searching. Whether you are just starting out in your professional journey or looking to elevate your career to new heights, Jobee is designed with your success in mind.</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeContent