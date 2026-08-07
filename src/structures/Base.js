'use strict';

/**
 * Represents a WhatsApp data structure
 */
class Base {
    constructor(client) {
        /**
         * The client that instantiated this
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });
    }

    _clone() {
        return Object.assign(Object.create(this), this);
    }

    _patch(data) {
        return data;
    }

    /**
     * Normalizes a WhatsApp ID object so that `_serialized` is always defined.
     * Recent WhatsApp Web builds renamed the serialized-key getter from
     * `_serialized` to `$1`, so backfill it to keep downstream reads working.
     * @param {object} id
     * @returns {object}
     */
    static _normalizeId(id) {
        if (
            id &&
            typeof id === 'object' &&
            id._serialized == null &&
            id.$1 != null
        ) {
            return Object.assign({}, id, { _serialized: id.$1 });
        }
        return id;
    }
}

module.exports = Base;
