import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());
const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
	const { username, avatar } = req.body;

	if (!username || !avatar) {
		res.status(400).send('Todos os campos são obrigatórios!');
		return;
	}

	const findUser = users.find((e) => {
		if (e.username === username && e.avatar === avatar) {
			res.status(409).send('Esse usuário já existe');
			return;
		} else {
			return;
		}
	});

	if (!findUser) {
		users.push(req.body);
	}

	res.status(201).send(users);
});

app.get('/tweets', (req, res) => {
	const page = parseInt(req.query.page);
	const newTweets = [];

	let firstIndex = !isNaN(page) ? 10 * (page - 1) : 10;

	if (tweets.length !== 0) {
		for (let maxLength = 0; maxLength < 10; maxLength++) {
			if (tweets[firstIndex] !== undefined) {
				newTweets.push(tweets[firstIndex]);
				firstIndex++;
			} else {
				firstIndex++;
			}
		}
	}

	res.send(newTweets);
});

app.get('/tweets/:USERNAME', (req, res) => {
	const newTweets = tweets.filter((e) => e.username === req.params.USERNAME);

	res.send(newTweets);
});

app.post('/tweets', (req, res) => {
	const { tweet } = req.body;
	const username = req.headers.user;

	if (!username || !tweet) {
		res.status(400).send('Todos os campos são obrigatórios!');
		return;
	}

	const avatar = users.filter((e) => e.username === username);
	tweets.push({ username, avatar: avatar[0].avatar, tweet });
	res.sendStatus(201);
});

app.listen(5000, () => console.log('Running server on http://localhost:5000'));
