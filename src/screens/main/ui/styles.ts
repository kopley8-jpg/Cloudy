import { StyleSheet } from "react-native"
import { UIColors } from '@shared/hooks/ui-context/useUI.ts';

export const getStyles = (colors: UIColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "20%",
            backgroundColor: colors.backgroundPrimary
        }
    })
