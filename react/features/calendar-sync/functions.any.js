// @flow

import md5 from 'js-md5';

import { setCalendarEvents } from './actions';
import { APP_LINK_SCHEME, parseURIString } from '../base/util';
import { MAX_LIST_LENGTH } from './constants';

const ALLDAY_EVENT_LENGTH = 23 * 60 * 60 * 1000;

/**
 * Returns true of the calendar entry is to be displayed in the app, false
 * otherwise.
 *
 * @param {Object} entry - The calendar entry.
 * @returns {boolean}
 */
/**
 * Checks a string against a positive pattern and a negative pattern. Returns
 * the string if it matches the positive pattern and doesn't provide any match
 * against the negative pattern. Null otherwise.
 *
 * @param {string} str - The string to check.
 * @param {string} positivePattern - The positive pattern.
 * @param {string} negativePattern - The negative pattern.
 * @returns {string}
 */
function _checkPattern(str, positivePattern, negativePattern) {
    const positiveRegExp = new RegExp(positivePattern, 'gi');
    let positiveMatch = positiveRegExp.exec(str);

    while (positiveMatch !== null) {
        const url = positiveMatch[0];

        if (!new RegExp(negativePattern, 'gi').exec(url)) {
            return url;
        }

        positiveMatch = positiveRegExp.exec(str);
    }
}

/**
 * Updates the calendar entries in Redux when new list is received.
 *
 * @param {Object} event - An event returned from the native calendar.
 * @param {Array<string>} knownDomains - The known domain list.
 * @private
 * @returns {CalendarEntry}
 */
function _parseCalendarEntry(event, knownDomains) {
    if (event) {
        const url = _getURLFromEvent(event, knownDomains);
        const startDate = Date.parse(event.startDate);
        const endDate = Date.parse(event.endDate);

        // we want to hide all events that
        // - has no start or end date
        // - for web, if there is no url and we cannot edit the event (has
        // no calendarId)
        if (isNaN(startDate)
            || isNaN(endDate)
            || (navigator.product !== 'ReactNative'
                    && !url
                    && !event.calendarId)) {
            // Ignore the event.
        } else {
            return {
                allDay: event.allDay,
                attendees: event.attendees,
                calendarId: event.calendarId,
                endDate,
                id: event.id,
                startDate,
                title: event.title,
                url
            };
        }
    }

    return null;
}

/**
 * Retrieves a Jitsi Meet URL from an event if present.
 *
 * @param {Object} event - The event to parse.
 * @param {Array<string>} knownDomains - The known domain names.
 * @private
 * @returns {string}
 */
function _getURLFromEvent(event, knownDomains) {
    const linkTerminatorPattern = '[^\\s<>$]';
    const urlRegExp
        = `http(s)?://(${knownDomains.join('|')})/${linkTerminatorPattern}+`;
    const schemeRegExp = `${APP_LINK_SCHEME}${linkTerminatorPattern}+`;
    const excludePattern = '/static/';
    const fieldsToSearch = [
        event.title,
        event.url,
        event.location,
        event.notes,
        event.description
    ];

    for (const field of fieldsToSearch) {
        if (typeof field === 'string') {
            const match
                = _checkPattern(field, urlRegExp, excludePattern)
                || _checkPattern(field, schemeRegExp, excludePattern);

            if (match) {
                const url = parseURIString(match);

                if (url) {
                    return url.toString();
                }
            }
        }
    }

    return null;
}
