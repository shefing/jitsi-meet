import React from 'react';
import {
    Animated,
    Keyboard,
    SafeAreaView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';

import { ColorSchemeRegistry } from '../../base/color-scheme';
import { translate } from '../../base/i18n';
import { Icon } from '../../base/font-icons';
import { MEDIA_TYPE } from '../../base/media';
import { Header, LoadingIndicator, Text } from '../../base/react';
import { connect } from '../../base/redux';
import { ColorPalette } from '../../base/styles';
import {
    createDesiredLocalTracks,
    destroyLocalTracks
} from '../../base/tracks';
import { DialInSummary } from '../../invite';
import { SettingsView } from '../../settings';

import {
    AbstractWelcomePage,
    _mapStateToProps as _abstractMapStateToProps
} from './AbstractWelcomePage';
import { setSideBarVisible } from '../actions';
import LocalVideoTrackUnderlay from './LocalVideoTrackUnderlay';
import styles, { PLACEHOLDER_TEXT_COLOR } from './styles';
import VideoSwitch from './VideoSwitch';
import WelcomePageLists from './WelcomePageLists';
import WelcomePageSideBar from './WelcomePageSideBar';

/**
 * The native container rendering the welcome page.
 *
 * @extends AbstractWelcomePage
 */
class WelcomePage extends AbstractWelcomePage {
    /**
     * Constructor of the Component.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        this.state._fieldFocused = false;
        this.state.hintBoxAnimation = new Animated.Value(0);

        // Bind event handlers so they are only bound once per instance.
        this._onFieldFocusChange = this._onFieldFocusChange.bind(this);
        this._onShowSideBar = this._onShowSideBar.bind(this);

        // Specially bind functions to avoid function definition on render.
        this._onFieldBlur = this._onFieldFocusChange.bind(this, false);
        this._onFieldFocus = this._onFieldFocusChange.bind(this, true);
    }

    /**
     * Implements React's {@link Component#componentDidMount()}. Invoked
     * immediately after mounting occurs. Creates a local video track if none
     * is available and the camera permission was already granted.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        super.componentDidMount();

        const { dispatch } = this.props;

            dispatch(destroyLocalTracks());
    }

    /**
     * Implements React's {@link Component#render()}. Renders a prompt for
     * entering a room name.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const roomnameAccLabel = 'welcomepage.accessibilityLabel.roomname';
        const { _headerStyles, t } = this.props;

        return (
            <LocalVideoTrackUnderlay style={styles.welcomePage}>
                <View style={_headerStyles.page}>
                    <Header style={styles.header}>
                        <TouchableOpacity onPress={this._onShowSideBar} >
                            <Icon
                                name='menu'
                                style={_headerStyles.headerButtonIcon} />
                        </TouchableOpacity>
                        <VideoSwitch />
                    </Header>
                    <SafeAreaView style={styles.roomContainer} >
                        <View style={styles.joinControls} >
                            {this._renderJoinButton()}
                        </View>
                    </SafeAreaView>
                    <DialInSummary />
                </View>
            </LocalVideoTrackUnderlay>
        );
    }

    /**
     * Constructs a style array to handle the hint box animation.
     *
     * @private
     * @returns {Array<Object>}
     */
    _getHintBoxStyle() {
        return [
            styles.hintContainer,
            {
                opacity: this.state.hintBoxAnimation
            }
        ];
    }

    /**
     * Callback for when the room field's focus changes so the hint box
     * must be rendered or removed.
     *
     * @private
     * @param {boolean} focused - The focused state of the field.
     * @returns {void}
     */
    _onFieldFocusChange(focused) {
        focused
            && this.setState({
                _fieldFocused: true
            });

        Animated.timing(
            this.state.hintBoxAnimation,
            {
                duration: 300,
                toValue: focused ? 1 : 0
            })
            .start(animationState =>
                animationState.finished
                && !focused
                && this.setState({
                    _fieldFocused: false
                }));
    }

    /**
     * Toggles the side bar.
     *
     * @private
     * @returns {void}
     */
    _onShowSideBar() {
        Keyboard.dismiss();
        this.props.dispatch(setSideBarVisible(true));
    }

    /**
     * Renders the hint box if necessary.
     *
     * @private
     * @returns {React$Node}
     */

    /**
    * Renders the join button.
    *
    * @private
    * @returns {ReactElement}
    */
    _renderJoinButton() {
        const { t } = this.props;
        let children;


        if (this.state.joining) {
            // TouchableHighlight is picky about what its children can be, so
            // wrap it in a native component, i.e. View to avoid having to
            // modify non-native children.
            children = (
                <View>
                    <LoadingIndicator
                        color={styles.buttonText.color}
                        size='small' />
                </View>
            );
        } else {
            children = (
                <Text style={styles.buttonText}>
                    {this.props.t('welcomepage.join')}
                </Text>
            );
        }


        const buttonDisabled = this._isJoinDisabled();

        return (
            <TouchableHighlight
                accessibilityLabel=
                {t('welcomepage.accessibilityLabel.join')}
                disabled={buttonDisabled}
                onPress={this._onJoin}
                style={[
                    styles.button,
                    buttonDisabled ? styles.buttonDisabled : null
                ]}
                underlayColor={ColorPalette.white}>
                {children}
            </TouchableHighlight>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _headerStyles: Object
 * }}
 */
function _mapStateToProps(state) {
    return {
        ..._abstractMapStateToProps(state),
        _headerStyles: ColorSchemeRegistry.get(state, 'Header')
    };
}

export default translate(connect(_mapStateToProps)(WelcomePage));
