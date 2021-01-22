import * as Yup from 'yup';

import Friend from '../models/Friend';

class FriendController {
  async index(req, res) {
    const friends = await Friend.findAll();
    return res.json(friends);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }
    const friendExists = await Friend.findOne({
      where: { email: req.body.email },
    });
    if (friendExists) {
      return res.status(400).json({ error: 'E-mail já existe.' });
    }
    const { id, name, email } = await Friend.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' });
    }

    const { email } = req.body;

    const friend = await Friend.findByPk(req.body.id);

    if (email !== friend.email) {
      const friendExists = await Friend.findOne({ where: { email } });

      if (friendExists) {
        return res.status(400).json({ error: 'E-mail já existe.' });
      }
    }

    const { id, name } = await friend.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const friend = await Friend.findByPk(req.params.id);

    await friend.destroy();

    return res.json(friend);
  }
}

export default new FriendController();
