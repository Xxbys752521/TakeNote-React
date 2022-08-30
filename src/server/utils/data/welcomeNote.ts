import { v4 as uuid } from 'uuid'
import dayjs from 'dayjs'

const markdown = `# 欢迎使用TakeNote

- TakeNote是一个免费、开源的网络笔记应用程序。 
- 这只是只是一个演示项目，不与任何数据库或云集成。 
- 您的笔记保存在本地存储中，不会永久保存，但可供下载。


## 特性

- **纯净的笔记应用** - 不记录您的任何信息，数据仅保留在本地
- **Markdown格式预览** - 可实时预览.md格式
- **支持黑夜模式** -点击右下角图标切换
- **方便的快捷键** - 使用键盘完成所有常见任务 - 创建新笔记、预览和其他选项--您可在设置中查看，另：CTRL+S保存功能开发中。
- **支持拖拽操作** - 可以方便的将想要操作的笔记拖到收藏夹或回收站
- **多光标编辑** -支持多光标编辑，方法为使用CTRL键并点按编辑处，即可同步编辑多处文字， 此项功能为[Codemirror](https://codemirror.net/)特性，此外TakeNote还支持其他CodeMirror特性。
- **好用的操作区** -编辑界面下方功能丰富的操作区。
- **笔记搜索** - 轻松搜索所有笔记或类别中的笔记。
- **不记录数据** - 笔记仅存储在浏览器的本地存储中，可供您单独下载和导出。
`

export const welcomeNote = {
  id: uuid(),
  text: markdown,
  category: '',
  favorite: false,
  created: dayjs().format(),
  lastUpdated: dayjs().format(),
}
