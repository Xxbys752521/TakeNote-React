import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  X,
  Command,
  Settings,
  Archive,
  Edit2,
  Download,
  DownloadCloud,
  UploadCloud,
} from 'react-feather'

import {
  toggleSettingsModal,
  updateCodeMirrorOption,
  togglePreviewMarkdown,
  toggleDarkTheme,
  updateNotesSortStrategy,
} from '@/slices/settings'
import { updateNotes, importNotes } from '@/slices/note'
import { logout } from '@/slices/auth'
import { importCategories } from '@/slices/category'
import { shortcutMap, notesSortOptions, directionTextOptions } from '@/utils/constants'
import { CategoryItem, NoteItem, ReactMouseEvent } from '@/types'
import { getSettings, getAuth, getNotes, getCategories } from '@/selectors'
import { Option } from '@/components/SettingsModal/Option'
import { Shortcut } from '@/components/SettingsModal/Shortcut'
import { SelectOptions } from '@/components/SettingsModal/SelectOptions'
import { IconButton } from '@/components/SettingsModal/IconButton'
import { NotesSortKey } from '@/utils/enums'
import { backupNotes, downloadNotes } from '@/utils/helpers'
import { Tabs } from '@/components/Tabs/Tabs'
import { TabPanel } from '@/components/Tabs/TabPanel'
import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'
import { IconButtonUploader } from '@/components/SettingsModal/IconButtonUploader'

