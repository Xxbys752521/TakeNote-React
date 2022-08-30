import React from 'react'

export const EmptyEditor: React.FC = () => {
  return (
    <div className="empty-editor v-center" data-testid="empty-editor">
      <div className="text-center">
        <p>
          <strong>创建一个笔记</strong>
        </p>
        <p>
          <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>N</kbd>
        </p>
      </div>
    </div>
  )
}
