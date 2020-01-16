const connStr = "Data Source=191.252.59.59;Initial Catalog=FONNETTeste;Persist Security Info=True;User ID=sa;Password=SisFnt18";
const sql = require("mssql");

sql.connect(connStr)
   .then(conn => console.log("conectou!"))
   .catch(err => console.log("erro! " + err));

