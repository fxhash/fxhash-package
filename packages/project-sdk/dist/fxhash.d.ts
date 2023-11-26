import { FxParamDefinition, FxParamType, FxParamValue } from '@fxhash/params/types';
import { ResettableRandFunction } from '@fxhash/utils';

type FxHashExecutionContext = "standalone" | "capture" | "minting";
type FxHashApi = {
    hash: string;
    minter: string;
    iteration: number;
    rand: ResettableRandFunction;
    randminter: ResettableRandFunction;
    context: FxHashExecutionContext;
    preview: () => void;
    isPreview: boolean;
    features: (features: FxFeatures) => void;
    getFeature: (id: string) => FxFeatureValue | undefined;
    getFeatures: () => FxFeatures;
    stringifyParams: (definitions: FxParamDefinition<FxParamType>[]) => string;
    params: (paramsDefinitions: FxParamDefinition<FxParamType>[]) => void;
    getDefinitions: () => FxParamDefinition<FxParamType>[];
    getParam: (id: string) => FxParamValue<FxParamType>;
    getParams: () => FxParamValue<FxParamType>;
    getRawParam: (id: string) => string;
    getRawParams: () => {
        string: string;
    };
    on: (event: FxEventId, handler: () => void, onDone: () => void) => void;
    emit: (event: FxEventId, data: FxEmitData) => void;
};
type FxFeatureValue = string | number | boolean;
type FxFeatures = Record<string, FxFeatureValue>;
type FxEventId = "params:update";
type FxEmitData = Record<string, FxParamValue<FxParamType>>;
type FxEmitFunction = (event: FxEventId, data: FxEmitData) => void;
interface FxInitOptions {
    params: FxParamDefinition<FxParamType>[];
    features: FxFeatures;
}
type SetFeaturesOptions = Pick<FxInitOptions, "features">;
type SetParamsOptions = Pick<FxInitOptions, "params">;
declare global {
    interface Window {
        $fx: FxHashApi;
    }
}

export { FxEmitData, FxEmitFunction, FxEventId, FxFeatureValue, FxFeatures, FxHashApi, FxHashExecutionContext, FxInitOptions, SetFeaturesOptions, SetParamsOptions };
