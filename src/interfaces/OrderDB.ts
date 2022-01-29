import Order from './Order';
import TypeORMEntity from './TypeORMEntity';

export default interface OrderDB extends Order, TypeORMEntity {}
