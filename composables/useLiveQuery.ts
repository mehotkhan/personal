import { onUnmounted, ref, Ref, watch } from "vue";
import { liveQuery } from "dexie";

interface UseObservableOptions {
  onError?: (err: any) => void;
}

export default function useLiveQuery<T>(
  querier: () => T | Promise<T>,
  deps: Ref<any>[],
  options?: UseObservableOptions,
): Readonly<Ref<T>> {
  const value = ref<T | undefined>();
  const observable = liveQuery<T>(querier);
  let subscription = observable.subscribe({
    next: (val) => {
      value.value = val;
    },
    error: options?.onError,
  });

  watch(deps, () => {
    subscription.unsubscribe();
    subscription = observable.subscribe({
      next: (val) => {
        value.value = val;
      },
      error: options?.onError,
    });
  });

  onUnmounted(() => {
    subscription.unsubscribe();
  });
  return value as Readonly<Ref<T>>;
}
