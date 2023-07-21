import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import passport from 'passport';
import path from 'path';
import ErrorHandler from './middleware/error-handler';
import config from './config';

import './middleware/authentication';

// Flow Config
import * as fcl from "@onflow/fcl";
const { accessAPI, flowNetwork } = config();
fcl.config().put("accessNode.api", accessAPI);

fcl.config({
  'flow.network': flowNetwork,
  'accessNode.api': accessAPI
})

// Routes
import routes from './routes';

// App Config
const app = express();
const port = process.env.PORT

function setUpParsing(app: Express): void {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.text({ type: 'text/html' }));
}

function setUpSecurityHeaders(app: Express): void {
  app.use((_, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });
}

const corsOptions = {
  credentials: true,
  origin: true
}

app.use(cors(corsOptions));
app.use(cookieParser("somesecretkey"));

app.use('/images', express.static(path.join(__dirname, '../../src', 'static', 'provider')));

setUpSecurityHeaders(app);
setUpParsing(app);

app.set('trust proxy', 1)

// Passport Authentication
app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys:["somesecretkey"],
  sameSite: (config().environment == 'prod') ?  'none' : 'lax',
  secure: config().environment == 'prod',
  domain: ".up.railway.app",
}))

app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use(routes);
app.use(ErrorHandler)

app.listen(port, async () => {
  console.log(config().environment == 'prod',  ".up.railway.app", (config().environment == 'prod') ?  'none' : 'lax')
  console.log(`Tales FLOW Backend PORT:${port}`, "Set Key 3");
});


