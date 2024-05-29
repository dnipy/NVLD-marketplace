import express, { Express } from "express";
import cluster from "cluster";
import os from 'os'
import { I_Request_Custom , I_Response_Custom } from '@type'
import { NODE_ENV_CONFIG } from "./configs";
import { AppMiddleWaresInit } from "./middlewares"
import api_router from "./routes/api";
import { Authorize } from "./middlewares/authorize.middleware";
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`+Master(Primary) is running with process_id = (${process.pid}) `);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  NODE_ENV_CONFIG()
  .then(()=>{
    console.log(process.env.NODE_ENV)
    const app: Express = express();


    //* CONFIGs AND MIDDLEWAREs (Global middlewares)
    AppMiddleWaresInit(app)


    //* ROUTEs

    //? index 
    app.get("/",Authorize,(req: I_Request_Custom, res: I_Response_Custom) => {
      res.json({status : 200,msg : 'expressjs up!'});
    });

    //? /api
    app.use('/api',api_router)
    
    //* EXECUTE
    app.listen(process.env.PORT || 3002, () => {
      console.log(`[${process.env.NODE_ENV}-server]: Server is running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err)=>{
    console.log(err)
  })
}