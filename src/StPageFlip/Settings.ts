export const enum SizeType {
    FIXED = 'fixed',
    STRETCH = 'stretch'
}

export interface FlipSetting {
    startPage: number;
    size: SizeType;

    width: number;
    height: number;

    minWidth: number;
    maxWidth: number;
    minHeight: number;
    maxHeight: number;

    drawShadow: boolean;
    flippingTime: number;

    usePortrait: boolean;
    startZIndex: number;
    autoSize: boolean;
    maxShadowOpacity: number;

    showCover: boolean;
    mobileScrollSupport: boolean;
}

export class Settings {

    private _default: FlipSetting = {
        startPage: 0,
        size: SizeType.FIXED,
        width: 0,
        height: 0,
        minWidth: 0,
        maxWidth: 0,
        minHeight: 0,
        maxHeight: 0,
        drawShadow: true,
        flippingTime: 1000,
        usePortrait: true,
        startZIndex: 0,
        autoSize: true,
        maxShadowOpacity: 1,
        showCover: false,
        mobileScrollSupport: true
    };

    public getSettings(userSetting: Record<string, number | string | boolean>): FlipSetting {
        const result = this._default;
        Object.assign(result, userSetting);

        if ((result.size !== SizeType.STRETCH) && (result.size !== SizeType.FIXED))
            throw new Error('Invalid size type. Available only "fixed" and "stretch" value');

        if ((result.width <= 0) || (result.height <= 0))
            throw new Error('Invalid width or height');

        if (result.flippingTime <= 0)
            throw new Error('Invalid flipping time');

        if (result.minWidth <= 0)
            result.minWidth = result.width;

        if (result.maxWidth < result.minWidth)
            result.maxWidth = result.minWidth;

        if (result.minHeight <= 0)
            result.minHeight = result.height;

        if (result.maxHeight < result.minHeight)
            result.maxHeight = result.minHeight;

        return result;
    }

}
