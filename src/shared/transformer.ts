import { type CoercedTransformerParameters } from '@trpc/client/src/internals/transformer';
import type { AnyRouter, CombinedDataTransformer } from '@trpc/server';

import { RouterTransformerOptions } from '../types';

export const getTransformer = <TRouter extends AnyRouter>(
  transformer: RouterTransformerOptions<TRouter>['transformer'],
): CombinedDataTransformer => {
  const _transformer = transformer as CoercedTransformerParameters['transformer'];
  if (!_transformer) {
    return {
      input: {
        serialize: (data) => data,
        deserialize: (data) => data,
      },
      output: {
        serialize: (data) => data,
        deserialize: (data) => data,
      },
    };
  }
  if ('input' in _transformer) {
    return _transformer;
  }
  return {
    input: _transformer,
    output: _transformer,
  };
};
