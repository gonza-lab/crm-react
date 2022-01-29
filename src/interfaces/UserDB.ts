import TypeORMEntity from './TypeORMEntity';
import User from './User';

export default interface UserDB extends User, TypeORMEntity {}
