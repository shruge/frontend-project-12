import * as yup from 'yup'

const getRegistrSchema = (t) => {
  const schema = yup.object().shape({
    username: yup.string().required(t('validation.required'))
      .trim()
      .min(3, t('validation.maxMinLen'))
      .max(20, t('validation.maxMinLen')),
    password: yup.string().required(t('validation.required'))
      .trim().min(6, t('validation.passwordMinLen')),
    confirmPassword: yup.string().required(t('validation.required'))
      .trim()
      .oneOf([yup.ref('password'), null], t('validation.passwordConfirm')),
  })

  return schema
}

export default getRegistrSchema
