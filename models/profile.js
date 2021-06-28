'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Profile extends Model {
		static associate(models) {
			Profile.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE',
			});
		}
	}
	Profile.init(
		{
			bio: DataTypes.STRING,
			profileImage: DataTypes.STRING,
			userId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Profile',
		}
	);
	return Profile;
};