export const SettingsModal: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { codeMirrorOptions, isOpen, previewMarkdown, darkTheme, notesSortKey } = useSelector(
    getSettings
  )
  const { currentUser } = useSelector(getAuth)
  const { notes, activeFolder, activeCategoryId } = useSelector(getNotes)
  const { categories } = useSelector(getCategories)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _logout = () => dispatch(logout())
  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _toggleDarkTheme = () => dispatch(toggleDarkTheme())
  const _updateNotesSortStrategy = (sortBy: NotesSortKey) =>
    dispatch(updateNotesSortStrategy(sortBy))
  const _updateCodeMirrorOption = (key: string, value: any) =>
    dispatch(updateCodeMirrorOption({ key, value }))
  const _updateNotes = (sortOrderKey: NotesSortKey) =>
    dispatch(updateNotes({ notes, activeFolder, activeCategoryId, sortOrderKey }))
  const _importBackup = (notes: NoteItem[], categories: CategoryItem[]) => {
    dispatch(importNotes(notes))
    dispatch(importCategories(categories))
  }

  // ===========================================================================
  // Refs
  // ===========================================================================

  const node = useRef<HTMLDivElement>(null)

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleDomClick = (event: ReactMouseEvent) => {
    event.stopPropagation()

    if (node.current && node.current.contains(event.target as HTMLDivElement)) return
    if (isOpen) {
      _toggleSettingsModal()
    }
  }

  const togglePreviewMarkdownHandler = () => _togglePreviewMarkdown()
  const toggleDarkThemeHandler = () => {
    _toggleDarkTheme()
    _updateCodeMirrorOption('theme', darkTheme ? 'base16-light' : 'new-moon')
  }
  const toggleLineHighlight = () =>
    _updateCodeMirrorOption('styleActiveLine', !codeMirrorOptions.styleActiveLine)
  const toggleScrollPastEnd = () =>
    _updateCodeMirrorOption('scrollPastEnd', !codeMirrorOptions.scrollPastEnd)
  const toggleLineNumbersHandler = () =>
    _updateCodeMirrorOption('lineNumbers', !codeMirrorOptions.lineNumbers)
  const handleEscPress = (event: KeyboardEvent) => {
    event.stopPropagation()
    if (event.key === 'Escape' && isOpen) {
      _toggleSettingsModal()
    }
  }
  const updateNotesSortStrategyHandler = (selectedOption: any) => {
    _updateNotesSortStrategy(selectedOption.value)
    _updateNotes(selectedOption.value)
  }
  const updateNotesDirectionHandler = (selectedOption: any) => {
    _updateCodeMirrorOption('direction', selectedOption.value)
  }
  const downloadNotesHandler = () => downloadNotes(notes, categories)
  const backupHandler = () => backupNotes(notes, categories)
  const importBackupHandler = async (json: File) => {
    const content = await json.text()
    const { notes, categories } = JSON.parse(content) as {
      notes: NoteItem[]
      categories: CategoryItem[]
    }

    if (!notes || !categories) return

    _importBackup(notes, categories)
  }
  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    document.addEventListener('mousedown', handleDomClick)
    document.addEventListener('keydown', handleEscPress)

    return () => {
      document.removeEventListener('mousedown', handleDomClick)
      document.removeEventListener('keydown', handleEscPress)
    }
  })

  return isOpen ? (
    <div className="dimmer">
      <aside ref={node} className="settings-modal">
        <header className="settings-modal-header">
          <div
            className="close-button"
            onClick={() => {
              if (isOpen) _toggleSettingsModal()
            }}
          >
            <X size={20} />
          </div>

          <section className="profile flex">
            <div>
              {currentUser.avatar_url && (
                <img src={currentUser.avatar_url} alt="Profile" className="profile-picture" />
              )}
            </div>
            <div className="profile-details">
              <h3>{currentUser.name}</h3>
              <div className="subtitle">{currentUser.bio}</div>
            </div>
            <button
              onClick={() => {
                _logout()
              }}
            >
              Log out
            </button>
          </section>
        </header>

        <section className="settings-content">
          <Tabs>
            <TabPanel label="偏好设置" icon={Settings}>
              <Option
                title="编辑行高亮"
                description="控制编辑器高亮整行的行为"
                toggle={toggleLineHighlight}
                checked={codeMirrorOptions.styleActiveLine}
                testId={TestID.ACTIVE_LINE_HIGHLIGHT_TOGGLE}
              />
              <Option
                title="显示行号"
                description="显示笔记行号"
                toggle={toggleLineNumbersHandler}
                checked={codeMirrorOptions.lineNumbers}
                testId={TestID.DISPLAY_LINE_NUMS_TOGGLE}
              />
              <Option
                title="Markdown格式预览"
                description="可选择默认预览行为"
                toggle={togglePreviewMarkdownHandler}
                checked={previewMarkdown}
                testId={TestID.MARKDOWN_PREVIEW_TOGGLE}
              />
              <Option
                title="黑夜模式"
                description="切换为黑夜模式"
                toggle={toggleDarkThemeHandler}
                checked={darkTheme}
                testId={TestID.DARK_MODE_TOGGLE}
              />
              <SelectOptions
                title="排序方式"
                description="选择笔记排序方法"
                onChange={updateNotesSortStrategyHandler}
                options={notesSortOptions}
                selectedValue={notesSortKey}
                testId={TestID.SORT_BY_DROPDOWN}
              />
              <SelectOptions
                title="文字方向"
                description="默认为从左到右"
                onChange={updateNotesDirectionHandler}
                options={directionTextOptions}
                selectedValue={codeMirrorOptions.direction}
                testId={TestID.TEXT_DIRECTION_DROPDOWN}
              />
            </TabPanel>
            <TabPanel label="快捷键" icon={Command}>
              {shortcutMap.map((shortcut) => (
                <Shortcut action={shortcut.action} letter={shortcut.key} key={shortcut.key} />
              ))}
            </TabPanel>
            <TabPanel label="数据管理" icon={Archive}>
              <p>将所有笔记下载为Markdown格式</p>
              <IconButton
                dataTestID={TestID.SETTINGS_MODAL_DOWNLOAD_NOTES}
                handler={downloadNotesHandler}
                icon={Download}
                text={LabelText.DOWNLOAD_ALL_NOTES}
              />
              <p>将所有数据导出为JSON格式</p>
              <IconButton
                handler={backupHandler}
                icon={DownloadCloud}
                text={LabelText.BACKUP_ALL_NOTES}
              />
              <p>导入支持的JSON数据</p>
              <IconButtonUploader
                dataTestID={TestID.UPLOAD_SETTINGS_BACKUP}
                accept=".json"
                handler={importBackupHandler}
                icon={UploadCloud}
                text={LabelText.IMPORT_BACKUP}
              />
            </TabPanel>
            <TabPanel label="关于本应用" icon={Edit2}>
              <p>还没有想好</p>
            </TabPanel>
          </Tabs>
        </section>
      </aside>
    </div>
  ) : null
}
