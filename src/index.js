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

	const findUser = users.find((e) => e.username === username && e.avatar === avatar);

	if (!findUser) {
		users.push(req.body);
	} else {
		res.status(409).send('Esse usuário já existe');
	}

	res.status(201).send(users);
});

app.get('/tweets', (req, res) => {
	const page = parseInt(req.query.page);
	const newTweets = [...tweets];

	if (!page && page < 1) {
		res.status(400).send('Informe uma página válida!');
		return;
	}

	const limit = 10;
	const start = (page - 1) * limit;
	const end = page * limit;

	newTweets.forEach((tweet) => {
		const avatar = users.find((user) => user.username === tweet.username).avatar;
		tweet.avatar = avatar;
	});

	if (newTweets.length <= limit) {
		res.send(newTweets.reverse());
		return;
	}
	res.send(newTweets.reverse().slice(start, end));
});

app.get('/tweets/:USERNAME', (req, res) => {
	const newTweets = tweets.filter((e) => e.username === req.params.USERNAME);

	newTweets.forEach((tweet) => {
		const { avatar } = users.find((user) => user.username === tweet.username);
		tweet.avatar = avatar;
	});

	res.send(newTweets);
});

app.post('/tweets', (req, res) => {
	const { tweet } = req.body;
	const username = req.headers.user;

	if (!username || !tweet) {
		res.status(400).send('Todos os campos são obrigatórios!');
		return;
	}

	tweets.push({ username, tweet });
	res.status(201).send({ message: 'OK' });
});

app.listen(5000, () => console.log('Running server on http://localhost:5000'));
