import React,{useState} from 'react'
import {Link} from 'react-router-dom'

function ModalAlert(props) {
    const [show,setShow] = useState(props.show)
    console.log(props)
    const close = ()=>{
        setShow(false)
        props.setModal()
        props.enabled()
    }
    return (
        <div className={show ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                <div>
                    <div className="inputGroup">
                        <p className="confirmation"> {props.pesan}</p>
                        {props.success?<img src={'http://2.bp.blogspot.com/-Zj4_C0WLcBg/VKQpx7P_OdI/AAAAAAAAC4o/0hpJFnelQuc/s1600/Centang%2BMasterbama.jpg'} alt={"Success"} style={{ width: '300px', marginLeft: '50%', transform: 'translate(-50%)' }}/>:
                        props.error?<img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpB3pN3VDroploH4-M5EGOZmM7K3IVLO8LWbe_lnHl_a0POdBX'} alt={"Error"} style={{ width: '300px', marginLeft: '50%', transform: 'translate(-50%)' }}/>:
                        <img src={'https://3.bp.blogspot.com/-AG4Mi-Cyk1g/XJOwJXyb3_I/AAAAAAAAALY/6K-fNN5poyAp4Bmg-a49ZOT6M0Zry7BigCLcBGAs/s1600/IMG-20190321-WA0016.jpg'} alt={"Gambar"} style={{ width: '300px', marginLeft: '50%', transform: 'translate(-50%)' }}/>}
                    </div>
                    <div>
                        <Link to={props.link}><button className="delete" onClick={close} style={{ marginRight: "10px" }}>Ok</button></Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default ModalAlert