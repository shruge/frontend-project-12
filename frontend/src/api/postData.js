import axios from 'axios'

const postData = async (url, reqBody) => {
  const res = await axios.post(url, reqBody, {
    headers: { 'Content-Type': 'application/json' },
  })

  const { data } = res

  if (!Object.hasOwn(data, 'token')) {
    throw new Error('serverError')
  }

  return data
}

export default postData
