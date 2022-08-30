import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

export const scratchpadNote = {
  id: uuid(),
  text: `# 草稿

  ## 你可以在这里随手记录灵感`,
  category: '',
  scratchpad: true,
  favorite: false,
  created: dayjs().format(),
  lastUpdated: dayjs().format(),
}
