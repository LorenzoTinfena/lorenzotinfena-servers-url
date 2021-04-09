require('dotenv').config();
const { Client } = require('pg');




const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  
  client.connect();

  client.query('SELECT * FROM public.urls', (err, res) => {
    if (err) throw err;
    json = JSON.stringify(res.rows)
    client.end();
  });


/*const {Client} = require('pg')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

class PgClient{
    PgClient(){
        this.CreateClient();
        this.client.on('error', err =>{
            console.error('PgClient error');
            this.CreateClient();
        });
    }

    ExecuteQuery(query){
        res = JSON.stringify(this.client.query(query))
        return res
    }

    #CreateClient(){
        this.client = new Client({
            user: "rrwqzozugbevop",
            password: "6a4418bc65c8592f9a18e2a11d4a6a233cfbd3c139dca85d891c4e40c25311fc",
            host: "ec2-54-155-87-214.eu-west-1.compute.amazonaws.com",
            port: 5432,
            database: "dev6pehq9cjc87",
            ssl: true
        })
        this.client.connect()
    }
}
//var client = new PgClient()




var client = new Client({
    user: "rrwqzozugbevop",
    password: "6a4418bc65c8592f9a18e2a11d4a6a233cfbd3c139dca85d891c4e40c25311fc",
    host: "ec2-54-155-87-214.eu-west-1.compute.amazonaws.com",
    port: 5432,
    database: "dev6pehq9cjc87",
    ssl: true
})
client.connect()
.then(() => client.query("select * from pg_catalog.pg_aggregate"))
.then(results => console.table(results.rows))

/*
client.p
client.connect()
.then(() => console.log("Connected successfuly"))
.then(() => client.query("select * from pg_catalog.pg_aggregate"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())*/