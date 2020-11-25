const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const http = require('http');
const socketio = require('socket.io');



//inicializacion
const app = express();
const server = http.createServer(app);
//const io = socketio.listen(server);
require('./sockets');
require('./database');
require('./config/passport');

//ajustes
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:    path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//variable Global

app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//rutas
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/chat'));

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


//servidor
server.listen(app.get('port'), () => {
    console.log('El servidor esta', app.get('port'));
});




