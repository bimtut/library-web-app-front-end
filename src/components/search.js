import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {getBookSearch} from '../publics_redux/redux/actions/book'
import '../style/search.css'
// import React, {Component} from 'react'
// import Search from '../components/search'
// import { Link } from 'react-router-dom'
// import '../style/list.css'
import {connect} from 'react-redux' 
import { getAllBook, getBookSearch, getBookid } from "../publics_redux/redux/actions/book";
// import { async } from 'q';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    // search = async (e) => {
    //     await this.props.dispatch(getBookSearch(e.currentTarget.value))
    //     console.log(this.props)
    //     this.props.setSearch(this.props.book)
    
    // }
    // componentDidMount = async() => {
    //     await this.props.dispatch(getBookSearch(""))
    //     this.props.setSearch(this.props.book)
        
    // }
    
    // searchText() {
    //     this.props.setSearchtul(document.getElementById('search').value)
    //     // setSearch didefinisikan di homepage. somehow pemanggilan ini bisa. mirip seperti lempar2 props
    // }
   
    render() {
        return (
            <input type="text" id="search" onKeyUp={this.props.trySearch} placeholder="Search Book ... " />
        )
    }

}
const mapStateToProps = state => {
    return {
      Book: state.book,
    //   Page: state.Page
    };
  };
  
export default connect(mapStateToProps)(Search);

// export default Search