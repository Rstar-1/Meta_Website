import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../feature/authSlice'
import { config } from '../../config/env'

// ✅ Load state safely
const loadState = () => {
    try {
        const data = localStorage.getItem('appState')
        if (!data) return undefined
        const parsed = JSON.parse(data)
        if (parsed && parsed.auth === null) {
            delete parsed.auth
        }
        return parsed
    } catch {
        return undefined
    }
}

// ✅ Save minimal + safe data
const saveState = (state) => {
    try {
        const auth = state.auth

        const partialState = {}
        if (auth?.token) {
            partialState.auth = {
                token: auth.token,
                isLoggedIn: auth.isLoggedIn,
                user: {
                    _id: auth.user?._id,
                    fullname: auth.user?.fullname,
                    role: auth.user?.role
                }
            }
        }

        localStorage.setItem('appState', JSON.stringify(partialState))
    } catch {
        // Ignore localStorage write errors
    }
}

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
    preloadedState: loadState(),
    devTools: config.isDev
})

// ✅ Debounced persistence (optimized)
let timeout
store.subscribe(() => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
        saveState(store.getState())
    }, 300)
})