import { Context } from './context';
import SchemaBuilder from '@pothos/core';

const builder = new SchemaBuilder<{ Context: Context }>({});

builder.queryType({});

builder.mutationType({});

export { builder };
