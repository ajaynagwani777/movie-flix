import React, {JSX} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useForm from '../../hooks/useForm';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../../redux/authSlice';
import useLanguage from '../../hooks/useLanguage';
import {arStrings, enStrings} from '../../../utils/strings';

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
  const SelectedString = language === 'en' ? enStrings : arStrings;

  const validationSchema = {
    email: {
      required: {value: true, message: SelectedString.emailRequired},
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: SelectedString.invalidEmailFormat,
      },
    },
    password: {
      required: {value: true, message: SelectedString.passwordRequired},
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
        message: SelectedString.passwordValidation,
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
      <Text style={styles.heading}>{SelectedString.login}</Text>
      <TextInput
        value={values.email}
        onChangeText={text => handleChange('email', text)}
        placeholder={SelectedString.email}
        onBlur={() => handleBlur('email')}
        style={styles.input}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        value={values.password}
        onChangeText={text => handleChange('password', text)}
        placeholder={SelectedString.password}
        secureTextEntry
        onBlur={() => handleBlur('password')}
        style={styles.input}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TouchableOpacity
        style={[styles.button, isDisabled ? styles.disabledButton : {}]}
        onPress={() => handleSubmit(onSubmit)}
        disabled={isDisabled}>
        <Text style={styles.submitText}>{SelectedString.submit}</Text>
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
    color: '#000000',
    fontWeight: 700,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#e5e5e5',
    marginTop: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 35,
  },
  disabledButton: {
    backgroundColor: '#c7c7c7',
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 500,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default React.memo(LoginScreen);
