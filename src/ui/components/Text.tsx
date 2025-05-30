import React, { JSX } from 'react';
import { StyleSheet, TextStyle, Text as TextView } from 'react-native';
import useLanguage from '../hooks/useLanguage';

interface TextProps {
    children: string | undefined;
    style?: TextStyle | undefined;
    numberOfLines?: number;
    props?: TextProps;
}

function Text({style, children, props} : TextProps): JSX.Element {
    const language = useLanguage();
    const styles = getStyles(language);
    return(
        <TextView style={[style, styles.textView]} {...props}>{children}</TextView>
    );
}

const getStyles = (language: string) => 
    StyleSheet.create({
        textView: {
            direction: language === 'ar' ? 'rtl' : 'ltr',
        },
    });

export default Text;
