import React, {JSX} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useForm from '../../hooks/useForm';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../../redux/authSlice';
import useLanguage from '../../hooks/useLanguage';
import {arStrings, enStrings} from '../../../utils/strings';
import {colors} from '../../../utils/colors';
import {useTranslation} from 'react-i18next';
import Text from '../../components/Text';

type FormFields = {
  email: string;
  password: string;
};
const initialValues: FormFields = {
  email: '',
  password: '',
};
function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();
  const language = useLanguage();
  const {t} = useTranslation();

  const SelectedString = language === 'en' ? enStrings : arStrings;

  const validationSchema = {
    email: {
      required: {value: true, message: t(SelectedString.emailRequired)},
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: t(SelectedString.invalidEmailFormat),
      },
    },
    password: {
      required: {value: true, message: t(SelectedString.passwordRequired)},
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        message: t(SelectedString.passwordValidation),
      },
    },
  };
  const {values, errors, isSubmitting, handleChange, handleSubmit, handleBlur} =
    useForm(initialValues, validationSchema);
  const onSubmit = async () => {
    dispatch(loginSuccess());
  };
  const isIncompleteForm = !!errors.email || !!errors.password;
  const isDisabled = isSubmitting || isIncompleteForm;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t(SelectedString.login)}</Text>
      <TextInput
        value={values.email}
        onChangeText={text => handleChange('email', text)}
        placeholder={t(SelectedString.email)}
        onBlur={() => handleBlur('email')}
        style={styles.input}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        value={values.password}
        onChangeText={text => handleChange('password', text)}
        placeholder={t(SelectedString.password)}
        secureTextEntry
        onBlur={() => handleBlur('password')}
        style={styles.input}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <TouchableOpacity
        style={[styles.button, isDisabled ? styles.disabledButton : {}]}
        onPress={() => handleSubmit(onSubmit)}
        disabled={isDisabled}>
        <Text style={styles.submitText}>{t(SelectedString.submit)}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    color: colors.black,
    fontWeight: 700,
    marginBottom: 20,
  },
  input: {
    backgroundColor: colors.gray,
    marginTop: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.black,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 35,
  },
  disabledButton: {
    backgroundColor: colors.disabledGray,
  },
  submitText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 500,
  },
  error: {
    color: colors.red,
    marginBottom: 10,
  },
});

export default React.memo(LoginScreen);
