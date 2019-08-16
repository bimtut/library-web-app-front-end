// import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllBook, getBookSearch, getBookid, bookDelete, bookEdit, pinjam, kembalikan } from '../publics_redux/redux/actions/book'
import { pureUserPost, register, getUserByEmail } from '../publics_redux/redux/actions/user';

// import { getBook } from '../publics/redux/action/book'
// import { deleteBook } from '../publics/redux/action/book'
// import ModalAlert from './ModalAlert'

let ul = {
    margin: 0,
    listStyleType: "none",
    position: "absolute",
    zIndex: 10,
    right: 40,
    borderTop: "3px solid grey"
}

let li = {
    padding: "30px 20px",
    display: "inline-block"
}

let cover = {
    width: "100%",
    height: "300px",
    background: "black",
    objectFit: "cover",
    objectPosition: "50% 50%"
}

let thumbnail = {
    position: "absolute",
    top: "250px",
    right: "85px",
    width: "15%",
    // height: "auto",
    border: "2px solid white",
    // borderColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 4px black",
    objectFit: "contain",
    zIndex: 400
}

let desc = {
    padding: "30px 100px",
    width: "60%",
    position: "relative",
    border: "2px solid black"
}

let bookData = {
    display: "inline-block",
    // padding: "0px 20px 0px 0px",
    width: "35%",
    borderTop: "3px solid grey",
    borderBottom: "3px solid grey"
}

let centerData = {
    display: "inline-block",
    paddingLeft: "20px",
    width: "28%",
    borderLeft: "1px solid grey",
    borderTop: "3px solid grey",
    borderBottom: "3px solid grey"
}
class BookDescription extends Component {
    constructor(props) {
        super(props)
        this.state = {
  
            username:'', 
            email:'',
            password:'',
            checkPassword:'', 
            book: [],
        //   input: [],
            name: '',
            writer: '',
            description: '',
            openEdit: false,
            regisShow: false,
            loginShow: false,
        //   modal
        }
    }
    componentDidMount = async () => {
        console.log(this.props.match.params.bookid)
        // await this.props.dispatch(getAllBook(''))
        await this.props.dispatch(getBookid(this.props.match.params.bookid))
        await new Promise(resolve => setTimeout(resolve, 500))
        this.setState({
            book: this.props.book.bookEdit.result
        })
        console.log('cek ',this.state.book)
        console.log('local storage', localStorage)
      }

    showRegis = () => {
        this.setState({regisShow: true})
    }
    hideRegis = () => {
        this.setState({
            regisShow: false,
            loginShow: false
        })
    }
    // login button
    showLogin = () => {
        this.setState({loginShow: true})
    }
    hideLogin = () => {
        this.setState({
            loginShow: false,
            regisShow: false
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
      hideEdit = () => {
          this.setState({
              openEdit: false
          })
      }

      showEdit = () => {
          this.setState({
              openEdit: true
          })
      }

      editBook = () => {
          // console.log(this.state);
          const input = {
              name: this.state.name,
              writer: this.state.writer,
              description: this.state.description
              
            }
            console.log('ini nih ',input)
            const id = this.props.match.params.bookid
            this.props.dispatch(bookEdit(input, id))
            this.setState({ openEdit: false})
        
      }

      deletebook = () => {
        const id = this.props.match.params.bookid
        this.props.dispatch(bookDelete(id))

      }
      pinjam = () => {
        const input = {
            // name: this.state.book['name'],
            // writer: this.state.book['writer'],
            // description: this.state.book['description'],
            status: 0
        }
        console.log('ini nih ',input)
        const id = this.props.match.params.bookid
        this.props.dispatch(pinjam(input, id))
        this.setState({ openEdit: false})
      }
      kembalikan = () => {
        const input = {
            status: 1
            }
          console.log('ini nih ',input)
          const id = this.props.match.params.bookid
          this.props.dispatch(kembalikan(input, id))
          this.setState({ openEdit: false})
      }
     
    render() {
        const book = this.state.book
        const bookEdit = this.state.book.bookEdit
        return(
            
            <div>
                <div>
                    
                    <ul style={ul}>
                        <li style={li}><Link to="/" className="back">&lArr;</Link></li>
                        {localStorage.role == "admin" ?  <li className="button" style={li}><button onClick={this.deletebook}>Delete</button></li> : ''}
                        {localStorage.role == "admin" ?  <li className="button" style={li}><button onClick={this.showEdit}>Edit</button></li> : ''}
                       
                         
                        {localStorage.role == "admin" ? '' :
                        <li className="button" style={li}>
                            {localStorage.token == null ? <div>
                                <button style={{backgroundColor: "green", color:"white"}} onClick={this.showLogin}>Pinjam</button>
                            </div>: <div>
                            {this.state.book['status'] == 1 ? <button style={{backgroundColor: "green", color:"white"}} onClick={this.pinjam}>Pinjam</button> : <button style={{backgroundColor: "red", color:"white"}} onClick={this.kembalikan}>Kembalikan</button>}
                            </div>}
                            
                            
                        </li>}
                        
                    </ul>
                    <img style={cover}  src={book.image } alt={book.name }/>
                    {/* src="https://thatoregonlife.com/wp-content/uploads/2015/05/27993654_1593130604112970_2936930738014436383_o.jpg" alt="khbkuvkukj" */}
                </div>
                <div style={desc}>
                    <h2 className="bookName">{book.name } </h2>
                    <div >
                        <div className="writer" style={bookData}>
                            <p>penulis: {book.writer }</p>
                        </div>
                        <div className="category" style={centerData}>
                            <p>kategori: {book.category }</p>
                        </div>
                        
                    </div>
                    <div className="description">
                        <p>Deskipsi Buku:</p>
                        <p>{book.description }
                        </p>
                        {/* <textarea placeholder="asu"></textarea> */}
                    </div>
                </div>
                {/* kenapa teh ini desc nya terbatas gitu ukurannya? kapan diaturnya? */}
                <img style={thumbnail} src={book.image } alt={book.name } />
                
                <Modal classNames="edit" onClose={this.hideEdit} open={this.state.openEdit}>
                    <h2>Login</h2>
                    <div>
                        <div>
                            <p>name:</p>
                        </div>
                        <div>
                            <input type="text" placeholder={book.name} onChange={(e)=>this.setState({name:e.target.value}) }required/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>writer:</p>
                        </div>
                        <div>
                            <input type="text" placeholder={book.writer} onChange={(e)=>this.setState({writer:e.target.value}) }required/>
                        </div>
                    </div>
                    
                    <div>
                        <div>
                            <p>description:</p>
                        </div>
                        <div>
                            <textarea rows="20" type="text" placeholder={book.description} onChange={(e)=>this.setState({description:e.target.value}) }required/>
                        </div>
                    </div>
                    <div>
                        <button onClick={this.editBook}>EDIT</button>
                    </div>
                </Modal>
                <Modal classNames="regis" open={this.state.regisShow} onClose={this.hideRegis} >
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
                <Modal classNames="login" onClose={this.hideLogin} open={this.state.loginShow}>
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
                    <p>Belum punya akun? <a onClick={this.showRegis} style={{ textDecoration: "none", color: "blue" }}>Daftar di sini</a></p>
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

export default connect(mapStateToProps)(BookDescription)

  



