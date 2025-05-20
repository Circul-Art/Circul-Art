import type { DirectiveBinding } from 'vue';

export const vFlipVertical = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        applyRotation(el, binding.value);
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        applyRotation(el, binding.value);
    }
};

function applyRotation(el: HTMLElement, isActive: boolean) {
    el.style.transition = 'transform 0.3s ease';
    el.style.transform = isActive ? 'rotate(180deg)' : 'rotate(0deg)';
}
