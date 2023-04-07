import Typography from 'typography'
import myTheme from './ty-my-theme'

const typography = Typography(myTheme)

// Hot reloading in dev
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
