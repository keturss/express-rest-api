import App from '@app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import StationRoute from '@routes/station.route';
import TicketRoute from '@routes/ticket.route';
import TrainRoute from '@routes/train.routes';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new TrainRoute(), new StationRoute(), new TicketRoute()]);

app.listen();
