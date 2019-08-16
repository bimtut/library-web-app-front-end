import React from 'react'
import '../style/search.css'

function Search(props) {
    function searchText() {
        props.setSearchtul(document.getElementById('search').value)
        // setSearch didefinisikan di homepage. somehow pemanggilan ini bisa. mirip seperti lempar2 props
    }
    return (
        <input type="text" id="search" onKeyUp={searchText} placeholder="Search Book ... " />
    )
}

export default Search