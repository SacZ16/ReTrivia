<h1>BIEVENIDO A RETRIVIA README</h1>

para poder jugar a Retrivia simplemente clona el repositorio e ingresa en las carpetas back y front, en cada carpeta desde la consola y escribe npm i,con dos consolas para tener los dos servidores levantados ingresa: npm start.
con eso ya podras jugar a Retrivia.<br />
<br />
ingresa nick publico para ser visible en la tabla y un nick secreto que nadie lo tiene que saber,este se puede usar siempre<br />
<h3>para que la partida sea subida hay que darle al boton " inicio " al final de cada session</h3>
<h2>si quieres agregar una pregunta, ingresa con un nick publico cualquiera y en nick secreto ingresa: adminalexis</h2><br />
<h2>rutas para usar con postman o insomnia</h2><br />
GET('http://localhost:3010/partidas')<br />
POST('http://localhost:3010/partidas')<br />
{<br />
        "nombresecreto":"",<br />
        "nick":"",<br />
        "puntos":0,<br />
        "estado":"",<br />
        "rondaMaxima":0,<br />
        "puntosPerdidos":0<br />
}<br />
GET('http://localhost:3010/preguntas')<br />
POST('http://localhost:3010/preguntas')<br />
{<br />
  "categoria":"1",<br />
	"pregunta":"",<br />
	"respuestacorrecta":"",<br />
	"respuestasincorrectas":["","",""]<br />
}<br />
GET('http://localhost:3010/usuarios')<br />
GET('http://localhost:3010/usuarios/:id')<br />
 <h2><a href="https://retrivia.herokuapp.com" Target="_blank">LINK DEPLOYADO</a></h2>
