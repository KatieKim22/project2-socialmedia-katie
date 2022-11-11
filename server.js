const express = require('express');
const bcrypt = require('bcrypt')
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');

// handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 5000;

const sess = {
    secret: 'super secret',
    cookie: {},
    resave: false,
    // should set it to 'false?' -save initialized
    saveuninitilized: true,
    store: new sequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
})
