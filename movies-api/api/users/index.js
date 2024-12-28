import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './userModel';

const router = express.Router(); // eslint-disable-line

// 获取所有用户
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // 不返回密码
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Internal Server Error', error: error.message });
    }
});

// 注册或认证用户
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }

        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
});

// 更新用户
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (req.body._id) delete req.body._id;
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10); // 哈希处理密码
        }

        const result = await User.updateOne({ _id: id }, req.body);

        if (result.matchedCount) {
            res.status(200).json({
                code: 200,
                msg: 'User updated successfully.',
            });
        } else {
            res.status(404).json({
                code: 404,
                msg: 'Unable to update user: User not found.',
            });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({
                code: 400,
                msg: 'Validation Error',
                errors: error.errors,
            });
        } else {
            res.status(500).json({
                code: 500,
                msg: 'Internal Server Error',
                error: error.message,
            });
        }
    }
});

// 注册用户函数
async function registerUser(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });

        res.status(201).json({ success: true, msg: 'User successfully created.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Error registering user.', error: error.message });
    }
}

// 用户认证函数
async function authenticateUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                code: 401,
                msg: 'Authentication failed: Invalid username or password.',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                code: 401,
                msg: 'Authentication failed: Invalid username or password.',
            });
        }

        const token = jwt.sign({ username: user.username }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({
            code: 200,
            msg: 'Authentication successful.',
            token: `BEARER ${token}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}

export default router;
