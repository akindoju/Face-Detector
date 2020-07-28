import React from 'react'


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Password: '',
            Email: '',
            Name: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({Email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({Password: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({Name: event.target.value})
    }

onSubmitSignIn = () => {
        fetch('https://calm-tundra-76384.herokuapp.com/Register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.Email,
                password: this.state.Password,
                name: this.state.Name
            })
        })
        .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            })
    }

    render () {
        return (
            <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mt4">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input 
                            className="b--black f6 w-90 ba br2 center pa2 input-reset bg-transparent hover-bg-black hover-white " 
                            type="name" 
                            name="name"  
                            id="name"
                            onChange = {this.onNameChange}
                        />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="b--black f6 w-100 ba br2 center pa2 input-reset bg-transparent hover-bg-black hover-white " 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange = {this.onEmailChange}
                        />
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b--black f6 w-100 ba br2 center pa2 input-reset bg-transparent hover-bg-black hover-white " 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange = {this.onPasswordChange}
                        />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            onClick = {this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"/>
                    </div>
                    <div className="lh-copy mt3">
                        <p href="#0" className="f6 link dim black db pointer" onClick = {() => this.props.onRouteChange('SignIn')}>Sign In?</p>
                    </div>
                </div>
            </main>
            </article> 
        );
    }
}



export default Register;




