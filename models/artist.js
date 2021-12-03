'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      models.Artist.hasMany( models.Album, { foreignKey: 'artistId' } );
      models.Artist.hasMany(models.Song, { foreignKey: 'artistId' });
    }
  };
  Artist.init({
    name: DataTypes.STRING,
    monthlyListeners: DataTypes.INTEGER,
    followers: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};