import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('crud_sql', 'root', 'Anandhus@123', {
  host: 'localhost',
  dialect: 'mysql'
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Database synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

connect();

export default sequelize;
