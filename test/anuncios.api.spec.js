const app = require("../app");
const request = require("supertest");

app.get("/anuncios", (req, res) => {
	res.status(200).json({ "success": true });
});

request(app)
	.get("/anuncios")
	.expect("Content-Type", /json/)
	.expect(200)
	.end((err, res) => {
		if (err) throw err;
	});