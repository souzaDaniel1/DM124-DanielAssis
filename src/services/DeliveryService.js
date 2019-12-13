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
  static update(deliveryId, updatedDelivery) {
    return new Promise(async (resolve) => {
      const delivery = await DeliveryService.getById(deliveryId);
      if (delivery) {
        const hasValue = updatedDelivery.isBuyer != null;
        delivery.orderId = updatedDelivery.orderId || delivery.orderId;
        delivery.customerId = updatedDelivery.customerId || delivery.customerId;
        delivery.receiverName = updatedDelivery.receiverName || delivery.receiverName;
        delivery.receiverCpf = updatedDelivery.receiverCpf || delivery.receiverCpf;
        delivery.isBuyer = hasValue ? updatedDelivery.isBuyer : delivery.isBuyer;
        delivery.dateTime = updatedDelivery.dateTime || delivery.dateTime;
        delivery.local = updatedDelivery.local || delivery.local;
        resolve(delivery);
      }
      resolve(null);
    })
  }

  static delete(deliveryId) {
    return new Promise((resolve) => {
      const delivery = db[deliveryId];
      if(delivery) {
        delete db[deliveryId];
        resolve(true);
      }
      resolve(false);
    });
  }
}
module.exports = DeliveryService;