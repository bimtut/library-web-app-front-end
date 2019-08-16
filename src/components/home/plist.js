import React from 'react'
import { Link } from 'react-router-dom'
import '../style/list.css'

function text(text) {
    // batasan text dalam nama buku
    let textSplit
    if (text.length > 20) { 
        // kondisi kalo hurufnya buanyak buanget
        textSplit = text.substr(0, 20)
        return `${textSplit} ...`
    } else {
        textSplit = text
        return `${textSplit}`
    }
}
function list({ prop, search/*, showModal */}) {
    // dataMap ini nanti isinya data data yang COCOk dengan hasil dearch
    let dataMap


    if (search !== '') { // kalo seacrhnya ndak kosong maka...
        // ini "function" buat nyari item yang cocok dengan text yang dimasukan di search tab. kalo ndak ada yang cocok ya ndak tampil
        dataMap = prop.Data.filter(item => item.title.toLowerCase().indexOf(search.toLowerCase()) > -1) //fungsi ini mencari nama yang cocok yang punya index lebih dari 1
    }
    // kondisi kalo search diisi maka data yang ditampilkan adalah hasil dari search
    let data = search !== '' ? dataMap : prop.Data
    console.log("datamap", dataMap)

    return (    
        <div className="list">
            {/* <button className="add" onClick={showModal}>ADD</button> */}
            <div className="list-item">
                {
                    // nih, yang ditampilkan adalah data yang bersumber dari variabel "data"
                    data.map(
                        item => {
                            return (
                                // <Link to={`/${item.bookid}`}>
                                    <div className="item" id="items" bookid={item.bookid}>
                                        <img src={item.image_url} alt="gambar" />
                                        <div>
                                            {console.log(item)}
                                            <p>{text(item.title)}</p>
                                        </div>
                                    </div>
                                // </Link>
                            )
                        }
                    )

                }
            </div>
        </div>
    )
}


export default list