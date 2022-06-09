const swaggerJsDoc = require('swagger-jsdoc');


const options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Bosta-Monitoring API',
			version: '1.0.0',
			description: 'Backend API for monitoring URLs and producing reports based on their availability stats',
            contact: {
                name: 'Mostafa ElDahshan',
                email: 'mostafaabdelkarim22@gmail.com',
                phone: '01126882863'
            }
		},
		servers: [
			{
				url: 'http://localhost:3000',
			},
		],
	},
	apis: ['./routes/*.js', './app.js'],
};

const specs = swaggerJsDoc(options);

module.exports = {specs};