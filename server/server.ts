import * as express from 'express';
import { Application } from 'express';
import { postLoginData, postForgotPassword, putResetPassword } from './routes/login.route';
import { getTeamEventsData } from './routes/team-events.route';
import { getTeamsData } from './routes/teams.route';

const bodyParser = require('body-parser');
const app: Application = express();

app.use(bodyParser.json());

app.route('/api/account/login').post(postLoginData);
app.route('/api/account/forgot-password').post(postForgotPassword);
app.route('/api/account/reset-password').put(putResetPassword);

app.route('/api/teams').get(getTeamsData); // for the teams dropdown
app.route('/api/team-events').get(getTeamEventsData); // for the team-picker

const httpServer = app.listen(9000, () => {
    console.log('PlayerMaker HTTP REST API DEV Server running at http://localhost:' + httpServer.address().port);
});
