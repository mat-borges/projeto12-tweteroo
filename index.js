import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());
let username;
let avatar;
const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
	username = req.body.username;
	avatar = req.body.avatar;
	if (
		!users.find((e) => {
			if (e.username === username && e.avatar === avatar) {
				return true;
			}
		})
	) {
		users.push(req.body);
	}
	res.send('OK');
});

app.get('/tweets', (req, res) => {
	const newTweets = [];
	let i = tweets.length;
	while (newTweets.length !== 10) {
		newTweets.push(tweets[i - 1]);
		i--;
	}
	res.send(newTweets);
});

app.post('/tweets', (req, res) => {
	tweets.push({ username: username, avatar: avatar, tweet: req.body.tweet });
	res.send(tweets);
});

app.listen(5000);
