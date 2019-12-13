const db = {}
let sequence = 0;

class DeliveryService {

  static add(delivery) {
    return new Promise((resolve) => {
      const newDelivery = {
        id: ++sequence,
        orderId: delivery.orderId,
        customerId: delivery.customerId,
        receiverName: delivery.receiverName,
        receiverCpf: delivery.receiverCpf,
        isBuyer: delivery.isBuyer || false,
        dateTime: delivery.dateTime,
        local: delivery.local
      };
      db[newDelivery.id] = newDelivery;
      resolve(newDelivery);
    });
  }

  static getAll() {
    const toArray = key => db[key];
    return new Promise((resolve) => {
      const deliveries = Object.keys(db).map(toArray);
      resolve(deliveries);
    });
  }

  static getById(deliveryId) {
    return new Promise((resolve) => {
      resolve(db[deliveryId]);
    });
  }
}

module.exports = DeliveryService;