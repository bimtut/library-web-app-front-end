// import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllBook, getBookSearch, getBookid, bookDelete, bookEdit } from '../publics_redux/redux/actions/book'
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
            book: [],
        //   input: [],
            name: '',
            writer: '',
            description: '',
            openEdit: false
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
            status: 0
        }
        console.log('ini nih ',input)
        const id = this.props.match.params.bookid
        this.props.dispatch(bookEdit(input, id))
        this.setState({ openEdit: false})
      }
      kembalikan = () => {
        const input = {
            status: 1
            
            
          }
          console.log('ini nih ',input)
          const id = this.props.match.params.bookid
          this.props.dispatch(bookEdit(input, id))
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
                                <button style={{backgroundColor: "green", color:"white"}} onClick={this.pinjam}>Pinjam</button>
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

  



