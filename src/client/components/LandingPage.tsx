import React from 'react'
import lightScreen from '@resources/assets/screenshot-light.png'
import darkScreen from '@resources/assets/screenshot-dark.png'
import squareLogo from '@resources/assets/logo-square-color.svg'
import logo from '@resources/assets/logo-square-color.svg'

export const LandingPage: React.FC = () => {
  return (
    <section className="landing-page">
      <section className="content">
        <div className="container-small">
          <div className="lead">
            <img src={logo} height="200" width="200" alt="TakeNote" />
            <h1>
              The Note Taking App
              <br /> for Developers
            </h1>
            <p className="subtitle">面向开发者的基于Web的笔记应用程序。</p>
            <div className="new-signup">
              <div>
                <p>本项目仅作为演示。您的笔记将保存到本地存储，不会被保存在任何数据库或云中。</p>
                <a className="button" href="/app">
                  查看演示
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <img src={lightScreen} alt="TakeNote App" className="screenshot" />
        </div>
      </section>

      <section className="content">
        <div className="container-small">
          <div className="features">
            <h2 className="text-center">Features</h2>
            <ul>
              <li>
                <strong>纯净的笔记应用</strong> - 不记录您的任何信息，数据仅保留在本地
              </li>
              <li>
                <strong>支持Markdown格式</strong>-{' '}
                <a href="https://sspai.com/post/25137">查看关于Markdown格式的常用语法</a>
                ,并可实时预览.md格式
              </li>
              <li>
                <strong>支持黑夜模式</strong>
              </li>
              <li>
                <strong>方便的快捷键 </strong> - 使用键盘完成所有常见任务 -
                创建新笔记、预览和其他选项--您可在设置中查看，另：CTRL+S 保存功能开发中
              </li>
              <li>
                <strong>支持拖拽操作</strong> - 可以方便的将想要操作的笔记拖到收藏夹或回收站
              </li>
              <li>
                <strong>多光标编辑</strong> - 支持多光标编辑，方法为使用 CTRL
                键并点按编辑处，即可同步编辑多处文字， 此项功能为
                <a href="https://codemirror.net/">Codemirror</a>特性，此外 TakeNote 还支持其他
                CodeMirror 特性
              </li>
              <li>
                <strong>好用的操作区</strong> - 编辑界面下方功能丰富的操作区。
              </li>
              <li>
                <strong>笔记搜索</strong> - 轻松搜索所有笔记或类别中的笔记。
              </li>
              <li>
                <strong>不记录数据</strong> - 笔记仅存储在浏览器的本地存储中，可供您单独下载和导出。
              </li>
            </ul>
          </div>
        </div>
        <div className="container">
          <img src={darkScreen} alt="TakeNote App" className="screenshot" />
        </div>
      </section>
    </section>
  )
}
