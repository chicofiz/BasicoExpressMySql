const express = require('express');
const app= express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');
const { Router } = require('express');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const router = express.Router();
router.get('/',(req,res)=> res.json({message:'funcionol'}));
app.use('/',router)

app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res){
  const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '',
    database : 'nodsql'
  });
 
  connection.query(sqlQry, function(error, results, fields){
      if(error) 
        res.json(error);
      else
        res.json(results);
      connection.end();
      console.log('executou!');
  });
}

router.get('/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM Clientes', res);
})

router.get('/clientes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Clientes' + filter, res);
})

router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
})

/*router.post('/cliente'(req,res)=>{


})*/