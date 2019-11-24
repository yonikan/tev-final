import * as express from 'express';
import { Application } from 'express';
import { getLoginData, getForgotPassword, getResetPassword } from './routes/login.route';
import { getTeamEventsData } from './routes/team-events.route';
import { getTeamsData } from './routes/teams.route';

const bodyParser = require('body-parser');
const app: Application = express();

app.use(bodyParser.json());

app.route('/api/login').get(getLoginData);
app.route('/api/forgot-password').get(getForgotPassword);
app.route('/api/reset-password').get(getResetPassword);

app.route('/api/teams').get(getTeamsData); // for the teams dropdown
app.route('/api/team-events').get(getTeamEventsData); // for the team-picker

const httpServer = app.listen(9000, () => {
    console.log('PlayerMaker HTTP REST API DEV Server running at http://localhost:' + httpServer.address().port);
});
