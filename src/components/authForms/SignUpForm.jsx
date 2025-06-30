


import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import FormInput from './FormInput';
import Button from "../common/Button";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from 'src/services/firebase';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const { t } = useTranslation();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(t('passwordsDoNotMatch'));
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert(t('emailAlreadyInUse'));
      } else {
        console.log('user creation encountered an error', error);
        alert(t('signUpError'));
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="flex flex-col w-[380px]">
      <h2 className="my-2.5 text-lg font-semibold">{t('dontHaveAccount')}</h2>
      <span className="mb-4 text-gray-700">{t('signUpWithEmailAndPassword')}</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={t('displayName')}
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label={t('email')}
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label={t('password')}
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label={t('confirmPassword')}
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">{t('signUp')}</Button>
      </form>
    </div>
  );
};

export default SignUpForm;

