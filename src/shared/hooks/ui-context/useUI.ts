import {uiColors} from '@shared/hooks/ui-context/colors.ts';

export type UIColors = typeof uiColors

export const useUI = () => ({ colors: uiColors })

export { uiColors }
