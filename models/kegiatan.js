'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kegiatan.belongsTo(models.Umum, {
        foreignKey: 'nikUmum',
        as: 'umum',
      });
      Kegiatan.hasMany(models.Pendaftaran, {
        foreignKey: 'idKegiatan',
        as: 'pendaftaran',
      });
    }
  }

  Kegiatan.init({
    idKegiatan: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    judul: DataTypes.STRING,
    gambar: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    npsn: DataTypes.INTEGER,
    namaSekolah: DataTypes.STRING,
    kuotaRelawan: DataTypes.INTEGER,
    deadLine: DataTypes.DATE,
    status: DataTypes.STRING,
    dokumen: DataTypes.STRING,
    nikUmum: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: 'Umums',
        key: 'nik'
      }
    }
  }, {
    sequelize,
    modelName: 'Kegiatan',
  });

  return Kegiatan;
};