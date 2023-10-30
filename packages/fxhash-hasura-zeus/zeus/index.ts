/* eslint-disable */

import { AllTypesProps, ReturnTypes, Ops } from './const';
export const HOST = "http://localhost:8888/v1/graphql"


export const HEADERS = {}
export const apiSubscription = (options: chainOptions) => (query: string) => {
  try {
    const queryString = options[0] + '?query=' + encodeURIComponent(query);
    const wsString = queryString.replace('http', 'ws');
    const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString;
    const webSocketOptions = options[1]?.websocket || [host];
    const ws = new WebSocket(...webSocketOptions);
    return {
      ws,
      on: (e: (args: any) => void) => {
        ws.onmessage = (event: any) => {
          if (event.data) {
            const parsed = JSON.parse(event.data);
            const data = parsed.data;
            return e(data);
          }
        };
      },
      off: (e: (args: any) => void) => {
        ws.onclose = e;
      },
      error: (e: (args: any) => void) => {
        ws.onerror = e;
      },
      open: (e: () => void) => {
        ws.onopen = e;
      },
    };
  } catch {
    throw new Error('No websockets implemented');
  }
};
const handleFetchResponse = (response: Response): Promise<GraphQLResponse> => {
  if (!response.ok) {
    return new Promise((_, reject) => {
      response
        .text()
        .then((text) => {
          try {
            reject(JSON.parse(text));
          } catch (err) {
            reject(text);
          }
        })
        .catch(reject);
    });
  }
  return response.json() as Promise<GraphQLResponse>;
};

export const apiFetch =
  (options: fetchOptions) =>
  (query: string, variables: Record<string, unknown> = {}) => {
    const fetchOptions = options[1] || {};
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      return fetch(`${options[0]}?query=${encodeURIComponent(query)}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response: GraphQLResponse) => {
          if (response.errors) {
            throw new GraphQLError(response);
          }
          return response.data;
        });
    }
    return fetch(`${options[0]}`, {
      body: JSON.stringify({ query, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...fetchOptions,
    })
      .then(handleFetchResponse)
      .then((response: GraphQLResponse) => {
        if (response.errors) {
          throw new GraphQLError(response);
        }
        return response.data;
      });
  };

export const InternalsBuildQuery = ({
  ops,
  props,
  returns,
  options,
  scalars,
}: {
  props: AllTypesPropsType;
  returns: ReturnTypesType;
  ops: Operations;
  options?: OperationOptions;
  scalars?: ScalarDefinition;
}) => {
  const ibb = (
    k: string,
    o: InputValueType | VType,
    p = '',
    root = true,
    vars: Array<{ name: string; graphQLType: string }> = [],
  ): string => {
    const keyForPath = purifyGraphQLKey(k);
    const newPath = [p, keyForPath].join(SEPARATOR);
    if (!o) {
      return '';
    }
    if (typeof o === 'boolean' || typeof o === 'number') {
      return k;
    }
    if (typeof o === 'string') {
      return `${k} ${o}`;
    }
    if (Array.isArray(o)) {
      const args = InternalArgsBuilt({
        props,
        returns,
        ops,
        scalars,
        vars,
      })(o[0], newPath);
      return `${ibb(args ? `${k}(${args})` : k, o[1], p, false, vars)}`;
    }
    if (k === '__alias') {
      return Object.entries(o)
        .map(([alias, objectUnderAlias]) => {
          if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
            throw new Error(
              'Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}',
            );
          }
          const operationName = Object.keys(objectUnderAlias)[0];
          const operation = objectUnderAlias[operationName];
          return ibb(`${alias}:${operationName}`, operation, p, false, vars);
        })
        .join('\n');
    }
    const hasOperationName = root && options?.operationName ? ' ' + options.operationName : '';
    const keyForDirectives = o.__directives ?? '';
    const query = `{${Object.entries(o)
      .filter(([k]) => k !== '__directives')
      .map((e) => ibb(...e, [p, `field<>${keyForPath}`].join(SEPARATOR), false, vars))
      .join('\n')}}`;
    if (!root) {
      return `${k} ${keyForDirectives}${hasOperationName} ${query}`;
    }
    const varsString = vars.map((v) => `${v.name}: ${v.graphQLType}`).join(', ');
    return `${k} ${keyForDirectives}${hasOperationName}${varsString ? `(${varsString})` : ''} ${query}`;
  };
  return ibb;
};

export const Thunder =
  (fn: FetchFunction) =>
  <O extends keyof typeof Ops, SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(
    operation: O,
    graphqlOptions?: ThunderGraphQLOptions<SCLR>,
  ) =>
  <Z extends ValueTypes[R]>(
    o: (Z & ValueTypes[R]) | ValueTypes[R],
    ops?: OperationOptions & { variables?: Record<string, unknown> },
  ) =>
    fn(
      Zeus(operation, o, {
        operationOptions: ops,
        scalars: graphqlOptions?.scalars,
      }),
      ops?.variables,
    ).then((data) => {
      if (graphqlOptions?.scalars) {
        return decodeScalarsInResponse({
          response: data,
          initialOp: operation,
          initialZeusQuery: o as VType,
          returns: ReturnTypes,
          scalars: graphqlOptions.scalars,
          ops: Ops,
        });
      }
      return data;
    }) as Promise<InputType<GraphQLTypes[R], Z, SCLR>>;

export const Chain = (...options: chainOptions) => Thunder(apiFetch(options));

export const SubscriptionThunder =
  (fn: SubscriptionFunction) =>
  <O extends keyof typeof Ops, SCLR extends ScalarDefinition, R extends keyof ValueTypes = GenericOperation<O>>(
    operation: O,
    graphqlOptions?: ThunderGraphQLOptions<SCLR>,
  ) =>
  <Z extends ValueTypes[R]>(
    o: (Z & ValueTypes[R]) | ValueTypes[R],
    ops?: OperationOptions & { variables?: ExtractVariables<Z> },
  ) => {
    const returnedFunction = fn(
      Zeus(operation, o, {
        operationOptions: ops,
        scalars: graphqlOptions?.scalars,
      }),
    ) as SubscriptionToGraphQL<Z, GraphQLTypes[R], SCLR>;
    if (returnedFunction?.on && graphqlOptions?.scalars) {
      const wrapped = returnedFunction.on;
      returnedFunction.on = (fnToCall: (args: InputType<GraphQLTypes[R], Z, SCLR>) => void) =>
        wrapped((data: InputType<GraphQLTypes[R], Z, SCLR>) => {
          if (graphqlOptions?.scalars) {
            return fnToCall(
              decodeScalarsInResponse({
                response: data,
                initialOp: operation,
                initialZeusQuery: o as VType,
                returns: ReturnTypes,
                scalars: graphqlOptions.scalars,
                ops: Ops,
              }),
            );
          }
          return fnToCall(data);
        });
    }
    return returnedFunction;
  };

export const Subscription = (...options: chainOptions) => SubscriptionThunder(apiSubscription(options));
export const Zeus = <
  Z extends ValueTypes[R],
  O extends keyof typeof Ops,
  R extends keyof ValueTypes = GenericOperation<O>,
>(
  operation: O,
  o: (Z & ValueTypes[R]) | ValueTypes[R],
  ops?: {
    operationOptions?: OperationOptions;
    scalars?: ScalarDefinition;
  },
) =>
  InternalsBuildQuery({
    props: AllTypesProps,
    returns: ReturnTypes,
    ops: Ops,
    options: ops?.operationOptions,
    scalars: ops?.scalars,
  })(operation, o as VType);

export const ZeusSelect = <T>() => ((t: unknown) => t) as SelectionFunction<T>;

export const Selector = <T extends keyof ValueTypes>(key: T) => key && ZeusSelect<ValueTypes[T]>();

export const TypeFromSelector = <T extends keyof ValueTypes>(key: T) => key && ZeusSelect<ValueTypes[T]>();
export const Gql = Chain(HOST, {
  headers: {
    'Content-Type': 'application/json',
    ...HEADERS,
  },
});

export const ZeusScalars = ZeusSelect<ScalarCoders>();

export const decodeScalarsInResponse = <O extends Operations>({
  response,
  scalars,
  returns,
  ops,
  initialZeusQuery,
  initialOp,
}: {
  ops: O;
  response: any;
  returns: ReturnTypesType;
  scalars?: Record<string, ScalarResolver | undefined>;
  initialOp: keyof O;
  initialZeusQuery: InputValueType | VType;
}) => {
  if (!scalars) {
    return response;
  }
  const builder = PrepareScalarPaths({
    ops,
    returns,
  });

  const scalarPaths = builder(initialOp as string, ops[initialOp], initialZeusQuery);
  if (scalarPaths) {
    const r = traverseResponse({ scalarPaths, resolvers: scalars })(initialOp as string, response, [ops[initialOp]]);
    return r;
  }
  return response;
};

export const traverseResponse = ({
  resolvers,
  scalarPaths,
}: {
  scalarPaths: { [x: string]: `scalar.${string}` };
  resolvers: {
    [x: string]: ScalarResolver | undefined;
  };
}) => {
  const ibb = (k: string, o: InputValueType | VType, p: string[] = []): unknown => {
    if (Array.isArray(o)) {
      return o.map((eachO) => ibb(k, eachO, p));
    }
    if (o == null) {
      return o;
    }
    const scalarPathString = p.join(SEPARATOR);
    const currentScalarString = scalarPaths[scalarPathString];
    if (currentScalarString) {
      const currentDecoder = resolvers[currentScalarString.split('.')[1]]?.decode;
      if (currentDecoder) {
        return currentDecoder(o);
      }
    }
    if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string' || !o) {
      return o;
    }
    const entries = Object.entries(o).map(([k, v]) => [k, ibb(k, v, [...p, purifyGraphQLKey(k)])] as const);
    const objectFromEntries = entries.reduce<Record<string, unknown>>((a, [k, v]) => {
      a[k] = v;
      return a;
    }, {});
    return objectFromEntries;
  };
  return ibb;
};

export type AllTypesPropsType = {
  [x: string]:
    | undefined
    | `scalar.${string}`
    | 'enum'
    | {
        [x: string]:
          | undefined
          | string
          | {
              [x: string]: string | undefined;
            };
      };
};

export type ReturnTypesType = {
  [x: string]:
    | {
        [x: string]: string | undefined;
      }
    | `scalar.${string}`
    | undefined;
};
export type InputValueType = {
  [x: string]: undefined | boolean | string | number | [any, undefined | boolean | InputValueType] | InputValueType;
};
export type VType =
  | undefined
  | boolean
  | string
  | number
  | [any, undefined | boolean | InputValueType]
  | InputValueType;

export type PlainType = boolean | number | string | null | undefined;
export type ZeusArgsType =
  | PlainType
  | {
      [x: string]: ZeusArgsType;
    }
  | Array<ZeusArgsType>;

export type Operations = Record<string, string>;

export type VariableDefinition = {
  [x: string]: unknown;
};

export const SEPARATOR = '|';

export type fetchOptions = Parameters<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (...args: infer R) => WebSocket ? R : never;
export type chainOptions = [fetchOptions[0], fetchOptions[1] & { websocket?: websocketOptions }] | [fetchOptions[0]];
export type FetchFunction = (query: string, variables?: Record<string, unknown>) => Promise<any>;
export type SubscriptionFunction = (query: string) => any;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;

export type OperationOptions = {
  operationName?: string;
};

export type ScalarCoder = Record<string, (s: unknown) => string>;

export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
export class GraphQLError extends Error {
  constructor(public response: GraphQLResponse) {
    super('');
    console.error(response);
  }
  toString() {
    return 'GraphQL Response Error';
  }
}
export type GenericOperation<O> = O extends keyof typeof Ops ? typeof Ops[O] : never;
export type ThunderGraphQLOptions<SCLR extends ScalarDefinition> = {
  scalars?: SCLR | ScalarCoders;
};

const ExtractScalar = (mappedParts: string[], returns: ReturnTypesType): `scalar.${string}` | undefined => {
  if (mappedParts.length === 0) {
    return;
  }
  const oKey = mappedParts[0];
  const returnP1 = returns[oKey];
  if (typeof returnP1 === 'object') {
    const returnP2 = returnP1[mappedParts[1]];
    if (returnP2) {
      return ExtractScalar([returnP2, ...mappedParts.slice(2)], returns);
    }
    return undefined;
  }
  return returnP1 as `scalar.${string}` | undefined;
};

export const PrepareScalarPaths = ({ ops, returns }: { returns: ReturnTypesType; ops: Operations }) => {
  const ibb = (
    k: string,
    originalKey: string,
    o: InputValueType | VType,
    p: string[] = [],
    pOriginals: string[] = [],
    root = true,
  ): { [x: string]: `scalar.${string}` } | undefined => {
    if (!o) {
      return;
    }
    if (typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string') {
      const extractionArray = [...pOriginals, originalKey];
      const isScalar = ExtractScalar(extractionArray, returns);
      if (isScalar?.startsWith('scalar')) {
        const partOfTree = {
          [[...p, k].join(SEPARATOR)]: isScalar,
        };
        return partOfTree;
      }
      return {};
    }
    if (Array.isArray(o)) {
      return ibb(k, k, o[1], p, pOriginals, false);
    }
    if (k === '__alias') {
      return Object.entries(o)
        .map(([alias, objectUnderAlias]) => {
          if (typeof objectUnderAlias !== 'object' || Array.isArray(objectUnderAlias)) {
            throw new Error(
              'Invalid alias it should be __alias:{ YOUR_ALIAS_NAME: { OPERATION_NAME: { ...selectors }}}',
            );
          }
          const operationName = Object.keys(objectUnderAlias)[0];
          const operation = objectUnderAlias[operationName];
          return ibb(alias, operationName, operation, p, pOriginals, false);
        })
        .reduce((a, b) => ({
          ...a,
          ...b,
        }));
    }
    const keyName = root ? ops[k] : k;
    return Object.entries(o)
      .filter(([k]) => k !== '__directives')
      .map(([k, v]) => {
        // Inline fragments shouldn't be added to the path as they aren't a field
        const isInlineFragment = originalKey.match(/^...\s*on/) != null;
        return ibb(
          k,
          k,
          v,
          isInlineFragment ? p : [...p, purifyGraphQLKey(keyName || k)],
          isInlineFragment ? pOriginals : [...pOriginals, purifyGraphQLKey(originalKey)],
          false,
        );
      })
      .reduce((a, b) => ({
        ...a,
        ...b,
      }));
  };
  return ibb;
};

export const purifyGraphQLKey = (k: string) => k.replace(/\([^)]*\)/g, '').replace(/^[^:]*\:/g, '');

const mapPart = (p: string) => {
  const [isArg, isField] = p.split('<>');
  if (isField) {
    return {
      v: isField,
      __type: 'field',
    } as const;
  }
  return {
    v: isArg,
    __type: 'arg',
  } as const;
};

type Part = ReturnType<typeof mapPart>;

export const ResolveFromPath = (props: AllTypesPropsType, returns: ReturnTypesType, ops: Operations) => {
  const ResolvePropsType = (mappedParts: Part[]) => {
    const oKey = ops[mappedParts[0].v];
    const propsP1 = oKey ? props[oKey] : props[mappedParts[0].v];
    if (propsP1 === 'enum' && mappedParts.length === 1) {
      return 'enum';
    }
    if (typeof propsP1 === 'string' && propsP1.startsWith('scalar.') && mappedParts.length === 1) {
      return propsP1;
    }
    if (typeof propsP1 === 'object') {
      if (mappedParts.length < 2) {
        return 'not';
      }
      const propsP2 = propsP1[mappedParts[1].v];
      if (typeof propsP2 === 'string') {
        return rpp(
          `${propsP2}${SEPARATOR}${mappedParts
            .slice(2)
            .map((mp) => mp.v)
            .join(SEPARATOR)}`,
        );
      }
      if (typeof propsP2 === 'object') {
        if (mappedParts.length < 3) {
          return 'not';
        }
        const propsP3 = propsP2[mappedParts[2].v];
        if (propsP3 && mappedParts[2].__type === 'arg') {
          return rpp(
            `${propsP3}${SEPARATOR}${mappedParts
              .slice(3)
              .map((mp) => mp.v)
              .join(SEPARATOR)}`,
          );
        }
      }
    }
  };
  const ResolveReturnType = (mappedParts: Part[]) => {
    if (mappedParts.length === 0) {
      return 'not';
    }
    const oKey = ops[mappedParts[0].v];
    const returnP1 = oKey ? returns[oKey] : returns[mappedParts[0].v];
    if (typeof returnP1 === 'object') {
      if (mappedParts.length < 2) return 'not';
      const returnP2 = returnP1[mappedParts[1].v];
      if (returnP2) {
        return rpp(
          `${returnP2}${SEPARATOR}${mappedParts
            .slice(2)
            .map((mp) => mp.v)
            .join(SEPARATOR)}`,
        );
      }
    }
  };
  const rpp = (path: string): 'enum' | 'not' | `scalar.${string}` => {
    const parts = path.split(SEPARATOR).filter((l) => l.length > 0);
    const mappedParts = parts.map(mapPart);
    const propsP1 = ResolvePropsType(mappedParts);
    if (propsP1) {
      return propsP1;
    }
    const returnP1 = ResolveReturnType(mappedParts);
    if (returnP1) {
      return returnP1;
    }
    return 'not';
  };
  return rpp;
};

export const InternalArgsBuilt = ({
  props,
  ops,
  returns,
  scalars,
  vars,
}: {
  props: AllTypesPropsType;
  returns: ReturnTypesType;
  ops: Operations;
  scalars?: ScalarDefinition;
  vars: Array<{ name: string; graphQLType: string }>;
}) => {
  const arb = (a: ZeusArgsType, p = '', root = true): string => {
    if (typeof a === 'string') {
      if (a.startsWith(START_VAR_NAME)) {
        const [varName, graphQLType] = a.replace(START_VAR_NAME, '$').split(GRAPHQL_TYPE_SEPARATOR);
        const v = vars.find((v) => v.name === varName);
        if (!v) {
          vars.push({
            name: varName,
            graphQLType,
          });
        } else {
          if (v.graphQLType !== graphQLType) {
            throw new Error(
              `Invalid variable exists with two different GraphQL Types, "${v.graphQLType}" and ${graphQLType}`,
            );
          }
        }
        return varName;
      }
    }
    const checkType = ResolveFromPath(props, returns, ops)(p);
    if (checkType.startsWith('scalar.')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...splittedScalar] = checkType.split('.');
      const scalarKey = splittedScalar.join('.');
      return (scalars?.[scalarKey]?.encode?.(a) as string) || JSON.stringify(a);
    }
    if (Array.isArray(a)) {
      return `[${a.map((arr) => arb(arr, p, false)).join(', ')}]`;
    }
    if (typeof a === 'string') {
      if (checkType === 'enum') {
        return a;
      }
      return `${JSON.stringify(a)}`;
    }
    if (typeof a === 'object') {
      if (a === null) {
        return `null`;
      }
      const returnedObjectString = Object.entries(a)
        .filter(([, v]) => typeof v !== 'undefined')
        .map(([k, v]) => `${k}: ${arb(v, [p, k].join(SEPARATOR), false)}`)
        .join(',\n');
      if (!root) {
        return `{${returnedObjectString}}`;
      }
      return returnedObjectString;
    }
    return `${a}`;
  };
  return arb;
};

export const resolverFor = <X, T extends keyof ResolverInputTypes, Z extends keyof ResolverInputTypes[T]>(
  type: T,
  field: Z,
  fn: (
    args: Required<ResolverInputTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> | X : never,
) => fn as (args?: any, source?: any) => ReturnType<typeof fn>;

export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<UnwrapPromise<ReturnType<T>>>;
export type ZeusHook<
  T extends (...args: any[]) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>,
> = ZeusState<ReturnType<T>[N]>;

export type WithTypeNameValue<T> = T & {
  __typename?: boolean;
  __directives?: string;
};
export type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
export type ScalarDefinition = Record<string, ScalarResolver>;

type IsScalar<S, SCLR extends ScalarDefinition> = S extends 'scalar' & { name: infer T }
  ? T extends keyof SCLR
    ? SCLR[T]['decode'] extends (s: unknown) => unknown
      ? ReturnType<SCLR[T]['decode']>
      : unknown
    : unknown
  : S;
type IsArray<T, U, SCLR extends ScalarDefinition> = T extends Array<infer R>
  ? InputType<R, U, SCLR>[]
  : InputType<T, U, SCLR>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;
type BaseZeusResolver = boolean | 1 | string | Variable<any, string>;

type IsInterfaced<SRC extends DeepAnify<DST>, DST, SCLR extends ScalarDefinition> = FlattenArray<SRC> extends
  | ZEUS_INTERFACES
  | ZEUS_UNIONS
  ? {
      [P in keyof SRC]: SRC[P] extends '__union' & infer R
        ? P extends keyof DST
          ? IsArray<R, '__typename' extends keyof DST ? DST[P] & { __typename: true } : DST[P], SCLR>
          : IsArray<R, '__typename' extends keyof DST ? { __typename: true } : Record<string, never>, SCLR>
        : never;
    }[keyof SRC] & {
      [P in keyof Omit<
        Pick<
          SRC,
          {
            [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
          }[keyof DST]
        >,
        '__typename'
      >]: IsPayLoad<DST[P]> extends BaseZeusResolver ? IsScalar<SRC[P], SCLR> : IsArray<SRC[P], DST[P], SCLR>;
    }
  : {
      [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends BaseZeusResolver
        ? IsScalar<SRC[P], SCLR>
        : IsArray<SRC[P], DST[P], SCLR>;
    };

export type MapType<SRC, DST, SCLR extends ScalarDefinition> = SRC extends DeepAnify<DST>
  ? IsInterfaced<SRC, DST, SCLR>
  : never;
// eslint-disable-next-line @typescript-eslint/ban-types
export type InputType<SRC, DST, SCLR extends ScalarDefinition = {}> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P], SCLR>[keyof MapType<SRC, R[P], SCLR>];
    } & MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>, SCLR>
  : MapType<SRC, IsPayLoad<DST>, SCLR>;
export type SubscriptionToGraphQL<Z, T, SCLR extends ScalarDefinition> = {
  ws: WebSocket;
  on: (fn: (args: InputType<T, Z, SCLR>) => void) => void;
  off: (fn: (e: { data?: InputType<T, Z, SCLR>; code?: number; reason?: string; message?: string }) => void) => void;
  error: (fn: (e: { data?: InputType<T, Z, SCLR>; errors?: string[] }) => void) => void;
  open: () => void;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type FromSelector<SELECTOR, NAME extends keyof GraphQLTypes, SCLR extends ScalarDefinition = {}> = InputType<
  GraphQLTypes[NAME],
  SELECTOR,
  SCLR
>;

export type ScalarResolver = {
  encode?: (s: unknown) => string;
  decode?: (s: unknown) => unknown;
};

export type SelectionFunction<V> = <T>(t: T | V) => T;

type BuiltInVariableTypes = {
  ['String']: string;
  ['Int']: number;
  ['Float']: number;
  ['ID']: unknown;
  ['Boolean']: boolean;
};
type AllVariableTypes = keyof BuiltInVariableTypes | keyof ZEUS_VARIABLES;
type VariableRequired<T extends string> = `${T}!` | T | `[${T}]` | `[${T}]!` | `[${T}!]` | `[${T}!]!`;
type VR<T extends string> = VariableRequired<VariableRequired<T>>;

export type GraphQLVariableType = VR<AllVariableTypes>;

type ExtractVariableTypeString<T extends string> = T extends VR<infer R1>
  ? R1 extends VR<infer R2>
    ? R2 extends VR<infer R3>
      ? R3 extends VR<infer R4>
        ? R4 extends VR<infer R5>
          ? R5
          : R4
        : R3
      : R2
    : R1
  : T;

type DecomposeType<T, Type> = T extends `[${infer R}]`
  ? Array<DecomposeType<R, Type>> | undefined
  : T extends `${infer R}!`
  ? NonNullable<DecomposeType<R, Type>>
  : Type | undefined;

type ExtractTypeFromGraphQLType<T extends string> = T extends keyof ZEUS_VARIABLES
  ? ZEUS_VARIABLES[T]
  : T extends keyof BuiltInVariableTypes
  ? BuiltInVariableTypes[T]
  : any;

export type GetVariableType<T extends string> = DecomposeType<
  T,
  ExtractTypeFromGraphQLType<ExtractVariableTypeString<T>>
>;

type UndefinedKeys<T> = {
  [K in keyof T]-?: T[K] extends NonNullable<T[K]> ? never : K;
}[keyof T];

type WithNullableKeys<T> = Pick<T, UndefinedKeys<T>>;
type WithNonNullableKeys<T> = Omit<T, UndefinedKeys<T>>;

type OptionalKeys<T> = {
  [P in keyof T]?: T[P];
};

export type WithOptionalNullables<T> = OptionalKeys<WithNullableKeys<T>> & WithNonNullableKeys<T>;

export type Variable<T extends GraphQLVariableType, Name extends string> = {
  ' __zeus_name': Name;
  ' __zeus_type': T;
};

export type ExtractVariables<Query> = Query extends Variable<infer VType, infer VName>
  ? { [key in VName]: GetVariableType<VType> }
  : Query extends [infer Inputs, infer Outputs]
  ? ExtractVariables<Inputs> & ExtractVariables<Outputs>
  : Query extends string | number | boolean
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : UnionToIntersection<{ [K in keyof Query]: WithOptionalNullables<ExtractVariables<Query[K]>> }[keyof Query]>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export const START_VAR_NAME = `$ZEUS_VAR`;
export const GRAPHQL_TYPE_SEPARATOR = `__$GRAPHQL__`;

export const $ = <Type extends GraphQLVariableType, Name extends string>(name: Name, graphqlType: Type) => {
  return (START_VAR_NAME + name + GRAPHQL_TYPE_SEPARATOR + graphqlType) as unknown as Variable<Type, Name>;
};
type ZEUS_INTERFACES = never
export type ScalarCoders = {
	AccountStatus?: ScalarResolver;
	BlockchainNetwork?: ScalarResolver;
	ProjectState?: ScalarResolver;
	Storage?: ScalarResolver;
	_AccountRoles?: ScalarResolver;
	jsonb?: ScalarResolver;
	smallint?: ScalarResolver;
	timestamp?: ScalarResolver;
	timestamptz?: ScalarResolver;
	uuid?: ScalarResolver;
}
type ZEUS_UNIONS = never

export type ValueTypes = {
    /** columns and relationships of "Account" */
["Account"]: AliasType<{
authoredProjects?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Project_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Project"]],
authoredProjects_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Project_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Project_aggregate"]],
curatedProjects?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Project_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Project"]],
curatedProjects_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Project_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Project_aggregate"]],
	id?:boolean | `@${string}`,
profile?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Profile_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Profile_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Profile"]],
profile_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Profile_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Profile_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Profile_aggregate"]],
	roles?:boolean | `@${string}`,
	status?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
wallets?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Wallet_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Wallet_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Wallet"]],
wallets_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Wallet_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Wallet_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Wallet_aggregate"]],
		__typename?: boolean | `@${string}`
}>;
	["AccountStatus"]:unknown;
	/** Boolean expression to compare columns of type "AccountStatus". All fields are combined with logical 'AND'. */
["AccountStatus_comparison_exp"]: {
	_eq?: ValueTypes["AccountStatus"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["AccountStatus"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["AccountStatus"] | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["AccountStatus"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["AccountStatus"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["AccountStatus"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["AccountStatus"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["AccountStatus"]> | undefined | null | Variable<any, string>
};
	/** aggregated selection of "Account" */
["Account_aggregate"]: AliasType<{
	aggregate?:ValueTypes["Account_aggregate_fields"],
	nodes?:ValueTypes["Account"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate fields of "Account" */
["Account_aggregate_fields"]: AliasType<{
count?: [{	columns?: Array<ValueTypes["Account_select_column"]> | undefined | null | Variable<any, string>,	distinct?: boolean | undefined | null | Variable<any, string>},boolean | `@${string}`],
	max?:ValueTypes["Account_max_fields"],
	min?:ValueTypes["Account_min_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
["Account_bool_exp"]: {
	_and?: Array<ValueTypes["Account_bool_exp"]> | undefined | null | Variable<any, string>,
	_not?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>,
	_or?: Array<ValueTypes["Account_bool_exp"]> | undefined | null | Variable<any, string>,
	authoredProjects?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>,
	authoredProjects_aggregate?: ValueTypes["Project_aggregate_bool_exp"] | undefined | null | Variable<any, string>,
	curatedProjects?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>,
	curatedProjects_aggregate?: ValueTypes["Project_aggregate_bool_exp"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>,
	profile?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>,
	profile_aggregate?: ValueTypes["Profile_aggregate_bool_exp"] | undefined | null | Variable<any, string>,
	roles?: ValueTypes["_AccountRoles_comparison_exp"] | undefined | null | Variable<any, string>,
	status?: ValueTypes["AccountStatus_comparison_exp"] | undefined | null | Variable<any, string>,
	username?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	wallets?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>,
	wallets_aggregate?: ValueTypes["Wallet_aggregate_bool_exp"] | undefined | null | Variable<any, string>
};
	/** unique or primary key constraints on table "Account" */
["Account_constraint"]:Account_constraint;
	/** input type for inserting data into table "Account" */
["Account_insert_input"]: {
	authoredProjects?: ValueTypes["Project_arr_rel_insert_input"] | undefined | null | Variable<any, string>,
	curatedProjects?: ValueTypes["Project_arr_rel_insert_input"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	profile?: ValueTypes["Profile_arr_rel_insert_input"] | undefined | null | Variable<any, string>,
	roles?: ValueTypes["_AccountRoles"] | undefined | null | Variable<any, string>,
	status?: ValueTypes["AccountStatus"] | undefined | null | Variable<any, string>,
	username?: string | undefined | null | Variable<any, string>,
	wallets?: ValueTypes["Wallet_arr_rel_insert_input"] | undefined | null | Variable<any, string>
};
	/** aggregate max on columns */
["Account_max_fields"]: AliasType<{
	id?:boolean | `@${string}`,
	status?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate min on columns */
["Account_min_fields"]: AliasType<{
	id?:boolean | `@${string}`,
	status?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** response of any mutation on the table "Account" */
["Account_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ValueTypes["Account"],
		__typename?: boolean | `@${string}`
}>;
	/** input type for inserting object relation for remote table "Account" */
["Account_obj_rel_insert_input"]: {
	data: ValueTypes["Account_insert_input"] | Variable<any, string>,
	/** upsert condition */
	on_conflict?: ValueTypes["Account_on_conflict"] | undefined | null | Variable<any, string>
};
	/** on_conflict condition type for table "Account" */
["Account_on_conflict"]: {
	constraint: ValueTypes["Account_constraint"] | Variable<any, string>,
	update_columns: Array<ValueTypes["Account_update_column"]> | Variable<any, string>,
	where?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>
};
	/** Ordering options when selecting data from "Account". */
["Account_order_by"]: {
	authoredProjects_aggregate?: ValueTypes["Project_aggregate_order_by"] | undefined | null | Variable<any, string>,
	curatedProjects_aggregate?: ValueTypes["Project_aggregate_order_by"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	profile_aggregate?: ValueTypes["Profile_aggregate_order_by"] | undefined | null | Variable<any, string>,
	roles?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	status?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	username?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	wallets_aggregate?: ValueTypes["Wallet_aggregate_order_by"] | undefined | null | Variable<any, string>
};
	/** primary key columns input for table: Account */
["Account_pk_columns_input"]: {
	id: ValueTypes["uuid"] | Variable<any, string>
};
	/** select columns of table "Account" */
["Account_select_column"]:Account_select_column;
	/** input type for updating data in table "Account" */
["Account_set_input"]: {
	id?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	roles?: ValueTypes["_AccountRoles"] | undefined | null | Variable<any, string>,
	status?: ValueTypes["AccountStatus"] | undefined | null | Variable<any, string>,
	username?: string | undefined | null | Variable<any, string>
};
	/** Streaming cursor of the table "Account" */
["Account_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ValueTypes["Account_stream_cursor_value_input"] | Variable<any, string>,
	/** cursor ordering */
	ordering?: ValueTypes["cursor_ordering"] | undefined | null | Variable<any, string>
};
	/** Initial value of the column from where the streaming should start */
["Account_stream_cursor_value_input"]: {
	id?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	roles?: ValueTypes["_AccountRoles"] | undefined | null | Variable<any, string>,
	status?: ValueTypes["AccountStatus"] | undefined | null | Variable<any, string>,
	username?: string | undefined | null | Variable<any, string>
};
	/** update columns of table "Account" */
["Account_update_column"]:Account_update_column;
	["Account_updates"]: {
	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Account_set_input"] | undefined | null | Variable<any, string>,
	/** filter the rows which have to be updated */
	where: ValueTypes["Account_bool_exp"] | Variable<any, string>
};
	["BlockchainNetwork"]:unknown;
	/** Boolean expression to compare columns of type "BlockchainNetwork". All fields are combined with logical 'AND'. */
["BlockchainNetwork_comparison_exp"]: {
	_eq?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["BlockchainNetwork"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["BlockchainNetwork"]> | undefined | null | Variable<any, string>
};
	/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
["Int_comparison_exp"]: {
	_eq?: number | undefined | null | Variable<any, string>,
	_gt?: number | undefined | null | Variable<any, string>,
	_gte?: number | undefined | null | Variable<any, string>,
	_in?: Array<number> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: number | undefined | null | Variable<any, string>,
	_lte?: number | undefined | null | Variable<any, string>,
	_neq?: number | undefined | null | Variable<any, string>,
	_nin?: Array<number> | undefined | null | Variable<any, string>
};
	/** columns and relationships of "Media" */
["Media"]: AliasType<{
	bucketId?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	etag?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
project?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["ProjectMedia_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia"]],
project_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["ProjectMedia_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia_aggregate"]],
	s3key?:boolean | `@${string}`,
	size?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	/** An object relationship */
	uploader?:ValueTypes["Account"],
	uploaderId?:boolean | `@${string}`,
	url?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "Media" */
["Media_aggregate"]: AliasType<{
	aggregate?:ValueTypes["Media_aggregate_fields"],
	nodes?:ValueTypes["Media"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate fields of "Media" */
["Media_aggregate_fields"]: AliasType<{
	avg?:ValueTypes["Media_avg_fields"],
count?: [{	columns?: Array<ValueTypes["Media_select_column"]> | undefined | null | Variable<any, string>,	distinct?: boolean | undefined | null | Variable<any, string>},boolean | `@${string}`],
	max?:ValueTypes["Media_max_fields"],
	min?:ValueTypes["Media_min_fields"],
	stddev?:ValueTypes["Media_stddev_fields"],
	stddev_pop?:ValueTypes["Media_stddev_pop_fields"],
	stddev_samp?:ValueTypes["Media_stddev_samp_fields"],
	sum?:ValueTypes["Media_sum_fields"],
	var_pop?:ValueTypes["Media_var_pop_fields"],
	var_samp?:ValueTypes["Media_var_samp_fields"],
	variance?:ValueTypes["Media_variance_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate avg on columns */
["Media_avg_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** Boolean expression to filter rows from the table "Media". All fields are combined with a logical 'AND'. */
["Media_bool_exp"]: {
	_and?: Array<ValueTypes["Media_bool_exp"]> | undefined | null | Variable<any, string>,
	_not?: ValueTypes["Media_bool_exp"] | undefined | null | Variable<any, string>,
	_or?: Array<ValueTypes["Media_bool_exp"]> | undefined | null | Variable<any, string>,
	bucketId?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["timestamp_comparison_exp"] | undefined | null | Variable<any, string>,
	etag?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>,
	name?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	project?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>,
	project_aggregate?: ValueTypes["ProjectMedia_aggregate_bool_exp"] | undefined | null | Variable<any, string>,
	s3key?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	size?: ValueTypes["Int_comparison_exp"] | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["timestamp_comparison_exp"] | undefined | null | Variable<any, string>,
	uploader?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>,
	uploaderId?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>
};
	/** unique or primary key constraints on table "Media" */
["Media_constraint"]:Media_constraint;
	/** input type for incrementing numeric columns in table "Media" */
["Media_inc_input"]: {
	size?: number | undefined | null | Variable<any, string>
};
	/** input type for inserting data into table "Media" */
["Media_insert_input"]: {
	bucketId?: string | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	etag?: string | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	name?: string | undefined | null | Variable<any, string>,
	project?: ValueTypes["ProjectMedia_arr_rel_insert_input"] | undefined | null | Variable<any, string>,
	s3key?: string | undefined | null | Variable<any, string>,
	size?: number | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	uploader?: ValueTypes["Account_obj_rel_insert_input"] | undefined | null | Variable<any, string>,
	uploaderId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>
};
	/** aggregate max on columns */
["Media_max_fields"]: AliasType<{
	bucketId?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	etag?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	s3key?:boolean | `@${string}`,
	size?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	uploaderId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate min on columns */
["Media_min_fields"]: AliasType<{
	bucketId?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	etag?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	s3key?:boolean | `@${string}`,
	size?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	uploaderId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** response of any mutation on the table "Media" */
["Media_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ValueTypes["Media"],
		__typename?: boolean | `@${string}`
}>;
	/** input type for inserting object relation for remote table "Media" */
["Media_obj_rel_insert_input"]: {
	data: ValueTypes["Media_insert_input"] | Variable<any, string>,
	/** upsert condition */
	on_conflict?: ValueTypes["Media_on_conflict"] | undefined | null | Variable<any, string>
};
	/** on_conflict condition type for table "Media" */
["Media_on_conflict"]: {
	constraint: ValueTypes["Media_constraint"] | Variable<any, string>,
	update_columns: Array<ValueTypes["Media_update_column"]> | Variable<any, string>,
	where?: ValueTypes["Media_bool_exp"] | undefined | null | Variable<any, string>
};
	/** Ordering options when selecting data from "Media". */
["Media_order_by"]: {
	bucketId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	etag?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	name?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	project_aggregate?: ValueTypes["ProjectMedia_aggregate_order_by"] | undefined | null | Variable<any, string>,
	s3key?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	size?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	uploader?: ValueTypes["Account_order_by"] | undefined | null | Variable<any, string>,
	uploaderId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** primary key columns input for table: Media */
["Media_pk_columns_input"]: {
	id: ValueTypes["uuid"] | Variable<any, string>
};
	/** select columns of table "Media" */
["Media_select_column"]:Media_select_column;
	/** input type for updating data in table "Media" */
["Media_set_input"]: {
	bucketId?: string | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	etag?: string | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	name?: string | undefined | null | Variable<any, string>,
	s3key?: string | undefined | null | Variable<any, string>,
	size?: number | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	uploaderId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>
};
	/** aggregate stddev on columns */
["Media_stddev_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate stddev_pop on columns */
["Media_stddev_pop_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate stddev_samp on columns */
["Media_stddev_samp_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** Streaming cursor of the table "Media" */
["Media_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ValueTypes["Media_stream_cursor_value_input"] | Variable<any, string>,
	/** cursor ordering */
	ordering?: ValueTypes["cursor_ordering"] | undefined | null | Variable<any, string>
};
	/** Initial value of the column from where the streaming should start */
["Media_stream_cursor_value_input"]: {
	bucketId?: string | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	etag?: string | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	name?: string | undefined | null | Variable<any, string>,
	s3key?: string | undefined | null | Variable<any, string>,
	size?: number | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	uploaderId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>
};
	/** aggregate sum on columns */
["Media_sum_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** update columns of table "Media" */
["Media_update_column"]:Media_update_column;
	["Media_updates"]: {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: ValueTypes["Media_inc_input"] | undefined | null | Variable<any, string>,
	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Media_set_input"] | undefined | null | Variable<any, string>,
	/** filter the rows which have to be updated */
	where: ValueTypes["Media_bool_exp"] | Variable<any, string>
};
	/** aggregate var_pop on columns */
["Media_var_pop_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate var_samp on columns */
["Media_var_samp_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate variance on columns */
["Media_variance_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** columns and relationships of "Profile" */
["Profile"]: AliasType<{
	accountId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	instagram?:boolean | `@${string}`,
	picture?:boolean | `@${string}`,
	twitter?:boolean | `@${string}`,
	website?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "Profile" */
["Profile_aggregate"]: AliasType<{
	aggregate?:ValueTypes["Profile_aggregate_fields"],
	nodes?:ValueTypes["Profile"],
		__typename?: boolean | `@${string}`
}>;
	["Profile_aggregate_bool_exp"]: {
	count?: ValueTypes["Profile_aggregate_bool_exp_count"] | undefined | null | Variable<any, string>
};
	["Profile_aggregate_bool_exp_count"]: {
	arguments?: Array<ValueTypes["Profile_select_column"]> | undefined | null | Variable<any, string>,
	distinct?: boolean | undefined | null | Variable<any, string>,
	filter?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>,
	predicate: ValueTypes["Int_comparison_exp"] | Variable<any, string>
};
	/** aggregate fields of "Profile" */
["Profile_aggregate_fields"]: AliasType<{
count?: [{	columns?: Array<ValueTypes["Profile_select_column"]> | undefined | null | Variable<any, string>,	distinct?: boolean | undefined | null | Variable<any, string>},boolean | `@${string}`],
	max?:ValueTypes["Profile_max_fields"],
	min?:ValueTypes["Profile_min_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** order by aggregate values of table "Profile" */
["Profile_aggregate_order_by"]: {
	count?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	max?: ValueTypes["Profile_max_order_by"] | undefined | null | Variable<any, string>,
	min?: ValueTypes["Profile_min_order_by"] | undefined | null | Variable<any, string>
};
	/** input type for inserting array relation for remote table "Profile" */
["Profile_arr_rel_insert_input"]: {
	data: Array<ValueTypes["Profile_insert_input"]> | Variable<any, string>,
	/** upsert condition */
	on_conflict?: ValueTypes["Profile_on_conflict"] | undefined | null | Variable<any, string>
};
	/** Boolean expression to filter rows from the table "Profile". All fields are combined with a logical 'AND'. */
["Profile_bool_exp"]: {
	_and?: Array<ValueTypes["Profile_bool_exp"]> | undefined | null | Variable<any, string>,
	_not?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>,
	_or?: Array<ValueTypes["Profile_bool_exp"]> | undefined | null | Variable<any, string>,
	accountId?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>,
	description?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	instagram?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	picture?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	twitter?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	website?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>
};
	/** unique or primary key constraints on table "Profile" */
["Profile_constraint"]:Profile_constraint;
	/** input type for inserting data into table "Profile" */
["Profile_insert_input"]: {
	accountId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	description?: string | undefined | null | Variable<any, string>,
	instagram?: string | undefined | null | Variable<any, string>,
	picture?: string | undefined | null | Variable<any, string>,
	twitter?: string | undefined | null | Variable<any, string>,
	website?: string | undefined | null | Variable<any, string>
};
	/** aggregate max on columns */
["Profile_max_fields"]: AliasType<{
	accountId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	instagram?:boolean | `@${string}`,
	picture?:boolean | `@${string}`,
	twitter?:boolean | `@${string}`,
	website?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by max() on columns of table "Profile" */
["Profile_max_order_by"]: {
	accountId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	description?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	instagram?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	picture?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	twitter?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	website?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** aggregate min on columns */
["Profile_min_fields"]: AliasType<{
	accountId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	instagram?:boolean | `@${string}`,
	picture?:boolean | `@${string}`,
	twitter?:boolean | `@${string}`,
	website?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by min() on columns of table "Profile" */
["Profile_min_order_by"]: {
	accountId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	description?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	instagram?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	picture?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	twitter?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	website?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** response of any mutation on the table "Profile" */
["Profile_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ValueTypes["Profile"],
		__typename?: boolean | `@${string}`
}>;
	/** on_conflict condition type for table "Profile" */
["Profile_on_conflict"]: {
	constraint: ValueTypes["Profile_constraint"] | Variable<any, string>,
	update_columns: Array<ValueTypes["Profile_update_column"]> | Variable<any, string>,
	where?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>
};
	/** Ordering options when selecting data from "Profile". */
["Profile_order_by"]: {
	accountId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	description?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	instagram?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	picture?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	twitter?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	website?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** primary key columns input for table: Profile */
["Profile_pk_columns_input"]: {
	accountId: ValueTypes["uuid"] | Variable<any, string>
};
	/** select columns of table "Profile" */
["Profile_select_column"]:Profile_select_column;
	/** input type for updating data in table "Profile" */
["Profile_set_input"]: {
	accountId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	description?: string | undefined | null | Variable<any, string>,
	instagram?: string | undefined | null | Variable<any, string>,
	picture?: string | undefined | null | Variable<any, string>,
	twitter?: string | undefined | null | Variable<any, string>,
	website?: string | undefined | null | Variable<any, string>
};
	/** Streaming cursor of the table "Profile" */
["Profile_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ValueTypes["Profile_stream_cursor_value_input"] | Variable<any, string>,
	/** cursor ordering */
	ordering?: ValueTypes["cursor_ordering"] | undefined | null | Variable<any, string>
};
	/** Initial value of the column from where the streaming should start */
["Profile_stream_cursor_value_input"]: {
	accountId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	description?: string | undefined | null | Variable<any, string>,
	instagram?: string | undefined | null | Variable<any, string>,
	picture?: string | undefined | null | Variable<any, string>,
	twitter?: string | undefined | null | Variable<any, string>,
	website?: string | undefined | null | Variable<any, string>
};
	/** update columns of table "Profile" */
["Profile_update_column"]:Profile_update_column;
	["Profile_updates"]: {
	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Profile_set_input"] | undefined | null | Variable<any, string>,
	/** filter the rows which have to be updated */
	where: ValueTypes["Profile_bool_exp"] | Variable<any, string>
};
	/** columns and relationships of "Project" */
["Project"]: AliasType<{
	/** An object relationship */
	author?:ValueTypes["Account"],
	authorId?:boolean | `@${string}`,
	blockchain?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	/** An object relationship */
	curator?:ValueTypes["Account"],
	curatorId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
pricing?: [{	/** JSON select path */
	path?: string | undefined | null | Variable<any, string>},boolean | `@${string}`],
projectMedias?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["ProjectMedia_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia"]],
projectMedias_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["ProjectMedia_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia_aggregate"]],
	releaseAt?:boolean | `@${string}`,
	state?:boolean | `@${string}`,
	storage?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** columns and relationships of "ProjectMedia" */
["ProjectMedia"]: AliasType<{
	index?:boolean | `@${string}`,
	/** An object relationship */
	media?:ValueTypes["Media"],
	mediaId?:boolean | `@${string}`,
	/** An object relationship */
	project?:ValueTypes["Project"],
	projectId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "ProjectMedia" */
["ProjectMedia_aggregate"]: AliasType<{
	aggregate?:ValueTypes["ProjectMedia_aggregate_fields"],
	nodes?:ValueTypes["ProjectMedia"],
		__typename?: boolean | `@${string}`
}>;
	["ProjectMedia_aggregate_bool_exp"]: {
	count?: ValueTypes["ProjectMedia_aggregate_bool_exp_count"] | undefined | null | Variable<any, string>
};
	["ProjectMedia_aggregate_bool_exp_count"]: {
	arguments?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,
	distinct?: boolean | undefined | null | Variable<any, string>,
	filter?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>,
	predicate: ValueTypes["Int_comparison_exp"] | Variable<any, string>
};
	/** aggregate fields of "ProjectMedia" */
["ProjectMedia_aggregate_fields"]: AliasType<{
	avg?:ValueTypes["ProjectMedia_avg_fields"],
count?: [{	columns?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,	distinct?: boolean | undefined | null | Variable<any, string>},boolean | `@${string}`],
	max?:ValueTypes["ProjectMedia_max_fields"],
	min?:ValueTypes["ProjectMedia_min_fields"],
	stddev?:ValueTypes["ProjectMedia_stddev_fields"],
	stddev_pop?:ValueTypes["ProjectMedia_stddev_pop_fields"],
	stddev_samp?:ValueTypes["ProjectMedia_stddev_samp_fields"],
	sum?:ValueTypes["ProjectMedia_sum_fields"],
	var_pop?:ValueTypes["ProjectMedia_var_pop_fields"],
	var_samp?:ValueTypes["ProjectMedia_var_samp_fields"],
	variance?:ValueTypes["ProjectMedia_variance_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** order by aggregate values of table "ProjectMedia" */
["ProjectMedia_aggregate_order_by"]: {
	avg?: ValueTypes["ProjectMedia_avg_order_by"] | undefined | null | Variable<any, string>,
	count?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	max?: ValueTypes["ProjectMedia_max_order_by"] | undefined | null | Variable<any, string>,
	min?: ValueTypes["ProjectMedia_min_order_by"] | undefined | null | Variable<any, string>,
	stddev?: ValueTypes["ProjectMedia_stddev_order_by"] | undefined | null | Variable<any, string>,
	stddev_pop?: ValueTypes["ProjectMedia_stddev_pop_order_by"] | undefined | null | Variable<any, string>,
	stddev_samp?: ValueTypes["ProjectMedia_stddev_samp_order_by"] | undefined | null | Variable<any, string>,
	sum?: ValueTypes["ProjectMedia_sum_order_by"] | undefined | null | Variable<any, string>,
	var_pop?: ValueTypes["ProjectMedia_var_pop_order_by"] | undefined | null | Variable<any, string>,
	var_samp?: ValueTypes["ProjectMedia_var_samp_order_by"] | undefined | null | Variable<any, string>,
	variance?: ValueTypes["ProjectMedia_variance_order_by"] | undefined | null | Variable<any, string>
};
	/** input type for inserting array relation for remote table "ProjectMedia" */
["ProjectMedia_arr_rel_insert_input"]: {
	data: Array<ValueTypes["ProjectMedia_insert_input"]> | Variable<any, string>,
	/** upsert condition */
	on_conflict?: ValueTypes["ProjectMedia_on_conflict"] | undefined | null | Variable<any, string>
};
	/** aggregate avg on columns */
["ProjectMedia_avg_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by avg() on columns of table "ProjectMedia" */
["ProjectMedia_avg_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** Boolean expression to filter rows from the table "ProjectMedia". All fields are combined with a logical 'AND'. */
["ProjectMedia_bool_exp"]: {
	_and?: Array<ValueTypes["ProjectMedia_bool_exp"]> | undefined | null | Variable<any, string>,
	_not?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>,
	_or?: Array<ValueTypes["ProjectMedia_bool_exp"]> | undefined | null | Variable<any, string>,
	index?: ValueTypes["smallint_comparison_exp"] | undefined | null | Variable<any, string>,
	media?: ValueTypes["Media_bool_exp"] | undefined | null | Variable<any, string>,
	mediaId?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>,
	project?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>,
	projectId?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>
};
	/** unique or primary key constraints on table "ProjectMedia" */
["ProjectMedia_constraint"]:ProjectMedia_constraint;
	/** input type for incrementing numeric columns in table "ProjectMedia" */
["ProjectMedia_inc_input"]: {
	index?: ValueTypes["smallint"] | undefined | null | Variable<any, string>
};
	/** input type for inserting data into table "ProjectMedia" */
["ProjectMedia_insert_input"]: {
	index?: ValueTypes["smallint"] | undefined | null | Variable<any, string>,
	media?: ValueTypes["Media_obj_rel_insert_input"] | undefined | null | Variable<any, string>,
	mediaId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	project?: ValueTypes["Project_obj_rel_insert_input"] | undefined | null | Variable<any, string>,
	projectId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>
};
	/** aggregate max on columns */
["ProjectMedia_max_fields"]: AliasType<{
	index?:boolean | `@${string}`,
	mediaId?:boolean | `@${string}`,
	projectId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by max() on columns of table "ProjectMedia" */
["ProjectMedia_max_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	mediaId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	projectId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** aggregate min on columns */
["ProjectMedia_min_fields"]: AliasType<{
	index?:boolean | `@${string}`,
	mediaId?:boolean | `@${string}`,
	projectId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by min() on columns of table "ProjectMedia" */
["ProjectMedia_min_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	mediaId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	projectId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** response of any mutation on the table "ProjectMedia" */
["ProjectMedia_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ValueTypes["ProjectMedia"],
		__typename?: boolean | `@${string}`
}>;
	/** on_conflict condition type for table "ProjectMedia" */
["ProjectMedia_on_conflict"]: {
	constraint: ValueTypes["ProjectMedia_constraint"] | Variable<any, string>,
	update_columns: Array<ValueTypes["ProjectMedia_update_column"]> | Variable<any, string>,
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>
};
	/** Ordering options when selecting data from "ProjectMedia". */
["ProjectMedia_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	media?: ValueTypes["Media_order_by"] | undefined | null | Variable<any, string>,
	mediaId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	project?: ValueTypes["Project_order_by"] | undefined | null | Variable<any, string>,
	projectId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** select columns of table "ProjectMedia" */
["ProjectMedia_select_column"]:ProjectMedia_select_column;
	/** input type for updating data in table "ProjectMedia" */
["ProjectMedia_set_input"]: {
	index?: ValueTypes["smallint"] | undefined | null | Variable<any, string>,
	mediaId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	projectId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>
};
	/** aggregate stddev on columns */
["ProjectMedia_stddev_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by stddev() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** aggregate stddev_pop on columns */
["ProjectMedia_stddev_pop_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by stddev_pop() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_pop_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** aggregate stddev_samp on columns */
["ProjectMedia_stddev_samp_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by stddev_samp() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_samp_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** Streaming cursor of the table "ProjectMedia" */
["ProjectMedia_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ValueTypes["ProjectMedia_stream_cursor_value_input"] | Variable<any, string>,
	/** cursor ordering */
	ordering?: ValueTypes["cursor_ordering"] | undefined | null | Variable<any, string>
};
	/** Initial value of the column from where the streaming should start */
["ProjectMedia_stream_cursor_value_input"]: {
	index?: ValueTypes["smallint"] | undefined | null | Variable<any, string>,
	mediaId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	projectId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>
};
	/** aggregate sum on columns */
["ProjectMedia_sum_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by sum() on columns of table "ProjectMedia" */
["ProjectMedia_sum_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** update columns of table "ProjectMedia" */
["ProjectMedia_update_column"]:ProjectMedia_update_column;
	["ProjectMedia_updates"]: {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: ValueTypes["ProjectMedia_inc_input"] | undefined | null | Variable<any, string>,
	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["ProjectMedia_set_input"] | undefined | null | Variable<any, string>,
	/** filter the rows which have to be updated */
	where: ValueTypes["ProjectMedia_bool_exp"] | Variable<any, string>
};
	/** aggregate var_pop on columns */
["ProjectMedia_var_pop_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by var_pop() on columns of table "ProjectMedia" */
["ProjectMedia_var_pop_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** aggregate var_samp on columns */
["ProjectMedia_var_samp_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by var_samp() on columns of table "ProjectMedia" */
["ProjectMedia_var_samp_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** aggregate variance on columns */
["ProjectMedia_variance_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by variance() on columns of table "ProjectMedia" */
["ProjectMedia_variance_order_by"]: {
	index?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	["ProjectState"]:unknown;
	/** Boolean expression to compare columns of type "ProjectState". All fields are combined with logical 'AND'. */
["ProjectState_comparison_exp"]: {
	_eq?: ValueTypes["ProjectState"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["ProjectState"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["ProjectState"] | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["ProjectState"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["ProjectState"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["ProjectState"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["ProjectState"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["ProjectState"]> | undefined | null | Variable<any, string>
};
	/** aggregated selection of "Project" */
["Project_aggregate"]: AliasType<{
	aggregate?:ValueTypes["Project_aggregate_fields"],
	nodes?:ValueTypes["Project"],
		__typename?: boolean | `@${string}`
}>;
	["Project_aggregate_bool_exp"]: {
	count?: ValueTypes["Project_aggregate_bool_exp_count"] | undefined | null | Variable<any, string>
};
	["Project_aggregate_bool_exp_count"]: {
	arguments?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,
	distinct?: boolean | undefined | null | Variable<any, string>,
	filter?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>,
	predicate: ValueTypes["Int_comparison_exp"] | Variable<any, string>
};
	/** aggregate fields of "Project" */
["Project_aggregate_fields"]: AliasType<{
count?: [{	columns?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,	distinct?: boolean | undefined | null | Variable<any, string>},boolean | `@${string}`],
	max?:ValueTypes["Project_max_fields"],
	min?:ValueTypes["Project_min_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** order by aggregate values of table "Project" */
["Project_aggregate_order_by"]: {
	count?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	max?: ValueTypes["Project_max_order_by"] | undefined | null | Variable<any, string>,
	min?: ValueTypes["Project_min_order_by"] | undefined | null | Variable<any, string>
};
	/** append existing jsonb value of filtered columns with new jsonb value */
["Project_append_input"]: {
	pricing?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>
};
	/** input type for inserting array relation for remote table "Project" */
["Project_arr_rel_insert_input"]: {
	data: Array<ValueTypes["Project_insert_input"]> | Variable<any, string>,
	/** upsert condition */
	on_conflict?: ValueTypes["Project_on_conflict"] | undefined | null | Variable<any, string>
};
	/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
["Project_bool_exp"]: {
	_and?: Array<ValueTypes["Project_bool_exp"]> | undefined | null | Variable<any, string>,
	_not?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>,
	_or?: Array<ValueTypes["Project_bool_exp"]> | undefined | null | Variable<any, string>,
	author?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>,
	authorId?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>,
	blockchain?: ValueTypes["BlockchainNetwork_comparison_exp"] | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["timestamp_comparison_exp"] | undefined | null | Variable<any, string>,
	curator?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>,
	curatorId?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>,
	description?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>,
	pricing?: ValueTypes["jsonb_comparison_exp"] | undefined | null | Variable<any, string>,
	projectMedias?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>,
	projectMedias_aggregate?: ValueTypes["ProjectMedia_aggregate_bool_exp"] | undefined | null | Variable<any, string>,
	releaseAt?: ValueTypes["timestamp_comparison_exp"] | undefined | null | Variable<any, string>,
	state?: ValueTypes["ProjectState_comparison_exp"] | undefined | null | Variable<any, string>,
	storage?: ValueTypes["Storage_comparison_exp"] | undefined | null | Variable<any, string>,
	title?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["timestamp_comparison_exp"] | undefined | null | Variable<any, string>
};
	/** unique or primary key constraints on table "Project" */
["Project_constraint"]:Project_constraint;
	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
["Project_delete_at_path_input"]: {
	pricing?: Array<string> | undefined | null | Variable<any, string>
};
	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
["Project_delete_elem_input"]: {
	pricing?: number | undefined | null | Variable<any, string>
};
	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
["Project_delete_key_input"]: {
	pricing?: string | undefined | null | Variable<any, string>
};
	/** input type for inserting data into table "Project" */
["Project_insert_input"]: {
	author?: ValueTypes["Account_obj_rel_insert_input"] | undefined | null | Variable<any, string>,
	authorId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	blockchain?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	curator?: ValueTypes["Account_obj_rel_insert_input"] | undefined | null | Variable<any, string>,
	curatorId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	description?: string | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	pricing?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	projectMedias?: ValueTypes["ProjectMedia_arr_rel_insert_input"] | undefined | null | Variable<any, string>,
	releaseAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	state?: ValueTypes["ProjectState"] | undefined | null | Variable<any, string>,
	storage?: ValueTypes["Storage"] | undefined | null | Variable<any, string>,
	title?: string | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>
};
	/** aggregate max on columns */
["Project_max_fields"]: AliasType<{
	authorId?:boolean | `@${string}`,
	blockchain?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	curatorId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	releaseAt?:boolean | `@${string}`,
	state?:boolean | `@${string}`,
	storage?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by max() on columns of table "Project" */
["Project_max_order_by"]: {
	authorId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	blockchain?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	curatorId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	description?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	releaseAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	state?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	storage?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	title?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** aggregate min on columns */
["Project_min_fields"]: AliasType<{
	authorId?:boolean | `@${string}`,
	blockchain?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	curatorId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	releaseAt?:boolean | `@${string}`,
	state?:boolean | `@${string}`,
	storage?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by min() on columns of table "Project" */
["Project_min_order_by"]: {
	authorId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	blockchain?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	curatorId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	description?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	releaseAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	state?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	storage?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	title?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** response of any mutation on the table "Project" */
["Project_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ValueTypes["Project"],
		__typename?: boolean | `@${string}`
}>;
	/** input type for inserting object relation for remote table "Project" */
["Project_obj_rel_insert_input"]: {
	data: ValueTypes["Project_insert_input"] | Variable<any, string>,
	/** upsert condition */
	on_conflict?: ValueTypes["Project_on_conflict"] | undefined | null | Variable<any, string>
};
	/** on_conflict condition type for table "Project" */
["Project_on_conflict"]: {
	constraint: ValueTypes["Project_constraint"] | Variable<any, string>,
	update_columns: Array<ValueTypes["Project_update_column"]> | Variable<any, string>,
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>
};
	/** Ordering options when selecting data from "Project". */
["Project_order_by"]: {
	author?: ValueTypes["Account_order_by"] | undefined | null | Variable<any, string>,
	authorId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	blockchain?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	curator?: ValueTypes["Account_order_by"] | undefined | null | Variable<any, string>,
	curatorId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	description?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	pricing?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	projectMedias_aggregate?: ValueTypes["ProjectMedia_aggregate_order_by"] | undefined | null | Variable<any, string>,
	releaseAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	state?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	storage?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	title?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** primary key columns input for table: Project */
["Project_pk_columns_input"]: {
	id: ValueTypes["uuid"] | Variable<any, string>
};
	/** prepend existing jsonb value of filtered columns with new jsonb value */
["Project_prepend_input"]: {
	pricing?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>
};
	/** select columns of table "Project" */
["Project_select_column"]:Project_select_column;
	/** input type for updating data in table "Project" */
["Project_set_input"]: {
	authorId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	blockchain?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	curatorId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	description?: string | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	pricing?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	releaseAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	state?: ValueTypes["ProjectState"] | undefined | null | Variable<any, string>,
	storage?: ValueTypes["Storage"] | undefined | null | Variable<any, string>,
	title?: string | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>
};
	/** Streaming cursor of the table "Project" */
["Project_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ValueTypes["Project_stream_cursor_value_input"] | Variable<any, string>,
	/** cursor ordering */
	ordering?: ValueTypes["cursor_ordering"] | undefined | null | Variable<any, string>
};
	/** Initial value of the column from where the streaming should start */
["Project_stream_cursor_value_input"]: {
	authorId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	blockchain?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>,
	createdAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	curatorId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	description?: string | undefined | null | Variable<any, string>,
	id?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	pricing?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	releaseAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	state?: ValueTypes["ProjectState"] | undefined | null | Variable<any, string>,
	storage?: ValueTypes["Storage"] | undefined | null | Variable<any, string>,
	title?: string | undefined | null | Variable<any, string>,
	updatedAt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>
};
	/** update columns of table "Project" */
["Project_update_column"]:Project_update_column;
	["Project_updates"]: {
	/** append existing jsonb value of filtered columns with new jsonb value */
	_append?: ValueTypes["Project_append_input"] | undefined | null | Variable<any, string>,
	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
	_delete_at_path?: ValueTypes["Project_delete_at_path_input"] | undefined | null | Variable<any, string>,
	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
	_delete_elem?: ValueTypes["Project_delete_elem_input"] | undefined | null | Variable<any, string>,
	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
	_delete_key?: ValueTypes["Project_delete_key_input"] | undefined | null | Variable<any, string>,
	/** prepend existing jsonb value of filtered columns with new jsonb value */
	_prepend?: ValueTypes["Project_prepend_input"] | undefined | null | Variable<any, string>,
	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Project_set_input"] | undefined | null | Variable<any, string>,
	/** filter the rows which have to be updated */
	where: ValueTypes["Project_bool_exp"] | Variable<any, string>
};
	["Storage"]:unknown;
	/** Boolean expression to compare columns of type "Storage". All fields are combined with logical 'AND'. */
["Storage_comparison_exp"]: {
	_eq?: ValueTypes["Storage"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["Storage"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["Storage"] | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["Storage"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["Storage"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["Storage"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["Storage"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["Storage"]> | undefined | null | Variable<any, string>
};
	/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
["String_comparison_exp"]: {
	_eq?: string | undefined | null | Variable<any, string>,
	_gt?: string | undefined | null | Variable<any, string>,
	_gte?: string | undefined | null | Variable<any, string>,
	/** does the column match the given case-insensitive pattern */
	_ilike?: string | undefined | null | Variable<any, string>,
	_in?: Array<string> | undefined | null | Variable<any, string>,
	/** does the column match the given POSIX regular expression, case insensitive */
	_iregex?: string | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	/** does the column match the given pattern */
	_like?: string | undefined | null | Variable<any, string>,
	_lt?: string | undefined | null | Variable<any, string>,
	_lte?: string | undefined | null | Variable<any, string>,
	_neq?: string | undefined | null | Variable<any, string>,
	/** does the column NOT match the given case-insensitive pattern */
	_nilike?: string | undefined | null | Variable<any, string>,
	_nin?: Array<string> | undefined | null | Variable<any, string>,
	/** does the column NOT match the given POSIX regular expression, case insensitive */
	_niregex?: string | undefined | null | Variable<any, string>,
	/** does the column NOT match the given pattern */
	_nlike?: string | undefined | null | Variable<any, string>,
	/** does the column NOT match the given POSIX regular expression, case sensitive */
	_nregex?: string | undefined | null | Variable<any, string>,
	/** does the column NOT match the given SQL regular expression */
	_nsimilar?: string | undefined | null | Variable<any, string>,
	/** does the column match the given POSIX regular expression, case sensitive */
	_regex?: string | undefined | null | Variable<any, string>,
	/** does the column match the given SQL regular expression */
	_similar?: string | undefined | null | Variable<any, string>
};
	/** columns and relationships of "Wallet" */
["Wallet"]: AliasType<{
	accountId?:boolean | `@${string}`,
	address?:boolean | `@${string}`,
	network?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "Wallet" */
["Wallet_aggregate"]: AliasType<{
	aggregate?:ValueTypes["Wallet_aggregate_fields"],
	nodes?:ValueTypes["Wallet"],
		__typename?: boolean | `@${string}`
}>;
	["Wallet_aggregate_bool_exp"]: {
	count?: ValueTypes["Wallet_aggregate_bool_exp_count"] | undefined | null | Variable<any, string>
};
	["Wallet_aggregate_bool_exp_count"]: {
	arguments?: Array<ValueTypes["Wallet_select_column"]> | undefined | null | Variable<any, string>,
	distinct?: boolean | undefined | null | Variable<any, string>,
	filter?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>,
	predicate: ValueTypes["Int_comparison_exp"] | Variable<any, string>
};
	/** aggregate fields of "Wallet" */
["Wallet_aggregate_fields"]: AliasType<{
count?: [{	columns?: Array<ValueTypes["Wallet_select_column"]> | undefined | null | Variable<any, string>,	distinct?: boolean | undefined | null | Variable<any, string>},boolean | `@${string}`],
	max?:ValueTypes["Wallet_max_fields"],
	min?:ValueTypes["Wallet_min_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** order by aggregate values of table "Wallet" */
["Wallet_aggregate_order_by"]: {
	count?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	max?: ValueTypes["Wallet_max_order_by"] | undefined | null | Variable<any, string>,
	min?: ValueTypes["Wallet_min_order_by"] | undefined | null | Variable<any, string>
};
	/** input type for inserting array relation for remote table "Wallet" */
["Wallet_arr_rel_insert_input"]: {
	data: Array<ValueTypes["Wallet_insert_input"]> | Variable<any, string>,
	/** upsert condition */
	on_conflict?: ValueTypes["Wallet_on_conflict"] | undefined | null | Variable<any, string>
};
	/** Boolean expression to filter rows from the table "Wallet". All fields are combined with a logical 'AND'. */
["Wallet_bool_exp"]: {
	_and?: Array<ValueTypes["Wallet_bool_exp"]> | undefined | null | Variable<any, string>,
	_not?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>,
	_or?: Array<ValueTypes["Wallet_bool_exp"]> | undefined | null | Variable<any, string>,
	accountId?: ValueTypes["uuid_comparison_exp"] | undefined | null | Variable<any, string>,
	address?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	network?: ValueTypes["BlockchainNetwork_comparison_exp"] | undefined | null | Variable<any, string>
};
	/** unique or primary key constraints on table "Wallet" */
["Wallet_constraint"]:Wallet_constraint;
	/** input type for inserting data into table "Wallet" */
["Wallet_insert_input"]: {
	accountId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	address?: string | undefined | null | Variable<any, string>,
	network?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>
};
	/** aggregate max on columns */
["Wallet_max_fields"]: AliasType<{
	accountId?:boolean | `@${string}`,
	address?:boolean | `@${string}`,
	network?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by max() on columns of table "Wallet" */
["Wallet_max_order_by"]: {
	accountId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	address?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	network?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** aggregate min on columns */
["Wallet_min_fields"]: AliasType<{
	accountId?:boolean | `@${string}`,
	address?:boolean | `@${string}`,
	network?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by min() on columns of table "Wallet" */
["Wallet_min_order_by"]: {
	accountId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	address?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	network?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** response of any mutation on the table "Wallet" */
["Wallet_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ValueTypes["Wallet"],
		__typename?: boolean | `@${string}`
}>;
	/** on_conflict condition type for table "Wallet" */
["Wallet_on_conflict"]: {
	constraint: ValueTypes["Wallet_constraint"] | Variable<any, string>,
	update_columns: Array<ValueTypes["Wallet_update_column"]> | Variable<any, string>,
	where?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>
};
	/** Ordering options when selecting data from "Wallet". */
["Wallet_order_by"]: {
	accountId?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	address?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	network?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** primary key columns input for table: Wallet */
["Wallet_pk_columns_input"]: {
	address: string | Variable<any, string>
};
	/** select columns of table "Wallet" */
["Wallet_select_column"]:Wallet_select_column;
	/** input type for updating data in table "Wallet" */
["Wallet_set_input"]: {
	accountId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	address?: string | undefined | null | Variable<any, string>,
	network?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>
};
	/** Streaming cursor of the table "Wallet" */
["Wallet_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ValueTypes["Wallet_stream_cursor_value_input"] | Variable<any, string>,
	/** cursor ordering */
	ordering?: ValueTypes["cursor_ordering"] | undefined | null | Variable<any, string>
};
	/** Initial value of the column from where the streaming should start */
["Wallet_stream_cursor_value_input"]: {
	accountId?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	address?: string | undefined | null | Variable<any, string>,
	network?: ValueTypes["BlockchainNetwork"] | undefined | null | Variable<any, string>
};
	/** update columns of table "Wallet" */
["Wallet_update_column"]:Wallet_update_column;
	["Wallet_updates"]: {
	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Wallet_set_input"] | undefined | null | Variable<any, string>,
	/** filter the rows which have to be updated */
	where: ValueTypes["Wallet_bool_exp"] | Variable<any, string>
};
	["_AccountRoles"]:unknown;
	/** Boolean expression to compare columns of type "_AccountRoles". All fields are combined with logical 'AND'. */
["_AccountRoles_comparison_exp"]: {
	_eq?: ValueTypes["_AccountRoles"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["_AccountRoles"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["_AccountRoles"] | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["_AccountRoles"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["_AccountRoles"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["_AccountRoles"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["_AccountRoles"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["_AccountRoles"]> | undefined | null | Variable<any, string>
};
	/** columns and relationships of "_prisma_migrations" */
["_prisma_migrations"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
	checksum?:boolean | `@${string}`,
	finished_at?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	logs?:boolean | `@${string}`,
	migration_name?:boolean | `@${string}`,
	rolled_back_at?:boolean | `@${string}`,
	started_at?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "_prisma_migrations" */
["_prisma_migrations_aggregate"]: AliasType<{
	aggregate?:ValueTypes["_prisma_migrations_aggregate_fields"],
	nodes?:ValueTypes["_prisma_migrations"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate fields of "_prisma_migrations" */
["_prisma_migrations_aggregate_fields"]: AliasType<{
	avg?:ValueTypes["_prisma_migrations_avg_fields"],
count?: [{	columns?: Array<ValueTypes["_prisma_migrations_select_column"]> | undefined | null | Variable<any, string>,	distinct?: boolean | undefined | null | Variable<any, string>},boolean | `@${string}`],
	max?:ValueTypes["_prisma_migrations_max_fields"],
	min?:ValueTypes["_prisma_migrations_min_fields"],
	stddev?:ValueTypes["_prisma_migrations_stddev_fields"],
	stddev_pop?:ValueTypes["_prisma_migrations_stddev_pop_fields"],
	stddev_samp?:ValueTypes["_prisma_migrations_stddev_samp_fields"],
	sum?:ValueTypes["_prisma_migrations_sum_fields"],
	var_pop?:ValueTypes["_prisma_migrations_var_pop_fields"],
	var_samp?:ValueTypes["_prisma_migrations_var_samp_fields"],
	variance?:ValueTypes["_prisma_migrations_variance_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate avg on columns */
["_prisma_migrations_avg_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** Boolean expression to filter rows from the table "_prisma_migrations". All fields are combined with a logical 'AND'. */
["_prisma_migrations_bool_exp"]: {
	_and?: Array<ValueTypes["_prisma_migrations_bool_exp"]> | undefined | null | Variable<any, string>,
	_not?: ValueTypes["_prisma_migrations_bool_exp"] | undefined | null | Variable<any, string>,
	_or?: Array<ValueTypes["_prisma_migrations_bool_exp"]> | undefined | null | Variable<any, string>,
	applied_steps_count?: ValueTypes["Int_comparison_exp"] | undefined | null | Variable<any, string>,
	checksum?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	finished_at?: ValueTypes["timestamptz_comparison_exp"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	logs?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	migration_name?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>,
	rolled_back_at?: ValueTypes["timestamptz_comparison_exp"] | undefined | null | Variable<any, string>,
	started_at?: ValueTypes["timestamptz_comparison_exp"] | undefined | null | Variable<any, string>
};
	/** unique or primary key constraints on table "_prisma_migrations" */
["_prisma_migrations_constraint"]:_prisma_migrations_constraint;
	/** input type for incrementing numeric columns in table "_prisma_migrations" */
["_prisma_migrations_inc_input"]: {
	applied_steps_count?: number | undefined | null | Variable<any, string>
};
	/** input type for inserting data into table "_prisma_migrations" */
["_prisma_migrations_insert_input"]: {
	applied_steps_count?: number | undefined | null | Variable<any, string>,
	checksum?: string | undefined | null | Variable<any, string>,
	finished_at?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	id?: string | undefined | null | Variable<any, string>,
	logs?: string | undefined | null | Variable<any, string>,
	migration_name?: string | undefined | null | Variable<any, string>,
	rolled_back_at?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	started_at?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>
};
	/** aggregate max on columns */
["_prisma_migrations_max_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
	checksum?:boolean | `@${string}`,
	finished_at?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	logs?:boolean | `@${string}`,
	migration_name?:boolean | `@${string}`,
	rolled_back_at?:boolean | `@${string}`,
	started_at?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate min on columns */
["_prisma_migrations_min_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
	checksum?:boolean | `@${string}`,
	finished_at?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	logs?:boolean | `@${string}`,
	migration_name?:boolean | `@${string}`,
	rolled_back_at?:boolean | `@${string}`,
	started_at?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** response of any mutation on the table "_prisma_migrations" */
["_prisma_migrations_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ValueTypes["_prisma_migrations"],
		__typename?: boolean | `@${string}`
}>;
	/** on_conflict condition type for table "_prisma_migrations" */
["_prisma_migrations_on_conflict"]: {
	constraint: ValueTypes["_prisma_migrations_constraint"] | Variable<any, string>,
	update_columns: Array<ValueTypes["_prisma_migrations_update_column"]> | Variable<any, string>,
	where?: ValueTypes["_prisma_migrations_bool_exp"] | undefined | null | Variable<any, string>
};
	/** Ordering options when selecting data from "_prisma_migrations". */
["_prisma_migrations_order_by"]: {
	applied_steps_count?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	checksum?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	finished_at?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	id?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	logs?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	migration_name?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	rolled_back_at?: ValueTypes["order_by"] | undefined | null | Variable<any, string>,
	started_at?: ValueTypes["order_by"] | undefined | null | Variable<any, string>
};
	/** primary key columns input for table: _prisma_migrations */
["_prisma_migrations_pk_columns_input"]: {
	id: string | Variable<any, string>
};
	/** select columns of table "_prisma_migrations" */
["_prisma_migrations_select_column"]:_prisma_migrations_select_column;
	/** input type for updating data in table "_prisma_migrations" */
["_prisma_migrations_set_input"]: {
	applied_steps_count?: number | undefined | null | Variable<any, string>,
	checksum?: string | undefined | null | Variable<any, string>,
	finished_at?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	id?: string | undefined | null | Variable<any, string>,
	logs?: string | undefined | null | Variable<any, string>,
	migration_name?: string | undefined | null | Variable<any, string>,
	rolled_back_at?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	started_at?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>
};
	/** aggregate stddev on columns */
["_prisma_migrations_stddev_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate stddev_pop on columns */
["_prisma_migrations_stddev_pop_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate stddev_samp on columns */
["_prisma_migrations_stddev_samp_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** Streaming cursor of the table "_prisma_migrations" */
["_prisma_migrations_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ValueTypes["_prisma_migrations_stream_cursor_value_input"] | Variable<any, string>,
	/** cursor ordering */
	ordering?: ValueTypes["cursor_ordering"] | undefined | null | Variable<any, string>
};
	/** Initial value of the column from where the streaming should start */
["_prisma_migrations_stream_cursor_value_input"]: {
	applied_steps_count?: number | undefined | null | Variable<any, string>,
	checksum?: string | undefined | null | Variable<any, string>,
	finished_at?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	id?: string | undefined | null | Variable<any, string>,
	logs?: string | undefined | null | Variable<any, string>,
	migration_name?: string | undefined | null | Variable<any, string>,
	rolled_back_at?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	started_at?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>
};
	/** aggregate sum on columns */
["_prisma_migrations_sum_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** update columns of table "_prisma_migrations" */
["_prisma_migrations_update_column"]:_prisma_migrations_update_column;
	["_prisma_migrations_updates"]: {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: ValueTypes["_prisma_migrations_inc_input"] | undefined | null | Variable<any, string>,
	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["_prisma_migrations_set_input"] | undefined | null | Variable<any, string>,
	/** filter the rows which have to be updated */
	where: ValueTypes["_prisma_migrations_bool_exp"] | Variable<any, string>
};
	/** aggregate var_pop on columns */
["_prisma_migrations_var_pop_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate var_samp on columns */
["_prisma_migrations_var_samp_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate variance on columns */
["_prisma_migrations_variance_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** ordering argument of a cursor */
["cursor_ordering"]:cursor_ordering;
	["jsonb"]:unknown;
	["jsonb_cast_exp"]: {
	String?: ValueTypes["String_comparison_exp"] | undefined | null | Variable<any, string>
};
	/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
["jsonb_comparison_exp"]: {
	_cast?: ValueTypes["jsonb_cast_exp"] | undefined | null | Variable<any, string>,
	/** is the column contained in the given json value */
	_contained_in?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	/** does the column contain the given json value at the top level */
	_contains?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	_eq?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	/** does the string exist as a top-level key in the column */
	_has_key?: string | undefined | null | Variable<any, string>,
	/** do all of these strings exist as top-level keys in the column */
	_has_keys_all?: Array<string> | undefined | null | Variable<any, string>,
	/** do any of these strings exist as top-level keys in the column */
	_has_keys_any?: Array<string> | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["jsonb"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["jsonb"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["jsonb"]> | undefined | null | Variable<any, string>
};
	/** mutation root */
["mutation_root"]: AliasType<{
delete_Account?: [{	/** filter the rows which have to be deleted */
	where: ValueTypes["Account_bool_exp"] | Variable<any, string>},ValueTypes["Account_mutation_response"]],
delete_Account_by_pk?: [{	id: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Account"]],
delete_Media?: [{	/** filter the rows which have to be deleted */
	where: ValueTypes["Media_bool_exp"] | Variable<any, string>},ValueTypes["Media_mutation_response"]],
delete_Media_by_pk?: [{	id: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Media"]],
delete_Profile?: [{	/** filter the rows which have to be deleted */
	where: ValueTypes["Profile_bool_exp"] | Variable<any, string>},ValueTypes["Profile_mutation_response"]],
delete_Profile_by_pk?: [{	accountId: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Profile"]],
delete_Project?: [{	/** filter the rows which have to be deleted */
	where: ValueTypes["Project_bool_exp"] | Variable<any, string>},ValueTypes["Project_mutation_response"]],
delete_ProjectMedia?: [{	/** filter the rows which have to be deleted */
	where: ValueTypes["ProjectMedia_bool_exp"] | Variable<any, string>},ValueTypes["ProjectMedia_mutation_response"]],
delete_Project_by_pk?: [{	id: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Project"]],
delete_Wallet?: [{	/** filter the rows which have to be deleted */
	where: ValueTypes["Wallet_bool_exp"] | Variable<any, string>},ValueTypes["Wallet_mutation_response"]],
delete_Wallet_by_pk?: [{	address: string | Variable<any, string>},ValueTypes["Wallet"]],
delete__prisma_migrations?: [{	/** filter the rows which have to be deleted */
	where: ValueTypes["_prisma_migrations_bool_exp"] | Variable<any, string>},ValueTypes["_prisma_migrations_mutation_response"]],
delete__prisma_migrations_by_pk?: [{	id: string | Variable<any, string>},ValueTypes["_prisma_migrations"]],
insert_Account?: [{	/** the rows to be inserted */
	objects: Array<ValueTypes["Account_insert_input"]> | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Account_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Account_mutation_response"]],
insert_Account_one?: [{	/** the row to be inserted */
	object: ValueTypes["Account_insert_input"] | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Account_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Account"]],
insert_Media?: [{	/** the rows to be inserted */
	objects: Array<ValueTypes["Media_insert_input"]> | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Media_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Media_mutation_response"]],
insert_Media_one?: [{	/** the row to be inserted */
	object: ValueTypes["Media_insert_input"] | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Media_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Media"]],
insert_Profile?: [{	/** the rows to be inserted */
	objects: Array<ValueTypes["Profile_insert_input"]> | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Profile_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Profile_mutation_response"]],
insert_Profile_one?: [{	/** the row to be inserted */
	object: ValueTypes["Profile_insert_input"] | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Profile_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Profile"]],
insert_Project?: [{	/** the rows to be inserted */
	objects: Array<ValueTypes["Project_insert_input"]> | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Project_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Project_mutation_response"]],
insert_ProjectMedia?: [{	/** the rows to be inserted */
	objects: Array<ValueTypes["ProjectMedia_insert_input"]> | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["ProjectMedia_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia_mutation_response"]],
insert_ProjectMedia_one?: [{	/** the row to be inserted */
	object: ValueTypes["ProjectMedia_insert_input"] | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["ProjectMedia_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia"]],
insert_Project_one?: [{	/** the row to be inserted */
	object: ValueTypes["Project_insert_input"] | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Project_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Project"]],
insert_Wallet?: [{	/** the rows to be inserted */
	objects: Array<ValueTypes["Wallet_insert_input"]> | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Wallet_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Wallet_mutation_response"]],
insert_Wallet_one?: [{	/** the row to be inserted */
	object: ValueTypes["Wallet_insert_input"] | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["Wallet_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["Wallet"]],
insert__prisma_migrations?: [{	/** the rows to be inserted */
	objects: Array<ValueTypes["_prisma_migrations_insert_input"]> | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["_prisma_migrations_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["_prisma_migrations_mutation_response"]],
insert__prisma_migrations_one?: [{	/** the row to be inserted */
	object: ValueTypes["_prisma_migrations_insert_input"] | Variable<any, string>,	/** upsert condition */
	on_conflict?: ValueTypes["_prisma_migrations_on_conflict"] | undefined | null | Variable<any, string>},ValueTypes["_prisma_migrations"]],
update_Account?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Account_set_input"] | undefined | null | Variable<any, string>,	/** filter the rows which have to be updated */
	where: ValueTypes["Account_bool_exp"] | Variable<any, string>},ValueTypes["Account_mutation_response"]],
update_Account_by_pk?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Account_set_input"] | undefined | null | Variable<any, string>,	pk_columns: ValueTypes["Account_pk_columns_input"] | Variable<any, string>},ValueTypes["Account"]],
update_Account_many?: [{	/** updates to execute, in order */
	updates: Array<ValueTypes["Account_updates"]> | Variable<any, string>},ValueTypes["Account_mutation_response"]],
update_Media?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ValueTypes["Media_inc_input"] | undefined | null | Variable<any, string>,	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Media_set_input"] | undefined | null | Variable<any, string>,	/** filter the rows which have to be updated */
	where: ValueTypes["Media_bool_exp"] | Variable<any, string>},ValueTypes["Media_mutation_response"]],
update_Media_by_pk?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ValueTypes["Media_inc_input"] | undefined | null | Variable<any, string>,	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Media_set_input"] | undefined | null | Variable<any, string>,	pk_columns: ValueTypes["Media_pk_columns_input"] | Variable<any, string>},ValueTypes["Media"]],
update_Media_many?: [{	/** updates to execute, in order */
	updates: Array<ValueTypes["Media_updates"]> | Variable<any, string>},ValueTypes["Media_mutation_response"]],
update_Profile?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Profile_set_input"] | undefined | null | Variable<any, string>,	/** filter the rows which have to be updated */
	where: ValueTypes["Profile_bool_exp"] | Variable<any, string>},ValueTypes["Profile_mutation_response"]],
update_Profile_by_pk?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Profile_set_input"] | undefined | null | Variable<any, string>,	pk_columns: ValueTypes["Profile_pk_columns_input"] | Variable<any, string>},ValueTypes["Profile"]],
update_Profile_many?: [{	/** updates to execute, in order */
	updates: Array<ValueTypes["Profile_updates"]> | Variable<any, string>},ValueTypes["Profile_mutation_response"]],
update_Project?: [{	/** append existing jsonb value of filtered columns with new jsonb value */
	_append?: ValueTypes["Project_append_input"] | undefined | null | Variable<any, string>,	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
	_delete_at_path?: ValueTypes["Project_delete_at_path_input"] | undefined | null | Variable<any, string>,	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
	_delete_elem?: ValueTypes["Project_delete_elem_input"] | undefined | null | Variable<any, string>,	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
	_delete_key?: ValueTypes["Project_delete_key_input"] | undefined | null | Variable<any, string>,	/** prepend existing jsonb value of filtered columns with new jsonb value */
	_prepend?: ValueTypes["Project_prepend_input"] | undefined | null | Variable<any, string>,	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Project_set_input"] | undefined | null | Variable<any, string>,	/** filter the rows which have to be updated */
	where: ValueTypes["Project_bool_exp"] | Variable<any, string>},ValueTypes["Project_mutation_response"]],
update_ProjectMedia?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ValueTypes["ProjectMedia_inc_input"] | undefined | null | Variable<any, string>,	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["ProjectMedia_set_input"] | undefined | null | Variable<any, string>,	/** filter the rows which have to be updated */
	where: ValueTypes["ProjectMedia_bool_exp"] | Variable<any, string>},ValueTypes["ProjectMedia_mutation_response"]],
update_ProjectMedia_many?: [{	/** updates to execute, in order */
	updates: Array<ValueTypes["ProjectMedia_updates"]> | Variable<any, string>},ValueTypes["ProjectMedia_mutation_response"]],
update_Project_by_pk?: [{	/** append existing jsonb value of filtered columns with new jsonb value */
	_append?: ValueTypes["Project_append_input"] | undefined | null | Variable<any, string>,	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
	_delete_at_path?: ValueTypes["Project_delete_at_path_input"] | undefined | null | Variable<any, string>,	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
	_delete_elem?: ValueTypes["Project_delete_elem_input"] | undefined | null | Variable<any, string>,	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
	_delete_key?: ValueTypes["Project_delete_key_input"] | undefined | null | Variable<any, string>,	/** prepend existing jsonb value of filtered columns with new jsonb value */
	_prepend?: ValueTypes["Project_prepend_input"] | undefined | null | Variable<any, string>,	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Project_set_input"] | undefined | null | Variable<any, string>,	pk_columns: ValueTypes["Project_pk_columns_input"] | Variable<any, string>},ValueTypes["Project"]],
update_Project_many?: [{	/** updates to execute, in order */
	updates: Array<ValueTypes["Project_updates"]> | Variable<any, string>},ValueTypes["Project_mutation_response"]],
update_Wallet?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Wallet_set_input"] | undefined | null | Variable<any, string>,	/** filter the rows which have to be updated */
	where: ValueTypes["Wallet_bool_exp"] | Variable<any, string>},ValueTypes["Wallet_mutation_response"]],
update_Wallet_by_pk?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["Wallet_set_input"] | undefined | null | Variable<any, string>,	pk_columns: ValueTypes["Wallet_pk_columns_input"] | Variable<any, string>},ValueTypes["Wallet"]],
update_Wallet_many?: [{	/** updates to execute, in order */
	updates: Array<ValueTypes["Wallet_updates"]> | Variable<any, string>},ValueTypes["Wallet_mutation_response"]],
update__prisma_migrations?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ValueTypes["_prisma_migrations_inc_input"] | undefined | null | Variable<any, string>,	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["_prisma_migrations_set_input"] | undefined | null | Variable<any, string>,	/** filter the rows which have to be updated */
	where: ValueTypes["_prisma_migrations_bool_exp"] | Variable<any, string>},ValueTypes["_prisma_migrations_mutation_response"]],
update__prisma_migrations_by_pk?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ValueTypes["_prisma_migrations_inc_input"] | undefined | null | Variable<any, string>,	/** sets the columns of the filtered rows to the given values */
	_set?: ValueTypes["_prisma_migrations_set_input"] | undefined | null | Variable<any, string>,	pk_columns: ValueTypes["_prisma_migrations_pk_columns_input"] | Variable<any, string>},ValueTypes["_prisma_migrations"]],
update__prisma_migrations_many?: [{	/** updates to execute, in order */
	updates: Array<ValueTypes["_prisma_migrations_updates"]> | Variable<any, string>},ValueTypes["_prisma_migrations_mutation_response"]],
		__typename?: boolean | `@${string}`
}>;
	/** column ordering options */
["order_by"]:order_by;
	["query_root"]: AliasType<{
Account?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Account_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Account_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Account"]],
Account_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Account_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Account_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Account_aggregate"]],
Account_by_pk?: [{	id: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Account"]],
Media?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Media_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Media_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Media_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Media"]],
Media_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Media_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Media_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Media_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Media_aggregate"]],
Media_by_pk?: [{	id: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Media"]],
Profile?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Profile_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Profile_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Profile"]],
Profile_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Profile_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Profile_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Profile_aggregate"]],
Profile_by_pk?: [{	accountId: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Profile"]],
Project?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Project_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Project"]],
ProjectMedia?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["ProjectMedia_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia"]],
ProjectMedia_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["ProjectMedia_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia_aggregate"]],
Project_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Project_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Project_aggregate"]],
Project_by_pk?: [{	id: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Project"]],
Wallet?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Wallet_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Wallet_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Wallet"]],
Wallet_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Wallet_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Wallet_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Wallet_aggregate"]],
Wallet_by_pk?: [{	address: string | Variable<any, string>},ValueTypes["Wallet"]],
_prisma_migrations?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["_prisma_migrations_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["_prisma_migrations_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["_prisma_migrations_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["_prisma_migrations"]],
_prisma_migrations_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["_prisma_migrations_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["_prisma_migrations_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["_prisma_migrations_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["_prisma_migrations_aggregate"]],
_prisma_migrations_by_pk?: [{	id: string | Variable<any, string>},ValueTypes["_prisma_migrations"]],
mediaFullUrl?: [{	s3key: string | Variable<any, string>},boolean | `@${string}`],
		__typename?: boolean | `@${string}`
}>;
	["smallint"]:unknown;
	/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
["smallint_comparison_exp"]: {
	_eq?: ValueTypes["smallint"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["smallint"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["smallint"] | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["smallint"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["smallint"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["smallint"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["smallint"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["smallint"]> | undefined | null | Variable<any, string>
};
	["subscription_root"]: AliasType<{
Account?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Account_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Account_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Account"]],
Account_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Account_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Account_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Account_aggregate"]],
Account_by_pk?: [{	id: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Account"]],
Account_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number | Variable<any, string>,	/** cursor to stream the results returned by the query */
	cursor: Array<ValueTypes["Account_stream_cursor_input"] | undefined | null> | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Account_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Account"]],
Media?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Media_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Media_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Media_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Media"]],
Media_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Media_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Media_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Media_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Media_aggregate"]],
Media_by_pk?: [{	id: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Media"]],
Media_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number | Variable<any, string>,	/** cursor to stream the results returned by the query */
	cursor: Array<ValueTypes["Media_stream_cursor_input"] | undefined | null> | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Media_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Media"]],
Profile?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Profile_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Profile_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Profile"]],
Profile_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Profile_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Profile_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Profile_aggregate"]],
Profile_by_pk?: [{	accountId: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Profile"]],
Profile_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number | Variable<any, string>,	/** cursor to stream the results returned by the query */
	cursor: Array<ValueTypes["Profile_stream_cursor_input"] | undefined | null> | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Profile_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Profile"]],
Project?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Project_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Project"]],
ProjectMedia?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["ProjectMedia_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia"]],
ProjectMedia_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["ProjectMedia_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["ProjectMedia_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia_aggregate"]],
ProjectMedia_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number | Variable<any, string>,	/** cursor to stream the results returned by the query */
	cursor: Array<ValueTypes["ProjectMedia_stream_cursor_input"] | undefined | null> | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["ProjectMedia_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["ProjectMedia"]],
Project_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Project_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Project_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Project_aggregate"]],
Project_by_pk?: [{	id: ValueTypes["uuid"] | Variable<any, string>},ValueTypes["Project"]],
Project_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number | Variable<any, string>,	/** cursor to stream the results returned by the query */
	cursor: Array<ValueTypes["Project_stream_cursor_input"] | undefined | null> | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Project_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Project"]],
Wallet?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Wallet_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Wallet_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Wallet"]],
Wallet_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["Wallet_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["Wallet_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Wallet_aggregate"]],
Wallet_by_pk?: [{	address: string | Variable<any, string>},ValueTypes["Wallet"]],
Wallet_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number | Variable<any, string>,	/** cursor to stream the results returned by the query */
	cursor: Array<ValueTypes["Wallet_stream_cursor_input"] | undefined | null> | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["Wallet_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["Wallet"]],
_prisma_migrations?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["_prisma_migrations_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["_prisma_migrations_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["_prisma_migrations_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["_prisma_migrations"]],
_prisma_migrations_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ValueTypes["_prisma_migrations_select_column"]> | undefined | null | Variable<any, string>,	/** limit the number of rows returned */
	limit?: number | undefined | null | Variable<any, string>,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null | Variable<any, string>,	/** sort the rows by one or more columns */
	order_by?: Array<ValueTypes["_prisma_migrations_order_by"]> | undefined | null | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["_prisma_migrations_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["_prisma_migrations_aggregate"]],
_prisma_migrations_by_pk?: [{	id: string | Variable<any, string>},ValueTypes["_prisma_migrations"]],
_prisma_migrations_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number | Variable<any, string>,	/** cursor to stream the results returned by the query */
	cursor: Array<ValueTypes["_prisma_migrations_stream_cursor_input"] | undefined | null> | Variable<any, string>,	/** filter the rows returned */
	where?: ValueTypes["_prisma_migrations_bool_exp"] | undefined | null | Variable<any, string>},ValueTypes["_prisma_migrations"]],
		__typename?: boolean | `@${string}`
}>;
	["timestamp"]:unknown;
	/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
["timestamp_comparison_exp"]: {
	_eq?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["timestamp"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["timestamp"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["timestamp"]> | undefined | null | Variable<any, string>
};
	["timestamptz"]:unknown;
	/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
["timestamptz_comparison_exp"]: {
	_eq?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["timestamptz"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["timestamptz"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["timestamptz"]> | undefined | null | Variable<any, string>
};
	["uuid"]:unknown;
	/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
["uuid_comparison_exp"]: {
	_eq?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	_gt?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	_gte?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	_in?: Array<ValueTypes["uuid"]> | undefined | null | Variable<any, string>,
	_is_null?: boolean | undefined | null | Variable<any, string>,
	_lt?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	_lte?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	_neq?: ValueTypes["uuid"] | undefined | null | Variable<any, string>,
	_nin?: Array<ValueTypes["uuid"]> | undefined | null | Variable<any, string>
}
  }

export type ResolverInputTypes = {
    ["schema"]: AliasType<{
	query?:ResolverInputTypes["query_root"],
	mutation?:ResolverInputTypes["mutation_root"],
	subscription?:ResolverInputTypes["subscription_root"],
		__typename?: boolean | `@${string}`
}>;
	/** columns and relationships of "Account" */
["Account"]: AliasType<{
authoredProjects?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Project_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null},ResolverInputTypes["Project"]],
authoredProjects_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Project_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null},ResolverInputTypes["Project_aggregate"]],
curatedProjects?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Project_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null},ResolverInputTypes["Project"]],
curatedProjects_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Project_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null},ResolverInputTypes["Project_aggregate"]],
	id?:boolean | `@${string}`,
profile?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Profile_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Profile_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Profile_bool_exp"] | undefined | null},ResolverInputTypes["Profile"]],
profile_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Profile_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Profile_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Profile_bool_exp"] | undefined | null},ResolverInputTypes["Profile_aggregate"]],
	roles?:boolean | `@${string}`,
	status?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
wallets?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Wallet_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Wallet_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null},ResolverInputTypes["Wallet"]],
wallets_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Wallet_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Wallet_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null},ResolverInputTypes["Wallet_aggregate"]],
		__typename?: boolean | `@${string}`
}>;
	["AccountStatus"]:unknown;
	/** Boolean expression to compare columns of type "AccountStatus". All fields are combined with logical 'AND'. */
["AccountStatus_comparison_exp"]: {
	_eq?: ResolverInputTypes["AccountStatus"] | undefined | null,
	_gt?: ResolverInputTypes["AccountStatus"] | undefined | null,
	_gte?: ResolverInputTypes["AccountStatus"] | undefined | null,
	_in?: Array<ResolverInputTypes["AccountStatus"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["AccountStatus"] | undefined | null,
	_lte?: ResolverInputTypes["AccountStatus"] | undefined | null,
	_neq?: ResolverInputTypes["AccountStatus"] | undefined | null,
	_nin?: Array<ResolverInputTypes["AccountStatus"]> | undefined | null
};
	/** aggregated selection of "Account" */
["Account_aggregate"]: AliasType<{
	aggregate?:ResolverInputTypes["Account_aggregate_fields"],
	nodes?:ResolverInputTypes["Account"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate fields of "Account" */
["Account_aggregate_fields"]: AliasType<{
count?: [{	columns?: Array<ResolverInputTypes["Account_select_column"]> | undefined | null,	distinct?: boolean | undefined | null},boolean | `@${string}`],
	max?:ResolverInputTypes["Account_max_fields"],
	min?:ResolverInputTypes["Account_min_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
["Account_bool_exp"]: {
	_and?: Array<ResolverInputTypes["Account_bool_exp"]> | undefined | null,
	_not?: ResolverInputTypes["Account_bool_exp"] | undefined | null,
	_or?: Array<ResolverInputTypes["Account_bool_exp"]> | undefined | null,
	authoredProjects?: ResolverInputTypes["Project_bool_exp"] | undefined | null,
	authoredProjects_aggregate?: ResolverInputTypes["Project_aggregate_bool_exp"] | undefined | null,
	curatedProjects?: ResolverInputTypes["Project_bool_exp"] | undefined | null,
	curatedProjects_aggregate?: ResolverInputTypes["Project_aggregate_bool_exp"] | undefined | null,
	id?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null,
	profile?: ResolverInputTypes["Profile_bool_exp"] | undefined | null,
	profile_aggregate?: ResolverInputTypes["Profile_aggregate_bool_exp"] | undefined | null,
	roles?: ResolverInputTypes["_AccountRoles_comparison_exp"] | undefined | null,
	status?: ResolverInputTypes["AccountStatus_comparison_exp"] | undefined | null,
	username?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	wallets?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null,
	wallets_aggregate?: ResolverInputTypes["Wallet_aggregate_bool_exp"] | undefined | null
};
	/** unique or primary key constraints on table "Account" */
["Account_constraint"]:Account_constraint;
	/** input type for inserting data into table "Account" */
["Account_insert_input"]: {
	authoredProjects?: ResolverInputTypes["Project_arr_rel_insert_input"] | undefined | null,
	curatedProjects?: ResolverInputTypes["Project_arr_rel_insert_input"] | undefined | null,
	id?: ResolverInputTypes["uuid"] | undefined | null,
	profile?: ResolverInputTypes["Profile_arr_rel_insert_input"] | undefined | null,
	roles?: ResolverInputTypes["_AccountRoles"] | undefined | null,
	status?: ResolverInputTypes["AccountStatus"] | undefined | null,
	username?: string | undefined | null,
	wallets?: ResolverInputTypes["Wallet_arr_rel_insert_input"] | undefined | null
};
	/** aggregate max on columns */
["Account_max_fields"]: AliasType<{
	id?:boolean | `@${string}`,
	status?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate min on columns */
["Account_min_fields"]: AliasType<{
	id?:boolean | `@${string}`,
	status?:boolean | `@${string}`,
	username?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** response of any mutation on the table "Account" */
["Account_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ResolverInputTypes["Account"],
		__typename?: boolean | `@${string}`
}>;
	/** input type for inserting object relation for remote table "Account" */
["Account_obj_rel_insert_input"]: {
	data: ResolverInputTypes["Account_insert_input"],
	/** upsert condition */
	on_conflict?: ResolverInputTypes["Account_on_conflict"] | undefined | null
};
	/** on_conflict condition type for table "Account" */
["Account_on_conflict"]: {
	constraint: ResolverInputTypes["Account_constraint"],
	update_columns: Array<ResolverInputTypes["Account_update_column"]>,
	where?: ResolverInputTypes["Account_bool_exp"] | undefined | null
};
	/** Ordering options when selecting data from "Account". */
["Account_order_by"]: {
	authoredProjects_aggregate?: ResolverInputTypes["Project_aggregate_order_by"] | undefined | null,
	curatedProjects_aggregate?: ResolverInputTypes["Project_aggregate_order_by"] | undefined | null,
	id?: ResolverInputTypes["order_by"] | undefined | null,
	profile_aggregate?: ResolverInputTypes["Profile_aggregate_order_by"] | undefined | null,
	roles?: ResolverInputTypes["order_by"] | undefined | null,
	status?: ResolverInputTypes["order_by"] | undefined | null,
	username?: ResolverInputTypes["order_by"] | undefined | null,
	wallets_aggregate?: ResolverInputTypes["Wallet_aggregate_order_by"] | undefined | null
};
	/** primary key columns input for table: Account */
["Account_pk_columns_input"]: {
	id: ResolverInputTypes["uuid"]
};
	/** select columns of table "Account" */
["Account_select_column"]:Account_select_column;
	/** input type for updating data in table "Account" */
["Account_set_input"]: {
	id?: ResolverInputTypes["uuid"] | undefined | null,
	roles?: ResolverInputTypes["_AccountRoles"] | undefined | null,
	status?: ResolverInputTypes["AccountStatus"] | undefined | null,
	username?: string | undefined | null
};
	/** Streaming cursor of the table "Account" */
["Account_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ResolverInputTypes["Account_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ResolverInputTypes["cursor_ordering"] | undefined | null
};
	/** Initial value of the column from where the streaming should start */
["Account_stream_cursor_value_input"]: {
	id?: ResolverInputTypes["uuid"] | undefined | null,
	roles?: ResolverInputTypes["_AccountRoles"] | undefined | null,
	status?: ResolverInputTypes["AccountStatus"] | undefined | null,
	username?: string | undefined | null
};
	/** update columns of table "Account" */
["Account_update_column"]:Account_update_column;
	["Account_updates"]: {
	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Account_set_input"] | undefined | null,
	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Account_bool_exp"]
};
	["BlockchainNetwork"]:unknown;
	/** Boolean expression to compare columns of type "BlockchainNetwork". All fields are combined with logical 'AND'. */
["BlockchainNetwork_comparison_exp"]: {
	_eq?: ResolverInputTypes["BlockchainNetwork"] | undefined | null,
	_gt?: ResolverInputTypes["BlockchainNetwork"] | undefined | null,
	_gte?: ResolverInputTypes["BlockchainNetwork"] | undefined | null,
	_in?: Array<ResolverInputTypes["BlockchainNetwork"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["BlockchainNetwork"] | undefined | null,
	_lte?: ResolverInputTypes["BlockchainNetwork"] | undefined | null,
	_neq?: ResolverInputTypes["BlockchainNetwork"] | undefined | null,
	_nin?: Array<ResolverInputTypes["BlockchainNetwork"]> | undefined | null
};
	/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
["Int_comparison_exp"]: {
	_eq?: number | undefined | null,
	_gt?: number | undefined | null,
	_gte?: number | undefined | null,
	_in?: Array<number> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: number | undefined | null,
	_lte?: number | undefined | null,
	_neq?: number | undefined | null,
	_nin?: Array<number> | undefined | null
};
	/** columns and relationships of "Media" */
["Media"]: AliasType<{
	bucketId?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	etag?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
project?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["ProjectMedia_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null},ResolverInputTypes["ProjectMedia"]],
project_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["ProjectMedia_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null},ResolverInputTypes["ProjectMedia_aggregate"]],
	s3key?:boolean | `@${string}`,
	size?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	/** An object relationship */
	uploader?:ResolverInputTypes["Account"],
	uploaderId?:boolean | `@${string}`,
	url?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "Media" */
["Media_aggregate"]: AliasType<{
	aggregate?:ResolverInputTypes["Media_aggregate_fields"],
	nodes?:ResolverInputTypes["Media"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate fields of "Media" */
["Media_aggregate_fields"]: AliasType<{
	avg?:ResolverInputTypes["Media_avg_fields"],
count?: [{	columns?: Array<ResolverInputTypes["Media_select_column"]> | undefined | null,	distinct?: boolean | undefined | null},boolean | `@${string}`],
	max?:ResolverInputTypes["Media_max_fields"],
	min?:ResolverInputTypes["Media_min_fields"],
	stddev?:ResolverInputTypes["Media_stddev_fields"],
	stddev_pop?:ResolverInputTypes["Media_stddev_pop_fields"],
	stddev_samp?:ResolverInputTypes["Media_stddev_samp_fields"],
	sum?:ResolverInputTypes["Media_sum_fields"],
	var_pop?:ResolverInputTypes["Media_var_pop_fields"],
	var_samp?:ResolverInputTypes["Media_var_samp_fields"],
	variance?:ResolverInputTypes["Media_variance_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate avg on columns */
["Media_avg_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** Boolean expression to filter rows from the table "Media". All fields are combined with a logical 'AND'. */
["Media_bool_exp"]: {
	_and?: Array<ResolverInputTypes["Media_bool_exp"]> | undefined | null,
	_not?: ResolverInputTypes["Media_bool_exp"] | undefined | null,
	_or?: Array<ResolverInputTypes["Media_bool_exp"]> | undefined | null,
	bucketId?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	createdAt?: ResolverInputTypes["timestamp_comparison_exp"] | undefined | null,
	etag?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	id?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null,
	name?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	project?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null,
	project_aggregate?: ResolverInputTypes["ProjectMedia_aggregate_bool_exp"] | undefined | null,
	s3key?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	size?: ResolverInputTypes["Int_comparison_exp"] | undefined | null,
	updatedAt?: ResolverInputTypes["timestamp_comparison_exp"] | undefined | null,
	uploader?: ResolverInputTypes["Account_bool_exp"] | undefined | null,
	uploaderId?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null
};
	/** unique or primary key constraints on table "Media" */
["Media_constraint"]:Media_constraint;
	/** input type for incrementing numeric columns in table "Media" */
["Media_inc_input"]: {
	size?: number | undefined | null
};
	/** input type for inserting data into table "Media" */
["Media_insert_input"]: {
	bucketId?: string | undefined | null,
	createdAt?: ResolverInputTypes["timestamp"] | undefined | null,
	etag?: string | undefined | null,
	id?: ResolverInputTypes["uuid"] | undefined | null,
	name?: string | undefined | null,
	project?: ResolverInputTypes["ProjectMedia_arr_rel_insert_input"] | undefined | null,
	s3key?: string | undefined | null,
	size?: number | undefined | null,
	updatedAt?: ResolverInputTypes["timestamp"] | undefined | null,
	uploader?: ResolverInputTypes["Account_obj_rel_insert_input"] | undefined | null,
	uploaderId?: ResolverInputTypes["uuid"] | undefined | null
};
	/** aggregate max on columns */
["Media_max_fields"]: AliasType<{
	bucketId?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	etag?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	s3key?:boolean | `@${string}`,
	size?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	uploaderId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate min on columns */
["Media_min_fields"]: AliasType<{
	bucketId?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	etag?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	name?:boolean | `@${string}`,
	s3key?:boolean | `@${string}`,
	size?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
	uploaderId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** response of any mutation on the table "Media" */
["Media_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ResolverInputTypes["Media"],
		__typename?: boolean | `@${string}`
}>;
	/** input type for inserting object relation for remote table "Media" */
["Media_obj_rel_insert_input"]: {
	data: ResolverInputTypes["Media_insert_input"],
	/** upsert condition */
	on_conflict?: ResolverInputTypes["Media_on_conflict"] | undefined | null
};
	/** on_conflict condition type for table "Media" */
["Media_on_conflict"]: {
	constraint: ResolverInputTypes["Media_constraint"],
	update_columns: Array<ResolverInputTypes["Media_update_column"]>,
	where?: ResolverInputTypes["Media_bool_exp"] | undefined | null
};
	/** Ordering options when selecting data from "Media". */
["Media_order_by"]: {
	bucketId?: ResolverInputTypes["order_by"] | undefined | null,
	createdAt?: ResolverInputTypes["order_by"] | undefined | null,
	etag?: ResolverInputTypes["order_by"] | undefined | null,
	id?: ResolverInputTypes["order_by"] | undefined | null,
	name?: ResolverInputTypes["order_by"] | undefined | null,
	project_aggregate?: ResolverInputTypes["ProjectMedia_aggregate_order_by"] | undefined | null,
	s3key?: ResolverInputTypes["order_by"] | undefined | null,
	size?: ResolverInputTypes["order_by"] | undefined | null,
	updatedAt?: ResolverInputTypes["order_by"] | undefined | null,
	uploader?: ResolverInputTypes["Account_order_by"] | undefined | null,
	uploaderId?: ResolverInputTypes["order_by"] | undefined | null
};
	/** primary key columns input for table: Media */
["Media_pk_columns_input"]: {
	id: ResolverInputTypes["uuid"]
};
	/** select columns of table "Media" */
["Media_select_column"]:Media_select_column;
	/** input type for updating data in table "Media" */
["Media_set_input"]: {
	bucketId?: string | undefined | null,
	createdAt?: ResolverInputTypes["timestamp"] | undefined | null,
	etag?: string | undefined | null,
	id?: ResolverInputTypes["uuid"] | undefined | null,
	name?: string | undefined | null,
	s3key?: string | undefined | null,
	size?: number | undefined | null,
	updatedAt?: ResolverInputTypes["timestamp"] | undefined | null,
	uploaderId?: ResolverInputTypes["uuid"] | undefined | null
};
	/** aggregate stddev on columns */
["Media_stddev_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate stddev_pop on columns */
["Media_stddev_pop_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate stddev_samp on columns */
["Media_stddev_samp_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** Streaming cursor of the table "Media" */
["Media_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ResolverInputTypes["Media_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ResolverInputTypes["cursor_ordering"] | undefined | null
};
	/** Initial value of the column from where the streaming should start */
["Media_stream_cursor_value_input"]: {
	bucketId?: string | undefined | null,
	createdAt?: ResolverInputTypes["timestamp"] | undefined | null,
	etag?: string | undefined | null,
	id?: ResolverInputTypes["uuid"] | undefined | null,
	name?: string | undefined | null,
	s3key?: string | undefined | null,
	size?: number | undefined | null,
	updatedAt?: ResolverInputTypes["timestamp"] | undefined | null,
	uploaderId?: ResolverInputTypes["uuid"] | undefined | null
};
	/** aggregate sum on columns */
["Media_sum_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** update columns of table "Media" */
["Media_update_column"]:Media_update_column;
	["Media_updates"]: {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: ResolverInputTypes["Media_inc_input"] | undefined | null,
	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Media_set_input"] | undefined | null,
	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Media_bool_exp"]
};
	/** aggregate var_pop on columns */
["Media_var_pop_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate var_samp on columns */
["Media_var_samp_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate variance on columns */
["Media_variance_fields"]: AliasType<{
	size?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** columns and relationships of "Profile" */
["Profile"]: AliasType<{
	accountId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	instagram?:boolean | `@${string}`,
	picture?:boolean | `@${string}`,
	twitter?:boolean | `@${string}`,
	website?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "Profile" */
["Profile_aggregate"]: AliasType<{
	aggregate?:ResolverInputTypes["Profile_aggregate_fields"],
	nodes?:ResolverInputTypes["Profile"],
		__typename?: boolean | `@${string}`
}>;
	["Profile_aggregate_bool_exp"]: {
	count?: ResolverInputTypes["Profile_aggregate_bool_exp_count"] | undefined | null
};
	["Profile_aggregate_bool_exp_count"]: {
	arguments?: Array<ResolverInputTypes["Profile_select_column"]> | undefined | null,
	distinct?: boolean | undefined | null,
	filter?: ResolverInputTypes["Profile_bool_exp"] | undefined | null,
	predicate: ResolverInputTypes["Int_comparison_exp"]
};
	/** aggregate fields of "Profile" */
["Profile_aggregate_fields"]: AliasType<{
count?: [{	columns?: Array<ResolverInputTypes["Profile_select_column"]> | undefined | null,	distinct?: boolean | undefined | null},boolean | `@${string}`],
	max?:ResolverInputTypes["Profile_max_fields"],
	min?:ResolverInputTypes["Profile_min_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** order by aggregate values of table "Profile" */
["Profile_aggregate_order_by"]: {
	count?: ResolverInputTypes["order_by"] | undefined | null,
	max?: ResolverInputTypes["Profile_max_order_by"] | undefined | null,
	min?: ResolverInputTypes["Profile_min_order_by"] | undefined | null
};
	/** input type for inserting array relation for remote table "Profile" */
["Profile_arr_rel_insert_input"]: {
	data: Array<ResolverInputTypes["Profile_insert_input"]>,
	/** upsert condition */
	on_conflict?: ResolverInputTypes["Profile_on_conflict"] | undefined | null
};
	/** Boolean expression to filter rows from the table "Profile". All fields are combined with a logical 'AND'. */
["Profile_bool_exp"]: {
	_and?: Array<ResolverInputTypes["Profile_bool_exp"]> | undefined | null,
	_not?: ResolverInputTypes["Profile_bool_exp"] | undefined | null,
	_or?: Array<ResolverInputTypes["Profile_bool_exp"]> | undefined | null,
	accountId?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null,
	description?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	instagram?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	picture?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	twitter?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	website?: ResolverInputTypes["String_comparison_exp"] | undefined | null
};
	/** unique or primary key constraints on table "Profile" */
["Profile_constraint"]:Profile_constraint;
	/** input type for inserting data into table "Profile" */
["Profile_insert_input"]: {
	accountId?: ResolverInputTypes["uuid"] | undefined | null,
	description?: string | undefined | null,
	instagram?: string | undefined | null,
	picture?: string | undefined | null,
	twitter?: string | undefined | null,
	website?: string | undefined | null
};
	/** aggregate max on columns */
["Profile_max_fields"]: AliasType<{
	accountId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	instagram?:boolean | `@${string}`,
	picture?:boolean | `@${string}`,
	twitter?:boolean | `@${string}`,
	website?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by max() on columns of table "Profile" */
["Profile_max_order_by"]: {
	accountId?: ResolverInputTypes["order_by"] | undefined | null,
	description?: ResolverInputTypes["order_by"] | undefined | null,
	instagram?: ResolverInputTypes["order_by"] | undefined | null,
	picture?: ResolverInputTypes["order_by"] | undefined | null,
	twitter?: ResolverInputTypes["order_by"] | undefined | null,
	website?: ResolverInputTypes["order_by"] | undefined | null
};
	/** aggregate min on columns */
["Profile_min_fields"]: AliasType<{
	accountId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	instagram?:boolean | `@${string}`,
	picture?:boolean | `@${string}`,
	twitter?:boolean | `@${string}`,
	website?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by min() on columns of table "Profile" */
["Profile_min_order_by"]: {
	accountId?: ResolverInputTypes["order_by"] | undefined | null,
	description?: ResolverInputTypes["order_by"] | undefined | null,
	instagram?: ResolverInputTypes["order_by"] | undefined | null,
	picture?: ResolverInputTypes["order_by"] | undefined | null,
	twitter?: ResolverInputTypes["order_by"] | undefined | null,
	website?: ResolverInputTypes["order_by"] | undefined | null
};
	/** response of any mutation on the table "Profile" */
["Profile_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ResolverInputTypes["Profile"],
		__typename?: boolean | `@${string}`
}>;
	/** on_conflict condition type for table "Profile" */
["Profile_on_conflict"]: {
	constraint: ResolverInputTypes["Profile_constraint"],
	update_columns: Array<ResolverInputTypes["Profile_update_column"]>,
	where?: ResolverInputTypes["Profile_bool_exp"] | undefined | null
};
	/** Ordering options when selecting data from "Profile". */
["Profile_order_by"]: {
	accountId?: ResolverInputTypes["order_by"] | undefined | null,
	description?: ResolverInputTypes["order_by"] | undefined | null,
	instagram?: ResolverInputTypes["order_by"] | undefined | null,
	picture?: ResolverInputTypes["order_by"] | undefined | null,
	twitter?: ResolverInputTypes["order_by"] | undefined | null,
	website?: ResolverInputTypes["order_by"] | undefined | null
};
	/** primary key columns input for table: Profile */
["Profile_pk_columns_input"]: {
	accountId: ResolverInputTypes["uuid"]
};
	/** select columns of table "Profile" */
["Profile_select_column"]:Profile_select_column;
	/** input type for updating data in table "Profile" */
["Profile_set_input"]: {
	accountId?: ResolverInputTypes["uuid"] | undefined | null,
	description?: string | undefined | null,
	instagram?: string | undefined | null,
	picture?: string | undefined | null,
	twitter?: string | undefined | null,
	website?: string | undefined | null
};
	/** Streaming cursor of the table "Profile" */
["Profile_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ResolverInputTypes["Profile_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ResolverInputTypes["cursor_ordering"] | undefined | null
};
	/** Initial value of the column from where the streaming should start */
["Profile_stream_cursor_value_input"]: {
	accountId?: ResolverInputTypes["uuid"] | undefined | null,
	description?: string | undefined | null,
	instagram?: string | undefined | null,
	picture?: string | undefined | null,
	twitter?: string | undefined | null,
	website?: string | undefined | null
};
	/** update columns of table "Profile" */
["Profile_update_column"]:Profile_update_column;
	["Profile_updates"]: {
	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Profile_set_input"] | undefined | null,
	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Profile_bool_exp"]
};
	/** columns and relationships of "Project" */
["Project"]: AliasType<{
	/** An object relationship */
	author?:ResolverInputTypes["Account"],
	authorId?:boolean | `@${string}`,
	blockchain?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	/** An object relationship */
	curator?:ResolverInputTypes["Account"],
	curatorId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
pricing?: [{	/** JSON select path */
	path?: string | undefined | null},boolean | `@${string}`],
projectMedias?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["ProjectMedia_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null},ResolverInputTypes["ProjectMedia"]],
projectMedias_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["ProjectMedia_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null},ResolverInputTypes["ProjectMedia_aggregate"]],
	releaseAt?:boolean | `@${string}`,
	state?:boolean | `@${string}`,
	storage?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** columns and relationships of "ProjectMedia" */
["ProjectMedia"]: AliasType<{
	index?:boolean | `@${string}`,
	/** An object relationship */
	media?:ResolverInputTypes["Media"],
	mediaId?:boolean | `@${string}`,
	/** An object relationship */
	project?:ResolverInputTypes["Project"],
	projectId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "ProjectMedia" */
["ProjectMedia_aggregate"]: AliasType<{
	aggregate?:ResolverInputTypes["ProjectMedia_aggregate_fields"],
	nodes?:ResolverInputTypes["ProjectMedia"],
		__typename?: boolean | `@${string}`
}>;
	["ProjectMedia_aggregate_bool_exp"]: {
	count?: ResolverInputTypes["ProjectMedia_aggregate_bool_exp_count"] | undefined | null
};
	["ProjectMedia_aggregate_bool_exp_count"]: {
	arguments?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,
	distinct?: boolean | undefined | null,
	filter?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null,
	predicate: ResolverInputTypes["Int_comparison_exp"]
};
	/** aggregate fields of "ProjectMedia" */
["ProjectMedia_aggregate_fields"]: AliasType<{
	avg?:ResolverInputTypes["ProjectMedia_avg_fields"],
count?: [{	columns?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,	distinct?: boolean | undefined | null},boolean | `@${string}`],
	max?:ResolverInputTypes["ProjectMedia_max_fields"],
	min?:ResolverInputTypes["ProjectMedia_min_fields"],
	stddev?:ResolverInputTypes["ProjectMedia_stddev_fields"],
	stddev_pop?:ResolverInputTypes["ProjectMedia_stddev_pop_fields"],
	stddev_samp?:ResolverInputTypes["ProjectMedia_stddev_samp_fields"],
	sum?:ResolverInputTypes["ProjectMedia_sum_fields"],
	var_pop?:ResolverInputTypes["ProjectMedia_var_pop_fields"],
	var_samp?:ResolverInputTypes["ProjectMedia_var_samp_fields"],
	variance?:ResolverInputTypes["ProjectMedia_variance_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** order by aggregate values of table "ProjectMedia" */
["ProjectMedia_aggregate_order_by"]: {
	avg?: ResolverInputTypes["ProjectMedia_avg_order_by"] | undefined | null,
	count?: ResolverInputTypes["order_by"] | undefined | null,
	max?: ResolverInputTypes["ProjectMedia_max_order_by"] | undefined | null,
	min?: ResolverInputTypes["ProjectMedia_min_order_by"] | undefined | null,
	stddev?: ResolverInputTypes["ProjectMedia_stddev_order_by"] | undefined | null,
	stddev_pop?: ResolverInputTypes["ProjectMedia_stddev_pop_order_by"] | undefined | null,
	stddev_samp?: ResolverInputTypes["ProjectMedia_stddev_samp_order_by"] | undefined | null,
	sum?: ResolverInputTypes["ProjectMedia_sum_order_by"] | undefined | null,
	var_pop?: ResolverInputTypes["ProjectMedia_var_pop_order_by"] | undefined | null,
	var_samp?: ResolverInputTypes["ProjectMedia_var_samp_order_by"] | undefined | null,
	variance?: ResolverInputTypes["ProjectMedia_variance_order_by"] | undefined | null
};
	/** input type for inserting array relation for remote table "ProjectMedia" */
["ProjectMedia_arr_rel_insert_input"]: {
	data: Array<ResolverInputTypes["ProjectMedia_insert_input"]>,
	/** upsert condition */
	on_conflict?: ResolverInputTypes["ProjectMedia_on_conflict"] | undefined | null
};
	/** aggregate avg on columns */
["ProjectMedia_avg_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by avg() on columns of table "ProjectMedia" */
["ProjectMedia_avg_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null
};
	/** Boolean expression to filter rows from the table "ProjectMedia". All fields are combined with a logical 'AND'. */
["ProjectMedia_bool_exp"]: {
	_and?: Array<ResolverInputTypes["ProjectMedia_bool_exp"]> | undefined | null,
	_not?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null,
	_or?: Array<ResolverInputTypes["ProjectMedia_bool_exp"]> | undefined | null,
	index?: ResolverInputTypes["smallint_comparison_exp"] | undefined | null,
	media?: ResolverInputTypes["Media_bool_exp"] | undefined | null,
	mediaId?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null,
	project?: ResolverInputTypes["Project_bool_exp"] | undefined | null,
	projectId?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null
};
	/** unique or primary key constraints on table "ProjectMedia" */
["ProjectMedia_constraint"]:ProjectMedia_constraint;
	/** input type for incrementing numeric columns in table "ProjectMedia" */
["ProjectMedia_inc_input"]: {
	index?: ResolverInputTypes["smallint"] | undefined | null
};
	/** input type for inserting data into table "ProjectMedia" */
["ProjectMedia_insert_input"]: {
	index?: ResolverInputTypes["smallint"] | undefined | null,
	media?: ResolverInputTypes["Media_obj_rel_insert_input"] | undefined | null,
	mediaId?: ResolverInputTypes["uuid"] | undefined | null,
	project?: ResolverInputTypes["Project_obj_rel_insert_input"] | undefined | null,
	projectId?: ResolverInputTypes["uuid"] | undefined | null
};
	/** aggregate max on columns */
["ProjectMedia_max_fields"]: AliasType<{
	index?:boolean | `@${string}`,
	mediaId?:boolean | `@${string}`,
	projectId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by max() on columns of table "ProjectMedia" */
["ProjectMedia_max_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null,
	mediaId?: ResolverInputTypes["order_by"] | undefined | null,
	projectId?: ResolverInputTypes["order_by"] | undefined | null
};
	/** aggregate min on columns */
["ProjectMedia_min_fields"]: AliasType<{
	index?:boolean | `@${string}`,
	mediaId?:boolean | `@${string}`,
	projectId?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by min() on columns of table "ProjectMedia" */
["ProjectMedia_min_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null,
	mediaId?: ResolverInputTypes["order_by"] | undefined | null,
	projectId?: ResolverInputTypes["order_by"] | undefined | null
};
	/** response of any mutation on the table "ProjectMedia" */
["ProjectMedia_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ResolverInputTypes["ProjectMedia"],
		__typename?: boolean | `@${string}`
}>;
	/** on_conflict condition type for table "ProjectMedia" */
["ProjectMedia_on_conflict"]: {
	constraint: ResolverInputTypes["ProjectMedia_constraint"],
	update_columns: Array<ResolverInputTypes["ProjectMedia_update_column"]>,
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null
};
	/** Ordering options when selecting data from "ProjectMedia". */
["ProjectMedia_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null,
	media?: ResolverInputTypes["Media_order_by"] | undefined | null,
	mediaId?: ResolverInputTypes["order_by"] | undefined | null,
	project?: ResolverInputTypes["Project_order_by"] | undefined | null,
	projectId?: ResolverInputTypes["order_by"] | undefined | null
};
	/** select columns of table "ProjectMedia" */
["ProjectMedia_select_column"]:ProjectMedia_select_column;
	/** input type for updating data in table "ProjectMedia" */
["ProjectMedia_set_input"]: {
	index?: ResolverInputTypes["smallint"] | undefined | null,
	mediaId?: ResolverInputTypes["uuid"] | undefined | null,
	projectId?: ResolverInputTypes["uuid"] | undefined | null
};
	/** aggregate stddev on columns */
["ProjectMedia_stddev_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by stddev() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null
};
	/** aggregate stddev_pop on columns */
["ProjectMedia_stddev_pop_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by stddev_pop() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_pop_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null
};
	/** aggregate stddev_samp on columns */
["ProjectMedia_stddev_samp_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by stddev_samp() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_samp_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null
};
	/** Streaming cursor of the table "ProjectMedia" */
["ProjectMedia_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ResolverInputTypes["ProjectMedia_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ResolverInputTypes["cursor_ordering"] | undefined | null
};
	/** Initial value of the column from where the streaming should start */
["ProjectMedia_stream_cursor_value_input"]: {
	index?: ResolverInputTypes["smallint"] | undefined | null,
	mediaId?: ResolverInputTypes["uuid"] | undefined | null,
	projectId?: ResolverInputTypes["uuid"] | undefined | null
};
	/** aggregate sum on columns */
["ProjectMedia_sum_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by sum() on columns of table "ProjectMedia" */
["ProjectMedia_sum_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null
};
	/** update columns of table "ProjectMedia" */
["ProjectMedia_update_column"]:ProjectMedia_update_column;
	["ProjectMedia_updates"]: {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: ResolverInputTypes["ProjectMedia_inc_input"] | undefined | null,
	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["ProjectMedia_set_input"] | undefined | null,
	/** filter the rows which have to be updated */
	where: ResolverInputTypes["ProjectMedia_bool_exp"]
};
	/** aggregate var_pop on columns */
["ProjectMedia_var_pop_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by var_pop() on columns of table "ProjectMedia" */
["ProjectMedia_var_pop_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null
};
	/** aggregate var_samp on columns */
["ProjectMedia_var_samp_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by var_samp() on columns of table "ProjectMedia" */
["ProjectMedia_var_samp_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null
};
	/** aggregate variance on columns */
["ProjectMedia_variance_fields"]: AliasType<{
	index?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by variance() on columns of table "ProjectMedia" */
["ProjectMedia_variance_order_by"]: {
	index?: ResolverInputTypes["order_by"] | undefined | null
};
	["ProjectState"]:unknown;
	/** Boolean expression to compare columns of type "ProjectState". All fields are combined with logical 'AND'. */
["ProjectState_comparison_exp"]: {
	_eq?: ResolverInputTypes["ProjectState"] | undefined | null,
	_gt?: ResolverInputTypes["ProjectState"] | undefined | null,
	_gte?: ResolverInputTypes["ProjectState"] | undefined | null,
	_in?: Array<ResolverInputTypes["ProjectState"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["ProjectState"] | undefined | null,
	_lte?: ResolverInputTypes["ProjectState"] | undefined | null,
	_neq?: ResolverInputTypes["ProjectState"] | undefined | null,
	_nin?: Array<ResolverInputTypes["ProjectState"]> | undefined | null
};
	/** aggregated selection of "Project" */
["Project_aggregate"]: AliasType<{
	aggregate?:ResolverInputTypes["Project_aggregate_fields"],
	nodes?:ResolverInputTypes["Project"],
		__typename?: boolean | `@${string}`
}>;
	["Project_aggregate_bool_exp"]: {
	count?: ResolverInputTypes["Project_aggregate_bool_exp_count"] | undefined | null
};
	["Project_aggregate_bool_exp_count"]: {
	arguments?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,
	distinct?: boolean | undefined | null,
	filter?: ResolverInputTypes["Project_bool_exp"] | undefined | null,
	predicate: ResolverInputTypes["Int_comparison_exp"]
};
	/** aggregate fields of "Project" */
["Project_aggregate_fields"]: AliasType<{
count?: [{	columns?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,	distinct?: boolean | undefined | null},boolean | `@${string}`],
	max?:ResolverInputTypes["Project_max_fields"],
	min?:ResolverInputTypes["Project_min_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** order by aggregate values of table "Project" */
["Project_aggregate_order_by"]: {
	count?: ResolverInputTypes["order_by"] | undefined | null,
	max?: ResolverInputTypes["Project_max_order_by"] | undefined | null,
	min?: ResolverInputTypes["Project_min_order_by"] | undefined | null
};
	/** append existing jsonb value of filtered columns with new jsonb value */
["Project_append_input"]: {
	pricing?: ResolverInputTypes["jsonb"] | undefined | null
};
	/** input type for inserting array relation for remote table "Project" */
["Project_arr_rel_insert_input"]: {
	data: Array<ResolverInputTypes["Project_insert_input"]>,
	/** upsert condition */
	on_conflict?: ResolverInputTypes["Project_on_conflict"] | undefined | null
};
	/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
["Project_bool_exp"]: {
	_and?: Array<ResolverInputTypes["Project_bool_exp"]> | undefined | null,
	_not?: ResolverInputTypes["Project_bool_exp"] | undefined | null,
	_or?: Array<ResolverInputTypes["Project_bool_exp"]> | undefined | null,
	author?: ResolverInputTypes["Account_bool_exp"] | undefined | null,
	authorId?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null,
	blockchain?: ResolverInputTypes["BlockchainNetwork_comparison_exp"] | undefined | null,
	createdAt?: ResolverInputTypes["timestamp_comparison_exp"] | undefined | null,
	curator?: ResolverInputTypes["Account_bool_exp"] | undefined | null,
	curatorId?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null,
	description?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	id?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null,
	pricing?: ResolverInputTypes["jsonb_comparison_exp"] | undefined | null,
	projectMedias?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null,
	projectMedias_aggregate?: ResolverInputTypes["ProjectMedia_aggregate_bool_exp"] | undefined | null,
	releaseAt?: ResolverInputTypes["timestamp_comparison_exp"] | undefined | null,
	state?: ResolverInputTypes["ProjectState_comparison_exp"] | undefined | null,
	storage?: ResolverInputTypes["Storage_comparison_exp"] | undefined | null,
	title?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	updatedAt?: ResolverInputTypes["timestamp_comparison_exp"] | undefined | null
};
	/** unique or primary key constraints on table "Project" */
["Project_constraint"]:Project_constraint;
	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
["Project_delete_at_path_input"]: {
	pricing?: Array<string> | undefined | null
};
	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
["Project_delete_elem_input"]: {
	pricing?: number | undefined | null
};
	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
["Project_delete_key_input"]: {
	pricing?: string | undefined | null
};
	/** input type for inserting data into table "Project" */
["Project_insert_input"]: {
	author?: ResolverInputTypes["Account_obj_rel_insert_input"] | undefined | null,
	authorId?: ResolverInputTypes["uuid"] | undefined | null,
	blockchain?: ResolverInputTypes["BlockchainNetwork"] | undefined | null,
	createdAt?: ResolverInputTypes["timestamp"] | undefined | null,
	curator?: ResolverInputTypes["Account_obj_rel_insert_input"] | undefined | null,
	curatorId?: ResolverInputTypes["uuid"] | undefined | null,
	description?: string | undefined | null,
	id?: ResolverInputTypes["uuid"] | undefined | null,
	pricing?: ResolverInputTypes["jsonb"] | undefined | null,
	projectMedias?: ResolverInputTypes["ProjectMedia_arr_rel_insert_input"] | undefined | null,
	releaseAt?: ResolverInputTypes["timestamp"] | undefined | null,
	state?: ResolverInputTypes["ProjectState"] | undefined | null,
	storage?: ResolverInputTypes["Storage"] | undefined | null,
	title?: string | undefined | null,
	updatedAt?: ResolverInputTypes["timestamp"] | undefined | null
};
	/** aggregate max on columns */
["Project_max_fields"]: AliasType<{
	authorId?:boolean | `@${string}`,
	blockchain?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	curatorId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	releaseAt?:boolean | `@${string}`,
	state?:boolean | `@${string}`,
	storage?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by max() on columns of table "Project" */
["Project_max_order_by"]: {
	authorId?: ResolverInputTypes["order_by"] | undefined | null,
	blockchain?: ResolverInputTypes["order_by"] | undefined | null,
	createdAt?: ResolverInputTypes["order_by"] | undefined | null,
	curatorId?: ResolverInputTypes["order_by"] | undefined | null,
	description?: ResolverInputTypes["order_by"] | undefined | null,
	id?: ResolverInputTypes["order_by"] | undefined | null,
	releaseAt?: ResolverInputTypes["order_by"] | undefined | null,
	state?: ResolverInputTypes["order_by"] | undefined | null,
	storage?: ResolverInputTypes["order_by"] | undefined | null,
	title?: ResolverInputTypes["order_by"] | undefined | null,
	updatedAt?: ResolverInputTypes["order_by"] | undefined | null
};
	/** aggregate min on columns */
["Project_min_fields"]: AliasType<{
	authorId?:boolean | `@${string}`,
	blockchain?:boolean | `@${string}`,
	createdAt?:boolean | `@${string}`,
	curatorId?:boolean | `@${string}`,
	description?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	releaseAt?:boolean | `@${string}`,
	state?:boolean | `@${string}`,
	storage?:boolean | `@${string}`,
	title?:boolean | `@${string}`,
	updatedAt?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by min() on columns of table "Project" */
["Project_min_order_by"]: {
	authorId?: ResolverInputTypes["order_by"] | undefined | null,
	blockchain?: ResolverInputTypes["order_by"] | undefined | null,
	createdAt?: ResolverInputTypes["order_by"] | undefined | null,
	curatorId?: ResolverInputTypes["order_by"] | undefined | null,
	description?: ResolverInputTypes["order_by"] | undefined | null,
	id?: ResolverInputTypes["order_by"] | undefined | null,
	releaseAt?: ResolverInputTypes["order_by"] | undefined | null,
	state?: ResolverInputTypes["order_by"] | undefined | null,
	storage?: ResolverInputTypes["order_by"] | undefined | null,
	title?: ResolverInputTypes["order_by"] | undefined | null,
	updatedAt?: ResolverInputTypes["order_by"] | undefined | null
};
	/** response of any mutation on the table "Project" */
["Project_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ResolverInputTypes["Project"],
		__typename?: boolean | `@${string}`
}>;
	/** input type for inserting object relation for remote table "Project" */
["Project_obj_rel_insert_input"]: {
	data: ResolverInputTypes["Project_insert_input"],
	/** upsert condition */
	on_conflict?: ResolverInputTypes["Project_on_conflict"] | undefined | null
};
	/** on_conflict condition type for table "Project" */
["Project_on_conflict"]: {
	constraint: ResolverInputTypes["Project_constraint"],
	update_columns: Array<ResolverInputTypes["Project_update_column"]>,
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null
};
	/** Ordering options when selecting data from "Project". */
["Project_order_by"]: {
	author?: ResolverInputTypes["Account_order_by"] | undefined | null,
	authorId?: ResolverInputTypes["order_by"] | undefined | null,
	blockchain?: ResolverInputTypes["order_by"] | undefined | null,
	createdAt?: ResolverInputTypes["order_by"] | undefined | null,
	curator?: ResolverInputTypes["Account_order_by"] | undefined | null,
	curatorId?: ResolverInputTypes["order_by"] | undefined | null,
	description?: ResolverInputTypes["order_by"] | undefined | null,
	id?: ResolverInputTypes["order_by"] | undefined | null,
	pricing?: ResolverInputTypes["order_by"] | undefined | null,
	projectMedias_aggregate?: ResolverInputTypes["ProjectMedia_aggregate_order_by"] | undefined | null,
	releaseAt?: ResolverInputTypes["order_by"] | undefined | null,
	state?: ResolverInputTypes["order_by"] | undefined | null,
	storage?: ResolverInputTypes["order_by"] | undefined | null,
	title?: ResolverInputTypes["order_by"] | undefined | null,
	updatedAt?: ResolverInputTypes["order_by"] | undefined | null
};
	/** primary key columns input for table: Project */
["Project_pk_columns_input"]: {
	id: ResolverInputTypes["uuid"]
};
	/** prepend existing jsonb value of filtered columns with new jsonb value */
["Project_prepend_input"]: {
	pricing?: ResolverInputTypes["jsonb"] | undefined | null
};
	/** select columns of table "Project" */
["Project_select_column"]:Project_select_column;
	/** input type for updating data in table "Project" */
["Project_set_input"]: {
	authorId?: ResolverInputTypes["uuid"] | undefined | null,
	blockchain?: ResolverInputTypes["BlockchainNetwork"] | undefined | null,
	createdAt?: ResolverInputTypes["timestamp"] | undefined | null,
	curatorId?: ResolverInputTypes["uuid"] | undefined | null,
	description?: string | undefined | null,
	id?: ResolverInputTypes["uuid"] | undefined | null,
	pricing?: ResolverInputTypes["jsonb"] | undefined | null,
	releaseAt?: ResolverInputTypes["timestamp"] | undefined | null,
	state?: ResolverInputTypes["ProjectState"] | undefined | null,
	storage?: ResolverInputTypes["Storage"] | undefined | null,
	title?: string | undefined | null,
	updatedAt?: ResolverInputTypes["timestamp"] | undefined | null
};
	/** Streaming cursor of the table "Project" */
["Project_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ResolverInputTypes["Project_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ResolverInputTypes["cursor_ordering"] | undefined | null
};
	/** Initial value of the column from where the streaming should start */
["Project_stream_cursor_value_input"]: {
	authorId?: ResolverInputTypes["uuid"] | undefined | null,
	blockchain?: ResolverInputTypes["BlockchainNetwork"] | undefined | null,
	createdAt?: ResolverInputTypes["timestamp"] | undefined | null,
	curatorId?: ResolverInputTypes["uuid"] | undefined | null,
	description?: string | undefined | null,
	id?: ResolverInputTypes["uuid"] | undefined | null,
	pricing?: ResolverInputTypes["jsonb"] | undefined | null,
	releaseAt?: ResolverInputTypes["timestamp"] | undefined | null,
	state?: ResolverInputTypes["ProjectState"] | undefined | null,
	storage?: ResolverInputTypes["Storage"] | undefined | null,
	title?: string | undefined | null,
	updatedAt?: ResolverInputTypes["timestamp"] | undefined | null
};
	/** update columns of table "Project" */
["Project_update_column"]:Project_update_column;
	["Project_updates"]: {
	/** append existing jsonb value of filtered columns with new jsonb value */
	_append?: ResolverInputTypes["Project_append_input"] | undefined | null,
	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
	_delete_at_path?: ResolverInputTypes["Project_delete_at_path_input"] | undefined | null,
	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
	_delete_elem?: ResolverInputTypes["Project_delete_elem_input"] | undefined | null,
	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
	_delete_key?: ResolverInputTypes["Project_delete_key_input"] | undefined | null,
	/** prepend existing jsonb value of filtered columns with new jsonb value */
	_prepend?: ResolverInputTypes["Project_prepend_input"] | undefined | null,
	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Project_set_input"] | undefined | null,
	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Project_bool_exp"]
};
	["Storage"]:unknown;
	/** Boolean expression to compare columns of type "Storage". All fields are combined with logical 'AND'. */
["Storage_comparison_exp"]: {
	_eq?: ResolverInputTypes["Storage"] | undefined | null,
	_gt?: ResolverInputTypes["Storage"] | undefined | null,
	_gte?: ResolverInputTypes["Storage"] | undefined | null,
	_in?: Array<ResolverInputTypes["Storage"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["Storage"] | undefined | null,
	_lte?: ResolverInputTypes["Storage"] | undefined | null,
	_neq?: ResolverInputTypes["Storage"] | undefined | null,
	_nin?: Array<ResolverInputTypes["Storage"]> | undefined | null
};
	/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
["String_comparison_exp"]: {
	_eq?: string | undefined | null,
	_gt?: string | undefined | null,
	_gte?: string | undefined | null,
	/** does the column match the given case-insensitive pattern */
	_ilike?: string | undefined | null,
	_in?: Array<string> | undefined | null,
	/** does the column match the given POSIX regular expression, case insensitive */
	_iregex?: string | undefined | null,
	_is_null?: boolean | undefined | null,
	/** does the column match the given pattern */
	_like?: string | undefined | null,
	_lt?: string | undefined | null,
	_lte?: string | undefined | null,
	_neq?: string | undefined | null,
	/** does the column NOT match the given case-insensitive pattern */
	_nilike?: string | undefined | null,
	_nin?: Array<string> | undefined | null,
	/** does the column NOT match the given POSIX regular expression, case insensitive */
	_niregex?: string | undefined | null,
	/** does the column NOT match the given pattern */
	_nlike?: string | undefined | null,
	/** does the column NOT match the given POSIX regular expression, case sensitive */
	_nregex?: string | undefined | null,
	/** does the column NOT match the given SQL regular expression */
	_nsimilar?: string | undefined | null,
	/** does the column match the given POSIX regular expression, case sensitive */
	_regex?: string | undefined | null,
	/** does the column match the given SQL regular expression */
	_similar?: string | undefined | null
};
	/** columns and relationships of "Wallet" */
["Wallet"]: AliasType<{
	accountId?:boolean | `@${string}`,
	address?:boolean | `@${string}`,
	network?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "Wallet" */
["Wallet_aggregate"]: AliasType<{
	aggregate?:ResolverInputTypes["Wallet_aggregate_fields"],
	nodes?:ResolverInputTypes["Wallet"],
		__typename?: boolean | `@${string}`
}>;
	["Wallet_aggregate_bool_exp"]: {
	count?: ResolverInputTypes["Wallet_aggregate_bool_exp_count"] | undefined | null
};
	["Wallet_aggregate_bool_exp_count"]: {
	arguments?: Array<ResolverInputTypes["Wallet_select_column"]> | undefined | null,
	distinct?: boolean | undefined | null,
	filter?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null,
	predicate: ResolverInputTypes["Int_comparison_exp"]
};
	/** aggregate fields of "Wallet" */
["Wallet_aggregate_fields"]: AliasType<{
count?: [{	columns?: Array<ResolverInputTypes["Wallet_select_column"]> | undefined | null,	distinct?: boolean | undefined | null},boolean | `@${string}`],
	max?:ResolverInputTypes["Wallet_max_fields"],
	min?:ResolverInputTypes["Wallet_min_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** order by aggregate values of table "Wallet" */
["Wallet_aggregate_order_by"]: {
	count?: ResolverInputTypes["order_by"] | undefined | null,
	max?: ResolverInputTypes["Wallet_max_order_by"] | undefined | null,
	min?: ResolverInputTypes["Wallet_min_order_by"] | undefined | null
};
	/** input type for inserting array relation for remote table "Wallet" */
["Wallet_arr_rel_insert_input"]: {
	data: Array<ResolverInputTypes["Wallet_insert_input"]>,
	/** upsert condition */
	on_conflict?: ResolverInputTypes["Wallet_on_conflict"] | undefined | null
};
	/** Boolean expression to filter rows from the table "Wallet". All fields are combined with a logical 'AND'. */
["Wallet_bool_exp"]: {
	_and?: Array<ResolverInputTypes["Wallet_bool_exp"]> | undefined | null,
	_not?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null,
	_or?: Array<ResolverInputTypes["Wallet_bool_exp"]> | undefined | null,
	accountId?: ResolverInputTypes["uuid_comparison_exp"] | undefined | null,
	address?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	network?: ResolverInputTypes["BlockchainNetwork_comparison_exp"] | undefined | null
};
	/** unique or primary key constraints on table "Wallet" */
["Wallet_constraint"]:Wallet_constraint;
	/** input type for inserting data into table "Wallet" */
["Wallet_insert_input"]: {
	accountId?: ResolverInputTypes["uuid"] | undefined | null,
	address?: string | undefined | null,
	network?: ResolverInputTypes["BlockchainNetwork"] | undefined | null
};
	/** aggregate max on columns */
["Wallet_max_fields"]: AliasType<{
	accountId?:boolean | `@${string}`,
	address?:boolean | `@${string}`,
	network?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by max() on columns of table "Wallet" */
["Wallet_max_order_by"]: {
	accountId?: ResolverInputTypes["order_by"] | undefined | null,
	address?: ResolverInputTypes["order_by"] | undefined | null,
	network?: ResolverInputTypes["order_by"] | undefined | null
};
	/** aggregate min on columns */
["Wallet_min_fields"]: AliasType<{
	accountId?:boolean | `@${string}`,
	address?:boolean | `@${string}`,
	network?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** order by min() on columns of table "Wallet" */
["Wallet_min_order_by"]: {
	accountId?: ResolverInputTypes["order_by"] | undefined | null,
	address?: ResolverInputTypes["order_by"] | undefined | null,
	network?: ResolverInputTypes["order_by"] | undefined | null
};
	/** response of any mutation on the table "Wallet" */
["Wallet_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ResolverInputTypes["Wallet"],
		__typename?: boolean | `@${string}`
}>;
	/** on_conflict condition type for table "Wallet" */
["Wallet_on_conflict"]: {
	constraint: ResolverInputTypes["Wallet_constraint"],
	update_columns: Array<ResolverInputTypes["Wallet_update_column"]>,
	where?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null
};
	/** Ordering options when selecting data from "Wallet". */
["Wallet_order_by"]: {
	accountId?: ResolverInputTypes["order_by"] | undefined | null,
	address?: ResolverInputTypes["order_by"] | undefined | null,
	network?: ResolverInputTypes["order_by"] | undefined | null
};
	/** primary key columns input for table: Wallet */
["Wallet_pk_columns_input"]: {
	address: string
};
	/** select columns of table "Wallet" */
["Wallet_select_column"]:Wallet_select_column;
	/** input type for updating data in table "Wallet" */
["Wallet_set_input"]: {
	accountId?: ResolverInputTypes["uuid"] | undefined | null,
	address?: string | undefined | null,
	network?: ResolverInputTypes["BlockchainNetwork"] | undefined | null
};
	/** Streaming cursor of the table "Wallet" */
["Wallet_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ResolverInputTypes["Wallet_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ResolverInputTypes["cursor_ordering"] | undefined | null
};
	/** Initial value of the column from where the streaming should start */
["Wallet_stream_cursor_value_input"]: {
	accountId?: ResolverInputTypes["uuid"] | undefined | null,
	address?: string | undefined | null,
	network?: ResolverInputTypes["BlockchainNetwork"] | undefined | null
};
	/** update columns of table "Wallet" */
["Wallet_update_column"]:Wallet_update_column;
	["Wallet_updates"]: {
	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Wallet_set_input"] | undefined | null,
	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Wallet_bool_exp"]
};
	["_AccountRoles"]:unknown;
	/** Boolean expression to compare columns of type "_AccountRoles". All fields are combined with logical 'AND'. */
["_AccountRoles_comparison_exp"]: {
	_eq?: ResolverInputTypes["_AccountRoles"] | undefined | null,
	_gt?: ResolverInputTypes["_AccountRoles"] | undefined | null,
	_gte?: ResolverInputTypes["_AccountRoles"] | undefined | null,
	_in?: Array<ResolverInputTypes["_AccountRoles"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["_AccountRoles"] | undefined | null,
	_lte?: ResolverInputTypes["_AccountRoles"] | undefined | null,
	_neq?: ResolverInputTypes["_AccountRoles"] | undefined | null,
	_nin?: Array<ResolverInputTypes["_AccountRoles"]> | undefined | null
};
	/** columns and relationships of "_prisma_migrations" */
["_prisma_migrations"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
	checksum?:boolean | `@${string}`,
	finished_at?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	logs?:boolean | `@${string}`,
	migration_name?:boolean | `@${string}`,
	rolled_back_at?:boolean | `@${string}`,
	started_at?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregated selection of "_prisma_migrations" */
["_prisma_migrations_aggregate"]: AliasType<{
	aggregate?:ResolverInputTypes["_prisma_migrations_aggregate_fields"],
	nodes?:ResolverInputTypes["_prisma_migrations"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate fields of "_prisma_migrations" */
["_prisma_migrations_aggregate_fields"]: AliasType<{
	avg?:ResolverInputTypes["_prisma_migrations_avg_fields"],
count?: [{	columns?: Array<ResolverInputTypes["_prisma_migrations_select_column"]> | undefined | null,	distinct?: boolean | undefined | null},boolean | `@${string}`],
	max?:ResolverInputTypes["_prisma_migrations_max_fields"],
	min?:ResolverInputTypes["_prisma_migrations_min_fields"],
	stddev?:ResolverInputTypes["_prisma_migrations_stddev_fields"],
	stddev_pop?:ResolverInputTypes["_prisma_migrations_stddev_pop_fields"],
	stddev_samp?:ResolverInputTypes["_prisma_migrations_stddev_samp_fields"],
	sum?:ResolverInputTypes["_prisma_migrations_sum_fields"],
	var_pop?:ResolverInputTypes["_prisma_migrations_var_pop_fields"],
	var_samp?:ResolverInputTypes["_prisma_migrations_var_samp_fields"],
	variance?:ResolverInputTypes["_prisma_migrations_variance_fields"],
		__typename?: boolean | `@${string}`
}>;
	/** aggregate avg on columns */
["_prisma_migrations_avg_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** Boolean expression to filter rows from the table "_prisma_migrations". All fields are combined with a logical 'AND'. */
["_prisma_migrations_bool_exp"]: {
	_and?: Array<ResolverInputTypes["_prisma_migrations_bool_exp"]> | undefined | null,
	_not?: ResolverInputTypes["_prisma_migrations_bool_exp"] | undefined | null,
	_or?: Array<ResolverInputTypes["_prisma_migrations_bool_exp"]> | undefined | null,
	applied_steps_count?: ResolverInputTypes["Int_comparison_exp"] | undefined | null,
	checksum?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	finished_at?: ResolverInputTypes["timestamptz_comparison_exp"] | undefined | null,
	id?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	logs?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	migration_name?: ResolverInputTypes["String_comparison_exp"] | undefined | null,
	rolled_back_at?: ResolverInputTypes["timestamptz_comparison_exp"] | undefined | null,
	started_at?: ResolverInputTypes["timestamptz_comparison_exp"] | undefined | null
};
	/** unique or primary key constraints on table "_prisma_migrations" */
["_prisma_migrations_constraint"]:_prisma_migrations_constraint;
	/** input type for incrementing numeric columns in table "_prisma_migrations" */
["_prisma_migrations_inc_input"]: {
	applied_steps_count?: number | undefined | null
};
	/** input type for inserting data into table "_prisma_migrations" */
["_prisma_migrations_insert_input"]: {
	applied_steps_count?: number | undefined | null,
	checksum?: string | undefined | null,
	finished_at?: ResolverInputTypes["timestamptz"] | undefined | null,
	id?: string | undefined | null,
	logs?: string | undefined | null,
	migration_name?: string | undefined | null,
	rolled_back_at?: ResolverInputTypes["timestamptz"] | undefined | null,
	started_at?: ResolverInputTypes["timestamptz"] | undefined | null
};
	/** aggregate max on columns */
["_prisma_migrations_max_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
	checksum?:boolean | `@${string}`,
	finished_at?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	logs?:boolean | `@${string}`,
	migration_name?:boolean | `@${string}`,
	rolled_back_at?:boolean | `@${string}`,
	started_at?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate min on columns */
["_prisma_migrations_min_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
	checksum?:boolean | `@${string}`,
	finished_at?:boolean | `@${string}`,
	id?:boolean | `@${string}`,
	logs?:boolean | `@${string}`,
	migration_name?:boolean | `@${string}`,
	rolled_back_at?:boolean | `@${string}`,
	started_at?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** response of any mutation on the table "_prisma_migrations" */
["_prisma_migrations_mutation_response"]: AliasType<{
	/** number of rows affected by the mutation */
	affected_rows?:boolean | `@${string}`,
	/** data from the rows affected by the mutation */
	returning?:ResolverInputTypes["_prisma_migrations"],
		__typename?: boolean | `@${string}`
}>;
	/** on_conflict condition type for table "_prisma_migrations" */
["_prisma_migrations_on_conflict"]: {
	constraint: ResolverInputTypes["_prisma_migrations_constraint"],
	update_columns: Array<ResolverInputTypes["_prisma_migrations_update_column"]>,
	where?: ResolverInputTypes["_prisma_migrations_bool_exp"] | undefined | null
};
	/** Ordering options when selecting data from "_prisma_migrations". */
["_prisma_migrations_order_by"]: {
	applied_steps_count?: ResolverInputTypes["order_by"] | undefined | null,
	checksum?: ResolverInputTypes["order_by"] | undefined | null,
	finished_at?: ResolverInputTypes["order_by"] | undefined | null,
	id?: ResolverInputTypes["order_by"] | undefined | null,
	logs?: ResolverInputTypes["order_by"] | undefined | null,
	migration_name?: ResolverInputTypes["order_by"] | undefined | null,
	rolled_back_at?: ResolverInputTypes["order_by"] | undefined | null,
	started_at?: ResolverInputTypes["order_by"] | undefined | null
};
	/** primary key columns input for table: _prisma_migrations */
["_prisma_migrations_pk_columns_input"]: {
	id: string
};
	/** select columns of table "_prisma_migrations" */
["_prisma_migrations_select_column"]:_prisma_migrations_select_column;
	/** input type for updating data in table "_prisma_migrations" */
["_prisma_migrations_set_input"]: {
	applied_steps_count?: number | undefined | null,
	checksum?: string | undefined | null,
	finished_at?: ResolverInputTypes["timestamptz"] | undefined | null,
	id?: string | undefined | null,
	logs?: string | undefined | null,
	migration_name?: string | undefined | null,
	rolled_back_at?: ResolverInputTypes["timestamptz"] | undefined | null,
	started_at?: ResolverInputTypes["timestamptz"] | undefined | null
};
	/** aggregate stddev on columns */
["_prisma_migrations_stddev_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate stddev_pop on columns */
["_prisma_migrations_stddev_pop_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate stddev_samp on columns */
["_prisma_migrations_stddev_samp_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** Streaming cursor of the table "_prisma_migrations" */
["_prisma_migrations_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ResolverInputTypes["_prisma_migrations_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ResolverInputTypes["cursor_ordering"] | undefined | null
};
	/** Initial value of the column from where the streaming should start */
["_prisma_migrations_stream_cursor_value_input"]: {
	applied_steps_count?: number | undefined | null,
	checksum?: string | undefined | null,
	finished_at?: ResolverInputTypes["timestamptz"] | undefined | null,
	id?: string | undefined | null,
	logs?: string | undefined | null,
	migration_name?: string | undefined | null,
	rolled_back_at?: ResolverInputTypes["timestamptz"] | undefined | null,
	started_at?: ResolverInputTypes["timestamptz"] | undefined | null
};
	/** aggregate sum on columns */
["_prisma_migrations_sum_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** update columns of table "_prisma_migrations" */
["_prisma_migrations_update_column"]:_prisma_migrations_update_column;
	["_prisma_migrations_updates"]: {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: ResolverInputTypes["_prisma_migrations_inc_input"] | undefined | null,
	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["_prisma_migrations_set_input"] | undefined | null,
	/** filter the rows which have to be updated */
	where: ResolverInputTypes["_prisma_migrations_bool_exp"]
};
	/** aggregate var_pop on columns */
["_prisma_migrations_var_pop_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate var_samp on columns */
["_prisma_migrations_var_samp_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** aggregate variance on columns */
["_prisma_migrations_variance_fields"]: AliasType<{
	applied_steps_count?:boolean | `@${string}`,
		__typename?: boolean | `@${string}`
}>;
	/** ordering argument of a cursor */
["cursor_ordering"]:cursor_ordering;
	["jsonb"]:unknown;
	["jsonb_cast_exp"]: {
	String?: ResolverInputTypes["String_comparison_exp"] | undefined | null
};
	/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
["jsonb_comparison_exp"]: {
	_cast?: ResolverInputTypes["jsonb_cast_exp"] | undefined | null,
	/** is the column contained in the given json value */
	_contained_in?: ResolverInputTypes["jsonb"] | undefined | null,
	/** does the column contain the given json value at the top level */
	_contains?: ResolverInputTypes["jsonb"] | undefined | null,
	_eq?: ResolverInputTypes["jsonb"] | undefined | null,
	_gt?: ResolverInputTypes["jsonb"] | undefined | null,
	_gte?: ResolverInputTypes["jsonb"] | undefined | null,
	/** does the string exist as a top-level key in the column */
	_has_key?: string | undefined | null,
	/** do all of these strings exist as top-level keys in the column */
	_has_keys_all?: Array<string> | undefined | null,
	/** do any of these strings exist as top-level keys in the column */
	_has_keys_any?: Array<string> | undefined | null,
	_in?: Array<ResolverInputTypes["jsonb"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["jsonb"] | undefined | null,
	_lte?: ResolverInputTypes["jsonb"] | undefined | null,
	_neq?: ResolverInputTypes["jsonb"] | undefined | null,
	_nin?: Array<ResolverInputTypes["jsonb"]> | undefined | null
};
	/** mutation root */
["mutation_root"]: AliasType<{
delete_Account?: [{	/** filter the rows which have to be deleted */
	where: ResolverInputTypes["Account_bool_exp"]},ResolverInputTypes["Account_mutation_response"]],
delete_Account_by_pk?: [{	id: ResolverInputTypes["uuid"]},ResolverInputTypes["Account"]],
delete_Media?: [{	/** filter the rows which have to be deleted */
	where: ResolverInputTypes["Media_bool_exp"]},ResolverInputTypes["Media_mutation_response"]],
delete_Media_by_pk?: [{	id: ResolverInputTypes["uuid"]},ResolverInputTypes["Media"]],
delete_Profile?: [{	/** filter the rows which have to be deleted */
	where: ResolverInputTypes["Profile_bool_exp"]},ResolverInputTypes["Profile_mutation_response"]],
delete_Profile_by_pk?: [{	accountId: ResolverInputTypes["uuid"]},ResolverInputTypes["Profile"]],
delete_Project?: [{	/** filter the rows which have to be deleted */
	where: ResolverInputTypes["Project_bool_exp"]},ResolverInputTypes["Project_mutation_response"]],
delete_ProjectMedia?: [{	/** filter the rows which have to be deleted */
	where: ResolverInputTypes["ProjectMedia_bool_exp"]},ResolverInputTypes["ProjectMedia_mutation_response"]],
delete_Project_by_pk?: [{	id: ResolverInputTypes["uuid"]},ResolverInputTypes["Project"]],
delete_Wallet?: [{	/** filter the rows which have to be deleted */
	where: ResolverInputTypes["Wallet_bool_exp"]},ResolverInputTypes["Wallet_mutation_response"]],
delete_Wallet_by_pk?: [{	address: string},ResolverInputTypes["Wallet"]],
delete__prisma_migrations?: [{	/** filter the rows which have to be deleted */
	where: ResolverInputTypes["_prisma_migrations_bool_exp"]},ResolverInputTypes["_prisma_migrations_mutation_response"]],
delete__prisma_migrations_by_pk?: [{	id: string},ResolverInputTypes["_prisma_migrations"]],
insert_Account?: [{	/** the rows to be inserted */
	objects: Array<ResolverInputTypes["Account_insert_input"]>,	/** upsert condition */
	on_conflict?: ResolverInputTypes["Account_on_conflict"] | undefined | null},ResolverInputTypes["Account_mutation_response"]],
insert_Account_one?: [{	/** the row to be inserted */
	object: ResolverInputTypes["Account_insert_input"],	/** upsert condition */
	on_conflict?: ResolverInputTypes["Account_on_conflict"] | undefined | null},ResolverInputTypes["Account"]],
insert_Media?: [{	/** the rows to be inserted */
	objects: Array<ResolverInputTypes["Media_insert_input"]>,	/** upsert condition */
	on_conflict?: ResolverInputTypes["Media_on_conflict"] | undefined | null},ResolverInputTypes["Media_mutation_response"]],
insert_Media_one?: [{	/** the row to be inserted */
	object: ResolverInputTypes["Media_insert_input"],	/** upsert condition */
	on_conflict?: ResolverInputTypes["Media_on_conflict"] | undefined | null},ResolverInputTypes["Media"]],
insert_Profile?: [{	/** the rows to be inserted */
	objects: Array<ResolverInputTypes["Profile_insert_input"]>,	/** upsert condition */
	on_conflict?: ResolverInputTypes["Profile_on_conflict"] | undefined | null},ResolverInputTypes["Profile_mutation_response"]],
insert_Profile_one?: [{	/** the row to be inserted */
	object: ResolverInputTypes["Profile_insert_input"],	/** upsert condition */
	on_conflict?: ResolverInputTypes["Profile_on_conflict"] | undefined | null},ResolverInputTypes["Profile"]],
insert_Project?: [{	/** the rows to be inserted */
	objects: Array<ResolverInputTypes["Project_insert_input"]>,	/** upsert condition */
	on_conflict?: ResolverInputTypes["Project_on_conflict"] | undefined | null},ResolverInputTypes["Project_mutation_response"]],
insert_ProjectMedia?: [{	/** the rows to be inserted */
	objects: Array<ResolverInputTypes["ProjectMedia_insert_input"]>,	/** upsert condition */
	on_conflict?: ResolverInputTypes["ProjectMedia_on_conflict"] | undefined | null},ResolverInputTypes["ProjectMedia_mutation_response"]],
insert_ProjectMedia_one?: [{	/** the row to be inserted */
	object: ResolverInputTypes["ProjectMedia_insert_input"],	/** upsert condition */
	on_conflict?: ResolverInputTypes["ProjectMedia_on_conflict"] | undefined | null},ResolverInputTypes["ProjectMedia"]],
insert_Project_one?: [{	/** the row to be inserted */
	object: ResolverInputTypes["Project_insert_input"],	/** upsert condition */
	on_conflict?: ResolverInputTypes["Project_on_conflict"] | undefined | null},ResolverInputTypes["Project"]],
insert_Wallet?: [{	/** the rows to be inserted */
	objects: Array<ResolverInputTypes["Wallet_insert_input"]>,	/** upsert condition */
	on_conflict?: ResolverInputTypes["Wallet_on_conflict"] | undefined | null},ResolverInputTypes["Wallet_mutation_response"]],
insert_Wallet_one?: [{	/** the row to be inserted */
	object: ResolverInputTypes["Wallet_insert_input"],	/** upsert condition */
	on_conflict?: ResolverInputTypes["Wallet_on_conflict"] | undefined | null},ResolverInputTypes["Wallet"]],
insert__prisma_migrations?: [{	/** the rows to be inserted */
	objects: Array<ResolverInputTypes["_prisma_migrations_insert_input"]>,	/** upsert condition */
	on_conflict?: ResolverInputTypes["_prisma_migrations_on_conflict"] | undefined | null},ResolverInputTypes["_prisma_migrations_mutation_response"]],
insert__prisma_migrations_one?: [{	/** the row to be inserted */
	object: ResolverInputTypes["_prisma_migrations_insert_input"],	/** upsert condition */
	on_conflict?: ResolverInputTypes["_prisma_migrations_on_conflict"] | undefined | null},ResolverInputTypes["_prisma_migrations"]],
update_Account?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Account_set_input"] | undefined | null,	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Account_bool_exp"]},ResolverInputTypes["Account_mutation_response"]],
update_Account_by_pk?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Account_set_input"] | undefined | null,	pk_columns: ResolverInputTypes["Account_pk_columns_input"]},ResolverInputTypes["Account"]],
update_Account_many?: [{	/** updates to execute, in order */
	updates: Array<ResolverInputTypes["Account_updates"]>},ResolverInputTypes["Account_mutation_response"]],
update_Media?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ResolverInputTypes["Media_inc_input"] | undefined | null,	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Media_set_input"] | undefined | null,	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Media_bool_exp"]},ResolverInputTypes["Media_mutation_response"]],
update_Media_by_pk?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ResolverInputTypes["Media_inc_input"] | undefined | null,	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Media_set_input"] | undefined | null,	pk_columns: ResolverInputTypes["Media_pk_columns_input"]},ResolverInputTypes["Media"]],
update_Media_many?: [{	/** updates to execute, in order */
	updates: Array<ResolverInputTypes["Media_updates"]>},ResolverInputTypes["Media_mutation_response"]],
update_Profile?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Profile_set_input"] | undefined | null,	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Profile_bool_exp"]},ResolverInputTypes["Profile_mutation_response"]],
update_Profile_by_pk?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Profile_set_input"] | undefined | null,	pk_columns: ResolverInputTypes["Profile_pk_columns_input"]},ResolverInputTypes["Profile"]],
update_Profile_many?: [{	/** updates to execute, in order */
	updates: Array<ResolverInputTypes["Profile_updates"]>},ResolverInputTypes["Profile_mutation_response"]],
update_Project?: [{	/** append existing jsonb value of filtered columns with new jsonb value */
	_append?: ResolverInputTypes["Project_append_input"] | undefined | null,	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
	_delete_at_path?: ResolverInputTypes["Project_delete_at_path_input"] | undefined | null,	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
	_delete_elem?: ResolverInputTypes["Project_delete_elem_input"] | undefined | null,	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
	_delete_key?: ResolverInputTypes["Project_delete_key_input"] | undefined | null,	/** prepend existing jsonb value of filtered columns with new jsonb value */
	_prepend?: ResolverInputTypes["Project_prepend_input"] | undefined | null,	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Project_set_input"] | undefined | null,	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Project_bool_exp"]},ResolverInputTypes["Project_mutation_response"]],
update_ProjectMedia?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ResolverInputTypes["ProjectMedia_inc_input"] | undefined | null,	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["ProjectMedia_set_input"] | undefined | null,	/** filter the rows which have to be updated */
	where: ResolverInputTypes["ProjectMedia_bool_exp"]},ResolverInputTypes["ProjectMedia_mutation_response"]],
update_ProjectMedia_many?: [{	/** updates to execute, in order */
	updates: Array<ResolverInputTypes["ProjectMedia_updates"]>},ResolverInputTypes["ProjectMedia_mutation_response"]],
update_Project_by_pk?: [{	/** append existing jsonb value of filtered columns with new jsonb value */
	_append?: ResolverInputTypes["Project_append_input"] | undefined | null,	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
	_delete_at_path?: ResolverInputTypes["Project_delete_at_path_input"] | undefined | null,	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
	_delete_elem?: ResolverInputTypes["Project_delete_elem_input"] | undefined | null,	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
	_delete_key?: ResolverInputTypes["Project_delete_key_input"] | undefined | null,	/** prepend existing jsonb value of filtered columns with new jsonb value */
	_prepend?: ResolverInputTypes["Project_prepend_input"] | undefined | null,	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Project_set_input"] | undefined | null,	pk_columns: ResolverInputTypes["Project_pk_columns_input"]},ResolverInputTypes["Project"]],
update_Project_many?: [{	/** updates to execute, in order */
	updates: Array<ResolverInputTypes["Project_updates"]>},ResolverInputTypes["Project_mutation_response"]],
update_Wallet?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Wallet_set_input"] | undefined | null,	/** filter the rows which have to be updated */
	where: ResolverInputTypes["Wallet_bool_exp"]},ResolverInputTypes["Wallet_mutation_response"]],
update_Wallet_by_pk?: [{	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["Wallet_set_input"] | undefined | null,	pk_columns: ResolverInputTypes["Wallet_pk_columns_input"]},ResolverInputTypes["Wallet"]],
update_Wallet_many?: [{	/** updates to execute, in order */
	updates: Array<ResolverInputTypes["Wallet_updates"]>},ResolverInputTypes["Wallet_mutation_response"]],
update__prisma_migrations?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ResolverInputTypes["_prisma_migrations_inc_input"] | undefined | null,	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["_prisma_migrations_set_input"] | undefined | null,	/** filter the rows which have to be updated */
	where: ResolverInputTypes["_prisma_migrations_bool_exp"]},ResolverInputTypes["_prisma_migrations_mutation_response"]],
update__prisma_migrations_by_pk?: [{	/** increments the numeric columns with given value of the filtered values */
	_inc?: ResolverInputTypes["_prisma_migrations_inc_input"] | undefined | null,	/** sets the columns of the filtered rows to the given values */
	_set?: ResolverInputTypes["_prisma_migrations_set_input"] | undefined | null,	pk_columns: ResolverInputTypes["_prisma_migrations_pk_columns_input"]},ResolverInputTypes["_prisma_migrations"]],
update__prisma_migrations_many?: [{	/** updates to execute, in order */
	updates: Array<ResolverInputTypes["_prisma_migrations_updates"]>},ResolverInputTypes["_prisma_migrations_mutation_response"]],
		__typename?: boolean | `@${string}`
}>;
	/** column ordering options */
["order_by"]:order_by;
	["query_root"]: AliasType<{
Account?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Account_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Account_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Account_bool_exp"] | undefined | null},ResolverInputTypes["Account"]],
Account_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Account_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Account_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Account_bool_exp"] | undefined | null},ResolverInputTypes["Account_aggregate"]],
Account_by_pk?: [{	id: ResolverInputTypes["uuid"]},ResolverInputTypes["Account"]],
Media?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Media_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Media_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Media_bool_exp"] | undefined | null},ResolverInputTypes["Media"]],
Media_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Media_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Media_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Media_bool_exp"] | undefined | null},ResolverInputTypes["Media_aggregate"]],
Media_by_pk?: [{	id: ResolverInputTypes["uuid"]},ResolverInputTypes["Media"]],
Profile?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Profile_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Profile_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Profile_bool_exp"] | undefined | null},ResolverInputTypes["Profile"]],
Profile_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Profile_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Profile_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Profile_bool_exp"] | undefined | null},ResolverInputTypes["Profile_aggregate"]],
Profile_by_pk?: [{	accountId: ResolverInputTypes["uuid"]},ResolverInputTypes["Profile"]],
Project?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Project_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null},ResolverInputTypes["Project"]],
ProjectMedia?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["ProjectMedia_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null},ResolverInputTypes["ProjectMedia"]],
ProjectMedia_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["ProjectMedia_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null},ResolverInputTypes["ProjectMedia_aggregate"]],
Project_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Project_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null},ResolverInputTypes["Project_aggregate"]],
Project_by_pk?: [{	id: ResolverInputTypes["uuid"]},ResolverInputTypes["Project"]],
Wallet?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Wallet_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Wallet_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null},ResolverInputTypes["Wallet"]],
Wallet_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Wallet_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Wallet_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null},ResolverInputTypes["Wallet_aggregate"]],
Wallet_by_pk?: [{	address: string},ResolverInputTypes["Wallet"]],
_prisma_migrations?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["_prisma_migrations_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["_prisma_migrations_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["_prisma_migrations_bool_exp"] | undefined | null},ResolverInputTypes["_prisma_migrations"]],
_prisma_migrations_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["_prisma_migrations_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["_prisma_migrations_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["_prisma_migrations_bool_exp"] | undefined | null},ResolverInputTypes["_prisma_migrations_aggregate"]],
_prisma_migrations_by_pk?: [{	id: string},ResolverInputTypes["_prisma_migrations"]],
mediaFullUrl?: [{	s3key: string},boolean | `@${string}`],
		__typename?: boolean | `@${string}`
}>;
	["smallint"]:unknown;
	/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
["smallint_comparison_exp"]: {
	_eq?: ResolverInputTypes["smallint"] | undefined | null,
	_gt?: ResolverInputTypes["smallint"] | undefined | null,
	_gte?: ResolverInputTypes["smallint"] | undefined | null,
	_in?: Array<ResolverInputTypes["smallint"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["smallint"] | undefined | null,
	_lte?: ResolverInputTypes["smallint"] | undefined | null,
	_neq?: ResolverInputTypes["smallint"] | undefined | null,
	_nin?: Array<ResolverInputTypes["smallint"]> | undefined | null
};
	["subscription_root"]: AliasType<{
Account?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Account_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Account_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Account_bool_exp"] | undefined | null},ResolverInputTypes["Account"]],
Account_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Account_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Account_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Account_bool_exp"] | undefined | null},ResolverInputTypes["Account_aggregate"]],
Account_by_pk?: [{	id: ResolverInputTypes["uuid"]},ResolverInputTypes["Account"]],
Account_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number,	/** cursor to stream the results returned by the query */
	cursor: Array<ResolverInputTypes["Account_stream_cursor_input"] | undefined | null>,	/** filter the rows returned */
	where?: ResolverInputTypes["Account_bool_exp"] | undefined | null},ResolverInputTypes["Account"]],
Media?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Media_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Media_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Media_bool_exp"] | undefined | null},ResolverInputTypes["Media"]],
Media_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Media_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Media_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Media_bool_exp"] | undefined | null},ResolverInputTypes["Media_aggregate"]],
Media_by_pk?: [{	id: ResolverInputTypes["uuid"]},ResolverInputTypes["Media"]],
Media_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number,	/** cursor to stream the results returned by the query */
	cursor: Array<ResolverInputTypes["Media_stream_cursor_input"] | undefined | null>,	/** filter the rows returned */
	where?: ResolverInputTypes["Media_bool_exp"] | undefined | null},ResolverInputTypes["Media"]],
Profile?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Profile_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Profile_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Profile_bool_exp"] | undefined | null},ResolverInputTypes["Profile"]],
Profile_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Profile_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Profile_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Profile_bool_exp"] | undefined | null},ResolverInputTypes["Profile_aggregate"]],
Profile_by_pk?: [{	accountId: ResolverInputTypes["uuid"]},ResolverInputTypes["Profile"]],
Profile_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number,	/** cursor to stream the results returned by the query */
	cursor: Array<ResolverInputTypes["Profile_stream_cursor_input"] | undefined | null>,	/** filter the rows returned */
	where?: ResolverInputTypes["Profile_bool_exp"] | undefined | null},ResolverInputTypes["Profile"]],
Project?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Project_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null},ResolverInputTypes["Project"]],
ProjectMedia?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["ProjectMedia_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null},ResolverInputTypes["ProjectMedia"]],
ProjectMedia_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["ProjectMedia_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["ProjectMedia_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null},ResolverInputTypes["ProjectMedia_aggregate"]],
ProjectMedia_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number,	/** cursor to stream the results returned by the query */
	cursor: Array<ResolverInputTypes["ProjectMedia_stream_cursor_input"] | undefined | null>,	/** filter the rows returned */
	where?: ResolverInputTypes["ProjectMedia_bool_exp"] | undefined | null},ResolverInputTypes["ProjectMedia"]],
Project_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Project_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Project_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null},ResolverInputTypes["Project_aggregate"]],
Project_by_pk?: [{	id: ResolverInputTypes["uuid"]},ResolverInputTypes["Project"]],
Project_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number,	/** cursor to stream the results returned by the query */
	cursor: Array<ResolverInputTypes["Project_stream_cursor_input"] | undefined | null>,	/** filter the rows returned */
	where?: ResolverInputTypes["Project_bool_exp"] | undefined | null},ResolverInputTypes["Project"]],
Wallet?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Wallet_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Wallet_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null},ResolverInputTypes["Wallet"]],
Wallet_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["Wallet_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["Wallet_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null},ResolverInputTypes["Wallet_aggregate"]],
Wallet_by_pk?: [{	address: string},ResolverInputTypes["Wallet"]],
Wallet_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number,	/** cursor to stream the results returned by the query */
	cursor: Array<ResolverInputTypes["Wallet_stream_cursor_input"] | undefined | null>,	/** filter the rows returned */
	where?: ResolverInputTypes["Wallet_bool_exp"] | undefined | null},ResolverInputTypes["Wallet"]],
_prisma_migrations?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["_prisma_migrations_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["_prisma_migrations_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["_prisma_migrations_bool_exp"] | undefined | null},ResolverInputTypes["_prisma_migrations"]],
_prisma_migrations_aggregate?: [{	/** distinct select on columns */
	distinct_on?: Array<ResolverInputTypes["_prisma_migrations_select_column"]> | undefined | null,	/** limit the number of rows returned */
	limit?: number | undefined | null,	/** skip the first n rows. Use only with order_by */
	offset?: number | undefined | null,	/** sort the rows by one or more columns */
	order_by?: Array<ResolverInputTypes["_prisma_migrations_order_by"]> | undefined | null,	/** filter the rows returned */
	where?: ResolverInputTypes["_prisma_migrations_bool_exp"] | undefined | null},ResolverInputTypes["_prisma_migrations_aggregate"]],
_prisma_migrations_by_pk?: [{	id: string},ResolverInputTypes["_prisma_migrations"]],
_prisma_migrations_stream?: [{	/** maximum number of rows returned in a single batch */
	batch_size: number,	/** cursor to stream the results returned by the query */
	cursor: Array<ResolverInputTypes["_prisma_migrations_stream_cursor_input"] | undefined | null>,	/** filter the rows returned */
	where?: ResolverInputTypes["_prisma_migrations_bool_exp"] | undefined | null},ResolverInputTypes["_prisma_migrations"]],
		__typename?: boolean | `@${string}`
}>;
	["timestamp"]:unknown;
	/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
["timestamp_comparison_exp"]: {
	_eq?: ResolverInputTypes["timestamp"] | undefined | null,
	_gt?: ResolverInputTypes["timestamp"] | undefined | null,
	_gte?: ResolverInputTypes["timestamp"] | undefined | null,
	_in?: Array<ResolverInputTypes["timestamp"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["timestamp"] | undefined | null,
	_lte?: ResolverInputTypes["timestamp"] | undefined | null,
	_neq?: ResolverInputTypes["timestamp"] | undefined | null,
	_nin?: Array<ResolverInputTypes["timestamp"]> | undefined | null
};
	["timestamptz"]:unknown;
	/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
["timestamptz_comparison_exp"]: {
	_eq?: ResolverInputTypes["timestamptz"] | undefined | null,
	_gt?: ResolverInputTypes["timestamptz"] | undefined | null,
	_gte?: ResolverInputTypes["timestamptz"] | undefined | null,
	_in?: Array<ResolverInputTypes["timestamptz"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["timestamptz"] | undefined | null,
	_lte?: ResolverInputTypes["timestamptz"] | undefined | null,
	_neq?: ResolverInputTypes["timestamptz"] | undefined | null,
	_nin?: Array<ResolverInputTypes["timestamptz"]> | undefined | null
};
	["uuid"]:unknown;
	/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
["uuid_comparison_exp"]: {
	_eq?: ResolverInputTypes["uuid"] | undefined | null,
	_gt?: ResolverInputTypes["uuid"] | undefined | null,
	_gte?: ResolverInputTypes["uuid"] | undefined | null,
	_in?: Array<ResolverInputTypes["uuid"]> | undefined | null,
	_is_null?: boolean | undefined | null,
	_lt?: ResolverInputTypes["uuid"] | undefined | null,
	_lte?: ResolverInputTypes["uuid"] | undefined | null,
	_neq?: ResolverInputTypes["uuid"] | undefined | null,
	_nin?: Array<ResolverInputTypes["uuid"]> | undefined | null
}
  }

export type ModelTypes = {
    ["schema"]: {
	query?: ModelTypes["query_root"] | undefined,
	mutation?: ModelTypes["mutation_root"] | undefined,
	subscription?: ModelTypes["subscription_root"] | undefined
};
	/** columns and relationships of "Account" */
["Account"]: {
		/** An array relationship */
	authoredProjects: Array<ModelTypes["Project"]>,
	/** An aggregate relationship */
	authoredProjects_aggregate: ModelTypes["Project_aggregate"],
	/** An array relationship */
	curatedProjects: Array<ModelTypes["Project"]>,
	/** An aggregate relationship */
	curatedProjects_aggregate: ModelTypes["Project_aggregate"],
	id: ModelTypes["uuid"],
	/** An array relationship */
	profile: Array<ModelTypes["Profile"]>,
	/** An aggregate relationship */
	profile_aggregate: ModelTypes["Profile_aggregate"],
	roles?: ModelTypes["_AccountRoles"] | undefined,
	status: ModelTypes["AccountStatus"],
	username: string,
	/** An array relationship */
	wallets: Array<ModelTypes["Wallet"]>,
	/** An aggregate relationship */
	wallets_aggregate: ModelTypes["Wallet_aggregate"]
};
	["AccountStatus"]:any;
	/** Boolean expression to compare columns of type "AccountStatus". All fields are combined with logical 'AND'. */
["AccountStatus_comparison_exp"]: {
	_eq?: ModelTypes["AccountStatus"] | undefined,
	_gt?: ModelTypes["AccountStatus"] | undefined,
	_gte?: ModelTypes["AccountStatus"] | undefined,
	_in?: Array<ModelTypes["AccountStatus"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["AccountStatus"] | undefined,
	_lte?: ModelTypes["AccountStatus"] | undefined,
	_neq?: ModelTypes["AccountStatus"] | undefined,
	_nin?: Array<ModelTypes["AccountStatus"]> | undefined
};
	/** aggregated selection of "Account" */
["Account_aggregate"]: {
		aggregate?: ModelTypes["Account_aggregate_fields"] | undefined,
	nodes: Array<ModelTypes["Account"]>
};
	/** aggregate fields of "Account" */
["Account_aggregate_fields"]: {
		count: number,
	max?: ModelTypes["Account_max_fields"] | undefined,
	min?: ModelTypes["Account_min_fields"] | undefined
};
	/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
["Account_bool_exp"]: {
	_and?: Array<ModelTypes["Account_bool_exp"]> | undefined,
	_not?: ModelTypes["Account_bool_exp"] | undefined,
	_or?: Array<ModelTypes["Account_bool_exp"]> | undefined,
	authoredProjects?: ModelTypes["Project_bool_exp"] | undefined,
	authoredProjects_aggregate?: ModelTypes["Project_aggregate_bool_exp"] | undefined,
	curatedProjects?: ModelTypes["Project_bool_exp"] | undefined,
	curatedProjects_aggregate?: ModelTypes["Project_aggregate_bool_exp"] | undefined,
	id?: ModelTypes["uuid_comparison_exp"] | undefined,
	profile?: ModelTypes["Profile_bool_exp"] | undefined,
	profile_aggregate?: ModelTypes["Profile_aggregate_bool_exp"] | undefined,
	roles?: ModelTypes["_AccountRoles_comparison_exp"] | undefined,
	status?: ModelTypes["AccountStatus_comparison_exp"] | undefined,
	username?: ModelTypes["String_comparison_exp"] | undefined,
	wallets?: ModelTypes["Wallet_bool_exp"] | undefined,
	wallets_aggregate?: ModelTypes["Wallet_aggregate_bool_exp"] | undefined
};
	["Account_constraint"]:Account_constraint;
	/** input type for inserting data into table "Account" */
["Account_insert_input"]: {
	authoredProjects?: ModelTypes["Project_arr_rel_insert_input"] | undefined,
	curatedProjects?: ModelTypes["Project_arr_rel_insert_input"] | undefined,
	id?: ModelTypes["uuid"] | undefined,
	profile?: ModelTypes["Profile_arr_rel_insert_input"] | undefined,
	roles?: ModelTypes["_AccountRoles"] | undefined,
	status?: ModelTypes["AccountStatus"] | undefined,
	username?: string | undefined,
	wallets?: ModelTypes["Wallet_arr_rel_insert_input"] | undefined
};
	/** aggregate max on columns */
["Account_max_fields"]: {
		id?: ModelTypes["uuid"] | undefined,
	status?: ModelTypes["AccountStatus"] | undefined,
	username?: string | undefined
};
	/** aggregate min on columns */
["Account_min_fields"]: {
		id?: ModelTypes["uuid"] | undefined,
	status?: ModelTypes["AccountStatus"] | undefined,
	username?: string | undefined
};
	/** response of any mutation on the table "Account" */
["Account_mutation_response"]: {
		/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<ModelTypes["Account"]>
};
	/** input type for inserting object relation for remote table "Account" */
["Account_obj_rel_insert_input"]: {
	data: ModelTypes["Account_insert_input"],
	/** upsert condition */
	on_conflict?: ModelTypes["Account_on_conflict"] | undefined
};
	/** on_conflict condition type for table "Account" */
["Account_on_conflict"]: {
	constraint: ModelTypes["Account_constraint"],
	update_columns: Array<ModelTypes["Account_update_column"]>,
	where?: ModelTypes["Account_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Account". */
["Account_order_by"]: {
	authoredProjects_aggregate?: ModelTypes["Project_aggregate_order_by"] | undefined,
	curatedProjects_aggregate?: ModelTypes["Project_aggregate_order_by"] | undefined,
	id?: ModelTypes["order_by"] | undefined,
	profile_aggregate?: ModelTypes["Profile_aggregate_order_by"] | undefined,
	roles?: ModelTypes["order_by"] | undefined,
	status?: ModelTypes["order_by"] | undefined,
	username?: ModelTypes["order_by"] | undefined,
	wallets_aggregate?: ModelTypes["Wallet_aggregate_order_by"] | undefined
};
	/** primary key columns input for table: Account */
["Account_pk_columns_input"]: {
	id: ModelTypes["uuid"]
};
	["Account_select_column"]:Account_select_column;
	/** input type for updating data in table "Account" */
["Account_set_input"]: {
	id?: ModelTypes["uuid"] | undefined,
	roles?: ModelTypes["_AccountRoles"] | undefined,
	status?: ModelTypes["AccountStatus"] | undefined,
	username?: string | undefined
};
	/** Streaming cursor of the table "Account" */
["Account_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ModelTypes["Account_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ModelTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Account_stream_cursor_value_input"]: {
	id?: ModelTypes["uuid"] | undefined,
	roles?: ModelTypes["_AccountRoles"] | undefined,
	status?: ModelTypes["AccountStatus"] | undefined,
	username?: string | undefined
};
	["Account_update_column"]:Account_update_column;
	["Account_updates"]: {
	/** sets the columns of the filtered rows to the given values */
	_set?: ModelTypes["Account_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: ModelTypes["Account_bool_exp"]
};
	["BlockchainNetwork"]:any;
	/** Boolean expression to compare columns of type "BlockchainNetwork". All fields are combined with logical 'AND'. */
["BlockchainNetwork_comparison_exp"]: {
	_eq?: ModelTypes["BlockchainNetwork"] | undefined,
	_gt?: ModelTypes["BlockchainNetwork"] | undefined,
	_gte?: ModelTypes["BlockchainNetwork"] | undefined,
	_in?: Array<ModelTypes["BlockchainNetwork"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["BlockchainNetwork"] | undefined,
	_lte?: ModelTypes["BlockchainNetwork"] | undefined,
	_neq?: ModelTypes["BlockchainNetwork"] | undefined,
	_nin?: Array<ModelTypes["BlockchainNetwork"]> | undefined
};
	/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
["Int_comparison_exp"]: {
	_eq?: number | undefined,
	_gt?: number | undefined,
	_gte?: number | undefined,
	_in?: Array<number> | undefined,
	_is_null?: boolean | undefined,
	_lt?: number | undefined,
	_lte?: number | undefined,
	_neq?: number | undefined,
	_nin?: Array<number> | undefined
};
	/** columns and relationships of "Media" */
["Media"]: {
		bucketId: string,
	createdAt: ModelTypes["timestamp"],
	etag: string,
	id: ModelTypes["uuid"],
	name: string,
	/** An array relationship */
	project: Array<ModelTypes["ProjectMedia"]>,
	/** An aggregate relationship */
	project_aggregate: ModelTypes["ProjectMedia_aggregate"],
	s3key: string,
	size: number,
	updatedAt: ModelTypes["timestamp"],
	/** An object relationship */
	uploader?: ModelTypes["Account"] | undefined,
	uploaderId?: ModelTypes["uuid"] | undefined,
	url: string
};
	/** aggregated selection of "Media" */
["Media_aggregate"]: {
		aggregate?: ModelTypes["Media_aggregate_fields"] | undefined,
	nodes: Array<ModelTypes["Media"]>
};
	/** aggregate fields of "Media" */
["Media_aggregate_fields"]: {
		avg?: ModelTypes["Media_avg_fields"] | undefined,
	count: number,
	max?: ModelTypes["Media_max_fields"] | undefined,
	min?: ModelTypes["Media_min_fields"] | undefined,
	stddev?: ModelTypes["Media_stddev_fields"] | undefined,
	stddev_pop?: ModelTypes["Media_stddev_pop_fields"] | undefined,
	stddev_samp?: ModelTypes["Media_stddev_samp_fields"] | undefined,
	sum?: ModelTypes["Media_sum_fields"] | undefined,
	var_pop?: ModelTypes["Media_var_pop_fields"] | undefined,
	var_samp?: ModelTypes["Media_var_samp_fields"] | undefined,
	variance?: ModelTypes["Media_variance_fields"] | undefined
};
	/** aggregate avg on columns */
["Media_avg_fields"]: {
		size?: number | undefined
};
	/** Boolean expression to filter rows from the table "Media". All fields are combined with a logical 'AND'. */
["Media_bool_exp"]: {
	_and?: Array<ModelTypes["Media_bool_exp"]> | undefined,
	_not?: ModelTypes["Media_bool_exp"] | undefined,
	_or?: Array<ModelTypes["Media_bool_exp"]> | undefined,
	bucketId?: ModelTypes["String_comparison_exp"] | undefined,
	createdAt?: ModelTypes["timestamp_comparison_exp"] | undefined,
	etag?: ModelTypes["String_comparison_exp"] | undefined,
	id?: ModelTypes["uuid_comparison_exp"] | undefined,
	name?: ModelTypes["String_comparison_exp"] | undefined,
	project?: ModelTypes["ProjectMedia_bool_exp"] | undefined,
	project_aggregate?: ModelTypes["ProjectMedia_aggregate_bool_exp"] | undefined,
	s3key?: ModelTypes["String_comparison_exp"] | undefined,
	size?: ModelTypes["Int_comparison_exp"] | undefined,
	updatedAt?: ModelTypes["timestamp_comparison_exp"] | undefined,
	uploader?: ModelTypes["Account_bool_exp"] | undefined,
	uploaderId?: ModelTypes["uuid_comparison_exp"] | undefined
};
	["Media_constraint"]:Media_constraint;
	/** input type for incrementing numeric columns in table "Media" */
["Media_inc_input"]: {
	size?: number | undefined
};
	/** input type for inserting data into table "Media" */
["Media_insert_input"]: {
	bucketId?: string | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	name?: string | undefined,
	project?: ModelTypes["ProjectMedia_arr_rel_insert_input"] | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined,
	uploader?: ModelTypes["Account_obj_rel_insert_input"] | undefined,
	uploaderId?: ModelTypes["uuid"] | undefined
};
	/** aggregate max on columns */
["Media_max_fields"]: {
		bucketId?: string | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	name?: string | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined,
	uploaderId?: ModelTypes["uuid"] | undefined
};
	/** aggregate min on columns */
["Media_min_fields"]: {
		bucketId?: string | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	name?: string | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined,
	uploaderId?: ModelTypes["uuid"] | undefined
};
	/** response of any mutation on the table "Media" */
["Media_mutation_response"]: {
		/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<ModelTypes["Media"]>
};
	/** input type for inserting object relation for remote table "Media" */
["Media_obj_rel_insert_input"]: {
	data: ModelTypes["Media_insert_input"],
	/** upsert condition */
	on_conflict?: ModelTypes["Media_on_conflict"] | undefined
};
	/** on_conflict condition type for table "Media" */
["Media_on_conflict"]: {
	constraint: ModelTypes["Media_constraint"],
	update_columns: Array<ModelTypes["Media_update_column"]>,
	where?: ModelTypes["Media_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Media". */
["Media_order_by"]: {
	bucketId?: ModelTypes["order_by"] | undefined,
	createdAt?: ModelTypes["order_by"] | undefined,
	etag?: ModelTypes["order_by"] | undefined,
	id?: ModelTypes["order_by"] | undefined,
	name?: ModelTypes["order_by"] | undefined,
	project_aggregate?: ModelTypes["ProjectMedia_aggregate_order_by"] | undefined,
	s3key?: ModelTypes["order_by"] | undefined,
	size?: ModelTypes["order_by"] | undefined,
	updatedAt?: ModelTypes["order_by"] | undefined,
	uploader?: ModelTypes["Account_order_by"] | undefined,
	uploaderId?: ModelTypes["order_by"] | undefined
};
	/** primary key columns input for table: Media */
["Media_pk_columns_input"]: {
	id: ModelTypes["uuid"]
};
	["Media_select_column"]:Media_select_column;
	/** input type for updating data in table "Media" */
["Media_set_input"]: {
	bucketId?: string | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	name?: string | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined,
	uploaderId?: ModelTypes["uuid"] | undefined
};
	/** aggregate stddev on columns */
["Media_stddev_fields"]: {
		size?: number | undefined
};
	/** aggregate stddev_pop on columns */
["Media_stddev_pop_fields"]: {
		size?: number | undefined
};
	/** aggregate stddev_samp on columns */
["Media_stddev_samp_fields"]: {
		size?: number | undefined
};
	/** Streaming cursor of the table "Media" */
["Media_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ModelTypes["Media_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ModelTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Media_stream_cursor_value_input"]: {
	bucketId?: string | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	name?: string | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined,
	uploaderId?: ModelTypes["uuid"] | undefined
};
	/** aggregate sum on columns */
["Media_sum_fields"]: {
		size?: number | undefined
};
	["Media_update_column"]:Media_update_column;
	["Media_updates"]: {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: ModelTypes["Media_inc_input"] | undefined,
	/** sets the columns of the filtered rows to the given values */
	_set?: ModelTypes["Media_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: ModelTypes["Media_bool_exp"]
};
	/** aggregate var_pop on columns */
["Media_var_pop_fields"]: {
		size?: number | undefined
};
	/** aggregate var_samp on columns */
["Media_var_samp_fields"]: {
		size?: number | undefined
};
	/** aggregate variance on columns */
["Media_variance_fields"]: {
		size?: number | undefined
};
	/** columns and relationships of "Profile" */
["Profile"]: {
		accountId: ModelTypes["uuid"],
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** aggregated selection of "Profile" */
["Profile_aggregate"]: {
		aggregate?: ModelTypes["Profile_aggregate_fields"] | undefined,
	nodes: Array<ModelTypes["Profile"]>
};
	["Profile_aggregate_bool_exp"]: {
	count?: ModelTypes["Profile_aggregate_bool_exp_count"] | undefined
};
	["Profile_aggregate_bool_exp_count"]: {
	arguments?: Array<ModelTypes["Profile_select_column"]> | undefined,
	distinct?: boolean | undefined,
	filter?: ModelTypes["Profile_bool_exp"] | undefined,
	predicate: ModelTypes["Int_comparison_exp"]
};
	/** aggregate fields of "Profile" */
["Profile_aggregate_fields"]: {
		count: number,
	max?: ModelTypes["Profile_max_fields"] | undefined,
	min?: ModelTypes["Profile_min_fields"] | undefined
};
	/** order by aggregate values of table "Profile" */
["Profile_aggregate_order_by"]: {
	count?: ModelTypes["order_by"] | undefined,
	max?: ModelTypes["Profile_max_order_by"] | undefined,
	min?: ModelTypes["Profile_min_order_by"] | undefined
};
	/** input type for inserting array relation for remote table "Profile" */
["Profile_arr_rel_insert_input"]: {
	data: Array<ModelTypes["Profile_insert_input"]>,
	/** upsert condition */
	on_conflict?: ModelTypes["Profile_on_conflict"] | undefined
};
	/** Boolean expression to filter rows from the table "Profile". All fields are combined with a logical 'AND'. */
["Profile_bool_exp"]: {
	_and?: Array<ModelTypes["Profile_bool_exp"]> | undefined,
	_not?: ModelTypes["Profile_bool_exp"] | undefined,
	_or?: Array<ModelTypes["Profile_bool_exp"]> | undefined,
	accountId?: ModelTypes["uuid_comparison_exp"] | undefined,
	description?: ModelTypes["String_comparison_exp"] | undefined,
	instagram?: ModelTypes["String_comparison_exp"] | undefined,
	picture?: ModelTypes["String_comparison_exp"] | undefined,
	twitter?: ModelTypes["String_comparison_exp"] | undefined,
	website?: ModelTypes["String_comparison_exp"] | undefined
};
	["Profile_constraint"]:Profile_constraint;
	/** input type for inserting data into table "Profile" */
["Profile_insert_input"]: {
	accountId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** aggregate max on columns */
["Profile_max_fields"]: {
		accountId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** order by max() on columns of table "Profile" */
["Profile_max_order_by"]: {
	accountId?: ModelTypes["order_by"] | undefined,
	description?: ModelTypes["order_by"] | undefined,
	instagram?: ModelTypes["order_by"] | undefined,
	picture?: ModelTypes["order_by"] | undefined,
	twitter?: ModelTypes["order_by"] | undefined,
	website?: ModelTypes["order_by"] | undefined
};
	/** aggregate min on columns */
["Profile_min_fields"]: {
		accountId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** order by min() on columns of table "Profile" */
["Profile_min_order_by"]: {
	accountId?: ModelTypes["order_by"] | undefined,
	description?: ModelTypes["order_by"] | undefined,
	instagram?: ModelTypes["order_by"] | undefined,
	picture?: ModelTypes["order_by"] | undefined,
	twitter?: ModelTypes["order_by"] | undefined,
	website?: ModelTypes["order_by"] | undefined
};
	/** response of any mutation on the table "Profile" */
["Profile_mutation_response"]: {
		/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<ModelTypes["Profile"]>
};
	/** on_conflict condition type for table "Profile" */
["Profile_on_conflict"]: {
	constraint: ModelTypes["Profile_constraint"],
	update_columns: Array<ModelTypes["Profile_update_column"]>,
	where?: ModelTypes["Profile_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Profile". */
["Profile_order_by"]: {
	accountId?: ModelTypes["order_by"] | undefined,
	description?: ModelTypes["order_by"] | undefined,
	instagram?: ModelTypes["order_by"] | undefined,
	picture?: ModelTypes["order_by"] | undefined,
	twitter?: ModelTypes["order_by"] | undefined,
	website?: ModelTypes["order_by"] | undefined
};
	/** primary key columns input for table: Profile */
["Profile_pk_columns_input"]: {
	accountId: ModelTypes["uuid"]
};
	["Profile_select_column"]:Profile_select_column;
	/** input type for updating data in table "Profile" */
["Profile_set_input"]: {
	accountId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** Streaming cursor of the table "Profile" */
["Profile_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ModelTypes["Profile_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ModelTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Profile_stream_cursor_value_input"]: {
	accountId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	["Profile_update_column"]:Profile_update_column;
	["Profile_updates"]: {
	/** sets the columns of the filtered rows to the given values */
	_set?: ModelTypes["Profile_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: ModelTypes["Profile_bool_exp"]
};
	/** columns and relationships of "Project" */
["Project"]: {
		/** An object relationship */
	author: ModelTypes["Account"],
	authorId: ModelTypes["uuid"],
	blockchain?: ModelTypes["BlockchainNetwork"] | undefined,
	createdAt: ModelTypes["timestamp"],
	/** An object relationship */
	curator?: ModelTypes["Account"] | undefined,
	curatorId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	id: ModelTypes["uuid"],
	pricing?: ModelTypes["jsonb"] | undefined,
	/** An array relationship */
	projectMedias: Array<ModelTypes["ProjectMedia"]>,
	/** An aggregate relationship */
	projectMedias_aggregate: ModelTypes["ProjectMedia_aggregate"],
	releaseAt?: ModelTypes["timestamp"] | undefined,
	state: ModelTypes["ProjectState"],
	storage?: ModelTypes["Storage"] | undefined,
	title: string,
	updatedAt: ModelTypes["timestamp"]
};
	/** columns and relationships of "ProjectMedia" */
["ProjectMedia"]: {
		index: ModelTypes["smallint"],
	/** An object relationship */
	media: ModelTypes["Media"],
	mediaId: ModelTypes["uuid"],
	/** An object relationship */
	project: ModelTypes["Project"],
	projectId: ModelTypes["uuid"]
};
	/** aggregated selection of "ProjectMedia" */
["ProjectMedia_aggregate"]: {
		aggregate?: ModelTypes["ProjectMedia_aggregate_fields"] | undefined,
	nodes: Array<ModelTypes["ProjectMedia"]>
};
	["ProjectMedia_aggregate_bool_exp"]: {
	count?: ModelTypes["ProjectMedia_aggregate_bool_exp_count"] | undefined
};
	["ProjectMedia_aggregate_bool_exp_count"]: {
	arguments?: Array<ModelTypes["ProjectMedia_select_column"]> | undefined,
	distinct?: boolean | undefined,
	filter?: ModelTypes["ProjectMedia_bool_exp"] | undefined,
	predicate: ModelTypes["Int_comparison_exp"]
};
	/** aggregate fields of "ProjectMedia" */
["ProjectMedia_aggregate_fields"]: {
		avg?: ModelTypes["ProjectMedia_avg_fields"] | undefined,
	count: number,
	max?: ModelTypes["ProjectMedia_max_fields"] | undefined,
	min?: ModelTypes["ProjectMedia_min_fields"] | undefined,
	stddev?: ModelTypes["ProjectMedia_stddev_fields"] | undefined,
	stddev_pop?: ModelTypes["ProjectMedia_stddev_pop_fields"] | undefined,
	stddev_samp?: ModelTypes["ProjectMedia_stddev_samp_fields"] | undefined,
	sum?: ModelTypes["ProjectMedia_sum_fields"] | undefined,
	var_pop?: ModelTypes["ProjectMedia_var_pop_fields"] | undefined,
	var_samp?: ModelTypes["ProjectMedia_var_samp_fields"] | undefined,
	variance?: ModelTypes["ProjectMedia_variance_fields"] | undefined
};
	/** order by aggregate values of table "ProjectMedia" */
["ProjectMedia_aggregate_order_by"]: {
	avg?: ModelTypes["ProjectMedia_avg_order_by"] | undefined,
	count?: ModelTypes["order_by"] | undefined,
	max?: ModelTypes["ProjectMedia_max_order_by"] | undefined,
	min?: ModelTypes["ProjectMedia_min_order_by"] | undefined,
	stddev?: ModelTypes["ProjectMedia_stddev_order_by"] | undefined,
	stddev_pop?: ModelTypes["ProjectMedia_stddev_pop_order_by"] | undefined,
	stddev_samp?: ModelTypes["ProjectMedia_stddev_samp_order_by"] | undefined,
	sum?: ModelTypes["ProjectMedia_sum_order_by"] | undefined,
	var_pop?: ModelTypes["ProjectMedia_var_pop_order_by"] | undefined,
	var_samp?: ModelTypes["ProjectMedia_var_samp_order_by"] | undefined,
	variance?: ModelTypes["ProjectMedia_variance_order_by"] | undefined
};
	/** input type for inserting array relation for remote table "ProjectMedia" */
["ProjectMedia_arr_rel_insert_input"]: {
	data: Array<ModelTypes["ProjectMedia_insert_input"]>,
	/** upsert condition */
	on_conflict?: ModelTypes["ProjectMedia_on_conflict"] | undefined
};
	/** aggregate avg on columns */
["ProjectMedia_avg_fields"]: {
		index?: number | undefined
};
	/** order by avg() on columns of table "ProjectMedia" */
["ProjectMedia_avg_order_by"]: {
	index?: ModelTypes["order_by"] | undefined
};
	/** Boolean expression to filter rows from the table "ProjectMedia". All fields are combined with a logical 'AND'. */
["ProjectMedia_bool_exp"]: {
	_and?: Array<ModelTypes["ProjectMedia_bool_exp"]> | undefined,
	_not?: ModelTypes["ProjectMedia_bool_exp"] | undefined,
	_or?: Array<ModelTypes["ProjectMedia_bool_exp"]> | undefined,
	index?: ModelTypes["smallint_comparison_exp"] | undefined,
	media?: ModelTypes["Media_bool_exp"] | undefined,
	mediaId?: ModelTypes["uuid_comparison_exp"] | undefined,
	project?: ModelTypes["Project_bool_exp"] | undefined,
	projectId?: ModelTypes["uuid_comparison_exp"] | undefined
};
	["ProjectMedia_constraint"]:ProjectMedia_constraint;
	/** input type for incrementing numeric columns in table "ProjectMedia" */
["ProjectMedia_inc_input"]: {
	index?: ModelTypes["smallint"] | undefined
};
	/** input type for inserting data into table "ProjectMedia" */
["ProjectMedia_insert_input"]: {
	index?: ModelTypes["smallint"] | undefined,
	media?: ModelTypes["Media_obj_rel_insert_input"] | undefined,
	mediaId?: ModelTypes["uuid"] | undefined,
	project?: ModelTypes["Project_obj_rel_insert_input"] | undefined,
	projectId?: ModelTypes["uuid"] | undefined
};
	/** aggregate max on columns */
["ProjectMedia_max_fields"]: {
		index?: ModelTypes["smallint"] | undefined,
	mediaId?: ModelTypes["uuid"] | undefined,
	projectId?: ModelTypes["uuid"] | undefined
};
	/** order by max() on columns of table "ProjectMedia" */
["ProjectMedia_max_order_by"]: {
	index?: ModelTypes["order_by"] | undefined,
	mediaId?: ModelTypes["order_by"] | undefined,
	projectId?: ModelTypes["order_by"] | undefined
};
	/** aggregate min on columns */
["ProjectMedia_min_fields"]: {
		index?: ModelTypes["smallint"] | undefined,
	mediaId?: ModelTypes["uuid"] | undefined,
	projectId?: ModelTypes["uuid"] | undefined
};
	/** order by min() on columns of table "ProjectMedia" */
["ProjectMedia_min_order_by"]: {
	index?: ModelTypes["order_by"] | undefined,
	mediaId?: ModelTypes["order_by"] | undefined,
	projectId?: ModelTypes["order_by"] | undefined
};
	/** response of any mutation on the table "ProjectMedia" */
["ProjectMedia_mutation_response"]: {
		/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<ModelTypes["ProjectMedia"]>
};
	/** on_conflict condition type for table "ProjectMedia" */
["ProjectMedia_on_conflict"]: {
	constraint: ModelTypes["ProjectMedia_constraint"],
	update_columns: Array<ModelTypes["ProjectMedia_update_column"]>,
	where?: ModelTypes["ProjectMedia_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "ProjectMedia". */
["ProjectMedia_order_by"]: {
	index?: ModelTypes["order_by"] | undefined,
	media?: ModelTypes["Media_order_by"] | undefined,
	mediaId?: ModelTypes["order_by"] | undefined,
	project?: ModelTypes["Project_order_by"] | undefined,
	projectId?: ModelTypes["order_by"] | undefined
};
	["ProjectMedia_select_column"]:ProjectMedia_select_column;
	/** input type for updating data in table "ProjectMedia" */
["ProjectMedia_set_input"]: {
	index?: ModelTypes["smallint"] | undefined,
	mediaId?: ModelTypes["uuid"] | undefined,
	projectId?: ModelTypes["uuid"] | undefined
};
	/** aggregate stddev on columns */
["ProjectMedia_stddev_fields"]: {
		index?: number | undefined
};
	/** order by stddev() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_order_by"]: {
	index?: ModelTypes["order_by"] | undefined
};
	/** aggregate stddev_pop on columns */
["ProjectMedia_stddev_pop_fields"]: {
		index?: number | undefined
};
	/** order by stddev_pop() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_pop_order_by"]: {
	index?: ModelTypes["order_by"] | undefined
};
	/** aggregate stddev_samp on columns */
["ProjectMedia_stddev_samp_fields"]: {
		index?: number | undefined
};
	/** order by stddev_samp() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_samp_order_by"]: {
	index?: ModelTypes["order_by"] | undefined
};
	/** Streaming cursor of the table "ProjectMedia" */
["ProjectMedia_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ModelTypes["ProjectMedia_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ModelTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["ProjectMedia_stream_cursor_value_input"]: {
	index?: ModelTypes["smallint"] | undefined,
	mediaId?: ModelTypes["uuid"] | undefined,
	projectId?: ModelTypes["uuid"] | undefined
};
	/** aggregate sum on columns */
["ProjectMedia_sum_fields"]: {
		index?: ModelTypes["smallint"] | undefined
};
	/** order by sum() on columns of table "ProjectMedia" */
["ProjectMedia_sum_order_by"]: {
	index?: ModelTypes["order_by"] | undefined
};
	["ProjectMedia_update_column"]:ProjectMedia_update_column;
	["ProjectMedia_updates"]: {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: ModelTypes["ProjectMedia_inc_input"] | undefined,
	/** sets the columns of the filtered rows to the given values */
	_set?: ModelTypes["ProjectMedia_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: ModelTypes["ProjectMedia_bool_exp"]
};
	/** aggregate var_pop on columns */
["ProjectMedia_var_pop_fields"]: {
		index?: number | undefined
};
	/** order by var_pop() on columns of table "ProjectMedia" */
["ProjectMedia_var_pop_order_by"]: {
	index?: ModelTypes["order_by"] | undefined
};
	/** aggregate var_samp on columns */
["ProjectMedia_var_samp_fields"]: {
		index?: number | undefined
};
	/** order by var_samp() on columns of table "ProjectMedia" */
["ProjectMedia_var_samp_order_by"]: {
	index?: ModelTypes["order_by"] | undefined
};
	/** aggregate variance on columns */
["ProjectMedia_variance_fields"]: {
		index?: number | undefined
};
	/** order by variance() on columns of table "ProjectMedia" */
["ProjectMedia_variance_order_by"]: {
	index?: ModelTypes["order_by"] | undefined
};
	["ProjectState"]:any;
	/** Boolean expression to compare columns of type "ProjectState". All fields are combined with logical 'AND'. */
["ProjectState_comparison_exp"]: {
	_eq?: ModelTypes["ProjectState"] | undefined,
	_gt?: ModelTypes["ProjectState"] | undefined,
	_gte?: ModelTypes["ProjectState"] | undefined,
	_in?: Array<ModelTypes["ProjectState"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["ProjectState"] | undefined,
	_lte?: ModelTypes["ProjectState"] | undefined,
	_neq?: ModelTypes["ProjectState"] | undefined,
	_nin?: Array<ModelTypes["ProjectState"]> | undefined
};
	/** aggregated selection of "Project" */
["Project_aggregate"]: {
		aggregate?: ModelTypes["Project_aggregate_fields"] | undefined,
	nodes: Array<ModelTypes["Project"]>
};
	["Project_aggregate_bool_exp"]: {
	count?: ModelTypes["Project_aggregate_bool_exp_count"] | undefined
};
	["Project_aggregate_bool_exp_count"]: {
	arguments?: Array<ModelTypes["Project_select_column"]> | undefined,
	distinct?: boolean | undefined,
	filter?: ModelTypes["Project_bool_exp"] | undefined,
	predicate: ModelTypes["Int_comparison_exp"]
};
	/** aggregate fields of "Project" */
["Project_aggregate_fields"]: {
		count: number,
	max?: ModelTypes["Project_max_fields"] | undefined,
	min?: ModelTypes["Project_min_fields"] | undefined
};
	/** order by aggregate values of table "Project" */
["Project_aggregate_order_by"]: {
	count?: ModelTypes["order_by"] | undefined,
	max?: ModelTypes["Project_max_order_by"] | undefined,
	min?: ModelTypes["Project_min_order_by"] | undefined
};
	/** append existing jsonb value of filtered columns with new jsonb value */
["Project_append_input"]: {
	pricing?: ModelTypes["jsonb"] | undefined
};
	/** input type for inserting array relation for remote table "Project" */
["Project_arr_rel_insert_input"]: {
	data: Array<ModelTypes["Project_insert_input"]>,
	/** upsert condition */
	on_conflict?: ModelTypes["Project_on_conflict"] | undefined
};
	/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
["Project_bool_exp"]: {
	_and?: Array<ModelTypes["Project_bool_exp"]> | undefined,
	_not?: ModelTypes["Project_bool_exp"] | undefined,
	_or?: Array<ModelTypes["Project_bool_exp"]> | undefined,
	author?: ModelTypes["Account_bool_exp"] | undefined,
	authorId?: ModelTypes["uuid_comparison_exp"] | undefined,
	blockchain?: ModelTypes["BlockchainNetwork_comparison_exp"] | undefined,
	createdAt?: ModelTypes["timestamp_comparison_exp"] | undefined,
	curator?: ModelTypes["Account_bool_exp"] | undefined,
	curatorId?: ModelTypes["uuid_comparison_exp"] | undefined,
	description?: ModelTypes["String_comparison_exp"] | undefined,
	id?: ModelTypes["uuid_comparison_exp"] | undefined,
	pricing?: ModelTypes["jsonb_comparison_exp"] | undefined,
	projectMedias?: ModelTypes["ProjectMedia_bool_exp"] | undefined,
	projectMedias_aggregate?: ModelTypes["ProjectMedia_aggregate_bool_exp"] | undefined,
	releaseAt?: ModelTypes["timestamp_comparison_exp"] | undefined,
	state?: ModelTypes["ProjectState_comparison_exp"] | undefined,
	storage?: ModelTypes["Storage_comparison_exp"] | undefined,
	title?: ModelTypes["String_comparison_exp"] | undefined,
	updatedAt?: ModelTypes["timestamp_comparison_exp"] | undefined
};
	["Project_constraint"]:Project_constraint;
	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
["Project_delete_at_path_input"]: {
	pricing?: Array<string> | undefined
};
	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
["Project_delete_elem_input"]: {
	pricing?: number | undefined
};
	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
["Project_delete_key_input"]: {
	pricing?: string | undefined
};
	/** input type for inserting data into table "Project" */
["Project_insert_input"]: {
	author?: ModelTypes["Account_obj_rel_insert_input"] | undefined,
	authorId?: ModelTypes["uuid"] | undefined,
	blockchain?: ModelTypes["BlockchainNetwork"] | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	curator?: ModelTypes["Account_obj_rel_insert_input"] | undefined,
	curatorId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	pricing?: ModelTypes["jsonb"] | undefined,
	projectMedias?: ModelTypes["ProjectMedia_arr_rel_insert_input"] | undefined,
	releaseAt?: ModelTypes["timestamp"] | undefined,
	state?: ModelTypes["ProjectState"] | undefined,
	storage?: ModelTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined
};
	/** aggregate max on columns */
["Project_max_fields"]: {
		authorId?: ModelTypes["uuid"] | undefined,
	blockchain?: ModelTypes["BlockchainNetwork"] | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	curatorId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	releaseAt?: ModelTypes["timestamp"] | undefined,
	state?: ModelTypes["ProjectState"] | undefined,
	storage?: ModelTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined
};
	/** order by max() on columns of table "Project" */
["Project_max_order_by"]: {
	authorId?: ModelTypes["order_by"] | undefined,
	blockchain?: ModelTypes["order_by"] | undefined,
	createdAt?: ModelTypes["order_by"] | undefined,
	curatorId?: ModelTypes["order_by"] | undefined,
	description?: ModelTypes["order_by"] | undefined,
	id?: ModelTypes["order_by"] | undefined,
	releaseAt?: ModelTypes["order_by"] | undefined,
	state?: ModelTypes["order_by"] | undefined,
	storage?: ModelTypes["order_by"] | undefined,
	title?: ModelTypes["order_by"] | undefined,
	updatedAt?: ModelTypes["order_by"] | undefined
};
	/** aggregate min on columns */
["Project_min_fields"]: {
		authorId?: ModelTypes["uuid"] | undefined,
	blockchain?: ModelTypes["BlockchainNetwork"] | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	curatorId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	releaseAt?: ModelTypes["timestamp"] | undefined,
	state?: ModelTypes["ProjectState"] | undefined,
	storage?: ModelTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined
};
	/** order by min() on columns of table "Project" */
["Project_min_order_by"]: {
	authorId?: ModelTypes["order_by"] | undefined,
	blockchain?: ModelTypes["order_by"] | undefined,
	createdAt?: ModelTypes["order_by"] | undefined,
	curatorId?: ModelTypes["order_by"] | undefined,
	description?: ModelTypes["order_by"] | undefined,
	id?: ModelTypes["order_by"] | undefined,
	releaseAt?: ModelTypes["order_by"] | undefined,
	state?: ModelTypes["order_by"] | undefined,
	storage?: ModelTypes["order_by"] | undefined,
	title?: ModelTypes["order_by"] | undefined,
	updatedAt?: ModelTypes["order_by"] | undefined
};
	/** response of any mutation on the table "Project" */
["Project_mutation_response"]: {
		/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<ModelTypes["Project"]>
};
	/** input type for inserting object relation for remote table "Project" */
["Project_obj_rel_insert_input"]: {
	data: ModelTypes["Project_insert_input"],
	/** upsert condition */
	on_conflict?: ModelTypes["Project_on_conflict"] | undefined
};
	/** on_conflict condition type for table "Project" */
["Project_on_conflict"]: {
	constraint: ModelTypes["Project_constraint"],
	update_columns: Array<ModelTypes["Project_update_column"]>,
	where?: ModelTypes["Project_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Project". */
["Project_order_by"]: {
	author?: ModelTypes["Account_order_by"] | undefined,
	authorId?: ModelTypes["order_by"] | undefined,
	blockchain?: ModelTypes["order_by"] | undefined,
	createdAt?: ModelTypes["order_by"] | undefined,
	curator?: ModelTypes["Account_order_by"] | undefined,
	curatorId?: ModelTypes["order_by"] | undefined,
	description?: ModelTypes["order_by"] | undefined,
	id?: ModelTypes["order_by"] | undefined,
	pricing?: ModelTypes["order_by"] | undefined,
	projectMedias_aggregate?: ModelTypes["ProjectMedia_aggregate_order_by"] | undefined,
	releaseAt?: ModelTypes["order_by"] | undefined,
	state?: ModelTypes["order_by"] | undefined,
	storage?: ModelTypes["order_by"] | undefined,
	title?: ModelTypes["order_by"] | undefined,
	updatedAt?: ModelTypes["order_by"] | undefined
};
	/** primary key columns input for table: Project */
["Project_pk_columns_input"]: {
	id: ModelTypes["uuid"]
};
	/** prepend existing jsonb value of filtered columns with new jsonb value */
["Project_prepend_input"]: {
	pricing?: ModelTypes["jsonb"] | undefined
};
	["Project_select_column"]:Project_select_column;
	/** input type for updating data in table "Project" */
["Project_set_input"]: {
	authorId?: ModelTypes["uuid"] | undefined,
	blockchain?: ModelTypes["BlockchainNetwork"] | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	curatorId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	pricing?: ModelTypes["jsonb"] | undefined,
	releaseAt?: ModelTypes["timestamp"] | undefined,
	state?: ModelTypes["ProjectState"] | undefined,
	storage?: ModelTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined
};
	/** Streaming cursor of the table "Project" */
["Project_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ModelTypes["Project_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ModelTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Project_stream_cursor_value_input"]: {
	authorId?: ModelTypes["uuid"] | undefined,
	blockchain?: ModelTypes["BlockchainNetwork"] | undefined,
	createdAt?: ModelTypes["timestamp"] | undefined,
	curatorId?: ModelTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: ModelTypes["uuid"] | undefined,
	pricing?: ModelTypes["jsonb"] | undefined,
	releaseAt?: ModelTypes["timestamp"] | undefined,
	state?: ModelTypes["ProjectState"] | undefined,
	storage?: ModelTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: ModelTypes["timestamp"] | undefined
};
	["Project_update_column"]:Project_update_column;
	["Project_updates"]: {
	/** append existing jsonb value of filtered columns with new jsonb value */
	_append?: ModelTypes["Project_append_input"] | undefined,
	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
	_delete_at_path?: ModelTypes["Project_delete_at_path_input"] | undefined,
	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
	_delete_elem?: ModelTypes["Project_delete_elem_input"] | undefined,
	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
	_delete_key?: ModelTypes["Project_delete_key_input"] | undefined,
	/** prepend existing jsonb value of filtered columns with new jsonb value */
	_prepend?: ModelTypes["Project_prepend_input"] | undefined,
	/** sets the columns of the filtered rows to the given values */
	_set?: ModelTypes["Project_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: ModelTypes["Project_bool_exp"]
};
	["Storage"]:any;
	/** Boolean expression to compare columns of type "Storage". All fields are combined with logical 'AND'. */
["Storage_comparison_exp"]: {
	_eq?: ModelTypes["Storage"] | undefined,
	_gt?: ModelTypes["Storage"] | undefined,
	_gte?: ModelTypes["Storage"] | undefined,
	_in?: Array<ModelTypes["Storage"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["Storage"] | undefined,
	_lte?: ModelTypes["Storage"] | undefined,
	_neq?: ModelTypes["Storage"] | undefined,
	_nin?: Array<ModelTypes["Storage"]> | undefined
};
	/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
["String_comparison_exp"]: {
	_eq?: string | undefined,
	_gt?: string | undefined,
	_gte?: string | undefined,
	/** does the column match the given case-insensitive pattern */
	_ilike?: string | undefined,
	_in?: Array<string> | undefined,
	/** does the column match the given POSIX regular expression, case insensitive */
	_iregex?: string | undefined,
	_is_null?: boolean | undefined,
	/** does the column match the given pattern */
	_like?: string | undefined,
	_lt?: string | undefined,
	_lte?: string | undefined,
	_neq?: string | undefined,
	/** does the column NOT match the given case-insensitive pattern */
	_nilike?: string | undefined,
	_nin?: Array<string> | undefined,
	/** does the column NOT match the given POSIX regular expression, case insensitive */
	_niregex?: string | undefined,
	/** does the column NOT match the given pattern */
	_nlike?: string | undefined,
	/** does the column NOT match the given POSIX regular expression, case sensitive */
	_nregex?: string | undefined,
	/** does the column NOT match the given SQL regular expression */
	_nsimilar?: string | undefined,
	/** does the column match the given POSIX regular expression, case sensitive */
	_regex?: string | undefined,
	/** does the column match the given SQL regular expression */
	_similar?: string | undefined
};
	/** columns and relationships of "Wallet" */
["Wallet"]: {
		accountId: ModelTypes["uuid"],
	address: string,
	network: ModelTypes["BlockchainNetwork"]
};
	/** aggregated selection of "Wallet" */
["Wallet_aggregate"]: {
		aggregate?: ModelTypes["Wallet_aggregate_fields"] | undefined,
	nodes: Array<ModelTypes["Wallet"]>
};
	["Wallet_aggregate_bool_exp"]: {
	count?: ModelTypes["Wallet_aggregate_bool_exp_count"] | undefined
};
	["Wallet_aggregate_bool_exp_count"]: {
	arguments?: Array<ModelTypes["Wallet_select_column"]> | undefined,
	distinct?: boolean | undefined,
	filter?: ModelTypes["Wallet_bool_exp"] | undefined,
	predicate: ModelTypes["Int_comparison_exp"]
};
	/** aggregate fields of "Wallet" */
["Wallet_aggregate_fields"]: {
		count: number,
	max?: ModelTypes["Wallet_max_fields"] | undefined,
	min?: ModelTypes["Wallet_min_fields"] | undefined
};
	/** order by aggregate values of table "Wallet" */
["Wallet_aggregate_order_by"]: {
	count?: ModelTypes["order_by"] | undefined,
	max?: ModelTypes["Wallet_max_order_by"] | undefined,
	min?: ModelTypes["Wallet_min_order_by"] | undefined
};
	/** input type for inserting array relation for remote table "Wallet" */
["Wallet_arr_rel_insert_input"]: {
	data: Array<ModelTypes["Wallet_insert_input"]>,
	/** upsert condition */
	on_conflict?: ModelTypes["Wallet_on_conflict"] | undefined
};
	/** Boolean expression to filter rows from the table "Wallet". All fields are combined with a logical 'AND'. */
["Wallet_bool_exp"]: {
	_and?: Array<ModelTypes["Wallet_bool_exp"]> | undefined,
	_not?: ModelTypes["Wallet_bool_exp"] | undefined,
	_or?: Array<ModelTypes["Wallet_bool_exp"]> | undefined,
	accountId?: ModelTypes["uuid_comparison_exp"] | undefined,
	address?: ModelTypes["String_comparison_exp"] | undefined,
	network?: ModelTypes["BlockchainNetwork_comparison_exp"] | undefined
};
	["Wallet_constraint"]:Wallet_constraint;
	/** input type for inserting data into table "Wallet" */
["Wallet_insert_input"]: {
	accountId?: ModelTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: ModelTypes["BlockchainNetwork"] | undefined
};
	/** aggregate max on columns */
["Wallet_max_fields"]: {
		accountId?: ModelTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: ModelTypes["BlockchainNetwork"] | undefined
};
	/** order by max() on columns of table "Wallet" */
["Wallet_max_order_by"]: {
	accountId?: ModelTypes["order_by"] | undefined,
	address?: ModelTypes["order_by"] | undefined,
	network?: ModelTypes["order_by"] | undefined
};
	/** aggregate min on columns */
["Wallet_min_fields"]: {
		accountId?: ModelTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: ModelTypes["BlockchainNetwork"] | undefined
};
	/** order by min() on columns of table "Wallet" */
["Wallet_min_order_by"]: {
	accountId?: ModelTypes["order_by"] | undefined,
	address?: ModelTypes["order_by"] | undefined,
	network?: ModelTypes["order_by"] | undefined
};
	/** response of any mutation on the table "Wallet" */
["Wallet_mutation_response"]: {
		/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<ModelTypes["Wallet"]>
};
	/** on_conflict condition type for table "Wallet" */
["Wallet_on_conflict"]: {
	constraint: ModelTypes["Wallet_constraint"],
	update_columns: Array<ModelTypes["Wallet_update_column"]>,
	where?: ModelTypes["Wallet_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Wallet". */
["Wallet_order_by"]: {
	accountId?: ModelTypes["order_by"] | undefined,
	address?: ModelTypes["order_by"] | undefined,
	network?: ModelTypes["order_by"] | undefined
};
	/** primary key columns input for table: Wallet */
["Wallet_pk_columns_input"]: {
	address: string
};
	["Wallet_select_column"]:Wallet_select_column;
	/** input type for updating data in table "Wallet" */
["Wallet_set_input"]: {
	accountId?: ModelTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: ModelTypes["BlockchainNetwork"] | undefined
};
	/** Streaming cursor of the table "Wallet" */
["Wallet_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ModelTypes["Wallet_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ModelTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Wallet_stream_cursor_value_input"]: {
	accountId?: ModelTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: ModelTypes["BlockchainNetwork"] | undefined
};
	["Wallet_update_column"]:Wallet_update_column;
	["Wallet_updates"]: {
	/** sets the columns of the filtered rows to the given values */
	_set?: ModelTypes["Wallet_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: ModelTypes["Wallet_bool_exp"]
};
	["_AccountRoles"]:any;
	/** Boolean expression to compare columns of type "_AccountRoles". All fields are combined with logical 'AND'. */
["_AccountRoles_comparison_exp"]: {
	_eq?: ModelTypes["_AccountRoles"] | undefined,
	_gt?: ModelTypes["_AccountRoles"] | undefined,
	_gte?: ModelTypes["_AccountRoles"] | undefined,
	_in?: Array<ModelTypes["_AccountRoles"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["_AccountRoles"] | undefined,
	_lte?: ModelTypes["_AccountRoles"] | undefined,
	_neq?: ModelTypes["_AccountRoles"] | undefined,
	_nin?: Array<ModelTypes["_AccountRoles"]> | undefined
};
	/** columns and relationships of "_prisma_migrations" */
["_prisma_migrations"]: {
		applied_steps_count: number,
	checksum: string,
	finished_at?: ModelTypes["timestamptz"] | undefined,
	id: string,
	logs?: string | undefined,
	migration_name: string,
	rolled_back_at?: ModelTypes["timestamptz"] | undefined,
	started_at: ModelTypes["timestamptz"]
};
	/** aggregated selection of "_prisma_migrations" */
["_prisma_migrations_aggregate"]: {
		aggregate?: ModelTypes["_prisma_migrations_aggregate_fields"] | undefined,
	nodes: Array<ModelTypes["_prisma_migrations"]>
};
	/** aggregate fields of "_prisma_migrations" */
["_prisma_migrations_aggregate_fields"]: {
		avg?: ModelTypes["_prisma_migrations_avg_fields"] | undefined,
	count: number,
	max?: ModelTypes["_prisma_migrations_max_fields"] | undefined,
	min?: ModelTypes["_prisma_migrations_min_fields"] | undefined,
	stddev?: ModelTypes["_prisma_migrations_stddev_fields"] | undefined,
	stddev_pop?: ModelTypes["_prisma_migrations_stddev_pop_fields"] | undefined,
	stddev_samp?: ModelTypes["_prisma_migrations_stddev_samp_fields"] | undefined,
	sum?: ModelTypes["_prisma_migrations_sum_fields"] | undefined,
	var_pop?: ModelTypes["_prisma_migrations_var_pop_fields"] | undefined,
	var_samp?: ModelTypes["_prisma_migrations_var_samp_fields"] | undefined,
	variance?: ModelTypes["_prisma_migrations_variance_fields"] | undefined
};
	/** aggregate avg on columns */
["_prisma_migrations_avg_fields"]: {
		applied_steps_count?: number | undefined
};
	/** Boolean expression to filter rows from the table "_prisma_migrations". All fields are combined with a logical 'AND'. */
["_prisma_migrations_bool_exp"]: {
	_and?: Array<ModelTypes["_prisma_migrations_bool_exp"]> | undefined,
	_not?: ModelTypes["_prisma_migrations_bool_exp"] | undefined,
	_or?: Array<ModelTypes["_prisma_migrations_bool_exp"]> | undefined,
	applied_steps_count?: ModelTypes["Int_comparison_exp"] | undefined,
	checksum?: ModelTypes["String_comparison_exp"] | undefined,
	finished_at?: ModelTypes["timestamptz_comparison_exp"] | undefined,
	id?: ModelTypes["String_comparison_exp"] | undefined,
	logs?: ModelTypes["String_comparison_exp"] | undefined,
	migration_name?: ModelTypes["String_comparison_exp"] | undefined,
	rolled_back_at?: ModelTypes["timestamptz_comparison_exp"] | undefined,
	started_at?: ModelTypes["timestamptz_comparison_exp"] | undefined
};
	["_prisma_migrations_constraint"]:_prisma_migrations_constraint;
	/** input type for incrementing numeric columns in table "_prisma_migrations" */
["_prisma_migrations_inc_input"]: {
	applied_steps_count?: number | undefined
};
	/** input type for inserting data into table "_prisma_migrations" */
["_prisma_migrations_insert_input"]: {
	applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: ModelTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: ModelTypes["timestamptz"] | undefined,
	started_at?: ModelTypes["timestamptz"] | undefined
};
	/** aggregate max on columns */
["_prisma_migrations_max_fields"]: {
		applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: ModelTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: ModelTypes["timestamptz"] | undefined,
	started_at?: ModelTypes["timestamptz"] | undefined
};
	/** aggregate min on columns */
["_prisma_migrations_min_fields"]: {
		applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: ModelTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: ModelTypes["timestamptz"] | undefined,
	started_at?: ModelTypes["timestamptz"] | undefined
};
	/** response of any mutation on the table "_prisma_migrations" */
["_prisma_migrations_mutation_response"]: {
		/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<ModelTypes["_prisma_migrations"]>
};
	/** on_conflict condition type for table "_prisma_migrations" */
["_prisma_migrations_on_conflict"]: {
	constraint: ModelTypes["_prisma_migrations_constraint"],
	update_columns: Array<ModelTypes["_prisma_migrations_update_column"]>,
	where?: ModelTypes["_prisma_migrations_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "_prisma_migrations". */
["_prisma_migrations_order_by"]: {
	applied_steps_count?: ModelTypes["order_by"] | undefined,
	checksum?: ModelTypes["order_by"] | undefined,
	finished_at?: ModelTypes["order_by"] | undefined,
	id?: ModelTypes["order_by"] | undefined,
	logs?: ModelTypes["order_by"] | undefined,
	migration_name?: ModelTypes["order_by"] | undefined,
	rolled_back_at?: ModelTypes["order_by"] | undefined,
	started_at?: ModelTypes["order_by"] | undefined
};
	/** primary key columns input for table: _prisma_migrations */
["_prisma_migrations_pk_columns_input"]: {
	id: string
};
	["_prisma_migrations_select_column"]:_prisma_migrations_select_column;
	/** input type for updating data in table "_prisma_migrations" */
["_prisma_migrations_set_input"]: {
	applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: ModelTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: ModelTypes["timestamptz"] | undefined,
	started_at?: ModelTypes["timestamptz"] | undefined
};
	/** aggregate stddev on columns */
["_prisma_migrations_stddev_fields"]: {
		applied_steps_count?: number | undefined
};
	/** aggregate stddev_pop on columns */
["_prisma_migrations_stddev_pop_fields"]: {
		applied_steps_count?: number | undefined
};
	/** aggregate stddev_samp on columns */
["_prisma_migrations_stddev_samp_fields"]: {
		applied_steps_count?: number | undefined
};
	/** Streaming cursor of the table "_prisma_migrations" */
["_prisma_migrations_stream_cursor_input"]: {
	/** Stream column input with initial value */
	initial_value: ModelTypes["_prisma_migrations_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: ModelTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["_prisma_migrations_stream_cursor_value_input"]: {
	applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: ModelTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: ModelTypes["timestamptz"] | undefined,
	started_at?: ModelTypes["timestamptz"] | undefined
};
	/** aggregate sum on columns */
["_prisma_migrations_sum_fields"]: {
		applied_steps_count?: number | undefined
};
	["_prisma_migrations_update_column"]:_prisma_migrations_update_column;
	["_prisma_migrations_updates"]: {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: ModelTypes["_prisma_migrations_inc_input"] | undefined,
	/** sets the columns of the filtered rows to the given values */
	_set?: ModelTypes["_prisma_migrations_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: ModelTypes["_prisma_migrations_bool_exp"]
};
	/** aggregate var_pop on columns */
["_prisma_migrations_var_pop_fields"]: {
		applied_steps_count?: number | undefined
};
	/** aggregate var_samp on columns */
["_prisma_migrations_var_samp_fields"]: {
		applied_steps_count?: number | undefined
};
	/** aggregate variance on columns */
["_prisma_migrations_variance_fields"]: {
		applied_steps_count?: number | undefined
};
	["cursor_ordering"]:cursor_ordering;
	["jsonb"]:any;
	["jsonb_cast_exp"]: {
	String?: ModelTypes["String_comparison_exp"] | undefined
};
	/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
["jsonb_comparison_exp"]: {
	_cast?: ModelTypes["jsonb_cast_exp"] | undefined,
	/** is the column contained in the given json value */
	_contained_in?: ModelTypes["jsonb"] | undefined,
	/** does the column contain the given json value at the top level */
	_contains?: ModelTypes["jsonb"] | undefined,
	_eq?: ModelTypes["jsonb"] | undefined,
	_gt?: ModelTypes["jsonb"] | undefined,
	_gte?: ModelTypes["jsonb"] | undefined,
	/** does the string exist as a top-level key in the column */
	_has_key?: string | undefined,
	/** do all of these strings exist as top-level keys in the column */
	_has_keys_all?: Array<string> | undefined,
	/** do any of these strings exist as top-level keys in the column */
	_has_keys_any?: Array<string> | undefined,
	_in?: Array<ModelTypes["jsonb"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["jsonb"] | undefined,
	_lte?: ModelTypes["jsonb"] | undefined,
	_neq?: ModelTypes["jsonb"] | undefined,
	_nin?: Array<ModelTypes["jsonb"]> | undefined
};
	/** mutation root */
["mutation_root"]: {
		/** delete data from the table: "Account" */
	delete_Account?: ModelTypes["Account_mutation_response"] | undefined,
	/** delete single row from the table: "Account" */
	delete_Account_by_pk?: ModelTypes["Account"] | undefined,
	/** delete data from the table: "Media" */
	delete_Media?: ModelTypes["Media_mutation_response"] | undefined,
	/** delete single row from the table: "Media" */
	delete_Media_by_pk?: ModelTypes["Media"] | undefined,
	/** delete data from the table: "Profile" */
	delete_Profile?: ModelTypes["Profile_mutation_response"] | undefined,
	/** delete single row from the table: "Profile" */
	delete_Profile_by_pk?: ModelTypes["Profile"] | undefined,
	/** delete data from the table: "Project" */
	delete_Project?: ModelTypes["Project_mutation_response"] | undefined,
	/** delete data from the table: "ProjectMedia" */
	delete_ProjectMedia?: ModelTypes["ProjectMedia_mutation_response"] | undefined,
	/** delete single row from the table: "Project" */
	delete_Project_by_pk?: ModelTypes["Project"] | undefined,
	/** delete data from the table: "Wallet" */
	delete_Wallet?: ModelTypes["Wallet_mutation_response"] | undefined,
	/** delete single row from the table: "Wallet" */
	delete_Wallet_by_pk?: ModelTypes["Wallet"] | undefined,
	/** delete data from the table: "_prisma_migrations" */
	delete__prisma_migrations?: ModelTypes["_prisma_migrations_mutation_response"] | undefined,
	/** delete single row from the table: "_prisma_migrations" */
	delete__prisma_migrations_by_pk?: ModelTypes["_prisma_migrations"] | undefined,
	/** insert data into the table: "Account" */
	insert_Account?: ModelTypes["Account_mutation_response"] | undefined,
	/** insert a single row into the table: "Account" */
	insert_Account_one?: ModelTypes["Account"] | undefined,
	/** insert data into the table: "Media" */
	insert_Media?: ModelTypes["Media_mutation_response"] | undefined,
	/** insert a single row into the table: "Media" */
	insert_Media_one?: ModelTypes["Media"] | undefined,
	/** insert data into the table: "Profile" */
	insert_Profile?: ModelTypes["Profile_mutation_response"] | undefined,
	/** insert a single row into the table: "Profile" */
	insert_Profile_one?: ModelTypes["Profile"] | undefined,
	/** insert data into the table: "Project" */
	insert_Project?: ModelTypes["Project_mutation_response"] | undefined,
	/** insert data into the table: "ProjectMedia" */
	insert_ProjectMedia?: ModelTypes["ProjectMedia_mutation_response"] | undefined,
	/** insert a single row into the table: "ProjectMedia" */
	insert_ProjectMedia_one?: ModelTypes["ProjectMedia"] | undefined,
	/** insert a single row into the table: "Project" */
	insert_Project_one?: ModelTypes["Project"] | undefined,
	/** insert data into the table: "Wallet" */
	insert_Wallet?: ModelTypes["Wallet_mutation_response"] | undefined,
	/** insert a single row into the table: "Wallet" */
	insert_Wallet_one?: ModelTypes["Wallet"] | undefined,
	/** insert data into the table: "_prisma_migrations" */
	insert__prisma_migrations?: ModelTypes["_prisma_migrations_mutation_response"] | undefined,
	/** insert a single row into the table: "_prisma_migrations" */
	insert__prisma_migrations_one?: ModelTypes["_prisma_migrations"] | undefined,
	/** update data of the table: "Account" */
	update_Account?: ModelTypes["Account_mutation_response"] | undefined,
	/** update single row of the table: "Account" */
	update_Account_by_pk?: ModelTypes["Account"] | undefined,
	/** update multiples rows of table: "Account" */
	update_Account_many?: Array<ModelTypes["Account_mutation_response"] | undefined> | undefined,
	/** update data of the table: "Media" */
	update_Media?: ModelTypes["Media_mutation_response"] | undefined,
	/** update single row of the table: "Media" */
	update_Media_by_pk?: ModelTypes["Media"] | undefined,
	/** update multiples rows of table: "Media" */
	update_Media_many?: Array<ModelTypes["Media_mutation_response"] | undefined> | undefined,
	/** update data of the table: "Profile" */
	update_Profile?: ModelTypes["Profile_mutation_response"] | undefined,
	/** update single row of the table: "Profile" */
	update_Profile_by_pk?: ModelTypes["Profile"] | undefined,
	/** update multiples rows of table: "Profile" */
	update_Profile_many?: Array<ModelTypes["Profile_mutation_response"] | undefined> | undefined,
	/** update data of the table: "Project" */
	update_Project?: ModelTypes["Project_mutation_response"] | undefined,
	/** update data of the table: "ProjectMedia" */
	update_ProjectMedia?: ModelTypes["ProjectMedia_mutation_response"] | undefined,
	/** update multiples rows of table: "ProjectMedia" */
	update_ProjectMedia_many?: Array<ModelTypes["ProjectMedia_mutation_response"] | undefined> | undefined,
	/** update single row of the table: "Project" */
	update_Project_by_pk?: ModelTypes["Project"] | undefined,
	/** update multiples rows of table: "Project" */
	update_Project_many?: Array<ModelTypes["Project_mutation_response"] | undefined> | undefined,
	/** update data of the table: "Wallet" */
	update_Wallet?: ModelTypes["Wallet_mutation_response"] | undefined,
	/** update single row of the table: "Wallet" */
	update_Wallet_by_pk?: ModelTypes["Wallet"] | undefined,
	/** update multiples rows of table: "Wallet" */
	update_Wallet_many?: Array<ModelTypes["Wallet_mutation_response"] | undefined> | undefined,
	/** update data of the table: "_prisma_migrations" */
	update__prisma_migrations?: ModelTypes["_prisma_migrations_mutation_response"] | undefined,
	/** update single row of the table: "_prisma_migrations" */
	update__prisma_migrations_by_pk?: ModelTypes["_prisma_migrations"] | undefined,
	/** update multiples rows of table: "_prisma_migrations" */
	update__prisma_migrations_many?: Array<ModelTypes["_prisma_migrations_mutation_response"] | undefined> | undefined
};
	["order_by"]:order_by;
	["query_root"]: {
		/** fetch data from the table: "Account" */
	Account: Array<ModelTypes["Account"]>,
	/** fetch aggregated fields from the table: "Account" */
	Account_aggregate: ModelTypes["Account_aggregate"],
	/** fetch data from the table: "Account" using primary key columns */
	Account_by_pk?: ModelTypes["Account"] | undefined,
	/** fetch data from the table: "Media" */
	Media: Array<ModelTypes["Media"]>,
	/** fetch aggregated fields from the table: "Media" */
	Media_aggregate: ModelTypes["Media_aggregate"],
	/** fetch data from the table: "Media" using primary key columns */
	Media_by_pk?: ModelTypes["Media"] | undefined,
	/** fetch data from the table: "Profile" */
	Profile: Array<ModelTypes["Profile"]>,
	/** fetch aggregated fields from the table: "Profile" */
	Profile_aggregate: ModelTypes["Profile_aggregate"],
	/** fetch data from the table: "Profile" using primary key columns */
	Profile_by_pk?: ModelTypes["Profile"] | undefined,
	/** fetch data from the table: "Project" */
	Project: Array<ModelTypes["Project"]>,
	/** fetch data from the table: "ProjectMedia" */
	ProjectMedia: Array<ModelTypes["ProjectMedia"]>,
	/** fetch aggregated fields from the table: "ProjectMedia" */
	ProjectMedia_aggregate: ModelTypes["ProjectMedia_aggregate"],
	/** fetch aggregated fields from the table: "Project" */
	Project_aggregate: ModelTypes["Project_aggregate"],
	/** fetch data from the table: "Project" using primary key columns */
	Project_by_pk?: ModelTypes["Project"] | undefined,
	/** fetch data from the table: "Wallet" */
	Wallet: Array<ModelTypes["Wallet"]>,
	/** fetch aggregated fields from the table: "Wallet" */
	Wallet_aggregate: ModelTypes["Wallet_aggregate"],
	/** fetch data from the table: "Wallet" using primary key columns */
	Wallet_by_pk?: ModelTypes["Wallet"] | undefined,
	/** fetch data from the table: "_prisma_migrations" */
	_prisma_migrations: Array<ModelTypes["_prisma_migrations"]>,
	/** fetch aggregated fields from the table: "_prisma_migrations" */
	_prisma_migrations_aggregate: ModelTypes["_prisma_migrations_aggregate"],
	/** fetch data from the table: "_prisma_migrations" using primary key columns */
	_prisma_migrations_by_pk?: ModelTypes["_prisma_migrations"] | undefined,
	mediaFullUrl: string
};
	["smallint"]:any;
	/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
["smallint_comparison_exp"]: {
	_eq?: ModelTypes["smallint"] | undefined,
	_gt?: ModelTypes["smallint"] | undefined,
	_gte?: ModelTypes["smallint"] | undefined,
	_in?: Array<ModelTypes["smallint"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["smallint"] | undefined,
	_lte?: ModelTypes["smallint"] | undefined,
	_neq?: ModelTypes["smallint"] | undefined,
	_nin?: Array<ModelTypes["smallint"]> | undefined
};
	["subscription_root"]: {
		/** fetch data from the table: "Account" */
	Account: Array<ModelTypes["Account"]>,
	/** fetch aggregated fields from the table: "Account" */
	Account_aggregate: ModelTypes["Account_aggregate"],
	/** fetch data from the table: "Account" using primary key columns */
	Account_by_pk?: ModelTypes["Account"] | undefined,
	/** fetch data from the table in a streaming manner: "Account" */
	Account_stream: Array<ModelTypes["Account"]>,
	/** fetch data from the table: "Media" */
	Media: Array<ModelTypes["Media"]>,
	/** fetch aggregated fields from the table: "Media" */
	Media_aggregate: ModelTypes["Media_aggregate"],
	/** fetch data from the table: "Media" using primary key columns */
	Media_by_pk?: ModelTypes["Media"] | undefined,
	/** fetch data from the table in a streaming manner: "Media" */
	Media_stream: Array<ModelTypes["Media"]>,
	/** fetch data from the table: "Profile" */
	Profile: Array<ModelTypes["Profile"]>,
	/** fetch aggregated fields from the table: "Profile" */
	Profile_aggregate: ModelTypes["Profile_aggregate"],
	/** fetch data from the table: "Profile" using primary key columns */
	Profile_by_pk?: ModelTypes["Profile"] | undefined,
	/** fetch data from the table in a streaming manner: "Profile" */
	Profile_stream: Array<ModelTypes["Profile"]>,
	/** fetch data from the table: "Project" */
	Project: Array<ModelTypes["Project"]>,
	/** fetch data from the table: "ProjectMedia" */
	ProjectMedia: Array<ModelTypes["ProjectMedia"]>,
	/** fetch aggregated fields from the table: "ProjectMedia" */
	ProjectMedia_aggregate: ModelTypes["ProjectMedia_aggregate"],
	/** fetch data from the table in a streaming manner: "ProjectMedia" */
	ProjectMedia_stream: Array<ModelTypes["ProjectMedia"]>,
	/** fetch aggregated fields from the table: "Project" */
	Project_aggregate: ModelTypes["Project_aggregate"],
	/** fetch data from the table: "Project" using primary key columns */
	Project_by_pk?: ModelTypes["Project"] | undefined,
	/** fetch data from the table in a streaming manner: "Project" */
	Project_stream: Array<ModelTypes["Project"]>,
	/** fetch data from the table: "Wallet" */
	Wallet: Array<ModelTypes["Wallet"]>,
	/** fetch aggregated fields from the table: "Wallet" */
	Wallet_aggregate: ModelTypes["Wallet_aggregate"],
	/** fetch data from the table: "Wallet" using primary key columns */
	Wallet_by_pk?: ModelTypes["Wallet"] | undefined,
	/** fetch data from the table in a streaming manner: "Wallet" */
	Wallet_stream: Array<ModelTypes["Wallet"]>,
	/** fetch data from the table: "_prisma_migrations" */
	_prisma_migrations: Array<ModelTypes["_prisma_migrations"]>,
	/** fetch aggregated fields from the table: "_prisma_migrations" */
	_prisma_migrations_aggregate: ModelTypes["_prisma_migrations_aggregate"],
	/** fetch data from the table: "_prisma_migrations" using primary key columns */
	_prisma_migrations_by_pk?: ModelTypes["_prisma_migrations"] | undefined,
	/** fetch data from the table in a streaming manner: "_prisma_migrations" */
	_prisma_migrations_stream: Array<ModelTypes["_prisma_migrations"]>
};
	["timestamp"]:any;
	/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
["timestamp_comparison_exp"]: {
	_eq?: ModelTypes["timestamp"] | undefined,
	_gt?: ModelTypes["timestamp"] | undefined,
	_gte?: ModelTypes["timestamp"] | undefined,
	_in?: Array<ModelTypes["timestamp"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["timestamp"] | undefined,
	_lte?: ModelTypes["timestamp"] | undefined,
	_neq?: ModelTypes["timestamp"] | undefined,
	_nin?: Array<ModelTypes["timestamp"]> | undefined
};
	["timestamptz"]:any;
	/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
["timestamptz_comparison_exp"]: {
	_eq?: ModelTypes["timestamptz"] | undefined,
	_gt?: ModelTypes["timestamptz"] | undefined,
	_gte?: ModelTypes["timestamptz"] | undefined,
	_in?: Array<ModelTypes["timestamptz"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["timestamptz"] | undefined,
	_lte?: ModelTypes["timestamptz"] | undefined,
	_neq?: ModelTypes["timestamptz"] | undefined,
	_nin?: Array<ModelTypes["timestamptz"]> | undefined
};
	["uuid"]:any;
	/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
["uuid_comparison_exp"]: {
	_eq?: ModelTypes["uuid"] | undefined,
	_gt?: ModelTypes["uuid"] | undefined,
	_gte?: ModelTypes["uuid"] | undefined,
	_in?: Array<ModelTypes["uuid"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: ModelTypes["uuid"] | undefined,
	_lte?: ModelTypes["uuid"] | undefined,
	_neq?: ModelTypes["uuid"] | undefined,
	_nin?: Array<ModelTypes["uuid"]> | undefined
}
    }

export type GraphQLTypes = {
    /** columns and relationships of "Account" */
["Account"]: {
	__typename: "Account",
	/** An array relationship */
	authoredProjects: Array<GraphQLTypes["Project"]>,
	/** An aggregate relationship */
	authoredProjects_aggregate: GraphQLTypes["Project_aggregate"],
	/** An array relationship */
	curatedProjects: Array<GraphQLTypes["Project"]>,
	/** An aggregate relationship */
	curatedProjects_aggregate: GraphQLTypes["Project_aggregate"],
	id: GraphQLTypes["uuid"],
	/** An array relationship */
	profile: Array<GraphQLTypes["Profile"]>,
	/** An aggregate relationship */
	profile_aggregate: GraphQLTypes["Profile_aggregate"],
	roles?: GraphQLTypes["_AccountRoles"] | undefined,
	status: GraphQLTypes["AccountStatus"],
	username: string,
	/** An array relationship */
	wallets: Array<GraphQLTypes["Wallet"]>,
	/** An aggregate relationship */
	wallets_aggregate: GraphQLTypes["Wallet_aggregate"]
};
	["AccountStatus"]: "scalar" & { name: "AccountStatus" };
	/** Boolean expression to compare columns of type "AccountStatus". All fields are combined with logical 'AND'. */
["AccountStatus_comparison_exp"]: {
		_eq?: GraphQLTypes["AccountStatus"] | undefined,
	_gt?: GraphQLTypes["AccountStatus"] | undefined,
	_gte?: GraphQLTypes["AccountStatus"] | undefined,
	_in?: Array<GraphQLTypes["AccountStatus"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["AccountStatus"] | undefined,
	_lte?: GraphQLTypes["AccountStatus"] | undefined,
	_neq?: GraphQLTypes["AccountStatus"] | undefined,
	_nin?: Array<GraphQLTypes["AccountStatus"]> | undefined
};
	/** aggregated selection of "Account" */
["Account_aggregate"]: {
	__typename: "Account_aggregate",
	aggregate?: GraphQLTypes["Account_aggregate_fields"] | undefined,
	nodes: Array<GraphQLTypes["Account"]>
};
	/** aggregate fields of "Account" */
["Account_aggregate_fields"]: {
	__typename: "Account_aggregate_fields",
	count: number,
	max?: GraphQLTypes["Account_max_fields"] | undefined,
	min?: GraphQLTypes["Account_min_fields"] | undefined
};
	/** Boolean expression to filter rows from the table "Account". All fields are combined with a logical 'AND'. */
["Account_bool_exp"]: {
		_and?: Array<GraphQLTypes["Account_bool_exp"]> | undefined,
	_not?: GraphQLTypes["Account_bool_exp"] | undefined,
	_or?: Array<GraphQLTypes["Account_bool_exp"]> | undefined,
	authoredProjects?: GraphQLTypes["Project_bool_exp"] | undefined,
	authoredProjects_aggregate?: GraphQLTypes["Project_aggregate_bool_exp"] | undefined,
	curatedProjects?: GraphQLTypes["Project_bool_exp"] | undefined,
	curatedProjects_aggregate?: GraphQLTypes["Project_aggregate_bool_exp"] | undefined,
	id?: GraphQLTypes["uuid_comparison_exp"] | undefined,
	profile?: GraphQLTypes["Profile_bool_exp"] | undefined,
	profile_aggregate?: GraphQLTypes["Profile_aggregate_bool_exp"] | undefined,
	roles?: GraphQLTypes["_AccountRoles_comparison_exp"] | undefined,
	status?: GraphQLTypes["AccountStatus_comparison_exp"] | undefined,
	username?: GraphQLTypes["String_comparison_exp"] | undefined,
	wallets?: GraphQLTypes["Wallet_bool_exp"] | undefined,
	wallets_aggregate?: GraphQLTypes["Wallet_aggregate_bool_exp"] | undefined
};
	/** unique or primary key constraints on table "Account" */
["Account_constraint"]: Account_constraint;
	/** input type for inserting data into table "Account" */
["Account_insert_input"]: {
		authoredProjects?: GraphQLTypes["Project_arr_rel_insert_input"] | undefined,
	curatedProjects?: GraphQLTypes["Project_arr_rel_insert_input"] | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	profile?: GraphQLTypes["Profile_arr_rel_insert_input"] | undefined,
	roles?: GraphQLTypes["_AccountRoles"] | undefined,
	status?: GraphQLTypes["AccountStatus"] | undefined,
	username?: string | undefined,
	wallets?: GraphQLTypes["Wallet_arr_rel_insert_input"] | undefined
};
	/** aggregate max on columns */
["Account_max_fields"]: {
	__typename: "Account_max_fields",
	id?: GraphQLTypes["uuid"] | undefined,
	status?: GraphQLTypes["AccountStatus"] | undefined,
	username?: string | undefined
};
	/** aggregate min on columns */
["Account_min_fields"]: {
	__typename: "Account_min_fields",
	id?: GraphQLTypes["uuid"] | undefined,
	status?: GraphQLTypes["AccountStatus"] | undefined,
	username?: string | undefined
};
	/** response of any mutation on the table "Account" */
["Account_mutation_response"]: {
	__typename: "Account_mutation_response",
	/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<GraphQLTypes["Account"]>
};
	/** input type for inserting object relation for remote table "Account" */
["Account_obj_rel_insert_input"]: {
		data: GraphQLTypes["Account_insert_input"],
	/** upsert condition */
	on_conflict?: GraphQLTypes["Account_on_conflict"] | undefined
};
	/** on_conflict condition type for table "Account" */
["Account_on_conflict"]: {
		constraint: GraphQLTypes["Account_constraint"],
	update_columns: Array<GraphQLTypes["Account_update_column"]>,
	where?: GraphQLTypes["Account_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Account". */
["Account_order_by"]: {
		authoredProjects_aggregate?: GraphQLTypes["Project_aggregate_order_by"] | undefined,
	curatedProjects_aggregate?: GraphQLTypes["Project_aggregate_order_by"] | undefined,
	id?: GraphQLTypes["order_by"] | undefined,
	profile_aggregate?: GraphQLTypes["Profile_aggregate_order_by"] | undefined,
	roles?: GraphQLTypes["order_by"] | undefined,
	status?: GraphQLTypes["order_by"] | undefined,
	username?: GraphQLTypes["order_by"] | undefined,
	wallets_aggregate?: GraphQLTypes["Wallet_aggregate_order_by"] | undefined
};
	/** primary key columns input for table: Account */
["Account_pk_columns_input"]: {
		id: GraphQLTypes["uuid"]
};
	/** select columns of table "Account" */
["Account_select_column"]: Account_select_column;
	/** input type for updating data in table "Account" */
["Account_set_input"]: {
		id?: GraphQLTypes["uuid"] | undefined,
	roles?: GraphQLTypes["_AccountRoles"] | undefined,
	status?: GraphQLTypes["AccountStatus"] | undefined,
	username?: string | undefined
};
	/** Streaming cursor of the table "Account" */
["Account_stream_cursor_input"]: {
		/** Stream column input with initial value */
	initial_value: GraphQLTypes["Account_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: GraphQLTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Account_stream_cursor_value_input"]: {
		id?: GraphQLTypes["uuid"] | undefined,
	roles?: GraphQLTypes["_AccountRoles"] | undefined,
	status?: GraphQLTypes["AccountStatus"] | undefined,
	username?: string | undefined
};
	/** update columns of table "Account" */
["Account_update_column"]: Account_update_column;
	["Account_updates"]: {
		/** sets the columns of the filtered rows to the given values */
	_set?: GraphQLTypes["Account_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: GraphQLTypes["Account_bool_exp"]
};
	["BlockchainNetwork"]: "scalar" & { name: "BlockchainNetwork" };
	/** Boolean expression to compare columns of type "BlockchainNetwork". All fields are combined with logical 'AND'. */
["BlockchainNetwork_comparison_exp"]: {
		_eq?: GraphQLTypes["BlockchainNetwork"] | undefined,
	_gt?: GraphQLTypes["BlockchainNetwork"] | undefined,
	_gte?: GraphQLTypes["BlockchainNetwork"] | undefined,
	_in?: Array<GraphQLTypes["BlockchainNetwork"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["BlockchainNetwork"] | undefined,
	_lte?: GraphQLTypes["BlockchainNetwork"] | undefined,
	_neq?: GraphQLTypes["BlockchainNetwork"] | undefined,
	_nin?: Array<GraphQLTypes["BlockchainNetwork"]> | undefined
};
	/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
["Int_comparison_exp"]: {
		_eq?: number | undefined,
	_gt?: number | undefined,
	_gte?: number | undefined,
	_in?: Array<number> | undefined,
	_is_null?: boolean | undefined,
	_lt?: number | undefined,
	_lte?: number | undefined,
	_neq?: number | undefined,
	_nin?: Array<number> | undefined
};
	/** columns and relationships of "Media" */
["Media"]: {
	__typename: "Media",
	bucketId: string,
	createdAt: GraphQLTypes["timestamp"],
	etag: string,
	id: GraphQLTypes["uuid"],
	name: string,
	/** An array relationship */
	project: Array<GraphQLTypes["ProjectMedia"]>,
	/** An aggregate relationship */
	project_aggregate: GraphQLTypes["ProjectMedia_aggregate"],
	s3key: string,
	size: number,
	updatedAt: GraphQLTypes["timestamp"],
	/** An object relationship */
	uploader?: GraphQLTypes["Account"] | undefined,
	uploaderId?: GraphQLTypes["uuid"] | undefined,
	url: string
};
	/** aggregated selection of "Media" */
["Media_aggregate"]: {
	__typename: "Media_aggregate",
	aggregate?: GraphQLTypes["Media_aggregate_fields"] | undefined,
	nodes: Array<GraphQLTypes["Media"]>
};
	/** aggregate fields of "Media" */
["Media_aggregate_fields"]: {
	__typename: "Media_aggregate_fields",
	avg?: GraphQLTypes["Media_avg_fields"] | undefined,
	count: number,
	max?: GraphQLTypes["Media_max_fields"] | undefined,
	min?: GraphQLTypes["Media_min_fields"] | undefined,
	stddev?: GraphQLTypes["Media_stddev_fields"] | undefined,
	stddev_pop?: GraphQLTypes["Media_stddev_pop_fields"] | undefined,
	stddev_samp?: GraphQLTypes["Media_stddev_samp_fields"] | undefined,
	sum?: GraphQLTypes["Media_sum_fields"] | undefined,
	var_pop?: GraphQLTypes["Media_var_pop_fields"] | undefined,
	var_samp?: GraphQLTypes["Media_var_samp_fields"] | undefined,
	variance?: GraphQLTypes["Media_variance_fields"] | undefined
};
	/** aggregate avg on columns */
["Media_avg_fields"]: {
	__typename: "Media_avg_fields",
	size?: number | undefined
};
	/** Boolean expression to filter rows from the table "Media". All fields are combined with a logical 'AND'. */
["Media_bool_exp"]: {
		_and?: Array<GraphQLTypes["Media_bool_exp"]> | undefined,
	_not?: GraphQLTypes["Media_bool_exp"] | undefined,
	_or?: Array<GraphQLTypes["Media_bool_exp"]> | undefined,
	bucketId?: GraphQLTypes["String_comparison_exp"] | undefined,
	createdAt?: GraphQLTypes["timestamp_comparison_exp"] | undefined,
	etag?: GraphQLTypes["String_comparison_exp"] | undefined,
	id?: GraphQLTypes["uuid_comparison_exp"] | undefined,
	name?: GraphQLTypes["String_comparison_exp"] | undefined,
	project?: GraphQLTypes["ProjectMedia_bool_exp"] | undefined,
	project_aggregate?: GraphQLTypes["ProjectMedia_aggregate_bool_exp"] | undefined,
	s3key?: GraphQLTypes["String_comparison_exp"] | undefined,
	size?: GraphQLTypes["Int_comparison_exp"] | undefined,
	updatedAt?: GraphQLTypes["timestamp_comparison_exp"] | undefined,
	uploader?: GraphQLTypes["Account_bool_exp"] | undefined,
	uploaderId?: GraphQLTypes["uuid_comparison_exp"] | undefined
};
	/** unique or primary key constraints on table "Media" */
["Media_constraint"]: Media_constraint;
	/** input type for incrementing numeric columns in table "Media" */
["Media_inc_input"]: {
		size?: number | undefined
};
	/** input type for inserting data into table "Media" */
["Media_insert_input"]: {
		bucketId?: string | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	name?: string | undefined,
	project?: GraphQLTypes["ProjectMedia_arr_rel_insert_input"] | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined,
	uploader?: GraphQLTypes["Account_obj_rel_insert_input"] | undefined,
	uploaderId?: GraphQLTypes["uuid"] | undefined
};
	/** aggregate max on columns */
["Media_max_fields"]: {
	__typename: "Media_max_fields",
	bucketId?: string | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	name?: string | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined,
	uploaderId?: GraphQLTypes["uuid"] | undefined
};
	/** aggregate min on columns */
["Media_min_fields"]: {
	__typename: "Media_min_fields",
	bucketId?: string | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	name?: string | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined,
	uploaderId?: GraphQLTypes["uuid"] | undefined
};
	/** response of any mutation on the table "Media" */
["Media_mutation_response"]: {
	__typename: "Media_mutation_response",
	/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<GraphQLTypes["Media"]>
};
	/** input type for inserting object relation for remote table "Media" */
["Media_obj_rel_insert_input"]: {
		data: GraphQLTypes["Media_insert_input"],
	/** upsert condition */
	on_conflict?: GraphQLTypes["Media_on_conflict"] | undefined
};
	/** on_conflict condition type for table "Media" */
["Media_on_conflict"]: {
		constraint: GraphQLTypes["Media_constraint"],
	update_columns: Array<GraphQLTypes["Media_update_column"]>,
	where?: GraphQLTypes["Media_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Media". */
["Media_order_by"]: {
		bucketId?: GraphQLTypes["order_by"] | undefined,
	createdAt?: GraphQLTypes["order_by"] | undefined,
	etag?: GraphQLTypes["order_by"] | undefined,
	id?: GraphQLTypes["order_by"] | undefined,
	name?: GraphQLTypes["order_by"] | undefined,
	project_aggregate?: GraphQLTypes["ProjectMedia_aggregate_order_by"] | undefined,
	s3key?: GraphQLTypes["order_by"] | undefined,
	size?: GraphQLTypes["order_by"] | undefined,
	updatedAt?: GraphQLTypes["order_by"] | undefined,
	uploader?: GraphQLTypes["Account_order_by"] | undefined,
	uploaderId?: GraphQLTypes["order_by"] | undefined
};
	/** primary key columns input for table: Media */
["Media_pk_columns_input"]: {
		id: GraphQLTypes["uuid"]
};
	/** select columns of table "Media" */
["Media_select_column"]: Media_select_column;
	/** input type for updating data in table "Media" */
["Media_set_input"]: {
		bucketId?: string | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	name?: string | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined,
	uploaderId?: GraphQLTypes["uuid"] | undefined
};
	/** aggregate stddev on columns */
["Media_stddev_fields"]: {
	__typename: "Media_stddev_fields",
	size?: number | undefined
};
	/** aggregate stddev_pop on columns */
["Media_stddev_pop_fields"]: {
	__typename: "Media_stddev_pop_fields",
	size?: number | undefined
};
	/** aggregate stddev_samp on columns */
["Media_stddev_samp_fields"]: {
	__typename: "Media_stddev_samp_fields",
	size?: number | undefined
};
	/** Streaming cursor of the table "Media" */
["Media_stream_cursor_input"]: {
		/** Stream column input with initial value */
	initial_value: GraphQLTypes["Media_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: GraphQLTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Media_stream_cursor_value_input"]: {
		bucketId?: string | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	etag?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	name?: string | undefined,
	s3key?: string | undefined,
	size?: number | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined,
	uploaderId?: GraphQLTypes["uuid"] | undefined
};
	/** aggregate sum on columns */
["Media_sum_fields"]: {
	__typename: "Media_sum_fields",
	size?: number | undefined
};
	/** update columns of table "Media" */
["Media_update_column"]: Media_update_column;
	["Media_updates"]: {
		/** increments the numeric columns with given value of the filtered values */
	_inc?: GraphQLTypes["Media_inc_input"] | undefined,
	/** sets the columns of the filtered rows to the given values */
	_set?: GraphQLTypes["Media_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: GraphQLTypes["Media_bool_exp"]
};
	/** aggregate var_pop on columns */
["Media_var_pop_fields"]: {
	__typename: "Media_var_pop_fields",
	size?: number | undefined
};
	/** aggregate var_samp on columns */
["Media_var_samp_fields"]: {
	__typename: "Media_var_samp_fields",
	size?: number | undefined
};
	/** aggregate variance on columns */
["Media_variance_fields"]: {
	__typename: "Media_variance_fields",
	size?: number | undefined
};
	/** columns and relationships of "Profile" */
["Profile"]: {
	__typename: "Profile",
	accountId: GraphQLTypes["uuid"],
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** aggregated selection of "Profile" */
["Profile_aggregate"]: {
	__typename: "Profile_aggregate",
	aggregate?: GraphQLTypes["Profile_aggregate_fields"] | undefined,
	nodes: Array<GraphQLTypes["Profile"]>
};
	["Profile_aggregate_bool_exp"]: {
		count?: GraphQLTypes["Profile_aggregate_bool_exp_count"] | undefined
};
	["Profile_aggregate_bool_exp_count"]: {
		arguments?: Array<GraphQLTypes["Profile_select_column"]> | undefined,
	distinct?: boolean | undefined,
	filter?: GraphQLTypes["Profile_bool_exp"] | undefined,
	predicate: GraphQLTypes["Int_comparison_exp"]
};
	/** aggregate fields of "Profile" */
["Profile_aggregate_fields"]: {
	__typename: "Profile_aggregate_fields",
	count: number,
	max?: GraphQLTypes["Profile_max_fields"] | undefined,
	min?: GraphQLTypes["Profile_min_fields"] | undefined
};
	/** order by aggregate values of table "Profile" */
["Profile_aggregate_order_by"]: {
		count?: GraphQLTypes["order_by"] | undefined,
	max?: GraphQLTypes["Profile_max_order_by"] | undefined,
	min?: GraphQLTypes["Profile_min_order_by"] | undefined
};
	/** input type for inserting array relation for remote table "Profile" */
["Profile_arr_rel_insert_input"]: {
		data: Array<GraphQLTypes["Profile_insert_input"]>,
	/** upsert condition */
	on_conflict?: GraphQLTypes["Profile_on_conflict"] | undefined
};
	/** Boolean expression to filter rows from the table "Profile". All fields are combined with a logical 'AND'. */
["Profile_bool_exp"]: {
		_and?: Array<GraphQLTypes["Profile_bool_exp"]> | undefined,
	_not?: GraphQLTypes["Profile_bool_exp"] | undefined,
	_or?: Array<GraphQLTypes["Profile_bool_exp"]> | undefined,
	accountId?: GraphQLTypes["uuid_comparison_exp"] | undefined,
	description?: GraphQLTypes["String_comparison_exp"] | undefined,
	instagram?: GraphQLTypes["String_comparison_exp"] | undefined,
	picture?: GraphQLTypes["String_comparison_exp"] | undefined,
	twitter?: GraphQLTypes["String_comparison_exp"] | undefined,
	website?: GraphQLTypes["String_comparison_exp"] | undefined
};
	/** unique or primary key constraints on table "Profile" */
["Profile_constraint"]: Profile_constraint;
	/** input type for inserting data into table "Profile" */
["Profile_insert_input"]: {
		accountId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** aggregate max on columns */
["Profile_max_fields"]: {
	__typename: "Profile_max_fields",
	accountId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** order by max() on columns of table "Profile" */
["Profile_max_order_by"]: {
		accountId?: GraphQLTypes["order_by"] | undefined,
	description?: GraphQLTypes["order_by"] | undefined,
	instagram?: GraphQLTypes["order_by"] | undefined,
	picture?: GraphQLTypes["order_by"] | undefined,
	twitter?: GraphQLTypes["order_by"] | undefined,
	website?: GraphQLTypes["order_by"] | undefined
};
	/** aggregate min on columns */
["Profile_min_fields"]: {
	__typename: "Profile_min_fields",
	accountId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** order by min() on columns of table "Profile" */
["Profile_min_order_by"]: {
		accountId?: GraphQLTypes["order_by"] | undefined,
	description?: GraphQLTypes["order_by"] | undefined,
	instagram?: GraphQLTypes["order_by"] | undefined,
	picture?: GraphQLTypes["order_by"] | undefined,
	twitter?: GraphQLTypes["order_by"] | undefined,
	website?: GraphQLTypes["order_by"] | undefined
};
	/** response of any mutation on the table "Profile" */
["Profile_mutation_response"]: {
	__typename: "Profile_mutation_response",
	/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<GraphQLTypes["Profile"]>
};
	/** on_conflict condition type for table "Profile" */
["Profile_on_conflict"]: {
		constraint: GraphQLTypes["Profile_constraint"],
	update_columns: Array<GraphQLTypes["Profile_update_column"]>,
	where?: GraphQLTypes["Profile_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Profile". */
["Profile_order_by"]: {
		accountId?: GraphQLTypes["order_by"] | undefined,
	description?: GraphQLTypes["order_by"] | undefined,
	instagram?: GraphQLTypes["order_by"] | undefined,
	picture?: GraphQLTypes["order_by"] | undefined,
	twitter?: GraphQLTypes["order_by"] | undefined,
	website?: GraphQLTypes["order_by"] | undefined
};
	/** primary key columns input for table: Profile */
["Profile_pk_columns_input"]: {
		accountId: GraphQLTypes["uuid"]
};
	/** select columns of table "Profile" */
["Profile_select_column"]: Profile_select_column;
	/** input type for updating data in table "Profile" */
["Profile_set_input"]: {
		accountId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** Streaming cursor of the table "Profile" */
["Profile_stream_cursor_input"]: {
		/** Stream column input with initial value */
	initial_value: GraphQLTypes["Profile_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: GraphQLTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Profile_stream_cursor_value_input"]: {
		accountId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	instagram?: string | undefined,
	picture?: string | undefined,
	twitter?: string | undefined,
	website?: string | undefined
};
	/** update columns of table "Profile" */
["Profile_update_column"]: Profile_update_column;
	["Profile_updates"]: {
		/** sets the columns of the filtered rows to the given values */
	_set?: GraphQLTypes["Profile_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: GraphQLTypes["Profile_bool_exp"]
};
	/** columns and relationships of "Project" */
["Project"]: {
	__typename: "Project",
	/** An object relationship */
	author: GraphQLTypes["Account"],
	authorId: GraphQLTypes["uuid"],
	blockchain?: GraphQLTypes["BlockchainNetwork"] | undefined,
	createdAt: GraphQLTypes["timestamp"],
	/** An object relationship */
	curator?: GraphQLTypes["Account"] | undefined,
	curatorId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	id: GraphQLTypes["uuid"],
	pricing?: GraphQLTypes["jsonb"] | undefined,
	/** An array relationship */
	projectMedias: Array<GraphQLTypes["ProjectMedia"]>,
	/** An aggregate relationship */
	projectMedias_aggregate: GraphQLTypes["ProjectMedia_aggregate"],
	releaseAt?: GraphQLTypes["timestamp"] | undefined,
	state: GraphQLTypes["ProjectState"],
	storage?: GraphQLTypes["Storage"] | undefined,
	title: string,
	updatedAt: GraphQLTypes["timestamp"]
};
	/** columns and relationships of "ProjectMedia" */
["ProjectMedia"]: {
	__typename: "ProjectMedia",
	index: GraphQLTypes["smallint"],
	/** An object relationship */
	media: GraphQLTypes["Media"],
	mediaId: GraphQLTypes["uuid"],
	/** An object relationship */
	project: GraphQLTypes["Project"],
	projectId: GraphQLTypes["uuid"]
};
	/** aggregated selection of "ProjectMedia" */
["ProjectMedia_aggregate"]: {
	__typename: "ProjectMedia_aggregate",
	aggregate?: GraphQLTypes["ProjectMedia_aggregate_fields"] | undefined,
	nodes: Array<GraphQLTypes["ProjectMedia"]>
};
	["ProjectMedia_aggregate_bool_exp"]: {
		count?: GraphQLTypes["ProjectMedia_aggregate_bool_exp_count"] | undefined
};
	["ProjectMedia_aggregate_bool_exp_count"]: {
		arguments?: Array<GraphQLTypes["ProjectMedia_select_column"]> | undefined,
	distinct?: boolean | undefined,
	filter?: GraphQLTypes["ProjectMedia_bool_exp"] | undefined,
	predicate: GraphQLTypes["Int_comparison_exp"]
};
	/** aggregate fields of "ProjectMedia" */
["ProjectMedia_aggregate_fields"]: {
	__typename: "ProjectMedia_aggregate_fields",
	avg?: GraphQLTypes["ProjectMedia_avg_fields"] | undefined,
	count: number,
	max?: GraphQLTypes["ProjectMedia_max_fields"] | undefined,
	min?: GraphQLTypes["ProjectMedia_min_fields"] | undefined,
	stddev?: GraphQLTypes["ProjectMedia_stddev_fields"] | undefined,
	stddev_pop?: GraphQLTypes["ProjectMedia_stddev_pop_fields"] | undefined,
	stddev_samp?: GraphQLTypes["ProjectMedia_stddev_samp_fields"] | undefined,
	sum?: GraphQLTypes["ProjectMedia_sum_fields"] | undefined,
	var_pop?: GraphQLTypes["ProjectMedia_var_pop_fields"] | undefined,
	var_samp?: GraphQLTypes["ProjectMedia_var_samp_fields"] | undefined,
	variance?: GraphQLTypes["ProjectMedia_variance_fields"] | undefined
};
	/** order by aggregate values of table "ProjectMedia" */
["ProjectMedia_aggregate_order_by"]: {
		avg?: GraphQLTypes["ProjectMedia_avg_order_by"] | undefined,
	count?: GraphQLTypes["order_by"] | undefined,
	max?: GraphQLTypes["ProjectMedia_max_order_by"] | undefined,
	min?: GraphQLTypes["ProjectMedia_min_order_by"] | undefined,
	stddev?: GraphQLTypes["ProjectMedia_stddev_order_by"] | undefined,
	stddev_pop?: GraphQLTypes["ProjectMedia_stddev_pop_order_by"] | undefined,
	stddev_samp?: GraphQLTypes["ProjectMedia_stddev_samp_order_by"] | undefined,
	sum?: GraphQLTypes["ProjectMedia_sum_order_by"] | undefined,
	var_pop?: GraphQLTypes["ProjectMedia_var_pop_order_by"] | undefined,
	var_samp?: GraphQLTypes["ProjectMedia_var_samp_order_by"] | undefined,
	variance?: GraphQLTypes["ProjectMedia_variance_order_by"] | undefined
};
	/** input type for inserting array relation for remote table "ProjectMedia" */
["ProjectMedia_arr_rel_insert_input"]: {
		data: Array<GraphQLTypes["ProjectMedia_insert_input"]>,
	/** upsert condition */
	on_conflict?: GraphQLTypes["ProjectMedia_on_conflict"] | undefined
};
	/** aggregate avg on columns */
["ProjectMedia_avg_fields"]: {
	__typename: "ProjectMedia_avg_fields",
	index?: number | undefined
};
	/** order by avg() on columns of table "ProjectMedia" */
["ProjectMedia_avg_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined
};
	/** Boolean expression to filter rows from the table "ProjectMedia". All fields are combined with a logical 'AND'. */
["ProjectMedia_bool_exp"]: {
		_and?: Array<GraphQLTypes["ProjectMedia_bool_exp"]> | undefined,
	_not?: GraphQLTypes["ProjectMedia_bool_exp"] | undefined,
	_or?: Array<GraphQLTypes["ProjectMedia_bool_exp"]> | undefined,
	index?: GraphQLTypes["smallint_comparison_exp"] | undefined,
	media?: GraphQLTypes["Media_bool_exp"] | undefined,
	mediaId?: GraphQLTypes["uuid_comparison_exp"] | undefined,
	project?: GraphQLTypes["Project_bool_exp"] | undefined,
	projectId?: GraphQLTypes["uuid_comparison_exp"] | undefined
};
	/** unique or primary key constraints on table "ProjectMedia" */
["ProjectMedia_constraint"]: ProjectMedia_constraint;
	/** input type for incrementing numeric columns in table "ProjectMedia" */
["ProjectMedia_inc_input"]: {
		index?: GraphQLTypes["smallint"] | undefined
};
	/** input type for inserting data into table "ProjectMedia" */
["ProjectMedia_insert_input"]: {
		index?: GraphQLTypes["smallint"] | undefined,
	media?: GraphQLTypes["Media_obj_rel_insert_input"] | undefined,
	mediaId?: GraphQLTypes["uuid"] | undefined,
	project?: GraphQLTypes["Project_obj_rel_insert_input"] | undefined,
	projectId?: GraphQLTypes["uuid"] | undefined
};
	/** aggregate max on columns */
["ProjectMedia_max_fields"]: {
	__typename: "ProjectMedia_max_fields",
	index?: GraphQLTypes["smallint"] | undefined,
	mediaId?: GraphQLTypes["uuid"] | undefined,
	projectId?: GraphQLTypes["uuid"] | undefined
};
	/** order by max() on columns of table "ProjectMedia" */
["ProjectMedia_max_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined,
	mediaId?: GraphQLTypes["order_by"] | undefined,
	projectId?: GraphQLTypes["order_by"] | undefined
};
	/** aggregate min on columns */
["ProjectMedia_min_fields"]: {
	__typename: "ProjectMedia_min_fields",
	index?: GraphQLTypes["smallint"] | undefined,
	mediaId?: GraphQLTypes["uuid"] | undefined,
	projectId?: GraphQLTypes["uuid"] | undefined
};
	/** order by min() on columns of table "ProjectMedia" */
["ProjectMedia_min_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined,
	mediaId?: GraphQLTypes["order_by"] | undefined,
	projectId?: GraphQLTypes["order_by"] | undefined
};
	/** response of any mutation on the table "ProjectMedia" */
["ProjectMedia_mutation_response"]: {
	__typename: "ProjectMedia_mutation_response",
	/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<GraphQLTypes["ProjectMedia"]>
};
	/** on_conflict condition type for table "ProjectMedia" */
["ProjectMedia_on_conflict"]: {
		constraint: GraphQLTypes["ProjectMedia_constraint"],
	update_columns: Array<GraphQLTypes["ProjectMedia_update_column"]>,
	where?: GraphQLTypes["ProjectMedia_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "ProjectMedia". */
["ProjectMedia_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined,
	media?: GraphQLTypes["Media_order_by"] | undefined,
	mediaId?: GraphQLTypes["order_by"] | undefined,
	project?: GraphQLTypes["Project_order_by"] | undefined,
	projectId?: GraphQLTypes["order_by"] | undefined
};
	/** select columns of table "ProjectMedia" */
["ProjectMedia_select_column"]: ProjectMedia_select_column;
	/** input type for updating data in table "ProjectMedia" */
["ProjectMedia_set_input"]: {
		index?: GraphQLTypes["smallint"] | undefined,
	mediaId?: GraphQLTypes["uuid"] | undefined,
	projectId?: GraphQLTypes["uuid"] | undefined
};
	/** aggregate stddev on columns */
["ProjectMedia_stddev_fields"]: {
	__typename: "ProjectMedia_stddev_fields",
	index?: number | undefined
};
	/** order by stddev() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined
};
	/** aggregate stddev_pop on columns */
["ProjectMedia_stddev_pop_fields"]: {
	__typename: "ProjectMedia_stddev_pop_fields",
	index?: number | undefined
};
	/** order by stddev_pop() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_pop_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined
};
	/** aggregate stddev_samp on columns */
["ProjectMedia_stddev_samp_fields"]: {
	__typename: "ProjectMedia_stddev_samp_fields",
	index?: number | undefined
};
	/** order by stddev_samp() on columns of table "ProjectMedia" */
["ProjectMedia_stddev_samp_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined
};
	/** Streaming cursor of the table "ProjectMedia" */
["ProjectMedia_stream_cursor_input"]: {
		/** Stream column input with initial value */
	initial_value: GraphQLTypes["ProjectMedia_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: GraphQLTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["ProjectMedia_stream_cursor_value_input"]: {
		index?: GraphQLTypes["smallint"] | undefined,
	mediaId?: GraphQLTypes["uuid"] | undefined,
	projectId?: GraphQLTypes["uuid"] | undefined
};
	/** aggregate sum on columns */
["ProjectMedia_sum_fields"]: {
	__typename: "ProjectMedia_sum_fields",
	index?: GraphQLTypes["smallint"] | undefined
};
	/** order by sum() on columns of table "ProjectMedia" */
["ProjectMedia_sum_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined
};
	/** update columns of table "ProjectMedia" */
["ProjectMedia_update_column"]: ProjectMedia_update_column;
	["ProjectMedia_updates"]: {
		/** increments the numeric columns with given value of the filtered values */
	_inc?: GraphQLTypes["ProjectMedia_inc_input"] | undefined,
	/** sets the columns of the filtered rows to the given values */
	_set?: GraphQLTypes["ProjectMedia_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: GraphQLTypes["ProjectMedia_bool_exp"]
};
	/** aggregate var_pop on columns */
["ProjectMedia_var_pop_fields"]: {
	__typename: "ProjectMedia_var_pop_fields",
	index?: number | undefined
};
	/** order by var_pop() on columns of table "ProjectMedia" */
["ProjectMedia_var_pop_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined
};
	/** aggregate var_samp on columns */
["ProjectMedia_var_samp_fields"]: {
	__typename: "ProjectMedia_var_samp_fields",
	index?: number | undefined
};
	/** order by var_samp() on columns of table "ProjectMedia" */
["ProjectMedia_var_samp_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined
};
	/** aggregate variance on columns */
["ProjectMedia_variance_fields"]: {
	__typename: "ProjectMedia_variance_fields",
	index?: number | undefined
};
	/** order by variance() on columns of table "ProjectMedia" */
["ProjectMedia_variance_order_by"]: {
		index?: GraphQLTypes["order_by"] | undefined
};
	["ProjectState"]: "scalar" & { name: "ProjectState" };
	/** Boolean expression to compare columns of type "ProjectState". All fields are combined with logical 'AND'. */
["ProjectState_comparison_exp"]: {
		_eq?: GraphQLTypes["ProjectState"] | undefined,
	_gt?: GraphQLTypes["ProjectState"] | undefined,
	_gte?: GraphQLTypes["ProjectState"] | undefined,
	_in?: Array<GraphQLTypes["ProjectState"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["ProjectState"] | undefined,
	_lte?: GraphQLTypes["ProjectState"] | undefined,
	_neq?: GraphQLTypes["ProjectState"] | undefined,
	_nin?: Array<GraphQLTypes["ProjectState"]> | undefined
};
	/** aggregated selection of "Project" */
["Project_aggregate"]: {
	__typename: "Project_aggregate",
	aggregate?: GraphQLTypes["Project_aggregate_fields"] | undefined,
	nodes: Array<GraphQLTypes["Project"]>
};
	["Project_aggregate_bool_exp"]: {
		count?: GraphQLTypes["Project_aggregate_bool_exp_count"] | undefined
};
	["Project_aggregate_bool_exp_count"]: {
		arguments?: Array<GraphQLTypes["Project_select_column"]> | undefined,
	distinct?: boolean | undefined,
	filter?: GraphQLTypes["Project_bool_exp"] | undefined,
	predicate: GraphQLTypes["Int_comparison_exp"]
};
	/** aggregate fields of "Project" */
["Project_aggregate_fields"]: {
	__typename: "Project_aggregate_fields",
	count: number,
	max?: GraphQLTypes["Project_max_fields"] | undefined,
	min?: GraphQLTypes["Project_min_fields"] | undefined
};
	/** order by aggregate values of table "Project" */
["Project_aggregate_order_by"]: {
		count?: GraphQLTypes["order_by"] | undefined,
	max?: GraphQLTypes["Project_max_order_by"] | undefined,
	min?: GraphQLTypes["Project_min_order_by"] | undefined
};
	/** append existing jsonb value of filtered columns with new jsonb value */
["Project_append_input"]: {
		pricing?: GraphQLTypes["jsonb"] | undefined
};
	/** input type for inserting array relation for remote table "Project" */
["Project_arr_rel_insert_input"]: {
		data: Array<GraphQLTypes["Project_insert_input"]>,
	/** upsert condition */
	on_conflict?: GraphQLTypes["Project_on_conflict"] | undefined
};
	/** Boolean expression to filter rows from the table "Project". All fields are combined with a logical 'AND'. */
["Project_bool_exp"]: {
		_and?: Array<GraphQLTypes["Project_bool_exp"]> | undefined,
	_not?: GraphQLTypes["Project_bool_exp"] | undefined,
	_or?: Array<GraphQLTypes["Project_bool_exp"]> | undefined,
	author?: GraphQLTypes["Account_bool_exp"] | undefined,
	authorId?: GraphQLTypes["uuid_comparison_exp"] | undefined,
	blockchain?: GraphQLTypes["BlockchainNetwork_comparison_exp"] | undefined,
	createdAt?: GraphQLTypes["timestamp_comparison_exp"] | undefined,
	curator?: GraphQLTypes["Account_bool_exp"] | undefined,
	curatorId?: GraphQLTypes["uuid_comparison_exp"] | undefined,
	description?: GraphQLTypes["String_comparison_exp"] | undefined,
	id?: GraphQLTypes["uuid_comparison_exp"] | undefined,
	pricing?: GraphQLTypes["jsonb_comparison_exp"] | undefined,
	projectMedias?: GraphQLTypes["ProjectMedia_bool_exp"] | undefined,
	projectMedias_aggregate?: GraphQLTypes["ProjectMedia_aggregate_bool_exp"] | undefined,
	releaseAt?: GraphQLTypes["timestamp_comparison_exp"] | undefined,
	state?: GraphQLTypes["ProjectState_comparison_exp"] | undefined,
	storage?: GraphQLTypes["Storage_comparison_exp"] | undefined,
	title?: GraphQLTypes["String_comparison_exp"] | undefined,
	updatedAt?: GraphQLTypes["timestamp_comparison_exp"] | undefined
};
	/** unique or primary key constraints on table "Project" */
["Project_constraint"]: Project_constraint;
	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
["Project_delete_at_path_input"]: {
		pricing?: Array<string> | undefined
};
	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
["Project_delete_elem_input"]: {
		pricing?: number | undefined
};
	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
["Project_delete_key_input"]: {
		pricing?: string | undefined
};
	/** input type for inserting data into table "Project" */
["Project_insert_input"]: {
		author?: GraphQLTypes["Account_obj_rel_insert_input"] | undefined,
	authorId?: GraphQLTypes["uuid"] | undefined,
	blockchain?: GraphQLTypes["BlockchainNetwork"] | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	curator?: GraphQLTypes["Account_obj_rel_insert_input"] | undefined,
	curatorId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	pricing?: GraphQLTypes["jsonb"] | undefined,
	projectMedias?: GraphQLTypes["ProjectMedia_arr_rel_insert_input"] | undefined,
	releaseAt?: GraphQLTypes["timestamp"] | undefined,
	state?: GraphQLTypes["ProjectState"] | undefined,
	storage?: GraphQLTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined
};
	/** aggregate max on columns */
["Project_max_fields"]: {
	__typename: "Project_max_fields",
	authorId?: GraphQLTypes["uuid"] | undefined,
	blockchain?: GraphQLTypes["BlockchainNetwork"] | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	curatorId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	releaseAt?: GraphQLTypes["timestamp"] | undefined,
	state?: GraphQLTypes["ProjectState"] | undefined,
	storage?: GraphQLTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined
};
	/** order by max() on columns of table "Project" */
["Project_max_order_by"]: {
		authorId?: GraphQLTypes["order_by"] | undefined,
	blockchain?: GraphQLTypes["order_by"] | undefined,
	createdAt?: GraphQLTypes["order_by"] | undefined,
	curatorId?: GraphQLTypes["order_by"] | undefined,
	description?: GraphQLTypes["order_by"] | undefined,
	id?: GraphQLTypes["order_by"] | undefined,
	releaseAt?: GraphQLTypes["order_by"] | undefined,
	state?: GraphQLTypes["order_by"] | undefined,
	storage?: GraphQLTypes["order_by"] | undefined,
	title?: GraphQLTypes["order_by"] | undefined,
	updatedAt?: GraphQLTypes["order_by"] | undefined
};
	/** aggregate min on columns */
["Project_min_fields"]: {
	__typename: "Project_min_fields",
	authorId?: GraphQLTypes["uuid"] | undefined,
	blockchain?: GraphQLTypes["BlockchainNetwork"] | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	curatorId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	releaseAt?: GraphQLTypes["timestamp"] | undefined,
	state?: GraphQLTypes["ProjectState"] | undefined,
	storage?: GraphQLTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined
};
	/** order by min() on columns of table "Project" */
["Project_min_order_by"]: {
		authorId?: GraphQLTypes["order_by"] | undefined,
	blockchain?: GraphQLTypes["order_by"] | undefined,
	createdAt?: GraphQLTypes["order_by"] | undefined,
	curatorId?: GraphQLTypes["order_by"] | undefined,
	description?: GraphQLTypes["order_by"] | undefined,
	id?: GraphQLTypes["order_by"] | undefined,
	releaseAt?: GraphQLTypes["order_by"] | undefined,
	state?: GraphQLTypes["order_by"] | undefined,
	storage?: GraphQLTypes["order_by"] | undefined,
	title?: GraphQLTypes["order_by"] | undefined,
	updatedAt?: GraphQLTypes["order_by"] | undefined
};
	/** response of any mutation on the table "Project" */
["Project_mutation_response"]: {
	__typename: "Project_mutation_response",
	/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<GraphQLTypes["Project"]>
};
	/** input type for inserting object relation for remote table "Project" */
["Project_obj_rel_insert_input"]: {
		data: GraphQLTypes["Project_insert_input"],
	/** upsert condition */
	on_conflict?: GraphQLTypes["Project_on_conflict"] | undefined
};
	/** on_conflict condition type for table "Project" */
["Project_on_conflict"]: {
		constraint: GraphQLTypes["Project_constraint"],
	update_columns: Array<GraphQLTypes["Project_update_column"]>,
	where?: GraphQLTypes["Project_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Project". */
["Project_order_by"]: {
		author?: GraphQLTypes["Account_order_by"] | undefined,
	authorId?: GraphQLTypes["order_by"] | undefined,
	blockchain?: GraphQLTypes["order_by"] | undefined,
	createdAt?: GraphQLTypes["order_by"] | undefined,
	curator?: GraphQLTypes["Account_order_by"] | undefined,
	curatorId?: GraphQLTypes["order_by"] | undefined,
	description?: GraphQLTypes["order_by"] | undefined,
	id?: GraphQLTypes["order_by"] | undefined,
	pricing?: GraphQLTypes["order_by"] | undefined,
	projectMedias_aggregate?: GraphQLTypes["ProjectMedia_aggregate_order_by"] | undefined,
	releaseAt?: GraphQLTypes["order_by"] | undefined,
	state?: GraphQLTypes["order_by"] | undefined,
	storage?: GraphQLTypes["order_by"] | undefined,
	title?: GraphQLTypes["order_by"] | undefined,
	updatedAt?: GraphQLTypes["order_by"] | undefined
};
	/** primary key columns input for table: Project */
["Project_pk_columns_input"]: {
		id: GraphQLTypes["uuid"]
};
	/** prepend existing jsonb value of filtered columns with new jsonb value */
["Project_prepend_input"]: {
		pricing?: GraphQLTypes["jsonb"] | undefined
};
	/** select columns of table "Project" */
["Project_select_column"]: Project_select_column;
	/** input type for updating data in table "Project" */
["Project_set_input"]: {
		authorId?: GraphQLTypes["uuid"] | undefined,
	blockchain?: GraphQLTypes["BlockchainNetwork"] | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	curatorId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	pricing?: GraphQLTypes["jsonb"] | undefined,
	releaseAt?: GraphQLTypes["timestamp"] | undefined,
	state?: GraphQLTypes["ProjectState"] | undefined,
	storage?: GraphQLTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined
};
	/** Streaming cursor of the table "Project" */
["Project_stream_cursor_input"]: {
		/** Stream column input with initial value */
	initial_value: GraphQLTypes["Project_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: GraphQLTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Project_stream_cursor_value_input"]: {
		authorId?: GraphQLTypes["uuid"] | undefined,
	blockchain?: GraphQLTypes["BlockchainNetwork"] | undefined,
	createdAt?: GraphQLTypes["timestamp"] | undefined,
	curatorId?: GraphQLTypes["uuid"] | undefined,
	description?: string | undefined,
	id?: GraphQLTypes["uuid"] | undefined,
	pricing?: GraphQLTypes["jsonb"] | undefined,
	releaseAt?: GraphQLTypes["timestamp"] | undefined,
	state?: GraphQLTypes["ProjectState"] | undefined,
	storage?: GraphQLTypes["Storage"] | undefined,
	title?: string | undefined,
	updatedAt?: GraphQLTypes["timestamp"] | undefined
};
	/** update columns of table "Project" */
["Project_update_column"]: Project_update_column;
	["Project_updates"]: {
		/** append existing jsonb value of filtered columns with new jsonb value */
	_append?: GraphQLTypes["Project_append_input"] | undefined,
	/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
	_delete_at_path?: GraphQLTypes["Project_delete_at_path_input"] | undefined,
	/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
	_delete_elem?: GraphQLTypes["Project_delete_elem_input"] | undefined,
	/** delete key/value pair or string element. key/value pairs are matched based on their key value */
	_delete_key?: GraphQLTypes["Project_delete_key_input"] | undefined,
	/** prepend existing jsonb value of filtered columns with new jsonb value */
	_prepend?: GraphQLTypes["Project_prepend_input"] | undefined,
	/** sets the columns of the filtered rows to the given values */
	_set?: GraphQLTypes["Project_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: GraphQLTypes["Project_bool_exp"]
};
	["Storage"]: "scalar" & { name: "Storage" };
	/** Boolean expression to compare columns of type "Storage". All fields are combined with logical 'AND'. */
["Storage_comparison_exp"]: {
		_eq?: GraphQLTypes["Storage"] | undefined,
	_gt?: GraphQLTypes["Storage"] | undefined,
	_gte?: GraphQLTypes["Storage"] | undefined,
	_in?: Array<GraphQLTypes["Storage"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["Storage"] | undefined,
	_lte?: GraphQLTypes["Storage"] | undefined,
	_neq?: GraphQLTypes["Storage"] | undefined,
	_nin?: Array<GraphQLTypes["Storage"]> | undefined
};
	/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
["String_comparison_exp"]: {
		_eq?: string | undefined,
	_gt?: string | undefined,
	_gte?: string | undefined,
	/** does the column match the given case-insensitive pattern */
	_ilike?: string | undefined,
	_in?: Array<string> | undefined,
	/** does the column match the given POSIX regular expression, case insensitive */
	_iregex?: string | undefined,
	_is_null?: boolean | undefined,
	/** does the column match the given pattern */
	_like?: string | undefined,
	_lt?: string | undefined,
	_lte?: string | undefined,
	_neq?: string | undefined,
	/** does the column NOT match the given case-insensitive pattern */
	_nilike?: string | undefined,
	_nin?: Array<string> | undefined,
	/** does the column NOT match the given POSIX regular expression, case insensitive */
	_niregex?: string | undefined,
	/** does the column NOT match the given pattern */
	_nlike?: string | undefined,
	/** does the column NOT match the given POSIX regular expression, case sensitive */
	_nregex?: string | undefined,
	/** does the column NOT match the given SQL regular expression */
	_nsimilar?: string | undefined,
	/** does the column match the given POSIX regular expression, case sensitive */
	_regex?: string | undefined,
	/** does the column match the given SQL regular expression */
	_similar?: string | undefined
};
	/** columns and relationships of "Wallet" */
["Wallet"]: {
	__typename: "Wallet",
	accountId: GraphQLTypes["uuid"],
	address: string,
	network: GraphQLTypes["BlockchainNetwork"]
};
	/** aggregated selection of "Wallet" */
["Wallet_aggregate"]: {
	__typename: "Wallet_aggregate",
	aggregate?: GraphQLTypes["Wallet_aggregate_fields"] | undefined,
	nodes: Array<GraphQLTypes["Wallet"]>
};
	["Wallet_aggregate_bool_exp"]: {
		count?: GraphQLTypes["Wallet_aggregate_bool_exp_count"] | undefined
};
	["Wallet_aggregate_bool_exp_count"]: {
		arguments?: Array<GraphQLTypes["Wallet_select_column"]> | undefined,
	distinct?: boolean | undefined,
	filter?: GraphQLTypes["Wallet_bool_exp"] | undefined,
	predicate: GraphQLTypes["Int_comparison_exp"]
};
	/** aggregate fields of "Wallet" */
["Wallet_aggregate_fields"]: {
	__typename: "Wallet_aggregate_fields",
	count: number,
	max?: GraphQLTypes["Wallet_max_fields"] | undefined,
	min?: GraphQLTypes["Wallet_min_fields"] | undefined
};
	/** order by aggregate values of table "Wallet" */
["Wallet_aggregate_order_by"]: {
		count?: GraphQLTypes["order_by"] | undefined,
	max?: GraphQLTypes["Wallet_max_order_by"] | undefined,
	min?: GraphQLTypes["Wallet_min_order_by"] | undefined
};
	/** input type for inserting array relation for remote table "Wallet" */
["Wallet_arr_rel_insert_input"]: {
		data: Array<GraphQLTypes["Wallet_insert_input"]>,
	/** upsert condition */
	on_conflict?: GraphQLTypes["Wallet_on_conflict"] | undefined
};
	/** Boolean expression to filter rows from the table "Wallet". All fields are combined with a logical 'AND'. */
["Wallet_bool_exp"]: {
		_and?: Array<GraphQLTypes["Wallet_bool_exp"]> | undefined,
	_not?: GraphQLTypes["Wallet_bool_exp"] | undefined,
	_or?: Array<GraphQLTypes["Wallet_bool_exp"]> | undefined,
	accountId?: GraphQLTypes["uuid_comparison_exp"] | undefined,
	address?: GraphQLTypes["String_comparison_exp"] | undefined,
	network?: GraphQLTypes["BlockchainNetwork_comparison_exp"] | undefined
};
	/** unique or primary key constraints on table "Wallet" */
["Wallet_constraint"]: Wallet_constraint;
	/** input type for inserting data into table "Wallet" */
["Wallet_insert_input"]: {
		accountId?: GraphQLTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: GraphQLTypes["BlockchainNetwork"] | undefined
};
	/** aggregate max on columns */
["Wallet_max_fields"]: {
	__typename: "Wallet_max_fields",
	accountId?: GraphQLTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: GraphQLTypes["BlockchainNetwork"] | undefined
};
	/** order by max() on columns of table "Wallet" */
["Wallet_max_order_by"]: {
		accountId?: GraphQLTypes["order_by"] | undefined,
	address?: GraphQLTypes["order_by"] | undefined,
	network?: GraphQLTypes["order_by"] | undefined
};
	/** aggregate min on columns */
["Wallet_min_fields"]: {
	__typename: "Wallet_min_fields",
	accountId?: GraphQLTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: GraphQLTypes["BlockchainNetwork"] | undefined
};
	/** order by min() on columns of table "Wallet" */
["Wallet_min_order_by"]: {
		accountId?: GraphQLTypes["order_by"] | undefined,
	address?: GraphQLTypes["order_by"] | undefined,
	network?: GraphQLTypes["order_by"] | undefined
};
	/** response of any mutation on the table "Wallet" */
["Wallet_mutation_response"]: {
	__typename: "Wallet_mutation_response",
	/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<GraphQLTypes["Wallet"]>
};
	/** on_conflict condition type for table "Wallet" */
["Wallet_on_conflict"]: {
		constraint: GraphQLTypes["Wallet_constraint"],
	update_columns: Array<GraphQLTypes["Wallet_update_column"]>,
	where?: GraphQLTypes["Wallet_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "Wallet". */
["Wallet_order_by"]: {
		accountId?: GraphQLTypes["order_by"] | undefined,
	address?: GraphQLTypes["order_by"] | undefined,
	network?: GraphQLTypes["order_by"] | undefined
};
	/** primary key columns input for table: Wallet */
["Wallet_pk_columns_input"]: {
		address: string
};
	/** select columns of table "Wallet" */
["Wallet_select_column"]: Wallet_select_column;
	/** input type for updating data in table "Wallet" */
["Wallet_set_input"]: {
		accountId?: GraphQLTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: GraphQLTypes["BlockchainNetwork"] | undefined
};
	/** Streaming cursor of the table "Wallet" */
["Wallet_stream_cursor_input"]: {
		/** Stream column input with initial value */
	initial_value: GraphQLTypes["Wallet_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: GraphQLTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["Wallet_stream_cursor_value_input"]: {
		accountId?: GraphQLTypes["uuid"] | undefined,
	address?: string | undefined,
	network?: GraphQLTypes["BlockchainNetwork"] | undefined
};
	/** update columns of table "Wallet" */
["Wallet_update_column"]: Wallet_update_column;
	["Wallet_updates"]: {
		/** sets the columns of the filtered rows to the given values */
	_set?: GraphQLTypes["Wallet_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: GraphQLTypes["Wallet_bool_exp"]
};
	["_AccountRoles"]: "scalar" & { name: "_AccountRoles" };
	/** Boolean expression to compare columns of type "_AccountRoles". All fields are combined with logical 'AND'. */
["_AccountRoles_comparison_exp"]: {
		_eq?: GraphQLTypes["_AccountRoles"] | undefined,
	_gt?: GraphQLTypes["_AccountRoles"] | undefined,
	_gte?: GraphQLTypes["_AccountRoles"] | undefined,
	_in?: Array<GraphQLTypes["_AccountRoles"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["_AccountRoles"] | undefined,
	_lte?: GraphQLTypes["_AccountRoles"] | undefined,
	_neq?: GraphQLTypes["_AccountRoles"] | undefined,
	_nin?: Array<GraphQLTypes["_AccountRoles"]> | undefined
};
	/** columns and relationships of "_prisma_migrations" */
["_prisma_migrations"]: {
	__typename: "_prisma_migrations",
	applied_steps_count: number,
	checksum: string,
	finished_at?: GraphQLTypes["timestamptz"] | undefined,
	id: string,
	logs?: string | undefined,
	migration_name: string,
	rolled_back_at?: GraphQLTypes["timestamptz"] | undefined,
	started_at: GraphQLTypes["timestamptz"]
};
	/** aggregated selection of "_prisma_migrations" */
["_prisma_migrations_aggregate"]: {
	__typename: "_prisma_migrations_aggregate",
	aggregate?: GraphQLTypes["_prisma_migrations_aggregate_fields"] | undefined,
	nodes: Array<GraphQLTypes["_prisma_migrations"]>
};
	/** aggregate fields of "_prisma_migrations" */
["_prisma_migrations_aggregate_fields"]: {
	__typename: "_prisma_migrations_aggregate_fields",
	avg?: GraphQLTypes["_prisma_migrations_avg_fields"] | undefined,
	count: number,
	max?: GraphQLTypes["_prisma_migrations_max_fields"] | undefined,
	min?: GraphQLTypes["_prisma_migrations_min_fields"] | undefined,
	stddev?: GraphQLTypes["_prisma_migrations_stddev_fields"] | undefined,
	stddev_pop?: GraphQLTypes["_prisma_migrations_stddev_pop_fields"] | undefined,
	stddev_samp?: GraphQLTypes["_prisma_migrations_stddev_samp_fields"] | undefined,
	sum?: GraphQLTypes["_prisma_migrations_sum_fields"] | undefined,
	var_pop?: GraphQLTypes["_prisma_migrations_var_pop_fields"] | undefined,
	var_samp?: GraphQLTypes["_prisma_migrations_var_samp_fields"] | undefined,
	variance?: GraphQLTypes["_prisma_migrations_variance_fields"] | undefined
};
	/** aggregate avg on columns */
["_prisma_migrations_avg_fields"]: {
	__typename: "_prisma_migrations_avg_fields",
	applied_steps_count?: number | undefined
};
	/** Boolean expression to filter rows from the table "_prisma_migrations". All fields are combined with a logical 'AND'. */
["_prisma_migrations_bool_exp"]: {
		_and?: Array<GraphQLTypes["_prisma_migrations_bool_exp"]> | undefined,
	_not?: GraphQLTypes["_prisma_migrations_bool_exp"] | undefined,
	_or?: Array<GraphQLTypes["_prisma_migrations_bool_exp"]> | undefined,
	applied_steps_count?: GraphQLTypes["Int_comparison_exp"] | undefined,
	checksum?: GraphQLTypes["String_comparison_exp"] | undefined,
	finished_at?: GraphQLTypes["timestamptz_comparison_exp"] | undefined,
	id?: GraphQLTypes["String_comparison_exp"] | undefined,
	logs?: GraphQLTypes["String_comparison_exp"] | undefined,
	migration_name?: GraphQLTypes["String_comparison_exp"] | undefined,
	rolled_back_at?: GraphQLTypes["timestamptz_comparison_exp"] | undefined,
	started_at?: GraphQLTypes["timestamptz_comparison_exp"] | undefined
};
	/** unique or primary key constraints on table "_prisma_migrations" */
["_prisma_migrations_constraint"]: _prisma_migrations_constraint;
	/** input type for incrementing numeric columns in table "_prisma_migrations" */
["_prisma_migrations_inc_input"]: {
		applied_steps_count?: number | undefined
};
	/** input type for inserting data into table "_prisma_migrations" */
["_prisma_migrations_insert_input"]: {
		applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: GraphQLTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: GraphQLTypes["timestamptz"] | undefined,
	started_at?: GraphQLTypes["timestamptz"] | undefined
};
	/** aggregate max on columns */
["_prisma_migrations_max_fields"]: {
	__typename: "_prisma_migrations_max_fields",
	applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: GraphQLTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: GraphQLTypes["timestamptz"] | undefined,
	started_at?: GraphQLTypes["timestamptz"] | undefined
};
	/** aggregate min on columns */
["_prisma_migrations_min_fields"]: {
	__typename: "_prisma_migrations_min_fields",
	applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: GraphQLTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: GraphQLTypes["timestamptz"] | undefined,
	started_at?: GraphQLTypes["timestamptz"] | undefined
};
	/** response of any mutation on the table "_prisma_migrations" */
["_prisma_migrations_mutation_response"]: {
	__typename: "_prisma_migrations_mutation_response",
	/** number of rows affected by the mutation */
	affected_rows: number,
	/** data from the rows affected by the mutation */
	returning: Array<GraphQLTypes["_prisma_migrations"]>
};
	/** on_conflict condition type for table "_prisma_migrations" */
["_prisma_migrations_on_conflict"]: {
		constraint: GraphQLTypes["_prisma_migrations_constraint"],
	update_columns: Array<GraphQLTypes["_prisma_migrations_update_column"]>,
	where?: GraphQLTypes["_prisma_migrations_bool_exp"] | undefined
};
	/** Ordering options when selecting data from "_prisma_migrations". */
["_prisma_migrations_order_by"]: {
		applied_steps_count?: GraphQLTypes["order_by"] | undefined,
	checksum?: GraphQLTypes["order_by"] | undefined,
	finished_at?: GraphQLTypes["order_by"] | undefined,
	id?: GraphQLTypes["order_by"] | undefined,
	logs?: GraphQLTypes["order_by"] | undefined,
	migration_name?: GraphQLTypes["order_by"] | undefined,
	rolled_back_at?: GraphQLTypes["order_by"] | undefined,
	started_at?: GraphQLTypes["order_by"] | undefined
};
	/** primary key columns input for table: _prisma_migrations */
["_prisma_migrations_pk_columns_input"]: {
		id: string
};
	/** select columns of table "_prisma_migrations" */
["_prisma_migrations_select_column"]: _prisma_migrations_select_column;
	/** input type for updating data in table "_prisma_migrations" */
["_prisma_migrations_set_input"]: {
		applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: GraphQLTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: GraphQLTypes["timestamptz"] | undefined,
	started_at?: GraphQLTypes["timestamptz"] | undefined
};
	/** aggregate stddev on columns */
["_prisma_migrations_stddev_fields"]: {
	__typename: "_prisma_migrations_stddev_fields",
	applied_steps_count?: number | undefined
};
	/** aggregate stddev_pop on columns */
["_prisma_migrations_stddev_pop_fields"]: {
	__typename: "_prisma_migrations_stddev_pop_fields",
	applied_steps_count?: number | undefined
};
	/** aggregate stddev_samp on columns */
["_prisma_migrations_stddev_samp_fields"]: {
	__typename: "_prisma_migrations_stddev_samp_fields",
	applied_steps_count?: number | undefined
};
	/** Streaming cursor of the table "_prisma_migrations" */
["_prisma_migrations_stream_cursor_input"]: {
		/** Stream column input with initial value */
	initial_value: GraphQLTypes["_prisma_migrations_stream_cursor_value_input"],
	/** cursor ordering */
	ordering?: GraphQLTypes["cursor_ordering"] | undefined
};
	/** Initial value of the column from where the streaming should start */
["_prisma_migrations_stream_cursor_value_input"]: {
		applied_steps_count?: number | undefined,
	checksum?: string | undefined,
	finished_at?: GraphQLTypes["timestamptz"] | undefined,
	id?: string | undefined,
	logs?: string | undefined,
	migration_name?: string | undefined,
	rolled_back_at?: GraphQLTypes["timestamptz"] | undefined,
	started_at?: GraphQLTypes["timestamptz"] | undefined
};
	/** aggregate sum on columns */
["_prisma_migrations_sum_fields"]: {
	__typename: "_prisma_migrations_sum_fields",
	applied_steps_count?: number | undefined
};
	/** update columns of table "_prisma_migrations" */
["_prisma_migrations_update_column"]: _prisma_migrations_update_column;
	["_prisma_migrations_updates"]: {
		/** increments the numeric columns with given value of the filtered values */
	_inc?: GraphQLTypes["_prisma_migrations_inc_input"] | undefined,
	/** sets the columns of the filtered rows to the given values */
	_set?: GraphQLTypes["_prisma_migrations_set_input"] | undefined,
	/** filter the rows which have to be updated */
	where: GraphQLTypes["_prisma_migrations_bool_exp"]
};
	/** aggregate var_pop on columns */
["_prisma_migrations_var_pop_fields"]: {
	__typename: "_prisma_migrations_var_pop_fields",
	applied_steps_count?: number | undefined
};
	/** aggregate var_samp on columns */
["_prisma_migrations_var_samp_fields"]: {
	__typename: "_prisma_migrations_var_samp_fields",
	applied_steps_count?: number | undefined
};
	/** aggregate variance on columns */
["_prisma_migrations_variance_fields"]: {
	__typename: "_prisma_migrations_variance_fields",
	applied_steps_count?: number | undefined
};
	/** ordering argument of a cursor */
["cursor_ordering"]: cursor_ordering;
	["jsonb"]: "scalar" & { name: "jsonb" };
	["jsonb_cast_exp"]: {
		String?: GraphQLTypes["String_comparison_exp"] | undefined
};
	/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
["jsonb_comparison_exp"]: {
		_cast?: GraphQLTypes["jsonb_cast_exp"] | undefined,
	/** is the column contained in the given json value */
	_contained_in?: GraphQLTypes["jsonb"] | undefined,
	/** does the column contain the given json value at the top level */
	_contains?: GraphQLTypes["jsonb"] | undefined,
	_eq?: GraphQLTypes["jsonb"] | undefined,
	_gt?: GraphQLTypes["jsonb"] | undefined,
	_gte?: GraphQLTypes["jsonb"] | undefined,
	/** does the string exist as a top-level key in the column */
	_has_key?: string | undefined,
	/** do all of these strings exist as top-level keys in the column */
	_has_keys_all?: Array<string> | undefined,
	/** do any of these strings exist as top-level keys in the column */
	_has_keys_any?: Array<string> | undefined,
	_in?: Array<GraphQLTypes["jsonb"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["jsonb"] | undefined,
	_lte?: GraphQLTypes["jsonb"] | undefined,
	_neq?: GraphQLTypes["jsonb"] | undefined,
	_nin?: Array<GraphQLTypes["jsonb"]> | undefined
};
	/** mutation root */
["mutation_root"]: {
	__typename: "mutation_root",
	/** delete data from the table: "Account" */
	delete_Account?: GraphQLTypes["Account_mutation_response"] | undefined,
	/** delete single row from the table: "Account" */
	delete_Account_by_pk?: GraphQLTypes["Account"] | undefined,
	/** delete data from the table: "Media" */
	delete_Media?: GraphQLTypes["Media_mutation_response"] | undefined,
	/** delete single row from the table: "Media" */
	delete_Media_by_pk?: GraphQLTypes["Media"] | undefined,
	/** delete data from the table: "Profile" */
	delete_Profile?: GraphQLTypes["Profile_mutation_response"] | undefined,
	/** delete single row from the table: "Profile" */
	delete_Profile_by_pk?: GraphQLTypes["Profile"] | undefined,
	/** delete data from the table: "Project" */
	delete_Project?: GraphQLTypes["Project_mutation_response"] | undefined,
	/** delete data from the table: "ProjectMedia" */
	delete_ProjectMedia?: GraphQLTypes["ProjectMedia_mutation_response"] | undefined,
	/** delete single row from the table: "Project" */
	delete_Project_by_pk?: GraphQLTypes["Project"] | undefined,
	/** delete data from the table: "Wallet" */
	delete_Wallet?: GraphQLTypes["Wallet_mutation_response"] | undefined,
	/** delete single row from the table: "Wallet" */
	delete_Wallet_by_pk?: GraphQLTypes["Wallet"] | undefined,
	/** delete data from the table: "_prisma_migrations" */
	delete__prisma_migrations?: GraphQLTypes["_prisma_migrations_mutation_response"] | undefined,
	/** delete single row from the table: "_prisma_migrations" */
	delete__prisma_migrations_by_pk?: GraphQLTypes["_prisma_migrations"] | undefined,
	/** insert data into the table: "Account" */
	insert_Account?: GraphQLTypes["Account_mutation_response"] | undefined,
	/** insert a single row into the table: "Account" */
	insert_Account_one?: GraphQLTypes["Account"] | undefined,
	/** insert data into the table: "Media" */
	insert_Media?: GraphQLTypes["Media_mutation_response"] | undefined,
	/** insert a single row into the table: "Media" */
	insert_Media_one?: GraphQLTypes["Media"] | undefined,
	/** insert data into the table: "Profile" */
	insert_Profile?: GraphQLTypes["Profile_mutation_response"] | undefined,
	/** insert a single row into the table: "Profile" */
	insert_Profile_one?: GraphQLTypes["Profile"] | undefined,
	/** insert data into the table: "Project" */
	insert_Project?: GraphQLTypes["Project_mutation_response"] | undefined,
	/** insert data into the table: "ProjectMedia" */
	insert_ProjectMedia?: GraphQLTypes["ProjectMedia_mutation_response"] | undefined,
	/** insert a single row into the table: "ProjectMedia" */
	insert_ProjectMedia_one?: GraphQLTypes["ProjectMedia"] | undefined,
	/** insert a single row into the table: "Project" */
	insert_Project_one?: GraphQLTypes["Project"] | undefined,
	/** insert data into the table: "Wallet" */
	insert_Wallet?: GraphQLTypes["Wallet_mutation_response"] | undefined,
	/** insert a single row into the table: "Wallet" */
	insert_Wallet_one?: GraphQLTypes["Wallet"] | undefined,
	/** insert data into the table: "_prisma_migrations" */
	insert__prisma_migrations?: GraphQLTypes["_prisma_migrations_mutation_response"] | undefined,
	/** insert a single row into the table: "_prisma_migrations" */
	insert__prisma_migrations_one?: GraphQLTypes["_prisma_migrations"] | undefined,
	/** update data of the table: "Account" */
	update_Account?: GraphQLTypes["Account_mutation_response"] | undefined,
	/** update single row of the table: "Account" */
	update_Account_by_pk?: GraphQLTypes["Account"] | undefined,
	/** update multiples rows of table: "Account" */
	update_Account_many?: Array<GraphQLTypes["Account_mutation_response"] | undefined> | undefined,
	/** update data of the table: "Media" */
	update_Media?: GraphQLTypes["Media_mutation_response"] | undefined,
	/** update single row of the table: "Media" */
	update_Media_by_pk?: GraphQLTypes["Media"] | undefined,
	/** update multiples rows of table: "Media" */
	update_Media_many?: Array<GraphQLTypes["Media_mutation_response"] | undefined> | undefined,
	/** update data of the table: "Profile" */
	update_Profile?: GraphQLTypes["Profile_mutation_response"] | undefined,
	/** update single row of the table: "Profile" */
	update_Profile_by_pk?: GraphQLTypes["Profile"] | undefined,
	/** update multiples rows of table: "Profile" */
	update_Profile_many?: Array<GraphQLTypes["Profile_mutation_response"] | undefined> | undefined,
	/** update data of the table: "Project" */
	update_Project?: GraphQLTypes["Project_mutation_response"] | undefined,
	/** update data of the table: "ProjectMedia" */
	update_ProjectMedia?: GraphQLTypes["ProjectMedia_mutation_response"] | undefined,
	/** update multiples rows of table: "ProjectMedia" */
	update_ProjectMedia_many?: Array<GraphQLTypes["ProjectMedia_mutation_response"] | undefined> | undefined,
	/** update single row of the table: "Project" */
	update_Project_by_pk?: GraphQLTypes["Project"] | undefined,
	/** update multiples rows of table: "Project" */
	update_Project_many?: Array<GraphQLTypes["Project_mutation_response"] | undefined> | undefined,
	/** update data of the table: "Wallet" */
	update_Wallet?: GraphQLTypes["Wallet_mutation_response"] | undefined,
	/** update single row of the table: "Wallet" */
	update_Wallet_by_pk?: GraphQLTypes["Wallet"] | undefined,
	/** update multiples rows of table: "Wallet" */
	update_Wallet_many?: Array<GraphQLTypes["Wallet_mutation_response"] | undefined> | undefined,
	/** update data of the table: "_prisma_migrations" */
	update__prisma_migrations?: GraphQLTypes["_prisma_migrations_mutation_response"] | undefined,
	/** update single row of the table: "_prisma_migrations" */
	update__prisma_migrations_by_pk?: GraphQLTypes["_prisma_migrations"] | undefined,
	/** update multiples rows of table: "_prisma_migrations" */
	update__prisma_migrations_many?: Array<GraphQLTypes["_prisma_migrations_mutation_response"] | undefined> | undefined
};
	/** column ordering options */
["order_by"]: order_by;
	["query_root"]: {
	__typename: "query_root",
	/** fetch data from the table: "Account" */
	Account: Array<GraphQLTypes["Account"]>,
	/** fetch aggregated fields from the table: "Account" */
	Account_aggregate: GraphQLTypes["Account_aggregate"],
	/** fetch data from the table: "Account" using primary key columns */
	Account_by_pk?: GraphQLTypes["Account"] | undefined,
	/** fetch data from the table: "Media" */
	Media: Array<GraphQLTypes["Media"]>,
	/** fetch aggregated fields from the table: "Media" */
	Media_aggregate: GraphQLTypes["Media_aggregate"],
	/** fetch data from the table: "Media" using primary key columns */
	Media_by_pk?: GraphQLTypes["Media"] | undefined,
	/** fetch data from the table: "Profile" */
	Profile: Array<GraphQLTypes["Profile"]>,
	/** fetch aggregated fields from the table: "Profile" */
	Profile_aggregate: GraphQLTypes["Profile_aggregate"],
	/** fetch data from the table: "Profile" using primary key columns */
	Profile_by_pk?: GraphQLTypes["Profile"] | undefined,
	/** fetch data from the table: "Project" */
	Project: Array<GraphQLTypes["Project"]>,
	/** fetch data from the table: "ProjectMedia" */
	ProjectMedia: Array<GraphQLTypes["ProjectMedia"]>,
	/** fetch aggregated fields from the table: "ProjectMedia" */
	ProjectMedia_aggregate: GraphQLTypes["ProjectMedia_aggregate"],
	/** fetch aggregated fields from the table: "Project" */
	Project_aggregate: GraphQLTypes["Project_aggregate"],
	/** fetch data from the table: "Project" using primary key columns */
	Project_by_pk?: GraphQLTypes["Project"] | undefined,
	/** fetch data from the table: "Wallet" */
	Wallet: Array<GraphQLTypes["Wallet"]>,
	/** fetch aggregated fields from the table: "Wallet" */
	Wallet_aggregate: GraphQLTypes["Wallet_aggregate"],
	/** fetch data from the table: "Wallet" using primary key columns */
	Wallet_by_pk?: GraphQLTypes["Wallet"] | undefined,
	/** fetch data from the table: "_prisma_migrations" */
	_prisma_migrations: Array<GraphQLTypes["_prisma_migrations"]>,
	/** fetch aggregated fields from the table: "_prisma_migrations" */
	_prisma_migrations_aggregate: GraphQLTypes["_prisma_migrations_aggregate"],
	/** fetch data from the table: "_prisma_migrations" using primary key columns */
	_prisma_migrations_by_pk?: GraphQLTypes["_prisma_migrations"] | undefined,
	mediaFullUrl: string
};
	["smallint"]: "scalar" & { name: "smallint" };
	/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
["smallint_comparison_exp"]: {
		_eq?: GraphQLTypes["smallint"] | undefined,
	_gt?: GraphQLTypes["smallint"] | undefined,
	_gte?: GraphQLTypes["smallint"] | undefined,
	_in?: Array<GraphQLTypes["smallint"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["smallint"] | undefined,
	_lte?: GraphQLTypes["smallint"] | undefined,
	_neq?: GraphQLTypes["smallint"] | undefined,
	_nin?: Array<GraphQLTypes["smallint"]> | undefined
};
	["subscription_root"]: {
	__typename: "subscription_root",
	/** fetch data from the table: "Account" */
	Account: Array<GraphQLTypes["Account"]>,
	/** fetch aggregated fields from the table: "Account" */
	Account_aggregate: GraphQLTypes["Account_aggregate"],
	/** fetch data from the table: "Account" using primary key columns */
	Account_by_pk?: GraphQLTypes["Account"] | undefined,
	/** fetch data from the table in a streaming manner: "Account" */
	Account_stream: Array<GraphQLTypes["Account"]>,
	/** fetch data from the table: "Media" */
	Media: Array<GraphQLTypes["Media"]>,
	/** fetch aggregated fields from the table: "Media" */
	Media_aggregate: GraphQLTypes["Media_aggregate"],
	/** fetch data from the table: "Media" using primary key columns */
	Media_by_pk?: GraphQLTypes["Media"] | undefined,
	/** fetch data from the table in a streaming manner: "Media" */
	Media_stream: Array<GraphQLTypes["Media"]>,
	/** fetch data from the table: "Profile" */
	Profile: Array<GraphQLTypes["Profile"]>,
	/** fetch aggregated fields from the table: "Profile" */
	Profile_aggregate: GraphQLTypes["Profile_aggregate"],
	/** fetch data from the table: "Profile" using primary key columns */
	Profile_by_pk?: GraphQLTypes["Profile"] | undefined,
	/** fetch data from the table in a streaming manner: "Profile" */
	Profile_stream: Array<GraphQLTypes["Profile"]>,
	/** fetch data from the table: "Project" */
	Project: Array<GraphQLTypes["Project"]>,
	/** fetch data from the table: "ProjectMedia" */
	ProjectMedia: Array<GraphQLTypes["ProjectMedia"]>,
	/** fetch aggregated fields from the table: "ProjectMedia" */
	ProjectMedia_aggregate: GraphQLTypes["ProjectMedia_aggregate"],
	/** fetch data from the table in a streaming manner: "ProjectMedia" */
	ProjectMedia_stream: Array<GraphQLTypes["ProjectMedia"]>,
	/** fetch aggregated fields from the table: "Project" */
	Project_aggregate: GraphQLTypes["Project_aggregate"],
	/** fetch data from the table: "Project" using primary key columns */
	Project_by_pk?: GraphQLTypes["Project"] | undefined,
	/** fetch data from the table in a streaming manner: "Project" */
	Project_stream: Array<GraphQLTypes["Project"]>,
	/** fetch data from the table: "Wallet" */
	Wallet: Array<GraphQLTypes["Wallet"]>,
	/** fetch aggregated fields from the table: "Wallet" */
	Wallet_aggregate: GraphQLTypes["Wallet_aggregate"],
	/** fetch data from the table: "Wallet" using primary key columns */
	Wallet_by_pk?: GraphQLTypes["Wallet"] | undefined,
	/** fetch data from the table in a streaming manner: "Wallet" */
	Wallet_stream: Array<GraphQLTypes["Wallet"]>,
	/** fetch data from the table: "_prisma_migrations" */
	_prisma_migrations: Array<GraphQLTypes["_prisma_migrations"]>,
	/** fetch aggregated fields from the table: "_prisma_migrations" */
	_prisma_migrations_aggregate: GraphQLTypes["_prisma_migrations_aggregate"],
	/** fetch data from the table: "_prisma_migrations" using primary key columns */
	_prisma_migrations_by_pk?: GraphQLTypes["_prisma_migrations"] | undefined,
	/** fetch data from the table in a streaming manner: "_prisma_migrations" */
	_prisma_migrations_stream: Array<GraphQLTypes["_prisma_migrations"]>
};
	["timestamp"]: "scalar" & { name: "timestamp" };
	/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
["timestamp_comparison_exp"]: {
		_eq?: GraphQLTypes["timestamp"] | undefined,
	_gt?: GraphQLTypes["timestamp"] | undefined,
	_gte?: GraphQLTypes["timestamp"] | undefined,
	_in?: Array<GraphQLTypes["timestamp"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["timestamp"] | undefined,
	_lte?: GraphQLTypes["timestamp"] | undefined,
	_neq?: GraphQLTypes["timestamp"] | undefined,
	_nin?: Array<GraphQLTypes["timestamp"]> | undefined
};
	["timestamptz"]: "scalar" & { name: "timestamptz" };
	/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
["timestamptz_comparison_exp"]: {
		_eq?: GraphQLTypes["timestamptz"] | undefined,
	_gt?: GraphQLTypes["timestamptz"] | undefined,
	_gte?: GraphQLTypes["timestamptz"] | undefined,
	_in?: Array<GraphQLTypes["timestamptz"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["timestamptz"] | undefined,
	_lte?: GraphQLTypes["timestamptz"] | undefined,
	_neq?: GraphQLTypes["timestamptz"] | undefined,
	_nin?: Array<GraphQLTypes["timestamptz"]> | undefined
};
	["uuid"]: "scalar" & { name: "uuid" };
	/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
["uuid_comparison_exp"]: {
		_eq?: GraphQLTypes["uuid"] | undefined,
	_gt?: GraphQLTypes["uuid"] | undefined,
	_gte?: GraphQLTypes["uuid"] | undefined,
	_in?: Array<GraphQLTypes["uuid"]> | undefined,
	_is_null?: boolean | undefined,
	_lt?: GraphQLTypes["uuid"] | undefined,
	_lte?: GraphQLTypes["uuid"] | undefined,
	_neq?: GraphQLTypes["uuid"] | undefined,
	_nin?: Array<GraphQLTypes["uuid"]> | undefined
}
    }
/** unique or primary key constraints on table "Account" */
export const enum Account_constraint {
	Account_pkey = "Account_pkey",
	Account_username_key = "Account_username_key"
}
/** select columns of table "Account" */
export const enum Account_select_column {
	id = "id",
	roles = "roles",
	status = "status",
	username = "username"
}
/** update columns of table "Account" */
export const enum Account_update_column {
	id = "id",
	roles = "roles",
	status = "status",
	username = "username"
}
/** unique or primary key constraints on table "Media" */
export const enum Media_constraint {
	Media_pkey = "Media_pkey"
}
/** select columns of table "Media" */
export const enum Media_select_column {
	bucketId = "bucketId",
	createdAt = "createdAt",
	etag = "etag",
	id = "id",
	name = "name",
	s3key = "s3key",
	size = "size",
	updatedAt = "updatedAt",
	uploaderId = "uploaderId"
}
/** update columns of table "Media" */
export const enum Media_update_column {
	bucketId = "bucketId",
	createdAt = "createdAt",
	etag = "etag",
	id = "id",
	name = "name",
	s3key = "s3key",
	size = "size",
	updatedAt = "updatedAt",
	uploaderId = "uploaderId"
}
/** unique or primary key constraints on table "Profile" */
export const enum Profile_constraint {
	Profile_pkey = "Profile_pkey"
}
/** select columns of table "Profile" */
export const enum Profile_select_column {
	accountId = "accountId",
	description = "description",
	instagram = "instagram",
	picture = "picture",
	twitter = "twitter",
	website = "website"
}
/** update columns of table "Profile" */
export const enum Profile_update_column {
	accountId = "accountId",
	description = "description",
	instagram = "instagram",
	picture = "picture",
	twitter = "twitter",
	website = "website"
}
/** unique or primary key constraints on table "ProjectMedia" */
export const enum ProjectMedia_constraint {
	ProjectMedia_index_projectId_mediaId_key = "ProjectMedia_index_projectId_mediaId_key"
}
/** select columns of table "ProjectMedia" */
export const enum ProjectMedia_select_column {
	index = "index",
	mediaId = "mediaId",
	projectId = "projectId"
}
/** update columns of table "ProjectMedia" */
export const enum ProjectMedia_update_column {
	index = "index",
	mediaId = "mediaId",
	projectId = "projectId"
}
/** unique or primary key constraints on table "Project" */
export const enum Project_constraint {
	Project_pkey = "Project_pkey"
}
/** select columns of table "Project" */
export const enum Project_select_column {
	authorId = "authorId",
	blockchain = "blockchain",
	createdAt = "createdAt",
	curatorId = "curatorId",
	description = "description",
	id = "id",
	pricing = "pricing",
	releaseAt = "releaseAt",
	state = "state",
	storage = "storage",
	title = "title",
	updatedAt = "updatedAt"
}
/** update columns of table "Project" */
export const enum Project_update_column {
	authorId = "authorId",
	blockchain = "blockchain",
	createdAt = "createdAt",
	curatorId = "curatorId",
	description = "description",
	id = "id",
	pricing = "pricing",
	releaseAt = "releaseAt",
	state = "state",
	storage = "storage",
	title = "title",
	updatedAt = "updatedAt"
}
/** unique or primary key constraints on table "Wallet" */
export const enum Wallet_constraint {
	Wallet_pkey = "Wallet_pkey"
}
/** select columns of table "Wallet" */
export const enum Wallet_select_column {
	accountId = "accountId",
	address = "address",
	network = "network"
}
/** update columns of table "Wallet" */
export const enum Wallet_update_column {
	accountId = "accountId",
	address = "address",
	network = "network"
}
/** unique or primary key constraints on table "_prisma_migrations" */
export const enum _prisma_migrations_constraint {
	_prisma_migrations_pkey = "_prisma_migrations_pkey"
}
/** select columns of table "_prisma_migrations" */
export const enum _prisma_migrations_select_column {
	applied_steps_count = "applied_steps_count",
	checksum = "checksum",
	finished_at = "finished_at",
	id = "id",
	logs = "logs",
	migration_name = "migration_name",
	rolled_back_at = "rolled_back_at",
	started_at = "started_at"
}
/** update columns of table "_prisma_migrations" */
export const enum _prisma_migrations_update_column {
	applied_steps_count = "applied_steps_count",
	checksum = "checksum",
	finished_at = "finished_at",
	id = "id",
	logs = "logs",
	migration_name = "migration_name",
	rolled_back_at = "rolled_back_at",
	started_at = "started_at"
}
/** ordering argument of a cursor */
export const enum cursor_ordering {
	ASC = "ASC",
	DESC = "DESC"
}
/** column ordering options */
export const enum order_by {
	asc = "asc",
	asc_nulls_first = "asc_nulls_first",
	asc_nulls_last = "asc_nulls_last",
	desc = "desc",
	desc_nulls_first = "desc_nulls_first",
	desc_nulls_last = "desc_nulls_last"
}

type ZEUS_VARIABLES = {
	["AccountStatus"]: ValueTypes["AccountStatus"];
	["AccountStatus_comparison_exp"]: ValueTypes["AccountStatus_comparison_exp"];
	["Account_bool_exp"]: ValueTypes["Account_bool_exp"];
	["Account_constraint"]: ValueTypes["Account_constraint"];
	["Account_insert_input"]: ValueTypes["Account_insert_input"];
	["Account_obj_rel_insert_input"]: ValueTypes["Account_obj_rel_insert_input"];
	["Account_on_conflict"]: ValueTypes["Account_on_conflict"];
	["Account_order_by"]: ValueTypes["Account_order_by"];
	["Account_pk_columns_input"]: ValueTypes["Account_pk_columns_input"];
	["Account_select_column"]: ValueTypes["Account_select_column"];
	["Account_set_input"]: ValueTypes["Account_set_input"];
	["Account_stream_cursor_input"]: ValueTypes["Account_stream_cursor_input"];
	["Account_stream_cursor_value_input"]: ValueTypes["Account_stream_cursor_value_input"];
	["Account_update_column"]: ValueTypes["Account_update_column"];
	["Account_updates"]: ValueTypes["Account_updates"];
	["BlockchainNetwork"]: ValueTypes["BlockchainNetwork"];
	["BlockchainNetwork_comparison_exp"]: ValueTypes["BlockchainNetwork_comparison_exp"];
	["Int_comparison_exp"]: ValueTypes["Int_comparison_exp"];
	["Media_bool_exp"]: ValueTypes["Media_bool_exp"];
	["Media_constraint"]: ValueTypes["Media_constraint"];
	["Media_inc_input"]: ValueTypes["Media_inc_input"];
	["Media_insert_input"]: ValueTypes["Media_insert_input"];
	["Media_obj_rel_insert_input"]: ValueTypes["Media_obj_rel_insert_input"];
	["Media_on_conflict"]: ValueTypes["Media_on_conflict"];
	["Media_order_by"]: ValueTypes["Media_order_by"];
	["Media_pk_columns_input"]: ValueTypes["Media_pk_columns_input"];
	["Media_select_column"]: ValueTypes["Media_select_column"];
	["Media_set_input"]: ValueTypes["Media_set_input"];
	["Media_stream_cursor_input"]: ValueTypes["Media_stream_cursor_input"];
	["Media_stream_cursor_value_input"]: ValueTypes["Media_stream_cursor_value_input"];
	["Media_update_column"]: ValueTypes["Media_update_column"];
	["Media_updates"]: ValueTypes["Media_updates"];
	["Profile_aggregate_bool_exp"]: ValueTypes["Profile_aggregate_bool_exp"];
	["Profile_aggregate_bool_exp_count"]: ValueTypes["Profile_aggregate_bool_exp_count"];
	["Profile_aggregate_order_by"]: ValueTypes["Profile_aggregate_order_by"];
	["Profile_arr_rel_insert_input"]: ValueTypes["Profile_arr_rel_insert_input"];
	["Profile_bool_exp"]: ValueTypes["Profile_bool_exp"];
	["Profile_constraint"]: ValueTypes["Profile_constraint"];
	["Profile_insert_input"]: ValueTypes["Profile_insert_input"];
	["Profile_max_order_by"]: ValueTypes["Profile_max_order_by"];
	["Profile_min_order_by"]: ValueTypes["Profile_min_order_by"];
	["Profile_on_conflict"]: ValueTypes["Profile_on_conflict"];
	["Profile_order_by"]: ValueTypes["Profile_order_by"];
	["Profile_pk_columns_input"]: ValueTypes["Profile_pk_columns_input"];
	["Profile_select_column"]: ValueTypes["Profile_select_column"];
	["Profile_set_input"]: ValueTypes["Profile_set_input"];
	["Profile_stream_cursor_input"]: ValueTypes["Profile_stream_cursor_input"];
	["Profile_stream_cursor_value_input"]: ValueTypes["Profile_stream_cursor_value_input"];
	["Profile_update_column"]: ValueTypes["Profile_update_column"];
	["Profile_updates"]: ValueTypes["Profile_updates"];
	["ProjectMedia_aggregate_bool_exp"]: ValueTypes["ProjectMedia_aggregate_bool_exp"];
	["ProjectMedia_aggregate_bool_exp_count"]: ValueTypes["ProjectMedia_aggregate_bool_exp_count"];
	["ProjectMedia_aggregate_order_by"]: ValueTypes["ProjectMedia_aggregate_order_by"];
	["ProjectMedia_arr_rel_insert_input"]: ValueTypes["ProjectMedia_arr_rel_insert_input"];
	["ProjectMedia_avg_order_by"]: ValueTypes["ProjectMedia_avg_order_by"];
	["ProjectMedia_bool_exp"]: ValueTypes["ProjectMedia_bool_exp"];
	["ProjectMedia_constraint"]: ValueTypes["ProjectMedia_constraint"];
	["ProjectMedia_inc_input"]: ValueTypes["ProjectMedia_inc_input"];
	["ProjectMedia_insert_input"]: ValueTypes["ProjectMedia_insert_input"];
	["ProjectMedia_max_order_by"]: ValueTypes["ProjectMedia_max_order_by"];
	["ProjectMedia_min_order_by"]: ValueTypes["ProjectMedia_min_order_by"];
	["ProjectMedia_on_conflict"]: ValueTypes["ProjectMedia_on_conflict"];
	["ProjectMedia_order_by"]: ValueTypes["ProjectMedia_order_by"];
	["ProjectMedia_select_column"]: ValueTypes["ProjectMedia_select_column"];
	["ProjectMedia_set_input"]: ValueTypes["ProjectMedia_set_input"];
	["ProjectMedia_stddev_order_by"]: ValueTypes["ProjectMedia_stddev_order_by"];
	["ProjectMedia_stddev_pop_order_by"]: ValueTypes["ProjectMedia_stddev_pop_order_by"];
	["ProjectMedia_stddev_samp_order_by"]: ValueTypes["ProjectMedia_stddev_samp_order_by"];
	["ProjectMedia_stream_cursor_input"]: ValueTypes["ProjectMedia_stream_cursor_input"];
	["ProjectMedia_stream_cursor_value_input"]: ValueTypes["ProjectMedia_stream_cursor_value_input"];
	["ProjectMedia_sum_order_by"]: ValueTypes["ProjectMedia_sum_order_by"];
	["ProjectMedia_update_column"]: ValueTypes["ProjectMedia_update_column"];
	["ProjectMedia_updates"]: ValueTypes["ProjectMedia_updates"];
	["ProjectMedia_var_pop_order_by"]: ValueTypes["ProjectMedia_var_pop_order_by"];
	["ProjectMedia_var_samp_order_by"]: ValueTypes["ProjectMedia_var_samp_order_by"];
	["ProjectMedia_variance_order_by"]: ValueTypes["ProjectMedia_variance_order_by"];
	["ProjectState"]: ValueTypes["ProjectState"];
	["ProjectState_comparison_exp"]: ValueTypes["ProjectState_comparison_exp"];
	["Project_aggregate_bool_exp"]: ValueTypes["Project_aggregate_bool_exp"];
	["Project_aggregate_bool_exp_count"]: ValueTypes["Project_aggregate_bool_exp_count"];
	["Project_aggregate_order_by"]: ValueTypes["Project_aggregate_order_by"];
	["Project_append_input"]: ValueTypes["Project_append_input"];
	["Project_arr_rel_insert_input"]: ValueTypes["Project_arr_rel_insert_input"];
	["Project_bool_exp"]: ValueTypes["Project_bool_exp"];
	["Project_constraint"]: ValueTypes["Project_constraint"];
	["Project_delete_at_path_input"]: ValueTypes["Project_delete_at_path_input"];
	["Project_delete_elem_input"]: ValueTypes["Project_delete_elem_input"];
	["Project_delete_key_input"]: ValueTypes["Project_delete_key_input"];
	["Project_insert_input"]: ValueTypes["Project_insert_input"];
	["Project_max_order_by"]: ValueTypes["Project_max_order_by"];
	["Project_min_order_by"]: ValueTypes["Project_min_order_by"];
	["Project_obj_rel_insert_input"]: ValueTypes["Project_obj_rel_insert_input"];
	["Project_on_conflict"]: ValueTypes["Project_on_conflict"];
	["Project_order_by"]: ValueTypes["Project_order_by"];
	["Project_pk_columns_input"]: ValueTypes["Project_pk_columns_input"];
	["Project_prepend_input"]: ValueTypes["Project_prepend_input"];
	["Project_select_column"]: ValueTypes["Project_select_column"];
	["Project_set_input"]: ValueTypes["Project_set_input"];
	["Project_stream_cursor_input"]: ValueTypes["Project_stream_cursor_input"];
	["Project_stream_cursor_value_input"]: ValueTypes["Project_stream_cursor_value_input"];
	["Project_update_column"]: ValueTypes["Project_update_column"];
	["Project_updates"]: ValueTypes["Project_updates"];
	["Storage"]: ValueTypes["Storage"];
	["Storage_comparison_exp"]: ValueTypes["Storage_comparison_exp"];
	["String_comparison_exp"]: ValueTypes["String_comparison_exp"];
	["Wallet_aggregate_bool_exp"]: ValueTypes["Wallet_aggregate_bool_exp"];
	["Wallet_aggregate_bool_exp_count"]: ValueTypes["Wallet_aggregate_bool_exp_count"];
	["Wallet_aggregate_order_by"]: ValueTypes["Wallet_aggregate_order_by"];
	["Wallet_arr_rel_insert_input"]: ValueTypes["Wallet_arr_rel_insert_input"];
	["Wallet_bool_exp"]: ValueTypes["Wallet_bool_exp"];
	["Wallet_constraint"]: ValueTypes["Wallet_constraint"];
	["Wallet_insert_input"]: ValueTypes["Wallet_insert_input"];
	["Wallet_max_order_by"]: ValueTypes["Wallet_max_order_by"];
	["Wallet_min_order_by"]: ValueTypes["Wallet_min_order_by"];
	["Wallet_on_conflict"]: ValueTypes["Wallet_on_conflict"];
	["Wallet_order_by"]: ValueTypes["Wallet_order_by"];
	["Wallet_pk_columns_input"]: ValueTypes["Wallet_pk_columns_input"];
	["Wallet_select_column"]: ValueTypes["Wallet_select_column"];
	["Wallet_set_input"]: ValueTypes["Wallet_set_input"];
	["Wallet_stream_cursor_input"]: ValueTypes["Wallet_stream_cursor_input"];
	["Wallet_stream_cursor_value_input"]: ValueTypes["Wallet_stream_cursor_value_input"];
	["Wallet_update_column"]: ValueTypes["Wallet_update_column"];
	["Wallet_updates"]: ValueTypes["Wallet_updates"];
	["_AccountRoles"]: ValueTypes["_AccountRoles"];
	["_AccountRoles_comparison_exp"]: ValueTypes["_AccountRoles_comparison_exp"];
	["_prisma_migrations_bool_exp"]: ValueTypes["_prisma_migrations_bool_exp"];
	["_prisma_migrations_constraint"]: ValueTypes["_prisma_migrations_constraint"];
	["_prisma_migrations_inc_input"]: ValueTypes["_prisma_migrations_inc_input"];
	["_prisma_migrations_insert_input"]: ValueTypes["_prisma_migrations_insert_input"];
	["_prisma_migrations_on_conflict"]: ValueTypes["_prisma_migrations_on_conflict"];
	["_prisma_migrations_order_by"]: ValueTypes["_prisma_migrations_order_by"];
	["_prisma_migrations_pk_columns_input"]: ValueTypes["_prisma_migrations_pk_columns_input"];
	["_prisma_migrations_select_column"]: ValueTypes["_prisma_migrations_select_column"];
	["_prisma_migrations_set_input"]: ValueTypes["_prisma_migrations_set_input"];
	["_prisma_migrations_stream_cursor_input"]: ValueTypes["_prisma_migrations_stream_cursor_input"];
	["_prisma_migrations_stream_cursor_value_input"]: ValueTypes["_prisma_migrations_stream_cursor_value_input"];
	["_prisma_migrations_update_column"]: ValueTypes["_prisma_migrations_update_column"];
	["_prisma_migrations_updates"]: ValueTypes["_prisma_migrations_updates"];
	["cursor_ordering"]: ValueTypes["cursor_ordering"];
	["jsonb"]: ValueTypes["jsonb"];
	["jsonb_cast_exp"]: ValueTypes["jsonb_cast_exp"];
	["jsonb_comparison_exp"]: ValueTypes["jsonb_comparison_exp"];
	["order_by"]: ValueTypes["order_by"];
	["smallint"]: ValueTypes["smallint"];
	["smallint_comparison_exp"]: ValueTypes["smallint_comparison_exp"];
	["timestamp"]: ValueTypes["timestamp"];
	["timestamp_comparison_exp"]: ValueTypes["timestamp_comparison_exp"];
	["timestamptz"]: ValueTypes["timestamptz"];
	["timestamptz_comparison_exp"]: ValueTypes["timestamptz_comparison_exp"];
	["uuid"]: ValueTypes["uuid"];
	["uuid_comparison_exp"]: ValueTypes["uuid_comparison_exp"];
}