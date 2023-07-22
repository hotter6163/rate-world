interface Payload {
  roomId: string;
}

export const matchingMatchedHandler =
  (callback: (roomId: string) => void) =>
  ({ roomId }: Payload) => {
    callback(roomId);
  };
