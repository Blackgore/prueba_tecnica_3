import User from '../models/User';

export const createUser = async (req, res) => {
  try {
    if (!req.body || req.body === {}) {
      res.status(500).json({
        status: 'N',
        msg: 'Bad Request',
      });
    }
    const existUser = await User.findOne({username: req.body.username});
    console.log('existUser', existUser);
    if (existUser) {
      res.status(400).json({
        status: 'N',
        msg: 'exist user',
      });
    }
    const newUser = new User(req.body);
    const userNew = await newUser.save();

    res.status(200).json({
      status: 'OK',
      msg: userNew,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'E',
      msg: 'error create users',
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    if (!req || req === {}) {
      res.status(500).json({
        status: 'N',
        msg: 'Request Error',
      });
    }

    const users = await User.find();

    if (!users || users.length < 0) {
      res.status(400).json({
        status: 'OK',
        msg: 'Users Not Found',
      });
    };

    res.status(200).json({
      status: 'OK',
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'N',
      msg: 'Server ERROR',
    });
  }
};

export const getUserBy = async (req, res) => {
  try {
    if (!req || !req === {} || !req.params.id || !req.params.id === '') {
      res.status(500).json({
        status: 'N',
        msg: 'Request Error',
      });
    };
    const _id = req.params.id;
    const userFound = await User.findById(_id);
    if (userFound) {
      res.status(200).json({
        status: 'OK',
        userFound,
      });
    } else {
      res.status(404).json({
        status: 'N',
        msg: 'User Not Found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'OK',
      msg: 'Error server',
    });
  }
};
