import Friend from '../models/Friend';

import Mail from '../../lib/Mail';

class SecretFriendController {
  async update(req, res) {
    const friends = await Friend.findAll({
      order: [['id', 'ASC']],
    });

    const selectedFriend = [];
    const secrets = [];

    await friends.map(friend => {
      return selectedFriend.push(friend.name);
    });

    selectedFriend.sort(() => Math.random() - 0.5);

    for (let i = 0; i < selectedFriend.length; i += 1) {
      secrets.push([
        selectedFriend[i !== selectedFriend.length - 1 ? i + 1 : 0],
      ]);
    }

    friends.map(async (friend, index) => {
      if (friend.name !== secrets[index].toString()) {
        await Friend.sequelize.query(
          `UPDATE friends SET secret_name='${secrets[index]}' WHERE id='${friend.id}'`
        );

        await Mail.sendMail({
          to: `${friend.name} <${friend.email}>`,
          subject: 'Amigo Secreto',
          text: `Seu amigo secreto: ${secrets[index].toString()}`,
        });
      }
    });

    return res.json({ message: 'Ok' });
  }
}

export default new SecretFriendController();
