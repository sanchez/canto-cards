export default function (durationSec: number) {
    const startedTime = ref<Date>();
    const remainingTime = ref(durationSec);

    function start() {
        startedTime.value = new Date();
    }
    function reset() {
        startedTime.value = new Date();
        remainingTime.value = durationSec;
    }

    const t = setInterval(() => {
        const sTime = startedTime.value;
        if (!sTime) {
            remainingTime.value = durationSec;
            return;
        }

        const elapsed = Math.floor(
            (new Date().getTime() - sTime.getTime()) / 1000
        );
        remainingTime.value = Math.max(0, durationSec - elapsed);
    }, 200);

    onUnmounted(() => {
        clearInterval(t);
    });

    return {
        start,
        reset,
        remainingTime,
    };
}
