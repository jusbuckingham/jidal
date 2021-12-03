'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      models.Song.belongsTo(models.Album, { foreignKey: 'albumId' });
      models.Song.belongsTo(models.Artist, { foreignKey: 'artistId' });
      models.Song.belongsToMany(models.Playlist, { through: 'PlaylistsSongs' });
    }
  };
  Song.init({
    title: DataTypes.STRING,
    length: DataTypes.INTEGER,
    playCount: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    explicit: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};