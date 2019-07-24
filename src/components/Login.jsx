import React, { Component } from 'react';
import '../styles/Login.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userName: '',
            password: '',
            isDataFetching: false
        }
    }

    render() {
        return (
            <Card title="Login" style={{ width: '500px', marginTop: '40%' }}>
                <div className="login">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" style={{ width: '100%' }} onChange={this.onChange} name="userName" />
                    </div>
                    <div className="p-inputgroup" style={{ marginTop: '2rem' }}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-password"></i>
                        </span>
                        <Password value={this.state.value} onChange={this.onChange} style={{ width: '100%' }} name="password" feedback={false}/>
                    </div>
                    {
                        this.state.isDataFetching &&
                        <ProgressBar mode="indeterminate" style={{ height: '10px', marginTop: '1rem' }}></ProgressBar>
                    }
                    <Button label="Login" className="p-button-rounded" onClick={this.onSubmit}
                        style={{ alignSelf: 'flex-end', marginTop: '2rem', width: '150px' }} />
                </div>
            </Card>
        )
    }

    onChange = e => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            [name]: value
        }))
    }

    onSubmit = e => {
        this.setState(prevState => ({
            isDataFetching: true
        }))
        this.props.onAuthenticate(this.state.userName, this.state.password, async () => {
            this.props.postsHandle.find({}).toArray().then(posts => {
                this.setState(prevState => ({
                    isDataFetching: false
                }), () => {
                    this.props.history.push('/posts', {
                        posts
                    });
                })
            }).catch(err => {
                this.props.showGrowl('error', 'STITCH CHEATED YOU!', `${err}`)
            });
        });
    }
}

export default Login;