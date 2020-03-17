const Yup = require('yup');
const User = require('../models/User');

class UsersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
      cpf: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      res.status(401).json({ error: 'User already exist' });
    }
    const { id, name, email, cpf } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      cpf,
    });
  }

  async update(req, res) {
    const scchea = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      password: Yup.string(),
      newPassword: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required() : field
        ),
      confirmPassword: Yup.string().when('newPassword', (newPassword, field) =>
        newPassword ? field.required().oneOf([Yup.ref('newPassword')]) : field
      ),
      cpf: Yup.string(),
    });

    if (!(await scchea.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    }

    const { email, password } = req.body;
    const user = await User.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        res.status(401).json({ error: 'User already exists' });
      }
    }

    if (password && !(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Passowrd does not match' });
    }

    const { id, name, cpf } = await user.update(req.body);
    return res.json({
      id,
      name,
      cpf,
    });
  }
}

module.exports = new UsersController();
