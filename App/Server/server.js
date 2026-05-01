import { createServer } from 'node:http';

const server = createServer((req, res) => {
	let body = [];
	req.on('data',(buffer) => {			//Received a chunk of the message body(will usually by whole body)
		console.log(buffer);
		body.push(buffer);
	});
	
	req.on('end', () => {				//Whole message received, but only appears to trigger on post and put requests?
		if (!req.complete) {
			console.error('The connection was terminated while the message was still being sent');
			return;
		}
		if(body.length > 0){
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

	if (req.method === "GET") {//Add some autoincrementing of IDs instead of random?
		res.end(JSON.stringify({ UID: Math.floor(Math.random() * 100000000).toString() }));
	} else {
		res.end();
	}
	console.log(req.method);
});

function LogData(Json){					//Log the received data to a Permanent file
	console.log("User " + Json.UID + " sucks at computers");
	console.log("the time is " + Date(Json.time));
}

server.listen(3000, '127.0.0.1', () => {
	console.log('Listening on 127.0.0.1:3000');
});



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