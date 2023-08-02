import { builder } from '@/graphql/builder';

interface Input {
  socketId: string;
}

const InputRef = builder.inputRef<Input>('AuthenticateUserInput').implement({
  description: 'Input for authenticating a user',
  fields: (t) => ({
    socketId: t.string({ required: true }),
  }),
});

interface Payload {
  data: Data | null;
  status: number;
}

const PayloadRef = builder.objectRef<Payload>('AuthenticateUserPayload').implement({
  description: 'Payload for authenticating a user',
  fields: (t) => ({
    data: t.field({
      type: DataRef,
      nullable: true,
      resolve: (parent) => parent.data,
    }),
    status: t.int({ resolve: (parent) => parent.status }),
  }),
});

interface Data {
  auth: string;
  userData: string;
}

const DataRef = builder.objectRef<Data>('AuthenticateUserData').implement({
  description: 'Data for authenticating a user',
  fields: (t) => ({
    auth: t.string({ resolve: (parent) => parent.auth }),
    userData: t.string({ resolve: (parent) => parent.userData }),
  }),
});

builder.mutationField('authenticateUser', (t) =>
  t.field({
    type: PayloadRef,
    args: {
      input: t.arg({ type: InputRef, required: true }),
    },
    resolve: async (_, { input: { socketId } }, { token, dataSources: { session }, pusher }) => {
      if (!token) return { data: null, status: 403 };

      const user = await session
        .findUnique({
          select: { user: { select: { id: true, name: true } } },
          where: { sessionToken: token },
        })
        .then((session) =>
          session
            ? { id: session.user.id, user_info: { name: session.user.name ?? 'unknown' } }
            : null,
        );
      if (!user) return { data: null, status: 403 };

      try {
        const { auth, user_data: userData } = pusher.authenticateUser(socketId, user);
        return { data: { auth, userData }, status: 200 };
      } catch {
        return { data: null, status: 403 };
      }
    },
  }),
);
