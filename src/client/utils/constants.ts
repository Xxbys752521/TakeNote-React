import { Folder, NotesSortKey, DirectionText } from '@/utils/enums'

export const folderMap: Record<Folder, string> = {
  [Folder.ALL]: 'All Notes',
  [Folder.FAVORITES]: 'Favorites',
  [Folder.SCRATCHPAD]: 'Scratchpad',
  [Folder.TRASH]: 'Trash',
  [Folder.CATEGORY]: 'Category',
}

export const iconColor = 'rgba(255, 255, 255, 0.25)'

export const shortcutMap = [
  { action: '创建新笔记', key: 'N' },
  { action: '删除笔记', key: 'U' },
  { action: '创建新分类', key: 'C' },
  { action: '下载笔记', key: 'O' },
  { action: '保存笔记', key: 'L' },
  { action: 'Markdown格式预览', key: 'P' },
  { action: '切换黑夜模式', key: 'K' },
  { action: '搜索', key: 'F' },
]

export const notesSortOptions = [
  { value: NotesSortKey.TITLE, label: '标题首字母' },
  { value: NotesSortKey.CREATED_DATE, label: '创建日期' },
  { value: NotesSortKey.LAST_UPDATED, label: '更新日期' },
]

export const directionTextOptions = [
  { value: DirectionText.LEFT_TO_RIGHT, label: '从左向右' },
  { value: DirectionText.RIGHT_TO_LEFT, label: '从右向左' },
]
