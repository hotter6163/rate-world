export const channelSubscriptionSucceededHandler =
  (channelName: string, callback: () => void) => () => {
    callback();
    console.info('subscription_succeeded', channelName);
  };
