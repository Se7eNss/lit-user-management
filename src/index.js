import {Router} from '@vaadin/router';
import {routes} from './routes/routes';

import './redux/store';

const router = new Router(document.getElementById('outlet'));
router.setRoutes(routes);
