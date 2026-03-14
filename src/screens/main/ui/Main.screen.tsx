import { View } from 'react-native';
import { useMemo } from 'react';

import { EffectPreview, EffectEditor } from '@features/led-control/ui';
import { getStyles } from './styles';
import { useUI } from '@shared/hooks/ui-context/useUI.ts';

export const MainScreen = () => {

  const {colors} = useUI();
  const styles = useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <EffectPreview />
      <EffectEditor />
    </View>
  );
};
