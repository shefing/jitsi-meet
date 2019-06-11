// @flow

import { ColorPalette, getRGBAFormat } from '../styles';

/**
 * The default color scheme of the application.
 */
export default {
    'BottomSheet': {
        background: ColorPalette.blackBlue,
        icon: ColorPalette.white,
        label: ColorPalette.white
    },
    'Dialog': {
        background: ColorPalette.blackBlue,
        border: getRGBAFormat(ColorPalette.white, 0.2),
        buttonBackground: ColorPalette.blue,
        buttonLabel: ColorPalette.white,
        icon: ColorPalette.white,
        text: ColorPalette.white
    },
    'Header': {
        background: ColorPalette.blue,
        icon: ColorPalette.white,
        statusBar: ColorPalette.blueHighlight,
        statusBarContent: ColorPalette.white,
        text: ColorPalette.white
    },
    'LargeVideo': {
        background: ColorPalette.black
    },
    'LoadConfigOverlay': {
        background: ColorPalette.black,
        text: ColorPalette.white
    },
    'Thumbnail': {
        activeParticipantHighlight: ColorPalette.blue,
        activeParticipantTint: ColorPalette.black,
        background: ColorPalette.black
    }
};
