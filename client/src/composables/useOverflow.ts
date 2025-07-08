import { ref } from 'vue';

const isOverflowHidden = ref(false);

export function useOverflow() {
    const setOverflow = (overflow: boolean) => {
        isOverflowHidden.value = overflow;
    };

    return {
        isOverflowHidden,
        setOverflow
    };
}
