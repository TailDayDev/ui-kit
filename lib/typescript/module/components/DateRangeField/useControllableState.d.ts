interface UseControllableStateParams<Value> {
    componentName: string;
    controlledValue: Value | undefined;
    defaultValue: Value;
    onChange?: (value: Value) => void;
    stateName: string;
}
export declare const useControllableState: <Value>({ componentName, controlledValue, defaultValue, onChange, stateName, }: UseControllableStateParams<Value>) => readonly [Value, (nextValue: Value) => void];
export {};
//# sourceMappingURL=useControllableState.d.ts.map