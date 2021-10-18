import React, { useEffect, useState } from 'react'
import './trivia.css'
import axios from 'axios'


export default function trivia() {

    const [top5, settop5] = useState('')
    const [verificacion,setVerificacion]=useState('')
    const [verificacion2,setVerificacion2]=useState('')

    const top5llamada = async () => {
        await axios.get('http://localhost:3010/partidas').then(respuesta => {
            settop5(respuesta.data.slice(0, 10))
        })
    }

    const verificacioninput=(e)=>{
        localStorage.setItem('nombresecreto', e.target.value)
        setVerificacion(localStorage.getItem("nombresecreto"))
    }
    const verificacioninput2=(e)=>{
        localStorage.setItem('nick', e.target.value)
        setVerificacion2(localStorage.getItem("nick"))
    }

    useEffect(() => {
        localStorage.setItem('nick', '')
        localStorage.setItem('nombresecreto', '')
        top5llamada()
    }, [])
    return (
        <div>
            <div className="contenedor_titulo_bienvenida">
                <p className="titulo_bienvenida">
                    Bienvenido a Retrivia, un juego de preguntas de cultura general: tendrás 4 respuestas, de las cuales solo 1  es correcta, además ganarás puntos en caso de que la respuesta seleccionada sea la correcta. Las reglas son fáciles: puedes abandonar cuando quieras, pero en caso de no abandonar y perder,  todos los puntos obtenidos desapararecerán. Tienes 20 segundos para responder y sumar puntos, mientrás mas demores en responder, menos puntos obtendrás
                </p>
            </div>
            <div className="segundo_contenedor_inicio">
                <div className="contenedor_inputs_inicio">
                    <input type="text" onChange={(e) => verificacioninput2(e)} maxlength="6" className="inputs_inicio" placeholder="nick publico" />
                    <input type="text" onChange={(e) => verificacioninput(e)} className="inputs_inicio" placeholder="nick secreto" />
                    <div className="contenedor_boton_inicio">
                        {verificacion.length>0 && verificacion2.length>0?<a href="/retrivia"> <button className="boton_inicio"> START</button></a>:<button className="boton_inicio"> START</button>}
                    </div>
                </div>
                <div className="contenedor_top5_inicio">
                    <div className="subcontenedor_top5_inicio">
                        <div className="titulo_top5">
                            TOP 10
                        </div>
                        {top5 ? top5.map((e,index) => {
                            return (
                                <div key={index} className="lineas_top5">
                                    <div>{e.partidas[0].nick}</div>
                                    <div>{e.partidas[0].puntos}</div>
                                </div>
                            )
                        }) : null}

                    </div></div>
            </div>
        </div>
    )
}
