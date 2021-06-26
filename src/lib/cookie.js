import Cookies from 'js-cookie'

// App
const sidebar_theme = 'sidebar_theme'
export const getSidebarTheme = () => Cookies.get(sidebar_theme)
export const setSidebarTheme = (sidebarTheme) => Cookies.set(sidebar_theme, sidebarTheme)