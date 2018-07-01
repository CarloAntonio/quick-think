import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';

import Aux from '../../../../hoc/Aux';

import iClasses from './RightMain.css';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 380,
    },
});

const RightMain = (props) => {

    const { classes } = props;
    const aClasses = { ...classes, ...iClasses }

    const formElementsArray = [];

    for (let key in props.questionForm) {
        formElementsArray.push({
            id: key,
            config: props.questionForm[key]
        })
    }

    let form = formElementsArray.map((formElement, index) => {
        return <Aux
                    key={index}>
                    <FormControl className={aClasses.formControl}>
                        <InputLabel htmlFor={index}>{formElement.config.label}</InputLabel>
                        <Input
                        inputProps={{
                            name: formElement.config.label,
                            id: {index},
                        }}
                        value={formElement.config.value}
                        onChange={(event) => props.questionInputChangedHandler(event, formElement.id)}/>
                    </FormControl>
                    <br/>
                </Aux>
    });

    return (
        <Aux>
            <Paper className={aClasses.paper}>
                { props.isAuth 
                ? <div className= { aClasses.RightMain }>
                    <h1>Add To Our Question List</h1>
                    <p>Please keep in mind kids of all ages will play this game</p>

                    { props.submitted 
                        ? null
                        : <form>{form} </form> 
                    }
                    
                  </div>
                : null
                }
                

                {props.submitting
                    ? <Spinner />
                    : null
                }

                { props.isAuth 
                    ? props.submitted
                        ? <div className="wow fadeInUp">
                            <div className={aClasses.thanks}>
                                Thanks For Contributing!
                            </div>
                            <Button 
                                className={aClasses.button}
                                variant="contained" 
                                color="secondary"
                                onClick={props.onSubmitAnotherQuestion}
                                >
                                Submit Another!
                            </Button>
                          </div>
                        : <Button 
                            className={aClasses.button + " wow fadeInLeft"}
                            variant="contained" 
                            color="secondary"
                            onClick={props.submitQuestionHandler}
                            >
                            Submit
                          </Button>
                    
                    : null
                }

                { props.isAuth 
                    ?<hr className={aClasses.divider}/>
                    : null
                }
                
                <div className= { aClasses.RightMain }>
                    <h1>Quick Setup:</h1>
                    <p>Pick Team Names</p>
                    <p>Pick a Score to Reach</p>
                </div>
                <Button 
                    className={aClasses.button + " wow fadeInRight"}
                    variant="contained" 
                    color="primary"
                    onClick={props.startHandler}
                    >
                    New Game
                </Button>

                <hr className={aClasses.divider}/>

                <div className= { aClasses.RightMain }>
                    <h1>Play Now:</h1>
                    <p>Default Team Names</p>
                    <p>First Team to 10 Wins!</p>
                </div>
                <Button 
                    className={aClasses.button + " wow fadeInLeft"}
                    variant="contained" 
                    color="primary"
                    onClick={props.quickStartHandler}
                    >
                    Quick Start
                </Button>
            </Paper>
        </Aux>
    );
}

RightMain.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RightMain);