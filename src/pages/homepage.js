import React from 'react';
import Modal from 'react-responsive-modal';
import Navbar from '../components/Navbar';
import List from '../components/list' //keluarkan add book dari list namun buat dia tetap berfungsi sebagai add/donate
import Search from '../components/search';
import Data from '../components/data'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux' 
import { bookPost, bookEdit } from "../publics_redux/redux/actions/book";
import { async } from 'q';
import { pureUserPost, register, getUserByEmail } from '../publics_redux/redux/actions/user';
import alertModal from '../components/alertModal'
import swal from "sweetalert";

class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            image:null,
            file: null,
            book: [],
            description:'',
            name:'',
            category:'',
            writer:'',
            donateBookShow: false,  
            username:'', 
            email:'',
            password:'',
            checkPassword:'', 
            loading: true,
            modal: ''
            // status:1,
    
        }
        this.onChangeFile = this.onChangeFile.bind(this)
    }
    
    showDonate = () => {
        this.setState({
            donateBookShow: true
        })
    }
    hideDonate = () => {
        this.setState({
            donateBookShow: false
        })
    }

    registration = async (e) => {
        console.log('hahaha')
        e.preventDefault()
        if (this.state.loading) {
            this.state.loading = false
            const data = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                checkPassword: this.state.checkPassword
            }
            if (data.password === data.checkPassword) {
                console.log('jalan')
                await this.props.dispatch(register({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                }))
                if (this.props.user.userList.code === "ER_DUP_ENTRY") {
                    // email sudah terdaftar belum terhandle
                    // const modal = <alertModal show={true} pesan={"Maaaf Email Sudah Terdaftar"} error={true} link={"/register"} setModal={this.setModal} enabled={() => this.state.loading = true} />
                    // this.setState({ modal: modal })
                } else {
                    alert('sukses')
                    
                }    
            } else {
                alert('pass beda')
                
            }
        }
        console.log(this.state)
        this.setState({loading: true})
    }
    // zidni vers
    login = async (e) => {
        e.preventDefault()
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        if (this.state.loading) {
            this.state.loading = false   
            await this.props.dispatch(getUserByEmail({
                email: this.state.email,
                password: this.state.password,
            }))
            console.log(this.props.user.userList)
            if (this.props.user.userList === 'Password Salah') {
                alert('password salah')
                // const modal = <ModalAlert show={true} pesan={"Password Salah"} error={true} link={"/login"} setModal={this.setModal} enabled={() => this.state.loading = true} />
                // this.setState({ modal: modal })
            } else if (this.props.user.userList === "Email Tidak Terdaftar") {
                alert('email tidak terdaftar')
                // const modal = <ModalAlert show={true} pesan={"Email Tidak Terdaftar"} error={true} link={"/login"} setModal={this.setModal} enabled={() => this.state.loading = true} />
                // this.setState({ modal: modal })
            } else {
                alert("sukses")
            }
        }
        this.setState({
            loading: true
        })
    }

    logout = () => {
        localStorage.clear()

        swal({
            title: "Log Out",
            text: `Log Out Success`,
            icon: "success",
            button: "OK"
          }).then(() => {
            window.location.href = '/';
          })
    }

    onChangeFile = (e) => {
        console.log(e.target.files[0]);
        this.setState({
          file: e.target.files[0]
        });
    };

    render() {

        const bookAdd = () => {
			
			const dataFile = new FormData()
			dataFile.append('image', this.state.file)
			dataFile.append('name', this.state.name)
			dataFile.append('writer', this.state.writer)
			dataFile.append('category', this.state.category)
			dataFile.append('description', this.state.description)
			

			add(dataFile)
			
			console.log(this.state.book);
        };
        
        let add = async (data) => {
			await this.props.dispatch(bookPost(data))
			.then(() => {
				swal({
				  title: "Add Book",
				  text: `Add Book Success`,
				  icon: "success",
				  button: "OK"
				}).then(() => {
				  window.location.href = '/';
				})
			  })
		};


        return(
            <div>
                <Navbar logout={this.logout} showLogin={this.props.showaaLogin} showRegis={this.props.showRegis} kartolo={this.props.kartolo} openDonateBut={this.showDonate}/>
                {/* <Search setSearchtul={setSearchtul}/> */}
                <List prop={this.props.prop} search={this.props.search}  /> {/*showModal={this.showLogin} */}
                <Modal classNames="regis" open={this.props.openRegis} onClose={this.props.onCloseRegis} >
                    <h2>Registrasi</h2>
                    <div>
                        <div>
                            <p>username:</p>
                        </div>
                        <div>
                            <input type="text" placeholder="what is your name?" id="username" onChange={(e)=>this.setState({username:e.target.value})}  style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>email:</p>
                        </div>
                        <div>
                            <input type="email" placeholder="what is your email?" id="email" onChange={(e)=>this.setState({email:e.target.value})}  style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>password:</p>
                        </div>
                        <div>
                            <input type="password" placeholder="input password?" id="password" onChange={(e)=>this.setState({password:e.target.value})}  style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>konfirmasi password:</p>
                        </div>
                        <div>
                            <input type="password" placeholder="what is your name?" id="confirm_password" onChange={(e)=>this.setState({checkPassword:e.target.value})}  style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }}/>
                        </div>
                    </div>
                    <div>
                        <button onClick={this.registration}>DAFTAR</button>
                    </div>
                </Modal>
                <Modal classNames="login" onClose={this.props.onCloseLogin} open={this.props.openLogin}>
                    <h2>Login</h2>
                    <div>
                        <div>
                            <p>email:</p>
                        </div>
                        <div>
                            <input autocomplete="off" type={'email'} style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'email'} required onChange={(e)=>this.setState({email:e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>password:</p>
                        </div>
                        <div>
                            <input type={'password'} style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'password'} required onChange={(e)=>this.setState({password:e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <button onClick={this.login} id={'login'} style={{ padding: 10, width: "100%", borderRadius: '5px', border: "4px", backgroundColor: "#24f555", color: "white", fontSize: "10pt", cursor: "pointer", marginTop: "10px" }}>LOG IN</button>
                    </div>
                    <p>Belum punya akun? <a onClick={this.props.showRegis} style={{ textDecoration: "none", color: "blue" }}>Daftar di sini</a></p>
                </Modal>
                
                <Modal classNames='donate' open={this.state.donateBookShow} onClose={this.hideDonate}>
                    {localStorage.role == "admin"? <h2>Add New Book</h2> : <h2>Donate Book</h2>}
                    
                    <div>
                        <div>   
                            <p>name:</p>
                        </div>
                        <div>
                            <input type="text" placeholder="what is your name?" id="name" onChange={(e)=>this.setState({name:e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>writer:</p>
                        </div>
                        <div>
                            <input id="writer" type="text" placeholder="what is your name?" onChange={(e)=>this.setState({writer:e.target.value})}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>category:</p>
                        </div>
                        <div>
                            {/* <input type="text" placeholder="what is your name?" /> */}
                            <select onChange={(e)=>this.setState({category:e.target.value})}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>image:</p>
                        </div>
                        <div>
                            <form action="/profile" method="post" enctype="multipart/form-data">
                                <input type="file" name="avatar" name="title"
										onChange={this.onChangeFile}
										id="title"
										placeholder="Image..."
										bsSize="lg"
										style={{ height: 40, fontSize: 12 }}/>
                            </form>
                            
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>description:</p>
                        </div>
                        <div>
                            <textarea placeholder="Description" onChange={(e)=>this.setState({description:e.target.value})} ></textarea>
                        </div>
                    </div>
                    <div>
                        {/* <button onClick={onCloseDonate}>DONATE BOOK</button> */}
                        {/* <button onClick={this.donate}>DONATE BOOK</button>
                     */}
                        <button type='submit' onClick={bookAdd.bind(this)}>DONATE BOOK</button>

                    </div>
                </Modal>
                
                <Modal classNames="regFailed" open={this.props.openRegFail}>
                    <h2>Registration Failed</h2>
                    <p>username is used by other account</p>
                </Modal>
                <Modal classNames="logFailed" open={this.props.openLogFail}>
                    <h2>Registration Failed</h2>
                    <p>username or password is not correct</p>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      book: state.book,
      user: state.user
    }
  }
export default connect(mapStateToProps)(Homepage)