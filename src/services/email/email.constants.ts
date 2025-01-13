export const MANIFEST_DATA = {
  name: process.env.NOTIFICATION_APP_NAME,
  tokenTargetUrl: `${process.env.NOTIFICATION_BACKEND_URL}/api/v1/notification/token-target`,
  registerUrl: `${process.env.NOTIFICATION_BACKEND_URL}/api/v1/notification/register`,
  targetUrl: `${process.env.NOTIFICATION_BACKEND_URL}/api/v1/notification/token`, 
  refreTokenUrl: `${process.env.NOTIFICATION_BACKEND_URL}/api/v1/notification/refresh-token`, 
  trigger_oauth : true,
  appUrl: `${process.env.NOTIFICATION_BACKEND_URL}`,
  // permissions: ["MANAGE_PRODUCTS"],
  id: process.env.NOTIFICATION_APP_ID,
  version: "1.0.0",
  // webhooks: [
  //   {
  //     query:"subscription OrderCreated { event { ...OrderCreatedEvent } } fragment BasicWebhookMetadata on Event { issuedAt version } fragment orderMetadata on Order { id } fragment OrderCreatedEvent on OrderCreated { ...BasicWebhookMetadata order { ...orderMetadata } }",
  //     name: "Order Created",
  //     targetUrl: `${process.env.NOTIFICATION_BACKEND_URL}/api/v1/notification/order-status`,
  //     isActive: true,
  //     asyncEvents: ["ORDER_CREATED"],
  //   },
  // ],
  extensions: [],
  author: process.env.NOTIFICATION_APP_AUTHER_NAME,
  // brand: {
  //   logo: {
  //     default: "",
  //   },
  // },
}
