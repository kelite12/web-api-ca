import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import './db';
import defaultErrHandler from './errHandler';
import moviesRouter from './api/movies';
import authenticate from './authenticate';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// 中间件
app.use(cors());
app.use(express.json());

// 根路径
app.get('/', (req, res) => {
  res.send('Welcome to the Movies API!');
});

// 路由
app.use('/api/users', usersRouter);
app.use('/api/movies/public', moviesRouter); // 公共 movies 路由
app.use('/api/movies', authenticate, moviesRouter); // 需要认证的 movies 路由

// 错误处理
app.use(defaultErrHandler);

// 启动服务器
app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
