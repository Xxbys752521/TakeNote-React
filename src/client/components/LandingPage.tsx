import React from 'react'

import logo from '@resources/assets/logo-square-color.svg'

const clientId = process.env.CLIENT_ID
const isDemo = process.env.DEMO

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
      </section>
    </section>
  )
}
