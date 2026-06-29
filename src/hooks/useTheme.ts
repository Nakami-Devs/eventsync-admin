import { useTheme as useRATheme } from 'react-admin'

export const useTheme = () => {
  const [theme, setTheme] = useRATheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { mode: theme, toggleTheme }
}