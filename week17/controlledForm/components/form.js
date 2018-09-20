import React, { Component } from "react";
import FormInput from "./formInput";
import Footer from "./footer";
import FormSelect from "./formSelect";
import _ from 'lodash';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                title: "Mr",
                username: "",
                email: "",
                password1: "",
                password2: "",
            },
            buttonEnabled: false,
            formSubmitted: false,
            errorMessages: []
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.table(this.state.formData);

        // fake a 200 response
        this.setState({
            formSubmitted: true
        })
    }

    validatePassword() {
        const { password1, password2 } = this.state.formData;

        return (password1 === password2) ? [] : ["Passwords do not match"];
    }

    validationMessages() {
        const passwordError = this.validatePassword();

        this.setState({
            errorMessages: [passwordError]
        });
    }

    checkFormCompletion() {
        const { formData } = this.state;
        const passwordsMatch = formData.password1 === formData.password2;
        const fieldsCompleted = _.map(formData, (data) => data.length > 0 );
        const isFormCompleted = _.every(fieldsCompleted, (field)=> field);

        this.setState({
            buttonEnabled: isFormCompleted && passwordsMatch,
        });
    }

    handleChange(e) {
        const { value, name } = e.target;

        this.setState({
            formData: { ...this.state.formData, [name]: _.trimStart(value) }
            }, () => {
            this.validationMessages();
            this.checkFormCompletion();
        });
    }

    titleOptions() {
        return [{value: "mr", text:"Mr"},
            {value: "Mrs", text:"Mrs"},
            {value: "miss", text:"Miss"},
            {value: "dr", text:"Dr"}]
    }

    render() {
        const { title, username, email, password1, password2 } = this.state.formData;
        const { buttonEnabled, formSubmitted, errorMessages } = this.state;
        
        return (
            <div className="conatiner">
                <form className="form" onSubmit={(e) => { this.handleSubmit(e)}}>
                    <h1 className="form__header">Would you like to know more?</h1>
                    <fieldset className="form_fieldset">
                        <FormSelect
                            options={ this.titleOptions() }
                            value={ title }
                            label="Title"
                            id="title"
                            callBack={(e) => { this.handleChange(e)}} />
                        <FormInput
                            value={ username }
                            label="Username"
                            id="username"
                            callBack={(e) => { this.handleChange(e)}} />
                        <FormInput
                            value={ email }
                            type="email"
                            label="Email"
                            id="email"
                            callBack={(e) => { this.handleChange(e)}} />
                        <FormInput
                            value={ password1 }
                            label="Password"
                            id="password1"
                            callBack={(e) => { this.handleChange(e)}} />
                        <FormInput
                            value={ password2 }
                            label="Repeat password"
                            id="password2"
                            callBack={(e) => { this.handleChange(e)}} />
                    </fieldset>
                    <Footer
                        buttonLabelState1={ "Submit" }
                        buttonLabelState2={ formSubmitted && "Success!" }
                        validationMessages={ errorMessages }
                        isDisabled={ !buttonEnabled } />
                </form>
            </div>
        );
    }
}

export default Form;