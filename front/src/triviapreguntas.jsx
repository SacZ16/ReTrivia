import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './triviapreguntas.css'

export default function triviapreguntas() {

    const [preguntaseleccionada, setPreguntaseleccionada] = useState('')
    const [ronda, setRonda] = useState(1)
    const [respuestas, setRespuestas] = useState('')
    const [respuestacorrecta, setRespuestacorrecta] = useState('')
    const [seguir, setSeguir] = useState(false)
    const [score, setScore] = useState(0)
    const [abandono, setAbandono] = useState(false)
    const [tiempo1, setTiempo1] = useState('')
    const [perdiste, setPerdiste] = useState(false)
    const [agregarpregunta, setAgregarpregunta] = useState({
        categoria: '',
        pregunta: '',
        respuestacorrecta: '',
        respuestasincorrecta1: '',
        respuestasincorrecta2: '',
        respuestasincorrecta3: '',
    })

    const agregarpreguntalista = async () => {
        const mandar = {
            categoria: agregarpregunta.categoria,
            pregunta: agregarpregunta.pregunta,
            respuestacorrecta: agregarpregunta.respuestacorrecta,
            respuestasincorrectas: [agregarpregunta.respuestasincorrecta1, agregarpregunta.respuestasincorrecta2, agregarpregunta.respuestasincorrecta3]
        }
        await axios.post('http://localhost:3010/preguntas', mandar).then(response => {
            setAgregarpregunta({
                categoria: '',
                pregunta: '',
                respuestacorrecta: '',
                respuestasincorrecta1: '',
                respuestasincorrecta2: '',
                respuestasincorrecta3: '',
            })
        })
    }
    const victoria = async () => {
        const mandar = {
            nombresecreto: localStorage.getItem("nombresecreto"),
            nick: localStorage.getItem('nick'),
            puntos: score,
            estado: 'victoria',
            rondaMaxima: ronda - 1,
            puntosperdidos: 0
        }
        await axios.post('http://localhost:3010/partidas', mandar).then(response => { window.location.href = window.location.href.slice(0, -9) }).catch(err => { window.location.href = window.location.href.slice(0, -9) })
    }
    const perdido = async () => {
        const mandar = {
            nombresecreto: localStorage.getItem("nombresecreto"),
            nick: localStorage.getItem('nick'),
            puntos: 0,
            estado: 'perdido',
            rondaMaxima: ronda,
            puntosperdidos: score
        }
        await axios.post('http://localhost:3010/partidas', mandar).then(response => { window.location.href = window.location.href.slice(0, -9) })
    }
    const abandonado = async () => {
        const mandar = {
            nombresecreto: localStorage.getItem("nombresecreto"),
            nick: localStorage.getItem('nick'),
            puntos: score,
            estado: 'abandonado',
            rondaMaxima: ronda,
            puntosperdidos: 0
        }
        await axios.post('http://localhost:3010/partidas', mandar).then(response => { window.location.href = window.location.href.slice(0, -9) })

    }
    const preguntallamada = async () => {


        await axios.get('http://localhost:3010/preguntas').then(response => {
            const pregunta = response.data.filter(e => e.categoria === `${ronda}`)[Math.round(Math.random() * (0 - (response.data.filter(e => e.categoria === `${ronda}`).length - 1)) + (response.data.filter(e => e.categoria === `${ronda}`).length - 1))]


            setPreguntaseleccionada(pregunta.pregunta)
            setRespuestacorrecta(pregunta.respuestacorrecta)
            setRespuestas([pregunta.respuestasincorrectas[0], pregunta.respuestasincorrectas[1], pregunta.respuestasincorrectas[2], pregunta.respuestacorrecta])

            setTiempo1(`${new Date()}`)
        })
    }
    const respondido = (e) => {
        if (e === respuestacorrecta) {
            const tiempofinal = `${new Date()}`
            setRonda(Number(ronda) + 1)
            setSeguir(true)
            calcularpuntos(tiempofinal)
        } else setPerdiste(true)
    }
    const calcularpuntos = (tiempofinal) => {
        const resultado = Number(tiempo1.slice(22, 24)) < Number(tiempofinal.slice(22, 24)) ? Number(tiempofinal.slice(22, 24)) - Number(tiempo1.slice(22, 24)) : (60 - Number(tiempo1.slice(22, 24))) + Number(tiempofinal.slice(22, 24))
        if (resultado && resultado < 21) {
            setScore(score + ((20 - resultado) * (ronda * 10)))
        }
        if (resultado && resultado > 20) {
            setScore(score)
        }
    }
    const seguirjugando = () => {
        setSeguir(false)
        preguntallamada()
    }


    useEffect(() => {
        preguntallamada()
    }, [])
    return (
        <div className="contenedor_juego">
            <div className="caja_preguntas">

                {score || score === 0 ? <div className="score">Score:{score}</div> : null}

                {
                    preguntaseleccionada ?
                        <div>
                            <div>{preguntaseleccionada}</div>
                        </div>
                        : null
                }
                {respuestas ?
                    <div>{respuestas.sort(function () { return Math.random() - 0.5 }).map((e, index) => <button key={index} className="boton_juego" onClick={() => respondido(e)} >{e}</button >)}</div> : null}
            </div>
            {seguir && ronda < 6 ? <div className="popup_seguir">
                <div className="subpopup_seguir">
                    <div>¿Deseas seguir o abandonar y conservar los puntos?</div>
                    <div>tus puntos : {score}</div>
                    <div className="contenedor_boton_seguir">
                        <button className="boton_seguir" onClick={seguirjugando}>Seguir</button>
                        <button className="boton_seguir" onClick={() => setAbandono(true)}>Abandonar</button>
                    </div>
                </div>
            </div> : null}

            {ronda < 6 ? null : <div className="ganado">
                <div>
                    ¡GANASTE!
                </div>
                <div>Tu puntaje fue : {score}</div>
                <button className="boton_seguir" onClick={victoria}>inicio</button>
            </div>}

            {perdiste ? <div className="ganado">
                <div>
                    ¡PERDISTE!
                </div>
                <div>Tu puntaje fue : 0</div>
                <button className="boton_seguir" onClick={perdido}>inicio</button>
            </div> : null}
            {abandono ? <div className="ganado">
                <div>
                    ¡ABANDONASTE!
                </div>
                <div>Tu puntaje fue : {score}</div>
                <button className="boton_seguir" onClick={abandonado}>inicio</button>
            </div> : null}
            {localStorage.getItem("nombresecreto") === "adminalexis" ? <div className="ganado">
                <div>
                    Agrega una Pregunta
                </div>
                <div className="agregar_pregunta">
                    <div className="input_agregar_pregunta">categoria: <div><button style={agregarpregunta.categoria === 1 ? { background: 'green', color: 'black' } : null} onClick={() => { setAgregarpregunta({ ...agregarpregunta, categoria: 1 }) }} className="boton_seguir">1</button><button style={agregarpregunta.categoria === 2 ? { background: 'green', color: 'black' } : null} onClick={() => { setAgregarpregunta({ ...agregarpregunta, categoria: 2 }) }} className="boton_seguir">2</button><button style={agregarpregunta.categoria === 3 ? { background: 'green', color: 'black' } : null} onClick={() => { setAgregarpregunta({ ...agregarpregunta, categoria: 3 }) }} className="boton_seguir">3</button><button style={agregarpregunta.categoria === 4 ? { background: 'green', color: 'black' } : null} onClick={() => { setAgregarpregunta({ ...agregarpregunta, categoria: 4 }) }} className="boton_seguir">4</button><button style={agregarpregunta.categoria === 5 ? { background: 'green', color: 'black' } : null} onClick={() => { setAgregarpregunta({ ...agregarpregunta, categoria: 5 }) }} className="boton_seguir">5</button></div></div>
                    <div className="input_agregar_pregunta">pregunta:<input onChange={(event) => { setAgregarpregunta({ ...agregarpregunta, pregunta: event.target.value }) }} value={agregarpregunta.pregunta} className="inputs_inicio" type="text" /></div>
                    <div className="input_agregar_pregunta">respuesta correcta:<input onChange={(event) => { setAgregarpregunta({ ...agregarpregunta, respuestacorrecta: event.target.value }) }} value={agregarpregunta.respuestacorrecta} className="inputs_inicio" type="text" /></div>
                    <div className="input_agregar_pregunta">respuesta incorrecta 1:<input onChange={(event) => { setAgregarpregunta({ ...agregarpregunta, respuestasincorrecta1: event.target.value }) }} value={agregarpregunta.respuestasincorrecta1} className="inputs_inicio" type="text" /></div>
                    <div className="input_agregar_pregunta">respuesta incorrecta 2:<input onChange={(event) => { setAgregarpregunta({ ...agregarpregunta, respuestasincorrecta2: event.target.value }) }} value={agregarpregunta.respuestasincorrecta2} className="inputs_inicio" type="text" /></div>
                    <div className="input_agregar_pregunta">respuesta incorrecta 3:<input onChange={(event) => { setAgregarpregunta({ ...agregarpregunta, respuestasincorrecta3: event.target.value }) }} value={agregarpregunta.respuestasincorrecta3} className="inputs_inicio" type="text" /></div>
                </div>
                <button className="boton_seguir" onClick={agregarpreguntalista}>Agregar</button>
                <button className="boton_seguir" onClick={() => window.location.href = window.location.href.slice(0, -9)}>inicio</button>
            </div> : null}
        </div>
    )
}
