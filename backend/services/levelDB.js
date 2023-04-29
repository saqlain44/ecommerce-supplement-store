const { Level } = require('level');
const db = new Level('./paymentDB.level', { valueEncoding: 'json' });

async function getOrderId(paymentId) {
  try {
    const orderId = await db.get(paymentId);

    return orderId;
  } catch (error) {
    return null;
  }
}

async function setPaymentId(paymentId, orderId) {
  await db.put(paymentId, orderId);
}

module.exports = {
  db,
  getOrderId,
  setPaymentId,
};
