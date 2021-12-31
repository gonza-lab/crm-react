import SequelizeModel from './SequelizeModel';
import User from './User';

export default interface UserDB extends User, SequelizeModel {}
