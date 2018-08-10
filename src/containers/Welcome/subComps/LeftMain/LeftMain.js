import React from 'react';

import classes from './LeftMain.css';

const LeftMain = () => {
    return (
        <div className={classes.LeftMain + " wow fadeIn container mx-auto"}>
            <div className="row justify-content-center">

                <div className="col-12">
                    <h2 className="text-center mb-3 mt-1 wow fadeInLeft">Quick Think</h2>
                </div>

                <div className="col-10 col-sm-12 col-md-6 col-lg-5 d-none d-sm-block my-sm-3 my-md-0">
                    <h4><u>Think Fast!</u></h4>
                    <p>You have 6 seconds to come up with 3 answers to 1 simple question. Sound easy enough right? Well if those neurons aren't crispy, the answer is no, it's hard, harder then you'd expect. 
                        But you got this right? Remember, dont panic!</p>
                </div>

                 <div className="col-10 col-sm-12 col-md-6 col-lg-5">
                    <h4><u>How To Play:</u></h4>
                    <p>1. Each team will take turns answering a question</p>
                    <p>2. Once the question is shown, the team has 6 second to give 3 answers that fulfill the question's criteria</p>
                    <p>3. A team will recieve a point if they give 3 appropriate answers within 6 seconds</p>
                    <p className="mb-0">4. The game ends after one team reaches the goal score</p>
                </div>
            </div>
        </div>
    );
}

export default LeftMain;