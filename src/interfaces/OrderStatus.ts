export default interface OrderStatus {
  id: number;
  name: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
}
