const express = require('express')
const app = express();         
const bodyParser = require('body-parser');
//const port = 3000; //porta padrão
const port = process.env.PORT || 8080
const sql = require('mssql');
const connStr = "Data Source=191.252.59.59;Initial Catalog=FONNETTeste;Persist Security Info=True;User ID=sa;Password=SisFnt18";

//fazendo a conexão global
sql.connect(connStr)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));


//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

router.get('/chamados', (req, res) =>{
    execSQLQuery('SELECT * FROM TB_Chamado', res);
})

router.get('/chamados/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE IDCLIENTE=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM TB_Chamado' + filter, res);
})

//inicia o servidor
app.listen(port);
console.log('API FonNet WebSite no Ar!');

function execSQLQuery(sqlQry, res){
    GLOBAL.conn.request()
               .query(sqlQry)
               .then(result => res.json(result.recordset))
               .catch(err => res.json(err));
}