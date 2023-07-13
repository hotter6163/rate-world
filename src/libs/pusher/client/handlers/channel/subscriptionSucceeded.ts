export const channelSubscriptionSucceededHandler = (channelName: string) => () => {
  console.info('subscription_succeeded', channelName);
};
