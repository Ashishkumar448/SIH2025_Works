import express from 'express';
import mongoose from 'mongoose';


const app = express();
app.use(cors());
dotenv.config();
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connection established");
}).catch((err) => {
    console.log(err);
})

app.use('/api/auth', authRouter);
app.use('/api/post', postsRouter)


app.get('/', (req, res) => {
    res.json({ message: "Hello from Server" });
});

let port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});