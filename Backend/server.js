// server.js
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

app.use(cors(
  {
    origin: ["https://social-media-zo1e.vercel.app/"],
    methods:["POST", "GET"],
    credentials:true
  }
  ));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/socialMediaTask', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  socialHandle: String,
  images: [String],
});

const User = mongoose.model('User', userSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  });
  

const upload = multer({ storage });

// POST route for user submissions
app.post('/submit', upload.array('images', 10), async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    const imagePaths = req.files.map((file) => file.filename);

    const user = new User({ name, socialHandle, images: imagePaths });
    await user.save();

    res.status(201).json({ message: 'Submission successful!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit data' });
  }
});

// GET route to fetch all submissions
app.get('/submissions', async (req, res) => {
  try {
    const submissions = await User.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
