<template>
    <div class="mb-4">
        <div class="flex items-center mb-1">
            <label :for="inputName" class="block">
                {{ labelValue }}
            </label>
            <div v-if="$slots.hint" class="relative ml-1.5 group">
                <div class="cursor-help">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div
                    class="hidden group-hover:block absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-1 px-3 py-2 w-64 shadow-lg bg-primary border"
                >
                    <div class="text-sm">
                        <slot name="hint"></slot>
                    </div>
                    <div
                        class="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 bg-primary border-t border-l"
                    ></div>
                </div>
            </div>
        </div>
        <div class="relative">
            <select
                :id="inputName"
                :value="modelValue"
                class="w-full px-4 py-2 border appearance-none pr-10"
                :class="errorState ? 'border-error' : 'border'"
                @change="handleChange"
                @blur="$emit('blur')"
            >
                <slot></slot>
            </select>
            <div
                class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </div>
        </div>
        <p v-if="errorState" class="mt-1 text-sm text-error">
            {{ errorMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    labelValue: {
        type: String,
        required: true
    },
    inputName: {
        type: String,
        required: true
    },
    modelValue: {
        type: [String, Number],
        required: true
    },
    errorMessage: {
        type: String,
        default: ''
    },
    errorState: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue', 'blur']);

function handleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', target.value);
}
</script>
