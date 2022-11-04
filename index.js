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

	if (
		!users.find((e) => {
			if (e.username === username && e.avatar === avatar) {
				res.status(409).send('Esse usuário já existe');
				return;
			}
		})
	) {
		users.push(req.body);
	}

	res.status(201).send(users);
});

app.get('/tweets', (req, res) => {
	const newTweets = [];
	let i = tweets.length;
	if (tweets.length !== 0) {
		while (newTweets.length !== 10 && tweets[i - 1] !== undefined) {
			newTweets.push(tweets[i - 1]);
			i--;
		}
	}
	res.send(newTweets);
});

app.post('/tweets', (req, res) => {
	const { username, tweet } = req.body;

	if (!username || !tweet) {
		res.status(400).send('Todos os campos são obrigatórios!');
		return;
	}

	const avatar = users.filter((e) => e.username === username);

	tweets.push({ username, avatar: avatar[0].avatar, tweet });
	console.log(tweets);

	res.sendStatus(201);
});

app.listen(5000, () => console.log('Running server on http://localhost:5000'));
