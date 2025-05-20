import type { RouteLocationNormalizedGeneric } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

export const loadLayoutMiddleware = async (
    to: RouteLocationNormalizedGeneric
) => {
    const authStore = useAuthStore();
    try {
        const layout = to.meta.layout
            ? to.meta.layout
            : authStore.isAuthenticated
              ? 'AppAuthLayout'
              : 'AppVisitorLayout';
        const layoutComponent = await import(`../../layouts/${layout}.vue`);
        to.meta.layoutComponent = layoutComponent.default;
    } catch (e) {
        console.error('Error loading layout:', e);
        const layout = 'AppErrorLayout';
        const layoutComponent = await import(`../../layouts/${layout}.vue`);
        to.meta.layoutComponent = layoutComponent.default;
    }
};
