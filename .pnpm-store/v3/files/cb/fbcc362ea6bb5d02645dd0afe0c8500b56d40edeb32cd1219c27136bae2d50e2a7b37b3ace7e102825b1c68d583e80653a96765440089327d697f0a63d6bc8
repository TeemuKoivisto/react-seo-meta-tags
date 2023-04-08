import React from 'react';
import { Props as ShareButtonProps } from '../ShareButton';
declare function createShareButton<OptionProps extends Record<string, any>, LinkOptions extends Record<string, any> = OptionProps>(networkName: string, link: (url: string, options: LinkOptions) => string, optsMap: (props: OptionProps) => LinkOptions, defaultProps: Partial<ShareButtonProps<LinkOptions> & OptionProps>): React.ForwardRefExoticComponent<React.PropsWithoutRef<Omit<ShareButtonProps<LinkOptions>, "forwardedRef" | "networkName" | "networkLink" | "opts"> & OptionProps> & React.RefAttributes<HTMLButtonElement>>;
export default createShareButton;
