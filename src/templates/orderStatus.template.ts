import { toTitleCase } from "../utils/helpers.utils"
import { IOrderStatusEmailData } from "./template.interface"

export const confirmOrderIOrderStatusEmailData = (data: IOrderStatusEmailData) => {
  const body = `Thank you for your purchase!<br><br>
  Your order ${data.orderId} worth Rs. ${data.amount} has been successfully placed.`

  const subject = `${data.team} | Thank You for Your Purchase!`
  const title = `Order Confirmed`
  return { body, subject, title }
}

export const pickedUpOrderIOrderStatusEmailData = (data: IOrderStatusEmailData) => {
  const customerName = data.customerName ? " " + toTitleCase(data.customerName) : "";
  const body = `Hi${customerName}, your order ${data.orderId} has been picked up and will be out for delivery soon.<br><br>`;

  const subject = `${data.team} | Order ${data.orderId} Picked Up`;
  const title = `Order Picked Up`;
  return { body, subject, title };
};

export const outForDeliveryIOrderStatusEmailData = (data: IOrderStatusEmailData) => {
  const body = `Great news! Your order ${data.orderId} is Out for Delivery and will be delivered by ${data.arrivingDate}`

  const subject = `${data.team} | Your Order is Out for Delivery!!`
  const title = `Order ${data.orderId} Out for Delivery`
  return { body, subject, title }
}

export const cancelOrderIOrderStatusEmailData = (data: IOrderStatusEmailData) => {
  const body = `We want to inform you that your order ${data.orderId} has been successfully cancelled.`
  const subject = `${data.team} | Order Cancelled Successfully`
  const title = `Order Cancelled`
  return { body, subject, title }
}

export const returnRequestConfirmationData = (data: IOrderStatusEmailData) => {
  const title = `Return Request Received`
  const subject = `${data.team} | Return Request Received`
  const body = `We are pleased to inform you that your return request for order ${data.orderId} has been successfully submitted. The items included in the request are:`
  return { body, subject, title }
}

export const deliveredOrderData = (data: IOrderStatusEmailData) => {
  const title = `Order Delivered`
  const subject = `${data.orderId} \n${data.team} | Order Delivered Successfully!`
  const body = `We're pleased to inform you that your order ${data.orderId} has been successfully delivered.<br>
   We hope you enjoy your purchase!`
  return { body, subject, title }
}

export const returnRequestApprovedData = (data: IOrderStatusEmailData) => {
  const title = `Return Request Accepted`
  const body = `Your return request for order ${data.orderId} has been accepted. Refund will be initiated in ${data.refundTat} days.`
  const subject = `${data.team} | Return Request Accepted`
  return { body, subject, title }
}

export const returnRequestRejectedData = (data: IOrderStatusEmailData) => {
  const title = `Return Request Rejected`
  const subject = `${data.orderId}\n${data.team} | Return Request Rejected`
  const body = `We regret to inform you that your return request for order ${data.orderId} has been rejected due to reason ${data.reason}.`
  return { body, subject, title }
}

export const returnRequestProcessedData = (data: IOrderStatusEmailData) => {
  const title = `Return Request Processed`
  const subject = `${data.team} | Return Request Processed`
  const body = `We are pleased to inform you that your refund of Rs. ${data.amount} for Order ${data.orderId} has been successfully processed.`
  return { body, subject, title }
}

export const ORDER_STATUS_EMAIL_MAPPING: Record<string, Function> = {
  confirm: confirmOrderIOrderStatusEmailData,
  "order-picked-up": pickedUpOrderIOrderStatusEmailData,
  "out-for-delivery": outForDeliveryIOrderStatusEmailData,
  cancelled: cancelOrderIOrderStatusEmailData,
  return_initiated: returnRequestConfirmationData,
  "order-delivered": deliveredOrderData,
  return_approved: returnRequestApprovedData,
  return_rejected: returnRequestRejectedData,
  liquidated: returnRequestProcessedData,
}
