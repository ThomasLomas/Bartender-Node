module.exports = {
    http: {
        port: 80
    },
    lights: {
        path: '/dev/spidev0.0',
        stripLength: 30,
        actualLength: 22
    },
    pumps: [
		{
    		"name": "Pump 1",
   			"pin": 17
		},
		{
    		"name": "Pump 2",
    		"pin": 27
		},
		{
    		"name": "Pump 3",
    		"pin": 22
		},
		{
    		"name": "Pump 4",
    		"pin": 23
		},
		{
    		"name": "Pump 5",
    		"pin": 24
		},
		{
    		"name": "Pump 6",
    		"pin": 25
		}
	]
};
