export const useTimer = (time: MaybeRefOrGetter<number>) => {
  const timer = ref(toValue(time));

  let timerStart: number | undefined;

  const timestamp = useTimestamp({
    interval: 1000,
    callback: (timestamp) => {
      timer.value = Math.max(
        toValue(time) -
          Number(((timestamp - (timerStart ?? 0)) / 1000).toFixed(0)),
        0,
      );
    },
  });

  onMounted(() => {
    timerStart = timestamp.value;
  });

  function restart() {
    timer.value = toValue(time);
    timerStart = timestamp.value;
  }

  const isActive = computed(() => timer.value > 0);

  return { timer: readonly(timer), restart, isActive };
};
