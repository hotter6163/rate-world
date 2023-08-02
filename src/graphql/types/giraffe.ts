import { builder } from '../builder';

interface Giraffe {
  name: string;
  birthday: Date;
  heightInMeters: number;
}

const GiraffeRef = builder.objectRef<Giraffe>('Giraffe').implement({
  description: 'Long necks, cool patterns, taller than you.',
  fields: (t) => ({
    name: t.exposeString('name', {}),
    age: t.int({
      resolve: (parent) => {
        const ageDifMs = Date.now() - parent.birthday.getTime();
        const ageDate = new Date(ageDifMs); // milliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      },
    }),
    height: t.float({
      resolve: (parent) => parent.heightInMeters,
    }),
  }),
});

builder.queryFields((t) => ({
  giraffe: t.field({
    type: GiraffeRef,
    resolve: () => ({
      name: 'James',
      birthday: new Date(Date.UTC(2012, 11, 12)),
      heightInMeters: 5.2,
    }),
  }),
}));
