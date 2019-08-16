import React, {Component} from 'react'
import Search from '../components/search'
import { Link } from 'react-router-dom'
import '../style/list.css'
import {connect} from 'react-redux' 
import { getAllBook, getBookSearch, getBookid } from "../publics_redux/redux/actions/book";
import { async } from 'q';

// function text(text) {
//     let textSplit
//     if (text.length > 20) { 
//         textSplit = text.substr(0, 20)
//         return `${textSplit} ...`
//     } else {
//         textSplit = text
//         return `${textSplit}`
//     }
// }

class List extends Component {
    constructor() {
        super()
        this.state ={
            // dataMap:'',
            data:[],
            loading: true,
            numPage: 1,
            Book: [],
            sumPage: "",
            Page : []

        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getAllBook());
        console.log(this.props);
        
        this.setState({data:this.props.Book.bookList.result})
        
        // console.log(this.state.lengthData);
        
        
    }

    getAllBook = async () => {
        await this.props.dispatch(getAllBook());
        this.setState({data:this.props.Book.bookList.result})
        console.log(this.state.data);
    }        
        
    // getBookSearch = async () => {
    //     await this.props.dispatch(getBookSearch());
    //     this.setState({data:this.props.Book.bookList.result})
    //     console.log(this.state.data);
    // }

    getBookSearch = async (e) => {
        await this.props.dispatch(getBookSearch(e));
        this.setState({data:this.props.Book.bookList.result})
        console.log(this.state.data);
    }

    search = async (e) => {
        console.log(e);
        
        await this.props.dispatch(getBookSearch(e.target.value))
        console.log(this.props)
        this.setState({data:this.props.Book.bookList.result})

    }
    // inputDataMap() {
    //     if (search !== '') { 
    //         dataMap = prop.Data.filter(item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1) 
    //     }

    // }

    // inputData() {
        
    //     let data = search !== '' ? dataMap : prop.Data
    //     console.log("datamap", dataMap)
    // }
    render () {
        return (    
            <div className="list">
                {/* <button className="add" onClick={showModal}>ADD</button> */}
                <div>
                    <Search trySearch={this.search}/>
                </div>
                <div className="list-item">
                    {console.log(this.state.data)}
                    {
                        this.state.data.map(
                            item => {
                                return (
                                    <Link to={`/${item.id}`}>
                                    {item.status == 1 ? (
                                    <div className="item" id="items" bookid={item.id} key={item.id} style={{backgroundColor: "white"}}>
                                    {console.log('this id ',item.id)}
                                            <img src={item.image} alt="gambar" />
                                            <div>
                                                {console.log(item)}
                                                <p>{(item.name)}</p>
                                            </div>
                                        </div>

                                ) : (
                                    <div className="item" id="items" bookid={item.id} key={item.id} style={{backgroundColor: "red"}}>
                                    {console.log('this id ',item.id)}
                                    
                                            <img src={item.image} alt={item.name} />
                                            <div>
                                                {console.log(item)}
                                                <p>{(item.name)}</p>
                                            </div>
                                        </div>
                                )
                                }    
                                    </Link>
                                )
                            }
                        )
                    }
                </div>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
      Book: state.book,
    //   Page: state.Page
    };
  };
  
export default connect(mapStateToProps)(List);
