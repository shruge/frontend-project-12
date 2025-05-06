import * as yup from 'yup'
import { isSwearWord } from '../../utils'
import AddModal from './AddModal'
import RemoveModal from './RemoveModal'
import RenameModal from './RenameModal'

export const modals = {
  add: AddModal,
  remove: RemoveModal,
  rename: RenameModal,
}

export const getModalsSchema = (items, t) => {
  const schema = yup.object().shape({
    name: yup.string().required(t('validation.required'))
      .trim()
      .notOneOf(items, t('validation.unique'))
      .min(3, t('validation.maxMinLen'))
      .max(20, t('validation.maxMinLen'))
      .test('', '', (val) => {
        if (isSwearWord(val)) {
          const allSwearWords = items.filter(word => isSwearWord(word))

          return allSwearWords.every(item => val.length !== item.length)
        }

        return true
      }),
  })

  return schema
}
