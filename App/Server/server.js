import { createServer } from 'node:http';
import fs from 'fs';
import { json } from 'node:stream/consumers';

const outputFile = 'fileExample.csv'

const server = createServer((req, res) => {
	let body = [];
	req.on('data',(buffer) => {			//Received a chunk of the message body(will usually by whole body)
		body.push(buffer);
	});
	
	req.on('end', () => {				//Whole message received, but only appears to trigger on post and put requests?
		if (!req.complete) {
			console.error('The connection was terminated while the message was still being sent');
			return;
		}
		if(body.length > 0 && req.method === "POST"){
			body = Buffer.concat(body).toString();
			let data = JSON.parse(body);
			console.log(data);
			
			LogData(data);
		}
	});

	res.writeHead(200, {				//Access control to tell browsers they are allowed to make requests even if their main page isnt from same domain
		'Content-Type': 'text/plain',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
	});

	if (req.method === "GET") {			//Add some autoincrementing of IDs instead of random?
		res.end(JSON.stringify({ UID: Math.floor(Math.random() * 100000000).toString() }));
	} else {
		res.end();
	}
	console.log(req.method);
});

server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000');
});

function LogData(Json) {				//Log the received data to a Permanent file
	const fileString = Json.UID + "," + Date(json.time) + "\n";
	if (!fs.existsSync(outputFile)) {
		Object.keys(json).forEach((key) => {
			fs.appendFileSync(outputFile, key + ",", 'utf8');
		});
		fs.appendFileSync(outputFile, "\n", 'utf8');
	}
	fs.appendFileSync(outputFile, fileString, 'utf8');
}

//const dictionary = {
//	CONNECT: fallback,
//	DELETE: fallback,
//	GET: fallback,
//	HEAD: fallback,
//	OPTIONS: fallback,
//	PATCH: fallback,
//	POST: fallback,
//	PUT: fallback,
//	TRACE: fallback,
//	getHandler: function (name) {
//		return this.hasOwnProperty(name) ? this[name] : fallback;
//	}
//}

//HTTP request types
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods
//CONNECT
//DELETE
//GET
//HEAD
//OPTIONS
//PATCH
//POST
//PUT
//TRACE