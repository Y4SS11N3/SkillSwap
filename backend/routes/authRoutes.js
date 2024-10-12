const authMiddleware = require('./middleware/authMiddleware');

app.post('/api/login', authController.login);
app.get('/api/profile', authMiddleware, userController.getProfile);