import theme from 'styles/theme';

export const enabledButtonStyle = {
  fontColor: theme.color.white,
  backGroundColor: theme.color.yellow,
  hoverFontColor: theme.color.grayScale[50],
  hoverBackGroundColor: theme.color.grayScale[500],
};

export const disabledButtonStyle = {
  fontColor: theme.color.grayScale[50],
  backGroundColor: theme.color.grayScale[500],
  hoverFontColor: theme.color.white,
  hoverBackGroundColor: theme.color.yellow,
};

export const getButtonStyleByCondition = (condition: boolean) => {
  return condition ? enabledButtonStyle : disabledButtonStyle;
};
