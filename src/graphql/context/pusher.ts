import Pusher from 'pusher';

const globalForPusher = global as unknown as { pusher: Pusher };

const pusher =
  globalForPusher.pusher ||
  (typeof window === 'undefined'
    ? new Pusher({
        appId: process.env.PUSHER_APP_ID!,
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
        secret: process.env.PUSHER_SECRET!,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
        useTLS: true,
      })
    : undefined);

if (process.env.NODE_ENV !== 'production') globalForPusher.pusher = pusher;

export default pusher;
