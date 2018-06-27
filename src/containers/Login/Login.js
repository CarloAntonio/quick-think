import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withStyles } from '@material-ui/core/styles';
 
import { checkValidity } from '../../utility/utility';

import iClasses from './Login.css';
import * as actions from '../../store/actions/actions';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
});

class Login extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
    }

    componentDidMount() {
        this.props.onLoginPage();
    }

    componentWillUnmount() {
        this.props.leavingLoginPage();
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({ controls: updatedControls });
    }

    onLogin = () => {
        this.props.onAuth(
            this.state.controls.email.value, 
            this.state.controls.password.value, 
        );
    }

    onSignup = () => {
        this.props.onRegister(
            this.state.controls.email.value, 
            this.state.controls.password.value, 
        );
    }

    render() {
        const { classes } = this.props;

        const formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => {
            return <Input 
                        key={formElement.id}
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>

        });

        //show spinner while waiting for response from firebase api
        if (this.props.loading) {
            form = <Spinner />
        }

        //show error message if error occurs
        let errorMessage = null;
        if (this.props.error) {

            let message = this.props.error.message

            if(this.props.error.message === "EMAIL_EXISTS") {
                message = "Email Already Registered";
            } else if (this.props.error.message === "INVALID_PASSWORD") {
                message = "Incorrect Password";
            }

            errorMessage = (
                <p>{message}</p>
            );
        }

        //setup redirect once user is authenticated
        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={iClasses.Auth}>
                {authRedirect}
                {errorMessage}
                <form>
                    {form}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.onLogin}>
                        Login
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.onSignup}>
                        Sign-Up
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.redAuth.loading,
        error: state.redAuth.error,
        isAuth: state.redAuth.token !== null,
        authRedirectPath: state.redAuth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onRegister: (email, password) => dispatch(actions.register(email, password)),
        onLoginPage: () => dispatch(actions.onLoginPage()),
        leavingLoginPage: () => dispatch(actions.leavingLoginPage()),
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));