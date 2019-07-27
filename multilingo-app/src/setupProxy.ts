import proxy from 'http-proxy-middleware';

module.exports = function(app) {
	app.use(proxy('/search', { target: "http://localhost:3001" }))
}