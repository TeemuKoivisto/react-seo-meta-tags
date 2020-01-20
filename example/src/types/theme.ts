export interface IThemeColor {
  textLight: string
  textDark: string
  black: string
  bg: string
  white: string
  primary: string
  secondary: string
  danger: string
}

export interface ITheme {
  color: IThemeColor
  fontSize: {
    small: string
    medium: string
    large: string
    xlarge: string
    largeIcon: string
  },
  margins: {
    default: string
  }
}
