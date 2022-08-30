import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { LandingPage } from '@/components/LandingPage'
import { TakeNoteApp } from '@/containers/TakeNoteApp'
import { getAuth } from '@/selectors'
import { login } from '@/slices/auth'

export const App: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { loading } = useSelector(getAuth)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _login = () => dispatch(login())

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    _login()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="la-ball-beat">
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  }

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TakeNote</title>
      </Helmet>
      <Switch>
        (
        <>
          <Route exact path="/" component={LandingPage} />
          <Route path="/app" component={TakeNoteApp} />
        </>
        )
        <Redirect to="/" />
      </Switch>
    </HelmetProvider>
  )
}
