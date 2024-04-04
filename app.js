const express = require('express');
const homeController = require('./controllers/homeController');
const signupController = require('./controllers/signupController');
const signinController = require('./controllers/signinController');
const verifyController = require('./controllers/verifyController');
const rootController = require('./controllers/Data/rootController');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

app.post('/signup', signupController.signUp);
app.get('/signup', signupController.renderSignUp);
app.post('/signin', signinController.signIn);
app.get('/signin', signinController.renderSignIn);
app.get('/', homeController.renderHome);
app.get('/verify', verifyController.getVerify);
app.post('/verify', verifyController.verify);
app.post('/generate-data', rootController.generateData);
app.post('/save-names', rootController.saveData);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
