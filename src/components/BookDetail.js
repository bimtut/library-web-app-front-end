import React from 'react'
import { Link } from 'react-router-dom'


function convert(date) {
  let data = Date.parse(date)
  let newDate = new Date(data)
  let day = newDate.getDate()
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let month = months[newDate.getMonth()]
  var year = newDate.getFullYear();
  return `${day} ${month} ${year}`
}
let data
function BookDetail(props) {
  console.log(props)
  let bookid = props.match.params.bookid
  let Data = props.data.Data
  data = Data.find((item) => item.bookid === bookid) //find dari data yang book id nya sama dengan book id yang dimasukkan lewat param
  console.log(data)
  // ------------function untuk menampilkan Modal Delete---------
  function deleteData() {
    props.showModalDelete()
  }
  // ------------------------------------------------

  if (!data) { //(!data) berarti data falsy atau data tidak ditemukan. maka....
    return (document.location.href = "/") //belum tau ini arahnya ke mana
  } else {
    return ( 
      //  jika data ditemukan maka tampilkan kodingan di bawah (tampilkan screen/yang dirender)
      <div className="book-detail">
        <div>
          <ul>
            <li><Link to="/" className="back">&lArr;</Link></li> {/*&lArr; adalah simbol panah ke kiri yg diartikan sebagai "back". selanjutnya jika panah diklik maka "back" akan dieksekusi melalui tag "Link" */}
            <li className="button" onClick={props.showModal}>Edit</li>
            <li className="button" onClick={deleteData}>Delete</li>
          </ul>
          <img className={'imageHeader'} src={data.image_url} alt={data.title} />
        </div>
        <div className="content">
          <img className="imageBook" src={data.image_url} alt={data.title} />
          <p className="title">{data.title}</p>
          <p className="date">{convert(data.updated_at)}</p>
          <p className="text">{data.description}</p>
        </div>
      </div>
    )
  }
}

export default BookDetail