(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["box-typescript-sdk-gen"] = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    class InMemoryTokenStorage {
        constructor(fields) {
            this.accessToken = void 0;
            Object.assign(this, fields);
        }
        store(token) {
            return __awaiter(this, void 0, void 0, function* () {
                this.accessToken = token;
                return void 0;
            });
        }
        get() {
            return __awaiter(this, void 0, void 0, function* () {
                return this.accessToken;
            });
        }
        clear() {
            return __awaiter(this, void 0, void 0, function* () {
                this.accessToken = void 0;
                return void 0;
            });
        }
    }

    class BoxSdkError extends Error {
        constructor(fields) {
            super(fields.message);
            this.name = 'BoxSDKError';
            Object.assign(this, fields);
            this.message = JSON.stringify(fields, undefined, 2);
        }
    }
    class BoxApiError extends BoxSdkError {
        constructor(fields) {
            super(fields);
        }
    }

    function jsonToSerializedData(text) {
        return JSON.parse(text);
    }
    function sdToJson(data) {
        return JSON.stringify(data);
    }
    function sdToUrlParams(data) {
        if (!sdIsMap(data) && !sdIsString(data)) {
            throw new Error('Expecting an object or string as an argument for sdToUrlParams');
        }
        const dataAsMap = sdIsString(data)
            ? JSON.parse(data)
            : data;
        return new URLSearchParams(Object.fromEntries(Object.entries(dataAsMap).filter(([key, value]) => value != null))).toString();
    }
    function sdIsString(data) {
        return typeof data == 'string';
    }
    function sdIsList(data) {
        return Array.isArray(data);
    }
    function sdIsMap(data) {
        return typeof data === 'object' && data != null && !Array.isArray(data);
    }

    function serializePostOAuth2TokenGrantTypeField(val) {
        return val;
    }
    function serializePostOAuth2TokenSubjectTokenTypeField(val) {
        return val;
    }
    function serializePostOAuth2TokenActorTokenTypeField(val) {
        return val;
    }
    function serializePostOAuth2TokenBoxSubjectTypeField(val) {
        return val;
    }
    function serializePostOAuth2Token(val) {
        return {
            ['grant_type']: serializePostOAuth2TokenGrantTypeField(val.grantType),
            ['client_id']: val.clientId == void 0 ? void 0 : val.clientId,
            ['client_secret']: val.clientSecret == void 0 ? void 0 : val.clientSecret,
            ['code']: val.code == void 0 ? void 0 : val.code,
            ['refresh_token']: val.refreshToken == void 0 ? void 0 : val.refreshToken,
            ['assertion']: val.assertion == void 0 ? void 0 : val.assertion,
            ['subject_token']: val.subjectToken == void 0 ? void 0 : val.subjectToken,
            ['subject_token_type']: val.subjectTokenType == void 0
                ? void 0
                : serializePostOAuth2TokenSubjectTokenTypeField(val.subjectTokenType),
            ['actor_token']: val.actorToken == void 0 ? void 0 : val.actorToken,
            ['actor_token_type']: val.actorTokenType == void 0
                ? void 0
                : serializePostOAuth2TokenActorTokenTypeField(val.actorTokenType),
            ['scope']: val.scope == void 0 ? void 0 : val.scope,
            ['resource']: val.resource == void 0 ? void 0 : val.resource,
            ['box_subject_type']: val.boxSubjectType == void 0
                ? void 0
                : serializePostOAuth2TokenBoxSubjectTypeField(val.boxSubjectType),
            ['box_subject_id']: val.boxSubjectId == void 0 ? void 0 : val.boxSubjectId,
            ['box_shared_link']: val.boxSharedLink == void 0 ? void 0 : val.boxSharedLink,
        };
    }
    function serializePostOAuth2TokenRefreshAccessTokenGrantTypeField(val) {
        return val;
    }
    function serializePostOAuth2TokenRefreshAccessToken(val) {
        return {
            ['grant_type']: serializePostOAuth2TokenRefreshAccessTokenGrantTypeField(val.grantType),
            ['client_id']: val.clientId,
            ['client_secret']: val.clientSecret,
            ['refresh_token']: val.refreshToken,
        };
    }
    function serializePostOAuth2Revoke(val) {
        return {
            ['client_id']: val.clientId == void 0 ? void 0 : val.clientId,
            ['client_secret']: val.clientSecret == void 0 ? void 0 : val.clientSecret,
            ['token']: val.token == void 0 ? void 0 : val.token,
        };
    }
    function serializeZipDownloadRequestItemsTypeField(val) {
        return val;
    }
    function serializeZipDownloadRequestItemsField(val) {
        return {
            ['type']: serializeZipDownloadRequestItemsTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeZipDownloadRequest(val) {
        return {
            ['items']: val.items.map(function (item) {
                return serializeZipDownloadRequestItemsField(item);
            }),
            ['download_file_name']: val.downloadFileName == void 0 ? void 0 : val.downloadFileName,
        };
    }
    function serializeMetadataQueryOrderByDirectionField(val) {
        return val;
    }
    function serializeMetadataQueryOrderByField(val) {
        return {
            ['field_key']: val.fieldKey == void 0 ? void 0 : val.fieldKey,
            ['direction']: val.direction == void 0
                ? void 0
                : serializeMetadataQueryOrderByDirectionField(val.direction),
        };
    }
    function serializeMetadataQuery(val) {
        return {
            ['from']: val.from,
            ['query']: val.query == void 0 ? void 0 : val.query,
            ['query_params']: val.queryParams == void 0 ? void 0 : val.queryParams,
            ['ancestor_folder_id']: val.ancestorFolderId,
            ['order_by']: val.orderBy == void 0
                ? void 0
                : val.orderBy.map(function (item) {
                    return serializeMetadataQueryOrderByField(item);
                }),
            ['limit']: val.limit == void 0 ? void 0 : val.limit,
            ['marker']: val.marker == void 0 ? void 0 : val.marker,
            ['fields']: val.fields == void 0
                ? void 0
                : val.fields.map(function (item) {
                    return item;
                }),
        };
    }
    function serializeFileRequestUpdateRequestStatusField(val) {
        return val;
    }
    function serializeFileRequestUpdateRequest(val) {
        return {
            ['title']: val.title == void 0 ? void 0 : val.title,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['status']: val.status == void 0
                ? void 0
                : serializeFileRequestUpdateRequestStatusField(val.status),
            ['is_email_required']: val.isEmailRequired == void 0 ? void 0 : val.isEmailRequired,
            ['is_description_required']: val.isDescriptionRequired == void 0 ? void 0 : val.isDescriptionRequired,
            ['expires_at']: val.expiresAt == void 0 ? void 0 : val.expiresAt,
        };
    }
    function serializeFileRequestCopyRequestFolderTypeField(val) {
        return val;
    }
    function serializeFileRequestCopyRequestFolderField(val) {
        return {
            ['type']: val.type == void 0
                ? void 0
                : serializeFileRequestCopyRequestFolderTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeFileRequestCopyRequest(val) {
        const base = serializeFileRequestUpdateRequest(val);
        if (!sdIsMap(base)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "FileRequestCopyRequest"',
            });
        }
        return Object.assign(Object.assign({}, base), { ['folder']: serializeFileRequestCopyRequestFolderField(val.folder) });
    }
    function deserializeClassificationTemplateField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ClassificationTemplateField"',
            });
        }
        if (val == 'securityClassification-6VMVochwUWo') {
            return 'securityClassification-6VMVochwUWo';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeClassification(val) {
        const boxSecurityClassificationKey = val.Box__Security__Classification__Key == void 0
            ? void 0
            : val.Box__Security__Classification__Key;
        const parent = val.$parent == void 0 ? void 0 : val.$parent;
        const template = val.$template == void 0
            ? void 0
            : deserializeClassificationTemplateField(val.$template);
        const scope = val.$scope == void 0 ? void 0 : val.$scope;
        const version = val.$version == void 0 ? void 0 : val.$version;
        const type = val.$type == void 0 ? void 0 : val.$type;
        const typeVersion = val.$typeVersion == void 0 ? void 0 : val.$typeVersion;
        const canEdit = val.$canEdit == void 0 ? void 0 : val.$canEdit;
        return {
            boxSecurityClassificationKey: boxSecurityClassificationKey,
            parent: parent,
            template: template,
            scope: scope,
            version: version,
            type: type,
            typeVersion: typeVersion,
            canEdit: canEdit,
        };
    }
    function deserializeClassificationTemplateTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ClassificationTemplateTypeField"',
            });
        }
        if (val == 'metadata_template') {
            return 'metadata_template';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeClassificationTemplateTemplateKeyField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ClassificationTemplateTemplateKeyField"',
            });
        }
        if (val == 'securityClassification-6VMVochwUWo') {
            return 'securityClassification-6VMVochwUWo';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeClassificationTemplateDisplayNameField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ClassificationTemplateDisplayNameField"',
            });
        }
        if (val == 'Classification') {
            return 'Classification';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeClassificationTemplateFieldsTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ClassificationTemplateFieldsTypeField"',
            });
        }
        if (val == 'enum') {
            return 'enum';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeClassificationTemplateFieldsKeyField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ClassificationTemplateFieldsKeyField"',
            });
        }
        if (val == 'Box__Security__Classification__Key') {
            return 'Box__Security__Classification__Key';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeClassificationTemplateFieldsDisplayNameField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ClassificationTemplateFieldsDisplayNameField"',
            });
        }
        if (val == 'Classification') {
            return 'Classification';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeClassificationTemplateFieldsOptionsStaticConfigClassificationField(val) {
        const classificationDefinition = val.classificationDefinition == void 0
            ? void 0
            : val.classificationDefinition;
        const colorId = val.colorID == void 0 ? void 0 : val.colorID;
        return {
            classificationDefinition: classificationDefinition,
            colorId: colorId,
        };
    }
    function deserializeClassificationTemplateFieldsOptionsStaticConfigField(val) {
        const classification = val.classification == void 0
            ? void 0
            : deserializeClassificationTemplateFieldsOptionsStaticConfigClassificationField(val.classification);
        return {
            classification: classification,
        };
    }
    function deserializeClassificationTemplateFieldsOptionsField(val) {
        const id = val.id;
        const key = val.key;
        const staticConfig = val.staticConfig == void 0
            ? void 0
            : deserializeClassificationTemplateFieldsOptionsStaticConfigField(val.staticConfig);
        return {
            id: id,
            key: key,
            staticConfig: staticConfig,
        };
    }
    function deserializeClassificationTemplateFieldsField(val) {
        const id = val.id;
        const type = deserializeClassificationTemplateFieldsTypeField(val.type);
        const key = deserializeClassificationTemplateFieldsKeyField(val.key);
        const displayName = deserializeClassificationTemplateFieldsDisplayNameField(val.displayName);
        const hidden = val.hidden == void 0 ? void 0 : val.hidden;
        const options = sdIsList(val.options)
            ? val.options.map(function (itm) {
                return deserializeClassificationTemplateFieldsOptionsField(itm);
            })
            : [];
        return {
            id: id,
            type: type,
            key: key,
            displayName: displayName,
            hidden: hidden,
            options: options,
        };
    }
    function deserializeClassificationTemplate(val) {
        const id = val.id;
        const type = deserializeClassificationTemplateTypeField(val.type);
        const scope = val.scope;
        const templateKey = deserializeClassificationTemplateTemplateKeyField(val.templateKey);
        const displayName = deserializeClassificationTemplateDisplayNameField(val.displayName);
        const hidden = val.hidden == void 0 ? void 0 : val.hidden;
        const copyInstanceOnItemCopy = val.copyInstanceOnItemCopy == void 0 ? void 0 : val.copyInstanceOnItemCopy;
        const fields = sdIsList(val.fields)
            ? val.fields.map(function (itm) {
                return deserializeClassificationTemplateFieldsField(itm);
            })
            : [];
        return {
            id: id,
            type: type,
            scope: scope,
            templateKey: templateKey,
            displayName: displayName,
            hidden: hidden,
            copyInstanceOnItemCopy: copyInstanceOnItemCopy,
            fields: fields,
        };
    }
    function deserializeCollaborationAllowlistEntryTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollaborationAllowlistEntryTypeField"',
            });
        }
        if (val == 'collaboration_whitelist_entry') {
            return 'collaboration_whitelist_entry';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollaborationAllowlistEntryDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollaborationAllowlistEntryDirectionField"',
            });
        }
        if (val == 'inbound') {
            return 'inbound';
        }
        if (val == 'outbound') {
            return 'outbound';
        }
        if (val == 'both') {
            return 'both';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollaborationAllowlistEntryEnterpriseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollaborationAllowlistEntryEnterpriseTypeField"',
            });
        }
        if (val == 'enterprise') {
            return 'enterprise';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollaborationAllowlistEntryEnterpriseField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeCollaborationAllowlistEntryEnterpriseTypeField(val.type);
        const name = val.name == void 0 ? void 0 : val.name;
        return {
            id: id,
            type: type,
            name: name,
        };
    }
    function deserializeCollaborationAllowlistEntry(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeCollaborationAllowlistEntryTypeField(val.type);
        const domain = val.domain == void 0 ? void 0 : val.domain;
        const direction = val.direction == void 0
            ? void 0
            : deserializeCollaborationAllowlistEntryDirectionField(val.direction);
        const enterprise = val.enterprise == void 0
            ? void 0
            : deserializeCollaborationAllowlistEntryEnterpriseField(val.enterprise);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        return {
            id: id,
            type: type,
            domain: domain,
            direction: direction,
            enterprise: enterprise,
            createdAt: createdAt,
        };
    }
    function deserializeCollaborationAllowlistEntries(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeCollaborationAllowlistEntry(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeCollectionTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollectionTypeField"',
            });
        }
        if (val == 'collection') {
            return 'collection';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollectionNameField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollectionNameField"',
            });
        }
        if (val == 'Favorites') {
            return 'Favorites';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollectionCollectionTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollectionCollectionTypeField"',
            });
        }
        if (val == 'favorites') {
            return 'favorites';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollection(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeCollectionTypeField(val.type);
        const name = val.name == void 0 ? void 0 : deserializeCollectionNameField(val.name);
        const collectionType = val.collection_type == void 0
            ? void 0
            : deserializeCollectionCollectionTypeField(val.collection_type);
        return {
            id: id,
            type: type,
            name: name,
            collectionType: collectionType,
        };
    }
    function deserializeCollectionsOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollectionsOrderDirectionField"',
            });
        }
        if (val == 'ASC') {
            return 'ASC';
        }
        if (val == 'DESC') {
            return 'DESC';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollectionsOrderField(val) {
        const by = val.by == void 0 ? void 0 : val.by;
        const direction = val.direction == void 0
            ? void 0
            : deserializeCollectionsOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeCollections(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeCollectionsOrderField(itm);
                })
                : [];
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeCollection(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            order: order,
            entries: entries,
        };
    }
    function deserializeCommentBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CommentBaseTypeField"',
            });
        }
        if (val == 'comment') {
            return 'comment';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeEmailAliasTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "EmailAliasTypeField"',
            });
        }
        if (val == 'email_alias') {
            return 'email_alias';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeEmailAlias(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeEmailAliasTypeField(val.type);
        const email = val.email == void 0 ? void 0 : val.email;
        const isConfirmed = val.is_confirmed == void 0 ? void 0 : val.is_confirmed;
        return {
            id: id,
            type: type,
            email: email,
            isConfirmed: isConfirmed,
        };
    }
    function deserializeEmailAliases(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeEmailAlias(itm);
                })
                : [];
        return { totalCount: totalCount, entries: entries };
    }
    function serializeEnterpriseBaseTypeField(val) {
        return val;
    }
    function deserializeEnterpriseBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "EnterpriseBaseTypeField"',
            });
        }
        if (val == 'enterprise') {
            return 'enterprise';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeEnterpriseBase(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0 ? void 0 : serializeEnterpriseBaseTypeField(val.type),
        };
    }
    function deserializeEnterpriseBase(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeEnterpriseBaseTypeField(val.type);
        return { id: id, type: type };
    }
    function serializeFileBaseTypeField(val) {
        return val;
    }
    function deserializeFileBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileBaseTypeField"',
            });
        }
        if (val == 'file') {
            return 'file';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeFileBase(val) {
        return {
            ['id']: val.id,
            ['etag']: val.etag == void 0 ? void 0 : val.etag,
            ['type']: serializeFileBaseTypeField(val.type),
        };
    }
    function deserializeFileBase(val) {
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeFileBaseTypeField(val.type);
        return { id: id, etag: etag, type: type };
    }
    function deserializeFileVersionBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileVersionBaseTypeField"',
            });
        }
        if (val == 'file_version') {
            return 'file_version';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileVersionMini(val) {
        const sha1 = val.sha1 == void 0 ? void 0 : val.sha1;
        const id = val.id;
        const type = deserializeFileVersionBaseTypeField(val.type);
        return { sha1: sha1, id: id, type: type };
    }
    function deserializeFileMini(val) {
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const sha1 = val.sha1 == void 0 ? void 0 : val.sha1;
        const fileVersion = val.file_version == void 0
            ? void 0
            : deserializeFileVersionMini(val.file_version);
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeFileBaseTypeField(val.type);
        return {
            sequenceId: sequenceId,
            name: name,
            sha1: sha1,
            fileVersion: fileVersion,
            id: id,
            etag: etag,
            type: type,
        };
    }
    function deserializeFilesUnderRetention(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFileMini(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function serializeFolderBaseTypeField(val) {
        return val;
    }
    function deserializeFolderBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FolderBaseTypeField"',
            });
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeFolderBase(val) {
        return {
            ['id']: val.id,
            ['etag']: val.etag == void 0 ? void 0 : val.etag,
            ['type']: serializeFolderBaseTypeField(val.type),
        };
    }
    function serializeFolderMini(val) {
        const base = serializeFolderBase(val);
        if (!sdIsMap(base)) {
            throw new BoxSdkError({ message: 'Expecting a map for "FolderMini"' });
        }
        return Object.assign(Object.assign({}, base), {
            ['sequence_id']: val.sequenceId == void 0 ? void 0 : val.sequenceId,
            ['name']: val.name == void 0 ? void 0 : val.name,
        });
    }
    function deserializeFolderMini(val) {
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeFolderBaseTypeField(val.type);
        return {
            sequenceId: sequenceId,
            name: name,
            id: id,
            etag: etag,
            type: type,
        };
    }
    function deserializeFileMiniOrFolderMini(val) {
        if (!sdIsMap(val)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "FileMiniOrFolderMini"',
            });
        }
        if (val.type == 'file') {
            return deserializeFileMini(val);
        }
        if (val.type == 'folder') {
            return deserializeFolderMini(val);
        }
        throw new BoxSdkError({ message: 'unknown type' });
    }
    function deserializeFileOrFolderScopeScopeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileOrFolderScopeScopeField"',
            });
        }
        if (val == 'annotation_edit') {
            return 'annotation_edit';
        }
        if (val == 'annotation_view_all') {
            return 'annotation_view_all';
        }
        if (val == 'annotation_view_self') {
            return 'annotation_view_self';
        }
        if (val == 'base_explorer') {
            return 'base_explorer';
        }
        if (val == 'base_picker') {
            return 'base_picker';
        }
        if (val == 'base_preview') {
            return 'base_preview';
        }
        if (val == 'base_upload') {
            return 'base_upload';
        }
        if (val == 'item_delete') {
            return 'item_delete';
        }
        if (val == 'item_download') {
            return 'item_download';
        }
        if (val == 'item_preview') {
            return 'item_preview';
        }
        if (val == 'item_rename') {
            return 'item_rename';
        }
        if (val == 'item_share') {
            return 'item_share';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileOrFolderScope(val) {
        const scope = val.scope == void 0
            ? void 0
            : deserializeFileOrFolderScopeScopeField(val.scope);
        const object = val.object == void 0 ? void 0 : deserializeFileMiniOrFolderMini(val.object);
        return { scope: scope, object: object };
    }
    function deserializeAccessTokenTokenTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "AccessTokenTokenTypeField"',
            });
        }
        if (val == 'bearer') {
            return 'bearer';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeAccessTokenIssuedTokenTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "AccessTokenIssuedTokenTypeField"',
            });
        }
        if (val == 'urn:ietf:params:oauth:token-type:access_token') {
            return 'urn:ietf:params:oauth:token-type:access_token';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeAccessToken(val) {
        const accessToken = val.access_token == void 0 ? void 0 : val.access_token;
        const expiresIn = val.expires_in == void 0 ? void 0 : val.expires_in;
        const tokenType = val.token_type == void 0
            ? void 0
            : deserializeAccessTokenTokenTypeField(val.token_type);
        const restrictedTo = val.restricted_to == void 0
            ? void 0
            : sdIsList(val.restricted_to)
                ? val.restricted_to.map(function (itm) {
                    return deserializeFileOrFolderScope(itm);
                })
                : [];
        const refreshToken = val.refresh_token == void 0 ? void 0 : val.refresh_token;
        const issuedTokenType = val.issued_token_type == void 0
            ? void 0
            : deserializeAccessTokenIssuedTokenTypeField(val.issued_token_type);
        return {
            accessToken: accessToken,
            expiresIn: expiresIn,
            tokenType: tokenType,
            restrictedTo: restrictedTo,
            refreshToken: refreshToken,
            issuedTokenType: issuedTokenType,
        };
    }
    function deserializeGenericSource(val) {
        return val;
    }
    function deserializeIntegrationMappingBaseIntegrationTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "IntegrationMappingBaseIntegrationTypeField"',
            });
        }
        if (val == 'slack') {
            return 'slack';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeGroupBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "GroupBaseTypeField"',
            });
        }
        if (val == 'group') {
            return 'group';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeGroupMiniGroupTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "GroupMiniGroupTypeField"',
            });
        }
        if (val == 'managed_group') {
            return 'managed_group';
        }
        if (val == 'all_users_group') {
            return 'all_users_group';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeGroupMini(val) {
        const name = val.name == void 0 ? void 0 : val.name;
        const groupType = val.group_type == void 0
            ? void 0
            : deserializeGroupMiniGroupTypeField(val.group_type);
        const id = val.id;
        const type = deserializeGroupBaseTypeField(val.type);
        return {
            name: name,
            groupType: groupType,
            id: id,
            type: type,
        };
    }
    function deserializeGroupFullInvitabilityLevelField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "GroupFullInvitabilityLevelField"',
            });
        }
        if (val == 'admins_only') {
            return 'admins_only';
        }
        if (val == 'admins_and_members') {
            return 'admins_and_members';
        }
        if (val == 'all_managed_users') {
            return 'all_managed_users';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeGroupFullMemberViewabilityLevelField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "GroupFullMemberViewabilityLevelField"',
            });
        }
        if (val == 'admins_only') {
            return 'admins_only';
        }
        if (val == 'admins_and_members') {
            return 'admins_and_members';
        }
        if (val == 'all_managed_users') {
            return 'all_managed_users';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeGroupFullPermissionsField(val) {
        const canInviteAsCollaborator = val.can_invite_as_collaborator == void 0
            ? void 0
            : val.can_invite_as_collaborator;
        return {
            canInviteAsCollaborator: canInviteAsCollaborator,
        };
    }
    function deserializeGroupFull(val) {
        const provenance = val.provenance == void 0 ? void 0 : val.provenance;
        const externalSyncIdentifier = val.external_sync_identifier == void 0
            ? void 0
            : val.external_sync_identifier;
        const description = val.description == void 0 ? void 0 : val.description;
        const invitabilityLevel = val.invitability_level == void 0
            ? void 0
            : deserializeGroupFullInvitabilityLevelField(val.invitability_level);
        const memberViewabilityLevel = val.member_viewability_level == void 0
            ? void 0
            : deserializeGroupFullMemberViewabilityLevelField(val.member_viewability_level);
        const permissions = val.permissions == void 0
            ? void 0
            : deserializeGroupFullPermissionsField(val.permissions);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const name = val.name == void 0 ? void 0 : val.name;
        const groupType = val.group_type == void 0
            ? void 0
            : deserializeGroupMiniGroupTypeField(val.group_type);
        const id = val.id;
        const type = deserializeGroupBaseTypeField(val.type);
        return {
            provenance: provenance,
            externalSyncIdentifier: externalSyncIdentifier,
            description: description,
            invitabilityLevel: invitabilityLevel,
            memberViewabilityLevel: memberViewabilityLevel,
            permissions: permissions,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            name: name,
            groupType: groupType,
            id: id,
            type: type,
        };
    }
    function deserializeGroupsOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "GroupsOrderDirectionField"',
            });
        }
        if (val == 'ASC') {
            return 'ASC';
        }
        if (val == 'DESC') {
            return 'DESC';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeGroupsOrderField(val) {
        const by = val.by == void 0 ? void 0 : val.by;
        const direction = val.direction == void 0
            ? void 0
            : deserializeGroupsOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeGroups(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeGroupsOrderField(itm);
                })
                : [];
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeGroupFull(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            order: order,
            entries: entries,
        };
    }
    function deserializeLegalHoldPolicyMiniTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "LegalHoldPolicyMiniTypeField"',
            });
        }
        if (val == 'legal_hold_policy') {
            return 'legal_hold_policy';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeLegalHoldPolicyMini(val) {
        const id = val.id;
        const type = deserializeLegalHoldPolicyMiniTypeField(val.type);
        return { id: id, type: type };
    }
    function deserializeLegalHoldPolicyAssignmentBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "LegalHoldPolicyAssignmentBaseTypeField"',
            });
        }
        if (val == 'legal_hold_policy_assignment') {
            return 'legal_hold_policy_assignment';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeMetadataBase(val) {
        const parent = val.$parent == void 0 ? void 0 : val.$parent;
        const template = val.$template == void 0 ? void 0 : val.$template;
        const scope = val.$scope == void 0 ? void 0 : val.$scope;
        const version = val.$version == void 0 ? void 0 : val.$version;
        return {
            parent: parent,
            template: template,
            scope: scope,
            version: version,
        };
    }
    function deserializeMetadata(val) {
        return deserializeMetadataBase(val);
    }
    function deserializeMetadatas(val) {
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeMetadata(itm);
                })
                : [];
        const limit = val.limit == void 0 ? void 0 : val.limit;
        return { entries: entries, limit: limit };
    }
    function deserializeMetadataFull(val) {
        const canEdit = val.$canEdit == void 0 ? void 0 : val.$canEdit;
        const id = val.$id == void 0 ? void 0 : val.$id;
        const type = val.$type == void 0 ? void 0 : val.$type;
        const typeVersion = val.$typeVersion == void 0 ? void 0 : val.$typeVersion;
        const extraData = val == void 0 ? void 0 : val;
        const parent = val.$parent == void 0 ? void 0 : val.$parent;
        const template = val.$template == void 0 ? void 0 : val.$template;
        const scope = val.$scope == void 0 ? void 0 : val.$scope;
        const version = val.$version == void 0 ? void 0 : val.$version;
        return {
            canEdit: canEdit,
            id: id,
            type: type,
            typeVersion: typeVersion,
            extraData: extraData,
            parent: parent,
            template: template,
            scope: scope,
            version: version,
        };
    }
    function deserializeMetadataCascadePolicyTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "MetadataCascadePolicyTypeField"',
            });
        }
        if (val == 'metadata_cascade_policy') {
            return 'metadata_cascade_policy';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeMetadataCascadePolicyOwnerEnterpriseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "MetadataCascadePolicyOwnerEnterpriseTypeField"',
            });
        }
        if (val == 'enterprise') {
            return 'enterprise';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeMetadataCascadePolicyOwnerEnterpriseField(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeMetadataCascadePolicyOwnerEnterpriseTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        return {
            type: type,
            id: id,
        };
    }
    function deserializeMetadataCascadePolicyParentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "MetadataCascadePolicyParentTypeField"',
            });
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeMetadataCascadePolicyParentField(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeMetadataCascadePolicyParentTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        return { type: type, id: id };
    }
    function deserializeMetadataCascadePolicy(val) {
        const id = val.id;
        const type = deserializeMetadataCascadePolicyTypeField(val.type);
        const ownerEnterprise = val.owner_enterprise == void 0
            ? void 0
            : deserializeMetadataCascadePolicyOwnerEnterpriseField(val.owner_enterprise);
        const parent = val.parent == void 0
            ? void 0
            : deserializeMetadataCascadePolicyParentField(val.parent);
        const scope = val.scope == void 0 ? void 0 : val.scope;
        const templateKey = val.templateKey == void 0 ? void 0 : val.templateKey;
        return {
            id: id,
            type: type,
            ownerEnterprise: ownerEnterprise,
            parent: parent,
            scope: scope,
            templateKey: templateKey,
        };
    }
    function deserializeMetadataCascadePolicies(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeMetadataCascadePolicy(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeMetadataTemplateTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "MetadataTemplateTypeField"',
            });
        }
        if (val == 'metadata_template') {
            return 'metadata_template';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeMetadataTemplateFieldsTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "MetadataTemplateFieldsTypeField"',
            });
        }
        if (val == 'string') {
            return 'string';
        }
        if (val == 'float') {
            return 'float';
        }
        if (val == 'date') {
            return 'date';
        }
        if (val == 'enum') {
            return 'enum';
        }
        if (val == 'multiSelect') {
            return 'multiSelect';
        }
        if (val == 'integer') {
            return 'integer';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeMetadataTemplateFieldsOptionsField(val) {
        const key = val.key;
        const id = val.id == void 0 ? void 0 : val.id;
        return { key: key, id: id };
    }
    function deserializeMetadataTemplateFieldsField(val) {
        const type = deserializeMetadataTemplateFieldsTypeField(val.type);
        const key = val.key;
        const displayName = val.displayName;
        const description = val.description == void 0 ? void 0 : val.description;
        const hidden = val.hidden == void 0 ? void 0 : val.hidden;
        const options = val.options == void 0
            ? void 0
            : sdIsList(val.options)
                ? val.options.map(function (itm) {
                    return deserializeMetadataTemplateFieldsOptionsField(itm);
                })
                : [];
        const id = val.id == void 0 ? void 0 : val.id;
        return {
            type: type,
            key: key,
            displayName: displayName,
            description: description,
            hidden: hidden,
            options: options,
            id: id,
        };
    }
    function deserializeMetadataTemplate(val) {
        const id = val.id;
        const type = deserializeMetadataTemplateTypeField(val.type);
        const scope = val.scope == void 0 ? void 0 : val.scope;
        const templateKey = val.templateKey == void 0 ? void 0 : val.templateKey;
        const displayName = val.displayName == void 0 ? void 0 : val.displayName;
        const hidden = val.hidden == void 0 ? void 0 : val.hidden;
        const fields = val.fields == void 0
            ? void 0
            : sdIsList(val.fields)
                ? val.fields.map(function (itm) {
                    return deserializeMetadataTemplateFieldsField(itm);
                })
                : [];
        const copyInstanceOnItemCopy = val.copyInstanceOnItemCopy == void 0 ? void 0 : val.copyInstanceOnItemCopy;
        return {
            id: id,
            type: type,
            scope: scope,
            templateKey: templateKey,
            displayName: displayName,
            hidden: hidden,
            fields: fields,
            copyInstanceOnItemCopy: copyInstanceOnItemCopy,
        };
    }
    function deserializeMetadataTemplates(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeMetadataTemplate(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeRealtimeServer(val) {
        const type = val.type == void 0 ? void 0 : val.type;
        const url = val.url == void 0 ? void 0 : val.url;
        const ttl = val.ttl == void 0 ? void 0 : val.ttl;
        const maxRetries = val.max_retries == void 0 ? void 0 : val.max_retries;
        const retryTimeout = val.retry_timeout == void 0 ? void 0 : val.retry_timeout;
        return {
            type: type,
            url: url,
            ttl: ttl,
            maxRetries: maxRetries,
            retryTimeout: retryTimeout,
        };
    }
    function deserializeRealtimeServers(val) {
        const chunkSize = val.chunk_size == void 0 ? void 0 : val.chunk_size;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeRealtimeServer(itm);
                })
                : [];
        return { chunkSize: chunkSize, entries: entries };
    }
    function deserializeRetentionPolicyBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "RetentionPolicyBaseTypeField"',
            });
        }
        if (val == 'retention_policy') {
            return 'retention_policy';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeRetentionPolicyMiniDispositionActionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "RetentionPolicyMiniDispositionActionField"',
            });
        }
        if (val == 'permanently_delete') {
            return 'permanently_delete';
        }
        if (val == 'remove_retention') {
            return 'remove_retention';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeRetentionPolicyMini(val) {
        const policyName = val.policy_name == void 0 ? void 0 : val.policy_name;
        const retentionLength = val.retention_length == void 0 ? void 0 : val.retention_length;
        const dispositionAction = val.disposition_action == void 0
            ? void 0
            : deserializeRetentionPolicyMiniDispositionActionField(val.disposition_action);
        const id = val.id;
        const type = deserializeRetentionPolicyBaseTypeField(val.type);
        return {
            policyName: policyName,
            retentionLength: retentionLength,
            dispositionAction: dispositionAction,
            id: id,
            type: type,
        };
    }
    function deserializeFileVersionRetentionTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileVersionRetentionTypeField"',
            });
        }
        if (val == 'file_version_retention') {
            return 'file_version_retention';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileVersionRetention(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeFileVersionRetentionTypeField(val.type);
        const fileVersion = val.file_version == void 0
            ? void 0
            : deserializeFileVersionMini(val.file_version);
        const file = val.file == void 0 ? void 0 : deserializeFileMini(val.file);
        const appliedAt = val.applied_at == void 0 ? void 0 : val.applied_at;
        const dispositionAt = val.disposition_at == void 0 ? void 0 : val.disposition_at;
        const winningRetentionPolicy = val.winning_retention_policy == void 0
            ? void 0
            : deserializeRetentionPolicyMini(val.winning_retention_policy);
        return {
            id: id,
            type: type,
            fileVersion: fileVersion,
            file: file,
            appliedAt: appliedAt,
            dispositionAt: dispositionAt,
            winningRetentionPolicy: winningRetentionPolicy,
        };
    }
    function deserializeFileVersionRetentions(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFileVersionRetention(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function serializeShieldInformationBarrierBaseTypeField(val) {
        return val;
    }
    function deserializeShieldInformationBarrierBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierBaseTypeField"',
            });
        }
        if (val == 'shield_information_barrier') {
            return 'shield_information_barrier';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeShieldInformationBarrierBase(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0
                ? void 0
                : serializeShieldInformationBarrierBaseTypeField(val.type),
        };
    }
    function deserializeShieldInformationBarrierBase(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeShieldInformationBarrierBaseTypeField(val.type);
        return { id: id, type: type };
    }
    function serializeShieldInformationBarrierReference(val) {
        return {
            ['shield_information_barrier']: val.shieldInformationBarrier == void 0
                ? void 0
                : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
        };
    }
    function deserializeShieldInformationBarrierReference(val) {
        const shieldInformationBarrier = val.shield_information_barrier == void 0
            ? void 0
            : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
        return {
            shieldInformationBarrier: shieldInformationBarrier,
        };
    }
    function deserializeShieldInformationBarrierReportBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierReportBaseTypeField"',
            });
        }
        if (val == 'shield_information_barrier_report') {
            return 'shield_information_barrier_report';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrierSegmentMemberBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierSegmentMemberBaseTypeField"',
            });
        }
        if (val == 'shield_information_barrier_segment_member') {
            return 'shield_information_barrier_segment_member';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrierSegmentRestrictionBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierSegmentRestrictionBaseTypeField"',
            });
        }
        if (val == 'shield_information_barrier_segment_restriction') {
            return 'shield_information_barrier_segment_restriction';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField"',
            });
        }
        if (val == 'shield_information_barrier_segment') {
            return 'shield_information_barrier_segment';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentTypeField(val.type);
        return {
            id: id,
            type: type,
        };
    }
    function deserializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField"',
            });
        }
        if (val == 'shield_information_barrier_segment') {
            return 'shield_information_barrier_segment';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentTypeField(val.type);
        return {
            id: id,
            type: type,
        };
    }
    function deserializeSessionTerminationMessage(val) {
        const message = val.message == void 0 ? void 0 : val.message;
        return { message: message };
    }
    function deserializeStoragePolicyMiniTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "StoragePolicyMiniTypeField"',
            });
        }
        if (val == 'storage_policy') {
            return 'storage_policy';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeStoragePolicyMini(val) {
        const id = val.id;
        const type = deserializeStoragePolicyMiniTypeField(val.type);
        return { id: id, type: type };
    }
    function deserializeStoragePolicyAssignmentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "StoragePolicyAssignmentTypeField"',
            });
        }
        if (val == 'storage_policy_assignment') {
            return 'storage_policy_assignment';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeStoragePolicyAssignmentAssignedToField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : val.type;
        return {
            id: id,
            type: type,
        };
    }
    function deserializeStoragePolicyAssignment(val) {
        const id = val.id;
        const type = deserializeStoragePolicyAssignmentTypeField(val.type);
        const storagePolicy = val.storage_policy == void 0
            ? void 0
            : deserializeStoragePolicyMini(val.storage_policy);
        const assignedTo = val.assigned_to == void 0
            ? void 0
            : deserializeStoragePolicyAssignmentAssignedToField(val.assigned_to);
        return {
            id: id,
            type: type,
            storagePolicy: storagePolicy,
            assignedTo: assignedTo,
        };
    }
    function deserializeStoragePolicyAssignments(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeStoragePolicyAssignment(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeStoragePolicy(val) {
        const name = val.name == void 0 ? void 0 : val.name;
        const id = val.id;
        const type = deserializeStoragePolicyMiniTypeField(val.type);
        return { name: name, id: id, type: type };
    }
    function deserializeStoragePolicies(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeStoragePolicy(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeTermsOfServiceBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TermsOfServiceBaseTypeField"',
            });
        }
        if (val == 'terms_of_service') {
            return 'terms_of_service';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTermsOfServiceBase(val) {
        const id = val.id;
        const type = deserializeTermsOfServiceBaseTypeField(val.type);
        return { id: id, type: type };
    }
    function deserializeTermsOfServiceStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TermsOfServiceStatusField"',
            });
        }
        if (val == 'enabled') {
            return 'enabled';
        }
        if (val == 'disabled') {
            return 'disabled';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTermsOfServiceEnterpriseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TermsOfServiceEnterpriseTypeField"',
            });
        }
        if (val == 'enterprise') {
            return 'enterprise';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTermsOfServiceEnterpriseField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeTermsOfServiceEnterpriseTypeField(val.type);
        const name = val.name == void 0 ? void 0 : val.name;
        return {
            id: id,
            type: type,
            name: name,
        };
    }
    function deserializeTermsOfServiceTosTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TermsOfServiceTosTypeField"',
            });
        }
        if (val == 'managed') {
            return 'managed';
        }
        if (val == 'external') {
            return 'external';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTermsOfService(val) {
        const status = val.status == void 0
            ? void 0
            : deserializeTermsOfServiceStatusField(val.status);
        const enterprise = val.enterprise == void 0
            ? void 0
            : deserializeTermsOfServiceEnterpriseField(val.enterprise);
        const tosType = val.tos_type == void 0
            ? void 0
            : deserializeTermsOfServiceTosTypeField(val.tos_type);
        const text = val.text == void 0 ? void 0 : val.text;
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const id = val.id;
        const type = deserializeTermsOfServiceBaseTypeField(val.type);
        return {
            status: status,
            enterprise: enterprise,
            tosType: tosType,
            text: text,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            id: id,
            type: type,
        };
    }
    function deserializeTermsOfServices(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeTermsOfService(itm);
                })
                : [];
        return { totalCount: totalCount, entries: entries };
    }
    function serializeUploadPartMini(val) {
        return {
            ['part_id']: val.partId == void 0 ? void 0 : val.partId,
            ['offset']: val.offset == void 0 ? void 0 : val.offset,
            ['size']: val.size == void 0 ? void 0 : val.size,
        };
    }
    function serializeUploadPart(val) {
        const base = serializeUploadPartMini(val);
        if (!sdIsMap(base)) {
            throw new BoxSdkError({ message: 'Expecting a map for "UploadPart"' });
        }
        return Object.assign(Object.assign({}, base), { ['sha1']: val.sha1 == void 0 ? void 0 : val.sha1 });
    }
    function deserializeUploadPart(val) {
        const sha1 = val.sha1 == void 0 ? void 0 : val.sha1;
        const partId = val.part_id == void 0 ? void 0 : val.part_id;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const size = val.size == void 0 ? void 0 : val.size;
        return {
            sha1: sha1,
            partId: partId,
            offset: offset,
            size: size,
        };
    }
    function deserializeUploadPartsOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "UploadPartsOrderDirectionField"',
            });
        }
        if (val == 'ASC') {
            return 'ASC';
        }
        if (val == 'DESC') {
            return 'DESC';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeUploadPartsOrderField(val) {
        const by = val.by == void 0 ? void 0 : val.by;
        const direction = val.direction == void 0
            ? void 0
            : deserializeUploadPartsOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeUploadParts(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeUploadPartsOrderField(itm);
                })
                : [];
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeUploadPart(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            order: order,
            entries: entries,
        };
    }
    function deserializeUploadedPart(val) {
        const part = val.part == void 0 ? void 0 : deserializeUploadPart(val.part);
        return { part: part };
    }
    function deserializeUploadSessionTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "UploadSessionTypeField"',
            });
        }
        if (val == 'upload_session') {
            return 'upload_session';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeUploadSessionSessionEndpointsField(val) {
        const uploadPart = val.upload_part == void 0 ? void 0 : val.upload_part;
        const commit = val.commit == void 0 ? void 0 : val.commit;
        const abort = val.abort == void 0 ? void 0 : val.abort;
        const listParts = val.list_parts == void 0 ? void 0 : val.list_parts;
        const status = val.status == void 0 ? void 0 : val.status;
        const logEvent = val.log_event == void 0 ? void 0 : val.log_event;
        return {
            uploadPart: uploadPart,
            commit: commit,
            abort: abort,
            listParts: listParts,
            status: status,
            logEvent: logEvent,
        };
    }
    function deserializeUploadSession(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeUploadSessionTypeField(val.type);
        const sessionExpiresAt = val.session_expires_at == void 0 ? void 0 : val.session_expires_at;
        const partSize = val.part_size == void 0 ? void 0 : val.part_size;
        const totalParts = val.total_parts == void 0 ? void 0 : val.total_parts;
        const numPartsProcessed = val.num_parts_processed == void 0 ? void 0 : val.num_parts_processed;
        const sessionEndpoints = val.session_endpoints == void 0
            ? void 0
            : deserializeUploadSessionSessionEndpointsField(val.session_endpoints);
        return {
            id: id,
            type: type,
            sessionExpiresAt: sessionExpiresAt,
            partSize: partSize,
            totalParts: totalParts,
            numPartsProcessed: numPartsProcessed,
            sessionEndpoints: sessionEndpoints,
        };
    }
    function deserializeUploadUrl(val) {
        const uploadUrl = val.upload_url == void 0 ? void 0 : val.upload_url;
        const uploadToken = val.upload_token == void 0 ? void 0 : val.upload_token;
        return { uploadUrl: uploadUrl, uploadToken: uploadToken };
    }
    function deserializeUserAvatarPicUrlsField(val) {
        const small = val.small == void 0 ? void 0 : val.small;
        const large = val.large == void 0 ? void 0 : val.large;
        const preview = val.preview == void 0 ? void 0 : val.preview;
        return {
            small: small,
            large: large,
            preview: preview,
        };
    }
    function deserializeUserAvatar(val) {
        const picUrls = val.pic_urls == void 0
            ? void 0
            : deserializeUserAvatarPicUrlsField(val.pic_urls);
        return { picUrls: picUrls };
    }
    function serializeUserBaseTypeField(val) {
        return val;
    }
    function deserializeUserBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "UserBaseTypeField"',
            });
        }
        if (val == 'user') {
            return 'user';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeUserBase(val) {
        return { ['id']: val.id, ['type']: serializeUserBaseTypeField(val.type) };
    }
    function deserializeUserBase(val) {
        const id = val.id;
        const type = deserializeUserBaseTypeField(val.type);
        return { id: id, type: type };
    }
    function deserializeUserIntegrationMappings(val) {
        const name = val.name == void 0 ? void 0 : val.name;
        const login = val.login == void 0 ? void 0 : val.login;
        const id = val.id;
        const type = deserializeUserBaseTypeField(val.type);
        return {
            name: name,
            login: login,
            id: id,
            type: type,
        };
    }
    function deserializeUserCollaborations(val) {
        const name = val.name == void 0 ? void 0 : val.name;
        const login = val.login == void 0 ? void 0 : val.login;
        const id = val.id;
        const type = deserializeUserBaseTypeField(val.type);
        return {
            name: name,
            login: login,
            id: id,
            type: type,
        };
    }
    function deserializeGroupMiniOrUserCollaborations(val) {
        if (!sdIsMap(val)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "GroupMiniOrUserCollaborations"',
            });
        }
        if (val.type == 'group') {
            return deserializeGroupMini(val);
        }
        if (val.type == 'user') {
            return deserializeUserCollaborations(val);
        }
        throw new BoxSdkError({ message: 'unknown type' });
    }
    function serializeUserMini(val) {
        const base = serializeUserBase(val);
        if (!sdIsMap(base)) {
            throw new BoxSdkError({ message: 'Expecting a map for "UserMini"' });
        }
        return Object.assign(Object.assign({}, base), {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['login']: val.login == void 0 ? void 0 : val.login,
        });
    }
    function deserializeUserMini(val) {
        const name = val.name == void 0 ? void 0 : val.name;
        const login = val.login == void 0 ? void 0 : val.login;
        const id = val.id;
        const type = deserializeUserBaseTypeField(val.type);
        return { name: name, login: login, id: id, type: type };
    }
    function deserializeEventSourceItemTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "EventSourceItemTypeField"',
            });
        }
        if (val == 'file') {
            return 'file';
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeEventSourceClassificationField(val) {
        const name = val.name == void 0 ? void 0 : val.name;
        return { name: name };
    }
    function deserializeEventSource(val) {
        const itemType = deserializeEventSourceItemTypeField(val.item_type);
        const itemId = val.item_id;
        const itemName = val.item_name;
        const classification = val.classification == void 0
            ? void 0
            : deserializeEventSourceClassificationField(val.classification);
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        return {
            itemType: itemType,
            itemId: itemId,
            itemName: itemName,
            classification: classification,
            parent: parent,
            ownedBy: ownedBy,
        };
    }
    function deserializeUserStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "UserStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'inactive') {
            return 'inactive';
        }
        if (val == 'cannot_delete_edit') {
            return 'cannot_delete_edit';
        }
        if (val == 'cannot_delete_edit_upload') {
            return 'cannot_delete_edit_upload';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeUserNotificationEmailField(val) {
        const email = val.email == void 0 ? void 0 : val.email;
        const isConfirmed = val.is_confirmed == void 0 ? void 0 : val.is_confirmed;
        return {
            email: email,
            isConfirmed: isConfirmed,
        };
    }
    function deserializeUser(val) {
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const language = val.language == void 0 ? void 0 : val.language;
        const timezone = val.timezone == void 0 ? void 0 : val.timezone;
        const spaceAmount = val.space_amount == void 0 ? void 0 : val.space_amount;
        const spaceUsed = val.space_used == void 0 ? void 0 : val.space_used;
        const maxUploadSize = val.max_upload_size == void 0 ? void 0 : val.max_upload_size;
        const status = val.status == void 0 ? void 0 : deserializeUserStatusField(val.status);
        const jobTitle = val.job_title == void 0 ? void 0 : val.job_title;
        const phone = val.phone == void 0 ? void 0 : val.phone;
        const address = val.address == void 0 ? void 0 : val.address;
        const avatarUrl = val.avatar_url == void 0 ? void 0 : val.avatar_url;
        const notificationEmail = val.notification_email == void 0
            ? void 0
            : deserializeUserNotificationEmailField(val.notification_email);
        const name = val.name == void 0 ? void 0 : val.name;
        const login = val.login == void 0 ? void 0 : val.login;
        const id = val.id;
        const type = deserializeUserBaseTypeField(val.type);
        return {
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            language: language,
            timezone: timezone,
            spaceAmount: spaceAmount,
            spaceUsed: spaceUsed,
            maxUploadSize: maxUploadSize,
            status: status,
            jobTitle: jobTitle,
            phone: phone,
            address: address,
            avatarUrl: avatarUrl,
            notificationEmail: notificationEmail,
            name: name,
            login: login,
            id: id,
            type: type,
        };
    }
    function deserializeTrashWebLinkRestoredTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashWebLinkRestoredTypeField"',
            });
        }
        if (val == 'web_link') {
            return 'web_link';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashWebLinkRestoredPathCollectionField(val) {
        const totalCount = val.total_count;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeFolderMini(itm);
            })
            : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeTrashWebLinkRestoredItemStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashWebLinkRestoredItemStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'trashed') {
            return 'trashed';
        }
        if (val == 'deleted') {
            return 'deleted';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashWebLinkRestored(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeTrashWebLinkRestoredTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        const sequenceId = val.sequence_id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const name = val.name == void 0 ? void 0 : val.name;
        const url = val.url == void 0 ? void 0 : val.url;
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const description = val.description == void 0 ? void 0 : val.description;
        const pathCollection = deserializeTrashWebLinkRestoredPathCollectionField(val.path_collection);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0 ? void 0 : val.shared_link;
        const itemStatus = val.item_status == void 0
            ? void 0
            : deserializeTrashWebLinkRestoredItemStatusField(val.item_status);
        return {
            type: type,
            id: id,
            sequenceId: sequenceId,
            etag: etag,
            name: name,
            url: url,
            parent: parent,
            description: description,
            pathCollection: pathCollection,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            itemStatus: itemStatus,
        };
    }
    function deserializeTrashFolderRestoredTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFolderRestoredTypeField"',
            });
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFolderRestoredPathCollectionField(val) {
        const totalCount = val.total_count;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeFolderMini(itm);
            })
            : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeTrashFolderRestoredItemStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFolderRestoredItemStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'trashed') {
            return 'trashed';
        }
        if (val == 'deleted') {
            return 'deleted';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFolderRestored(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = val.type == void 0
            ? void 0
            : deserializeTrashFolderRestoredTypeField(val.type);
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const description = val.description == void 0 ? void 0 : val.description;
        const size = val.size == void 0 ? void 0 : val.size;
        const pathCollection = val.path_collection == void 0
            ? void 0
            : deserializeTrashFolderRestoredPathCollectionField(val.path_collection);
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const contentCreatedAt = val.content_created_at == void 0 ? void 0 : val.content_created_at;
        const contentModifiedAt = val.content_modified_at == void 0 ? void 0 : val.content_modified_at;
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0 ? void 0 : val.shared_link;
        const folderUploadEmail = val.folder_upload_email == void 0 ? void 0 : val.folder_upload_email;
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const itemStatus = val.item_status == void 0
            ? void 0
            : deserializeTrashFolderRestoredItemStatusField(val.item_status);
        return {
            id: id,
            etag: etag,
            type: type,
            sequenceId: sequenceId,
            name: name,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            description: description,
            size: size,
            pathCollection: pathCollection,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            contentCreatedAt: contentCreatedAt,
            contentModifiedAt: contentModifiedAt,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            folderUploadEmail: folderUploadEmail,
            parent: parent,
            itemStatus: itemStatus,
        };
    }
    function deserializeTrashFileRestoredTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFileRestoredTypeField"',
            });
        }
        if (val == 'file') {
            return 'file';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFileRestoredPathCollectionField(val) {
        const totalCount = val.total_count;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeFolderMini(itm);
            })
            : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeTrashFileRestoredItemStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFileRestoredItemStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'trashed') {
            return 'trashed';
        }
        if (val == 'deleted') {
            return 'deleted';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFileRestored(val) {
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeTrashFileRestoredTypeField(val.type);
        const sequenceId = val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const sha1 = val.sha1;
        const fileVersion = val.file_version == void 0
            ? void 0
            : deserializeFileVersionMini(val.file_version);
        const description = val.description;
        const size = val.size;
        const pathCollection = deserializeTrashFileRestoredPathCollectionField(val.path_collection);
        const createdAt = val.created_at;
        const modifiedAt = val.modified_at;
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const contentCreatedAt = val.content_created_at == void 0 ? void 0 : val.content_created_at;
        const contentModifiedAt = val.content_modified_at == void 0 ? void 0 : val.content_modified_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = deserializeUserMini(val.modified_by);
        const ownedBy = deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0 ? void 0 : val.shared_link;
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const itemStatus = deserializeTrashFileRestoredItemStatusField(val.item_status);
        return {
            id: id,
            etag: etag,
            type: type,
            sequenceId: sequenceId,
            name: name,
            sha1: sha1,
            fileVersion: fileVersion,
            description: description,
            size: size,
            pathCollection: pathCollection,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            contentCreatedAt: contentCreatedAt,
            contentModifiedAt: contentModifiedAt,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            parent: parent,
            itemStatus: itemStatus,
        };
    }
    function deserializeTrashWebLinkTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashWebLinkTypeField"',
            });
        }
        if (val == 'web_link') {
            return 'web_link';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashWebLinkPathCollectionEntriesTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashWebLinkPathCollectionEntriesTypeField"',
            });
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashWebLinkPathCollectionEntriesField(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeTrashWebLinkPathCollectionEntriesTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const name = val.name == void 0 ? void 0 : val.name;
        return {
            type: type,
            id: id,
            sequenceId: sequenceId,
            etag: etag,
            name: name,
        };
    }
    function deserializeTrashWebLinkPathCollectionField(val) {
        const totalCount = val.total_count;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeTrashWebLinkPathCollectionEntriesField(itm);
            })
            : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeTrashWebLinkItemStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashWebLinkItemStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'trashed') {
            return 'trashed';
        }
        if (val == 'deleted') {
            return 'deleted';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashWebLink(val) {
        const type = val.type == void 0 ? void 0 : deserializeTrashWebLinkTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const name = val.name == void 0 ? void 0 : val.name;
        const url = val.url == void 0 ? void 0 : val.url;
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const description = val.description == void 0 ? void 0 : val.description;
        const pathCollection = val.path_collection == void 0
            ? void 0
            : deserializeTrashWebLinkPathCollectionField(val.path_collection);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0 ? void 0 : val.shared_link;
        const itemStatus = val.item_status == void 0
            ? void 0
            : deserializeTrashWebLinkItemStatusField(val.item_status);
        return {
            type: type,
            id: id,
            sequenceId: sequenceId,
            etag: etag,
            name: name,
            url: url,
            parent: parent,
            description: description,
            pathCollection: pathCollection,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            itemStatus: itemStatus,
        };
    }
    function deserializeTrashFolderTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFolderTypeField"',
            });
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFolderPathCollectionEntriesTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFolderPathCollectionEntriesTypeField"',
            });
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFolderPathCollectionEntriesField(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeTrashFolderPathCollectionEntriesTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const name = val.name == void 0 ? void 0 : val.name;
        return {
            type: type,
            id: id,
            sequenceId: sequenceId,
            etag: etag,
            name: name,
        };
    }
    function deserializeTrashFolderPathCollectionField(val) {
        const totalCount = val.total_count;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeTrashFolderPathCollectionEntriesField(itm);
            })
            : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeTrashFolderItemStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFolderItemStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'trashed') {
            return 'trashed';
        }
        if (val == 'deleted') {
            return 'deleted';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFolder(val) {
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeTrashFolderTypeField(val.type);
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const name = val.name;
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const description = val.description;
        const size = val.size;
        const pathCollection = deserializeTrashFolderPathCollectionField(val.path_collection);
        const createdBy = deserializeUserMini(val.created_by);
        const modifiedBy = deserializeUserMini(val.modified_by);
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const contentCreatedAt = val.content_created_at == void 0 ? void 0 : val.content_created_at;
        const contentModifiedAt = val.content_modified_at == void 0 ? void 0 : val.content_modified_at;
        const ownedBy = deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0 ? void 0 : val.shared_link;
        const folderUploadEmail = val.folder_upload_email == void 0 ? void 0 : val.folder_upload_email;
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const itemStatus = deserializeTrashFolderItemStatusField(val.item_status);
        return {
            id: id,
            etag: etag,
            type: type,
            sequenceId: sequenceId,
            name: name,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            description: description,
            size: size,
            pathCollection: pathCollection,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            contentCreatedAt: contentCreatedAt,
            contentModifiedAt: contentModifiedAt,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            folderUploadEmail: folderUploadEmail,
            parent: parent,
            itemStatus: itemStatus,
        };
    }
    function deserializeTrashFileTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFileTypeField"',
            });
        }
        if (val == 'file') {
            return 'file';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFilePathCollectionEntriesTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFilePathCollectionEntriesTypeField"',
            });
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFilePathCollectionEntriesField(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeTrashFilePathCollectionEntriesTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const name = val.name == void 0 ? void 0 : val.name;
        return {
            type: type,
            id: id,
            sequenceId: sequenceId,
            etag: etag,
            name: name,
        };
    }
    function deserializeTrashFilePathCollectionField(val) {
        const totalCount = val.total_count;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeTrashFilePathCollectionEntriesField(itm);
            })
            : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeTrashFileItemStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrashFileItemStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'trashed') {
            return 'trashed';
        }
        if (val == 'deleted') {
            return 'deleted';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTrashFile(val) {
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeTrashFileTypeField(val.type);
        const sequenceId = val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const sha1 = val.sha1;
        const fileVersion = val.file_version == void 0
            ? void 0
            : deserializeFileVersionMini(val.file_version);
        const description = val.description;
        const size = val.size;
        const pathCollection = deserializeTrashFilePathCollectionField(val.path_collection);
        const createdAt = val.created_at;
        const modifiedAt = val.modified_at;
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const contentCreatedAt = val.content_created_at == void 0 ? void 0 : val.content_created_at;
        const contentModifiedAt = val.content_modified_at == void 0 ? void 0 : val.content_modified_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = deserializeUserMini(val.modified_by);
        const ownedBy = deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0 ? void 0 : val.shared_link;
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const itemStatus = deserializeTrashFileItemStatusField(val.item_status);
        return {
            id: id,
            etag: etag,
            type: type,
            sequenceId: sequenceId,
            name: name,
            sha1: sha1,
            fileVersion: fileVersion,
            description: description,
            size: size,
            pathCollection: pathCollection,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            contentCreatedAt: contentCreatedAt,
            contentModifiedAt: contentModifiedAt,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            parent: parent,
            itemStatus: itemStatus,
        };
    }
    function deserializeTermsOfServiceUserStatusTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TermsOfServiceUserStatusTypeField"',
            });
        }
        if (val == 'terms_of_service_user_status') {
            return 'terms_of_service_user_status';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTermsOfServiceUserStatus(val) {
        const id = val.id;
        const type = deserializeTermsOfServiceUserStatusTypeField(val.type);
        const tos = val.tos == void 0 ? void 0 : deserializeTermsOfServiceBase(val.tos);
        const user = val.user == void 0 ? void 0 : deserializeUserMini(val.user);
        const isAccepted = val.is_accepted == void 0 ? void 0 : val.is_accepted;
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        return {
            id: id,
            type: type,
            tos: tos,
            user: user,
            isAccepted: isAccepted,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
        };
    }
    function deserializeTermsOfServiceUserStatuses(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeTermsOfServiceUserStatus(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeTaskAssignmentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TaskAssignmentTypeField"',
            });
        }
        if (val == 'task_assignment') {
            return 'task_assignment';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTaskAssignmentResolutionStateField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TaskAssignmentResolutionStateField"',
            });
        }
        if (val == 'completed') {
            return 'completed';
        }
        if (val == 'incomplete') {
            return 'incomplete';
        }
        if (val == 'approved') {
            return 'approved';
        }
        if (val == 'rejected') {
            return 'rejected';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTaskAssignment(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeTaskAssignmentTypeField(val.type);
        const item = val.item == void 0 ? void 0 : deserializeFileMini(val.item);
        const assignedTo = val.assigned_to == void 0 ? void 0 : deserializeUserMini(val.assigned_to);
        const message = val.message == void 0 ? void 0 : val.message;
        const completedAt = val.completed_at == void 0 ? void 0 : val.completed_at;
        const assignedAt = val.assigned_at == void 0 ? void 0 : val.assigned_at;
        const remindedAt = val.reminded_at == void 0 ? void 0 : val.reminded_at;
        const resolutionState = val.resolution_state == void 0
            ? void 0
            : deserializeTaskAssignmentResolutionStateField(val.resolution_state);
        const assignedBy = val.assigned_by == void 0 ? void 0 : deserializeUserMini(val.assigned_by);
        return {
            id: id,
            type: type,
            item: item,
            assignedTo: assignedTo,
            message: message,
            completedAt: completedAt,
            assignedAt: assignedAt,
            remindedAt: remindedAt,
            resolutionState: resolutionState,
            assignedBy: assignedBy,
        };
    }
    function deserializeTaskAssignments(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeTaskAssignment(itm);
                })
                : [];
        return { totalCount: totalCount, entries: entries };
    }
    function deserializeTaskTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TaskTypeField"',
            });
        }
        if (val == 'task') {
            return 'task';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTaskActionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TaskActionField"',
            });
        }
        if (val == 'review') {
            return 'review';
        }
        if (val == 'complete') {
            return 'complete';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTaskCompletionRuleField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TaskCompletionRuleField"',
            });
        }
        if (val == 'all_assignees') {
            return 'all_assignees';
        }
        if (val == 'any_assignee') {
            return 'any_assignee';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTask(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeTaskTypeField(val.type);
        const item = val.item == void 0 ? void 0 : deserializeFileMini(val.item);
        const dueAt = val.due_at == void 0 ? void 0 : val.due_at;
        const action = val.action == void 0 ? void 0 : deserializeTaskActionField(val.action);
        const message = val.message == void 0 ? void 0 : val.message;
        const taskAssignmentCollection = val.task_assignment_collection == void 0
            ? void 0
            : deserializeTaskAssignments(val.task_assignment_collection);
        const isCompleted = val.is_completed == void 0 ? void 0 : val.is_completed;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const completionRule = val.completion_rule == void 0
            ? void 0
            : deserializeTaskCompletionRuleField(val.completion_rule);
        return {
            id: id,
            type: type,
            item: item,
            dueAt: dueAt,
            action: action,
            message: message,
            taskAssignmentCollection: taskAssignmentCollection,
            isCompleted: isCompleted,
            createdBy: createdBy,
            createdAt: createdAt,
            completionRule: completionRule,
        };
    }
    function deserializeTasks(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeTask(itm);
                })
                : [];
        return { totalCount: totalCount, entries: entries };
    }
    function deserializeRetentionPolicyAssignmentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "RetentionPolicyAssignmentTypeField"',
            });
        }
        if (val == 'retention_policy_assignment') {
            return 'retention_policy_assignment';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeRetentionPolicyAssignmentAssignedToTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "RetentionPolicyAssignmentAssignedToTypeField"',
            });
        }
        if (val == 'folder') {
            return 'folder';
        }
        if (val == 'enterprise') {
            return 'enterprise';
        }
        if (val == 'metadata_template') {
            return 'metadata_template';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeRetentionPolicyAssignmentAssignedToField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeRetentionPolicyAssignmentAssignedToTypeField(val.type);
        return {
            id: id,
            type: type,
        };
    }
    function deserializeRetentionPolicyAssignmentFilterFieldsField(val) {
        const field = val.field == void 0 ? void 0 : val.field;
        const value = val.value == void 0 ? void 0 : val.value;
        return {
            field: field,
            value: value,
        };
    }
    function deserializeRetentionPolicyAssignment(val) {
        const id = val.id;
        const type = deserializeRetentionPolicyAssignmentTypeField(val.type);
        const retentionPolicy = val.retention_policy == void 0
            ? void 0
            : deserializeRetentionPolicyMini(val.retention_policy);
        const assignedTo = val.assigned_to == void 0
            ? void 0
            : deserializeRetentionPolicyAssignmentAssignedToField(val.assigned_to);
        const filterFields = val.filter_fields == void 0
            ? void 0
            : sdIsList(val.filter_fields)
                ? val.filter_fields.map(function (itm) {
                    return deserializeRetentionPolicyAssignmentFilterFieldsField(itm);
                })
                : [];
        const assignedBy = val.assigned_by == void 0 ? void 0 : deserializeUserMini(val.assigned_by);
        const assignedAt = val.assigned_at == void 0 ? void 0 : val.assigned_at;
        const startDateField = val.start_date_field == void 0 ? void 0 : val.start_date_field;
        return {
            id: id,
            type: type,
            retentionPolicy: retentionPolicy,
            assignedTo: assignedTo,
            filterFields: filterFields,
            assignedBy: assignedBy,
            assignedAt: assignedAt,
            startDateField: startDateField,
        };
    }
    function deserializeRetentionPolicyAssignments(val) {
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeRetentionPolicyAssignment(itm);
                })
                : [];
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        return {
            entries: entries,
            limit: limit,
            nextMarker: nextMarker,
        };
    }
    function deserializeRetentionPolicyPolicyTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "RetentionPolicyPolicyTypeField"',
            });
        }
        if (val == 'finite') {
            return 'finite';
        }
        if (val == 'indefinite') {
            return 'indefinite';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeRetentionPolicyRetentionTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "RetentionPolicyRetentionTypeField"',
            });
        }
        if (val == 'modifiable') {
            return 'modifiable';
        }
        if (val == 'non_modifiable') {
            return 'non_modifiable';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeRetentionPolicyStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "RetentionPolicyStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'retired') {
            return 'retired';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeRetentionPolicyAssignmentCountsField(val) {
        const enterprise = val.enterprise == void 0 ? void 0 : val.enterprise;
        const folder = val.folder == void 0 ? void 0 : val.folder;
        const metadataTemplate = val.metadata_template == void 0 ? void 0 : val.metadata_template;
        return {
            enterprise: enterprise,
            folder: folder,
            metadataTemplate: metadataTemplate,
        };
    }
    function deserializeRetentionPolicy(val) {
        const description = val.description == void 0 ? void 0 : val.description;
        const policyType = val.policy_type == void 0
            ? void 0
            : deserializeRetentionPolicyPolicyTypeField(val.policy_type);
        const retentionType = val.retention_type == void 0
            ? void 0
            : deserializeRetentionPolicyRetentionTypeField(val.retention_type);
        const status = val.status == void 0
            ? void 0
            : deserializeRetentionPolicyStatusField(val.status);
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const canOwnerExtendRetention = val.can_owner_extend_retention == void 0
            ? void 0
            : val.can_owner_extend_retention;
        const areOwnersNotified = val.are_owners_notified == void 0 ? void 0 : val.are_owners_notified;
        const customNotificationRecipients = val.custom_notification_recipients == void 0
            ? void 0
            : sdIsList(val.custom_notification_recipients)
                ? val.custom_notification_recipients.map(function (itm) {
                    return deserializeUserMini(itm);
                })
                : [];
        const assignmentCounts = val.assignment_counts == void 0
            ? void 0
            : deserializeRetentionPolicyAssignmentCountsField(val.assignment_counts);
        const policyName = val.policy_name == void 0 ? void 0 : val.policy_name;
        const retentionLength = val.retention_length == void 0 ? void 0 : val.retention_length;
        const dispositionAction = val.disposition_action == void 0
            ? void 0
            : deserializeRetentionPolicyMiniDispositionActionField(val.disposition_action);
        const id = val.id;
        const type = deserializeRetentionPolicyBaseTypeField(val.type);
        return {
            description: description,
            policyType: policyType,
            retentionType: retentionType,
            status: status,
            createdBy: createdBy,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            canOwnerExtendRetention: canOwnerExtendRetention,
            areOwnersNotified: areOwnersNotified,
            customNotificationRecipients: customNotificationRecipients,
            assignmentCounts: assignmentCounts,
            policyName: policyName,
            retentionLength: retentionLength,
            dispositionAction: dispositionAction,
            id: id,
            type: type,
        };
    }
    function deserializeRetentionPolicies(val) {
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeRetentionPolicy(itm);
                })
                : [];
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        return {
            entries: entries,
            limit: limit,
            nextMarker: nextMarker,
        };
    }
    function deserializeLegalHoldPolicyStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "LegalHoldPolicyStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'applying') {
            return 'applying';
        }
        if (val == 'releasing') {
            return 'releasing';
        }
        if (val == 'released') {
            return 'released';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeLegalHoldPolicyAssignmentCountsField(val) {
        const user = val.user == void 0 ? void 0 : val.user;
        const folder = val.folder == void 0 ? void 0 : val.folder;
        const file = val.file == void 0 ? void 0 : val.file;
        const fileVersion = val.file_version == void 0 ? void 0 : val.file_version;
        return {
            user: user,
            folder: folder,
            file: file,
            fileVersion: fileVersion,
        };
    }
    function deserializeLegalHoldPolicy(val) {
        const policyName = val.policy_name == void 0 ? void 0 : val.policy_name;
        const description = val.description == void 0 ? void 0 : val.description;
        const status = val.status == void 0
            ? void 0
            : deserializeLegalHoldPolicyStatusField(val.status);
        const assignmentCounts = val.assignment_counts == void 0
            ? void 0
            : deserializeLegalHoldPolicyAssignmentCountsField(val.assignment_counts);
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const deletedAt = val.deleted_at == void 0 ? void 0 : val.deleted_at;
        const filterStartedAt = val.filter_started_at == void 0 ? void 0 : val.filter_started_at;
        const filterEndedAt = val.filter_ended_at == void 0 ? void 0 : val.filter_ended_at;
        const releaseNotes = val.release_notes == void 0 ? void 0 : val.release_notes;
        const id = val.id;
        const type = deserializeLegalHoldPolicyMiniTypeField(val.type);
        return {
            policyName: policyName,
            description: description,
            status: status,
            assignmentCounts: assignmentCounts,
            createdBy: createdBy,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            deletedAt: deletedAt,
            filterStartedAt: filterStartedAt,
            filterEndedAt: filterEndedAt,
            releaseNotes: releaseNotes,
            id: id,
            type: type,
        };
    }
    function deserializeLegalHoldPolicies(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeLegalHoldPolicy(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeInviteTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "InviteTypeField"',
            });
        }
        if (val == 'invite') {
            return 'invite';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeInviteInvitedToTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "InviteInvitedToTypeField"',
            });
        }
        if (val == 'enterprise') {
            return 'enterprise';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeInviteInvitedToField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeInviteInvitedToTypeField(val.type);
        const name = val.name == void 0 ? void 0 : val.name;
        return { id: id, type: type, name: name };
    }
    function deserializeInvite(val) {
        const id = val.id;
        const type = deserializeInviteTypeField(val.type);
        const invitedTo = val.invited_to == void 0
            ? void 0
            : deserializeInviteInvitedToField(val.invited_to);
        const actionableBy = val.actionable_by == void 0
            ? void 0
            : deserializeUserMini(val.actionable_by);
        const invitedBy = val.invited_by == void 0 ? void 0 : deserializeUserMini(val.invited_by);
        const status = val.status == void 0 ? void 0 : val.status;
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        return {
            id: id,
            type: type,
            invitedTo: invitedTo,
            actionableBy: actionableBy,
            invitedBy: invitedBy,
            status: status,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
        };
    }
    function deserializeGroupMembershipTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "GroupMembershipTypeField"',
            });
        }
        if (val == 'group_membership') {
            return 'group_membership';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeGroupMembershipRoleField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "GroupMembershipRoleField"',
            });
        }
        if (val == 'member') {
            return 'member';
        }
        if (val == 'admin') {
            return 'admin';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeGroupMembership(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeGroupMembershipTypeField(val.type);
        const user = val.user == void 0 ? void 0 : deserializeUserMini(val.user);
        const group = val.group == void 0 ? void 0 : deserializeGroupMini(val.group);
        const role = val.role == void 0 ? void 0 : deserializeGroupMembershipRoleField(val.role);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        return {
            id: id,
            type: type,
            user: user,
            group: group,
            role: role,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
        };
    }
    function deserializeGroupMembershipsOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "GroupMembershipsOrderDirectionField"',
            });
        }
        if (val == 'ASC') {
            return 'ASC';
        }
        if (val == 'DESC') {
            return 'DESC';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeGroupMembershipsOrderField(val) {
        const by = val.by == void 0 ? void 0 : val.by;
        const direction = val.direction == void 0
            ? void 0
            : deserializeGroupMembershipsOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeGroupMemberships(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeGroupMembershipsOrderField(itm);
                })
                : [];
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeGroupMembership(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            order: order,
            entries: entries,
        };
    }
    function deserializeFileVersionFull(val) {
        const versionNumber = val.version_number == void 0 ? void 0 : val.version_number;
        const name = val.name == void 0 ? void 0 : val.name;
        const size = val.size == void 0 ? void 0 : val.size;
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const modifiedBy = val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const trashedBy = val.trashed_by == void 0 ? void 0 : deserializeUserMini(val.trashed_by);
        const restoredAt = val.restored_at == void 0 ? void 0 : val.restored_at;
        const restoredBy = val.restored_by == void 0 ? void 0 : deserializeUserMini(val.restored_by);
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const uploaderDisplayName = val.uploader_display_name == void 0 ? void 0 : val.uploader_display_name;
        const sha1 = val.sha1 == void 0 ? void 0 : val.sha1;
        const id = val.id;
        const type = deserializeFileVersionBaseTypeField(val.type);
        return {
            versionNumber: versionNumber,
            name: name,
            size: size,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            modifiedBy: modifiedBy,
            trashedAt: trashedAt,
            trashedBy: trashedBy,
            restoredAt: restoredAt,
            restoredBy: restoredBy,
            purgedAt: purgedAt,
            uploaderDisplayName: uploaderDisplayName,
            sha1: sha1,
            id: id,
            type: type,
        };
    }
    function deserializeFileVersionsOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileVersionsOrderDirectionField"',
            });
        }
        if (val == 'ASC') {
            return 'ASC';
        }
        if (val == 'DESC') {
            return 'DESC';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileVersionsOrderField(val) {
        const by = val.by == void 0 ? void 0 : val.by;
        const direction = val.direction == void 0
            ? void 0
            : deserializeFileVersionsOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeFileVersions(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeFileVersionsOrderField(itm);
                })
                : [];
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFileVersionFull(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            order: order,
            entries: entries,
        };
    }
    function deserializeFileRequestTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileRequestTypeField"',
            });
        }
        if (val == 'file_request') {
            return 'file_request';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileRequestStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileRequestStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'inactive') {
            return 'inactive';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileRequest(val) {
        const id = val.id;
        const type = deserializeFileRequestTypeField(val.type);
        const title = val.title == void 0 ? void 0 : val.title;
        const description = val.description == void 0 ? void 0 : val.description;
        const status = val.status == void 0
            ? void 0
            : deserializeFileRequestStatusField(val.status);
        const isEmailRequired = val.is_email_required == void 0 ? void 0 : val.is_email_required;
        const isDescriptionRequired = val.is_description_required == void 0
            ? void 0
            : val.is_description_required;
        const expiresAt = val.expires_at == void 0 ? void 0 : val.expires_at;
        const folder = deserializeFolderMini(val.folder);
        const url = val.url == void 0 ? void 0 : val.url;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const createdAt = val.created_at;
        const updatedBy = val.updated_by == void 0 ? void 0 : deserializeUserMini(val.updated_by);
        const updatedAt = val.updated_at;
        return {
            id: id,
            type: type,
            title: title,
            description: description,
            status: status,
            isEmailRequired: isEmailRequired,
            isDescriptionRequired: isDescriptionRequired,
            expiresAt: expiresAt,
            folder: folder,
            url: url,
            etag: etag,
            createdBy: createdBy,
            createdAt: createdAt,
            updatedBy: updatedBy,
            updatedAt: updatedAt,
        };
    }
    function deserializeFilePathCollectionField(val) {
        const totalCount = val.total_count;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeFolderMini(itm);
            })
            : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeFileSharedLinkAccessField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileSharedLinkAccessField"',
            });
        }
        if (val == 'open') {
            return 'open';
        }
        if (val == 'company') {
            return 'company';
        }
        if (val == 'collaborators') {
            return 'collaborators';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileSharedLinkEffectiveAccessField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileSharedLinkEffectiveAccessField"',
            });
        }
        if (val == 'open') {
            return 'open';
        }
        if (val == 'company') {
            return 'company';
        }
        if (val == 'collaborators') {
            return 'collaborators';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileSharedLinkEffectivePermissionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileSharedLinkEffectivePermissionField"',
            });
        }
        if (val == 'can_edit') {
            return 'can_edit';
        }
        if (val == 'can_download') {
            return 'can_download';
        }
        if (val == 'can_preview') {
            return 'can_preview';
        }
        if (val == 'no_access') {
            return 'no_access';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileSharedLinkPermissionsField(val) {
        const canDownload = val.can_download;
        const canPreview = val.can_preview;
        const canEdit = val.can_edit;
        return {
            canDownload: canDownload,
            canPreview: canPreview,
            canEdit: canEdit,
        };
    }
    function deserializeFileSharedLinkField(val) {
        const url = val.url;
        const downloadUrl = val.download_url == void 0 ? void 0 : val.download_url;
        const vanityUrl = val.vanity_url == void 0 ? void 0 : val.vanity_url;
        const vanityName = val.vanity_name == void 0 ? void 0 : val.vanity_name;
        const access = val.access == void 0
            ? void 0
            : deserializeFileSharedLinkAccessField(val.access);
        const effectiveAccess = deserializeFileSharedLinkEffectiveAccessField(val.effective_access);
        const effectivePermission = deserializeFileSharedLinkEffectivePermissionField(val.effective_permission);
        const unsharedAt = val.unshared_at == void 0 ? void 0 : val.unshared_at;
        const isPasswordEnabled = val.is_password_enabled;
        const permissions = val.permissions == void 0
            ? void 0
            : deserializeFileSharedLinkPermissionsField(val.permissions);
        const downloadCount = val.download_count;
        const previewCount = val.preview_count;
        return {
            url: url,
            downloadUrl: downloadUrl,
            vanityUrl: vanityUrl,
            vanityName: vanityName,
            access: access,
            effectiveAccess: effectiveAccess,
            effectivePermission: effectivePermission,
            unsharedAt: unsharedAt,
            isPasswordEnabled: isPasswordEnabled,
            permissions: permissions,
            downloadCount: downloadCount,
            previewCount: previewCount,
        };
    }
    function deserializeFileItemStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileItemStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'trashed') {
            return 'trashed';
        }
        if (val == 'deleted') {
            return 'deleted';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFile(val) {
        const description = val.description == void 0 ? void 0 : val.description;
        const size = val.size == void 0 ? void 0 : val.size;
        const pathCollection = val.path_collection == void 0
            ? void 0
            : deserializeFilePathCollectionField(val.path_collection);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const contentCreatedAt = val.content_created_at == void 0 ? void 0 : val.content_created_at;
        const contentModifiedAt = val.content_modified_at == void 0 ? void 0 : val.content_modified_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0
            ? void 0
            : deserializeFileSharedLinkField(val.shared_link);
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const itemStatus = val.item_status == void 0
            ? void 0
            : deserializeFileItemStatusField(val.item_status);
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const sha1 = val.sha1 == void 0 ? void 0 : val.sha1;
        const fileVersion = val.file_version == void 0
            ? void 0
            : deserializeFileVersionMini(val.file_version);
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeFileBaseTypeField(val.type);
        return {
            description: description,
            size: size,
            pathCollection: pathCollection,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            contentCreatedAt: contentCreatedAt,
            contentModifiedAt: contentModifiedAt,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            parent: parent,
            itemStatus: itemStatus,
            sequenceId: sequenceId,
            name: name,
            sha1: sha1,
            fileVersion: fileVersion,
            id: id,
            etag: etag,
            type: type,
        };
    }
    function deserializeFileFullPermissionsField(val) {
        const canDelete = val.can_delete;
        const canDownload = val.can_download;
        const canInviteCollaborator = val.can_invite_collaborator;
        const canRename = val.can_rename;
        const canSetShareAccess = val.can_set_share_access;
        const canShare = val.can_share;
        const canAnnotate = val.can_annotate == void 0 ? void 0 : val.can_annotate;
        const canComment = val.can_comment == void 0 ? void 0 : val.can_comment;
        const canPreview = val.can_preview == void 0 ? void 0 : val.can_preview;
        const canUpload = val.can_upload == void 0 ? void 0 : val.can_upload;
        const canViewAnnotationsAll = val.can_view_annotations_all == void 0
            ? void 0
            : val.can_view_annotations_all;
        const canViewAnnotationsSelf = val.can_view_annotations_self == void 0
            ? void 0
            : val.can_view_annotations_self;
        return {
            canDelete: canDelete,
            canDownload: canDownload,
            canInviteCollaborator: canInviteCollaborator,
            canRename: canRename,
            canSetShareAccess: canSetShareAccess,
            canShare: canShare,
            canAnnotate: canAnnotate,
            canComment: canComment,
            canPreview: canPreview,
            canUpload: canUpload,
            canViewAnnotationsAll: canViewAnnotationsAll,
            canViewAnnotationsSelf: canViewAnnotationsSelf,
        };
    }
    function deserializeFileFullLockTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileFullLockTypeField"',
            });
        }
        if (val == 'lock') {
            return 'lock';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileFullLockAppTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileFullLockAppTypeField"',
            });
        }
        if (val == 'gsuite') {
            return 'gsuite';
        }
        if (val == 'office_wopi') {
            return 'office_wopi';
        }
        if (val == 'office_wopiplus') {
            return 'office_wopiplus';
        }
        if (val == 'other') {
            return 'other';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileFullLockField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeFileFullLockTypeField(val.type);
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const expiredAt = val.expired_at == void 0 ? void 0 : val.expired_at;
        const isDownloadPrevented = val.is_download_prevented == void 0 ? void 0 : val.is_download_prevented;
        const appType = val.app_type == void 0
            ? void 0
            : deserializeFileFullLockAppTypeField(val.app_type);
        return {
            id: id,
            type: type,
            createdBy: createdBy,
            createdAt: createdAt,
            expiredAt: expiredAt,
            isDownloadPrevented: isDownloadPrevented,
            appType: appType,
        };
    }
    function deserializeFileFullExpiringEmbedLinkTokenTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileFullExpiringEmbedLinkTokenTypeField"',
            });
        }
        if (val == 'bearer') {
            return 'bearer';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileFullExpiringEmbedLinkField(val) {
        const accessToken = val.access_token == void 0 ? void 0 : val.access_token;
        const expiresIn = val.expires_in == void 0 ? void 0 : val.expires_in;
        const tokenType = val.token_type == void 0
            ? void 0
            : deserializeFileFullExpiringEmbedLinkTokenTypeField(val.token_type);
        const restrictedTo = val.restricted_to == void 0
            ? void 0
            : sdIsList(val.restricted_to)
                ? val.restricted_to.map(function (itm) {
                    return deserializeFileOrFolderScope(itm);
                })
                : [];
        const url = val.url == void 0 ? void 0 : val.url;
        return {
            accessToken: accessToken,
            expiresIn: expiresIn,
            tokenType: tokenType,
            restrictedTo: restrictedTo,
            url: url,
        };
    }
    function deserializeFileFullWatermarkInfoField(val) {
        const isWatermarked = val.is_watermarked == void 0 ? void 0 : val.is_watermarked;
        return { isWatermarked: isWatermarked };
    }
    function deserializeFileFullAllowedInviteeRolesField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileFullAllowedInviteeRolesField"',
            });
        }
        if (val == 'editor') {
            return 'editor';
        }
        if (val == 'viewer') {
            return 'viewer';
        }
        if (val == 'previewer') {
            return 'previewer';
        }
        if (val == 'uploader') {
            return 'uploader';
        }
        if (val == 'previewer uploader') {
            return 'previewer uploader';
        }
        if (val == 'viewer uploader') {
            return 'viewer uploader';
        }
        if (val == 'co-owner') {
            return 'co-owner';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileFullMetadataField(val) {
        const extraData = val == void 0 ? void 0 : val;
        return { extraData: extraData };
    }
    function deserializeFileFullRepresentationsEntriesContentField(val) {
        const urlTemplate = val.url_template == void 0 ? void 0 : val.url_template;
        return {
            urlTemplate: urlTemplate,
        };
    }
    function deserializeFileFullRepresentationsEntriesInfoField(val) {
        const url = val.url == void 0 ? void 0 : val.url;
        return { url: url };
    }
    function deserializeFileFullRepresentationsEntriesPropertiesField(val) {
        const dimensions = val.dimensions == void 0 ? void 0 : val.dimensions;
        const paged = val.paged == void 0 ? void 0 : val.paged;
        const thumb = val.thumb == void 0 ? void 0 : val.thumb;
        return {
            dimensions: dimensions,
            paged: paged,
            thumb: thumb,
        };
    }
    function deserializeFileFullRepresentationsEntriesStatusStateField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileFullRepresentationsEntriesStatusStateField"',
            });
        }
        if (val == 'success') {
            return 'success';
        }
        if (val == 'viewable') {
            return 'viewable';
        }
        if (val == 'pending') {
            return 'pending';
        }
        if (val == 'none') {
            return 'none';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileFullRepresentationsEntriesStatusField(val) {
        const state = val.state == void 0
            ? void 0
            : deserializeFileFullRepresentationsEntriesStatusStateField(val.state);
        return { state: state };
    }
    function deserializeFileFullRepresentationsEntriesField(val) {
        const content = val.content == void 0
            ? void 0
            : deserializeFileFullRepresentationsEntriesContentField(val.content);
        const info = val.info == void 0
            ? void 0
            : deserializeFileFullRepresentationsEntriesInfoField(val.info);
        const properties = val.properties == void 0
            ? void 0
            : deserializeFileFullRepresentationsEntriesPropertiesField(val.properties);
        const representation = val.representation == void 0 ? void 0 : val.representation;
        const status = val.status == void 0
            ? void 0
            : deserializeFileFullRepresentationsEntriesStatusField(val.status);
        return {
            content: content,
            info: info,
            properties: properties,
            representation: representation,
            status: status,
        };
    }
    function deserializeFileFullRepresentationsField(val) {
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFileFullRepresentationsEntriesField(itm);
                })
                : [];
        return { entries: entries };
    }
    function deserializeFileFullClassificationField(val) {
        const name = val.name == void 0 ? void 0 : val.name;
        const definition = val.definition == void 0 ? void 0 : val.definition;
        const color = val.color == void 0 ? void 0 : val.color;
        return {
            name: name,
            definition: definition,
            color: color,
        };
    }
    function deserializeFileFullSharedLinkPermissionOptionsField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileFullSharedLinkPermissionOptionsField"',
            });
        }
        if (val == 'can_preview') {
            return 'can_preview';
        }
        if (val == 'can_download') {
            return 'can_download';
        }
        if (val == 'can_edit') {
            return 'can_edit';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileFull(val) {
        const versionNumber = val.version_number == void 0 ? void 0 : val.version_number;
        const commentCount = val.comment_count == void 0 ? void 0 : val.comment_count;
        const permissions = val.permissions == void 0
            ? void 0
            : deserializeFileFullPermissionsField(val.permissions);
        const tags = val.tags == void 0
            ? void 0
            : sdIsList(val.tags)
                ? val.tags.map(function (itm) {
                    return itm;
                })
                : [];
        const lock = val.lock == void 0 ? void 0 : deserializeFileFullLockField(val.lock);
        const extension = val.extension == void 0 ? void 0 : val.extension;
        const isPackage = val.is_package == void 0 ? void 0 : val.is_package;
        const expiringEmbedLink = val.expiring_embed_link == void 0
            ? void 0
            : deserializeFileFullExpiringEmbedLinkField(val.expiring_embed_link);
        const watermarkInfo = val.watermark_info == void 0
            ? void 0
            : deserializeFileFullWatermarkInfoField(val.watermark_info);
        const isAccessibleViaSharedLink = val.is_accessible_via_shared_link == void 0
            ? void 0
            : val.is_accessible_via_shared_link;
        const allowedInviteeRoles = val.allowed_invitee_roles == void 0
            ? void 0
            : sdIsList(val.allowed_invitee_roles)
                ? val.allowed_invitee_roles.map(function (itm) {
                    return deserializeFileFullAllowedInviteeRolesField(itm);
                })
                : [];
        const isExternallyOwned = val.is_externally_owned == void 0 ? void 0 : val.is_externally_owned;
        const hasCollaborations = val.has_collaborations == void 0 ? void 0 : val.has_collaborations;
        const metadata = val.metadata == void 0
            ? void 0
            : deserializeFileFullMetadataField(val.metadata);
        const expiresAt = val.expires_at == void 0 ? void 0 : val.expires_at;
        const representations = val.representations == void 0
            ? void 0
            : deserializeFileFullRepresentationsField(val.representations);
        const classification = val.classification == void 0
            ? void 0
            : deserializeFileFullClassificationField(val.classification);
        const uploaderDisplayName = val.uploader_display_name == void 0 ? void 0 : val.uploader_display_name;
        const dispositionAt = val.disposition_at == void 0 ? void 0 : val.disposition_at;
        const sharedLinkPermissionOptions = val.shared_link_permission_options == void 0
            ? void 0
            : sdIsList(val.shared_link_permission_options)
                ? val.shared_link_permission_options.map(function (itm) {
                    return deserializeFileFullSharedLinkPermissionOptionsField(itm);
                })
                : [];
        const description = val.description == void 0 ? void 0 : val.description;
        const size = val.size == void 0 ? void 0 : val.size;
        const pathCollection = val.path_collection == void 0
            ? void 0
            : deserializeFilePathCollectionField(val.path_collection);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const contentCreatedAt = val.content_created_at == void 0 ? void 0 : val.content_created_at;
        const contentModifiedAt = val.content_modified_at == void 0 ? void 0 : val.content_modified_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0
            ? void 0
            : deserializeFileSharedLinkField(val.shared_link);
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const itemStatus = val.item_status == void 0
            ? void 0
            : deserializeFileItemStatusField(val.item_status);
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const sha1 = val.sha1 == void 0 ? void 0 : val.sha1;
        const fileVersion = val.file_version == void 0
            ? void 0
            : deserializeFileVersionMini(val.file_version);
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeFileBaseTypeField(val.type);
        return {
            versionNumber: versionNumber,
            commentCount: commentCount,
            permissions: permissions,
            tags: tags,
            lock: lock,
            extension: extension,
            isPackage: isPackage,
            expiringEmbedLink: expiringEmbedLink,
            watermarkInfo: watermarkInfo,
            isAccessibleViaSharedLink: isAccessibleViaSharedLink,
            allowedInviteeRoles: allowedInviteeRoles,
            isExternallyOwned: isExternallyOwned,
            hasCollaborations: hasCollaborations,
            metadata: metadata,
            expiresAt: expiresAt,
            representations: representations,
            classification: classification,
            uploaderDisplayName: uploaderDisplayName,
            dispositionAt: dispositionAt,
            sharedLinkPermissionOptions: sharedLinkPermissionOptions,
            description: description,
            size: size,
            pathCollection: pathCollection,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            contentCreatedAt: contentCreatedAt,
            contentModifiedAt: contentModifiedAt,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            parent: parent,
            itemStatus: itemStatus,
            sequenceId: sequenceId,
            name: name,
            sha1: sha1,
            fileVersion: fileVersion,
            id: id,
            etag: etag,
            type: type,
        };
    }
    function deserializeFiles(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFileFull(itm);
                })
                : [];
        return { totalCount: totalCount, entries: entries };
    }
    function deserializeDevicePinnerTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "DevicePinnerTypeField"',
            });
        }
        if (val == 'device_pinner') {
            return 'device_pinner';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeDevicePinner(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeDevicePinnerTypeField(val.type);
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        const productName = val.product_name == void 0 ? void 0 : val.product_name;
        return {
            id: id,
            type: type,
            ownedBy: ownedBy,
            productName: productName,
        };
    }
    function deserializeDevicePinnersOrderByField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "DevicePinnersOrderByField"',
            });
        }
        if (val == 'id') {
            return 'id';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeDevicePinnersOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "DevicePinnersOrderDirectionField"',
            });
        }
        if (val == 'asc') {
            return 'asc';
        }
        if (val == 'desc') {
            return 'desc';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeDevicePinnersOrderField(val) {
        const by = val.by == void 0 ? void 0 : deserializeDevicePinnersOrderByField(val.by);
        const direction = val.direction == void 0
            ? void 0
            : deserializeDevicePinnersOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeDevicePinners(val) {
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeDevicePinner(itm);
                })
                : [];
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeDevicePinnersOrderField(itm);
                })
                : [];
        return {
            entries: entries,
            limit: limit,
            nextMarker: nextMarker,
            order: order,
        };
    }
    function deserializeCommentItemField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : val.type;
        return { id: id, type: type };
    }
    function deserializeCommentFull(val) {
        const taggedMessage = val.tagged_message == void 0 ? void 0 : val.tagged_message;
        const isReplyComment = val.is_reply_comment == void 0 ? void 0 : val.is_reply_comment;
        const message = val.message == void 0 ? void 0 : val.message;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const item = val.item == void 0 ? void 0 : deserializeCommentItemField(val.item);
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeCommentBaseTypeField(val.type);
        return {
            taggedMessage: taggedMessage,
            isReplyComment: isReplyComment,
            message: message,
            createdBy: createdBy,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            item: item,
            id: id,
            type: type,
        };
    }
    function deserializeCommentsOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CommentsOrderDirectionField"',
            });
        }
        if (val == 'ASC') {
            return 'ASC';
        }
        if (val == 'DESC') {
            return 'DESC';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCommentsOrderField(val) {
        const by = val.by == void 0 ? void 0 : val.by;
        const direction = val.direction == void 0
            ? void 0
            : deserializeCommentsOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeComments(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeCommentsOrderField(itm);
                })
                : [];
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeCommentFull(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            order: order,
            entries: entries,
        };
    }
    function deserializeCollaborationAllowlistExemptTargetTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollaborationAllowlistExemptTargetTypeField"',
            });
        }
        if (val == 'collaboration_whitelist_exempt_target') {
            return 'collaboration_whitelist_exempt_target';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollaborationAllowlistExemptTargetEnterpriseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollaborationAllowlistExemptTargetEnterpriseTypeField"',
            });
        }
        if (val == 'enterprise') {
            return 'enterprise';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollaborationAllowlistExemptTargetEnterpriseField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeCollaborationAllowlistExemptTargetEnterpriseTypeField(val.type);
        const name = val.name == void 0 ? void 0 : val.name;
        return {
            id: id,
            type: type,
            name: name,
        };
    }
    function deserializeCollaborationAllowlistExemptTarget(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeCollaborationAllowlistExemptTargetTypeField(val.type);
        const enterprise = val.enterprise == void 0
            ? void 0
            : deserializeCollaborationAllowlistExemptTargetEnterpriseField(val.enterprise);
        const user = val.user == void 0 ? void 0 : deserializeUserMini(val.user);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        return {
            id: id,
            type: type,
            enterprise: enterprise,
            user: user,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
        };
    }
    function deserializeCollaborationAllowlistExemptTargets(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeCollaborationAllowlistExemptTarget(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeShieldInformationBarrierSegmentRestriction(val) {
        const shieldInformationBarrier = val.shield_information_barrier == void 0
            ? void 0
            : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
        const updatedAt = val.updated_at == void 0 ? void 0 : val.updated_at;
        const updatedBy = val.updated_by == void 0 ? void 0 : deserializeUserBase(val.updated_by);
        const shieldInformationBarrierSegment = deserializeShieldInformationBarrierSegmentRestrictionMiniShieldInformationBarrierSegmentField(val.shield_information_barrier_segment);
        const restrictedSegment = deserializeShieldInformationBarrierSegmentRestrictionMiniRestrictedSegmentField(val.restricted_segment);
        const type = val.type == void 0
            ? void 0
            : deserializeShieldInformationBarrierSegmentRestrictionBaseTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        return {
            shieldInformationBarrier: shieldInformationBarrier,
            createdAt: createdAt,
            createdBy: createdBy,
            updatedAt: updatedAt,
            updatedBy: updatedBy,
            shieldInformationBarrierSegment: shieldInformationBarrierSegment,
            restrictedSegment: restrictedSegment,
            type: type,
            id: id,
        };
    }
    function deserializeShieldInformationBarrierSegmentRestrictions(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeShieldInformationBarrierSegmentRestriction(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            entries: entries,
        };
    }
    function deserializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField"',
            });
        }
        if (val == 'shield_information_barrier_segment') {
            return 'shield_information_barrier_segment';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentTypeField(val.type);
        return {
            id: id,
            type: type,
        };
    }
    function deserializeShieldInformationBarrierSegmentMember(val) {
        const shieldInformationBarrier = val.shield_information_barrier == void 0
            ? void 0
            : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
        const shieldInformationBarrierSegment = val.shield_information_barrier_segment == void 0
            ? void 0
            : deserializeShieldInformationBarrierSegmentMemberShieldInformationBarrierSegmentField(val.shield_information_barrier_segment);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
        const updatedAt = val.updated_at == void 0 ? void 0 : val.updated_at;
        const updatedBy = val.updated_by == void 0 ? void 0 : deserializeUserBase(val.updated_by);
        const user = val.user == void 0 ? void 0 : deserializeUserBase(val.user);
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeShieldInformationBarrierSegmentMemberBaseTypeField(val.type);
        return {
            shieldInformationBarrier: shieldInformationBarrier,
            shieldInformationBarrierSegment: shieldInformationBarrierSegment,
            createdAt: createdAt,
            createdBy: createdBy,
            updatedAt: updatedAt,
            updatedBy: updatedBy,
            user: user,
            id: id,
            type: type,
        };
    }
    function deserializeShieldInformationBarrierSegmentMembers(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeShieldInformationBarrierSegmentMember(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            entries: entries,
        };
    }
    function deserializeShieldInformationBarrierSegmentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierSegmentTypeField"',
            });
        }
        if (val == 'shield_information_barrier_segment') {
            return 'shield_information_barrier_segment';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrierSegment(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeShieldInformationBarrierSegmentTypeField(val.type);
        const shieldInformationBarrier = val.shield_information_barrier == void 0
            ? void 0
            : deserializeShieldInformationBarrierBase(val.shield_information_barrier);
        const name = val.name == void 0 ? void 0 : val.name;
        const description = val.description == void 0 ? void 0 : val.description;
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
        const updatedAt = val.updated_at == void 0 ? void 0 : val.updated_at;
        const updatedBy = val.updated_by == void 0 ? void 0 : deserializeUserBase(val.updated_by);
        return {
            id: id,
            type: type,
            shieldInformationBarrier: shieldInformationBarrier,
            name: name,
            description: description,
            createdAt: createdAt,
            createdBy: createdBy,
            updatedAt: updatedAt,
            updatedBy: updatedBy,
        };
    }
    function deserializeShieldInformationBarrierSegments(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeShieldInformationBarrierSegment(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            entries: entries,
        };
    }
    function deserializeShieldInformationBarrierTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierTypeField"',
            });
        }
        if (val == 'shield_information_barrier') {
            return 'shield_information_barrier';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrierStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierStatusField"',
            });
        }
        if (val == 'draft') {
            return 'draft';
        }
        if (val == 'pending') {
            return 'pending';
        }
        if (val == 'disabled') {
            return 'disabled';
        }
        if (val == 'enabled') {
            return 'enabled';
        }
        if (val == 'invalid') {
            return 'invalid';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrier(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeShieldInformationBarrierTypeField(val.type);
        const enterprise = val.enterprise == void 0
            ? void 0
            : deserializeEnterpriseBase(val.enterprise);
        const status = val.status == void 0
            ? void 0
            : deserializeShieldInformationBarrierStatusField(val.status);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
        const updatedAt = val.updated_at == void 0 ? void 0 : val.updated_at;
        const updatedBy = val.updated_by == void 0 ? void 0 : deserializeUserBase(val.updated_by);
        const enabledAt = val.enabled_at == void 0 ? void 0 : val.enabled_at;
        const enabledBy = val.enabled_by == void 0 ? void 0 : deserializeUserBase(val.enabled_by);
        return {
            id: id,
            type: type,
            enterprise: enterprise,
            status: status,
            createdAt: createdAt,
            createdBy: createdBy,
            updatedAt: updatedAt,
            updatedBy: updatedBy,
            enabledAt: enabledAt,
            enabledBy: enabledBy,
        };
    }
    function deserializeShieldInformationBarriers(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeShieldInformationBarrier(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            entries: entries,
        };
    }
    function deserializeFolderLockLockedOperationsField(val) {
        const move = val.move;
        const _delete = val.delete;
        return {
            move: move,
            delete: _delete,
        };
    }
    function deserializeFolderLock(val) {
        const folder = val.folder == void 0 ? void 0 : deserializeFolderMini(val.folder);
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : val.type;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const lockedOperations = val.locked_operations == void 0
            ? void 0
            : deserializeFolderLockLockedOperationsField(val.locked_operations);
        const lockType = val.lock_type == void 0 ? void 0 : val.lock_type;
        return {
            folder: folder,
            id: id,
            type: type,
            createdBy: createdBy,
            createdAt: createdAt,
            lockedOperations: lockedOperations,
            lockType: lockType,
        };
    }
    function deserializeFolderLocks(val) {
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFolderLock(itm);
                })
                : [];
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        return {
            entries: entries,
            limit: limit,
            nextMarker: nextMarker,
        };
    }
    function deserializeWatermarkWatermarkField(val) {
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        return {
            createdAt: createdAt,
            modifiedAt: modifiedAt,
        };
    }
    function deserializeWatermark(val) {
        const watermark = val.watermark == void 0
            ? void 0
            : deserializeWatermarkWatermarkField(val.watermark);
        return { watermark: watermark };
    }
    function deserializeWebhookMiniTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WebhookMiniTypeField"',
            });
        }
        if (val == 'webhook') {
            return 'webhook';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWebhookMiniTargetTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WebhookMiniTargetTypeField"',
            });
        }
        if (val == 'file') {
            return 'file';
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWebhookMiniTargetField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeWebhookMiniTargetTypeField(val.type);
        return { id: id, type: type };
    }
    function deserializeWebhookMini(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeWebhookMiniTypeField(val.type);
        const target = val.target == void 0
            ? void 0
            : deserializeWebhookMiniTargetField(val.target);
        return { id: id, type: type, target: target };
    }
    function deserializeWebhooks(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeWebhookMini(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeWebhookTriggersField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WebhookTriggersField"',
            });
        }
        if (val == 'FILE.UPLOADED') {
            return 'FILE.UPLOADED';
        }
        if (val == 'FILE.PREVIEWED') {
            return 'FILE.PREVIEWED';
        }
        if (val == 'FILE.DOWNLOADED') {
            return 'FILE.DOWNLOADED';
        }
        if (val == 'FILE.TRASHED') {
            return 'FILE.TRASHED';
        }
        if (val == 'FILE.DELETED') {
            return 'FILE.DELETED';
        }
        if (val == 'FILE.RESTORED') {
            return 'FILE.RESTORED';
        }
        if (val == 'FILE.COPIED') {
            return 'FILE.COPIED';
        }
        if (val == 'FILE.MOVED') {
            return 'FILE.MOVED';
        }
        if (val == 'FILE.LOCKED') {
            return 'FILE.LOCKED';
        }
        if (val == 'FILE.UNLOCKED') {
            return 'FILE.UNLOCKED';
        }
        if (val == 'FILE.RENAMED') {
            return 'FILE.RENAMED';
        }
        if (val == 'COMMENT.CREATED') {
            return 'COMMENT.CREATED';
        }
        if (val == 'COMMENT.UPDATED') {
            return 'COMMENT.UPDATED';
        }
        if (val == 'COMMENT.DELETED') {
            return 'COMMENT.DELETED';
        }
        if (val == 'TASK_ASSIGNMENT.CREATED') {
            return 'TASK_ASSIGNMENT.CREATED';
        }
        if (val == 'TASK_ASSIGNMENT.UPDATED') {
            return 'TASK_ASSIGNMENT.UPDATED';
        }
        if (val == 'METADATA_INSTANCE.CREATED') {
            return 'METADATA_INSTANCE.CREATED';
        }
        if (val == 'METADATA_INSTANCE.UPDATED') {
            return 'METADATA_INSTANCE.UPDATED';
        }
        if (val == 'METADATA_INSTANCE.DELETED') {
            return 'METADATA_INSTANCE.DELETED';
        }
        if (val == 'FOLDER.CREATED') {
            return 'FOLDER.CREATED';
        }
        if (val == 'FOLDER.RENAMED') {
            return 'FOLDER.RENAMED';
        }
        if (val == 'FOLDER.DOWNLOADED') {
            return 'FOLDER.DOWNLOADED';
        }
        if (val == 'FOLDER.RESTORED') {
            return 'FOLDER.RESTORED';
        }
        if (val == 'FOLDER.DELETED') {
            return 'FOLDER.DELETED';
        }
        if (val == 'FOLDER.COPIED') {
            return 'FOLDER.COPIED';
        }
        if (val == 'FOLDER.MOVED') {
            return 'FOLDER.MOVED';
        }
        if (val == 'FOLDER.TRASHED') {
            return 'FOLDER.TRASHED';
        }
        if (val == 'WEBHOOK.DELETED') {
            return 'WEBHOOK.DELETED';
        }
        if (val == 'COLLABORATION.CREATED') {
            return 'COLLABORATION.CREATED';
        }
        if (val == 'COLLABORATION.ACCEPTED') {
            return 'COLLABORATION.ACCEPTED';
        }
        if (val == 'COLLABORATION.REJECTED') {
            return 'COLLABORATION.REJECTED';
        }
        if (val == 'COLLABORATION.REMOVED') {
            return 'COLLABORATION.REMOVED';
        }
        if (val == 'COLLABORATION.UPDATED') {
            return 'COLLABORATION.UPDATED';
        }
        if (val == 'SHARED_LINK.DELETED') {
            return 'SHARED_LINK.DELETED';
        }
        if (val == 'SHARED_LINK.CREATED') {
            return 'SHARED_LINK.CREATED';
        }
        if (val == 'SHARED_LINK.UPDATED') {
            return 'SHARED_LINK.UPDATED';
        }
        if (val == 'SIGN_REQUEST.COMPLETED') {
            return 'SIGN_REQUEST.COMPLETED';
        }
        if (val == 'SIGN_REQUEST.DECLINED') {
            return 'SIGN_REQUEST.DECLINED';
        }
        if (val == 'SIGN_REQUEST.EXPIRED') {
            return 'SIGN_REQUEST.EXPIRED';
        }
        if (val == 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED') {
            return 'SIGN_REQUEST.SIGNER_EMAIL_BOUNCED';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWebhook(val) {
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const address = val.address == void 0 ? void 0 : val.address;
        const triggers = val.triggers == void 0
            ? void 0
            : sdIsList(val.triggers)
                ? val.triggers.map(function (itm) {
                    return deserializeWebhookTriggersField(itm);
                })
                : [];
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeWebhookMiniTypeField(val.type);
        const target = val.target == void 0
            ? void 0
            : deserializeWebhookMiniTargetField(val.target);
        return {
            createdBy: createdBy,
            createdAt: createdAt,
            address: address,
            triggers: triggers,
            id: id,
            type: type,
            target: target,
        };
    }
    function deserializeWebLinkBaseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WebLinkBaseTypeField"',
            });
        }
        if (val == 'web_link') {
            return 'web_link';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWebLinkPathCollectionField(val) {
        const totalCount = val.total_count;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeFolderMini(itm);
            })
            : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeWebLinkSharedLinkAccessField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WebLinkSharedLinkAccessField"',
            });
        }
        if (val == 'open') {
            return 'open';
        }
        if (val == 'company') {
            return 'company';
        }
        if (val == 'collaborators') {
            return 'collaborators';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWebLinkSharedLinkEffectiveAccessField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WebLinkSharedLinkEffectiveAccessField"',
            });
        }
        if (val == 'open') {
            return 'open';
        }
        if (val == 'company') {
            return 'company';
        }
        if (val == 'collaborators') {
            return 'collaborators';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWebLinkSharedLinkEffectivePermissionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WebLinkSharedLinkEffectivePermissionField"',
            });
        }
        if (val == 'can_edit') {
            return 'can_edit';
        }
        if (val == 'can_download') {
            return 'can_download';
        }
        if (val == 'can_preview') {
            return 'can_preview';
        }
        if (val == 'no_access') {
            return 'no_access';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWebLinkSharedLinkPermissionsField(val) {
        const canDownload = val.can_download;
        const canPreview = val.can_preview;
        const canEdit = val.can_edit;
        return {
            canDownload: canDownload,
            canPreview: canPreview,
            canEdit: canEdit,
        };
    }
    function deserializeWebLinkSharedLinkField(val) {
        const url = val.url;
        const downloadUrl = val.download_url == void 0 ? void 0 : val.download_url;
        const vanityUrl = val.vanity_url == void 0 ? void 0 : val.vanity_url;
        const vanityName = val.vanity_name == void 0 ? void 0 : val.vanity_name;
        const access = val.access == void 0
            ? void 0
            : deserializeWebLinkSharedLinkAccessField(val.access);
        const effectiveAccess = deserializeWebLinkSharedLinkEffectiveAccessField(val.effective_access);
        const effectivePermission = deserializeWebLinkSharedLinkEffectivePermissionField(val.effective_permission);
        const unsharedAt = val.unshared_at == void 0 ? void 0 : val.unshared_at;
        const isPasswordEnabled = val.is_password_enabled;
        const permissions = val.permissions == void 0
            ? void 0
            : deserializeWebLinkSharedLinkPermissionsField(val.permissions);
        const downloadCount = val.download_count;
        const previewCount = val.preview_count;
        return {
            url: url,
            downloadUrl: downloadUrl,
            vanityUrl: vanityUrl,
            vanityName: vanityName,
            access: access,
            effectiveAccess: effectiveAccess,
            effectivePermission: effectivePermission,
            unsharedAt: unsharedAt,
            isPasswordEnabled: isPasswordEnabled,
            permissions: permissions,
            downloadCount: downloadCount,
            previewCount: previewCount,
        };
    }
    function deserializeWebLinkItemStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WebLinkItemStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'trashed') {
            return 'trashed';
        }
        if (val == 'deleted') {
            return 'deleted';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWebLink(val) {
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const description = val.description == void 0 ? void 0 : val.description;
        const pathCollection = val.path_collection == void 0
            ? void 0
            : deserializeWebLinkPathCollectionField(val.path_collection);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0
            ? void 0
            : deserializeWebLinkSharedLinkField(val.shared_link);
        const itemStatus = val.item_status == void 0
            ? void 0
            : deserializeWebLinkItemStatusField(val.item_status);
        const url = val.url == void 0 ? void 0 : val.url;
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const id = val.id;
        const type = deserializeWebLinkBaseTypeField(val.type);
        const etag = val.etag == void 0 ? void 0 : val.etag;
        return {
            parent: parent,
            description: description,
            pathCollection: pathCollection,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            itemStatus: itemStatus,
            url: url,
            sequenceId: sequenceId,
            name: name,
            id: id,
            type: type,
            etag: etag,
        };
    }
    function deserializeFileFullOrFolderMiniOrWebLink(val) {
        if (!sdIsMap(val)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "FileFullOrFolderMiniOrWebLink"',
            });
        }
        if (val.type == 'file') {
            return deserializeFileFull(val);
        }
        if (val.type == 'folder') {
            return deserializeFolderMini(val);
        }
        if (val.type == 'web_link') {
            return deserializeWebLink(val);
        }
        throw new BoxSdkError({ message: 'unknown type' });
    }
    function deserializeItemsOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ItemsOrderDirectionField"',
            });
        }
        if (val == 'ASC') {
            return 'ASC';
        }
        if (val == 'DESC') {
            return 'DESC';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeItemsOrderField(val) {
        const by = val.by == void 0 ? void 0 : val.by;
        const direction = val.direction == void 0
            ? void 0
            : deserializeItemsOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeItems(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeItemsOrderField(itm);
                })
                : [];
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFileFullOrFolderMiniOrWebLink(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            order: order,
            entries: entries,
        };
    }
    function deserializeFolderPathCollectionField(val) {
        const totalCount = val.total_count;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeFolderMini(itm);
            })
            : [];
        return {
            totalCount: totalCount,
            entries: entries,
        };
    }
    function deserializeFolderSharedLinkAccessField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FolderSharedLinkAccessField"',
            });
        }
        if (val == 'open') {
            return 'open';
        }
        if (val == 'company') {
            return 'company';
        }
        if (val == 'collaborators') {
            return 'collaborators';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFolderSharedLinkEffectiveAccessField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FolderSharedLinkEffectiveAccessField"',
            });
        }
        if (val == 'open') {
            return 'open';
        }
        if (val == 'company') {
            return 'company';
        }
        if (val == 'collaborators') {
            return 'collaborators';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFolderSharedLinkEffectivePermissionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FolderSharedLinkEffectivePermissionField"',
            });
        }
        if (val == 'can_edit') {
            return 'can_edit';
        }
        if (val == 'can_download') {
            return 'can_download';
        }
        if (val == 'can_preview') {
            return 'can_preview';
        }
        if (val == 'no_access') {
            return 'no_access';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFolderSharedLinkPermissionsField(val) {
        const canDownload = val.can_download;
        const canPreview = val.can_preview;
        const canEdit = val.can_edit;
        return {
            canDownload: canDownload,
            canPreview: canPreview,
            canEdit: canEdit,
        };
    }
    function deserializeFolderSharedLinkField(val) {
        const url = val.url;
        const downloadUrl = val.download_url == void 0 ? void 0 : val.download_url;
        const vanityUrl = val.vanity_url == void 0 ? void 0 : val.vanity_url;
        const vanityName = val.vanity_name == void 0 ? void 0 : val.vanity_name;
        const access = val.access == void 0
            ? void 0
            : deserializeFolderSharedLinkAccessField(val.access);
        const effectiveAccess = deserializeFolderSharedLinkEffectiveAccessField(val.effective_access);
        const effectivePermission = deserializeFolderSharedLinkEffectivePermissionField(val.effective_permission);
        const unsharedAt = val.unshared_at == void 0 ? void 0 : val.unshared_at;
        const isPasswordEnabled = val.is_password_enabled;
        const permissions = val.permissions == void 0
            ? void 0
            : deserializeFolderSharedLinkPermissionsField(val.permissions);
        const downloadCount = val.download_count;
        const previewCount = val.preview_count;
        return {
            url: url,
            downloadUrl: downloadUrl,
            vanityUrl: vanityUrl,
            vanityName: vanityName,
            access: access,
            effectiveAccess: effectiveAccess,
            effectivePermission: effectivePermission,
            unsharedAt: unsharedAt,
            isPasswordEnabled: isPasswordEnabled,
            permissions: permissions,
            downloadCount: downloadCount,
            previewCount: previewCount,
        };
    }
    function deserializeFolderFolderUploadEmailAccessField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FolderFolderUploadEmailAccessField"',
            });
        }
        if (val == 'open') {
            return 'open';
        }
        if (val == 'collaborators') {
            return 'collaborators';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFolderFolderUploadEmailField(val) {
        const access = val.access == void 0
            ? void 0
            : deserializeFolderFolderUploadEmailAccessField(val.access);
        const email = val.email == void 0 ? void 0 : val.email;
        return {
            access: access,
            email: email,
        };
    }
    function deserializeFolderItemStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FolderItemStatusField"',
            });
        }
        if (val == 'active') {
            return 'active';
        }
        if (val == 'trashed') {
            return 'trashed';
        }
        if (val == 'deleted') {
            return 'deleted';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFolder(val) {
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const description = val.description == void 0 ? void 0 : val.description;
        const size = val.size == void 0 ? void 0 : val.size;
        const pathCollection = val.path_collection == void 0
            ? void 0
            : deserializeFolderPathCollectionField(val.path_collection);
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const contentCreatedAt = val.content_created_at == void 0 ? void 0 : val.content_created_at;
        const contentModifiedAt = val.content_modified_at == void 0 ? void 0 : val.content_modified_at;
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0
            ? void 0
            : deserializeFolderSharedLinkField(val.shared_link);
        const folderUploadEmail = val.folder_upload_email == void 0
            ? void 0
            : deserializeFolderFolderUploadEmailField(val.folder_upload_email);
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const itemStatus = val.item_status == void 0
            ? void 0
            : deserializeFolderItemStatusField(val.item_status);
        const itemCollection = val.item_collection == void 0
            ? void 0
            : deserializeItems(val.item_collection);
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeFolderBaseTypeField(val.type);
        return {
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            description: description,
            size: size,
            pathCollection: pathCollection,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            contentCreatedAt: contentCreatedAt,
            contentModifiedAt: contentModifiedAt,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            folderUploadEmail: folderUploadEmail,
            parent: parent,
            itemStatus: itemStatus,
            itemCollection: itemCollection,
            sequenceId: sequenceId,
            name: name,
            id: id,
            etag: etag,
            type: type,
        };
    }
    function deserializeEventSourceOrFileOrFolderOrGenericSourceOrUser(val) {
        if (!sdIsMap(val)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "EventSourceOrFileOrFolderOrGenericSourceOrUser"',
            });
        }
        if (val.item_type == 'file') {
            return deserializeEventSource(val);
        }
        if (val.item_type == 'folder') {
            return deserializeEventSource(val);
        }
        if (!sdIsMap(val)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "EventSourceOrFileOrFolderOrGenericSourceOrUser"',
            });
        }
        if (val.type == 'file') {
            return deserializeFile(val);
        }
        if (val.type == 'folder') {
            return deserializeFolder(val);
        }
        if (val.type == 'user') {
            return deserializeUser(val);
        }
        return deserializeGenericSource(val);
    }
    function deserializeEventEventTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "EventEventTypeField"',
            });
        }
        if (val == 'ACCESS_GRANTED') {
            return 'ACCESS_GRANTED';
        }
        if (val == 'ACCESS_REVOKED') {
            return 'ACCESS_REVOKED';
        }
        if (val == 'ADD_DEVICE_ASSOCIATION') {
            return 'ADD_DEVICE_ASSOCIATION';
        }
        if (val == 'ADD_LOGIN_ACTIVITY_DEVICE') {
            return 'ADD_LOGIN_ACTIVITY_DEVICE';
        }
        if (val == 'ADMIN_LOGIN') {
            return 'ADMIN_LOGIN';
        }
        if (val == 'APPLICATION_CREATED') {
            return 'APPLICATION_CREATED';
        }
        if (val == 'APPLICATION_PUBLIC_KEY_ADDED') {
            return 'APPLICATION_PUBLIC_KEY_ADDED';
        }
        if (val == 'APPLICATION_PUBLIC_KEY_DELETED') {
            return 'APPLICATION_PUBLIC_KEY_DELETED';
        }
        if (val == 'CHANGE_ADMIN_ROLE') {
            return 'CHANGE_ADMIN_ROLE';
        }
        if (val == 'CHANGE_FOLDER_PERMISSION') {
            return 'CHANGE_FOLDER_PERMISSION';
        }
        if (val == 'COLLABORATION_ACCEPT') {
            return 'COLLABORATION_ACCEPT';
        }
        if (val == 'COLLABORATION_EXPIRATION') {
            return 'COLLABORATION_EXPIRATION';
        }
        if (val == 'COLLABORATION_INVITE') {
            return 'COLLABORATION_INVITE';
        }
        if (val == 'COLLABORATION_REMOVE') {
            return 'COLLABORATION_REMOVE';
        }
        if (val == 'COLLABORATION_ROLE_CHANGE') {
            return 'COLLABORATION_ROLE_CHANGE';
        }
        if (val == 'COLLAB_ADD_COLLABORATOR') {
            return 'COLLAB_ADD_COLLABORATOR';
        }
        if (val == 'COLLAB_INVITE_COLLABORATOR') {
            return 'COLLAB_INVITE_COLLABORATOR';
        }
        if (val == 'COLLAB_REMOVE_COLLABORATOR') {
            return 'COLLAB_REMOVE_COLLABORATOR';
        }
        if (val == 'COLLAB_ROLE_CHANGE') {
            return 'COLLAB_ROLE_CHANGE';
        }
        if (val == 'COMMENT_CREATE') {
            return 'COMMENT_CREATE';
        }
        if (val == 'COMMENT_DELETE') {
            return 'COMMENT_DELETE';
        }
        if (val == 'CONTENT_ACCESS') {
            return 'CONTENT_ACCESS';
        }
        if (val == 'CONTENT_WORKFLOW_ABNORMAL_DOWNLOAD_ACTIVITY') {
            return 'CONTENT_WORKFLOW_ABNORMAL_DOWNLOAD_ACTIVITY';
        }
        if (val == 'CONTENT_WORKFLOW_AUTOMATION_ADD') {
            return 'CONTENT_WORKFLOW_AUTOMATION_ADD';
        }
        if (val == 'CONTENT_WORKFLOW_AUTOMATION_DELETE') {
            return 'CONTENT_WORKFLOW_AUTOMATION_DELETE';
        }
        if (val == 'CONTENT_WORKFLOW_POLICY_ADD') {
            return 'CONTENT_WORKFLOW_POLICY_ADD';
        }
        if (val == 'CONTENT_WORKFLOW_SHARING_POLICY_VIOLATION') {
            return 'CONTENT_WORKFLOW_SHARING_POLICY_VIOLATION';
        }
        if (val == 'CONTENT_WORKFLOW_UPLOAD_POLICY_VIOLATION') {
            return 'CONTENT_WORKFLOW_UPLOAD_POLICY_VIOLATION';
        }
        if (val == 'COPY') {
            return 'COPY';
        }
        if (val == 'DATA_RETENTION_CREATE_RETENTION') {
            return 'DATA_RETENTION_CREATE_RETENTION';
        }
        if (val == 'DATA_RETENTION_REMOVE_RETENTION') {
            return 'DATA_RETENTION_REMOVE_RETENTION';
        }
        if (val == 'DELETE') {
            return 'DELETE';
        }
        if (val == 'DELETE_USER') {
            return 'DELETE_USER';
        }
        if (val == 'DEVICE_TRUST_CHECK_FAILED') {
            return 'DEVICE_TRUST_CHECK_FAILED';
        }
        if (val == 'DOWNLOAD') {
            return 'DOWNLOAD';
        }
        if (val == 'EDIT') {
            return 'EDIT';
        }
        if (val == 'EDIT_USER') {
            return 'EDIT_USER';
        }
        if (val == 'EMAIL_ALIAS_CONFIRM') {
            return 'EMAIL_ALIAS_CONFIRM';
        }
        if (val == 'EMAIL_ALIAS_REMOVE') {
            return 'EMAIL_ALIAS_REMOVE';
        }
        if (val == 'ENABLE_TWO_FACTOR_AUTH') {
            return 'ENABLE_TWO_FACTOR_AUTH';
        }
        if (val == 'ENTERPRISE_APP_AUTHORIZATION_UPDATE') {
            return 'ENTERPRISE_APP_AUTHORIZATION_UPDATE';
        }
        if (val == 'FAILED_LOGIN') {
            return 'FAILED_LOGIN';
        }
        if (val == 'FILE_MARKED_MALICIOUS') {
            return 'FILE_MARKED_MALICIOUS';
        }
        if (val == 'FILE_WATERMARKED_DOWNLOAD') {
            return 'FILE_WATERMARKED_DOWNLOAD';
        }
        if (val == 'GROUP_ADD_ITEM') {
            return 'GROUP_ADD_ITEM';
        }
        if (val == 'GROUP_ADD_USER') {
            return 'GROUP_ADD_USER';
        }
        if (val == 'GROUP_CREATION') {
            return 'GROUP_CREATION';
        }
        if (val == 'GROUP_DELETION') {
            return 'GROUP_DELETION';
        }
        if (val == 'GROUP_EDITED') {
            return 'GROUP_EDITED';
        }
        if (val == 'GROUP_REMOVE_ITEM') {
            return 'GROUP_REMOVE_ITEM';
        }
        if (val == 'GROUP_REMOVE_USER') {
            return 'GROUP_REMOVE_USER';
        }
        if (val == 'ITEM_COPY') {
            return 'ITEM_COPY';
        }
        if (val == 'ITEM_CREATE') {
            return 'ITEM_CREATE';
        }
        if (val == 'ITEM_DOWNLOAD') {
            return 'ITEM_DOWNLOAD';
        }
        if (val == 'ITEM_MAKE_CURRENT_VERSION') {
            return 'ITEM_MAKE_CURRENT_VERSION';
        }
        if (val == 'ITEM_MODIFY') {
            return 'ITEM_MODIFY';
        }
        if (val == 'ITEM_MOVE') {
            return 'ITEM_MOVE';
        }
        if (val == 'ITEM_OPEN') {
            return 'ITEM_OPEN';
        }
        if (val == 'ITEM_PREVIEW') {
            return 'ITEM_PREVIEW';
        }
        if (val == 'ITEM_RENAME') {
            return 'ITEM_RENAME';
        }
        if (val == 'ITEM_SHARED') {
            return 'ITEM_SHARED';
        }
        if (val == 'ITEM_SHARED_CREATE') {
            return 'ITEM_SHARED_CREATE';
        }
        if (val == 'ITEM_SHARED_UNSHARE') {
            return 'ITEM_SHARED_UNSHARE';
        }
        if (val == 'ITEM_SHARED_UPDATE') {
            return 'ITEM_SHARED_UPDATE';
        }
        if (val == 'ITEM_SYNC') {
            return 'ITEM_SYNC';
        }
        if (val == 'ITEM_TRASH') {
            return 'ITEM_TRASH';
        }
        if (val == 'ITEM_UNDELETE_VIA_TRASH') {
            return 'ITEM_UNDELETE_VIA_TRASH';
        }
        if (val == 'ITEM_UNSYNC') {
            return 'ITEM_UNSYNC';
        }
        if (val == 'ITEM_UPLOAD') {
            return 'ITEM_UPLOAD';
        }
        if (val == 'LEGAL_HOLD_ASSIGNMENT_CREATE') {
            return 'LEGAL_HOLD_ASSIGNMENT_CREATE';
        }
        if (val == 'LEGAL_HOLD_ASSIGNMENT_DELETE') {
            return 'LEGAL_HOLD_ASSIGNMENT_DELETE';
        }
        if (val == 'LEGAL_HOLD_POLICY_CREATE') {
            return 'LEGAL_HOLD_POLICY_CREATE';
        }
        if (val == 'LEGAL_HOLD_POLICY_DELETE') {
            return 'LEGAL_HOLD_POLICY_DELETE';
        }
        if (val == 'LEGAL_HOLD_POLICY_UPDATE') {
            return 'LEGAL_HOLD_POLICY_UPDATE';
        }
        if (val == 'LOCK') {
            return 'LOCK';
        }
        if (val == 'LOCK_CREATE') {
            return 'LOCK_CREATE';
        }
        if (val == 'LOCK_DESTROY') {
            return 'LOCK_DESTROY';
        }
        if (val == 'LOGIN') {
            return 'LOGIN';
        }
        if (val == 'MASTER_INVITE_ACCEPT') {
            return 'MASTER_INVITE_ACCEPT';
        }
        if (val == 'MASTER_INVITE_REJECT') {
            return 'MASTER_INVITE_REJECT';
        }
        if (val == 'METADATA_INSTANCE_CREATE') {
            return 'METADATA_INSTANCE_CREATE';
        }
        if (val == 'METADATA_INSTANCE_DELETE') {
            return 'METADATA_INSTANCE_DELETE';
        }
        if (val == 'METADATA_INSTANCE_UPDATE') {
            return 'METADATA_INSTANCE_UPDATE';
        }
        if (val == 'METADATA_TEMPLATE_CREATE') {
            return 'METADATA_TEMPLATE_CREATE';
        }
        if (val == 'METADATA_TEMPLATE_DELETE') {
            return 'METADATA_TEMPLATE_DELETE';
        }
        if (val == 'METADATA_TEMPLATE_UPDATE') {
            return 'METADATA_TEMPLATE_UPDATE';
        }
        if (val == 'MOVE') {
            return 'MOVE';
        }
        if (val == 'NEW_USER') {
            return 'NEW_USER';
        }
        if (val == 'PREVIEW') {
            return 'PREVIEW';
        }
        if (val == 'REMOVE_DEVICE_ASSOCIATION') {
            return 'REMOVE_DEVICE_ASSOCIATION';
        }
        if (val == 'REMOVE_LOGIN_ACTIVITY_DEVICE') {
            return 'REMOVE_LOGIN_ACTIVITY_DEVICE';
        }
        if (val == 'RENAME') {
            return 'RENAME';
        }
        if (val == 'RETENTION_POLICY_ASSIGNMENT_ADD') {
            return 'RETENTION_POLICY_ASSIGNMENT_ADD';
        }
        if (val == 'SHARE') {
            return 'SHARE';
        }
        if (val == 'SHARE_EXPIRATION') {
            return 'SHARE_EXPIRATION';
        }
        if (val == 'SHIELD_ALERT') {
            return 'SHIELD_ALERT';
        }
        if (val == 'SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED') {
            return 'SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED';
        }
        if (val == 'SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED_MISSING_JUSTIFICATION') {
            return 'SHIELD_EXTERNAL_COLLAB_ACCESS_BLOCKED_MISSING_JUSTIFICATION';
        }
        if (val == 'SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED') {
            return 'SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED';
        }
        if (val == 'SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED_MISSING_JUSTIFICATION') {
            return 'SHIELD_EXTERNAL_COLLAB_INVITE_BLOCKED_MISSING_JUSTIFICATION';
        }
        if (val == 'SHIELD_JUSTIFICATION_APPROVAL') {
            return 'SHIELD_JUSTIFICATION_APPROVAL';
        }
        if (val == 'SHIELD_SHARED_LINK_ACCESS_BLOCKED') {
            return 'SHIELD_SHARED_LINK_ACCESS_BLOCKED';
        }
        if (val == 'SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_CREATE') {
            return 'SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_CREATE';
        }
        if (val == 'SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_UPDATE') {
            return 'SHIELD_SHARED_LINK_STATUS_RESTRICTED_ON_UPDATE';
        }
        if (val == 'SIGN_DOCUMENT_ASSIGNED') {
            return 'SIGN_DOCUMENT_ASSIGNED';
        }
        if (val == 'SIGN_DOCUMENT_CANCELLED') {
            return 'SIGN_DOCUMENT_CANCELLED';
        }
        if (val == 'SIGN_DOCUMENT_COMPLETED') {
            return 'SIGN_DOCUMENT_COMPLETED';
        }
        if (val == 'SIGN_DOCUMENT_CONVERTED') {
            return 'SIGN_DOCUMENT_CONVERTED';
        }
        if (val == 'SIGN_DOCUMENT_CREATED') {
            return 'SIGN_DOCUMENT_CREATED';
        }
        if (val == 'SIGN_DOCUMENT_DECLINED') {
            return 'SIGN_DOCUMENT_DECLINED';
        }
        if (val == 'SIGN_DOCUMENT_EXPIRED') {
            return 'SIGN_DOCUMENT_EXPIRED';
        }
        if (val == 'SIGN_DOCUMENT_SIGNED') {
            return 'SIGN_DOCUMENT_SIGNED';
        }
        if (val == 'SIGN_DOCUMENT_VIEWED_BY_SIGNED') {
            return 'SIGN_DOCUMENT_VIEWED_BY_SIGNED';
        }
        if (val == 'SIGNER_DOWNLOADED') {
            return 'SIGNER_DOWNLOADED';
        }
        if (val == 'SIGNER_FORWARDED') {
            return 'SIGNER_FORWARDED';
        }
        if (val == 'STORAGE_EXPIRATION') {
            return 'STORAGE_EXPIRATION';
        }
        if (val == 'TAG_ITEM_CREATE') {
            return 'TAG_ITEM_CREATE';
        }
        if (val == 'TASK_ASSIGNMENT_CREATE') {
            return 'TASK_ASSIGNMENT_CREATE';
        }
        if (val == 'TASK_ASSIGNMENT_DELETE') {
            return 'TASK_ASSIGNMENT_DELETE';
        }
        if (val == 'TASK_ASSIGNMENT_UPDATE') {
            return 'TASK_ASSIGNMENT_UPDATE';
        }
        if (val == 'TASK_CREATE') {
            return 'TASK_CREATE';
        }
        if (val == 'TASK_UPDATE') {
            return 'TASK_UPDATE';
        }
        if (val == 'TERMS_OF_SERVICE_ACCEPT') {
            return 'TERMS_OF_SERVICE_ACCEPT';
        }
        if (val == 'TERMS_OF_SERVICE_REJECT') {
            return 'TERMS_OF_SERVICE_REJECT';
        }
        if (val == 'UNDELETE') {
            return 'UNDELETE';
        }
        if (val == 'UNLOCK') {
            return 'UNLOCK';
        }
        if (val == 'UNSHARE') {
            return 'UNSHARE';
        }
        if (val == 'UPDATE_COLLABORATION_EXPIRATION') {
            return 'UPDATE_COLLABORATION_EXPIRATION';
        }
        if (val == 'UPDATE_SHARE_EXPIRATION') {
            return 'UPDATE_SHARE_EXPIRATION';
        }
        if (val == 'UPLOAD') {
            return 'UPLOAD';
        }
        if (val == 'USER_AUTHENTICATE_OAUTH2_ACCESS_TOKEN_CREATE') {
            return 'USER_AUTHENTICATE_OAUTH2_ACCESS_TOKEN_CREATE';
        }
        if (val == 'WATERMARK_LABEL_CREATE') {
            return 'WATERMARK_LABEL_CREATE';
        }
        if (val == 'WATERMARK_LABEL_DELETE') {
            return 'WATERMARK_LABEL_DELETE';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeEventAdditionalDetailsField(val) {
        return {};
    }
    function deserializeEvent(val) {
        const type = val.type == void 0 ? void 0 : val.type;
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const recordedAt = val.recorded_at == void 0 ? void 0 : val.recorded_at;
        const eventId = val.event_id == void 0 ? void 0 : val.event_id;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const eventType = val.event_type == void 0
            ? void 0
            : deserializeEventEventTypeField(val.event_type);
        const sessionId = val.session_id == void 0 ? void 0 : val.session_id;
        const source = val.source == void 0
            ? void 0
            : deserializeEventSourceOrFileOrFolderOrGenericSourceOrUser(val.source);
        const additionalDetails = val.additional_details == void 0
            ? void 0
            : deserializeEventAdditionalDetailsField(val.additional_details);
        return {
            type: type,
            createdAt: createdAt,
            recordedAt: recordedAt,
            eventId: eventId,
            createdBy: createdBy,
            eventType: eventType,
            sessionId: sessionId,
            source: source,
            additionalDetails: additionalDetails,
        };
    }
    function deserializeEvents(val) {
        const chunkSize = val.chunk_size == void 0 ? void 0 : val.chunk_size;
        const nextStreamPosition = val.next_stream_position == void 0 ? void 0 : val.next_stream_position;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeEvent(itm);
                })
                : [];
        return {
            chunkSize: chunkSize,
            nextStreamPosition: nextStreamPosition,
            entries: entries,
        };
    }
    function deserializeFileOrFolderOrWebLink(val) {
        if (!sdIsMap(val)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "FileOrFolderOrWebLink"',
            });
        }
        if (val.type == 'file') {
            return deserializeFile(val);
        }
        if (val.type == 'folder') {
            return deserializeFolder(val);
        }
        if (val.type == 'web_link') {
            return deserializeWebLink(val);
        }
        throw new BoxSdkError({ message: 'unknown type' });
    }
    function deserializeLegalHoldPolicyAssignment(val) {
        const legalHoldPolicy = val.legal_hold_policy == void 0
            ? void 0
            : deserializeLegalHoldPolicyMini(val.legal_hold_policy);
        const assignedTo = val.assigned_to == void 0
            ? void 0
            : deserializeFileOrFolderOrWebLink(val.assigned_to);
        const assignedBy = val.assigned_by == void 0 ? void 0 : deserializeUserMini(val.assigned_by);
        const assignedAt = val.assigned_at == void 0 ? void 0 : val.assigned_at;
        const deletedAt = val.deleted_at == void 0 ? void 0 : val.deleted_at;
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeLegalHoldPolicyAssignmentBaseTypeField(val.type);
        return {
            legalHoldPolicy: legalHoldPolicy,
            assignedTo: assignedTo,
            assignedBy: assignedBy,
            assignedAt: assignedAt,
            deletedAt: deletedAt,
            id: id,
            type: type,
        };
    }
    function deserializeLegalHoldPolicyAssignments(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeLegalHoldPolicyAssignment(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeFileVersionLegalHoldTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FileVersionLegalHoldTypeField"',
            });
        }
        if (val == 'file_version_legal_hold') {
            return 'file_version_legal_hold';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFileVersionLegalHold(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeFileVersionLegalHoldTypeField(val.type);
        const fileVersion = val.file_version == void 0
            ? void 0
            : deserializeFileVersionMini(val.file_version);
        const file = val.file == void 0 ? void 0 : deserializeFileMini(val.file);
        const legalHoldPolicyAssignments = val.legal_hold_policy_assignments == void 0
            ? void 0
            : sdIsList(val.legal_hold_policy_assignments)
                ? val.legal_hold_policy_assignments.map(function (itm) {
                    return deserializeLegalHoldPolicyAssignment(itm);
                })
                : [];
        const deletedAt = val.deleted_at == void 0 ? void 0 : val.deleted_at;
        return {
            id: id,
            type: type,
            fileVersion: fileVersion,
            file: file,
            legalHoldPolicyAssignments: legalHoldPolicyAssignments,
            deletedAt: deletedAt,
        };
    }
    function deserializeFileVersionLegalHolds(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFileVersionLegalHold(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeCollaborationTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollaborationTypeField"',
            });
        }
        if (val == 'collaboration') {
            return 'collaboration';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollaborationRoleField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollaborationRoleField"',
            });
        }
        if (val == 'editor') {
            return 'editor';
        }
        if (val == 'viewer') {
            return 'viewer';
        }
        if (val == 'previewer') {
            return 'previewer';
        }
        if (val == 'uploader') {
            return 'uploader';
        }
        if (val == 'previewer uploader') {
            return 'previewer uploader';
        }
        if (val == 'viewer uploader') {
            return 'viewer uploader';
        }
        if (val == 'co-owner') {
            return 'co-owner';
        }
        if (val == 'owner') {
            return 'owner';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollaborationStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollaborationStatusField"',
            });
        }
        if (val == 'accepted') {
            return 'accepted';
        }
        if (val == 'pending') {
            return 'pending';
        }
        if (val == 'rejected') {
            return 'rejected';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField(val) {
        const isAccepted = val.is_accepted == void 0 ? void 0 : val.is_accepted;
        const termsOfService = val.terms_of_service == void 0
            ? void 0
            : deserializeTermsOfServiceBase(val.terms_of_service);
        return {
            isAccepted: isAccepted,
            termsOfService: termsOfService,
        };
    }
    function deserializeCollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField(val) {
        const enterpriseHasStrongPasswordRequiredForExternalUsers = val.enterprise_has_strong_password_required_for_external_users == void 0
            ? void 0
            : val.enterprise_has_strong_password_required_for_external_users;
        const userHasStrongPassword = val.user_has_strong_password == void 0
            ? void 0
            : val.user_has_strong_password;
        return {
            enterpriseHasStrongPasswordRequiredForExternalUsers: enterpriseHasStrongPasswordRequiredForExternalUsers,
            userHasStrongPassword: userHasStrongPassword,
        };
    }
    function deserializeCollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(val) {
        const enterpriseHasTwoFactorAuthEnabled = val.enterprise_has_two_factor_auth_enabled == void 0
            ? void 0
            : val.enterprise_has_two_factor_auth_enabled;
        const userHasTwoFactorAuthenticationEnabled = val.user_has_two_factor_authentication_enabled == void 0
            ? void 0
            : val.user_has_two_factor_authentication_enabled;
        return {
            enterpriseHasTwoFactorAuthEnabled: enterpriseHasTwoFactorAuthEnabled,
            userHasTwoFactorAuthenticationEnabled: userHasTwoFactorAuthenticationEnabled,
        };
    }
    function deserializeCollaborationAcceptanceRequirementsStatusField(val) {
        const termsOfServiceRequirement = val.terms_of_service_requirement == void 0
            ? void 0
            : deserializeCollaborationAcceptanceRequirementsStatusTermsOfServiceRequirementField(val.terms_of_service_requirement);
        const strongPasswordRequirement = val.strong_password_requirement == void 0
            ? void 0
            : deserializeCollaborationAcceptanceRequirementsStatusStrongPasswordRequirementField(val.strong_password_requirement);
        const twoFactorAuthenticationRequirement = val.two_factor_authentication_requirement == void 0
            ? void 0
            : deserializeCollaborationAcceptanceRequirementsStatusTwoFactorAuthenticationRequirementField(val.two_factor_authentication_requirement);
        return {
            termsOfServiceRequirement: termsOfServiceRequirement,
            strongPasswordRequirement: strongPasswordRequirement,
            twoFactorAuthenticationRequirement: twoFactorAuthenticationRequirement,
        };
    }
    function deserializeCollaboration(val) {
        const id = val.id;
        const type = deserializeCollaborationTypeField(val.type);
        const item = val.item == void 0 ? void 0 : deserializeFileOrFolderOrWebLink(val.item);
        const accessibleBy = val.accessible_by == void 0
            ? void 0
            : deserializeGroupMiniOrUserCollaborations(val.accessible_by);
        const inviteEmail = val.invite_email == void 0 ? void 0 : val.invite_email;
        const role = val.role == void 0 ? void 0 : deserializeCollaborationRoleField(val.role);
        const expiresAt = val.expires_at == void 0 ? void 0 : val.expires_at;
        const isAccessOnly = val.is_access_only == void 0 ? void 0 : val.is_access_only;
        const status = val.status == void 0
            ? void 0
            : deserializeCollaborationStatusField(val.status);
        const acknowledgedAt = val.acknowledged_at == void 0 ? void 0 : val.acknowledged_at;
        const createdBy = val.created_by == void 0
            ? void 0
            : deserializeUserCollaborations(val.created_by);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const acceptanceRequirementsStatus = val.acceptance_requirements_status == void 0
            ? void 0
            : deserializeCollaborationAcceptanceRequirementsStatusField(val.acceptance_requirements_status);
        return {
            id: id,
            type: type,
            item: item,
            accessibleBy: accessibleBy,
            inviteEmail: inviteEmail,
            role: role,
            expiresAt: expiresAt,
            isAccessOnly: isAccessOnly,
            status: status,
            acknowledgedAt: acknowledgedAt,
            createdBy: createdBy,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            acceptanceRequirementsStatus: acceptanceRequirementsStatus,
        };
    }
    function deserializeCollaborationsOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "CollaborationsOrderDirectionField"',
            });
        }
        if (val == 'ASC') {
            return 'ASC';
        }
        if (val == 'DESC') {
            return 'DESC';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeCollaborationsOrderField(val) {
        const by = val.by == void 0 ? void 0 : val.by;
        const direction = val.direction == void 0
            ? void 0
            : deserializeCollaborationsOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeCollaborations(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeCollaborationsOrderField(itm);
                })
                : [];
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeCollaboration(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            order: order,
            entries: entries,
        };
    }
    function deserializeFileOrFolder(val) {
        if (!sdIsMap(val)) {
            throw new BoxSdkError({ message: 'Expecting a map for "FileOrFolder"' });
        }
        if (val.type == 'file') {
            return deserializeFile(val);
        }
        if (val.type == 'folder') {
            return deserializeFolder(val);
        }
        throw new BoxSdkError({ message: 'unknown type' });
    }
    function deserializeMetadataQueryResults(val) {
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFileOrFolder(itm);
                })
                : [];
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        return {
            entries: entries,
            limit: limit,
            nextMarker: nextMarker,
        };
    }
    function deserializeFolderFullSyncStateField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FolderFullSyncStateField"',
            });
        }
        if (val == 'synced') {
            return 'synced';
        }
        if (val == 'not_synced') {
            return 'not_synced';
        }
        if (val == 'partially_synced') {
            return 'partially_synced';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFolderFullPermissionsField(val) {
        const canDelete = val.can_delete;
        const canDownload = val.can_download;
        const canInviteCollaborator = val.can_invite_collaborator;
        const canRename = val.can_rename;
        const canSetShareAccess = val.can_set_share_access;
        const canShare = val.can_share;
        const canUpload = val.can_upload == void 0 ? void 0 : val.can_upload;
        return {
            canDelete: canDelete,
            canDownload: canDownload,
            canInviteCollaborator: canInviteCollaborator,
            canRename: canRename,
            canSetShareAccess: canSetShareAccess,
            canShare: canShare,
            canUpload: canUpload,
        };
    }
    function deserializeFolderFullMetadataField(val) {
        const extraData = val == void 0 ? void 0 : val;
        return { extraData: extraData };
    }
    function deserializeFolderFullAllowedSharedLinkAccessLevelsField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FolderFullAllowedSharedLinkAccessLevelsField"',
            });
        }
        if (val == 'open') {
            return 'open';
        }
        if (val == 'company') {
            return 'company';
        }
        if (val == 'collaborators') {
            return 'collaborators';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFolderFullAllowedInviteeRolesField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "FolderFullAllowedInviteeRolesField"',
            });
        }
        if (val == 'editor') {
            return 'editor';
        }
        if (val == 'viewer') {
            return 'viewer';
        }
        if (val == 'previewer') {
            return 'previewer';
        }
        if (val == 'uploader') {
            return 'uploader';
        }
        if (val == 'previewer uploader') {
            return 'previewer uploader';
        }
        if (val == 'viewer uploader') {
            return 'viewer uploader';
        }
        if (val == 'co-owner') {
            return 'co-owner';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeFolderFullWatermarkInfoField(val) {
        const isWatermarked = val.is_watermarked == void 0 ? void 0 : val.is_watermarked;
        return {
            isWatermarked: isWatermarked,
        };
    }
    function deserializeFolderFullClassificationField(val) {
        const name = val.name == void 0 ? void 0 : val.name;
        const definition = val.definition == void 0 ? void 0 : val.definition;
        const color = val.color == void 0 ? void 0 : val.color;
        return {
            name: name,
            definition: definition,
            color: color,
        };
    }
    function deserializeFolderFull(val) {
        const syncState = val.sync_state == void 0
            ? void 0
            : deserializeFolderFullSyncStateField(val.sync_state);
        const hasCollaborations = val.has_collaborations == void 0 ? void 0 : val.has_collaborations;
        const permissions = val.permissions == void 0
            ? void 0
            : deserializeFolderFullPermissionsField(val.permissions);
        const tags = val.tags == void 0
            ? void 0
            : sdIsList(val.tags)
                ? val.tags.map(function (itm) {
                    return itm;
                })
                : [];
        const canNonOwnersInvite = val.can_non_owners_invite == void 0 ? void 0 : val.can_non_owners_invite;
        const isExternallyOwned = val.is_externally_owned == void 0 ? void 0 : val.is_externally_owned;
        const metadata = val.metadata == void 0
            ? void 0
            : deserializeFolderFullMetadataField(val.metadata);
        const isCollaborationRestrictedToEnterprise = val.is_collaboration_restricted_to_enterprise == void 0
            ? void 0
            : val.is_collaboration_restricted_to_enterprise;
        const allowedSharedLinkAccessLevels = val.allowed_shared_link_access_levels == void 0
            ? void 0
            : sdIsList(val.allowed_shared_link_access_levels)
                ? val.allowed_shared_link_access_levels.map(function (itm) {
                    return deserializeFolderFullAllowedSharedLinkAccessLevelsField(itm);
                })
                : [];
        const allowedInviteeRoles = val.allowed_invitee_roles == void 0
            ? void 0
            : sdIsList(val.allowed_invitee_roles)
                ? val.allowed_invitee_roles.map(function (itm) {
                    return deserializeFolderFullAllowedInviteeRolesField(itm);
                })
                : [];
        const watermarkInfo = val.watermark_info == void 0
            ? void 0
            : deserializeFolderFullWatermarkInfoField(val.watermark_info);
        const isAccessibleViaSharedLink = val.is_accessible_via_shared_link == void 0
            ? void 0
            : val.is_accessible_via_shared_link;
        const canNonOwnersViewCollaborators = val.can_non_owners_view_collaborators == void 0
            ? void 0
            : val.can_non_owners_view_collaborators;
        const classification = val.classification == void 0
            ? void 0
            : deserializeFolderFullClassificationField(val.classification);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const description = val.description == void 0 ? void 0 : val.description;
        const size = val.size == void 0 ? void 0 : val.size;
        const pathCollection = val.path_collection == void 0
            ? void 0
            : deserializeFolderPathCollectionField(val.path_collection);
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserMini(val.created_by);
        const modifiedBy = val.modified_by == void 0 ? void 0 : deserializeUserMini(val.modified_by);
        const trashedAt = val.trashed_at == void 0 ? void 0 : val.trashed_at;
        const purgedAt = val.purged_at == void 0 ? void 0 : val.purged_at;
        const contentCreatedAt = val.content_created_at == void 0 ? void 0 : val.content_created_at;
        const contentModifiedAt = val.content_modified_at == void 0 ? void 0 : val.content_modified_at;
        const ownedBy = val.owned_by == void 0 ? void 0 : deserializeUserMini(val.owned_by);
        const sharedLink = val.shared_link == void 0
            ? void 0
            : deserializeFolderSharedLinkField(val.shared_link);
        const folderUploadEmail = val.folder_upload_email == void 0
            ? void 0
            : deserializeFolderFolderUploadEmailField(val.folder_upload_email);
        const parent = val.parent == void 0 ? void 0 : deserializeFolderMini(val.parent);
        const itemStatus = val.item_status == void 0
            ? void 0
            : deserializeFolderItemStatusField(val.item_status);
        const itemCollection = val.item_collection == void 0
            ? void 0
            : deserializeItems(val.item_collection);
        const sequenceId = val.sequence_id == void 0 ? void 0 : val.sequence_id;
        const name = val.name == void 0 ? void 0 : val.name;
        const id = val.id;
        const etag = val.etag == void 0 ? void 0 : val.etag;
        const type = deserializeFolderBaseTypeField(val.type);
        return {
            syncState: syncState,
            hasCollaborations: hasCollaborations,
            permissions: permissions,
            tags: tags,
            canNonOwnersInvite: canNonOwnersInvite,
            isExternallyOwned: isExternallyOwned,
            metadata: metadata,
            isCollaborationRestrictedToEnterprise: isCollaborationRestrictedToEnterprise,
            allowedSharedLinkAccessLevels: allowedSharedLinkAccessLevels,
            allowedInviteeRoles: allowedInviteeRoles,
            watermarkInfo: watermarkInfo,
            isAccessibleViaSharedLink: isAccessibleViaSharedLink,
            canNonOwnersViewCollaborators: canNonOwnersViewCollaborators,
            classification: classification,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            description: description,
            size: size,
            pathCollection: pathCollection,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            trashedAt: trashedAt,
            purgedAt: purgedAt,
            contentCreatedAt: contentCreatedAt,
            contentModifiedAt: contentModifiedAt,
            ownedBy: ownedBy,
            sharedLink: sharedLink,
            folderUploadEmail: folderUploadEmail,
            parent: parent,
            itemStatus: itemStatus,
            itemCollection: itemCollection,
            sequenceId: sequenceId,
            name: name,
            id: id,
            etag: etag,
            type: type,
        };
    }
    function deserializeFileFullOrFolderFullOrWebLink(val) {
        if (!sdIsMap(val)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "FileFullOrFolderFullOrWebLink"',
            });
        }
        if (val.type == 'file') {
            return deserializeFileFull(val);
        }
        if (val.type == 'folder') {
            return deserializeFolderFull(val);
        }
        if (val.type == 'web_link') {
            return deserializeWebLink(val);
        }
        throw new BoxSdkError({ message: 'unknown type' });
    }
    function deserializeSearchResultWithSharedLink(val) {
        const accessibleViaSharedLink = val.accessible_via_shared_link == void 0
            ? void 0
            : val.accessible_via_shared_link;
        const item = val.item == void 0
            ? void 0
            : deserializeFileFullOrFolderFullOrWebLink(val.item);
        const type = val.type == void 0 ? void 0 : val.type;
        return {
            accessibleViaSharedLink: accessibleViaSharedLink,
            item: item,
            type: type,
        };
    }
    function deserializeSearchResultsWithSharedLinksTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SearchResultsWithSharedLinksTypeField"',
            });
        }
        if (val == 'search_results_with_shared_links') {
            return 'search_results_with_shared_links';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSearchResultsWithSharedLinks(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const type = deserializeSearchResultsWithSharedLinksTypeField(val.type);
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeSearchResultWithSharedLink(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            type: type,
            entries: entries,
        };
    }
    function deserializeSearchResultsTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SearchResultsTypeField"',
            });
        }
        if (val == 'search_results_items') {
            return 'search_results_items';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSearchResults(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const type = deserializeSearchResultsTypeField(val.type);
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeFileFullOrFolderFullOrWebLink(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            type: type,
            entries: entries,
        };
    }
    function deserializeSearchResultsOrSearchResultsWithSharedLinks(val) {
        if (!sdIsMap(val)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "SearchResultsOrSearchResultsWithSharedLinks"',
            });
        }
        if (val.type == 'search_results_items') {
            return deserializeSearchResults(val);
        }
        if (val.type == 'search_results_with_shared_links') {
            return deserializeSearchResultsWithSharedLinks(val);
        }
        throw new BoxSdkError({ message: 'unknown type' });
    }
    function deserializeRecentItemInteractionTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "RecentItemInteractionTypeField"',
            });
        }
        if (val == 'item_preview') {
            return 'item_preview';
        }
        if (val == 'item_upload') {
            return 'item_upload';
        }
        if (val == 'item_comment') {
            return 'item_comment';
        }
        if (val == 'item_open') {
            return 'item_open';
        }
        if (val == 'item_modify') {
            return 'item_modify';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeRecentItem(val) {
        const type = val.type == void 0 ? void 0 : val.type;
        const item = val.item == void 0
            ? void 0
            : deserializeFileFullOrFolderFullOrWebLink(val.item);
        const interactionType = val.interaction_type == void 0
            ? void 0
            : deserializeRecentItemInteractionTypeField(val.interaction_type);
        const interactedAt = val.interacted_at == void 0 ? void 0 : val.interacted_at;
        const interactionSharedLink = val.interaction_shared_link == void 0
            ? void 0
            : val.interaction_shared_link;
        return {
            type: type,
            item: item,
            interactionType: interactionType,
            interactedAt: interactedAt,
            interactionSharedLink: interactionSharedLink,
        };
    }
    function deserializeRecentItems(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeRecentItem(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeWorkflowMiniTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowMiniTypeField"',
            });
        }
        if (val == 'workflow') {
            return 'workflow';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowFlowsTypeField"',
            });
        }
        if (val == 'flow') {
            return 'flow';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsTriggerTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowFlowsTriggerTypeField"',
            });
        }
        if (val == 'trigger') {
            return 'trigger';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsTriggerTriggerTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowFlowsTriggerTriggerTypeField"',
            });
        }
        if (val == 'WORKFLOW_MANUAL_START') {
            return 'WORKFLOW_MANUAL_START';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsTriggerScopeTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowFlowsTriggerScopeTypeField"',
            });
        }
        if (val == 'trigger_scope') {
            return 'trigger_scope';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsTriggerScopeObjectTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowFlowsTriggerScopeObjectTypeField"',
            });
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsTriggerScopeObjectField(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeWorkflowFlowsTriggerScopeObjectTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        return { type: type, id: id };
    }
    function deserializeWorkflowFlowsTriggerScopeField(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeWorkflowFlowsTriggerScopeTypeField(val.type);
        const ref = val.ref == void 0 ? void 0 : val.ref;
        const object = val.object == void 0
            ? void 0
            : deserializeWorkflowFlowsTriggerScopeObjectField(val.object);
        return {
            type: type,
            ref: ref,
            object: object,
        };
    }
    function deserializeWorkflowFlowsTriggerField(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeWorkflowFlowsTriggerTypeField(val.type);
        const triggerType = val.trigger_type == void 0
            ? void 0
            : deserializeWorkflowFlowsTriggerTriggerTypeField(val.trigger_type);
        const scope = val.scope == void 0
            ? void 0
            : sdIsList(val.scope)
                ? val.scope.map(function (itm) {
                    return deserializeWorkflowFlowsTriggerScopeField(itm);
                })
                : [];
        return {
            type: type,
            triggerType: triggerType,
            scope: scope,
        };
    }
    function deserializeWorkflowFlowsOutcomesTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowFlowsOutcomesTypeField"',
            });
        }
        if (val == 'outcome') {
            return 'outcome';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsOutcomesActionTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowFlowsOutcomesActionTypeField"',
            });
        }
        if (val == 'add_metadata') {
            return 'add_metadata';
        }
        if (val == 'assign_task') {
            return 'assign_task';
        }
        if (val == 'copy_file') {
            return 'copy_file';
        }
        if (val == 'copy_folder') {
            return 'copy_folder';
        }
        if (val == 'create_folder') {
            return 'create_folder';
        }
        if (val == 'delete_file') {
            return 'delete_file';
        }
        if (val == 'delete_folder') {
            return 'delete_folder';
        }
        if (val == 'lock_file') {
            return 'lock_file';
        }
        if (val == 'move_file') {
            return 'move_file';
        }
        if (val == 'move_folder') {
            return 'move_folder';
        }
        if (val == 'remove_watermark_file') {
            return 'remove_watermark_file';
        }
        if (val == 'rename_folder') {
            return 'rename_folder';
        }
        if (val == 'restore_folder') {
            return 'restore_folder';
        }
        if (val == 'share_file') {
            return 'share_file';
        }
        if (val == 'share_folder') {
            return 'share_folder';
        }
        if (val == 'unlock_file') {
            return 'unlock_file';
        }
        if (val == 'upload_file') {
            return 'upload_file';
        }
        if (val == 'wait_for_task') {
            return 'wait_for_task';
        }
        if (val == 'watermark_file') {
            return 'watermark_file';
        }
        if (val == 'go_back_to_step') {
            return 'go_back_to_step';
        }
        if (val == 'apply_file_classification') {
            return 'apply_file_classification';
        }
        if (val == 'apply_folder_classification') {
            return 'apply_folder_classification';
        }
        if (val == 'send_notification') {
            return 'send_notification';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsOutcomesIfRejectedTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowFlowsOutcomesIfRejectedTypeField"',
            });
        }
        if (val == 'outcome') {
            return 'outcome';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsOutcomesIfRejectedActionTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "WorkflowFlowsOutcomesIfRejectedActionTypeField"',
            });
        }
        if (val == 'add_metadata') {
            return 'add_metadata';
        }
        if (val == 'assign_task') {
            return 'assign_task';
        }
        if (val == 'copy_file') {
            return 'copy_file';
        }
        if (val == 'copy_folder') {
            return 'copy_folder';
        }
        if (val == 'create_folder') {
            return 'create_folder';
        }
        if (val == 'delete_file') {
            return 'delete_file';
        }
        if (val == 'delete_folder') {
            return 'delete_folder';
        }
        if (val == 'lock_file') {
            return 'lock_file';
        }
        if (val == 'move_file') {
            return 'move_file';
        }
        if (val == 'move_folder') {
            return 'move_folder';
        }
        if (val == 'remove_watermark_file') {
            return 'remove_watermark_file';
        }
        if (val == 'rename_folder') {
            return 'rename_folder';
        }
        if (val == 'restore_folder') {
            return 'restore_folder';
        }
        if (val == 'share_file') {
            return 'share_file';
        }
        if (val == 'share_folder') {
            return 'share_folder';
        }
        if (val == 'unlock_file') {
            return 'unlock_file';
        }
        if (val == 'upload_file') {
            return 'upload_file';
        }
        if (val == 'wait_for_task') {
            return 'wait_for_task';
        }
        if (val == 'watermark_file') {
            return 'watermark_file';
        }
        if (val == 'go_back_to_step') {
            return 'go_back_to_step';
        }
        if (val == 'apply_file_classification') {
            return 'apply_file_classification';
        }
        if (val == 'apply_folder_classification') {
            return 'apply_folder_classification';
        }
        if (val == 'send_notification') {
            return 'send_notification';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeWorkflowFlowsOutcomesIfRejectedField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeWorkflowFlowsOutcomesIfRejectedTypeField(val.type);
        const name = val.name == void 0 ? void 0 : val.name;
        const actionType = val.action_type == void 0
            ? void 0
            : deserializeWorkflowFlowsOutcomesIfRejectedActionTypeField(val.action_type);
        return {
            id: id,
            type: type,
            name: name,
            actionType: actionType,
        };
    }
    function deserializeWorkflowFlowsOutcomesField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeWorkflowFlowsOutcomesTypeField(val.type);
        const name = val.name == void 0 ? void 0 : val.name;
        const actionType = val.action_type == void 0
            ? void 0
            : deserializeWorkflowFlowsOutcomesActionTypeField(val.action_type);
        const ifRejected = val.if_rejected == void 0
            ? void 0
            : sdIsList(val.if_rejected)
                ? val.if_rejected.map(function (itm) {
                    return deserializeWorkflowFlowsOutcomesIfRejectedField(itm);
                })
                : [];
        return {
            id: id,
            type: type,
            name: name,
            actionType: actionType,
            ifRejected: ifRejected,
        };
    }
    function deserializeWorkflowFlowsField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeWorkflowFlowsTypeField(val.type);
        const trigger = val.trigger == void 0
            ? void 0
            : deserializeWorkflowFlowsTriggerField(val.trigger);
        const outcomes = val.outcomes == void 0
            ? void 0
            : sdIsList(val.outcomes)
                ? val.outcomes.map(function (itm) {
                    return deserializeWorkflowFlowsOutcomesField(itm);
                })
                : [];
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
        return {
            id: id,
            type: type,
            trigger: trigger,
            outcomes: outcomes,
            createdAt: createdAt,
            createdBy: createdBy,
        };
    }
    function deserializeWorkflow(val) {
        const flows = val.flows == void 0
            ? void 0
            : sdIsList(val.flows)
                ? val.flows.map(function (itm) {
                    return deserializeWorkflowFlowsField(itm);
                })
                : [];
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0 ? void 0 : deserializeWorkflowMiniTypeField(val.type);
        const name = val.name == void 0 ? void 0 : val.name;
        const description = val.description == void 0 ? void 0 : val.description;
        const isEnabled = val.is_enabled == void 0 ? void 0 : val.is_enabled;
        return {
            flows: flows,
            id: id,
            type: type,
            name: name,
            description: description,
            isEnabled: isEnabled,
        };
    }
    function deserializeWorkflows(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeWorkflow(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeZipDownloadNameConflictsTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ZipDownloadNameConflictsTypeField"',
            });
        }
        if (val == 'file') {
            return 'file';
        }
        if (val == 'folder') {
            return 'folder';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeZipDownloadNameConflictsField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeZipDownloadNameConflictsTypeField(val.type);
        const originalName = val.original_name == void 0 ? void 0 : val.original_name;
        const downloadName = val.download_name == void 0 ? void 0 : val.download_name;
        return {
            id: id,
            type: type,
            originalName: originalName,
            downloadName: downloadName,
        };
    }
    function deserializeZipDownload(val) {
        const downloadUrl = val.download_url == void 0 ? void 0 : val.download_url;
        const statusUrl = val.status_url == void 0 ? void 0 : val.status_url;
        const expiresAt = val.expires_at == void 0 ? void 0 : val.expires_at;
        const nameConflicts = val.name_conflicts == void 0
            ? void 0
            : sdIsList(val.name_conflicts)
                ? val.name_conflicts.map(function (itm) {
                    return sdIsList(itm)
                        ? itm.map(function (itm) {
                            return deserializeZipDownloadNameConflictsField(itm);
                        })
                        : [];
                })
                : [];
        return {
            downloadUrl: downloadUrl,
            statusUrl: statusUrl,
            expiresAt: expiresAt,
            nameConflicts: nameConflicts,
        };
    }
    function deserializeZipDownloadStatusStateField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ZipDownloadStatusStateField"',
            });
        }
        if (val == 'in_progress') {
            return 'in_progress';
        }
        if (val == 'failed') {
            return 'failed';
        }
        if (val == 'succeeded') {
            return 'succeeded';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeZipDownloadStatus(val) {
        const totalFileCount = val.total_file_count == void 0 ? void 0 : val.total_file_count;
        const downloadedFileCount = val.downloaded_file_count == void 0 ? void 0 : val.downloaded_file_count;
        const skippedFileCount = val.skipped_file_count == void 0 ? void 0 : val.skipped_file_count;
        const skippedFolderCount = val.skipped_folder_count == void 0 ? void 0 : val.skipped_folder_count;
        const state = val.state == void 0
            ? void 0
            : deserializeZipDownloadStatusStateField(val.state);
        return {
            totalFileCount: totalFileCount,
            downloadedFileCount: downloadedFileCount,
            skippedFileCount: skippedFileCount,
            skippedFolderCount: skippedFolderCount,
            state: state,
        };
    }
    function serializeCompletionRuleVariableTypeField(val) {
        return val;
    }
    function serializeCompletionRuleVariableVariableTypeField(val) {
        return val;
    }
    function serializeCompletionRuleVariableVariableValueField(val) {
        return val;
    }
    function serializeCompletionRuleVariable(val) {
        return {
            ['type']: serializeCompletionRuleVariableTypeField(val.type),
            ['variable_type']: serializeCompletionRuleVariableVariableTypeField(val.variableType),
            ['variable_value']: serializeCompletionRuleVariableVariableValueField(val.variableValue),
        };
    }
    function serializeCollaboratorVariableTypeField(val) {
        return val;
    }
    function serializeCollaboratorVariableVariableTypeField(val) {
        return val;
    }
    function serializeCollaboratorVariableVariableValueTypeField(val) {
        return val;
    }
    function serializeCollaboratorVariableVariableValueField(val) {
        return {
            ['type']: serializeCollaboratorVariableVariableValueTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeCollaboratorVariable(val) {
        return {
            ['type']: serializeCollaboratorVariableTypeField(val.type),
            ['variable_type']: serializeCollaboratorVariableVariableTypeField(val.variableType),
            ['variable_value']: val.variableValue.map(function (item) {
                return serializeCollaboratorVariableVariableValueField(item);
            }),
        };
    }
    function serializeKeywordSkillCardTypeField(val) {
        return val;
    }
    function deserializeKeywordSkillCardTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "KeywordSkillCardTypeField"',
            });
        }
        if (val == 'skill_card') {
            return 'skill_card';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeKeywordSkillCardSkillCardTypeField(val) {
        return val;
    }
    function deserializeKeywordSkillCardSkillCardTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "KeywordSkillCardSkillCardTypeField"',
            });
        }
        if (val == 'keyword') {
            return 'keyword';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeKeywordSkillCardSkillCardTitleField(val) {
        return {
            ['code']: val.code == void 0 ? void 0 : val.code,
            ['message']: val.message,
        };
    }
    function deserializeKeywordSkillCardSkillCardTitleField(val) {
        const code = val.code == void 0 ? void 0 : val.code;
        const message = val.message;
        return {
            code: code,
            message: message,
        };
    }
    function serializeKeywordSkillCardSkillTypeField(val) {
        return val;
    }
    function deserializeKeywordSkillCardSkillTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "KeywordSkillCardSkillTypeField"',
            });
        }
        if (val == 'service') {
            return 'service';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeKeywordSkillCardSkillField(val) {
        return {
            ['type']: serializeKeywordSkillCardSkillTypeField(val.type),
            ['id']: val.id,
        };
    }
    function deserializeKeywordSkillCardSkillField(val) {
        const type = deserializeKeywordSkillCardSkillTypeField(val.type);
        const id = val.id;
        return { type: type, id: id };
    }
    function serializeKeywordSkillCardInvocationTypeField(val) {
        return val;
    }
    function deserializeKeywordSkillCardInvocationTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "KeywordSkillCardInvocationTypeField"',
            });
        }
        if (val == 'skill_invocation') {
            return 'skill_invocation';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeKeywordSkillCardInvocationField(val) {
        return {
            ['type']: serializeKeywordSkillCardInvocationTypeField(val.type),
            ['id']: val.id,
        };
    }
    function deserializeKeywordSkillCardInvocationField(val) {
        const type = deserializeKeywordSkillCardInvocationTypeField(val.type);
        const id = val.id;
        return { type: type, id: id };
    }
    function serializeKeywordSkillCardEntriesField(val) {
        return { ['text']: val.text == void 0 ? void 0 : val.text };
    }
    function deserializeKeywordSkillCardEntriesField(val) {
        const text = val.text == void 0 ? void 0 : val.text;
        return { text: text };
    }
    function serializeKeywordSkillCard(val) {
        return {
            ['created_at']: val.createdAt == void 0 ? void 0 : val.createdAt,
            ['type']: serializeKeywordSkillCardTypeField(val.type),
            ['skill_card_type']: serializeKeywordSkillCardSkillCardTypeField(val.skillCardType),
            ['skill_card_title']: val.skillCardTitle == void 0
                ? void 0
                : serializeKeywordSkillCardSkillCardTitleField(val.skillCardTitle),
            ['skill']: serializeKeywordSkillCardSkillField(val.skill),
            ['invocation']: serializeKeywordSkillCardInvocationField(val.invocation),
            ['entries']: val.entries.map(function (item) {
                return serializeKeywordSkillCardEntriesField(item);
            }),
        };
    }
    function deserializeKeywordSkillCard(val) {
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const type = deserializeKeywordSkillCardTypeField(val.type);
        const skillCardType = deserializeKeywordSkillCardSkillCardTypeField(val.skill_card_type);
        const skillCardTitle = val.skill_card_title == void 0
            ? void 0
            : deserializeKeywordSkillCardSkillCardTitleField(val.skill_card_title);
        const skill = deserializeKeywordSkillCardSkillField(val.skill);
        const invocation = deserializeKeywordSkillCardInvocationField(val.invocation);
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeKeywordSkillCardEntriesField(itm);
            })
            : [];
        return {
            createdAt: createdAt,
            type: type,
            skillCardType: skillCardType,
            skillCardTitle: skillCardTitle,
            skill: skill,
            invocation: invocation,
            entries: entries,
        };
    }
    function serializeIntegrationMappingSlackOptions(val) {
        return {
            ['is_access_management_disabled']: val.isAccessManagementDisabled == void 0
                ? void 0
                : val.isAccessManagementDisabled,
        };
    }
    function deserializeIntegrationMappingSlackOptions(val) {
        const isAccessManagementDisabled = val.is_access_management_disabled == void 0
            ? void 0
            : val.is_access_management_disabled;
        return {
            isAccessManagementDisabled: isAccessManagementDisabled,
        };
    }
    function serializeIntegrationMappingPartnerItemSlackTypeField(val) {
        return val;
    }
    function deserializeIntegrationMappingPartnerItemSlackTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "IntegrationMappingPartnerItemSlackTypeField"',
            });
        }
        if (val == 'channel') {
            return 'channel';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeIntegrationMappingPartnerItemSlack(val) {
        return {
            ['type']: serializeIntegrationMappingPartnerItemSlackTypeField(val.type),
            ['id']: val.id,
            ['slack_workspace_id']: val.slackWorkspaceId == void 0 ? void 0 : val.slackWorkspaceId,
            ['slack_org_id']: val.slackOrgId == void 0 ? void 0 : val.slackOrgId,
        };
    }
    function deserializeIntegrationMappingPartnerItemSlack(val) {
        const type = deserializeIntegrationMappingPartnerItemSlackTypeField(val.type);
        const id = val.id;
        const slackWorkspaceId = val.slack_workspace_id == void 0 ? void 0 : val.slack_workspace_id;
        const slackOrgId = val.slack_org_id == void 0 ? void 0 : val.slack_org_id;
        return {
            type: type,
            id: id,
            slackWorkspaceId: slackWorkspaceId,
            slackOrgId: slackOrgId,
        };
    }
    function deserializeIntegrationMappingTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "IntegrationMappingTypeField"',
            });
        }
        if (val == 'integration_mapping') {
            return 'integration_mapping';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeIntegrationMapping(val) {
        const type = deserializeIntegrationMappingTypeField(val.type);
        const partnerItem = deserializeIntegrationMappingPartnerItemSlack(val.partner_item);
        const boxItem = deserializeFolderMini(val.box_item);
        const isManuallyCreated = val.is_manually_created == void 0 ? void 0 : val.is_manually_created;
        const options = val.options == void 0
            ? void 0
            : deserializeIntegrationMappingSlackOptions(val.options);
        const createdBy = val.created_by == void 0
            ? void 0
            : deserializeUserIntegrationMappings(val.created_by);
        const modifiedBy = val.modified_by == void 0
            ? void 0
            : deserializeUserIntegrationMappings(val.modified_by);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const id = val.id == void 0 ? void 0 : val.id;
        const integrationType = val.integration_type == void 0
            ? void 0
            : deserializeIntegrationMappingBaseIntegrationTypeField(val.integration_type);
        return {
            type: type,
            partnerItem: partnerItem,
            boxItem: boxItem,
            isManuallyCreated: isManuallyCreated,
            options: options,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            id: id,
            integrationType: integrationType,
        };
    }
    function deserializeIntegrationMappings(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeIntegrationMapping(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            entries: entries,
        };
    }
    function serializeIntegrationMappingBoxItemSlackTypeField(val) {
        return val;
    }
    function serializeIntegrationMappingBoxItemSlack(val) {
        return {
            ['type']: serializeIntegrationMappingBoxItemSlackTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeIntegrationMappingSlackCreateRequest(val) {
        return {
            ['partner_item']: serializeIntegrationMappingPartnerItemSlack(val.partnerItem),
            ['box_item']: serializeIntegrationMappingBoxItemSlack(val.boxItem),
            ['options']: val.options == void 0
                ? void 0
                : serializeIntegrationMappingSlackOptions(val.options),
        };
    }
    function serializeRoleVariableTypeField(val) {
        return val;
    }
    function serializeRoleVariableVariableTypeField(val) {
        return val;
    }
    function serializeRoleVariableVariableValueField(val) {
        return val;
    }
    function serializeRoleVariable(val) {
        return {
            ['type']: serializeRoleVariableTypeField(val.type),
            ['variable_type']: serializeRoleVariableVariableTypeField(val.variableType),
            ['variable_value']: serializeRoleVariableVariableValueField(val.variableValue),
        };
    }
    function serializeOutcome(val) {
        return {
            ['id']: val.id,
            ['collaborators']: val.collaborators == void 0
                ? void 0
                : serializeCollaboratorVariable(val.collaborators),
            ['completion_rule']: val.completionRule == void 0
                ? void 0
                : serializeCompletionRuleVariable(val.completionRule),
            ['file_collaborator_role']: val.fileCollaboratorRole == void 0
                ? void 0
                : serializeRoleVariable(val.fileCollaboratorRole),
            ['task_collaborators']: val.taskCollaborators == void 0
                ? void 0
                : serializeCollaboratorVariable(val.taskCollaborators),
            ['role']: val.role == void 0 ? void 0 : serializeRoleVariable(val.role),
        };
    }
    function serializeTimelineSkillCardTypeField(val) {
        return val;
    }
    function deserializeTimelineSkillCardTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TimelineSkillCardTypeField"',
            });
        }
        if (val == 'skill_card') {
            return 'skill_card';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeTimelineSkillCardSkillCardTypeField(val) {
        return val;
    }
    function deserializeTimelineSkillCardSkillCardTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TimelineSkillCardSkillCardTypeField"',
            });
        }
        if (val == 'timeline') {
            return 'timeline';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeTimelineSkillCardSkillCardTitleField(val) {
        return {
            ['code']: val.code == void 0 ? void 0 : val.code,
            ['message']: val.message,
        };
    }
    function deserializeTimelineSkillCardSkillCardTitleField(val) {
        const code = val.code == void 0 ? void 0 : val.code;
        const message = val.message;
        return {
            code: code,
            message: message,
        };
    }
    function serializeTimelineSkillCardSkillTypeField(val) {
        return val;
    }
    function deserializeTimelineSkillCardSkillTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TimelineSkillCardSkillTypeField"',
            });
        }
        if (val == 'service') {
            return 'service';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeTimelineSkillCardSkillField(val) {
        return {
            ['type']: serializeTimelineSkillCardSkillTypeField(val.type),
            ['id']: val.id,
        };
    }
    function deserializeTimelineSkillCardSkillField(val) {
        const type = deserializeTimelineSkillCardSkillTypeField(val.type);
        const id = val.id;
        return { type: type, id: id };
    }
    function serializeTimelineSkillCardInvocationTypeField(val) {
        return val;
    }
    function deserializeTimelineSkillCardInvocationTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TimelineSkillCardInvocationTypeField"',
            });
        }
        if (val == 'skill_invocation') {
            return 'skill_invocation';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeTimelineSkillCardInvocationField(val) {
        return {
            ['type']: serializeTimelineSkillCardInvocationTypeField(val.type),
            ['id']: val.id,
        };
    }
    function deserializeTimelineSkillCardInvocationField(val) {
        const type = deserializeTimelineSkillCardInvocationTypeField(val.type);
        const id = val.id;
        return { type: type, id: id };
    }
    function serializeTimelineSkillCardEntriesAppearsField(val) {
        return {
            ['start']: val.start == void 0 ? void 0 : val.start,
            ['end']: val.end == void 0 ? void 0 : val.end,
        };
    }
    function deserializeTimelineSkillCardEntriesAppearsField(val) {
        const start = val.start == void 0 ? void 0 : val.start;
        const end = val.end == void 0 ? void 0 : val.end;
        return {
            start: start,
            end: end,
        };
    }
    function serializeTimelineSkillCardEntriesField(val) {
        return {
            ['text']: val.text == void 0 ? void 0 : val.text,
            ['appears']: val.appears == void 0
                ? void 0
                : val.appears.map(function (item) {
                    return serializeTimelineSkillCardEntriesAppearsField(item);
                }),
            ['image_url']: val.imageUrl == void 0 ? void 0 : val.imageUrl,
        };
    }
    function deserializeTimelineSkillCardEntriesField(val) {
        const text = val.text == void 0 ? void 0 : val.text;
        const appears = val.appears == void 0
            ? void 0
            : sdIsList(val.appears)
                ? val.appears.map(function (itm) {
                    return deserializeTimelineSkillCardEntriesAppearsField(itm);
                })
                : [];
        const imageUrl = val.image_url == void 0 ? void 0 : val.image_url;
        return {
            text: text,
            appears: appears,
            imageUrl: imageUrl,
        };
    }
    function serializeTimelineSkillCard(val) {
        return {
            ['created_at']: val.createdAt == void 0 ? void 0 : val.createdAt,
            ['type']: serializeTimelineSkillCardTypeField(val.type),
            ['skill_card_type']: serializeTimelineSkillCardSkillCardTypeField(val.skillCardType),
            ['skill_card_title']: val.skillCardTitle == void 0
                ? void 0
                : serializeTimelineSkillCardSkillCardTitleField(val.skillCardTitle),
            ['skill']: serializeTimelineSkillCardSkillField(val.skill),
            ['invocation']: serializeTimelineSkillCardInvocationField(val.invocation),
            ['duration']: val.duration == void 0 ? void 0 : val.duration,
            ['entries']: val.entries.map(function (item) {
                return serializeTimelineSkillCardEntriesField(item);
            }),
        };
    }
    function deserializeTimelineSkillCard(val) {
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const type = deserializeTimelineSkillCardTypeField(val.type);
        const skillCardType = deserializeTimelineSkillCardSkillCardTypeField(val.skill_card_type);
        const skillCardTitle = val.skill_card_title == void 0
            ? void 0
            : deserializeTimelineSkillCardSkillCardTitleField(val.skill_card_title);
        const skill = deserializeTimelineSkillCardSkillField(val.skill);
        const invocation = deserializeTimelineSkillCardInvocationField(val.invocation);
        const duration = val.duration == void 0 ? void 0 : val.duration;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeTimelineSkillCardEntriesField(itm);
            })
            : [];
        return {
            createdAt: createdAt,
            type: type,
            skillCardType: skillCardType,
            skillCardTitle: skillCardTitle,
            skill: skill,
            invocation: invocation,
            duration: duration,
            entries: entries,
        };
    }
    function serializeTranscriptSkillCardTypeField(val) {
        return val;
    }
    function deserializeTranscriptSkillCardTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TranscriptSkillCardTypeField"',
            });
        }
        if (val == 'skill_card') {
            return 'skill_card';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeTranscriptSkillCardSkillCardTypeField(val) {
        return val;
    }
    function deserializeTranscriptSkillCardSkillCardTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TranscriptSkillCardSkillCardTypeField"',
            });
        }
        if (val == 'transcript') {
            return 'transcript';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeTranscriptSkillCardSkillCardTitleField(val) {
        return {
            ['code']: val.code == void 0 ? void 0 : val.code,
            ['message']: val.message,
        };
    }
    function deserializeTranscriptSkillCardSkillCardTitleField(val) {
        const code = val.code == void 0 ? void 0 : val.code;
        const message = val.message;
        return {
            code: code,
            message: message,
        };
    }
    function serializeTranscriptSkillCardSkillTypeField(val) {
        return val;
    }
    function deserializeTranscriptSkillCardSkillTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TranscriptSkillCardSkillTypeField"',
            });
        }
        if (val == 'service') {
            return 'service';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeTranscriptSkillCardSkillField(val) {
        return {
            ['type']: serializeTranscriptSkillCardSkillTypeField(val.type),
            ['id']: val.id,
        };
    }
    function deserializeTranscriptSkillCardSkillField(val) {
        const type = deserializeTranscriptSkillCardSkillTypeField(val.type);
        const id = val.id;
        return { type: type, id: id };
    }
    function serializeTranscriptSkillCardInvocationTypeField(val) {
        return val;
    }
    function deserializeTranscriptSkillCardInvocationTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TranscriptSkillCardInvocationTypeField"',
            });
        }
        if (val == 'skill_invocation') {
            return 'skill_invocation';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeTranscriptSkillCardInvocationField(val) {
        return {
            ['type']: serializeTranscriptSkillCardInvocationTypeField(val.type),
            ['id']: val.id,
        };
    }
    function deserializeTranscriptSkillCardInvocationField(val) {
        const type = deserializeTranscriptSkillCardInvocationTypeField(val.type);
        const id = val.id;
        return { type: type, id: id };
    }
    function serializeTranscriptSkillCardEntriesAppearsField(val) {
        return { ['start']: val.start == void 0 ? void 0 : val.start };
    }
    function deserializeTranscriptSkillCardEntriesAppearsField(val) {
        const start = val.start == void 0 ? void 0 : val.start;
        return { start: start };
    }
    function serializeTranscriptSkillCardEntriesField(val) {
        return {
            ['text']: val.text == void 0 ? void 0 : val.text,
            ['appears']: val.appears == void 0
                ? void 0
                : val.appears.map(function (item) {
                    return serializeTranscriptSkillCardEntriesAppearsField(item);
                }),
        };
    }
    function deserializeTranscriptSkillCardEntriesField(val) {
        const text = val.text == void 0 ? void 0 : val.text;
        const appears = val.appears == void 0
            ? void 0
            : sdIsList(val.appears)
                ? val.appears.map(function (itm) {
                    return deserializeTranscriptSkillCardEntriesAppearsField(itm);
                })
                : [];
        return {
            text: text,
            appears: appears,
        };
    }
    function serializeTranscriptSkillCard(val) {
        return {
            ['created_at']: val.createdAt == void 0 ? void 0 : val.createdAt,
            ['type']: serializeTranscriptSkillCardTypeField(val.type),
            ['skill_card_type']: serializeTranscriptSkillCardSkillCardTypeField(val.skillCardType),
            ['skill_card_title']: val.skillCardTitle == void 0
                ? void 0
                : serializeTranscriptSkillCardSkillCardTitleField(val.skillCardTitle),
            ['skill']: serializeTranscriptSkillCardSkillField(val.skill),
            ['invocation']: serializeTranscriptSkillCardInvocationField(val.invocation),
            ['duration']: val.duration == void 0 ? void 0 : val.duration,
            ['entries']: val.entries.map(function (item) {
                return serializeTranscriptSkillCardEntriesField(item);
            }),
        };
    }
    function deserializeTranscriptSkillCard(val) {
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const type = deserializeTranscriptSkillCardTypeField(val.type);
        const skillCardType = deserializeTranscriptSkillCardSkillCardTypeField(val.skill_card_type);
        const skillCardTitle = val.skill_card_title == void 0
            ? void 0
            : deserializeTranscriptSkillCardSkillCardTitleField(val.skill_card_title);
        const skill = deserializeTranscriptSkillCardSkillField(val.skill);
        const invocation = deserializeTranscriptSkillCardInvocationField(val.invocation);
        const duration = val.duration == void 0 ? void 0 : val.duration;
        const entries = sdIsList(val.entries)
            ? val.entries.map(function (itm) {
                return deserializeTranscriptSkillCardEntriesField(itm);
            })
            : [];
        return {
            createdAt: createdAt,
            type: type,
            skillCardType: skillCardType,
            skillCardTitle: skillCardTitle,
            skill: skill,
            invocation: invocation,
            duration: duration,
            entries: entries,
        };
    }
    function serializeStatusSkillCardTypeField(val) {
        return val;
    }
    function deserializeStatusSkillCardTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "StatusSkillCardTypeField"',
            });
        }
        if (val == 'skill_card') {
            return 'skill_card';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeStatusSkillCardSkillCardTypeField(val) {
        return val;
    }
    function deserializeStatusSkillCardSkillCardTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "StatusSkillCardSkillCardTypeField"',
            });
        }
        if (val == 'status') {
            return 'status';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeStatusSkillCardSkillCardTitleField(val) {
        return {
            ['code']: val.code == void 0 ? void 0 : val.code,
            ['message']: val.message,
        };
    }
    function deserializeStatusSkillCardSkillCardTitleField(val) {
        const code = val.code == void 0 ? void 0 : val.code;
        const message = val.message;
        return {
            code: code,
            message: message,
        };
    }
    function serializeStatusSkillCardStatusCodeField(val) {
        return val;
    }
    function deserializeStatusSkillCardStatusCodeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "StatusSkillCardStatusCodeField"',
            });
        }
        if (val == 'invoked') {
            return 'invoked';
        }
        if (val == 'processing') {
            return 'processing';
        }
        if (val == 'success') {
            return 'success';
        }
        if (val == 'transient_failure') {
            return 'transient_failure';
        }
        if (val == 'permanent_failure') {
            return 'permanent_failure';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeStatusSkillCardStatusField(val) {
        return {
            ['code']: serializeStatusSkillCardStatusCodeField(val.code),
            ['message']: val.message == void 0 ? void 0 : val.message,
        };
    }
    function deserializeStatusSkillCardStatusField(val) {
        const code = deserializeStatusSkillCardStatusCodeField(val.code);
        const message = val.message == void 0 ? void 0 : val.message;
        return { code: code, message: message };
    }
    function serializeStatusSkillCardSkillTypeField(val) {
        return val;
    }
    function deserializeStatusSkillCardSkillTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "StatusSkillCardSkillTypeField"',
            });
        }
        if (val == 'service') {
            return 'service';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeStatusSkillCardSkillField(val) {
        return {
            ['type']: serializeStatusSkillCardSkillTypeField(val.type),
            ['id']: val.id,
        };
    }
    function deserializeStatusSkillCardSkillField(val) {
        const type = deserializeStatusSkillCardSkillTypeField(val.type);
        const id = val.id;
        return { type: type, id: id };
    }
    function serializeStatusSkillCardInvocationTypeField(val) {
        return val;
    }
    function deserializeStatusSkillCardInvocationTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "StatusSkillCardInvocationTypeField"',
            });
        }
        if (val == 'skill_invocation') {
            return 'skill_invocation';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeStatusSkillCardInvocationField(val) {
        return {
            ['type']: serializeStatusSkillCardInvocationTypeField(val.type),
            ['id']: val.id,
        };
    }
    function deserializeStatusSkillCardInvocationField(val) {
        const type = deserializeStatusSkillCardInvocationTypeField(val.type);
        const id = val.id;
        return { type: type, id: id };
    }
    function serializeStatusSkillCard(val) {
        return {
            ['created_at']: val.createdAt == void 0 ? void 0 : val.createdAt,
            ['type']: serializeStatusSkillCardTypeField(val.type),
            ['skill_card_type']: serializeStatusSkillCardSkillCardTypeField(val.skillCardType),
            ['skill_card_title']: val.skillCardTitle == void 0
                ? void 0
                : serializeStatusSkillCardSkillCardTitleField(val.skillCardTitle),
            ['status']: serializeStatusSkillCardStatusField(val.status),
            ['skill']: serializeStatusSkillCardSkillField(val.skill),
            ['invocation']: serializeStatusSkillCardInvocationField(val.invocation),
        };
    }
    function deserializeStatusSkillCard(val) {
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const type = deserializeStatusSkillCardTypeField(val.type);
        const skillCardType = deserializeStatusSkillCardSkillCardTypeField(val.skill_card_type);
        const skillCardTitle = val.skill_card_title == void 0
            ? void 0
            : deserializeStatusSkillCardSkillCardTitleField(val.skill_card_title);
        const status = deserializeStatusSkillCardStatusField(val.status);
        const skill = deserializeStatusSkillCardSkillField(val.skill);
        const invocation = deserializeStatusSkillCardInvocationField(val.invocation);
        return {
            createdAt: createdAt,
            type: type,
            skillCardType: skillCardType,
            skillCardTitle: skillCardTitle,
            status: status,
            skill: skill,
            invocation: invocation,
        };
    }
    function serializeKeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard(val) {
        if (val.skillCardType == 'keyword') {
            return serializeKeywordSkillCard(val);
        }
        if (val.skillCardType == 'status') {
            return serializeStatusSkillCard(val);
        }
        if (val.skillCardType == 'timeline') {
            return serializeTimelineSkillCard(val);
        }
        if (val.skillCardType == 'transcript') {
            return serializeTranscriptSkillCard(val);
        }
        throw new BoxSdkError({ message: 'unknown type' });
    }
    function deserializeKeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard(val) {
        if (!sdIsMap(val)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "KeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard"',
            });
        }
        if (val.skill_card_type == 'keyword') {
            return deserializeKeywordSkillCard(val);
        }
        if (val.skill_card_type == 'status') {
            return deserializeStatusSkillCard(val);
        }
        if (val.skill_card_type == 'timeline') {
            return deserializeTimelineSkillCard(val);
        }
        if (val.skill_card_type == 'transcript') {
            return deserializeTranscriptSkillCard(val);
        }
        throw new BoxSdkError({ message: 'unknown type' });
    }
    function deserializeSkillCardsMetadata(val) {
        const canEdit = val.$canEdit == void 0 ? void 0 : val.$canEdit;
        const id = val.$id == void 0 ? void 0 : val.$id;
        const parent = val.$parent == void 0 ? void 0 : val.$parent;
        const scope = val.$scope == void 0 ? void 0 : val.$scope;
        const template = val.$template == void 0 ? void 0 : val.$template;
        const type = val.$type == void 0 ? void 0 : val.$type;
        const typeVersion = val.$typeVersion == void 0 ? void 0 : val.$typeVersion;
        const version = val.$version == void 0 ? void 0 : val.$version;
        const cards = val.cards == void 0
            ? void 0
            : sdIsList(val.cards)
                ? val.cards.map(function (itm) {
                    return deserializeKeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard(itm);
                })
                : [];
        return {
            canEdit: canEdit,
            id: id,
            parent: parent,
            scope: scope,
            template: template,
            type: type,
            typeVersion: typeVersion,
            version: version,
            cards: cards,
        };
    }
    function serializeSignRequestCreateSignerRoleField(val) {
        return val;
    }
    function deserializeSignRequestCreateSignerRoleField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SignRequestCreateSignerRoleField"',
            });
        }
        if (val == 'signer') {
            return 'signer';
        }
        if (val == 'approver') {
            return 'approver';
        }
        if (val == 'final_copy_reader') {
            return 'final_copy_reader';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeSignRequestCreateSigner(val) {
        return {
            ['email']: val.email == void 0 ? void 0 : val.email,
            ['role']: val.role == void 0
                ? void 0
                : serializeSignRequestCreateSignerRoleField(val.role),
            ['is_in_person']: val.isInPerson == void 0 ? void 0 : val.isInPerson,
            ['order']: val.order == void 0 ? void 0 : val.order,
            ['embed_url_external_user_id']: val.embedUrlExternalUserId == void 0
                ? void 0
                : val.embedUrlExternalUserId,
            ['redirect_url']: val.redirectUrl == void 0 ? void 0 : val.redirectUrl,
            ['declined_redirect_url']: val.declinedRedirectUrl == void 0 ? void 0 : val.declinedRedirectUrl,
            ['login_required']: val.loginRequired == void 0 ? void 0 : val.loginRequired,
            ['verification_phone_number']: val.verificationPhoneNumber == void 0
                ? void 0
                : val.verificationPhoneNumber,
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['signer_group_id']: val.signerGroupId == void 0 ? void 0 : val.signerGroupId,
        };
    }
    function serializeSignRequestPrefillTag(val) {
        return {
            ['document_tag_id']: val.documentTagId == void 0 ? void 0 : val.documentTagId,
            ['text_value']: val.textValue == void 0 ? void 0 : val.textValue,
            ['checkbox_value']: val.checkboxValue == void 0 ? void 0 : val.checkboxValue,
            ['date_value']: val.dateValue == void 0 ? void 0 : val.dateValue,
        };
    }
    function deserializeSignRequestPrefillTag(val) {
        const documentTagId = val.document_tag_id == void 0 ? void 0 : val.document_tag_id;
        const textValue = val.text_value == void 0 ? void 0 : val.text_value;
        const checkboxValue = val.checkbox_value == void 0 ? void 0 : val.checkbox_value;
        const dateValue = val.date_value == void 0 ? void 0 : val.date_value;
        return {
            documentTagId: documentTagId,
            textValue: textValue,
            checkboxValue: checkboxValue,
            dateValue: dateValue,
        };
    }
    function deserializeSignRequestSignerInputTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SignRequestSignerInputTypeField"',
            });
        }
        if (val == 'signature') {
            return 'signature';
        }
        if (val == 'date') {
            return 'date';
        }
        if (val == 'text') {
            return 'text';
        }
        if (val == 'checkbox') {
            return 'checkbox';
        }
        if (val == 'radio') {
            return 'radio';
        }
        if (val == 'dropdown') {
            return 'dropdown';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSignRequestSignerInputContentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SignRequestSignerInputContentTypeField"',
            });
        }
        if (val == 'signature') {
            return 'signature';
        }
        if (val == 'initial') {
            return 'initial';
        }
        if (val == 'stamp') {
            return 'stamp';
        }
        if (val == 'date') {
            return 'date';
        }
        if (val == 'checkbox') {
            return 'checkbox';
        }
        if (val == 'text') {
            return 'text';
        }
        if (val == 'full_name') {
            return 'full_name';
        }
        if (val == 'first_name') {
            return 'first_name';
        }
        if (val == 'last_name') {
            return 'last_name';
        }
        if (val == 'company') {
            return 'company';
        }
        if (val == 'title') {
            return 'title';
        }
        if (val == 'email') {
            return 'email';
        }
        if (val == 'attachment') {
            return 'attachment';
        }
        if (val == 'radio') {
            return 'radio';
        }
        if (val == 'dropdown') {
            return 'dropdown';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSignRequestSignerInput(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeSignRequestSignerInputTypeField(val.type);
        const contentType = val.content_type == void 0
            ? void 0
            : deserializeSignRequestSignerInputContentTypeField(val.content_type);
        const pageIndex = val.page_index;
        const readOnly = val.read_only == void 0 ? void 0 : val.read_only;
        const documentTagId = val.document_tag_id == void 0 ? void 0 : val.document_tag_id;
        const textValue = val.text_value == void 0 ? void 0 : val.text_value;
        const checkboxValue = val.checkbox_value == void 0 ? void 0 : val.checkbox_value;
        const dateValue = val.date_value == void 0 ? void 0 : val.date_value;
        return {
            type: type,
            contentType: contentType,
            pageIndex: pageIndex,
            readOnly: readOnly,
            documentTagId: documentTagId,
            textValue: textValue,
            checkboxValue: checkboxValue,
            dateValue: dateValue,
        };
    }
    function deserializeSignRequestSignerSignerDecisionTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SignRequestSignerSignerDecisionTypeField"',
            });
        }
        if (val == 'signed') {
            return 'signed';
        }
        if (val == 'declined') {
            return 'declined';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSignRequestSignerSignerDecisionField(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeSignRequestSignerSignerDecisionTypeField(val.type);
        const finalizedAt = val.finalized_at == void 0 ? void 0 : val.finalized_at;
        const additionalInfo = val.additional_info == void 0 ? void 0 : val.additional_info;
        return {
            type: type,
            finalizedAt: finalizedAt,
            additionalInfo: additionalInfo,
        };
    }
    function deserializeSignRequestSigner(val) {
        const hasViewedDocument = val.has_viewed_document == void 0 ? void 0 : val.has_viewed_document;
        const signerDecision = val.signer_decision == void 0
            ? void 0
            : deserializeSignRequestSignerSignerDecisionField(val.signer_decision);
        const inputs = val.inputs == void 0
            ? void 0
            : sdIsList(val.inputs)
                ? val.inputs.map(function (itm) {
                    return deserializeSignRequestSignerInput(itm);
                })
                : [];
        const embedUrl = val.embed_url == void 0 ? void 0 : val.embed_url;
        const iframeableEmbedUrl = val.iframeable_embed_url == void 0 ? void 0 : val.iframeable_embed_url;
        const email = val.email == void 0 ? void 0 : val.email;
        const role = val.role == void 0
            ? void 0
            : deserializeSignRequestCreateSignerRoleField(val.role);
        const isInPerson = val.is_in_person == void 0 ? void 0 : val.is_in_person;
        const order = val.order == void 0 ? void 0 : val.order;
        const embedUrlExternalUserId = val.embed_url_external_user_id == void 0
            ? void 0
            : val.embed_url_external_user_id;
        const redirectUrl = val.redirect_url == void 0 ? void 0 : val.redirect_url;
        const declinedRedirectUrl = val.declined_redirect_url == void 0 ? void 0 : val.declined_redirect_url;
        const loginRequired = val.login_required == void 0 ? void 0 : val.login_required;
        const verificationPhoneNumber = val.verification_phone_number == void 0
            ? void 0
            : val.verification_phone_number;
        const password = val.password == void 0 ? void 0 : val.password;
        const signerGroupId = val.signer_group_id == void 0 ? void 0 : val.signer_group_id;
        return {
            hasViewedDocument: hasViewedDocument,
            signerDecision: signerDecision,
            inputs: inputs,
            embedUrl: embedUrl,
            iframeableEmbedUrl: iframeableEmbedUrl,
            email: email,
            role: role,
            isInPerson: isInPerson,
            order: order,
            embedUrlExternalUserId: embedUrlExternalUserId,
            redirectUrl: redirectUrl,
            declinedRedirectUrl: declinedRedirectUrl,
            loginRequired: loginRequired,
            verificationPhoneNumber: verificationPhoneNumber,
            password: password,
            signerGroupId: signerGroupId,
        };
    }
    function serializeSignRequestBase(val) {
        return {
            ['is_document_preparation_needed']: val.isDocumentPreparationNeeded == void 0
                ? void 0
                : val.isDocumentPreparationNeeded,
            ['redirect_url']: val.redirectUrl == void 0 ? void 0 : val.redirectUrl,
            ['declined_redirect_url']: val.declinedRedirectUrl == void 0 ? void 0 : val.declinedRedirectUrl,
            ['are_text_signatures_enabled']: val.areTextSignaturesEnabled == void 0
                ? void 0
                : val.areTextSignaturesEnabled,
            ['email_subject']: val.emailSubject == void 0 ? void 0 : val.emailSubject,
            ['email_message']: val.emailMessage == void 0 ? void 0 : val.emailMessage,
            ['are_reminders_enabled']: val.areRemindersEnabled == void 0 ? void 0 : val.areRemindersEnabled,
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['prefill_tags']: val.prefillTags == void 0
                ? void 0
                : val.prefillTags.map(function (item) {
                    return serializeSignRequestPrefillTag(item);
                }),
            ['days_valid']: val.daysValid == void 0 ? void 0 : val.daysValid,
            ['external_id']: val.externalId == void 0 ? void 0 : val.externalId,
            ['is_phone_verification_required_to_view']: val.isPhoneVerificationRequiredToView == void 0
                ? void 0
                : val.isPhoneVerificationRequiredToView,
            ['template_id']: val.templateId == void 0 ? void 0 : val.templateId,
        };
    }
    function deserializeSignRequestTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SignRequestTypeField"',
            });
        }
        if (val == 'sign-request') {
            return 'sign-request';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSignRequestStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SignRequestStatusField"',
            });
        }
        if (val == 'converting') {
            return 'converting';
        }
        if (val == 'created') {
            return 'created';
        }
        if (val == 'sent') {
            return 'sent';
        }
        if (val == 'viewed') {
            return 'viewed';
        }
        if (val == 'signed') {
            return 'signed';
        }
        if (val == 'cancelled') {
            return 'cancelled';
        }
        if (val == 'declined') {
            return 'declined';
        }
        if (val == 'error_converting') {
            return 'error_converting';
        }
        if (val == 'error_sending') {
            return 'error_sending';
        }
        if (val == 'expired') {
            return 'expired';
        }
        if (val == 'finalizing') {
            return 'finalizing';
        }
        if (val == 'error_finalizing') {
            return 'error_finalizing';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSignRequestSignFilesField(val) {
        const files = val.files == void 0
            ? void 0
            : sdIsList(val.files)
                ? val.files.map(function (itm) {
                    return deserializeFileMini(itm);
                })
                : [];
        const isReadyForDownload = val.is_ready_for_download == void 0 ? void 0 : val.is_ready_for_download;
        return {
            files: files,
            isReadyForDownload: isReadyForDownload,
        };
    }
    function deserializeSignRequest(val) {
        const type = val.type == void 0 ? void 0 : deserializeSignRequestTypeField(val.type);
        const sourceFiles = val.source_files == void 0
            ? void 0
            : sdIsList(val.source_files)
                ? val.source_files.map(function (itm) {
                    return deserializeFileBase(itm);
                })
                : [];
        const signers = val.signers == void 0
            ? void 0
            : sdIsList(val.signers)
                ? val.signers.map(function (itm) {
                    return deserializeSignRequestSigner(itm);
                })
                : [];
        const signatureColor = val.signature_color == void 0 ? void 0 : val.signature_color;
        const id = val.id == void 0 ? void 0 : val.id;
        const prepareUrl = val.prepare_url == void 0 ? void 0 : val.prepare_url;
        const signingLog = val.signing_log == void 0 ? void 0 : deserializeFileMini(val.signing_log);
        const status = val.status == void 0
            ? void 0
            : deserializeSignRequestStatusField(val.status);
        const signFiles = val.sign_files == void 0
            ? void 0
            : deserializeSignRequestSignFilesField(val.sign_files);
        const autoExpireAt = val.auto_expire_at == void 0 ? void 0 : val.auto_expire_at;
        const parentFolder = val.parent_folder == void 0
            ? void 0
            : deserializeFolderMini(val.parent_folder);
        const isDocumentPreparationNeeded = val.is_document_preparation_needed == void 0
            ? void 0
            : val.is_document_preparation_needed;
        const redirectUrl = val.redirect_url == void 0 ? void 0 : val.redirect_url;
        const declinedRedirectUrl = val.declined_redirect_url == void 0 ? void 0 : val.declined_redirect_url;
        const areTextSignaturesEnabled = val.are_text_signatures_enabled == void 0
            ? void 0
            : val.are_text_signatures_enabled;
        const emailSubject = val.email_subject == void 0 ? void 0 : val.email_subject;
        const emailMessage = val.email_message == void 0 ? void 0 : val.email_message;
        const areRemindersEnabled = val.are_reminders_enabled == void 0 ? void 0 : val.are_reminders_enabled;
        const name = val.name == void 0 ? void 0 : val.name;
        const prefillTags = val.prefill_tags == void 0
            ? void 0
            : sdIsList(val.prefill_tags)
                ? val.prefill_tags.map(function (itm) {
                    return deserializeSignRequestPrefillTag(itm);
                })
                : [];
        const daysValid = val.days_valid == void 0 ? void 0 : val.days_valid;
        const externalId = val.external_id == void 0 ? void 0 : val.external_id;
        const isPhoneVerificationRequiredToView = val.is_phone_verification_required_to_view == void 0
            ? void 0
            : val.is_phone_verification_required_to_view;
        const templateId = val.template_id == void 0 ? void 0 : val.template_id;
        return {
            type: type,
            sourceFiles: sourceFiles,
            signers: signers,
            signatureColor: signatureColor,
            id: id,
            prepareUrl: prepareUrl,
            signingLog: signingLog,
            status: status,
            signFiles: signFiles,
            autoExpireAt: autoExpireAt,
            parentFolder: parentFolder,
            isDocumentPreparationNeeded: isDocumentPreparationNeeded,
            redirectUrl: redirectUrl,
            declinedRedirectUrl: declinedRedirectUrl,
            areTextSignaturesEnabled: areTextSignaturesEnabled,
            emailSubject: emailSubject,
            emailMessage: emailMessage,
            areRemindersEnabled: areRemindersEnabled,
            name: name,
            prefillTags: prefillTags,
            daysValid: daysValid,
            externalId: externalId,
            isPhoneVerificationRequiredToView: isPhoneVerificationRequiredToView,
            templateId: templateId,
        };
    }
    function deserializeSignRequests(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeSignRequest(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            entries: entries,
        };
    }
    function serializeSignRequestCreateRequestSignatureColorField(val) {
        return val;
    }
    function serializeSignRequestCreateRequest(val) {
        const base = serializeSignRequestBase(val);
        if (!sdIsMap(base)) {
            throw new BoxSdkError({
                message: 'Expecting a map for "SignRequestCreateRequest"',
            });
        }
        return Object.assign(Object.assign({}, base), {
            ['source_files']: val.sourceFiles == void 0
                ? void 0
                : val.sourceFiles.map(function (item) {
                    return serializeFileBase(item);
                }),
            ['signature_color']: val.signatureColor == void 0
                ? void 0
                : serializeSignRequestCreateRequestSignatureColorField(val.signatureColor),
            ['signers']: val.signers.map(function (item) {
                return serializeSignRequestCreateSigner(item);
            }),
            ['parent_folder']: val.parentFolder == void 0
                ? void 0
                : serializeFolderMini(val.parentFolder),
        });
    }
    function deserializeTemplateSignerInputTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TemplateSignerInputTypeField"',
            });
        }
        if (val == 'signature') {
            return 'signature';
        }
        if (val == 'date') {
            return 'date';
        }
        if (val == 'text') {
            return 'text';
        }
        if (val == 'checkbox') {
            return 'checkbox';
        }
        if (val == 'attachment') {
            return 'attachment';
        }
        if (val == 'radio') {
            return 'radio';
        }
        if (val == 'dropdown') {
            return 'dropdown';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTemplateSignerInputContentTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TemplateSignerInputContentTypeField"',
            });
        }
        if (val == 'signature') {
            return 'signature';
        }
        if (val == 'initial') {
            return 'initial';
        }
        if (val == 'stamp') {
            return 'stamp';
        }
        if (val == 'date') {
            return 'date';
        }
        if (val == 'checkbox') {
            return 'checkbox';
        }
        if (val == 'text') {
            return 'text';
        }
        if (val == 'full_name') {
            return 'full_name';
        }
        if (val == 'first_name') {
            return 'first_name';
        }
        if (val == 'last_name') {
            return 'last_name';
        }
        if (val == 'company') {
            return 'company';
        }
        if (val == 'title') {
            return 'title';
        }
        if (val == 'email') {
            return 'email';
        }
        if (val == 'attachment') {
            return 'attachment';
        }
        if (val == 'radio') {
            return 'radio';
        }
        if (val == 'dropdown') {
            return 'dropdown';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTemplateSignerInputCoordinatesField(val) {
        const x = val.x == void 0 ? void 0 : val.x;
        const y = val.y == void 0 ? void 0 : val.y;
        return { x: x, y: y };
    }
    function deserializeTemplateSignerInputDimensionsField(val) {
        const width = val.width == void 0 ? void 0 : val.width;
        const height = val.height == void 0 ? void 0 : val.height;
        return {
            width: width,
            height: height,
        };
    }
    function deserializeTemplateSignerInput(val) {
        const type = val.type == void 0
            ? void 0
            : deserializeTemplateSignerInputTypeField(val.type);
        const contentType = val.content_type == void 0
            ? void 0
            : deserializeTemplateSignerInputContentTypeField(val.content_type);
        const isRequired = val.is_required == void 0 ? void 0 : val.is_required;
        const pageIndex = val.page_index;
        const documentId = val.document_id == void 0 ? void 0 : val.document_id;
        const dropdownChoices = val.dropdown_choices == void 0
            ? void 0
            : sdIsList(val.dropdown_choices)
                ? val.dropdown_choices.map(function (itm) {
                    return itm;
                })
                : [];
        const groupId = val.group_id == void 0 ? void 0 : val.group_id;
        const coordinates = val.coordinates == void 0
            ? void 0
            : deserializeTemplateSignerInputCoordinatesField(val.coordinates);
        const dimensions = val.dimensions == void 0
            ? void 0
            : deserializeTemplateSignerInputDimensionsField(val.dimensions);
        const label = val.label == void 0 ? void 0 : val.label;
        const readOnly = val.read_only == void 0 ? void 0 : val.read_only;
        const documentTagId = val.document_tag_id == void 0 ? void 0 : val.document_tag_id;
        const textValue = val.text_value == void 0 ? void 0 : val.text_value;
        const checkboxValue = val.checkbox_value == void 0 ? void 0 : val.checkbox_value;
        const dateValue = val.date_value == void 0 ? void 0 : val.date_value;
        return {
            type: type,
            contentType: contentType,
            isRequired: isRequired,
            pageIndex: pageIndex,
            documentId: documentId,
            dropdownChoices: dropdownChoices,
            groupId: groupId,
            coordinates: coordinates,
            dimensions: dimensions,
            label: label,
            readOnly: readOnly,
            documentTagId: documentTagId,
            textValue: textValue,
            checkboxValue: checkboxValue,
            dateValue: dateValue,
        };
    }
    function deserializeTemplateSignerRoleField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TemplateSignerRoleField"',
            });
        }
        if (val == 'signer') {
            return 'signer';
        }
        if (val == 'approver') {
            return 'approver';
        }
        if (val == 'final_copy_reader') {
            return 'final_copy_reader';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeTemplateSigner(val) {
        const inputs = val.inputs == void 0
            ? void 0
            : sdIsList(val.inputs)
                ? val.inputs.map(function (itm) {
                    return deserializeTemplateSignerInput(itm);
                })
                : [];
        const email = val.email == void 0 ? void 0 : val.email;
        const role = val.role == void 0 ? void 0 : deserializeTemplateSignerRoleField(val.role);
        const isInPerson = val.is_in_person == void 0 ? void 0 : val.is_in_person;
        const order = val.order == void 0 ? void 0 : val.order;
        const signerGroupId = val.signer_group_id == void 0 ? void 0 : val.signer_group_id;
        return {
            inputs: inputs,
            email: email,
            role: role,
            isInPerson: isInPerson,
            order: order,
            signerGroupId: signerGroupId,
        };
    }
    function deserializeSignTemplateTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SignTemplateTypeField"',
            });
        }
        if (val == 'sign-template') {
            return 'sign-template';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSignTemplateAdditionalInfoNonEditableField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SignTemplateAdditionalInfoNonEditableField"',
            });
        }
        if (val == 'email_subject') {
            return 'email_subject';
        }
        if (val == 'email_message') {
            return 'email_message';
        }
        if (val == 'name') {
            return 'name';
        }
        if (val == 'days_valid') {
            return 'days_valid';
        }
        if (val == 'signers') {
            return 'signers';
        }
        if (val == 'source_files') {
            return 'source_files';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSignTemplateAdditionalInfoRequiredSignersField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "SignTemplateAdditionalInfoRequiredSignersField"',
            });
        }
        if (val == 'email') {
            return 'email';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeSignTemplateAdditionalInfoRequiredField(val) {
        const signers = val.signers == void 0
            ? void 0
            : sdIsList(val.signers)
                ? val.signers.map(function (itm) {
                    return sdIsList(itm)
                        ? itm.map(function (itm) {
                            return deserializeSignTemplateAdditionalInfoRequiredSignersField(itm);
                        })
                        : [];
                })
                : [];
        return { signers: signers };
    }
    function deserializeSignTemplateAdditionalInfoField(val) {
        const nonEditable = val.non_editable == void 0
            ? void 0
            : sdIsList(val.non_editable)
                ? val.non_editable.map(function (itm) {
                    return deserializeSignTemplateAdditionalInfoNonEditableField(itm);
                })
                : [];
        const required = val.required == void 0
            ? void 0
            : deserializeSignTemplateAdditionalInfoRequiredField(val.required);
        return {
            nonEditable: nonEditable,
            required: required,
        };
    }
    function deserializeSignTemplateReadySignLinkField(val) {
        const url = val.url == void 0 ? void 0 : val.url;
        const name = val.name == void 0 ? void 0 : val.name;
        const instructions = val.instructions == void 0 ? void 0 : val.instructions;
        const folderId = val.folder_id == void 0 ? void 0 : val.folder_id;
        const isNotificationDisabled = val.is_notification_disabled == void 0
            ? void 0
            : val.is_notification_disabled;
        const isActive = val.is_active == void 0 ? void 0 : val.is_active;
        return {
            url: url,
            name: name,
            instructions: instructions,
            folderId: folderId,
            isNotificationDisabled: isNotificationDisabled,
            isActive: isActive,
        };
    }
    function deserializeSignTemplateCustomBrandingField(val) {
        const companyName = val.company_name == void 0 ? void 0 : val.company_name;
        const logoUri = val.logo_uri == void 0 ? void 0 : val.logo_uri;
        const brandingColor = val.branding_color == void 0 ? void 0 : val.branding_color;
        const emailFooterText = val.email_footer_text == void 0 ? void 0 : val.email_footer_text;
        return {
            companyName: companyName,
            logoUri: logoUri,
            brandingColor: brandingColor,
            emailFooterText: emailFooterText,
        };
    }
    function deserializeSignTemplate(val) {
        const type = val.type == void 0 ? void 0 : deserializeSignTemplateTypeField(val.type);
        const id = val.id == void 0 ? void 0 : val.id;
        const name = val.name == void 0 ? void 0 : val.name;
        const emailSubject = val.email_subject == void 0 ? void 0 : val.email_subject;
        const emailMessage = val.email_message == void 0 ? void 0 : val.email_message;
        const daysValid = val.days_valid == void 0 ? void 0 : val.days_valid;
        const parentFolder = val.parent_folder == void 0
            ? void 0
            : deserializeFolderMini(val.parent_folder);
        const sourceFiles = val.source_files == void 0
            ? void 0
            : sdIsList(val.source_files)
                ? val.source_files.map(function (itm) {
                    return deserializeFileMini(itm);
                })
                : [];
        const areFieldsLocked = val.are_fields_locked == void 0 ? void 0 : val.are_fields_locked;
        const areOptionsLocked = val.are_options_locked == void 0 ? void 0 : val.are_options_locked;
        const areRecipientsLocked = val.are_recipients_locked == void 0 ? void 0 : val.are_recipients_locked;
        const areEmailSettingsLocked = val.are_email_settings_locked == void 0
            ? void 0
            : val.are_email_settings_locked;
        const areFilesLocked = val.are_files_locked == void 0 ? void 0 : val.are_files_locked;
        const signers = val.signers == void 0
            ? void 0
            : sdIsList(val.signers)
                ? val.signers.map(function (itm) {
                    return deserializeTemplateSigner(itm);
                })
                : [];
        const additionalInfo = val.additional_info == void 0
            ? void 0
            : deserializeSignTemplateAdditionalInfoField(val.additional_info);
        const readySignLink = val.ready_sign_link == void 0
            ? void 0
            : deserializeSignTemplateReadySignLinkField(val.ready_sign_link);
        const customBranding = val.custom_branding == void 0
            ? void 0
            : deserializeSignTemplateCustomBrandingField(val.custom_branding);
        return {
            type: type,
            id: id,
            name: name,
            emailSubject: emailSubject,
            emailMessage: emailMessage,
            daysValid: daysValid,
            parentFolder: parentFolder,
            sourceFiles: sourceFiles,
            areFieldsLocked: areFieldsLocked,
            areOptionsLocked: areOptionsLocked,
            areRecipientsLocked: areRecipientsLocked,
            areEmailSettingsLocked: areEmailSettingsLocked,
            areFilesLocked: areFilesLocked,
            signers: signers,
            additionalInfo: additionalInfo,
            readySignLink: readySignLink,
            customBranding: customBranding,
        };
    }
    function deserializeSignTemplates(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const prevMarker = val.prev_marker == void 0 ? void 0 : val.prev_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeSignTemplate(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            prevMarker: prevMarker,
            entries: entries,
        };
    }
    function deserializeShieldInformationBarrierReportDetailsDetailsField(val) {
        const folderId = val.folder_id == void 0 ? void 0 : val.folder_id;
        return {
            folderId: folderId,
        };
    }
    function deserializeShieldInformationBarrierReportDetails(val) {
        const details = val.details == void 0
            ? void 0
            : deserializeShieldInformationBarrierReportDetailsDetailsField(val.details);
        return { details: details };
    }
    function deserializeShieldInformationBarrierReportStatusField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "ShieldInformationBarrierReportStatusField"',
            });
        }
        if (val == 'pending') {
            return 'pending';
        }
        if (val == 'error') {
            return 'error';
        }
        if (val == 'done') {
            return 'done';
        }
        if (val == 'cancelled') {
            return 'cancelled';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeShieldInformationBarrierReport(val) {
        const shieldInformationBarrier = val.shield_information_barrier == void 0
            ? void 0
            : deserializeShieldInformationBarrierReference(val.shield_information_barrier);
        const status = val.status == void 0
            ? void 0
            : deserializeShieldInformationBarrierReportStatusField(val.status);
        const details = val.details == void 0
            ? void 0
            : deserializeShieldInformationBarrierReportDetails(val.details);
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const createdBy = val.created_by == void 0 ? void 0 : deserializeUserBase(val.created_by);
        const updatedAt = val.updated_at == void 0 ? void 0 : val.updated_at;
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeShieldInformationBarrierReportBaseTypeField(val.type);
        return {
            shieldInformationBarrier: shieldInformationBarrier,
            status: status,
            details: details,
            createdAt: createdAt,
            createdBy: createdBy,
            updatedAt: updatedAt,
            id: id,
            type: type,
        };
    }
    function deserializeShieldInformationBarrierReports(val) {
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const nextMarker = val.next_marker == void 0 ? void 0 : val.next_marker;
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeShieldInformationBarrierReport(itm);
                })
                : [];
        return {
            limit: limit,
            nextMarker: nextMarker,
            entries: entries,
        };
    }
    function serializeTrackingCodeTypeField(val) {
        return val;
    }
    function deserializeTrackingCodeTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "TrackingCodeTypeField"',
            });
        }
        if (val == 'tracking_code') {
            return 'tracking_code';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function serializeTrackingCode(val) {
        return {
            ['type']: val.type == void 0 ? void 0 : serializeTrackingCodeTypeField(val.type),
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['value']: val.value == void 0 ? void 0 : val.value,
        };
    }
    function deserializeTrackingCode(val) {
        const type = val.type == void 0 ? void 0 : deserializeTrackingCodeTypeField(val.type);
        const name = val.name == void 0 ? void 0 : val.name;
        const value = val.value == void 0 ? void 0 : val.value;
        return { type: type, name: name, value: value };
    }
    function deserializeUserFullRoleField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "UserFullRoleField"',
            });
        }
        if (val == 'admin') {
            return 'admin';
        }
        if (val == 'coadmin') {
            return 'coadmin';
        }
        if (val == 'user') {
            return 'user';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeUserFullEnterpriseTypeField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "UserFullEnterpriseTypeField"',
            });
        }
        if (val == 'enterprise') {
            return 'enterprise';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeUserFullEnterpriseField(val) {
        const id = val.id == void 0 ? void 0 : val.id;
        const type = val.type == void 0
            ? void 0
            : deserializeUserFullEnterpriseTypeField(val.type);
        const name = val.name == void 0 ? void 0 : val.name;
        return { id: id, type: type, name: name };
    }
    function deserializeUserFull(val) {
        const role = val.role == void 0 ? void 0 : deserializeUserFullRoleField(val.role);
        const trackingCodes = val.tracking_codes == void 0
            ? void 0
            : sdIsList(val.tracking_codes)
                ? val.tracking_codes.map(function (itm) {
                    return deserializeTrackingCode(itm);
                })
                : [];
        const canSeeManagedUsers = val.can_see_managed_users == void 0 ? void 0 : val.can_see_managed_users;
        const isSyncEnabled = val.is_sync_enabled == void 0 ? void 0 : val.is_sync_enabled;
        const isExternalCollabRestricted = val.is_external_collab_restricted == void 0
            ? void 0
            : val.is_external_collab_restricted;
        const isExemptFromDeviceLimits = val.is_exempt_from_device_limits == void 0
            ? void 0
            : val.is_exempt_from_device_limits;
        const isExemptFromLoginVerification = val.is_exempt_from_login_verification == void 0
            ? void 0
            : val.is_exempt_from_login_verification;
        const enterprise = val.enterprise == void 0
            ? void 0
            : deserializeUserFullEnterpriseField(val.enterprise);
        const myTags = val.my_tags == void 0
            ? void 0
            : sdIsList(val.my_tags)
                ? val.my_tags.map(function (itm) {
                    return itm;
                })
                : [];
        const hostname = val.hostname == void 0 ? void 0 : val.hostname;
        const isPlatformAccessOnly = val.is_platform_access_only == void 0
            ? void 0
            : val.is_platform_access_only;
        const externalAppUserId = val.external_app_user_id == void 0 ? void 0 : val.external_app_user_id;
        const createdAt = val.created_at == void 0 ? void 0 : val.created_at;
        const modifiedAt = val.modified_at == void 0 ? void 0 : val.modified_at;
        const language = val.language == void 0 ? void 0 : val.language;
        const timezone = val.timezone == void 0 ? void 0 : val.timezone;
        const spaceAmount = val.space_amount == void 0 ? void 0 : val.space_amount;
        const spaceUsed = val.space_used == void 0 ? void 0 : val.space_used;
        const maxUploadSize = val.max_upload_size == void 0 ? void 0 : val.max_upload_size;
        const status = val.status == void 0 ? void 0 : deserializeUserStatusField(val.status);
        const jobTitle = val.job_title == void 0 ? void 0 : val.job_title;
        const phone = val.phone == void 0 ? void 0 : val.phone;
        const address = val.address == void 0 ? void 0 : val.address;
        const avatarUrl = val.avatar_url == void 0 ? void 0 : val.avatar_url;
        const notificationEmail = val.notification_email == void 0
            ? void 0
            : deserializeUserNotificationEmailField(val.notification_email);
        const name = val.name == void 0 ? void 0 : val.name;
        const login = val.login == void 0 ? void 0 : val.login;
        const id = val.id;
        const type = deserializeUserBaseTypeField(val.type);
        return {
            role: role,
            trackingCodes: trackingCodes,
            canSeeManagedUsers: canSeeManagedUsers,
            isSyncEnabled: isSyncEnabled,
            isExternalCollabRestricted: isExternalCollabRestricted,
            isExemptFromDeviceLimits: isExemptFromDeviceLimits,
            isExemptFromLoginVerification: isExemptFromLoginVerification,
            enterprise: enterprise,
            myTags: myTags,
            hostname: hostname,
            isPlatformAccessOnly: isPlatformAccessOnly,
            externalAppUserId: externalAppUserId,
            createdAt: createdAt,
            modifiedAt: modifiedAt,
            language: language,
            timezone: timezone,
            spaceAmount: spaceAmount,
            spaceUsed: spaceUsed,
            maxUploadSize: maxUploadSize,
            status: status,
            jobTitle: jobTitle,
            phone: phone,
            address: address,
            avatarUrl: avatarUrl,
            notificationEmail: notificationEmail,
            name: name,
            login: login,
            id: id,
            type: type,
        };
    }
    function deserializeUsersOrderDirectionField(val) {
        if (!sdIsString(val)) {
            throw new BoxSdkError({
                message: 'Expecting a string for "UsersOrderDirectionField"',
            });
        }
        if (val == 'ASC') {
            return 'ASC';
        }
        if (val == 'DESC') {
            return 'DESC';
        }
        throw new BoxSdkError({
            message: ''.concat('Invalid value: ', val),
        });
    }
    function deserializeUsersOrderField(val) {
        const by = val.by == void 0 ? void 0 : val.by;
        const direction = val.direction == void 0
            ? void 0
            : deserializeUsersOrderDirectionField(val.direction);
        return { by: by, direction: direction };
    }
    function deserializeUsers(val) {
        const totalCount = val.total_count == void 0 ? void 0 : val.total_count;
        const limit = val.limit == void 0 ? void 0 : val.limit;
        const offset = val.offset == void 0 ? void 0 : val.offset;
        const order = val.order == void 0
            ? void 0
            : sdIsList(val.order)
                ? val.order.map(function (itm) {
                    return deserializeUsersOrderField(itm);
                })
                : [];
        const entries = val.entries == void 0
            ? void 0
            : sdIsList(val.entries)
                ? val.entries.map(function (itm) {
                    return deserializeUserFull(itm);
                })
                : [];
        return {
            totalCount: totalCount,
            limit: limit,
            offset: offset,
            order: order,
            entries: entries,
        };
    }
    function serializeMetadataFieldFilterString(val) {
        return val;
    }
    function serializeMetadataFieldFilterFloat(val) {
        return val;
    }
    function serializeMetadataFieldFilterMultiSelect(val) {
        return Object.fromEntries(Object.entries(val).map(([k, v]) => [
            k,
            (function (v) {
                return v.map(function (item) {
                    return item;
                });
            })(v),
        ]));
    }
    function serializeMetadataFieldFilterFloatRangeValue(val) {
        return {
            ['lt']: val.lt == void 0 ? void 0 : val.lt,
            ['gt']: val.gt == void 0 ? void 0 : val.gt,
        };
    }
    function serializeMetadataFieldFilterFloatRange(val) {
        return Object.fromEntries(Object.entries(val).map(([k, v]) => [
            k,
            serializeMetadataFieldFilterFloatRangeValue(v),
        ]));
    }
    function serializeMetadataFieldFilterDateRangeValue(val) {
        return {
            ['lt']: val.lt == void 0 ? void 0 : val.lt,
            ['gt']: val.gt == void 0 ? void 0 : val.gt,
        };
    }
    function serializeMetadataFieldFilterDateRange(val) {
        return Object.fromEntries(Object.entries(val).map(([k, v]) => [
            k,
            serializeMetadataFieldFilterDateRangeValue(v),
        ]));
    }
    function serializeMetadataFilterScopeField(val) {
        return val;
    }
    function serializeMetadataFilterFiltersField(val) {
        try {
            return serializeMetadataFieldFilterString(val);
        }
        catch (error) {
        }
        finally {
        }
        try {
            return serializeMetadataFieldFilterFloat(val);
        }
        catch (error) {
        }
        finally {
        }
        try {
            return serializeMetadataFieldFilterMultiSelect(val);
        }
        catch (error) {
        }
        finally {
        }
        try {
            return serializeMetadataFieldFilterFloatRange(val);
        }
        catch (error) {
        }
        finally {
        }
        try {
            return serializeMetadataFieldFilterDateRange(val);
        }
        catch (error) {
        }
        finally {
        }
        throw new BoxSdkError({
            message: "Can't serialize MetadataFilterFiltersField",
        });
    }
    function serializeMetadataFilter(val) {
        return {
            ['scope']: val.scope == void 0
                ? void 0
                : serializeMetadataFilterScopeField(val.scope),
            ['templateKey']: val.templateKey == void 0 ? void 0 : val.templateKey,
            ['filters']: val.filters == void 0
                ? void 0
                : serializeMetadataFilterFiltersField(val.filters),
        };
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var buffer = {};

    var base64Js = {};

    base64Js.byteLength = byteLength;
    base64Js.toByteArray = toByteArray;
    base64Js.fromByteArray = fromByteArray;

    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }

    // Support decoding URL-safe base64 strings, as Node.js does.
    // See: https://en.wikipedia.org/wiki/Base64#URL_applications
    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;

    function getLens (b64) {
      var len = b64.length;

      if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4')
      }

      // Trim off extra bytes after placeholder bytes are found
      // See: https://github.com/beatgammit/base64-js/issues/42
      var validLen = b64.indexOf('=');
      if (validLen === -1) validLen = len;

      var placeHoldersLen = validLen === len
        ? 0
        : 4 - (validLen % 4);

      return [validLen, placeHoldersLen]
    }

    // base64 is 4/3 + up to two characters of the original data
    function byteLength (b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
    }

    function _byteLength (b64, validLen, placeHoldersLen) {
      return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
    }

    function toByteArray (b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];

      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

      var curByte = 0;

      // if there are placeholders, only get up to the last complete 4 chars
      var len = placeHoldersLen > 0
        ? validLen - 4
        : validLen;

      var i;
      for (i = 0; i < len; i += 4) {
        tmp =
          (revLookup[b64.charCodeAt(i)] << 18) |
          (revLookup[b64.charCodeAt(i + 1)] << 12) |
          (revLookup[b64.charCodeAt(i + 2)] << 6) |
          revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = (tmp >> 16) & 0xFF;
        arr[curByte++] = (tmp >> 8) & 0xFF;
        arr[curByte++] = tmp & 0xFF;
      }

      if (placeHoldersLen === 2) {
        tmp =
          (revLookup[b64.charCodeAt(i)] << 2) |
          (revLookup[b64.charCodeAt(i + 1)] >> 4);
        arr[curByte++] = tmp & 0xFF;
      }

      if (placeHoldersLen === 1) {
        tmp =
          (revLookup[b64.charCodeAt(i)] << 10) |
          (revLookup[b64.charCodeAt(i + 1)] << 4) |
          (revLookup[b64.charCodeAt(i + 2)] >> 2);
        arr[curByte++] = (tmp >> 8) & 0xFF;
        arr[curByte++] = tmp & 0xFF;
      }

      return arr
    }

    function tripletToBase64 (num) {
      return lookup[num >> 18 & 0x3F] +
        lookup[num >> 12 & 0x3F] +
        lookup[num >> 6 & 0x3F] +
        lookup[num & 0x3F]
    }

    function encodeChunk (uint8, start, end) {
      var tmp;
      var output = [];
      for (var i = start; i < end; i += 3) {
        tmp =
          ((uint8[i] << 16) & 0xFF0000) +
          ((uint8[i + 1] << 8) & 0xFF00) +
          (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
      }
      return output.join('')
    }

    function fromByteArray (uint8) {
      var tmp;
      var len = uint8.length;
      var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
      var parts = [];
      var maxChunkLength = 16383; // must be multiple of 3

      // go through the array every three bytes, we'll deal with trailing stuff later
      for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
        parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
      }

      // pad the end with zeros, but make sure to not forget the extra bytes
      if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(
          lookup[tmp >> 2] +
          lookup[(tmp << 4) & 0x3F] +
          '=='
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(
          lookup[tmp >> 10] +
          lookup[(tmp >> 4) & 0x3F] +
          lookup[(tmp << 2) & 0x3F] +
          '='
        );
      }

      return parts.join('')
    }

    var ieee754 = {};

    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */

    ieee754.read = function (buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = (nBytes * 8) - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? (nBytes - 1) : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];

      i += d;

      e = s & ((1 << (-nBits)) - 1);
      s >>= (-nBits);
      nBits += eLen;
      for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

      m = e & ((1 << (-nBits)) - 1);
      e >>= (-nBits);
      nBits += mLen;
      for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : ((s ? -1 : 1) * Infinity)
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
    };

    ieee754.write = function (buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = (nBytes * 8) - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
      var i = isLE ? 0 : (nBytes - 1);
      var d = isLE ? 1 : -1;
      var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

      value = Math.abs(value);

      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }

        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = ((value * c) - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }

      for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

      e = (e << mLen) | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

      buffer[offset + i - d] |= s * 128;
    };

    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */

    (function (exports) {

    	const base64 = base64Js;
    	const ieee754$1 = ieee754;
    	const customInspectSymbol =
    	  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    	    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    	    : null;

    	exports.Buffer = Buffer;
    	exports.SlowBuffer = SlowBuffer;
    	exports.INSPECT_MAX_BYTES = 50;

    	const K_MAX_LENGTH = 0x7fffffff;
    	exports.kMaxLength = K_MAX_LENGTH;

    	/**
    	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
    	 *   === true    Use Uint8Array implementation (fastest)
    	 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
    	 *               implementation (most compatible, even IE6)
    	 *
    	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
    	 * Opera 11.6+, iOS 4.2+.
    	 *
    	 * We report that the browser does not support typed arrays if the are not subclassable
    	 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
    	 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
    	 * for __proto__ and has a buggy typed array implementation.
    	 */
    	Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

    	if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    	    typeof console.error === 'function') {
    	  console.error(
    	    'This browser lacks typed array (Uint8Array) support which is required by ' +
    	    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
    	  );
    	}

    	function typedArraySupport () {
    	  // Can typed array instances can be augmented?
    	  try {
    	    const arr = new Uint8Array(1);
    	    const proto = { foo: function () { return 42 } };
    	    Object.setPrototypeOf(proto, Uint8Array.prototype);
    	    Object.setPrototypeOf(arr, proto);
    	    return arr.foo() === 42
    	  } catch (e) {
    	    return false
    	  }
    	}

    	Object.defineProperty(Buffer.prototype, 'parent', {
    	  enumerable: true,
    	  get: function () {
    	    if (!Buffer.isBuffer(this)) return undefined
    	    return this.buffer
    	  }
    	});

    	Object.defineProperty(Buffer.prototype, 'offset', {
    	  enumerable: true,
    	  get: function () {
    	    if (!Buffer.isBuffer(this)) return undefined
    	    return this.byteOffset
    	  }
    	});

    	function createBuffer (length) {
    	  if (length > K_MAX_LENGTH) {
    	    throw new RangeError('The value "' + length + '" is invalid for option "size"')
    	  }
    	  // Return an augmented `Uint8Array` instance
    	  const buf = new Uint8Array(length);
    	  Object.setPrototypeOf(buf, Buffer.prototype);
    	  return buf
    	}

    	/**
    	 * The Buffer constructor returns instances of `Uint8Array` that have their
    	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
    	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
    	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
    	 * returns a single octet.
    	 *
    	 * The `Uint8Array` prototype remains unmodified.
    	 */

    	function Buffer (arg, encodingOrOffset, length) {
    	  // Common case.
    	  if (typeof arg === 'number') {
    	    if (typeof encodingOrOffset === 'string') {
    	      throw new TypeError(
    	        'The "string" argument must be of type string. Received type number'
    	      )
    	    }
    	    return allocUnsafe(arg)
    	  }
    	  return from(arg, encodingOrOffset, length)
    	}

    	Buffer.poolSize = 8192; // not used by this implementation

    	function from (value, encodingOrOffset, length) {
    	  if (typeof value === 'string') {
    	    return fromString(value, encodingOrOffset)
    	  }

    	  if (ArrayBuffer.isView(value)) {
    	    return fromArrayView(value)
    	  }

    	  if (value == null) {
    	    throw new TypeError(
    	      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    	      'or Array-like Object. Received type ' + (typeof value)
    	    )
    	  }

    	  if (isInstance(value, ArrayBuffer) ||
    	      (value && isInstance(value.buffer, ArrayBuffer))) {
    	    return fromArrayBuffer(value, encodingOrOffset, length)
    	  }

    	  if (typeof SharedArrayBuffer !== 'undefined' &&
    	      (isInstance(value, SharedArrayBuffer) ||
    	      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    	    return fromArrayBuffer(value, encodingOrOffset, length)
    	  }

    	  if (typeof value === 'number') {
    	    throw new TypeError(
    	      'The "value" argument must not be of type number. Received type number'
    	    )
    	  }

    	  const valueOf = value.valueOf && value.valueOf();
    	  if (valueOf != null && valueOf !== value) {
    	    return Buffer.from(valueOf, encodingOrOffset, length)
    	  }

    	  const b = fromObject(value);
    	  if (b) return b

    	  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
    	      typeof value[Symbol.toPrimitive] === 'function') {
    	    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
    	  }

    	  throw new TypeError(
    	    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    	    'or Array-like Object. Received type ' + (typeof value)
    	  )
    	}

    	/**
    	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
    	 * if value is a number.
    	 * Buffer.from(str[, encoding])
    	 * Buffer.from(array)
    	 * Buffer.from(buffer)
    	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
    	 **/
    	Buffer.from = function (value, encodingOrOffset, length) {
    	  return from(value, encodingOrOffset, length)
    	};

    	// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
    	// https://github.com/feross/buffer/pull/148
    	Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
    	Object.setPrototypeOf(Buffer, Uint8Array);

    	function assertSize (size) {
    	  if (typeof size !== 'number') {
    	    throw new TypeError('"size" argument must be of type number')
    	  } else if (size < 0) {
    	    throw new RangeError('The value "' + size + '" is invalid for option "size"')
    	  }
    	}

    	function alloc (size, fill, encoding) {
    	  assertSize(size);
    	  if (size <= 0) {
    	    return createBuffer(size)
    	  }
    	  if (fill !== undefined) {
    	    // Only pay attention to encoding if it's a string. This
    	    // prevents accidentally sending in a number that would
    	    // be interpreted as a start offset.
    	    return typeof encoding === 'string'
    	      ? createBuffer(size).fill(fill, encoding)
    	      : createBuffer(size).fill(fill)
    	  }
    	  return createBuffer(size)
    	}

    	/**
    	 * Creates a new filled Buffer instance.
    	 * alloc(size[, fill[, encoding]])
    	 **/
    	Buffer.alloc = function (size, fill, encoding) {
    	  return alloc(size, fill, encoding)
    	};

    	function allocUnsafe (size) {
    	  assertSize(size);
    	  return createBuffer(size < 0 ? 0 : checked(size) | 0)
    	}

    	/**
    	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
    	 * */
    	Buffer.allocUnsafe = function (size) {
    	  return allocUnsafe(size)
    	};
    	/**
    	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
    	 */
    	Buffer.allocUnsafeSlow = function (size) {
    	  return allocUnsafe(size)
    	};

    	function fromString (string, encoding) {
    	  if (typeof encoding !== 'string' || encoding === '') {
    	    encoding = 'utf8';
    	  }

    	  if (!Buffer.isEncoding(encoding)) {
    	    throw new TypeError('Unknown encoding: ' + encoding)
    	  }

    	  const length = byteLength(string, encoding) | 0;
    	  let buf = createBuffer(length);

    	  const actual = buf.write(string, encoding);

    	  if (actual !== length) {
    	    // Writing a hex string, for example, that contains invalid characters will
    	    // cause everything after the first invalid character to be ignored. (e.g.
    	    // 'abxxcd' will be treated as 'ab')
    	    buf = buf.slice(0, actual);
    	  }

    	  return buf
    	}

    	function fromArrayLike (array) {
    	  const length = array.length < 0 ? 0 : checked(array.length) | 0;
    	  const buf = createBuffer(length);
    	  for (let i = 0; i < length; i += 1) {
    	    buf[i] = array[i] & 255;
    	  }
    	  return buf
    	}

    	function fromArrayView (arrayView) {
    	  if (isInstance(arrayView, Uint8Array)) {
    	    const copy = new Uint8Array(arrayView);
    	    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
    	  }
    	  return fromArrayLike(arrayView)
    	}

    	function fromArrayBuffer (array, byteOffset, length) {
    	  if (byteOffset < 0 || array.byteLength < byteOffset) {
    	    throw new RangeError('"offset" is outside of buffer bounds')
    	  }

    	  if (array.byteLength < byteOffset + (length || 0)) {
    	    throw new RangeError('"length" is outside of buffer bounds')
    	  }

    	  let buf;
    	  if (byteOffset === undefined && length === undefined) {
    	    buf = new Uint8Array(array);
    	  } else if (length === undefined) {
    	    buf = new Uint8Array(array, byteOffset);
    	  } else {
    	    buf = new Uint8Array(array, byteOffset, length);
    	  }

    	  // Return an augmented `Uint8Array` instance
    	  Object.setPrototypeOf(buf, Buffer.prototype);

    	  return buf
    	}

    	function fromObject (obj) {
    	  if (Buffer.isBuffer(obj)) {
    	    const len = checked(obj.length) | 0;
    	    const buf = createBuffer(len);

    	    if (buf.length === 0) {
    	      return buf
    	    }

    	    obj.copy(buf, 0, 0, len);
    	    return buf
    	  }

    	  if (obj.length !== undefined) {
    	    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
    	      return createBuffer(0)
    	    }
    	    return fromArrayLike(obj)
    	  }

    	  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    	    return fromArrayLike(obj.data)
    	  }
    	}

    	function checked (length) {
    	  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    	  // length is NaN (which is otherwise coerced to zero.)
    	  if (length >= K_MAX_LENGTH) {
    	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
    	                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
    	  }
    	  return length | 0
    	}

    	function SlowBuffer (length) {
    	  if (+length != length) { // eslint-disable-line eqeqeq
    	    length = 0;
    	  }
    	  return Buffer.alloc(+length)
    	}

    	Buffer.isBuffer = function isBuffer (b) {
    	  return b != null && b._isBuffer === true &&
    	    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    	};

    	Buffer.compare = function compare (a, b) {
    	  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
    	  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
    	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    	    throw new TypeError(
    	      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    	    )
    	  }

    	  if (a === b) return 0

    	  let x = a.length;
    	  let y = b.length;

    	  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    	    if (a[i] !== b[i]) {
    	      x = a[i];
    	      y = b[i];
    	      break
    	    }
    	  }

    	  if (x < y) return -1
    	  if (y < x) return 1
    	  return 0
    	};

    	Buffer.isEncoding = function isEncoding (encoding) {
    	  switch (String(encoding).toLowerCase()) {
    	    case 'hex':
    	    case 'utf8':
    	    case 'utf-8':
    	    case 'ascii':
    	    case 'latin1':
    	    case 'binary':
    	    case 'base64':
    	    case 'ucs2':
    	    case 'ucs-2':
    	    case 'utf16le':
    	    case 'utf-16le':
    	      return true
    	    default:
    	      return false
    	  }
    	};

    	Buffer.concat = function concat (list, length) {
    	  if (!Array.isArray(list)) {
    	    throw new TypeError('"list" argument must be an Array of Buffers')
    	  }

    	  if (list.length === 0) {
    	    return Buffer.alloc(0)
    	  }

    	  let i;
    	  if (length === undefined) {
    	    length = 0;
    	    for (i = 0; i < list.length; ++i) {
    	      length += list[i].length;
    	    }
    	  }

    	  const buffer = Buffer.allocUnsafe(length);
    	  let pos = 0;
    	  for (i = 0; i < list.length; ++i) {
    	    let buf = list[i];
    	    if (isInstance(buf, Uint8Array)) {
    	      if (pos + buf.length > buffer.length) {
    	        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
    	        buf.copy(buffer, pos);
    	      } else {
    	        Uint8Array.prototype.set.call(
    	          buffer,
    	          buf,
    	          pos
    	        );
    	      }
    	    } else if (!Buffer.isBuffer(buf)) {
    	      throw new TypeError('"list" argument must be an Array of Buffers')
    	    } else {
    	      buf.copy(buffer, pos);
    	    }
    	    pos += buf.length;
    	  }
    	  return buffer
    	};

    	function byteLength (string, encoding) {
    	  if (Buffer.isBuffer(string)) {
    	    return string.length
    	  }
    	  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    	    return string.byteLength
    	  }
    	  if (typeof string !== 'string') {
    	    throw new TypeError(
    	      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
    	      'Received type ' + typeof string
    	    )
    	  }

    	  const len = string.length;
    	  const mustMatch = (arguments.length > 2 && arguments[2] === true);
    	  if (!mustMatch && len === 0) return 0

    	  // Use a for loop to avoid recursion
    	  let loweredCase = false;
    	  for (;;) {
    	    switch (encoding) {
    	      case 'ascii':
    	      case 'latin1':
    	      case 'binary':
    	        return len
    	      case 'utf8':
    	      case 'utf-8':
    	        return utf8ToBytes(string).length
    	      case 'ucs2':
    	      case 'ucs-2':
    	      case 'utf16le':
    	      case 'utf-16le':
    	        return len * 2
    	      case 'hex':
    	        return len >>> 1
    	      case 'base64':
    	        return base64ToBytes(string).length
    	      default:
    	        if (loweredCase) {
    	          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
    	        }
    	        encoding = ('' + encoding).toLowerCase();
    	        loweredCase = true;
    	    }
    	  }
    	}
    	Buffer.byteLength = byteLength;

    	function slowToString (encoding, start, end) {
    	  let loweredCase = false;

    	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    	  // property of a typed array.

    	  // This behaves neither like String nor Uint8Array in that we set start/end
    	  // to their upper/lower bounds if the value passed is out of range.
    	  // undefined is handled specially as per ECMA-262 6th Edition,
    	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    	  if (start === undefined || start < 0) {
    	    start = 0;
    	  }
    	  // Return early if start > this.length. Done here to prevent potential uint32
    	  // coercion fail below.
    	  if (start > this.length) {
    	    return ''
    	  }

    	  if (end === undefined || end > this.length) {
    	    end = this.length;
    	  }

    	  if (end <= 0) {
    	    return ''
    	  }

    	  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    	  end >>>= 0;
    	  start >>>= 0;

    	  if (end <= start) {
    	    return ''
    	  }

    	  if (!encoding) encoding = 'utf8';

    	  while (true) {
    	    switch (encoding) {
    	      case 'hex':
    	        return hexSlice(this, start, end)

    	      case 'utf8':
    	      case 'utf-8':
    	        return utf8Slice(this, start, end)

    	      case 'ascii':
    	        return asciiSlice(this, start, end)

    	      case 'latin1':
    	      case 'binary':
    	        return latin1Slice(this, start, end)

    	      case 'base64':
    	        return base64Slice(this, start, end)

    	      case 'ucs2':
    	      case 'ucs-2':
    	      case 'utf16le':
    	      case 'utf-16le':
    	        return utf16leSlice(this, start, end)

    	      default:
    	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
    	        encoding = (encoding + '').toLowerCase();
    	        loweredCase = true;
    	    }
    	  }
    	}

    	// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
    	// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
    	// reliably in a browserify context because there could be multiple different
    	// copies of the 'buffer' package in use. This method works even for Buffer
    	// instances that were created from another copy of the `buffer` package.
    	// See: https://github.com/feross/buffer/issues/154
    	Buffer.prototype._isBuffer = true;

    	function swap (b, n, m) {
    	  const i = b[n];
    	  b[n] = b[m];
    	  b[m] = i;
    	}

    	Buffer.prototype.swap16 = function swap16 () {
    	  const len = this.length;
    	  if (len % 2 !== 0) {
    	    throw new RangeError('Buffer size must be a multiple of 16-bits')
    	  }
    	  for (let i = 0; i < len; i += 2) {
    	    swap(this, i, i + 1);
    	  }
    	  return this
    	};

    	Buffer.prototype.swap32 = function swap32 () {
    	  const len = this.length;
    	  if (len % 4 !== 0) {
    	    throw new RangeError('Buffer size must be a multiple of 32-bits')
    	  }
    	  for (let i = 0; i < len; i += 4) {
    	    swap(this, i, i + 3);
    	    swap(this, i + 1, i + 2);
    	  }
    	  return this
    	};

    	Buffer.prototype.swap64 = function swap64 () {
    	  const len = this.length;
    	  if (len % 8 !== 0) {
    	    throw new RangeError('Buffer size must be a multiple of 64-bits')
    	  }
    	  for (let i = 0; i < len; i += 8) {
    	    swap(this, i, i + 7);
    	    swap(this, i + 1, i + 6);
    	    swap(this, i + 2, i + 5);
    	    swap(this, i + 3, i + 4);
    	  }
    	  return this
    	};

    	Buffer.prototype.toString = function toString () {
    	  const length = this.length;
    	  if (length === 0) return ''
    	  if (arguments.length === 0) return utf8Slice(this, 0, length)
    	  return slowToString.apply(this, arguments)
    	};

    	Buffer.prototype.toLocaleString = Buffer.prototype.toString;

    	Buffer.prototype.equals = function equals (b) {
    	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
    	  if (this === b) return true
    	  return Buffer.compare(this, b) === 0
    	};

    	Buffer.prototype.inspect = function inspect () {
    	  let str = '';
    	  const max = exports.INSPECT_MAX_BYTES;
    	  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
    	  if (this.length > max) str += ' ... ';
    	  return '<Buffer ' + str + '>'
    	};
    	if (customInspectSymbol) {
    	  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
    	}

    	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
    	  if (isInstance(target, Uint8Array)) {
    	    target = Buffer.from(target, target.offset, target.byteLength);
    	  }
    	  if (!Buffer.isBuffer(target)) {
    	    throw new TypeError(
    	      'The "target" argument must be one of type Buffer or Uint8Array. ' +
    	      'Received type ' + (typeof target)
    	    )
    	  }

    	  if (start === undefined) {
    	    start = 0;
    	  }
    	  if (end === undefined) {
    	    end = target ? target.length : 0;
    	  }
    	  if (thisStart === undefined) {
    	    thisStart = 0;
    	  }
    	  if (thisEnd === undefined) {
    	    thisEnd = this.length;
    	  }

    	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    	    throw new RangeError('out of range index')
    	  }

    	  if (thisStart >= thisEnd && start >= end) {
    	    return 0
    	  }
    	  if (thisStart >= thisEnd) {
    	    return -1
    	  }
    	  if (start >= end) {
    	    return 1
    	  }

    	  start >>>= 0;
    	  end >>>= 0;
    	  thisStart >>>= 0;
    	  thisEnd >>>= 0;

    	  if (this === target) return 0

    	  let x = thisEnd - thisStart;
    	  let y = end - start;
    	  const len = Math.min(x, y);

    	  const thisCopy = this.slice(thisStart, thisEnd);
    	  const targetCopy = target.slice(start, end);

    	  for (let i = 0; i < len; ++i) {
    	    if (thisCopy[i] !== targetCopy[i]) {
    	      x = thisCopy[i];
    	      y = targetCopy[i];
    	      break
    	    }
    	  }

    	  if (x < y) return -1
    	  if (y < x) return 1
    	  return 0
    	};

    	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
    	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
    	//
    	// Arguments:
    	// - buffer - a Buffer to search
    	// - val - a string, Buffer, or number
    	// - byteOffset - an index into `buffer`; will be clamped to an int32
    	// - encoding - an optional encoding, relevant is val is a string
    	// - dir - true for indexOf, false for lastIndexOf
    	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
    	  // Empty buffer means no match
    	  if (buffer.length === 0) return -1

    	  // Normalize byteOffset
    	  if (typeof byteOffset === 'string') {
    	    encoding = byteOffset;
    	    byteOffset = 0;
    	  } else if (byteOffset > 0x7fffffff) {
    	    byteOffset = 0x7fffffff;
    	  } else if (byteOffset < -0x80000000) {
    	    byteOffset = -0x80000000;
    	  }
    	  byteOffset = +byteOffset; // Coerce to Number.
    	  if (numberIsNaN(byteOffset)) {
    	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    	    byteOffset = dir ? 0 : (buffer.length - 1);
    	  }

    	  // Normalize byteOffset: negative offsets start from the end of the buffer
    	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    	  if (byteOffset >= buffer.length) {
    	    if (dir) return -1
    	    else byteOffset = buffer.length - 1;
    	  } else if (byteOffset < 0) {
    	    if (dir) byteOffset = 0;
    	    else return -1
    	  }

    	  // Normalize val
    	  if (typeof val === 'string') {
    	    val = Buffer.from(val, encoding);
    	  }

    	  // Finally, search either indexOf (if dir is true) or lastIndexOf
    	  if (Buffer.isBuffer(val)) {
    	    // Special case: looking for empty string/buffer always fails
    	    if (val.length === 0) {
    	      return -1
    	    }
    	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
    	  } else if (typeof val === 'number') {
    	    val = val & 0xFF; // Search for a byte value [0-255]
    	    if (typeof Uint8Array.prototype.indexOf === 'function') {
    	      if (dir) {
    	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
    	      } else {
    	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
    	      }
    	    }
    	    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
    	  }

    	  throw new TypeError('val must be string, number or Buffer')
    	}

    	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
    	  let indexSize = 1;
    	  let arrLength = arr.length;
    	  let valLength = val.length;

    	  if (encoding !== undefined) {
    	    encoding = String(encoding).toLowerCase();
    	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
    	        encoding === 'utf16le' || encoding === 'utf-16le') {
    	      if (arr.length < 2 || val.length < 2) {
    	        return -1
    	      }
    	      indexSize = 2;
    	      arrLength /= 2;
    	      valLength /= 2;
    	      byteOffset /= 2;
    	    }
    	  }

    	  function read (buf, i) {
    	    if (indexSize === 1) {
    	      return buf[i]
    	    } else {
    	      return buf.readUInt16BE(i * indexSize)
    	    }
    	  }

    	  let i;
    	  if (dir) {
    	    let foundIndex = -1;
    	    for (i = byteOffset; i < arrLength; i++) {
    	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
    	        if (foundIndex === -1) foundIndex = i;
    	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
    	      } else {
    	        if (foundIndex !== -1) i -= i - foundIndex;
    	        foundIndex = -1;
    	      }
    	    }
    	  } else {
    	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    	    for (i = byteOffset; i >= 0; i--) {
    	      let found = true;
    	      for (let j = 0; j < valLength; j++) {
    	        if (read(arr, i + j) !== read(val, j)) {
    	          found = false;
    	          break
    	        }
    	      }
    	      if (found) return i
    	    }
    	  }

    	  return -1
    	}

    	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
    	  return this.indexOf(val, byteOffset, encoding) !== -1
    	};

    	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
    	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
    	};

    	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
    	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
    	};

    	function hexWrite (buf, string, offset, length) {
    	  offset = Number(offset) || 0;
    	  const remaining = buf.length - offset;
    	  if (!length) {
    	    length = remaining;
    	  } else {
    	    length = Number(length);
    	    if (length > remaining) {
    	      length = remaining;
    	    }
    	  }

    	  const strLen = string.length;

    	  if (length > strLen / 2) {
    	    length = strLen / 2;
    	  }
    	  let i;
    	  for (i = 0; i < length; ++i) {
    	    const parsed = parseInt(string.substr(i * 2, 2), 16);
    	    if (numberIsNaN(parsed)) return i
    	    buf[offset + i] = parsed;
    	  }
    	  return i
    	}

    	function utf8Write (buf, string, offset, length) {
    	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
    	}

    	function asciiWrite (buf, string, offset, length) {
    	  return blitBuffer(asciiToBytes(string), buf, offset, length)
    	}

    	function base64Write (buf, string, offset, length) {
    	  return blitBuffer(base64ToBytes(string), buf, offset, length)
    	}

    	function ucs2Write (buf, string, offset, length) {
    	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
    	}

    	Buffer.prototype.write = function write (string, offset, length, encoding) {
    	  // Buffer#write(string)
    	  if (offset === undefined) {
    	    encoding = 'utf8';
    	    length = this.length;
    	    offset = 0;
    	  // Buffer#write(string, encoding)
    	  } else if (length === undefined && typeof offset === 'string') {
    	    encoding = offset;
    	    length = this.length;
    	    offset = 0;
    	  // Buffer#write(string, offset[, length][, encoding])
    	  } else if (isFinite(offset)) {
    	    offset = offset >>> 0;
    	    if (isFinite(length)) {
    	      length = length >>> 0;
    	      if (encoding === undefined) encoding = 'utf8';
    	    } else {
    	      encoding = length;
    	      length = undefined;
    	    }
    	  } else {
    	    throw new Error(
    	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    	    )
    	  }

    	  const remaining = this.length - offset;
    	  if (length === undefined || length > remaining) length = remaining;

    	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    	    throw new RangeError('Attempt to write outside buffer bounds')
    	  }

    	  if (!encoding) encoding = 'utf8';

    	  let loweredCase = false;
    	  for (;;) {
    	    switch (encoding) {
    	      case 'hex':
    	        return hexWrite(this, string, offset, length)

    	      case 'utf8':
    	      case 'utf-8':
    	        return utf8Write(this, string, offset, length)

    	      case 'ascii':
    	      case 'latin1':
    	      case 'binary':
    	        return asciiWrite(this, string, offset, length)

    	      case 'base64':
    	        // Warning: maxLength not taken into account in base64Write
    	        return base64Write(this, string, offset, length)

    	      case 'ucs2':
    	      case 'ucs-2':
    	      case 'utf16le':
    	      case 'utf-16le':
    	        return ucs2Write(this, string, offset, length)

    	      default:
    	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
    	        encoding = ('' + encoding).toLowerCase();
    	        loweredCase = true;
    	    }
    	  }
    	};

    	Buffer.prototype.toJSON = function toJSON () {
    	  return {
    	    type: 'Buffer',
    	    data: Array.prototype.slice.call(this._arr || this, 0)
    	  }
    	};

    	function base64Slice (buf, start, end) {
    	  if (start === 0 && end === buf.length) {
    	    return base64.fromByteArray(buf)
    	  } else {
    	    return base64.fromByteArray(buf.slice(start, end))
    	  }
    	}

    	function utf8Slice (buf, start, end) {
    	  end = Math.min(buf.length, end);
    	  const res = [];

    	  let i = start;
    	  while (i < end) {
    	    const firstByte = buf[i];
    	    let codePoint = null;
    	    let bytesPerSequence = (firstByte > 0xEF)
    	      ? 4
    	      : (firstByte > 0xDF)
    	          ? 3
    	          : (firstByte > 0xBF)
    	              ? 2
    	              : 1;

    	    if (i + bytesPerSequence <= end) {
    	      let secondByte, thirdByte, fourthByte, tempCodePoint;

    	      switch (bytesPerSequence) {
    	        case 1:
    	          if (firstByte < 0x80) {
    	            codePoint = firstByte;
    	          }
    	          break
    	        case 2:
    	          secondByte = buf[i + 1];
    	          if ((secondByte & 0xC0) === 0x80) {
    	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
    	            if (tempCodePoint > 0x7F) {
    	              codePoint = tempCodePoint;
    	            }
    	          }
    	          break
    	        case 3:
    	          secondByte = buf[i + 1];
    	          thirdByte = buf[i + 2];
    	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
    	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
    	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
    	              codePoint = tempCodePoint;
    	            }
    	          }
    	          break
    	        case 4:
    	          secondByte = buf[i + 1];
    	          thirdByte = buf[i + 2];
    	          fourthByte = buf[i + 3];
    	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
    	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
    	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
    	              codePoint = tempCodePoint;
    	            }
    	          }
    	      }
    	    }

    	    if (codePoint === null) {
    	      // we did not generate a valid codePoint so insert a
    	      // replacement char (U+FFFD) and advance only 1 byte
    	      codePoint = 0xFFFD;
    	      bytesPerSequence = 1;
    	    } else if (codePoint > 0xFFFF) {
    	      // encode to utf16 (surrogate pair dance)
    	      codePoint -= 0x10000;
    	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
    	      codePoint = 0xDC00 | codePoint & 0x3FF;
    	    }

    	    res.push(codePoint);
    	    i += bytesPerSequence;
    	  }

    	  return decodeCodePointsArray(res)
    	}

    	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
    	// the lowest limit is Chrome, with 0x10000 args.
    	// We go 1 magnitude less, for safety
    	const MAX_ARGUMENTS_LENGTH = 0x1000;

    	function decodeCodePointsArray (codePoints) {
    	  const len = codePoints.length;
    	  if (len <= MAX_ARGUMENTS_LENGTH) {
    	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    	  }

    	  // Decode in chunks to avoid "call stack size exceeded".
    	  let res = '';
    	  let i = 0;
    	  while (i < len) {
    	    res += String.fromCharCode.apply(
    	      String,
    	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    	    );
    	  }
    	  return res
    	}

    	function asciiSlice (buf, start, end) {
    	  let ret = '';
    	  end = Math.min(buf.length, end);

    	  for (let i = start; i < end; ++i) {
    	    ret += String.fromCharCode(buf[i] & 0x7F);
    	  }
    	  return ret
    	}

    	function latin1Slice (buf, start, end) {
    	  let ret = '';
    	  end = Math.min(buf.length, end);

    	  for (let i = start; i < end; ++i) {
    	    ret += String.fromCharCode(buf[i]);
    	  }
    	  return ret
    	}

    	function hexSlice (buf, start, end) {
    	  const len = buf.length;

    	  if (!start || start < 0) start = 0;
    	  if (!end || end < 0 || end > len) end = len;

    	  let out = '';
    	  for (let i = start; i < end; ++i) {
    	    out += hexSliceLookupTable[buf[i]];
    	  }
    	  return out
    	}

    	function utf16leSlice (buf, start, end) {
    	  const bytes = buf.slice(start, end);
    	  let res = '';
    	  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    	  for (let i = 0; i < bytes.length - 1; i += 2) {
    	    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
    	  }
    	  return res
    	}

    	Buffer.prototype.slice = function slice (start, end) {
    	  const len = this.length;
    	  start = ~~start;
    	  end = end === undefined ? len : ~~end;

    	  if (start < 0) {
    	    start += len;
    	    if (start < 0) start = 0;
    	  } else if (start > len) {
    	    start = len;
    	  }

    	  if (end < 0) {
    	    end += len;
    	    if (end < 0) end = 0;
    	  } else if (end > len) {
    	    end = len;
    	  }

    	  if (end < start) end = start;

    	  const newBuf = this.subarray(start, end);
    	  // Return an augmented `Uint8Array` instance
    	  Object.setPrototypeOf(newBuf, Buffer.prototype);

    	  return newBuf
    	};

    	/*
    	 * Need to make sure that buffer isn't trying to write out of bounds.
    	 */
    	function checkOffset (offset, ext, length) {
    	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
    	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
    	}

    	Buffer.prototype.readUintLE =
    	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
    	  offset = offset >>> 0;
    	  byteLength = byteLength >>> 0;
    	  if (!noAssert) checkOffset(offset, byteLength, this.length);

    	  let val = this[offset];
    	  let mul = 1;
    	  let i = 0;
    	  while (++i < byteLength && (mul *= 0x100)) {
    	    val += this[offset + i] * mul;
    	  }

    	  return val
    	};

    	Buffer.prototype.readUintBE =
    	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
    	  offset = offset >>> 0;
    	  byteLength = byteLength >>> 0;
    	  if (!noAssert) {
    	    checkOffset(offset, byteLength, this.length);
    	  }

    	  let val = this[offset + --byteLength];
    	  let mul = 1;
    	  while (byteLength > 0 && (mul *= 0x100)) {
    	    val += this[offset + --byteLength] * mul;
    	  }

    	  return val
    	};

    	Buffer.prototype.readUint8 =
    	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 1, this.length);
    	  return this[offset]
    	};

    	Buffer.prototype.readUint16LE =
    	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 2, this.length);
    	  return this[offset] | (this[offset + 1] << 8)
    	};

    	Buffer.prototype.readUint16BE =
    	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 2, this.length);
    	  return (this[offset] << 8) | this[offset + 1]
    	};

    	Buffer.prototype.readUint32LE =
    	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 4, this.length);

    	  return ((this[offset]) |
    	      (this[offset + 1] << 8) |
    	      (this[offset + 2] << 16)) +
    	      (this[offset + 3] * 0x1000000)
    	};

    	Buffer.prototype.readUint32BE =
    	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 4, this.length);

    	  return (this[offset] * 0x1000000) +
    	    ((this[offset + 1] << 16) |
    	    (this[offset + 2] << 8) |
    	    this[offset + 3])
    	};

    	Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
    	  offset = offset >>> 0;
    	  validateNumber(offset, 'offset');
    	  const first = this[offset];
    	  const last = this[offset + 7];
    	  if (first === undefined || last === undefined) {
    	    boundsError(offset, this.length - 8);
    	  }

    	  const lo = first +
    	    this[++offset] * 2 ** 8 +
    	    this[++offset] * 2 ** 16 +
    	    this[++offset] * 2 ** 24;

    	  const hi = this[++offset] +
    	    this[++offset] * 2 ** 8 +
    	    this[++offset] * 2 ** 16 +
    	    last * 2 ** 24;

    	  return BigInt(lo) + (BigInt(hi) << BigInt(32))
    	});

    	Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
    	  offset = offset >>> 0;
    	  validateNumber(offset, 'offset');
    	  const first = this[offset];
    	  const last = this[offset + 7];
    	  if (first === undefined || last === undefined) {
    	    boundsError(offset, this.length - 8);
    	  }

    	  const hi = first * 2 ** 24 +
    	    this[++offset] * 2 ** 16 +
    	    this[++offset] * 2 ** 8 +
    	    this[++offset];

    	  const lo = this[++offset] * 2 ** 24 +
    	    this[++offset] * 2 ** 16 +
    	    this[++offset] * 2 ** 8 +
    	    last;

    	  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
    	});

    	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
    	  offset = offset >>> 0;
    	  byteLength = byteLength >>> 0;
    	  if (!noAssert) checkOffset(offset, byteLength, this.length);

    	  let val = this[offset];
    	  let mul = 1;
    	  let i = 0;
    	  while (++i < byteLength && (mul *= 0x100)) {
    	    val += this[offset + i] * mul;
    	  }
    	  mul *= 0x80;

    	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    	  return val
    	};

    	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
    	  offset = offset >>> 0;
    	  byteLength = byteLength >>> 0;
    	  if (!noAssert) checkOffset(offset, byteLength, this.length);

    	  let i = byteLength;
    	  let mul = 1;
    	  let val = this[offset + --i];
    	  while (i > 0 && (mul *= 0x100)) {
    	    val += this[offset + --i] * mul;
    	  }
    	  mul *= 0x80;

    	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    	  return val
    	};

    	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 1, this.length);
    	  if (!(this[offset] & 0x80)) return (this[offset])
    	  return ((0xff - this[offset] + 1) * -1)
    	};

    	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 2, this.length);
    	  const val = this[offset] | (this[offset + 1] << 8);
    	  return (val & 0x8000) ? val | 0xFFFF0000 : val
    	};

    	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 2, this.length);
    	  const val = this[offset + 1] | (this[offset] << 8);
    	  return (val & 0x8000) ? val | 0xFFFF0000 : val
    	};

    	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 4, this.length);

    	  return (this[offset]) |
    	    (this[offset + 1] << 8) |
    	    (this[offset + 2] << 16) |
    	    (this[offset + 3] << 24)
    	};

    	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 4, this.length);

    	  return (this[offset] << 24) |
    	    (this[offset + 1] << 16) |
    	    (this[offset + 2] << 8) |
    	    (this[offset + 3])
    	};

    	Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
    	  offset = offset >>> 0;
    	  validateNumber(offset, 'offset');
    	  const first = this[offset];
    	  const last = this[offset + 7];
    	  if (first === undefined || last === undefined) {
    	    boundsError(offset, this.length - 8);
    	  }

    	  const val = this[offset + 4] +
    	    this[offset + 5] * 2 ** 8 +
    	    this[offset + 6] * 2 ** 16 +
    	    (last << 24); // Overflow

    	  return (BigInt(val) << BigInt(32)) +
    	    BigInt(first +
    	    this[++offset] * 2 ** 8 +
    	    this[++offset] * 2 ** 16 +
    	    this[++offset] * 2 ** 24)
    	});

    	Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
    	  offset = offset >>> 0;
    	  validateNumber(offset, 'offset');
    	  const first = this[offset];
    	  const last = this[offset + 7];
    	  if (first === undefined || last === undefined) {
    	    boundsError(offset, this.length - 8);
    	  }

    	  const val = (first << 24) + // Overflow
    	    this[++offset] * 2 ** 16 +
    	    this[++offset] * 2 ** 8 +
    	    this[++offset];

    	  return (BigInt(val) << BigInt(32)) +
    	    BigInt(this[++offset] * 2 ** 24 +
    	    this[++offset] * 2 ** 16 +
    	    this[++offset] * 2 ** 8 +
    	    last)
    	});

    	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 4, this.length);
    	  return ieee754$1.read(this, offset, true, 23, 4)
    	};

    	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 4, this.length);
    	  return ieee754$1.read(this, offset, false, 23, 4)
    	};

    	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 8, this.length);
    	  return ieee754$1.read(this, offset, true, 52, 8)
    	};

    	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
    	  offset = offset >>> 0;
    	  if (!noAssert) checkOffset(offset, 8, this.length);
    	  return ieee754$1.read(this, offset, false, 52, 8)
    	};

    	function checkInt (buf, value, offset, ext, max, min) {
    	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
    	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
    	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
    	}

    	Buffer.prototype.writeUintLE =
    	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  byteLength = byteLength >>> 0;
    	  if (!noAssert) {
    	    const maxBytes = Math.pow(2, 8 * byteLength) - 1;
    	    checkInt(this, value, offset, byteLength, maxBytes, 0);
    	  }

    	  let mul = 1;
    	  let i = 0;
    	  this[offset] = value & 0xFF;
    	  while (++i < byteLength && (mul *= 0x100)) {
    	    this[offset + i] = (value / mul) & 0xFF;
    	  }

    	  return offset + byteLength
    	};

    	Buffer.prototype.writeUintBE =
    	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  byteLength = byteLength >>> 0;
    	  if (!noAssert) {
    	    const maxBytes = Math.pow(2, 8 * byteLength) - 1;
    	    checkInt(this, value, offset, byteLength, maxBytes, 0);
    	  }

    	  let i = byteLength - 1;
    	  let mul = 1;
    	  this[offset + i] = value & 0xFF;
    	  while (--i >= 0 && (mul *= 0x100)) {
    	    this[offset + i] = (value / mul) & 0xFF;
    	  }

    	  return offset + byteLength
    	};

    	Buffer.prototype.writeUint8 =
    	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    	  this[offset] = (value & 0xff);
    	  return offset + 1
    	};

    	Buffer.prototype.writeUint16LE =
    	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    	  this[offset] = (value & 0xff);
    	  this[offset + 1] = (value >>> 8);
    	  return offset + 2
    	};

    	Buffer.prototype.writeUint16BE =
    	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    	  this[offset] = (value >>> 8);
    	  this[offset + 1] = (value & 0xff);
    	  return offset + 2
    	};

    	Buffer.prototype.writeUint32LE =
    	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    	  this[offset + 3] = (value >>> 24);
    	  this[offset + 2] = (value >>> 16);
    	  this[offset + 1] = (value >>> 8);
    	  this[offset] = (value & 0xff);
    	  return offset + 4
    	};

    	Buffer.prototype.writeUint32BE =
    	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    	  this[offset] = (value >>> 24);
    	  this[offset + 1] = (value >>> 16);
    	  this[offset + 2] = (value >>> 8);
    	  this[offset + 3] = (value & 0xff);
    	  return offset + 4
    	};

    	function wrtBigUInt64LE (buf, value, offset, min, max) {
    	  checkIntBI(value, min, max, buf, offset, 7);

    	  let lo = Number(value & BigInt(0xffffffff));
    	  buf[offset++] = lo;
    	  lo = lo >> 8;
    	  buf[offset++] = lo;
    	  lo = lo >> 8;
    	  buf[offset++] = lo;
    	  lo = lo >> 8;
    	  buf[offset++] = lo;
    	  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    	  buf[offset++] = hi;
    	  hi = hi >> 8;
    	  buf[offset++] = hi;
    	  hi = hi >> 8;
    	  buf[offset++] = hi;
    	  hi = hi >> 8;
    	  buf[offset++] = hi;
    	  return offset
    	}

    	function wrtBigUInt64BE (buf, value, offset, min, max) {
    	  checkIntBI(value, min, max, buf, offset, 7);

    	  let lo = Number(value & BigInt(0xffffffff));
    	  buf[offset + 7] = lo;
    	  lo = lo >> 8;
    	  buf[offset + 6] = lo;
    	  lo = lo >> 8;
    	  buf[offset + 5] = lo;
    	  lo = lo >> 8;
    	  buf[offset + 4] = lo;
    	  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    	  buf[offset + 3] = hi;
    	  hi = hi >> 8;
    	  buf[offset + 2] = hi;
    	  hi = hi >> 8;
    	  buf[offset + 1] = hi;
    	  hi = hi >> 8;
    	  buf[offset] = hi;
    	  return offset + 8
    	}

    	Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
    	  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
    	});

    	Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
    	  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
    	});

    	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) {
    	    const limit = Math.pow(2, (8 * byteLength) - 1);

    	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
    	  }

    	  let i = 0;
    	  let mul = 1;
    	  let sub = 0;
    	  this[offset] = value & 0xFF;
    	  while (++i < byteLength && (mul *= 0x100)) {
    	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
    	      sub = 1;
    	    }
    	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    	  }

    	  return offset + byteLength
    	};

    	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) {
    	    const limit = Math.pow(2, (8 * byteLength) - 1);

    	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
    	  }

    	  let i = byteLength - 1;
    	  let mul = 1;
    	  let sub = 0;
    	  this[offset + i] = value & 0xFF;
    	  while (--i >= 0 && (mul *= 0x100)) {
    	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
    	      sub = 1;
    	    }
    	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    	  }

    	  return offset + byteLength
    	};

    	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    	  if (value < 0) value = 0xff + value + 1;
    	  this[offset] = (value & 0xff);
    	  return offset + 1
    	};

    	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    	  this[offset] = (value & 0xff);
    	  this[offset + 1] = (value >>> 8);
    	  return offset + 2
    	};

    	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    	  this[offset] = (value >>> 8);
    	  this[offset + 1] = (value & 0xff);
    	  return offset + 2
    	};

    	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    	  this[offset] = (value & 0xff);
    	  this[offset + 1] = (value >>> 8);
    	  this[offset + 2] = (value >>> 16);
    	  this[offset + 3] = (value >>> 24);
    	  return offset + 4
    	};

    	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    	  if (value < 0) value = 0xffffffff + value + 1;
    	  this[offset] = (value >>> 24);
    	  this[offset + 1] = (value >>> 16);
    	  this[offset + 2] = (value >>> 8);
    	  this[offset + 3] = (value & 0xff);
    	  return offset + 4
    	};

    	Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
    	  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
    	});

    	Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
    	  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
    	});

    	function checkIEEE754 (buf, value, offset, ext, max, min) {
    	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
    	  if (offset < 0) throw new RangeError('Index out of range')
    	}

    	function writeFloat (buf, value, offset, littleEndian, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) {
    	    checkIEEE754(buf, value, offset, 4);
    	  }
    	  ieee754$1.write(buf, value, offset, littleEndian, 23, 4);
    	  return offset + 4
    	}

    	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
    	  return writeFloat(this, value, offset, true, noAssert)
    	};

    	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
    	  return writeFloat(this, value, offset, false, noAssert)
    	};

    	function writeDouble (buf, value, offset, littleEndian, noAssert) {
    	  value = +value;
    	  offset = offset >>> 0;
    	  if (!noAssert) {
    	    checkIEEE754(buf, value, offset, 8);
    	  }
    	  ieee754$1.write(buf, value, offset, littleEndian, 52, 8);
    	  return offset + 8
    	}

    	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
    	  return writeDouble(this, value, offset, true, noAssert)
    	};

    	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
    	  return writeDouble(this, value, offset, false, noAssert)
    	};

    	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
    	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
    	  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
    	  if (!start) start = 0;
    	  if (!end && end !== 0) end = this.length;
    	  if (targetStart >= target.length) targetStart = target.length;
    	  if (!targetStart) targetStart = 0;
    	  if (end > 0 && end < start) end = start;

    	  // Copy 0 bytes; we're done
    	  if (end === start) return 0
    	  if (target.length === 0 || this.length === 0) return 0

    	  // Fatal error conditions
    	  if (targetStart < 0) {
    	    throw new RangeError('targetStart out of bounds')
    	  }
    	  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
    	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

    	  // Are we oob?
    	  if (end > this.length) end = this.length;
    	  if (target.length - targetStart < end - start) {
    	    end = target.length - targetStart + start;
    	  }

    	  const len = end - start;

    	  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    	    // Use built-in when available, missing from IE11
    	    this.copyWithin(targetStart, start, end);
    	  } else {
    	    Uint8Array.prototype.set.call(
    	      target,
    	      this.subarray(start, end),
    	      targetStart
    	    );
    	  }

    	  return len
    	};

    	// Usage:
    	//    buffer.fill(number[, offset[, end]])
    	//    buffer.fill(buffer[, offset[, end]])
    	//    buffer.fill(string[, offset[, end]][, encoding])
    	Buffer.prototype.fill = function fill (val, start, end, encoding) {
    	  // Handle string cases:
    	  if (typeof val === 'string') {
    	    if (typeof start === 'string') {
    	      encoding = start;
    	      start = 0;
    	      end = this.length;
    	    } else if (typeof end === 'string') {
    	      encoding = end;
    	      end = this.length;
    	    }
    	    if (encoding !== undefined && typeof encoding !== 'string') {
    	      throw new TypeError('encoding must be a string')
    	    }
    	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
    	      throw new TypeError('Unknown encoding: ' + encoding)
    	    }
    	    if (val.length === 1) {
    	      const code = val.charCodeAt(0);
    	      if ((encoding === 'utf8' && code < 128) ||
    	          encoding === 'latin1') {
    	        // Fast path: If `val` fits into a single byte, use that numeric value.
    	        val = code;
    	      }
    	    }
    	  } else if (typeof val === 'number') {
    	    val = val & 255;
    	  } else if (typeof val === 'boolean') {
    	    val = Number(val);
    	  }

    	  // Invalid ranges are not set to a default, so can range check early.
    	  if (start < 0 || this.length < start || this.length < end) {
    	    throw new RangeError('Out of range index')
    	  }

    	  if (end <= start) {
    	    return this
    	  }

    	  start = start >>> 0;
    	  end = end === undefined ? this.length : end >>> 0;

    	  if (!val) val = 0;

    	  let i;
    	  if (typeof val === 'number') {
    	    for (i = start; i < end; ++i) {
    	      this[i] = val;
    	    }
    	  } else {
    	    const bytes = Buffer.isBuffer(val)
    	      ? val
    	      : Buffer.from(val, encoding);
    	    const len = bytes.length;
    	    if (len === 0) {
    	      throw new TypeError('The value "' + val +
    	        '" is invalid for argument "value"')
    	    }
    	    for (i = 0; i < end - start; ++i) {
    	      this[i + start] = bytes[i % len];
    	    }
    	  }

    	  return this
    	};

    	// CUSTOM ERRORS
    	// =============

    	// Simplified versions from Node, changed for Buffer-only usage
    	const errors = {};
    	function E (sym, getMessage, Base) {
    	  errors[sym] = class NodeError extends Base {
    	    constructor () {
    	      super();

    	      Object.defineProperty(this, 'message', {
    	        value: getMessage.apply(this, arguments),
    	        writable: true,
    	        configurable: true
    	      });

    	      // Add the error code to the name to include it in the stack trace.
    	      this.name = `${this.name} [${sym}]`;
    	      // Access the stack to generate the error message including the error code
    	      // from the name.
    	      this.stack; // eslint-disable-line no-unused-expressions
    	      // Reset the name to the actual name.
    	      delete this.name;
    	    }

    	    get code () {
    	      return sym
    	    }

    	    set code (value) {
    	      Object.defineProperty(this, 'code', {
    	        configurable: true,
    	        enumerable: true,
    	        value,
    	        writable: true
    	      });
    	    }

    	    toString () {
    	      return `${this.name} [${sym}]: ${this.message}`
    	    }
    	  };
    	}

    	E('ERR_BUFFER_OUT_OF_BOUNDS',
    	  function (name) {
    	    if (name) {
    	      return `${name} is outside of buffer bounds`
    	    }

    	    return 'Attempt to access memory outside buffer bounds'
    	  }, RangeError);
    	E('ERR_INVALID_ARG_TYPE',
    	  function (name, actual) {
    	    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
    	  }, TypeError);
    	E('ERR_OUT_OF_RANGE',
    	  function (str, range, input) {
    	    let msg = `The value of "${str}" is out of range.`;
    	    let received = input;
    	    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
    	      received = addNumericalSeparator(String(input));
    	    } else if (typeof input === 'bigint') {
    	      received = String(input);
    	      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
    	        received = addNumericalSeparator(received);
    	      }
    	      received += 'n';
    	    }
    	    msg += ` It must be ${range}. Received ${received}`;
    	    return msg
    	  }, RangeError);

    	function addNumericalSeparator (val) {
    	  let res = '';
    	  let i = val.length;
    	  const start = val[0] === '-' ? 1 : 0;
    	  for (; i >= start + 4; i -= 3) {
    	    res = `_${val.slice(i - 3, i)}${res}`;
    	  }
    	  return `${val.slice(0, i)}${res}`
    	}

    	// CHECK FUNCTIONS
    	// ===============

    	function checkBounds (buf, offset, byteLength) {
    	  validateNumber(offset, 'offset');
    	  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    	    boundsError(offset, buf.length - (byteLength + 1));
    	  }
    	}

    	function checkIntBI (value, min, max, buf, offset, byteLength) {
    	  if (value > max || value < min) {
    	    const n = typeof min === 'bigint' ? 'n' : '';
    	    let range;
    	    if (byteLength > 3) {
    	      if (min === 0 || min === BigInt(0)) {
    	        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
    	      } else {
    	        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
    	                `${(byteLength + 1) * 8 - 1}${n}`;
    	      }
    	    } else {
    	      range = `>= ${min}${n} and <= ${max}${n}`;
    	    }
    	    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
    	  }
    	  checkBounds(buf, offset, byteLength);
    	}

    	function validateNumber (value, name) {
    	  if (typeof value !== 'number') {
    	    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
    	  }
    	}

    	function boundsError (value, length, type) {
    	  if (Math.floor(value) !== value) {
    	    validateNumber(value, type);
    	    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
    	  }

    	  if (length < 0) {
    	    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
    	  }

    	  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
    	                                    `>= ${type ? 1 : 0} and <= ${length}`,
    	                                    value)
    	}

    	// HELPER FUNCTIONS
    	// ================

    	const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

    	function base64clean (str) {
    	  // Node takes equal signs as end of the Base64 encoding
    	  str = str.split('=')[0];
    	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
    	  str = str.trim().replace(INVALID_BASE64_RE, '');
    	  // Node converts strings with length < 2 to ''
    	  if (str.length < 2) return ''
    	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    	  while (str.length % 4 !== 0) {
    	    str = str + '=';
    	  }
    	  return str
    	}

    	function utf8ToBytes (string, units) {
    	  units = units || Infinity;
    	  let codePoint;
    	  const length = string.length;
    	  let leadSurrogate = null;
    	  const bytes = [];

    	  for (let i = 0; i < length; ++i) {
    	    codePoint = string.charCodeAt(i);

    	    // is surrogate component
    	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
    	      // last char was a lead
    	      if (!leadSurrogate) {
    	        // no lead yet
    	        if (codePoint > 0xDBFF) {
    	          // unexpected trail
    	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    	          continue
    	        } else if (i + 1 === length) {
    	          // unpaired lead
    	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    	          continue
    	        }

    	        // valid lead
    	        leadSurrogate = codePoint;

    	        continue
    	      }

    	      // 2 leads in a row
    	      if (codePoint < 0xDC00) {
    	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    	        leadSurrogate = codePoint;
    	        continue
    	      }

    	      // valid surrogate pair
    	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    	    } else if (leadSurrogate) {
    	      // valid bmp char, but last char was a lead
    	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    	    }

    	    leadSurrogate = null;

    	    // encode utf8
    	    if (codePoint < 0x80) {
    	      if ((units -= 1) < 0) break
    	      bytes.push(codePoint);
    	    } else if (codePoint < 0x800) {
    	      if ((units -= 2) < 0) break
    	      bytes.push(
    	        codePoint >> 0x6 | 0xC0,
    	        codePoint & 0x3F | 0x80
    	      );
    	    } else if (codePoint < 0x10000) {
    	      if ((units -= 3) < 0) break
    	      bytes.push(
    	        codePoint >> 0xC | 0xE0,
    	        codePoint >> 0x6 & 0x3F | 0x80,
    	        codePoint & 0x3F | 0x80
    	      );
    	    } else if (codePoint < 0x110000) {
    	      if ((units -= 4) < 0) break
    	      bytes.push(
    	        codePoint >> 0x12 | 0xF0,
    	        codePoint >> 0xC & 0x3F | 0x80,
    	        codePoint >> 0x6 & 0x3F | 0x80,
    	        codePoint & 0x3F | 0x80
    	      );
    	    } else {
    	      throw new Error('Invalid code point')
    	    }
    	  }

    	  return bytes
    	}

    	function asciiToBytes (str) {
    	  const byteArray = [];
    	  for (let i = 0; i < str.length; ++i) {
    	    // Node's code seems to be doing this and not & 0x7F..
    	    byteArray.push(str.charCodeAt(i) & 0xFF);
    	  }
    	  return byteArray
    	}

    	function utf16leToBytes (str, units) {
    	  let c, hi, lo;
    	  const byteArray = [];
    	  for (let i = 0; i < str.length; ++i) {
    	    if ((units -= 2) < 0) break

    	    c = str.charCodeAt(i);
    	    hi = c >> 8;
    	    lo = c % 256;
    	    byteArray.push(lo);
    	    byteArray.push(hi);
    	  }

    	  return byteArray
    	}

    	function base64ToBytes (str) {
    	  return base64.toByteArray(base64clean(str))
    	}

    	function blitBuffer (src, dst, offset, length) {
    	  let i;
    	  for (i = 0; i < length; ++i) {
    	    if ((i + offset >= dst.length) || (i >= src.length)) break
    	    dst[i + offset] = src[i];
    	  }
    	  return i
    	}

    	// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
    	// the `instanceof` check but they should be treated as of that type.
    	// See: https://github.com/feross/buffer/issues/166
    	function isInstance (obj, type) {
    	  return obj instanceof type ||
    	    (obj != null && obj.constructor != null && obj.constructor.name != null &&
    	      obj.constructor.name === type.name)
    	}
    	function numberIsNaN (obj) {
    	  // For IE11 support
    	  return obj !== obj // eslint-disable-line no-self-compare
    	}

    	// Create lookup table for `toString('hex')`
    	// See: https://github.com/feross/buffer/issues/219
    	const hexSliceLookupTable = (function () {
    	  const alphabet = '0123456789abcdef';
    	  const table = new Array(256);
    	  for (let i = 0; i < 16; ++i) {
    	    const i16 = i * 16;
    	    for (let j = 0; j < 16; ++j) {
    	      table[i16 + j] = alphabet[i] + alphabet[j];
    	    }
    	  }
    	  return table
    	})();

    	// Return not function with Error if BigInt not supported
    	function defineBigIntMethod (fn) {
    	  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
    	}

    	function BufferBigIntNotDefined () {
    	  throw new Error('BigInt not supported')
    	} 
    } (buffer));

    // Unique ID creation requires a high quality random # generator. In the browser we therefore
    // require the crypto API and do not support built-in fallback to lower quality random number
    // generators (like Math.random()).
    let getRandomValues;
    const rnds8 = new Uint8Array(16);
    function rng() {
      // lazy load so that environments that need to polyfill have a chance to do so
      if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

        if (!getRandomValues) {
          throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
      }

      return getRandomValues(rnds8);
    }

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */

    const byteToHex = [];

    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 0x100).toString(16).slice(1));
    }

    function unsafeStringify(arr, offset = 0) {
      // Note: Be careful editing this code!  It's been tuned for performance
      // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
      return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
    }

    const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    var native = {
      randomUUID
    };

    function v4(options, buf, offset) {
      if (native.randomUUID && !buf && !options) {
        return native.randomUUID();
      }

      options = options || {};
      const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

      if (buf) {
        offset = offset || 0;

        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }

        return buf;
      }

      return unsafeStringify(rnds);
    }

    var crypto$1 = crypto;
    const isCryptoKey = (key) => key instanceof CryptoKey;

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    function concat(...buffers) {
        const size = buffers.reduce((acc, { length }) => acc + length, 0);
        const buf = new Uint8Array(size);
        let i = 0;
        for (const buffer of buffers) {
            buf.set(buffer, i);
            i += buffer.length;
        }
        return buf;
    }

    const encodeBase64 = (input) => {
        let unencoded = input;
        if (typeof unencoded === 'string') {
            unencoded = encoder.encode(unencoded);
        }
        const CHUNK_SIZE = 0x8000;
        const arr = [];
        for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
            arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
        }
        return btoa(arr.join(''));
    };
    const encode = (input) => {
        return encodeBase64(input).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    };

    class JOSEError extends Error {
        static get code() {
            return 'ERR_JOSE_GENERIC';
        }
        constructor(message) {
            super(message);
            this.code = 'ERR_JOSE_GENERIC';
            this.name = this.constructor.name;
            Error.captureStackTrace?.(this, this.constructor);
        }
    }
    class JOSENotSupported extends JOSEError {
        constructor() {
            super(...arguments);
            this.code = 'ERR_JOSE_NOT_SUPPORTED';
        }
        static get code() {
            return 'ERR_JOSE_NOT_SUPPORTED';
        }
    }
    class JWSInvalid extends JOSEError {
        constructor() {
            super(...arguments);
            this.code = 'ERR_JWS_INVALID';
        }
        static get code() {
            return 'ERR_JWS_INVALID';
        }
    }
    class JWTInvalid extends JOSEError {
        constructor() {
            super(...arguments);
            this.code = 'ERR_JWT_INVALID';
        }
        static get code() {
            return 'ERR_JWT_INVALID';
        }
    }

    function unusable(name, prop = 'algorithm.name') {
        return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
    }
    function isAlgorithm(algorithm, name) {
        return algorithm.name === name;
    }
    function getHashLength(hash) {
        return parseInt(hash.name.slice(4), 10);
    }
    function getNamedCurve$1(alg) {
        switch (alg) {
            case 'ES256':
                return 'P-256';
            case 'ES384':
                return 'P-384';
            case 'ES512':
                return 'P-521';
            default:
                throw new Error('unreachable');
        }
    }
    function checkUsage(key, usages) {
        if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
            let msg = 'CryptoKey does not support this operation, its usages must include ';
            if (usages.length > 2) {
                const last = usages.pop();
                msg += `one of ${usages.join(', ')}, or ${last}.`;
            }
            else if (usages.length === 2) {
                msg += `one of ${usages[0]} or ${usages[1]}.`;
            }
            else {
                msg += `${usages[0]}.`;
            }
            throw new TypeError(msg);
        }
    }
    function checkSigCryptoKey(key, alg, ...usages) {
        switch (alg) {
            case 'HS256':
            case 'HS384':
            case 'HS512': {
                if (!isAlgorithm(key.algorithm, 'HMAC'))
                    throw unusable('HMAC');
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected)
                    throw unusable(`SHA-${expected}`, 'algorithm.hash');
                break;
            }
            case 'RS256':
            case 'RS384':
            case 'RS512': {
                if (!isAlgorithm(key.algorithm, 'RSASSA-PKCS1-v1_5'))
                    throw unusable('RSASSA-PKCS1-v1_5');
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected)
                    throw unusable(`SHA-${expected}`, 'algorithm.hash');
                break;
            }
            case 'PS256':
            case 'PS384':
            case 'PS512': {
                if (!isAlgorithm(key.algorithm, 'RSA-PSS'))
                    throw unusable('RSA-PSS');
                const expected = parseInt(alg.slice(2), 10);
                const actual = getHashLength(key.algorithm.hash);
                if (actual !== expected)
                    throw unusable(`SHA-${expected}`, 'algorithm.hash');
                break;
            }
            case 'EdDSA': {
                if (key.algorithm.name !== 'Ed25519' && key.algorithm.name !== 'Ed448') {
                    throw unusable('Ed25519 or Ed448');
                }
                break;
            }
            case 'ES256':
            case 'ES384':
            case 'ES512': {
                if (!isAlgorithm(key.algorithm, 'ECDSA'))
                    throw unusable('ECDSA');
                const expected = getNamedCurve$1(alg);
                const actual = key.algorithm.namedCurve;
                if (actual !== expected)
                    throw unusable(expected, 'algorithm.namedCurve');
                break;
            }
            default:
                throw new TypeError('CryptoKey does not support this operation');
        }
        checkUsage(key, usages);
    }

    function message(msg, actual, ...types) {
        if (types.length > 2) {
            const last = types.pop();
            msg += `one of type ${types.join(', ')}, or ${last}.`;
        }
        else if (types.length === 2) {
            msg += `one of type ${types[0]} or ${types[1]}.`;
        }
        else {
            msg += `of type ${types[0]}.`;
        }
        if (actual == null) {
            msg += ` Received ${actual}`;
        }
        else if (typeof actual === 'function' && actual.name) {
            msg += ` Received function ${actual.name}`;
        }
        else if (typeof actual === 'object' && actual != null) {
            if (actual.constructor?.name) {
                msg += ` Received an instance of ${actual.constructor.name}`;
            }
        }
        return msg;
    }
    var invalidKeyInput = (actual, ...types) => {
        return message('Key must be ', actual, ...types);
    };
    function withAlg(alg, actual, ...types) {
        return message(`Key for the ${alg} algorithm must be `, actual, ...types);
    }

    var isKeyLike = (key) => {
        return isCryptoKey(key);
    };
    const types = ['CryptoKey'];

    const isDisjoint = (...headers) => {
        const sources = headers.filter(Boolean);
        if (sources.length === 0 || sources.length === 1) {
            return true;
        }
        let acc;
        for (const header of sources) {
            const parameters = Object.keys(header);
            if (!acc || acc.size === 0) {
                acc = new Set(parameters);
                continue;
            }
            for (const parameter of parameters) {
                if (acc.has(parameter)) {
                    return false;
                }
                acc.add(parameter);
            }
        }
        return true;
    };

    function isObjectLike(value) {
        return typeof value === 'object' && value !== null;
    }
    function isObject(input) {
        if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
            return false;
        }
        if (Object.getPrototypeOf(input) === null) {
            return true;
        }
        let proto = input;
        while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
        }
        return Object.getPrototypeOf(input) === proto;
    }

    var checkKeyLength = (alg, key) => {
        if (alg.startsWith('RS') || alg.startsWith('PS')) {
            const { modulusLength } = key.algorithm;
            if (typeof modulusLength !== 'number' || modulusLength < 2048) {
                throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
            }
        }
    };

    const findOid = (keyData, oid, from = 0) => {
        if (from === 0) {
            oid.unshift(oid.length);
            oid.unshift(0x06);
        }
        const i = keyData.indexOf(oid[0], from);
        if (i === -1)
            return false;
        const sub = keyData.subarray(i, i + oid.length);
        if (sub.length !== oid.length)
            return false;
        return sub.every((value, index) => value === oid[index]) || findOid(keyData, oid, i + 1);
    };
    const getNamedCurve = (keyData) => {
        switch (true) {
            case findOid(keyData, [0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07]):
                return 'P-256';
            case findOid(keyData, [0x2b, 0x81, 0x04, 0x00, 0x22]):
                return 'P-384';
            case findOid(keyData, [0x2b, 0x81, 0x04, 0x00, 0x23]):
                return 'P-521';
            case findOid(keyData, [0x2b, 0x65, 0x6e]):
                return 'X25519';
            case findOid(keyData, [0x2b, 0x65, 0x6f]):
                return 'X448';
            case findOid(keyData, [0x2b, 0x65, 0x70]):
                return 'Ed25519';
            case findOid(keyData, [0x2b, 0x65, 0x71]):
                return 'Ed448';
            default:
                throw new JOSENotSupported('Invalid or unsupported EC Key Curve or OKP Key Sub Type');
        }
    };
    const genericImport = async (replace, keyFormat, pem, alg, options) => {
        let algorithm;
        let keyUsages;
        const keyData = new Uint8Array(atob(pem.replace(replace, ''))
            .split('')
            .map((c) => c.charCodeAt(0)));
        const isPublic = keyFormat === 'spki';
        switch (alg) {
            case 'PS256':
            case 'PS384':
            case 'PS512':
                algorithm = { name: 'RSA-PSS', hash: `SHA-${alg.slice(-3)}` };
                keyUsages = isPublic ? ['verify'] : ['sign'];
                break;
            case 'RS256':
            case 'RS384':
            case 'RS512':
                algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: `SHA-${alg.slice(-3)}` };
                keyUsages = isPublic ? ['verify'] : ['sign'];
                break;
            case 'RSA-OAEP':
            case 'RSA-OAEP-256':
            case 'RSA-OAEP-384':
            case 'RSA-OAEP-512':
                algorithm = {
                    name: 'RSA-OAEP',
                    hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`,
                };
                keyUsages = isPublic ? ['encrypt', 'wrapKey'] : ['decrypt', 'unwrapKey'];
                break;
            case 'ES256':
                algorithm = { name: 'ECDSA', namedCurve: 'P-256' };
                keyUsages = isPublic ? ['verify'] : ['sign'];
                break;
            case 'ES384':
                algorithm = { name: 'ECDSA', namedCurve: 'P-384' };
                keyUsages = isPublic ? ['verify'] : ['sign'];
                break;
            case 'ES512':
                algorithm = { name: 'ECDSA', namedCurve: 'P-521' };
                keyUsages = isPublic ? ['verify'] : ['sign'];
                break;
            case 'ECDH-ES':
            case 'ECDH-ES+A128KW':
            case 'ECDH-ES+A192KW':
            case 'ECDH-ES+A256KW': {
                const namedCurve = getNamedCurve(keyData);
                algorithm = namedCurve.startsWith('P-') ? { name: 'ECDH', namedCurve } : { name: namedCurve };
                keyUsages = isPublic ? [] : ['deriveBits'];
                break;
            }
            case 'EdDSA':
                algorithm = { name: getNamedCurve(keyData) };
                keyUsages = isPublic ? ['verify'] : ['sign'];
                break;
            default:
                throw new JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
        }
        return crypto$1.subtle.importKey(keyFormat, keyData, algorithm, options?.extractable ?? false, keyUsages);
    };
    const fromPKCS8 = (pem, alg, options) => {
        return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, 'pkcs8', pem, alg, options);
    };

    async function importPKCS8(pkcs8, alg, options) {
        if (typeof pkcs8 !== 'string' || pkcs8.indexOf('-----BEGIN PRIVATE KEY-----') !== 0) {
            throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
        }
        return fromPKCS8(pkcs8, alg, options);
    }

    const symmetricTypeCheck = (alg, key) => {
        if (key instanceof Uint8Array)
            return;
        if (!isKeyLike(key)) {
            throw new TypeError(withAlg(alg, key, ...types, 'Uint8Array'));
        }
        if (key.type !== 'secret') {
            throw new TypeError(`${types.join(' or ')} instances for symmetric algorithms must be of type "secret"`);
        }
    };
    const asymmetricTypeCheck = (alg, key, usage) => {
        if (!isKeyLike(key)) {
            throw new TypeError(withAlg(alg, key, ...types));
        }
        if (key.type === 'secret') {
            throw new TypeError(`${types.join(' or ')} instances for asymmetric algorithms must not be of type "secret"`);
        }
        if (usage === 'sign' && key.type === 'public') {
            throw new TypeError(`${types.join(' or ')} instances for asymmetric algorithm signing must be of type "private"`);
        }
        if (usage === 'decrypt' && key.type === 'public') {
            throw new TypeError(`${types.join(' or ')} instances for asymmetric algorithm decryption must be of type "private"`);
        }
        if (key.algorithm && usage === 'verify' && key.type === 'private') {
            throw new TypeError(`${types.join(' or ')} instances for asymmetric algorithm verifying must be of type "public"`);
        }
        if (key.algorithm && usage === 'encrypt' && key.type === 'private') {
            throw new TypeError(`${types.join(' or ')} instances for asymmetric algorithm encryption must be of type "public"`);
        }
    };
    const checkKeyType = (alg, key, usage) => {
        const symmetric = alg.startsWith('HS') ||
            alg === 'dir' ||
            alg.startsWith('PBES2') ||
            /^A\d{3}(?:GCM)?KW$/.test(alg);
        if (symmetric) {
            symmetricTypeCheck(alg, key);
        }
        else {
            asymmetricTypeCheck(alg, key, usage);
        }
    };

    function validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
        if (joseHeader.crit !== undefined && protectedHeader?.crit === undefined) {
            throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
        }
        if (!protectedHeader || protectedHeader.crit === undefined) {
            return new Set();
        }
        if (!Array.isArray(protectedHeader.crit) ||
            protectedHeader.crit.length === 0 ||
            protectedHeader.crit.some((input) => typeof input !== 'string' || input.length === 0)) {
            throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
        }
        let recognized;
        if (recognizedOption !== undefined) {
            recognized = new Map([...Object.entries(recognizedOption), ...recognizedDefault.entries()]);
        }
        else {
            recognized = recognizedDefault;
        }
        for (const parameter of protectedHeader.crit) {
            if (!recognized.has(parameter)) {
                throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
            }
            if (joseHeader[parameter] === undefined) {
                throw new Err(`Extension Header Parameter "${parameter}" is missing`);
            }
            if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
                throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
            }
        }
        return new Set(protectedHeader.crit);
    }

    function subtleDsa(alg, algorithm) {
        const hash = `SHA-${alg.slice(-3)}`;
        switch (alg) {
            case 'HS256':
            case 'HS384':
            case 'HS512':
                return { hash, name: 'HMAC' };
            case 'PS256':
            case 'PS384':
            case 'PS512':
                return { hash, name: 'RSA-PSS', saltLength: alg.slice(-3) >> 3 };
            case 'RS256':
            case 'RS384':
            case 'RS512':
                return { hash, name: 'RSASSA-PKCS1-v1_5' };
            case 'ES256':
            case 'ES384':
            case 'ES512':
                return { hash, name: 'ECDSA', namedCurve: algorithm.namedCurve };
            case 'EdDSA':
                return { name: algorithm.name };
            default:
                throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
        }
    }

    function getCryptoKey(alg, key, usage) {
        if (isCryptoKey(key)) {
            checkSigCryptoKey(key, alg, usage);
            return key;
        }
        if (key instanceof Uint8Array) {
            if (!alg.startsWith('HS')) {
                throw new TypeError(invalidKeyInput(key, ...types));
            }
            return crypto$1.subtle.importKey('raw', key, { hash: `SHA-${alg.slice(-3)}`, name: 'HMAC' }, false, [usage]);
        }
        throw new TypeError(invalidKeyInput(key, ...types, 'Uint8Array'));
    }

    var epoch = (date) => Math.floor(date.getTime() / 1000);

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const year = day * 365.25;
    const REGEX = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i;
    var secs = (str) => {
        const matched = REGEX.exec(str);
        if (!matched || (matched[4] && matched[1])) {
            throw new TypeError('Invalid time period format');
        }
        const value = parseFloat(matched[2]);
        const unit = matched[3].toLowerCase();
        let numericDate;
        switch (unit) {
            case 'sec':
            case 'secs':
            case 'second':
            case 'seconds':
            case 's':
                numericDate = Math.round(value);
                break;
            case 'minute':
            case 'minutes':
            case 'min':
            case 'mins':
            case 'm':
                numericDate = Math.round(value * minute);
                break;
            case 'hour':
            case 'hours':
            case 'hr':
            case 'hrs':
            case 'h':
                numericDate = Math.round(value * hour);
                break;
            case 'day':
            case 'days':
            case 'd':
                numericDate = Math.round(value * day);
                break;
            case 'week':
            case 'weeks':
            case 'w':
                numericDate = Math.round(value * week);
                break;
            default:
                numericDate = Math.round(value * year);
                break;
        }
        if (matched[1] === '-' || matched[4] === 'ago') {
            return -numericDate;
        }
        return numericDate;
    };

    const sign = async (alg, key, data) => {
        const cryptoKey = await getCryptoKey(alg, key, 'sign');
        checkKeyLength(alg, cryptoKey);
        const signature = await crypto$1.subtle.sign(subtleDsa(alg, cryptoKey.algorithm), cryptoKey, data);
        return new Uint8Array(signature);
    };

    class FlattenedSign {
        constructor(payload) {
            if (!(payload instanceof Uint8Array)) {
                throw new TypeError('payload must be an instance of Uint8Array');
            }
            this._payload = payload;
        }
        setProtectedHeader(protectedHeader) {
            if (this._protectedHeader) {
                throw new TypeError('setProtectedHeader can only be called once');
            }
            this._protectedHeader = protectedHeader;
            return this;
        }
        setUnprotectedHeader(unprotectedHeader) {
            if (this._unprotectedHeader) {
                throw new TypeError('setUnprotectedHeader can only be called once');
            }
            this._unprotectedHeader = unprotectedHeader;
            return this;
        }
        async sign(key, options) {
            if (!this._protectedHeader && !this._unprotectedHeader) {
                throw new JWSInvalid('either setProtectedHeader or setUnprotectedHeader must be called before #sign()');
            }
            if (!isDisjoint(this._protectedHeader, this._unprotectedHeader)) {
                throw new JWSInvalid('JWS Protected and JWS Unprotected Header Parameter names must be disjoint');
            }
            const joseHeader = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
            };
            const extensions = validateCrit(JWSInvalid, new Map([['b64', true]]), options?.crit, this._protectedHeader, joseHeader);
            let b64 = true;
            if (extensions.has('b64')) {
                b64 = this._protectedHeader.b64;
                if (typeof b64 !== 'boolean') {
                    throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
                }
            }
            const { alg } = joseHeader;
            if (typeof alg !== 'string' || !alg) {
                throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
            }
            checkKeyType(alg, key, 'sign');
            let payload = this._payload;
            if (b64) {
                payload = encoder.encode(encode(payload));
            }
            let protectedHeader;
            if (this._protectedHeader) {
                protectedHeader = encoder.encode(encode(JSON.stringify(this._protectedHeader)));
            }
            else {
                protectedHeader = encoder.encode('');
            }
            const data = concat(protectedHeader, encoder.encode('.'), payload);
            const signature = await sign(alg, key, data);
            const jws = {
                signature: encode(signature),
                payload: '',
            };
            if (b64) {
                jws.payload = decoder.decode(payload);
            }
            if (this._unprotectedHeader) {
                jws.header = this._unprotectedHeader;
            }
            if (this._protectedHeader) {
                jws.protected = decoder.decode(protectedHeader);
            }
            return jws;
        }
    }

    class CompactSign {
        constructor(payload) {
            this._flattened = new FlattenedSign(payload);
        }
        setProtectedHeader(protectedHeader) {
            this._flattened.setProtectedHeader(protectedHeader);
            return this;
        }
        async sign(key, options) {
            const jws = await this._flattened.sign(key, options);
            if (jws.payload === undefined) {
                throw new TypeError('use the flattened module for creating JWS with b64: false');
            }
            return `${jws.protected}.${jws.payload}.${jws.signature}`;
        }
    }

    function validateInput(label, input) {
        if (!Number.isFinite(input)) {
            throw new TypeError(`Invalid ${label} input`);
        }
        return input;
    }
    class ProduceJWT {
        constructor(payload = {}) {
            if (!isObject(payload)) {
                throw new TypeError('JWT Claims Set MUST be an object');
            }
            this._payload = payload;
        }
        setIssuer(issuer) {
            this._payload = { ...this._payload, iss: issuer };
            return this;
        }
        setSubject(subject) {
            this._payload = { ...this._payload, sub: subject };
            return this;
        }
        setAudience(audience) {
            this._payload = { ...this._payload, aud: audience };
            return this;
        }
        setJti(jwtId) {
            this._payload = { ...this._payload, jti: jwtId };
            return this;
        }
        setNotBefore(input) {
            if (typeof input === 'number') {
                this._payload = { ...this._payload, nbf: validateInput('setNotBefore', input) };
            }
            else if (input instanceof Date) {
                this._payload = { ...this._payload, nbf: validateInput('setNotBefore', epoch(input)) };
            }
            else {
                this._payload = { ...this._payload, nbf: epoch(new Date()) + secs(input) };
            }
            return this;
        }
        setExpirationTime(input) {
            if (typeof input === 'number') {
                this._payload = { ...this._payload, exp: validateInput('setExpirationTime', input) };
            }
            else if (input instanceof Date) {
                this._payload = { ...this._payload, exp: validateInput('setExpirationTime', epoch(input)) };
            }
            else {
                this._payload = { ...this._payload, exp: epoch(new Date()) + secs(input) };
            }
            return this;
        }
        setIssuedAt(input) {
            if (typeof input === 'undefined') {
                this._payload = { ...this._payload, iat: epoch(new Date()) };
            }
            else if (input instanceof Date) {
                this._payload = { ...this._payload, iat: validateInput('setIssuedAt', epoch(input)) };
            }
            else if (typeof input === 'string') {
                this._payload = {
                    ...this._payload,
                    iat: validateInput('setIssuedAt', epoch(new Date()) + secs(input)),
                };
            }
            else {
                this._payload = { ...this._payload, iat: validateInput('setIssuedAt', input) };
            }
            return this;
        }
    }

    class SignJWT extends ProduceJWT {
        setProtectedHeader(protectedHeader) {
            this._protectedHeader = protectedHeader;
            return this;
        }
        async sign(key, options) {
            const sig = new CompactSign(encoder.encode(JSON.stringify(this._payload)));
            sig.setProtectedHeader(this._protectedHeader);
            if (Array.isArray(this._protectedHeader?.crit) &&
                this._protectedHeader.crit.includes('b64') &&
                this._protectedHeader.b64 === false) {
                throw new JWTInvalid('JWTs MUST NOT use unencoded payload');
            }
            return sig.sign(key, options);
        }
    }

    var _Hash_hash, _Hash_chunks;
    function isBrowser() {
        return (typeof window === 'object' && typeof document === 'object' && window.crypto);
    }
    function getUuid() {
        return v4();
    }
    function hexToBase64(data) {
        return buffer.Buffer.from(data, 'hex').toString('base64');
    }
    // Function to convert a hexadecimal string to base64
    function hexStrToBase64(hex) {
        const hexString = hex.toString(); // Ensure the input is a string
        const hexBytes = new Uint8Array(hexString.length / 2);
        // Convert the hexadecimal string to bytes
        for (let i = 0; i < hexString.length; i += 2) {
            hexBytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
        }
        // Encode the bytes as base64
        const base64 = btoa(String.fromCharCode.apply(null, Array.from(hexBytes)));
        return base64;
    }
    class Hash {
        constructor({ algorithm }) {
            _Hash_hash.set(this, void 0);
            _Hash_chunks.set(this, void 0); // In browser environment, we need to buffer the chunks until we get the hash object
            this.algorithm = algorithm;
            __classPrivateFieldSet(this, _Hash_chunks, new Uint8Array(), "f");
            if (isBrowser()) {
                __classPrivateFieldSet(this, _Hash_hash, undefined, "f");
            }
            else {
                __classPrivateFieldSet(this, _Hash_hash, eval('require')('crypto').createHash(algorithm), "f");
            }
        }
        updateHash(data) {
            if (isBrowser()) {
                let dataBuffer = typeof data === 'string' ? new TextEncoder().encode(data) : data;
                let newChunks = new Uint8Array(__classPrivateFieldGet(this, _Hash_chunks, "f").length + dataBuffer.length);
                newChunks.set(__classPrivateFieldGet(this, _Hash_chunks, "f"));
                newChunks.set(dataBuffer, __classPrivateFieldGet(this, _Hash_chunks, "f").length);
                __classPrivateFieldSet(this, _Hash_chunks, newChunks, "f");
                return;
            }
            __classPrivateFieldGet(this, _Hash_hash, "f").update(data);
        }
        digestHash(encoding) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isBrowser()) {
                    __classPrivateFieldSet(this, _Hash_hash, yield window.crypto.subtle.digest(this.algorithm, __classPrivateFieldGet(this, _Hash_chunks, "f")), "f");
                    const hashArray = Array.from(new Uint8Array(__classPrivateFieldGet(this, _Hash_hash, "f")));
                    const hashHex = hashArray
                        .map((b) => b.toString(16).padStart(2, '0'))
                        .join('');
                    if (encoding === 'base64') {
                        return hexStrToBase64(hashHex);
                    }
                    return hashHex;
                }
                return __classPrivateFieldGet(this, _Hash_hash, "f").digest(encoding);
            });
        }
    }
    _Hash_hash = new WeakMap(), _Hash_chunks = new WeakMap();
    function generateByteStreamFromBuffer(buffer$1) {
        return isBrowser()
            ? new ReadableStream({
                start(controller) {
                    controller.enqueue(new Uint8Array(buffer$1));
                    controller.close();
                },
            })
            : eval('require')('stream').Readable.from(buffer.Buffer.from(buffer$1));
    }
    function bufferLength(buffer) {
        return buffer.length;
    }
    function readByteStream(byteStream) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, byteStream_1, byteStream_1_1;
            var _b, e_1, _c, _d;
            const buffers = [];
            try {
                for (_a = true, byteStream_1 = __asyncValues(byteStream); byteStream_1_1 = yield byteStream_1.next(), _b = byteStream_1_1.done, !_b; _a = true) {
                    _d = byteStream_1_1.value;
                    _a = false;
                    const data = _d;
                    buffers.push(data);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = byteStream_1.return)) yield _c.call(byteStream_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return buffer.Buffer.concat(buffers);
        });
    }
    function iterateChunks(stream, chunkSize) {
        return __asyncGenerator(this, arguments, function* iterateChunks_1() {
            var _a, e_2, _b, _c;
            let buffers = [];
            let totalSize = 0;
            try {
                for (var _d = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield __await(stream_1.next()), _a = stream_1_1.done, !_a; _d = true) {
                    _c = stream_1_1.value;
                    _d = false;
                    const data = _c;
                    if (!buffer.Buffer.isBuffer(data)) {
                        throw new Error('Expecting a chunk of stream to be a Buffer');
                    }
                    buffers.push(data);
                    totalSize += data.length;
                    if (totalSize < chunkSize) {
                        continue;
                    }
                    const buffer$1 = buffer.Buffer.concat(buffers);
                    let start = 0;
                    while (totalSize >= chunkSize) {
                        yield yield __await(generateByteStreamFromBuffer(buffer$1.subarray(start, start + chunkSize)));
                        start += chunkSize;
                        totalSize -= chunkSize;
                    }
                    buffers = totalSize > 0 ? [buffer$1.subarray(start)] : [];
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = stream_1.return)) yield __await(_b.call(stream_1));
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (totalSize > 0) {
                yield yield __await(generateByteStreamFromBuffer(buffer.Buffer.concat(buffers)));
            }
        });
    }
    function reduceIterator(iterator, reducer, initialValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = initialValue;
            let iteration = yield iterator.next();
            while (!iteration.done) {
                result = yield reducer(result, iteration.value);
                iteration = yield iterator.next();
            }
            return result;
        });
    }
    function prepareParams(map) {
        if (!map || typeof map !== 'object') {
            throw new Error('Expecting obj to be an object in prepareParams');
        }
        return Object.fromEntries(Object.entries(map).filter((entry) => typeof entry[1] === 'string'));
    }
    function toString(value) {
        if (typeof value === 'string' || value == null) {
            return value;
        }
        return String(value);
    }
    /**
     * Creates a JWT assertion.
     *
     * @param claims
     * @param key
     * @param options
     * @returns
     */
    function createJwtAssertion(claims, key, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const crypto = eval('require')('crypto');
            const privateKey = crypto.createPrivateKey({
                key: key.key,
                format: 'pem',
                type: 'pkcs8',
                passphrase: key.passphrase,
            });
            const pem = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();
            const pkcs8 = yield importPKCS8(pem, options.algorithm || 'RS256');
            let signer = new SignJWT(claims);
            signer = options.audience ? signer.setAudience(options.audience) : signer;
            signer = options.expiresIn
                ? signer.setExpirationTime(options.expiresIn)
                : signer;
            signer = options.issuer ? signer.setIssuer(options.issuer) : signer;
            signer = options.jwtid ? signer.setJti(options.jwtid) : signer;
            signer = options.notBefore ? signer.setNotBefore(options.notBefore) : signer;
            signer = options.subject ? signer.setSubject(options.subject) : signer;
            signer = options.algorithm
                ? signer.setProtectedHeader({ alg: options.algorithm })
                : signer;
            signer = signer.setIssuedAt();
            return yield signer.sign(pkcs8);
        });
    }
    /**
     * Reads a text file and returns its content.
     */
    function readTextFromFile(filepath) {
        return eval('require')('fs').readFileSync(filepath, 'utf8');
    }
    /**
     * Get current epoch time in seconds.
     */
    function getEpochTimeInSeconds() {
        return Math.floor(Date.now() / 1000);
    }
    /**
     * Create web agent from proxy agent options.
     */
    function createAgent(options) {
        if (isBrowser()) {
            return undefined;
        }
        const ProxyAgent = eval('require')('proxy-agent').ProxyAgent;
        return options ? new ProxyAgent(options) : new ProxyAgent();
    }

    class NetworkSession {
        constructor(fields) {
            this.additionalHeaders = {};
            this.interceptors = [];
            this.agent = createAgent(void 0);
            Object.assign(this, fields);
        }
        withAdditionalHeaders(additionalHeaders = {}) {
            return new NetworkSession({
                additionalHeaders: Object.assign(Object.assign({}, this.additionalHeaders), additionalHeaders),
                baseUrls: this.baseUrls,
                interceptors: this.interceptors,
                agent: this.agent,
                agentOptions: this.agentOptions,
            });
        }
        withCustomBaseUrls(baseUrls) {
            return new NetworkSession({
                additionalHeaders: this.additionalHeaders,
                baseUrls: baseUrls,
                interceptors: this.interceptors,
                agent: this.agent,
                agentOptions: this.agentOptions,
            });
        }
        withCustomAgentOptions(agentOptions) {
            return new NetworkSession({
                additionalHeaders: this.additionalHeaders,
                baseUrls: this.baseUrls,
                interceptors: this.interceptors,
                agent: createAgent(agentOptions),
                agentOptions: this.agentOptions,
            });
        }
        withInterceptors(interceptors) {
            return new NetworkSession({
                additionalHeaders: this.additionalHeaders,
                baseUrls: this.baseUrls,
                interceptors: this.interceptors.concat(interceptors),
                agent: this.agent,
                agentOptions: this.agentOptions,
            });
        }
    }

    var browser = {exports: {}};

    (function (module, exports) {

    	// ref: https://github.com/tc39/proposal-global
    	var getGlobal = function () {
    		// the only reliable means to get the global object is
    		// `Function('return this')()`
    		// However, this causes CSP violations in Chrome apps.
    		if (typeof self !== 'undefined') { return self; }
    		if (typeof window !== 'undefined') { return window; }
    		if (typeof commonjsGlobal !== 'undefined') { return commonjsGlobal; }
    		throw new Error('unable to locate global object');
    	};

    	var globalObject = getGlobal();

    	module.exports = exports = globalObject.fetch;

    	// Needed for TypeScript and Webpack.
    	if (globalObject.fetch) {
    		exports.default = globalObject.fetch.bind(globalObject);
    	}

    	exports.Headers = globalObject.Headers;
    	exports.Request = globalObject.Request;
    	exports.Response = globalObject.Response; 
    } (browser, browser.exports));

    var browserExports = browser.exports;
    var nodeFetch = /*@__PURE__*/getDefaultExportFromCjs(browserExports);

    const sdkVersion = '0.5.3';

    // Retry intervals are between 50% and 150% of the exponentially increasing base amount
    const RETRY_RANDOMIZATION_FACTOR = 0.5;
    /**
     * Calculate the exponential backoff time with randomized jitter
     * @param {int} numRetries Which retry number this one will be
     * @param {int} baseInterval The base retry interval set in config
     * @returns {int} The number of milliseconds after which to retry
     */
    function getRetryTimeout(numRetries, baseInterval) {
        var minRandomization = 1 - RETRY_RANDOMIZATION_FACTOR;
        var maxRandomization = 1 + RETRY_RANDOMIZATION_FACTOR;
        var randomization = Math.random() * (maxRandomization - minRandomization) + minRandomization;
        var exponential = Math.pow(2, numRetries - 1);
        return Math.ceil(exponential * baseInterval * randomization);
    }

    const userAgentHeader = `Box JavaScript generated SDK v${sdkVersion} (${isBrowser() ? navigator.userAgent : `Node ${process.version}`})`;
    const xBoxUaHeader = constructBoxUAHeader();
    function createRequestInit(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { method = 'GET', headers = {}, contentType: contentTypeInput = 'application/json', data, fileStream, } = options;
            const { contentType, body } = yield (() => __awaiter(this, void 0, void 0, function* () {
                var _c, _d;
                if (options.multipartData) {
                    const FormData = isBrowser()
                        ? window.FormData
                        : eval('require')('form-data');
                    const formData = new FormData();
                    for (const item of options.multipartData) {
                        if (item.fileStream) {
                            const buffer = yield readStream(item.fileStream);
                            headers['content-md5'] = yield calculateMD5Hash(buffer);
                            formData.append(item.partName, buffer, {
                                filename: (_c = item.fileName) !== null && _c !== void 0 ? _c : 'file',
                                contentType: (_d = item.contentType) !== null && _d !== void 0 ? _d : 'application/octet-stream',
                            });
                        }
                        else if (item.data) {
                            formData.append(item.partName, sdToJson(item.data));
                        }
                        else {
                            throw new BoxSdkError({
                                message: 'Multipart item must have either body or fileStream',
                            });
                        }
                    }
                    return {
                        contentType: `multipart/form-data; boundary=${formData.getBoundary()}`,
                        body: formData,
                    };
                }
                const contentType = contentTypeInput;
                switch (contentType) {
                    case 'application/json':
                    case 'application/json-patch+json':
                        return { contentType, body: sdToJson(data) };
                    case 'application/x-www-form-urlencoded':
                        return { contentType, body: sdToUrlParams(data) };
                    case 'application/octet-stream':
                        if (!fileStream) {
                            throw new BoxSdkError({
                                message: 'fileStream required for application/octet-stream content type',
                            });
                        }
                        return { contentType, body: fileStream };
                    default:
                        throw new BoxSdkError({
                            message: `Unsupported content type : ${contentType}`,
                        });
                }
            }))();
            return {
                method,
                headers: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (_a = options.networkSession) === null || _a === void 0 ? void 0 : _a.additionalHeaders), { 'Content-Type': contentType }), headers), (options.auth && {
                    Authorization: yield options.auth.retrieveAuthorizationHeader(options.networkSession),
                })), { 'User-Agent': userAgentHeader, 'X-Box-UA': xBoxUaHeader }),
                body,
                signal: options.cancellationToken,
                agent: (_b = options.networkSession) === null || _b === void 0 ? void 0 : _b.agent,
            };
        });
    }
    const DEFAULT_MAX_ATTEMPTS = 5;
    const RETRY_BASE_INTERVAL = 1;
    function fetch(resource, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const fetchOptions = ((_b = (_a = options.networkSession) === null || _a === void 0 ? void 0 : _a.interceptors) === null || _b === void 0 ? void 0 : _b.length)
                ? (_c = options.networkSession) === null || _c === void 0 ? void 0 : _c.interceptors.reduce((modifiedOptions, interceptor) => interceptor.beforeRequest(modifiedOptions), options)
                : options;
            const requestInit = yield createRequestInit(fetchOptions);
            const { params = {} } = fetchOptions;
            const response = yield nodeFetch(''.concat(resource, Object.keys(params).length === 0 || resource.endsWith('?') ? '' : '?', new URLSearchParams(params).toString()), Object.assign(Object.assign({}, requestInit), { redirect: 'manual' }));
            const contentType = (_d = response.headers.get('content-type')) !== null && _d !== void 0 ? _d : '';
            const responseBytesBuffer = yield response.arrayBuffer();
            const data = (() => {
                if (contentType.includes('application/json')) {
                    const text = new TextDecoder().decode(responseBytesBuffer);
                    return jsonToSerializedData(text);
                }
                return void 0;
            })();
            const content = generateByteStreamFromBuffer(responseBytesBuffer);
            let fetchResponse = {
                status: response.status,
                data,
                content,
                headers: Object.fromEntries(Array.from(response.headers.entries())),
            };
            if ((_f = (_e = fetchOptions.networkSession) === null || _e === void 0 ? void 0 : _e.interceptors) === null || _f === void 0 ? void 0 : _f.length) {
                fetchResponse = (_g = fetchOptions.networkSession) === null || _g === void 0 ? void 0 : _g.interceptors.reduce((modifiedResponse, interceptor) => interceptor.afterRequest(modifiedResponse), fetchResponse);
            }
            if (fetchResponse.status >= 300 && fetchResponse.status < 400) {
                if (!fetchResponse.headers['location']) {
                    throw new BoxSdkError({
                        message: `Unable to follow redirect for ${resource}`,
                    });
                }
                return fetch(fetchResponse.headers['location'], options);
            }
            if (fetchResponse.status >= 400) {
                const { numRetries = 0 } = fetchOptions;
                const reauthenticationNeeded = fetchResponse.status == 401;
                if (reauthenticationNeeded && fetchOptions.auth) {
                    yield fetchOptions.auth.refreshToken(fetchOptions.networkSession);
                    // retry the request right away
                    return fetch(resource, Object.assign(Object.assign({}, fetchOptions), { numRetries: numRetries + 1 }));
                }
                const isRetryable = fetchOptions.contentType !== 'application/x-www-form-urlencoded' &&
                    (fetchResponse.status === 429 || fetchResponse.status >= 500);
                if (isRetryable && numRetries < DEFAULT_MAX_ATTEMPTS) {
                    const retryTimeout = fetchResponse.headers['retry-after']
                        ? parseFloat(fetchResponse.headers['retry-after']) * 1000
                        : getRetryTimeout(numRetries, RETRY_BASE_INTERVAL * 1000);
                    yield new Promise((resolve) => setTimeout(resolve, retryTimeout));
                    return fetch(resource, Object.assign(Object.assign({}, fetchOptions), { numRetries: numRetries + 1 }));
                }
                const [code, contextInfo, requestId, helpUrl] = sdIsMap(fetchResponse.data)
                    ? [
                        sdToJson(fetchResponse.data['code']),
                        sdIsMap(fetchResponse.data['context_info'])
                            ? fetchResponse.data['context_info']
                            : undefined,
                        sdToJson(fetchResponse.data['request_id']),
                        sdToJson(fetchResponse.data['help_url']),
                    ]
                    : [];
                throw new BoxApiError({
                    message: `${fetchResponse.status}`,
                    timestamp: `${Date.now()}`,
                    requestInfo: {
                        method: requestInit.method,
                        url: resource,
                        queryParams: params,
                        headers: (_h = requestInit.headers) !== null && _h !== void 0 ? _h : {},
                        body: requestInit.body,
                    },
                    responseInfo: {
                        statusCode: fetchResponse.status,
                        headers: fetchResponse.headers,
                        body: fetchResponse.data,
                        rawBody: new TextDecoder().decode(responseBytesBuffer),
                        code: code,
                        contextInfo: contextInfo,
                        requestId: requestId,
                        helpUrl: helpUrl,
                    },
                    name: 'BoxApiError',
                });
            }
            return fetchResponse;
        });
    }
    function calculateMD5Hash(data) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * Calculate the SHA1 hash of the data
             */
            let createHash;
            // Browser environment
            if (isBrowser()) {
                let dataBuffer = typeof data === 'string' ? new TextEncoder().encode(data) : data;
                let hashBuffer = yield window.crypto.subtle.digest('SHA-1', dataBuffer);
                let hashArray = Array.from(new Uint8Array(hashBuffer));
                let hashHex = hashArray
                    .map((b) => b.toString(16).padStart(2, '0'))
                    .join('');
                return hashHex;
            }
            // Node environment
            createHash = eval('require')('crypto').createHash;
            return createHash('sha1').update(data).digest('hex');
        });
    }
    function readStream(fileStream) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const chunks = [];
                fileStream.on('data', (chunk) => chunks.push(chunk));
                fileStream.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
                fileStream.on('error', (err) => reject(err));
            });
        });
    }
    function constructBoxUAHeader() {
        const analyticsIdentifiers = {
            agent: `box-javascript-generated-sdk/${sdkVersion}`,
            env: isBrowser()
                ? navigator.userAgent
                : `Node/${process.version.replace('v', '')}`,
        };
        return Object.keys(analyticsIdentifiers)
            .map((k) => `${k}=${analyticsIdentifiers[k]}`)
            .join('; ');
    }

    class AuthorizeUserHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class RequestAccessTokenHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class RefreshAccessTokenHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class RevokeAccessTokenHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class AuthorizationManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        authorizeUser(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new AuthorizeUserHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['response_type']: toString(queryParams.responseType),
                    ['client_id']: toString(queryParams.clientId),
                    ['redirect_uri']: toString(queryParams.redirectUri),
                    ['state']: toString(queryParams.state),
                    ['scope']: toString(queryParams.scope),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.oauth2Url, '/authorize'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        requestAccessToken(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new RequestAccessTokenHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat('https://api.box.com/oauth2/token'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializePostOAuth2Token(requestBody),
                    contentType: 'application/x-www-form-urlencoded',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeAccessToken(response.data);
            });
        }
        refreshAccessToken(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new RefreshAccessTokenHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat('https://api.box.com/oauth2/token#refresh'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializePostOAuth2TokenRefreshAccessToken(requestBody),
                    contentType: 'application/x-www-form-urlencoded',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeAccessToken(response.data);
            });
        }
        revokeAccessToken(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new RevokeAccessTokenHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat('https://api.box.com/oauth2/revoke'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializePostOAuth2Revoke(requestBody),
                    contentType: 'application/x-www-form-urlencoded',
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }

    class CcgConfig {
        constructor(fields) {
            this.tokenStorage = new InMemoryTokenStorage({});
            Object.assign(this, fields);
        }
    }
    class BoxCcgAuth {
        constructor(fields) {
            Object.assign(this, fields);
            this.tokenStorage =
                this.config.tokenStorage == void 0
                    ? new InMemoryTokenStorage({})
                    : this.config.tokenStorage;
            this.subjectId = !(this.config.userId == void 0)
                ? this.config.userId
                : this.config.enterpriseId;
            this.subjectType = !(this.config.userId == void 0)
                ? 'user'
                : 'enterprise';
        }
        refreshToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                const token = yield authManager.requestAccessToken({
                    grantType: 'client_credentials',
                    clientId: this.config.clientId,
                    clientSecret: this.config.clientSecret,
                    boxSubjectId: this.subjectId,
                    boxSubjectType: this.subjectType,
                });
                yield this.tokenStorage.store(token);
                return token;
            });
        }
        retrieveToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const oldToken = yield this.tokenStorage.get();
                if (oldToken == void 0) {
                    const newToken = yield this.refreshToken(networkSession);
                    return newToken;
                }
                return oldToken;
            });
        }
        retrieveAuthorizationHeader(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield this.retrieveToken(networkSession);
                return ''.concat('Bearer ', token.accessToken);
            });
        }
        withUserSubject(userId, tokenStorage = new InMemoryTokenStorage({})) {
            const newConfig = new CcgConfig({
                clientId: this.config.clientId,
                clientSecret: this.config.clientSecret,
                enterpriseId: this.config.enterpriseId,
                userId: userId,
                tokenStorage: tokenStorage,
            });
            return new BoxCcgAuth({ config: newConfig });
        }
        withEnterpriseSubject(enterpriseId, tokenStorage = new InMemoryTokenStorage({})) {
            const newConfig = new CcgConfig({
                clientId: this.config.clientId,
                clientSecret: this.config.clientSecret,
                enterpriseId: enterpriseId,
                userId: void 0,
                tokenStorage: tokenStorage,
            });
            return new BoxCcgAuth({ config: newConfig });
        }
        downscopeToken(scopes, resource, sharedLink, networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield this.tokenStorage.get();
                if (token == void 0) {
                    throw new BoxSdkError({
                        message: 'No access token is available. Make an API call to retrieve a token before calling this method.',
                    });
                }
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                const downscopedToken = yield authManager.requestAccessToken({
                    grantType: 'urn:ietf:params:oauth:grant-type:token-exchange',
                    subjectToken: token.accessToken,
                    subjectTokenType: 'urn:ietf:params:oauth:token-type:access_token',
                    resource: resource,
                    scope: scopes.join(' '),
                    boxSharedLink: sharedLink,
                });
                return downscopedToken;
            });
        }
        revokeToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const oldToken = yield this.tokenStorage.get();
                if (oldToken == void 0) {
                    return void 0;
                }
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                yield authManager.revokeAccessToken({
                    token: oldToken.accessToken,
                    clientId: this.config.clientId,
                    clientSecret: this.config.clientSecret,
                });
                return yield this.tokenStorage.clear();
            });
        }
    }

    class BoxDeveloperTokenAuth {
        constructor(fields) {
            Object.assign(this, fields);
        }
        retrieveToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                return { accessToken: this.token };
            });
        }
        refreshToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                throw new BoxSdkError({
                    message: 'Developer token has expired. Please provide a new one.',
                });
            });
        }
        retrieveAuthorizationHeader(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield this.retrieveToken(networkSession);
                return ''.concat('Bearer ', token.accessToken);
            });
        }
    }

    class JwtConfig {
        constructor(fields) {
            this.algorithm = 'RS256';
            this.tokenStorage = new InMemoryTokenStorage({});
            Object.assign(this, fields);
        }
        static fromConfigJsonString(configJsonString, tokenStorage) {
            const configJson = deserializeJwtConfigFile(jsonToSerializedData(configJsonString));
            const newConfig = !(tokenStorage == void 0)
                ? new JwtConfig({
                    clientId: configJson.boxAppSettings.clientId,
                    clientSecret: configJson.boxAppSettings.clientSecret,
                    enterpriseId: configJson.enterpriseId,
                    userId: configJson.userId,
                    jwtKeyId: configJson.boxAppSettings.appAuth.publicKeyId,
                    privateKey: configJson.boxAppSettings.appAuth.privateKey,
                    privateKeyPassphrase: configJson.boxAppSettings.appAuth.passphrase,
                    tokenStorage: tokenStorage,
                })
                : new JwtConfig({
                    clientId: configJson.boxAppSettings.clientId,
                    clientSecret: configJson.boxAppSettings.clientSecret,
                    enterpriseId: configJson.enterpriseId,
                    userId: configJson.userId,
                    jwtKeyId: configJson.boxAppSettings.appAuth.publicKeyId,
                    privateKey: configJson.boxAppSettings.appAuth.privateKey,
                    privateKeyPassphrase: configJson.boxAppSettings.appAuth.passphrase,
                });
            return newConfig;
        }
        static fromConfigFile(configFilePath, tokenStorage) {
            const configJsonString = readTextFromFile(configFilePath);
            return JwtConfig.fromConfigJsonString(configJsonString, tokenStorage);
        }
    }
    class BoxJwtAuth {
        constructor(fields) {
            Object.assign(this, fields);
            this.tokenStorage =
                this.config.tokenStorage == void 0
                    ? new InMemoryTokenStorage({})
                    : this.config.tokenStorage;
            this.subjectId = !(this.config.enterpriseId == void 0)
                ? this.config.enterpriseId
                : this.config.userId;
            this.subjectType = !(this.config.enterpriseId == void 0)
                ? 'enterprise'
                : 'user';
        }
        refreshToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                if (isBrowser()) {
                    throw new BoxSdkError({
                        message: 'JWT auth is not supported in browser environment.',
                    });
                }
                const alg = !(this.config.algorithm == void 0)
                    ? this.config.algorithm
                    : 'RS256';
                const claims = {
                    ['exp']: getEpochTimeInSeconds() + 30,
                    ['box_sub_type']: this.subjectType,
                };
                const jwtOptions = {
                    algorithm: alg,
                    audience: 'https://api.box.com/oauth2/token',
                    subject: this.subjectId,
                    issuer: this.config.clientId,
                    jwtid: getUuid(),
                    keyid: this.config.jwtKeyId,
                };
                const jwtKey = {
                    key: this.config.privateKey,
                    passphrase: this.config.privateKeyPassphrase,
                };
                const assertion = yield createJwtAssertion(claims, jwtKey, jwtOptions);
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                const token = yield authManager.requestAccessToken({
                    grantType: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    assertion: assertion,
                    clientId: this.config.clientId,
                    clientSecret: this.config.clientSecret,
                });
                yield this.tokenStorage.store(token);
                return token;
            });
        }
        retrieveToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const oldToken = yield this.tokenStorage.get();
                if (oldToken == void 0) {
                    const newToken = yield this.refreshToken(networkSession);
                    return newToken;
                }
                return oldToken;
            });
        }
        retrieveAuthorizationHeader(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield this.retrieveToken(networkSession);
                return ''.concat('Bearer ', token.accessToken);
            });
        }
        withUserSubject(userId, tokenStorage = new InMemoryTokenStorage({})) {
            const newConfig = new JwtConfig({
                clientId: this.config.clientId,
                clientSecret: this.config.clientSecret,
                enterpriseId: void 0,
                userId: userId,
                jwtKeyId: this.config.jwtKeyId,
                privateKey: this.config.privateKey,
                privateKeyPassphrase: this.config.privateKeyPassphrase,
                tokenStorage: tokenStorage,
            });
            const newAuth = new BoxJwtAuth({ config: newConfig });
            return newAuth;
        }
        withEnterpriseSubject(userId, tokenStorage = new InMemoryTokenStorage({})) {
            const newConfig = new JwtConfig({
                clientId: this.config.clientId,
                clientSecret: this.config.clientSecret,
                enterpriseId: userId,
                userId: void 0,
                jwtKeyId: this.config.jwtKeyId,
                privateKey: this.config.privateKey,
                privateKeyPassphrase: this.config.privateKeyPassphrase,
                tokenStorage: tokenStorage,
            });
            const newAuth = new BoxJwtAuth({ config: newConfig });
            return newAuth;
        }
        downscopeToken(scopes, resource, sharedLink, networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield this.tokenStorage.get();
                if (token == void 0) {
                    throw new BoxSdkError({
                        message: 'No access token is available. Make an API call to retrieve a token before calling this method.',
                    });
                }
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                const downscopedToken = yield authManager.requestAccessToken({
                    grantType: 'urn:ietf:params:oauth:grant-type:token-exchange',
                    subjectToken: token.accessToken,
                    subjectTokenType: 'urn:ietf:params:oauth:token-type:access_token',
                    resource: resource,
                    scope: scopes.join(' '),
                    boxSharedLink: sharedLink,
                });
                return downscopedToken;
            });
        }
        revokeToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const oldToken = yield this.tokenStorage.get();
                if (oldToken == void 0) {
                    return void 0;
                }
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                yield authManager.revokeAccessToken({
                    token: oldToken.accessToken,
                    clientId: this.config.clientId,
                    clientSecret: this.config.clientSecret,
                });
                return yield this.tokenStorage.clear();
            });
        }
    }
    function deserializeJwtConfigAppSettingsAppAuth(val) {
        const publicKeyId = val.publicKeyID;
        const privateKey = val.privateKey;
        const passphrase = val.passphrase;
        return {
            publicKeyId: publicKeyId,
            privateKey: privateKey,
            passphrase: passphrase,
        };
    }
    function deserializeJwtConfigAppSettings(val) {
        const clientId = val.clientID;
        const clientSecret = val.clientSecret;
        const appAuth = deserializeJwtConfigAppSettingsAppAuth(val.appAuth);
        return {
            clientId: clientId,
            clientSecret: clientSecret,
            appAuth: appAuth,
        };
    }
    function deserializeJwtConfigFile(val) {
        const enterpriseId = val.enterpriseID == void 0 ? void 0 : val.enterpriseID;
        const userId = val.userID == void 0 ? void 0 : val.userID;
        const boxAppSettings = deserializeJwtConfigAppSettings(val.boxAppSettings);
        return {
            enterpriseId: enterpriseId,
            userId: userId,
            boxAppSettings: boxAppSettings,
        };
    }

    class BoxOAuth {
        constructor(fields) {
            Object.assign(this, fields);
            this.tokenStorage =
                this.config.tokenStorage == void 0
                    ? new InMemoryTokenStorage({})
                    : this.config.tokenStorage;
        }
        getAuthorizeUrl(options = {}) {
            const paramsMap = prepareParams({
                ['client_id']: !(options.clientId == void 0)
                    ? options.clientId
                    : this.config.clientId,
                ['response_type']: !(options.responseType == void 0)
                    ? options.responseType
                    : 'code',
                ['redirect_uri']: options.redirectUri,
                ['state']: options.state,
                ['scope']: options.scope,
            });
            return ''.concat('https://account.box.com/api/oauth2/authorize?', sdToUrlParams(JSON.stringify(paramsMap)));
        }
        getTokensAuthorizationCodeGrant(authorizationCode, networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                const token = yield authManager.requestAccessToken({
                    grantType: 'authorization_code',
                    code: authorizationCode,
                    clientId: this.config.clientId,
                    clientSecret: this.config.clientSecret,
                });
                yield this.tokenStorage.store(token);
                return token;
            });
        }
        retrieveToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield this.tokenStorage.get();
                if (token == void 0) {
                    throw new BoxSdkError({
                        message: 'Access and refresh tokens not available. Authenticate before making any API call first.',
                    });
                }
                return token;
            });
        }
        refreshToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const oldToken = yield this.tokenStorage.get();
                const tokenUsedForRefresh = !(oldToken == void 0)
                    ? oldToken.refreshToken
                    : void 0;
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                const token = yield authManager.requestAccessToken({
                    grantType: 'refresh_token',
                    clientId: this.config.clientId,
                    clientSecret: this.config.clientSecret,
                    refreshToken: tokenUsedForRefresh,
                });
                yield this.tokenStorage.store(token);
                return token;
            });
        }
        retrieveAuthorizationHeader(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield this.retrieveToken(networkSession);
                return ''.concat('Bearer ', token.accessToken);
            });
        }
        revokeToken(networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield this.tokenStorage.get();
                if (token == void 0) {
                    return void 0;
                }
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                yield authManager.revokeAccessToken({
                    clientId: this.config.clientId,
                    clientSecret: this.config.clientSecret,
                    token: token.accessToken,
                });
                return void 0;
            });
        }
        downscopeToken(scopes, resource, sharedLink, networkSession) {
            return __awaiter(this, void 0, void 0, function* () {
                const token = yield this.tokenStorage.get();
                if (token == void 0 || token.accessToken == void 0) {
                    throw new BoxSdkError({ message: 'No access token is available.' });
                }
                const authManager = !(networkSession == void 0)
                    ? new AuthorizationManager({ networkSession: networkSession })
                    : new AuthorizationManager({});
                const downscopedToken = yield authManager.requestAccessToken({
                    grantType: 'urn:ietf:params:oauth:grant-type:token-exchange',
                    subjectToken: token.accessToken,
                    subjectTokenType: 'urn:ietf:params:oauth:token-type:access_token',
                    scope: scopes.join(' '),
                    resource: resource,
                    boxSharedLink: sharedLink,
                });
                return downscopedToken;
            });
        }
    }

    class GetFileByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateFileByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFileByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CopyFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFileThumbnailByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FilesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileById(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, queryParams = {}, headers = new GetFileByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({
                    ['if-none-match']: toString(headers.ifNoneMatch),
                    ['boxapi']: toString(headers.boxapi),
                    ['x-rep-hints']: toString(headers.xRepHints),
                }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileFull(response.data);
            });
        }
        updateFileById(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody = {}, queryParams = {}, headers = new UpdateFileByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({ ['if-match']: toString(headers.ifMatch) }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId)), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeUpdateFileByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileFull(response.data);
            });
        }
        deleteFileById(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new DeleteFileByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({ ['if-match']: toString(headers.ifMatch) }, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        copyFile(fileId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody, queryParams = {}, headers = new CopyFileHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/copy'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeCopyFileRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileFull(response.data);
            });
        }
        getFileThumbnailById(fileId_1, extension_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, extension, queryParams = {}, headers = new GetFileThumbnailByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['min_height']: toString(queryParams.minHeight),
                    ['min_width']: toString(queryParams.minWidth),
                    ['max_height']: toString(queryParams.maxHeight),
                    ['max_width']: toString(queryParams.maxWidth),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/thumbnail.', toString(extension)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'binary',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return response.content;
            });
        }
    }
    function serializeUpdateFileByIdRequestBodyParentField(val) {
        return { ['id']: val.id == void 0 ? void 0 : val.id };
    }
    function serializeUpdateFileByIdRequestBodySharedLinkAccessField(val) {
        return val;
    }
    function serializeUpdateFileByIdRequestBodySharedLinkPermissionsField(val) {
        return {
            ['can_download']: val.canDownload == void 0 ? void 0 : val.canDownload,
        };
    }
    function serializeUpdateFileByIdRequestBodySharedLinkField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeUpdateFileByIdRequestBodySharedLinkAccessField(val.access),
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['vanity_name']: val.vanityName == void 0 ? void 0 : val.vanityName,
            ['unshared_at']: val.unsharedAt == void 0 ? void 0 : val.unsharedAt,
            ['permissions']: val.permissions == void 0
                ? void 0
                : serializeUpdateFileByIdRequestBodySharedLinkPermissionsField(val.permissions),
        };
    }
    function serializeUpdateFileByIdRequestBodyLockAccessField(val) {
        return val;
    }
    function serializeUpdateFileByIdRequestBodyLockField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeUpdateFileByIdRequestBodyLockAccessField(val.access),
            ['expires_at']: val.expiresAt == void 0 ? void 0 : val.expiresAt,
            ['is_download_prevented']: val.isDownloadPrevented == void 0 ? void 0 : val.isDownloadPrevented,
        };
    }
    function serializeUpdateFileByIdRequestBodyPermissionsCanDownloadField(val) {
        return val;
    }
    function serializeUpdateFileByIdRequestBodyPermissionsField(val) {
        return {
            ['can_download']: val.canDownload == void 0
                ? void 0
                : serializeUpdateFileByIdRequestBodyPermissionsCanDownloadField(val.canDownload),
        };
    }
    function serializeUpdateFileByIdRequestBodyCollectionsField(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0 ? void 0 : val.type,
        };
    }
    function serializeUpdateFileByIdRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['parent']: val.parent == void 0
                ? void 0
                : serializeUpdateFileByIdRequestBodyParentField(val.parent),
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeUpdateFileByIdRequestBodySharedLinkField(val.sharedLink),
            ['lock']: val.lock == void 0
                ? void 0
                : serializeUpdateFileByIdRequestBodyLockField(val.lock),
            ['disposition_at']: val.dispositionAt == void 0 ? void 0 : val.dispositionAt,
            ['permissions']: val.permissions == void 0
                ? void 0
                : serializeUpdateFileByIdRequestBodyPermissionsField(val.permissions),
            ['collections']: val.collections == void 0
                ? void 0
                : val.collections.map(function (item) {
                    return serializeUpdateFileByIdRequestBodyCollectionsField(item);
                }),
            ['tags']: val.tags == void 0
                ? void 0
                : val.tags.map(function (item) {
                    return item;
                }),
        };
    }
    function serializeCopyFileRequestBodyParentField(val) {
        return { ['id']: val.id };
    }
    function serializeCopyFileRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['version']: val.version == void 0 ? void 0 : val.version,
            ['parent']: serializeCopyFileRequestBodyParentField(val.parent),
        };
    }

    class RestoreFileFromTrashHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetTrashedFileByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteTrashedFileByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TrashedFilesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        restoreFileFromTrash(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody = {}, queryParams = {}, headers = new RestoreFileFromTrashHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId)), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeRestoreFileFromTrashRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTrashFileRestored(response.data);
            });
        }
        getTrashedFileById(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, queryParams = {}, headers = new GetTrashedFileByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/trash'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTrashFile(response.data);
            });
        }
        deleteTrashedFileById(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new DeleteTrashedFileByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/trash'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeRestoreFileFromTrashRequestBodyParentField(val) {
        return { ['id']: val.id == void 0 ? void 0 : val.id };
    }
    function serializeRestoreFileFromTrashRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['parent']: val.parent == void 0
                ? void 0
                : serializeRestoreFileFromTrashRequestBodyParentField(val.parent),
        };
    }

    class DownloadFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DownloadsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        downloadFile(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, queryParams = {}, headers = new DownloadFileHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['version']: toString(queryParams.version),
                    ['access_token']: toString(queryParams.accessToken),
                });
                const headersMap = prepareParams(Object.assign({
                    ['range']: toString(headers.range),
                    ['boxapi']: toString(headers.boxapi),
                }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/content'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'binary',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return response.content;
            });
        }
    }

    class UploadFileVersionHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UploadFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class PreflightFileUploadCheckHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UploadsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        uploadFileVersion(fileId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody, queryParams = {}, headers = new UploadFileVersionHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({
                    ['if-match']: toString(headers.ifMatch),
                    ['content-md5']: toString(headers.contentMd5),
                }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.uploadUrl, '/files/', toString(fileId), '/content'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    multipartData: [
                        {
                            partName: 'attributes',
                            data: serializeUploadFileVersionRequestBodyAttributesField(requestBody.attributes),
                        },
                        {
                            partName: 'file',
                            fileStream: requestBody.file,
                            fileName: requestBody.fileFileName,
                            contentType: requestBody.fileContentType,
                        },
                    ],
                    contentType: 'multipart/form-data',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFiles(response.data);
            });
        }
        uploadFile(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, queryParams = {}, headers = new UploadFileHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({ ['content-md5']: toString(headers.contentMd5) }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.uploadUrl, '/files/content'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    multipartData: [
                        {
                            partName: 'attributes',
                            data: serializeUploadFileRequestBodyAttributesField(requestBody.attributes),
                        },
                        {
                            partName: 'file',
                            fileStream: requestBody.file,
                            fileName: requestBody.fileFileName,
                            contentType: requestBody.fileContentType,
                        },
                    ],
                    contentType: 'multipart/form-data',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFiles(response.data);
            });
        }
        preflightFileUploadCheck() {
            return __awaiter(this, arguments, void 0, function* (requestBody = {}, headers = new PreflightFileUploadCheckHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/content'), {
                    method: 'OPTIONS',
                    headers: headersMap,
                    data: serializePreflightFileUploadCheckRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUploadUrl(response.data);
            });
        }
    }
    function serializeUploadFileVersionRequestBodyAttributesField(val) {
        return {
            ['name']: val.name,
            ['content_modified_at']: val.contentModifiedAt == void 0 ? void 0 : val.contentModifiedAt,
        };
    }
    function serializeUploadFileRequestBodyAttributesParentField(val) {
        return { ['id']: val.id };
    }
    function serializeUploadFileRequestBodyAttributesField(val) {
        return {
            ['name']: val.name,
            ['parent']: serializeUploadFileRequestBodyAttributesParentField(val.parent),
            ['content_created_at']: val.contentCreatedAt == void 0 ? void 0 : val.contentCreatedAt,
            ['content_modified_at']: val.contentModifiedAt == void 0 ? void 0 : val.contentModifiedAt,
        };
    }
    function serializePreflightFileUploadCheckRequestBodyParentField(val) {
        return { ['id']: val.id == void 0 ? void 0 : val.id };
    }
    function serializePreflightFileUploadCheckRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['size']: val.size == void 0 ? void 0 : val.size,
            ['parent']: val.parent == void 0
                ? void 0
                : serializePreflightFileUploadCheckRequestBodyParentField(val.parent),
        };
    }

    class CreateFileUploadSessionHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateFileUploadSessionForExistingFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFileUploadSessionByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UploadFilePartHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFileUploadSessionByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFileUploadSessionPartsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateFileUploadSessionCommitHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ChunkedUploadsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        createFileUploadSession(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateFileUploadSessionHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.uploadUrl, '/files/upload_sessions'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateFileUploadSessionRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUploadSession(response.data);
            });
        }
        createFileUploadSessionForExistingFile(fileId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody, headers = new CreateFileUploadSessionForExistingFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.uploadUrl, '/files/', toString(fileId), '/upload_sessions'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateFileUploadSessionForExistingFileRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUploadSession(response.data);
            });
        }
        getFileUploadSessionById(uploadSessionId_1) {
            return __awaiter(this, arguments, void 0, function* (uploadSessionId, headers = new GetFileUploadSessionByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.uploadUrl, '/files/upload_sessions/', toString(uploadSessionId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUploadSession(response.data);
            });
        }
        uploadFilePart(uploadSessionId, requestBody, headers, cancellationToken) {
            return __awaiter(this, void 0, void 0, function* () {
                const headersMap = prepareParams(Object.assign({
                    ['digest']: toString(headers.digest),
                    ['content-range']: toString(headers.contentRange),
                }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.uploadUrl, '/files/upload_sessions/', toString(uploadSessionId)), {
                    method: 'PUT',
                    headers: headersMap,
                    fileStream: requestBody,
                    contentType: 'application/octet-stream',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUploadedPart(response.data);
            });
        }
        deleteFileUploadSessionById(uploadSessionId_1) {
            return __awaiter(this, arguments, void 0, function* (uploadSessionId, headers = new DeleteFileUploadSessionByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.uploadUrl, '/files/upload_sessions/', toString(uploadSessionId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getFileUploadSessionParts(uploadSessionId_1) {
            return __awaiter(this, arguments, void 0, function* (uploadSessionId, queryParams = {}, headers = new GetFileUploadSessionPartsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['offset']: toString(queryParams.offset),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.uploadUrl, '/files/upload_sessions/', toString(uploadSessionId), '/parts'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUploadParts(response.data);
            });
        }
        createFileUploadSessionCommit(uploadSessionId, requestBody, headers, cancellationToken) {
            return __awaiter(this, void 0, void 0, function* () {
                const headersMap = prepareParams(Object.assign({
                    ['digest']: toString(headers.digest),
                    ['if-match']: toString(headers.ifMatch),
                    ['if-none-match']: toString(headers.ifNoneMatch),
                }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.uploadUrl, '/files/upload_sessions/', toString(uploadSessionId), '/commit'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateFileUploadSessionCommitRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFiles(response.data);
            });
        }
        reducer(acc, chunk) {
            return __awaiter(this, void 0, void 0, function* () {
                const lastIndex = acc.lastIndex;
                const parts = acc.parts;
                const chunkBuffer = yield readByteStream(chunk);
                const hash = new Hash({ algorithm: 'sha1' });
                hash.updateHash(chunkBuffer);
                const sha1 = yield hash.digestHash('base64');
                const digest = ''.concat('sha=', sha1);
                const chunkSize = bufferLength(chunkBuffer);
                const bytesStart = lastIndex + 1;
                const bytesEnd = lastIndex + chunkSize;
                const contentRange = ''.concat('bytes ', toString(bytesStart), '-', toString(bytesEnd), '/', toString(acc.fileSize));
                const uploadedPart = yield this.uploadFilePart(acc.uploadSessionId, generateByteStreamFromBuffer(chunkBuffer), new UploadFilePartHeaders({ digest: digest, contentRange: contentRange }));
                const part = uploadedPart.part;
                const partSha1 = hexToBase64(part.sha1);
                if (!(partSha1 == sha1)) {
                    throw new Error('Assertion failed');
                }
                if (!(part.size == chunkSize)) {
                    throw new Error('Assertion failed');
                }
                if (!(part.offset == bytesStart)) {
                    throw new Error('Assertion failed');
                }
                acc.fileHash.updateHash(chunkBuffer);
                return {
                    lastIndex: bytesEnd,
                    parts: parts.concat([part]),
                    fileSize: acc.fileSize,
                    uploadSessionId: acc.uploadSessionId,
                    fileHash: acc.fileHash,
                };
            });
        }
        uploadBigFile(file, fileName, fileSize, parentFolderId, cancellationToken) {
            return __awaiter(this, void 0, void 0, function* () {
                const uploadSession = yield this.createFileUploadSession({
                    fileName: fileName,
                    fileSize: fileSize,
                    folderId: parentFolderId,
                }, new CreateFileUploadSessionHeaders({}), cancellationToken);
                const uploadSessionId = uploadSession.id;
                const partSize = uploadSession.partSize;
                const totalParts = uploadSession.totalParts;
                if (!(partSize * totalParts >= fileSize)) {
                    throw new Error('Assertion failed');
                }
                if (!(uploadSession.numPartsProcessed == 0)) {
                    throw new Error('Assertion failed');
                }
                const fileHash = new Hash({ algorithm: 'sha1' });
                const chunksIterator = iterateChunks(file, partSize);
                const results = yield reduceIterator(chunksIterator, this.reducer.bind(this), {
                    lastIndex: -1,
                    parts: [],
                    fileSize: fileSize,
                    uploadSessionId: uploadSessionId,
                    fileHash: fileHash,
                });
                const parts = results.parts;
                const processedSessionParts = yield this.getFileUploadSessionParts(uploadSessionId, {}, new GetFileUploadSessionPartsHeaders({}), cancellationToken);
                if (!(processedSessionParts.totalCount == totalParts)) {
                    throw new Error('Assertion failed');
                }
                const processedSession = yield this.getFileUploadSessionById(uploadSessionId, new GetFileUploadSessionByIdHeaders({}), cancellationToken);
                if (!(processedSession.numPartsProcessed == totalParts)) {
                    throw new Error('Assertion failed');
                }
                const sha1 = yield fileHash.digestHash('base64');
                const digest = ''.concat('sha=', sha1);
                const committedSession = yield this.createFileUploadSessionCommit(uploadSessionId, { parts: parts }, new CreateFileUploadSessionCommitHeaders({ digest: digest }), cancellationToken);
                return committedSession.entries[0];
            });
        }
    }
    function serializeCreateFileUploadSessionRequestBody(val) {
        return {
            ['folder_id']: val.folderId,
            ['file_size']: val.fileSize,
            ['file_name']: val.fileName,
        };
    }
    function serializeCreateFileUploadSessionForExistingFileRequestBody(val) {
        return {
            ['file_size']: val.fileSize,
            ['file_name']: val.fileName == void 0 ? void 0 : val.fileName,
        };
    }
    function serializeCreateFileUploadSessionCommitRequestBody(val) {
        return {
            ['parts']: val.parts.map(function (item) {
                return serializeUploadPart(item);
            }),
        };
    }

    class GetFileCollaborationsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFolderCollaborationsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetCollaborationsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetGroupCollaborationsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ListCollaborationsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileCollaborations(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, queryParams = {}, headers = new GetFileCollaborationsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['limit']: toString(queryParams.limit),
                    ['marker']: toString(queryParams.marker),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/collaborations'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborations(response.data);
            });
        }
        getFolderCollaborations(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, queryParams = {}, headers = new GetFolderCollaborationsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/collaborations'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborations(response.data);
            });
        }
        getCollaborations(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetCollaborationsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['status']: toString(queryParams.status),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['offset']: toString(queryParams.offset),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaborations'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborations(response.data);
            });
        }
        getGroupCollaborations(groupId_1) {
            return __awaiter(this, arguments, void 0, function* (groupId, queryParams = {}, headers = new GetGroupCollaborationsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['limit']: toString(queryParams.limit),
                    ['offset']: toString(queryParams.offset),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/groups/', toString(groupId), '/collaborations'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborations(response.data);
            });
        }
    }

    class GetFileCommentsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetCommentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateCommentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteCommentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateCommentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CommentsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileComments(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, queryParams = {}, headers = new GetFileCommentsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['limit']: toString(queryParams.limit),
                    ['offset']: toString(queryParams.offset),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/comments'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeComments(response.data);
            });
        }
        getCommentById(commentId_1) {
            return __awaiter(this, arguments, void 0, function* (commentId, queryParams = {}, headers = new GetCommentByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/comments/', toString(commentId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCommentFull(response.data);
            });
        }
        updateCommentById(commentId_1) {
            return __awaiter(this, arguments, void 0, function* (commentId, requestBody = {}, queryParams = {}, headers = new UpdateCommentByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/comments/', toString(commentId)), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeUpdateCommentByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCommentFull(response.data);
            });
        }
        deleteCommentById(commentId_1) {
            return __awaiter(this, arguments, void 0, function* (commentId, headers = new DeleteCommentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/comments/', toString(commentId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        createComment(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, queryParams = {}, headers = new CreateCommentHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/comments'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeCreateCommentRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCommentFull(response.data);
            });
        }
    }
    function serializeUpdateCommentByIdRequestBody(val) {
        return { ['message']: val.message == void 0 ? void 0 : val.message };
    }
    function serializeCreateCommentRequestBodyItemTypeField(val) {
        return val;
    }
    function serializeCreateCommentRequestBodyItemField(val) {
        return {
            ['id']: val.id,
            ['type']: serializeCreateCommentRequestBodyItemTypeField(val.type),
        };
    }
    function serializeCreateCommentRequestBody(val) {
        return {
            ['message']: val.message,
            ['tagged_message']: val.taggedMessage == void 0 ? void 0 : val.taggedMessage,
            ['item']: serializeCreateCommentRequestBodyItemField(val.item),
        };
    }

    class GetFileTasksHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateTaskHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetTaskByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateTaskByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteTaskByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TasksManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileTasks(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new GetFileTasksHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/tasks'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTasks(response.data);
            });
        }
        createTask(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateTaskHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/tasks'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateTaskRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTask(response.data);
            });
        }
        getTaskById(taskId_1) {
            return __awaiter(this, arguments, void 0, function* (taskId, headers = new GetTaskByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/tasks/', toString(taskId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTask(response.data);
            });
        }
        updateTaskById(taskId_1) {
            return __awaiter(this, arguments, void 0, function* (taskId, requestBody = {}, headers = new UpdateTaskByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/tasks/', toString(taskId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateTaskByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTask(response.data);
            });
        }
        deleteTaskById(taskId_1) {
            return __awaiter(this, arguments, void 0, function* (taskId, headers = new DeleteTaskByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/tasks/', toString(taskId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateTaskRequestBodyItemTypeField(val) {
        return val;
    }
    function serializeCreateTaskRequestBodyItemField(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0
                ? void 0
                : serializeCreateTaskRequestBodyItemTypeField(val.type),
        };
    }
    function serializeCreateTaskRequestBodyActionField(val) {
        return val;
    }
    function serializeCreateTaskRequestBodyCompletionRuleField(val) {
        return val;
    }
    function serializeCreateTaskRequestBody(val) {
        return {
            ['item']: serializeCreateTaskRequestBodyItemField(val.item),
            ['action']: val.action == void 0
                ? void 0
                : serializeCreateTaskRequestBodyActionField(val.action),
            ['message']: val.message == void 0 ? void 0 : val.message,
            ['due_at']: val.dueAt == void 0 ? void 0 : val.dueAt,
            ['completion_rule']: val.completionRule == void 0
                ? void 0
                : serializeCreateTaskRequestBodyCompletionRuleField(val.completionRule),
        };
    }
    function serializeUpdateTaskByIdRequestBodyActionField(val) {
        return val;
    }
    function serializeUpdateTaskByIdRequestBodyCompletionRuleField(val) {
        return val;
    }
    function serializeUpdateTaskByIdRequestBody(val) {
        return {
            ['action']: val.action == void 0
                ? void 0
                : serializeUpdateTaskByIdRequestBodyActionField(val.action),
            ['message']: val.message == void 0 ? void 0 : val.message,
            ['due_at']: val.dueAt == void 0 ? void 0 : val.dueAt,
            ['completion_rule']: val.completionRule == void 0
                ? void 0
                : serializeUpdateTaskByIdRequestBodyCompletionRuleField(val.completionRule),
        };
    }

    class GetFileVersionsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFileVersionByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateFileVersionByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFileVersionByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class PromoteFileVersionHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FileVersionsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileVersions(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, queryParams = {}, headers = new GetFileVersionsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['limit']: toString(queryParams.limit),
                    ['offset']: toString(queryParams.offset),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/versions'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersions(response.data);
            });
        }
        getFileVersionById(fileId_1, fileVersionId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, fileVersionId, queryParams = {}, headers = new GetFileVersionByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/versions/', toString(fileVersionId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersionFull(response.data);
            });
        }
        updateFileVersionById(fileId_1, fileVersionId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, fileVersionId, requestBody = {}, headers = new UpdateFileVersionByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/versions/', toString(fileVersionId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateFileVersionByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersionFull(response.data);
            });
        }
        deleteFileVersionById(fileId_1, fileVersionId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, fileVersionId, headers = new DeleteFileVersionByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({ ['if-match']: toString(headers.ifMatch) }, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/versions/', toString(fileVersionId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        promoteFileVersion(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody = {}, queryParams = {}, headers = new PromoteFileVersionHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/versions/current'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializePromoteFileVersionRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersionFull(response.data);
            });
        }
    }
    function serializeUpdateFileVersionByIdRequestBody(val) {
        return { ['trashed_at']: val.trashedAt == void 0 ? void 0 : val.trashedAt };
    }
    function serializePromoteFileVersionRequestBodyTypeField(val) {
        return val;
    }
    function serializePromoteFileVersionRequestBody(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0
                ? void 0
                : serializePromoteFileVersionRequestBodyTypeField(val.type),
        };
    }

    class GetFileMetadataHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFileMetadataByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateFileMetadataByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateFileMetadataByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFileMetadataByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FileMetadataManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileMetadata(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new GetFileMetadataHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadatas(response.data);
            });
        }
        getFileMetadataById(fileId_1, scope_1, templateKey_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, scope, templateKey, headers = new GetFileMetadataByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/', toString(scope), '/', toString(templateKey)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataFull(response.data);
            });
        }
        createFileMetadataById(fileId_1, scope_1, templateKey_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, scope, templateKey, requestBody, headers = new CreateFileMetadataByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/', toString(scope), '/', toString(templateKey)), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateFileMetadataByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataFull(response.data);
            });
        }
        updateFileMetadataById(fileId_1, scope_1, templateKey_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, scope, templateKey, requestBody, headers = new UpdateFileMetadataByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/', toString(scope), '/', toString(templateKey)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: requestBody.map(serializeUpdateFileMetadataByIdRequestBody),
                    contentType: 'application/json-patch+json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataFull(response.data);
            });
        }
        deleteFileMetadataById(fileId_1, scope_1, templateKey_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, scope, templateKey, headers = new DeleteFileMetadataByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/', toString(scope), '/', toString(templateKey)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateFileMetadataByIdRequestBody(val) {
        return Object.fromEntries(Object.entries(val).map(([k, v]) => [
            k,
            (function (v) {
                return v;
            })(v),
        ]));
    }
    function serializeUpdateFileMetadataByIdRequestBodyOpField(val) {
        return val;
    }
    function serializeUpdateFileMetadataByIdRequestBody(val) {
        return {
            ['op']: val.op == void 0
                ? void 0
                : serializeUpdateFileMetadataByIdRequestBodyOpField(val.op),
            ['path']: val.path == void 0 ? void 0 : val.path,
            ['value']: val.value == void 0 ? void 0 : val.value,
            ['from']: val.from == void 0 ? void 0 : val.from,
        };
    }

    class GetClassificationOnFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class AddClassificationToFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateClassificationOnFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteClassificationFromFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FileClassificationsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getClassificationOnFile(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new GetClassificationOnFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/enterprise/securityClassification-6VMVochwUWo'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassification(response.data);
            });
        }
        addClassificationToFile(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody = {}, headers = new AddClassificationToFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/enterprise/securityClassification-6VMVochwUWo'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeAddClassificationToFileRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassification(response.data);
            });
        }
        updateClassificationOnFile(fileId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody, headers = new UpdateClassificationOnFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/enterprise/securityClassification-6VMVochwUWo'), {
                    method: 'PUT',
                    headers: headersMap,
                    data: requestBody.map(serializeUpdateClassificationOnFileRequestBody),
                    contentType: 'application/json-patch+json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassification(response.data);
            });
        }
        deleteClassificationFromFile(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new DeleteClassificationFromFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/enterprise/securityClassification-6VMVochwUWo'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeAddClassificationToFileRequestBody(val) {
        return {
            ['Box__Security__Classification__Key']: val.boxSecurityClassificationKey == void 0
                ? void 0
                : val.boxSecurityClassificationKey,
        };
    }
    function serializeUpdateClassificationOnFileRequestBodyOpField(val) {
        return val;
    }
    function serializeUpdateClassificationOnFileRequestBodyPathField(val) {
        return val;
    }
    function serializeUpdateClassificationOnFileRequestBody(val) {
        return {
            ['op']: serializeUpdateClassificationOnFileRequestBodyOpField(val.op),
            ['path']: serializeUpdateClassificationOnFileRequestBodyPathField(val.path),
            ['value']: val.value,
        };
    }

    class GetBoxSkillCardsOnFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateBoxSkillCardsOnFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateBoxSkillCardsOnFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteBoxSkillCardsFromFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateAllSkillCardsOnFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class SkillsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getBoxSkillCardsOnFile(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new GetBoxSkillCardsOnFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/global/boxSkillsCards'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSkillCardsMetadata(response.data);
            });
        }
        createBoxSkillCardsOnFile(fileId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody, headers = new CreateBoxSkillCardsOnFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/global/boxSkillsCards'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateBoxSkillCardsOnFileRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSkillCardsMetadata(response.data);
            });
        }
        updateBoxSkillCardsOnFile(fileId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody, headers = new UpdateBoxSkillCardsOnFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/global/boxSkillsCards'), {
                    method: 'PUT',
                    headers: headersMap,
                    data: requestBody.map(serializeUpdateBoxSkillCardsOnFileRequestBody),
                    contentType: 'application/json-patch+json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSkillCardsMetadata(response.data);
            });
        }
        deleteBoxSkillCardsFromFile(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new DeleteBoxSkillCardsFromFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/metadata/global/boxSkillsCards'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        updateAllSkillCardsOnFile(skillId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (skillId, requestBody, headers = new UpdateAllSkillCardsOnFileHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/skill_invocations/', toString(skillId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateAllSkillCardsOnFileRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateBoxSkillCardsOnFileRequestBody(val) {
        return {
            ['cards']: val.cards.map(function (item) {
                return serializeKeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard(item);
            }),
        };
    }
    function serializeUpdateBoxSkillCardsOnFileRequestBodyOpField(val) {
        return val;
    }
    function serializeUpdateBoxSkillCardsOnFileRequestBody(val) {
        return {
            ['op']: val.op == void 0
                ? void 0
                : serializeUpdateBoxSkillCardsOnFileRequestBodyOpField(val.op),
            ['path']: val.path == void 0 ? void 0 : val.path,
            ['value']: val.value == void 0
                ? void 0
                : serializeKeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard(val.value),
        };
    }
    function serializeUpdateAllSkillCardsOnFileRequestBodyStatusField(val) {
        return val;
    }
    function serializeUpdateAllSkillCardsOnFileRequestBodyMetadataField(val) {
        return {
            ['cards']: val.cards == void 0
                ? void 0
                : val.cards.map(function (item) {
                    return serializeKeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard(item);
                }),
        };
    }
    function serializeUpdateAllSkillCardsOnFileRequestBodyFileTypeField(val) {
        return val;
    }
    function serializeUpdateAllSkillCardsOnFileRequestBodyFileField(val) {
        return {
            ['type']: val.type == void 0
                ? void 0
                : serializeUpdateAllSkillCardsOnFileRequestBodyFileTypeField(val.type),
            ['id']: val.id == void 0 ? void 0 : val.id,
        };
    }
    function serializeUpdateAllSkillCardsOnFileRequestBodyFileVersionTypeField(val) {
        return val;
    }
    function serializeUpdateAllSkillCardsOnFileRequestBodyFileVersionField(val) {
        return {
            ['type']: val.type == void 0
                ? void 0
                : serializeUpdateAllSkillCardsOnFileRequestBodyFileVersionTypeField(val.type),
            ['id']: val.id == void 0 ? void 0 : val.id,
        };
    }
    function serializeUpdateAllSkillCardsOnFileRequestBodyUsageField(val) {
        return {
            ['unit']: val.unit == void 0 ? void 0 : val.unit,
            ['value']: val.value == void 0 ? void 0 : val.value,
        };
    }
    function serializeUpdateAllSkillCardsOnFileRequestBody(val) {
        return {
            ['status']: serializeUpdateAllSkillCardsOnFileRequestBodyStatusField(val.status),
            ['metadata']: serializeUpdateAllSkillCardsOnFileRequestBodyMetadataField(val.metadata),
            ['file']: serializeUpdateAllSkillCardsOnFileRequestBodyFileField(val.file),
            ['file_version']: val.fileVersion == void 0
                ? void 0
                : serializeUpdateAllSkillCardsOnFileRequestBodyFileVersionField(val.fileVersion),
            ['usage']: val.usage == void 0
                ? void 0
                : serializeUpdateAllSkillCardsOnFileRequestBodyUsageField(val.usage),
        };
    }

    class GetFileWatermarkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateFileWatermarkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFileWatermarkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FileWatermarksManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileWatermark(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new GetFileWatermarkHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/watermark'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWatermark(response.data);
            });
        }
        updateFileWatermark(fileId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody, headers = new UpdateFileWatermarkHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/watermark'), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateFileWatermarkRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWatermark(response.data);
            });
        }
        deleteFileWatermark(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, headers = new DeleteFileWatermarkHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '/watermark'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeUpdateFileWatermarkRequestBodyWatermarkImprintField(val) {
        return val;
    }
    function serializeUpdateFileWatermarkRequestBodyWatermarkField(val) {
        return {
            ['imprint']: serializeUpdateFileWatermarkRequestBodyWatermarkImprintField(val.imprint),
        };
    }
    function serializeUpdateFileWatermarkRequestBody(val) {
        return {
            ['watermark']: serializeUpdateFileWatermarkRequestBodyWatermarkField(val.watermark),
        };
    }

    class GetFileRequestByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateFileRequestByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFileRequestByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateFileRequestCopyHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FileRequestsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileRequestById(fileRequestId_1) {
            return __awaiter(this, arguments, void 0, function* (fileRequestId, headers = new GetFileRequestByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/file_requests/', toString(fileRequestId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileRequest(response.data);
            });
        }
        updateFileRequestById(fileRequestId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileRequestId, requestBody, headers = new UpdateFileRequestByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({ ['if-match']: toString(headers.ifMatch) }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/file_requests/', toString(fileRequestId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeFileRequestUpdateRequest(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileRequest(response.data);
            });
        }
        deleteFileRequestById(fileRequestId_1) {
            return __awaiter(this, arguments, void 0, function* (fileRequestId, headers = new DeleteFileRequestByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/file_requests/', toString(fileRequestId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        createFileRequestCopy(fileRequestId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (fileRequestId, requestBody, headers = new CreateFileRequestCopyHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/file_requests/', toString(fileRequestId), '/copy'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeFileRequestCopyRequest(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileRequest(response.data);
            });
        }
    }

    class GetFolderByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateFolderByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFolderByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFolderItemsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CopyFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FoldersManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFolderById(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, queryParams = {}, headers = new GetFolderByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['sort']: toString(queryParams.sort),
                    ['direction']: toString(queryParams.direction),
                    ['offset']: toString(queryParams.offset),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({
                    ['if-none-match']: toString(headers.ifNoneMatch),
                    ['boxapi']: toString(headers.boxapi),
                }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
        updateFolderById(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, requestBody = {}, queryParams = {}, headers = new UpdateFolderByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({ ['if-match']: toString(headers.ifMatch) }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId)), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeUpdateFolderByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
        deleteFolderById(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, queryParams = {}, headers = new DeleteFolderByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['recursive']: toString(queryParams.recursive),
                });
                const headersMap = prepareParams(Object.assign({ ['if-match']: toString(headers.ifMatch) }, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId)), {
                    method: 'DELETE',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getFolderItems(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, queryParams = {}, headers = new GetFolderItemsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['usemarker']: toString(queryParams.usemarker),
                    ['marker']: toString(queryParams.marker),
                    ['offset']: toString(queryParams.offset),
                    ['limit']: toString(queryParams.limit),
                    ['sort']: toString(queryParams.sort),
                    ['direction']: toString(queryParams.direction),
                });
                const headersMap = prepareParams(Object.assign({ ['boxapi']: toString(headers.boxapi) }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/items'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeItems(response.data);
            });
        }
        createFolder(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, queryParams = {}, headers = new CreateFolderHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeCreateFolderRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
        copyFolder(folderId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, requestBody, queryParams = {}, headers = new CopyFolderHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/copy'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeCopyFolderRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
    }
    function serializeUpdateFolderByIdRequestBodySyncStateField(val) {
        return val;
    }
    function serializeUpdateFolderByIdRequestBodyParentField(val) {
        return { ['id']: val.id == void 0 ? void 0 : val.id };
    }
    function serializeUpdateFolderByIdRequestBodySharedLinkAccessField(val) {
        return val;
    }
    function serializeUpdateFolderByIdRequestBodySharedLinkPermissionsField(val) {
        return {
            ['can_download']: val.canDownload == void 0 ? void 0 : val.canDownload,
        };
    }
    function serializeUpdateFolderByIdRequestBodySharedLinkField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeUpdateFolderByIdRequestBodySharedLinkAccessField(val.access),
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['vanity_name']: val.vanityName == void 0 ? void 0 : val.vanityName,
            ['unshared_at']: val.unsharedAt == void 0 ? void 0 : val.unsharedAt,
            ['permissions']: val.permissions == void 0
                ? void 0
                : serializeUpdateFolderByIdRequestBodySharedLinkPermissionsField(val.permissions),
        };
    }
    function serializeUpdateFolderByIdRequestBodyFolderUploadEmailAccessField(val) {
        return val;
    }
    function serializeUpdateFolderByIdRequestBodyFolderUploadEmailField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeUpdateFolderByIdRequestBodyFolderUploadEmailAccessField(val.access),
        };
    }
    function serializeUpdateFolderByIdRequestBodyCollectionsField(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0 ? void 0 : val.type,
        };
    }
    function serializeUpdateFolderByIdRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['sync_state']: val.syncState == void 0
                ? void 0
                : serializeUpdateFolderByIdRequestBodySyncStateField(val.syncState),
            ['can_non_owners_invite']: val.canNonOwnersInvite == void 0 ? void 0 : val.canNonOwnersInvite,
            ['parent']: val.parent == void 0
                ? void 0
                : serializeUpdateFolderByIdRequestBodyParentField(val.parent),
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeUpdateFolderByIdRequestBodySharedLinkField(val.sharedLink),
            ['folder_upload_email']: val.folderUploadEmail == void 0
                ? void 0
                : serializeUpdateFolderByIdRequestBodyFolderUploadEmailField(val.folderUploadEmail),
            ['tags']: val.tags == void 0
                ? void 0
                : val.tags.map(function (item) {
                    return item;
                }),
            ['is_collaboration_restricted_to_enterprise']: val.isCollaborationRestrictedToEnterprise == void 0
                ? void 0
                : val.isCollaborationRestrictedToEnterprise,
            ['collections']: val.collections == void 0
                ? void 0
                : val.collections.map(function (item) {
                    return serializeUpdateFolderByIdRequestBodyCollectionsField(item);
                }),
            ['can_non_owners_view_collaborators']: val.canNonOwnersViewCollaborators == void 0
                ? void 0
                : val.canNonOwnersViewCollaborators,
        };
    }
    function serializeCreateFolderRequestBodyParentField(val) {
        return { ['id']: val.id };
    }
    function serializeCreateFolderRequestBodyFolderUploadEmailAccessField(val) {
        return val;
    }
    function serializeCreateFolderRequestBodyFolderUploadEmailField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeCreateFolderRequestBodyFolderUploadEmailAccessField(val.access),
        };
    }
    function serializeCreateFolderRequestBodySyncStateField(val) {
        return val;
    }
    function serializeCreateFolderRequestBody(val) {
        return {
            ['name']: val.name,
            ['parent']: serializeCreateFolderRequestBodyParentField(val.parent),
            ['folder_upload_email']: val.folderUploadEmail == void 0
                ? void 0
                : serializeCreateFolderRequestBodyFolderUploadEmailField(val.folderUploadEmail),
            ['sync_state']: val.syncState == void 0
                ? void 0
                : serializeCreateFolderRequestBodySyncStateField(val.syncState),
        };
    }
    function serializeCopyFolderRequestBodyParentField(val) {
        return { ['id']: val.id };
    }
    function serializeCopyFolderRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['parent']: serializeCopyFolderRequestBodyParentField(val.parent),
        };
    }

    class RestoreFolderFromTrashHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetTrashedFolderByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteTrashedFolderByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TrashedFoldersManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        restoreFolderFromTrash(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, requestBody = {}, queryParams = {}, headers = new RestoreFolderFromTrashHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId)), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeRestoreFolderFromTrashRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTrashFolderRestored(response.data);
            });
        }
        getTrashedFolderById(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, queryParams = {}, headers = new GetTrashedFolderByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/trash'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTrashFolder(response.data);
            });
        }
        deleteTrashedFolderById(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, headers = new DeleteTrashedFolderByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/trash'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeRestoreFolderFromTrashRequestBodyParentField(val) {
        return { ['id']: val.id == void 0 ? void 0 : val.id };
    }
    function serializeRestoreFolderFromTrashRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['parent']: val.parent == void 0
                ? void 0
                : serializeRestoreFolderFromTrashRequestBodyParentField(val.parent),
        };
    }

    class GetFolderMetadataHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFolderMetadataByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateFolderMetadataByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateFolderMetadataByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFolderMetadataByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FolderMetadataManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFolderMetadata(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, headers = new GetFolderMetadataHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/metadata'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadatas(response.data);
            });
        }
        getFolderMetadataById(folderId_1, scope_1, templateKey_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, scope, templateKey, headers = new GetFolderMetadataByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/metadata/', toString(scope), '/', toString(templateKey)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataFull(response.data);
            });
        }
        createFolderMetadataById(folderId_1, scope_1, templateKey_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, scope, templateKey, requestBody, headers = new CreateFolderMetadataByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/metadata/', toString(scope), '/', toString(templateKey)), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateFolderMetadataByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataFull(response.data);
            });
        }
        updateFolderMetadataById(folderId_1, scope_1, templateKey_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, scope, templateKey, requestBody, headers = new UpdateFolderMetadataByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/metadata/', toString(scope), '/', toString(templateKey)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: requestBody.map(serializeUpdateFolderMetadataByIdRequestBody),
                    contentType: 'application/json-patch+json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataFull(response.data);
            });
        }
        deleteFolderMetadataById(folderId_1, scope_1, templateKey_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, scope, templateKey, headers = new DeleteFolderMetadataByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/metadata/', toString(scope), '/', toString(templateKey)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateFolderMetadataByIdRequestBody(val) {
        return Object.fromEntries(Object.entries(val).map(([k, v]) => [
            k,
            (function (v) {
                return v;
            })(v),
        ]));
    }
    function serializeUpdateFolderMetadataByIdRequestBodyOpField(val) {
        return val;
    }
    function serializeUpdateFolderMetadataByIdRequestBody(val) {
        return {
            ['op']: val.op == void 0
                ? void 0
                : serializeUpdateFolderMetadataByIdRequestBodyOpField(val.op),
            ['path']: val.path == void 0 ? void 0 : val.path,
            ['value']: val.value == void 0 ? void 0 : val.value,
            ['from']: val.from == void 0 ? void 0 : val.from,
        };
    }

    class GetClassificationOnFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class AddClassificationToFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateClassificationOnFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteClassificationFromFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FolderClassificationsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getClassificationOnFolder(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, headers = new GetClassificationOnFolderHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/metadata/enterprise/securityClassification-6VMVochwUWo'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassification(response.data);
            });
        }
        addClassificationToFolder(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, requestBody = {}, headers = new AddClassificationToFolderHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/metadata/enterprise/securityClassification-6VMVochwUWo'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeAddClassificationToFolderRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassification(response.data);
            });
        }
        updateClassificationOnFolder(folderId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, requestBody, headers = new UpdateClassificationOnFolderHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/metadata/enterprise/securityClassification-6VMVochwUWo'), {
                    method: 'PUT',
                    headers: headersMap,
                    data: requestBody.map(serializeUpdateClassificationOnFolderRequestBody),
                    contentType: 'application/json-patch+json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassification(response.data);
            });
        }
        deleteClassificationFromFolder(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, headers = new DeleteClassificationFromFolderHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/metadata/enterprise/securityClassification-6VMVochwUWo'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeAddClassificationToFolderRequestBody(val) {
        return {
            ['Box__Security__Classification__Key']: val.boxSecurityClassificationKey == void 0
                ? void 0
                : val.boxSecurityClassificationKey,
        };
    }
    function serializeUpdateClassificationOnFolderRequestBodyOpField(val) {
        return val;
    }
    function serializeUpdateClassificationOnFolderRequestBodyPathField(val) {
        return val;
    }
    function serializeUpdateClassificationOnFolderRequestBody(val) {
        return {
            ['op']: serializeUpdateClassificationOnFolderRequestBodyOpField(val.op),
            ['path']: serializeUpdateClassificationOnFolderRequestBodyPathField(val.path),
            ['value']: val.value,
        };
    }

    class GetTrashedItemsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TrashedItemsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getTrashedItems() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetTrashedItemsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['limit']: toString(queryParams.limit),
                    ['offset']: toString(queryParams.offset),
                    ['usemarker']: toString(queryParams.usemarker),
                    ['marker']: toString(queryParams.marker),
                    ['direction']: toString(queryParams.direction),
                    ['sort']: toString(queryParams.sort),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/trash/items'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeItems(response.data);
            });
        }
    }

    class GetFolderWatermarkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateFolderWatermarkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFolderWatermarkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FolderWatermarksManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFolderWatermark(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, headers = new GetFolderWatermarkHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/watermark'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWatermark(response.data);
            });
        }
        updateFolderWatermark(folderId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, requestBody, headers = new UpdateFolderWatermarkHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/watermark'), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateFolderWatermarkRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWatermark(response.data);
            });
        }
        deleteFolderWatermark(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, headers = new DeleteFolderWatermarkHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '/watermark'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeUpdateFolderWatermarkRequestBodyWatermarkImprintField(val) {
        return val;
    }
    function serializeUpdateFolderWatermarkRequestBodyWatermarkField(val) {
        return {
            ['imprint']: serializeUpdateFolderWatermarkRequestBodyWatermarkImprintField(val.imprint),
        };
    }
    function serializeUpdateFolderWatermarkRequestBody(val) {
        return {
            ['watermark']: serializeUpdateFolderWatermarkRequestBodyWatermarkField(val.watermark),
        };
    }

    class GetFolderLocksHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateFolderLockHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteFolderLockByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FolderLocksManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFolderLocks(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetFolderLocksHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['folder_id']: toString(queryParams.folderId),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folder_locks'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderLocks(response.data);
            });
        }
        createFolderLock(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateFolderLockHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folder_locks'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateFolderLockRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderLock(response.data);
            });
        }
        deleteFolderLockById(folderLockId_1) {
            return __awaiter(this, arguments, void 0, function* (folderLockId, headers = new DeleteFolderLockByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folder_locks/', toString(folderLockId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateFolderLockRequestBodyLockedOperationsField(val) {
        return { ['move']: val.move, ['delete']: val.delete };
    }
    function serializeCreateFolderLockRequestBodyFolderField(val) {
        return { ['type']: val.type, ['id']: val.id };
    }
    function serializeCreateFolderLockRequestBody(val) {
        return {
            ['locked_operations']: val.lockedOperations == void 0
                ? void 0
                : serializeCreateFolderLockRequestBodyLockedOperationsField(val.lockedOperations),
            ['folder']: serializeCreateFolderLockRequestBodyFolderField(val.folder),
        };
    }

    class GetMetadataTemplatesByInstanceIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetMetadataTemplateHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateMetadataTemplateHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteMetadataTemplateHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetMetadataTemplateByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetGlobalMetadataTemplatesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetEnterpriseMetadataTemplatesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateMetadataTemplateHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class MetadataTemplatesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getMetadataTemplatesByInstanceId(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetMetadataTemplatesByInstanceIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['metadata_instance_id']: toString(queryParams.metadataInstanceId),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataTemplates(response.data);
            });
        }
        getMetadataTemplate(scope_1, templateKey_1) {
            return __awaiter(this, arguments, void 0, function* (scope, templateKey, headers = new GetMetadataTemplateHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/', toString(scope), '/', toString(templateKey), '/schema'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataTemplate(response.data);
            });
        }
        updateMetadataTemplate(scope_1, templateKey_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (scope, templateKey, requestBody, headers = new UpdateMetadataTemplateHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/', toString(scope), '/', toString(templateKey), '/schema'), {
                    method: 'PUT',
                    headers: headersMap,
                    data: requestBody.map(serializeUpdateMetadataTemplateRequestBody),
                    contentType: 'application/json-patch+json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataTemplate(response.data);
            });
        }
        deleteMetadataTemplate(scope_1, templateKey_1) {
            return __awaiter(this, arguments, void 0, function* (scope, templateKey, headers = new DeleteMetadataTemplateHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/', toString(scope), '/', toString(templateKey), '/schema'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getMetadataTemplateById(templateId_1) {
            return __awaiter(this, arguments, void 0, function* (templateId, headers = new GetMetadataTemplateByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/', toString(templateId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataTemplate(response.data);
            });
        }
        getGlobalMetadataTemplates() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetGlobalMetadataTemplatesHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/global'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataTemplates(response.data);
            });
        }
        getEnterpriseMetadataTemplates() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetEnterpriseMetadataTemplatesHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/enterprise'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataTemplates(response.data);
            });
        }
        createMetadataTemplate(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateMetadataTemplateHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/schema'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateMetadataTemplateRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataTemplate(response.data);
            });
        }
    }
    function serializeUpdateMetadataTemplateRequestBodyOpField(val) {
        return val;
    }
    function serializeUpdateMetadataTemplateRequestBody(val) {
        return {
            ['op']: serializeUpdateMetadataTemplateRequestBodyOpField(val.op),
            ['data']: val.data == void 0
                ? void 0
                : Object.fromEntries(Object.entries(val.data).map(([k, v]) => [
                    k,
                    (function (v) {
                        return v;
                    })(v),
                ])),
            ['fieldKey']: val.fieldKey == void 0 ? void 0 : val.fieldKey,
            ['fieldKeys']: val.fieldKeys == void 0
                ? void 0
                : val.fieldKeys.map(function (item) {
                    return item;
                }),
            ['enumOptionKey']: val.enumOptionKey == void 0 ? void 0 : val.enumOptionKey,
            ['enumOptionKeys']: val.enumOptionKeys == void 0
                ? void 0
                : val.enumOptionKeys.map(function (item) {
                    return item;
                }),
            ['multiSelectOptionKey']: val.multiSelectOptionKey == void 0 ? void 0 : val.multiSelectOptionKey,
            ['multiSelectOptionKeys']: val.multiSelectOptionKeys == void 0
                ? void 0
                : val.multiSelectOptionKeys.map(function (item) {
                    return item;
                }),
        };
    }
    function serializeCreateMetadataTemplateRequestBodyFieldsTypeField(val) {
        return val;
    }
    function serializeCreateMetadataTemplateRequestBodyFieldsOptionsField(val) {
        return { ['key']: val.key };
    }
    function serializeCreateMetadataTemplateRequestBodyFieldsField(val) {
        return {
            ['type']: serializeCreateMetadataTemplateRequestBodyFieldsTypeField(val.type),
            ['key']: val.key,
            ['displayName']: val.displayName,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['hidden']: val.hidden == void 0 ? void 0 : val.hidden,
            ['options']: val.options == void 0
                ? void 0
                : val.options.map(function (item) {
                    return serializeCreateMetadataTemplateRequestBodyFieldsOptionsField(item);
                }),
        };
    }
    function serializeCreateMetadataTemplateRequestBody(val) {
        return {
            ['scope']: val.scope,
            ['templateKey']: val.templateKey == void 0 ? void 0 : val.templateKey,
            ['displayName']: val.displayName,
            ['hidden']: val.hidden == void 0 ? void 0 : val.hidden,
            ['fields']: val.fields == void 0
                ? void 0
                : val.fields.map(function (item) {
                    return serializeCreateMetadataTemplateRequestBodyFieldsField(item);
                }),
            ['copyInstanceOnItemCopy']: val.copyInstanceOnItemCopy == void 0
                ? void 0
                : val.copyInstanceOnItemCopy,
        };
    }

    class GetClassificationTemplateHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class AddClassificationHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateClassificationHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateClassificationTemplateHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ClassificationsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getClassificationTemplate() {
            return __awaiter(this, arguments, void 0, function* (headers = new GetClassificationTemplateHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/enterprise/securityClassification-6VMVochwUWo/schema'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassificationTemplate(response.data);
            });
        }
        addClassification(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new AddClassificationHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/enterprise/securityClassification-6VMVochwUWo/schema#add'), {
                    method: 'PUT',
                    headers: headersMap,
                    data: requestBody.map(serializeAddClassificationRequestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassificationTemplate(response.data);
            });
        }
        updateClassification(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new UpdateClassificationHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/enterprise/securityClassification-6VMVochwUWo/schema#update'), {
                    method: 'PUT',
                    headers: headersMap,
                    data: requestBody.map(serializeUpdateClassificationRequestBody),
                    contentType: 'application/json-patch+json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassificationTemplate(response.data);
            });
        }
        createClassificationTemplate(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateClassificationTemplateHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_templates/schema#classifications'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateClassificationTemplateRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeClassificationTemplate(response.data);
            });
        }
    }
    function serializeAddClassificationRequestBodyOpField(val) {
        return val;
    }
    function serializeAddClassificationRequestBodyFieldKeyField(val) {
        return val;
    }
    function serializeAddClassificationRequestBodyDataStaticConfigClassificationField(val) {
        return {
            ['classificationDefinition']: val.classificationDefinition == void 0
                ? void 0
                : val.classificationDefinition,
            ['colorID']: val.colorId == void 0 ? void 0 : val.colorId,
        };
    }
    function serializeAddClassificationRequestBodyDataStaticConfigField(val) {
        return {
            ['classification']: val.classification == void 0
                ? void 0
                : serializeAddClassificationRequestBodyDataStaticConfigClassificationField(val.classification),
        };
    }
    function serializeAddClassificationRequestBodyDataField(val) {
        return {
            ['key']: val.key,
            ['staticConfig']: val.staticConfig == void 0
                ? void 0
                : serializeAddClassificationRequestBodyDataStaticConfigField(val.staticConfig),
        };
    }
    function serializeAddClassificationRequestBody(val) {
        return {
            ['op']: serializeAddClassificationRequestBodyOpField(val.op),
            ['fieldKey']: serializeAddClassificationRequestBodyFieldKeyField(val.fieldKey),
            ['data']: serializeAddClassificationRequestBodyDataField(val.data),
        };
    }
    function serializeUpdateClassificationRequestBodyOpField(val) {
        return val;
    }
    function serializeUpdateClassificationRequestBodyFieldKeyField(val) {
        return val;
    }
    function serializeUpdateClassificationRequestBodyDataStaticConfigClassificationField(val) {
        return {
            ['classificationDefinition']: val.classificationDefinition == void 0
                ? void 0
                : val.classificationDefinition,
            ['colorID']: val.colorId == void 0 ? void 0 : val.colorId,
        };
    }
    function serializeUpdateClassificationRequestBodyDataStaticConfigField(val) {
        return {
            ['classification']: val.classification == void 0
                ? void 0
                : serializeUpdateClassificationRequestBodyDataStaticConfigClassificationField(val.classification),
        };
    }
    function serializeUpdateClassificationRequestBodyDataField(val) {
        return {
            ['key']: val.key,
            ['staticConfig']: val.staticConfig == void 0
                ? void 0
                : serializeUpdateClassificationRequestBodyDataStaticConfigField(val.staticConfig),
        };
    }
    function serializeUpdateClassificationRequestBody(val) {
        return {
            ['op']: serializeUpdateClassificationRequestBodyOpField(val.op),
            ['fieldKey']: serializeUpdateClassificationRequestBodyFieldKeyField(val.fieldKey),
            ['enumOptionKey']: val.enumOptionKey,
            ['data']: serializeUpdateClassificationRequestBodyDataField(val.data),
        };
    }
    function serializeCreateClassificationTemplateRequestBodyScopeField(val) {
        return val;
    }
    function serializeCreateClassificationTemplateRequestBodyTemplateKeyField(val) {
        return val;
    }
    function serializeCreateClassificationTemplateRequestBodyDisplayNameField(val) {
        return val;
    }
    function serializeCreateClassificationTemplateRequestBodyFieldsTypeField(val) {
        return val;
    }
    function serializeCreateClassificationTemplateRequestBodyFieldsKeyField(val) {
        return val;
    }
    function serializeCreateClassificationTemplateRequestBodyFieldsDisplayNameField(val) {
        return val;
    }
    function serializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField(val) {
        return {
            ['classificationDefinition']: val.classificationDefinition == void 0
                ? void 0
                : val.classificationDefinition,
            ['colorID']: val.colorId == void 0 ? void 0 : val.colorId,
        };
    }
    function serializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField(val) {
        return {
            ['classification']: val.classification == void 0
                ? void 0
                : serializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigClassificationField(val.classification),
        };
    }
    function serializeCreateClassificationTemplateRequestBodyFieldsOptionsField(val) {
        return {
            ['key']: val.key,
            ['staticConfig']: val.staticConfig == void 0
                ? void 0
                : serializeCreateClassificationTemplateRequestBodyFieldsOptionsStaticConfigField(val.staticConfig),
        };
    }
    function serializeCreateClassificationTemplateRequestBodyFieldsField(val) {
        return {
            ['type']: serializeCreateClassificationTemplateRequestBodyFieldsTypeField(val.type),
            ['key']: serializeCreateClassificationTemplateRequestBodyFieldsKeyField(val.key),
            ['displayName']: serializeCreateClassificationTemplateRequestBodyFieldsDisplayNameField(val.displayName),
            ['hidden']: val.hidden == void 0 ? void 0 : val.hidden,
            ['options']: val.options.map(function (item) {
                return serializeCreateClassificationTemplateRequestBodyFieldsOptionsField(item);
            }),
        };
    }
    function serializeCreateClassificationTemplateRequestBody(val) {
        return {
            ['scope']: serializeCreateClassificationTemplateRequestBodyScopeField(val.scope),
            ['templateKey']: serializeCreateClassificationTemplateRequestBodyTemplateKeyField(val.templateKey),
            ['displayName']: serializeCreateClassificationTemplateRequestBodyDisplayNameField(val.displayName),
            ['hidden']: val.hidden == void 0 ? void 0 : val.hidden,
            ['copyInstanceOnItemCopy']: val.copyInstanceOnItemCopy == void 0
                ? void 0
                : val.copyInstanceOnItemCopy,
            ['fields']: val.fields.map(function (item) {
                return serializeCreateClassificationTemplateRequestBodyFieldsField(item);
            }),
        };
    }

    class GetMetadataCascadePoliciesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateMetadataCascadePolicyHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetMetadataCascadePolicyByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteMetadataCascadePolicyByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ApplyMetadataCascadePolicyHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class MetadataCascadePoliciesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getMetadataCascadePolicies(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetMetadataCascadePoliciesHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['folder_id']: toString(queryParams.folderId),
                    ['owner_enterprise_id']: toString(queryParams.ownerEnterpriseId),
                    ['marker']: toString(queryParams.marker),
                    ['offset']: toString(queryParams.offset),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_cascade_policies'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataCascadePolicies(response.data);
            });
        }
        createMetadataCascadePolicy(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateMetadataCascadePolicyHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_cascade_policies'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateMetadataCascadePolicyRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataCascadePolicy(response.data);
            });
        }
        getMetadataCascadePolicyById(metadataCascadePolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (metadataCascadePolicyId, headers = new GetMetadataCascadePolicyByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_cascade_policies/', toString(metadataCascadePolicyId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataCascadePolicy(response.data);
            });
        }
        deleteMetadataCascadePolicyById(metadataCascadePolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (metadataCascadePolicyId, headers = new DeleteMetadataCascadePolicyByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_cascade_policies/', toString(metadataCascadePolicyId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        applyMetadataCascadePolicy(metadataCascadePolicyId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (metadataCascadePolicyId, requestBody, headers = new ApplyMetadataCascadePolicyHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_cascade_policies/', toString(metadataCascadePolicyId), '/apply'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeApplyMetadataCascadePolicyRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateMetadataCascadePolicyRequestBodyScopeField(val) {
        return val;
    }
    function serializeCreateMetadataCascadePolicyRequestBody(val) {
        return {
            ['folder_id']: val.folderId,
            ['scope']: serializeCreateMetadataCascadePolicyRequestBodyScopeField(val.scope),
            ['templateKey']: val.templateKey,
        };
    }
    function serializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField(val) {
        return val;
    }
    function serializeApplyMetadataCascadePolicyRequestBody(val) {
        return {
            ['conflict_resolution']: serializeApplyMetadataCascadePolicyRequestBodyConflictResolutionField(val.conflictResolution),
        };
    }

    class SearchByMetadataQueryHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class SearchForContentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class SearchManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        searchByMetadataQuery(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new SearchByMetadataQueryHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/metadata_queries/execute_read'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeMetadataQuery(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeMetadataQueryResults(response.data);
            });
        }
        searchForContent() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new SearchForContentHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['query']: toString(queryParams.query),
                    ['scope']: toString(queryParams.scope),
                    ['file_extensions']: queryParams.fileExtensions
                        ? queryParams.fileExtensions.map(toString).join(',')
                        : undefined,
                    ['created_at_range']: queryParams.createdAtRange
                        ? queryParams.createdAtRange.map(toString).join(',')
                        : undefined,
                    ['updated_at_range']: queryParams.updatedAtRange
                        ? queryParams.updatedAtRange.map(toString).join(',')
                        : undefined,
                    ['size_range']: queryParams.sizeRange
                        ? queryParams.sizeRange.map(toString).join(',')
                        : undefined,
                    ['owner_user_ids']: queryParams.ownerUserIds
                        ? queryParams.ownerUserIds.map(toString).join(',')
                        : undefined,
                    ['recent_updater_user_ids']: queryParams.recentUpdaterUserIds
                        ? queryParams.recentUpdaterUserIds.map(toString).join(',')
                        : undefined,
                    ['ancestor_folder_ids']: queryParams.ancestorFolderIds
                        ? queryParams.ancestorFolderIds.map(toString).join(',')
                        : undefined,
                    ['content_types']: queryParams.contentTypes
                        ? queryParams.contentTypes.map(toString).join(',')
                        : undefined,
                    ['type']: toString(queryParams.type),
                    ['trash_content']: toString(queryParams.trashContent),
                    ['mdfilters']: queryParams.mdfilters
                        ? sdToJson(queryParams.mdfilters.map(serializeMetadataFilter))
                        : undefined,
                    ['sort']: toString(queryParams.sort),
                    ['direction']: toString(queryParams.direction),
                    ['limit']: toString(queryParams.limit),
                    ['include_recent_shared_links']: toString(queryParams.includeRecentSharedLinks),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['offset']: toString(queryParams.offset),
                    ['deleted_user_ids']: queryParams.deletedUserIds
                        ? queryParams.deletedUserIds.map(toString).join(',')
                        : undefined,
                    ['deleted_at_range']: queryParams.deletedAtRange
                        ? queryParams.deletedAtRange.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/search'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSearchResultsOrSearchResultsWithSharedLinks(response.data);
            });
        }
    }

    class GetCollaborationByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateCollaborationByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteCollaborationByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateCollaborationHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UserCollaborationsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getCollaborationById(collaborationId_1) {
            return __awaiter(this, arguments, void 0, function* (collaborationId, queryParams = {}, headers = new GetCollaborationByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaborations/', toString(collaborationId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaboration(response.data);
            });
        }
        updateCollaborationById(collaborationId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (collaborationId, requestBody, headers = new UpdateCollaborationByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaborations/', toString(collaborationId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateCollaborationByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaboration(response.data);
            });
        }
        deleteCollaborationById(collaborationId_1) {
            return __awaiter(this, arguments, void 0, function* (collaborationId, headers = new DeleteCollaborationByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaborations/', toString(collaborationId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        createCollaboration(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, queryParams = {}, headers = new CreateCollaborationHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['notify']: toString(queryParams.notify),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaborations'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeCreateCollaborationRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaboration(response.data);
            });
        }
    }
    function serializeUpdateCollaborationByIdRequestBodyRoleField(val) {
        return val;
    }
    function serializeUpdateCollaborationByIdRequestBodyStatusField(val) {
        return val;
    }
    function serializeUpdateCollaborationByIdRequestBody(val) {
        return {
            ['role']: serializeUpdateCollaborationByIdRequestBodyRoleField(val.role),
            ['status']: val.status == void 0
                ? void 0
                : serializeUpdateCollaborationByIdRequestBodyStatusField(val.status),
            ['expires_at']: val.expiresAt == void 0 ? void 0 : val.expiresAt,
            ['can_view_path']: val.canViewPath == void 0 ? void 0 : val.canViewPath,
        };
    }
    function serializeCreateCollaborationRequestBodyItemTypeField(val) {
        return val;
    }
    function serializeCreateCollaborationRequestBodyItemField(val) {
        return {
            ['type']: val.type == void 0
                ? void 0
                : serializeCreateCollaborationRequestBodyItemTypeField(val.type),
            ['id']: val.id == void 0 ? void 0 : val.id,
        };
    }
    function serializeCreateCollaborationRequestBodyAccessibleByTypeField(val) {
        return val;
    }
    function serializeCreateCollaborationRequestBodyAccessibleByField(val) {
        return {
            ['type']: serializeCreateCollaborationRequestBodyAccessibleByTypeField(val.type),
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['login']: val.login == void 0 ? void 0 : val.login,
        };
    }
    function serializeCreateCollaborationRequestBodyRoleField(val) {
        return val;
    }
    function serializeCreateCollaborationRequestBody(val) {
        return {
            ['item']: serializeCreateCollaborationRequestBodyItemField(val.item),
            ['accessible_by']: serializeCreateCollaborationRequestBodyAccessibleByField(val.accessibleBy),
            ['role']: serializeCreateCollaborationRequestBodyRoleField(val.role),
            ['is_access_only']: val.isAccessOnly == void 0 ? void 0 : val.isAccessOnly,
            ['can_view_path']: val.canViewPath == void 0 ? void 0 : val.canViewPath,
            ['expires_at']: val.expiresAt == void 0 ? void 0 : val.expiresAt,
        };
    }

    class GetTaskAssignmentsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateTaskAssignmentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetTaskAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateTaskAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteTaskAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TaskAssignmentsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getTaskAssignments(taskId_1) {
            return __awaiter(this, arguments, void 0, function* (taskId, headers = new GetTaskAssignmentsHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/tasks/', toString(taskId), '/assignments'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTaskAssignments(response.data);
            });
        }
        createTaskAssignment(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateTaskAssignmentHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/task_assignments'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateTaskAssignmentRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTaskAssignment(response.data);
            });
        }
        getTaskAssignmentById(taskAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (taskAssignmentId, headers = new GetTaskAssignmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/task_assignments/', toString(taskAssignmentId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTaskAssignment(response.data);
            });
        }
        updateTaskAssignmentById(taskAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (taskAssignmentId, requestBody = {}, headers = new UpdateTaskAssignmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/task_assignments/', toString(taskAssignmentId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateTaskAssignmentByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTaskAssignment(response.data);
            });
        }
        deleteTaskAssignmentById(taskAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (taskAssignmentId, headers = new DeleteTaskAssignmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/task_assignments/', toString(taskAssignmentId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateTaskAssignmentRequestBodyTaskTypeField(val) {
        return val;
    }
    function serializeCreateTaskAssignmentRequestBodyTaskField(val) {
        return {
            ['id']: val.id,
            ['type']: serializeCreateTaskAssignmentRequestBodyTaskTypeField(val.type),
        };
    }
    function serializeCreateTaskAssignmentRequestBodyAssignToField(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['login']: val.login == void 0 ? void 0 : val.login,
        };
    }
    function serializeCreateTaskAssignmentRequestBody(val) {
        return {
            ['task']: serializeCreateTaskAssignmentRequestBodyTaskField(val.task),
            ['assign_to']: serializeCreateTaskAssignmentRequestBodyAssignToField(val.assignTo),
        };
    }
    function serializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField(val) {
        return val;
    }
    function serializeUpdateTaskAssignmentByIdRequestBody(val) {
        return {
            ['message']: val.message == void 0 ? void 0 : val.message,
            ['resolution_state']: val.resolutionState == void 0
                ? void 0
                : serializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField(val.resolutionState),
        };
    }

    class GetSharedLinkForFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class AddShareLinkToFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateSharedLinkOnFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class RemoveSharedLinkFromFileHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class SharedLinksFilesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        findFileForSharedLink() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers, cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({
                    ['if-none-match']: toString(headers.ifNoneMatch),
                    ['boxapi']: toString(headers.boxapi),
                }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shared_items'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileFull(response.data);
            });
        }
        getSharedLinkForFile(fileId_1, queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, queryParams, headers = new GetSharedLinkForFileHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '#get_shared_link'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileFull(response.data);
            });
        }
        addShareLinkToFile(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody = {}, queryParams, headers = new AddShareLinkToFileHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '#add_shared_link'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeAddShareLinkToFileRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileFull(response.data);
            });
        }
        updateSharedLinkOnFile(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody = {}, queryParams, headers = new UpdateSharedLinkOnFileHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '#update_shared_link'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeUpdateSharedLinkOnFileRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileFull(response.data);
            });
        }
        removeSharedLinkFromFile(fileId_1) {
            return __awaiter(this, arguments, void 0, function* (fileId, requestBody = {}, queryParams, headers = new RemoveSharedLinkFromFileHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/files/', toString(fileId), '#remove_shared_link'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeRemoveSharedLinkFromFileRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileFull(response.data);
            });
        }
    }
    function serializeAddShareLinkToFileRequestBodySharedLinkAccessField(val) {
        return val;
    }
    function serializeAddShareLinkToFileRequestBodySharedLinkPermissionsField(val) {
        return {
            ['can_download']: val.canDownload == void 0 ? void 0 : val.canDownload,
            ['can_preview']: val.canPreview == void 0 ? void 0 : val.canPreview,
            ['can_edit']: val.canEdit == void 0 ? void 0 : val.canEdit,
        };
    }
    function serializeAddShareLinkToFileRequestBodySharedLinkField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeAddShareLinkToFileRequestBodySharedLinkAccessField(val.access),
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['vanity_name']: val.vanityName == void 0 ? void 0 : val.vanityName,
            ['unshared_at']: val.unsharedAt == void 0 ? void 0 : val.unsharedAt,
            ['permissions']: val.permissions == void 0
                ? void 0
                : serializeAddShareLinkToFileRequestBodySharedLinkPermissionsField(val.permissions),
        };
    }
    function serializeAddShareLinkToFileRequestBody(val) {
        return {
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeAddShareLinkToFileRequestBodySharedLinkField(val.sharedLink),
        };
    }
    function serializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField(val) {
        return val;
    }
    function serializeUpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField(val) {
        return {
            ['can_download']: val.canDownload == void 0 ? void 0 : val.canDownload,
            ['can_preview']: val.canPreview == void 0 ? void 0 : val.canPreview,
            ['can_edit']: val.canEdit == void 0 ? void 0 : val.canEdit,
        };
    }
    function serializeUpdateSharedLinkOnFileRequestBodySharedLinkField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeUpdateSharedLinkOnFileRequestBodySharedLinkAccessField(val.access),
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['vanity_name']: val.vanityName == void 0 ? void 0 : val.vanityName,
            ['unshared_at']: val.unsharedAt == void 0 ? void 0 : val.unsharedAt,
            ['permissions']: val.permissions == void 0
                ? void 0
                : serializeUpdateSharedLinkOnFileRequestBodySharedLinkPermissionsField(val.permissions),
        };
    }
    function serializeUpdateSharedLinkOnFileRequestBody(val) {
        return {
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeUpdateSharedLinkOnFileRequestBodySharedLinkField(val.sharedLink),
        };
    }
    function serializeRemoveSharedLinkFromFileRequestBodySharedLinkField(val) {
        return {};
    }
    function serializeRemoveSharedLinkFromFileRequestBody(val) {
        return {
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeRemoveSharedLinkFromFileRequestBodySharedLinkField(val.sharedLink),
        };
    }

    class GetSharedLinkForFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class AddShareLinkToFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateSharedLinkOnFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class RemoveSharedLinkFromFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class SharedLinksFoldersManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        findFolderForSharedLink() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers, cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({
                    ['if-none-match']: toString(headers.ifNoneMatch),
                    ['boxapi']: toString(headers.boxapi),
                }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shared_items#folders'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
        getSharedLinkForFolder(folderId_1, queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, queryParams, headers = new GetSharedLinkForFolderHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '#get_shared_link'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
        addShareLinkToFolder(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, requestBody = {}, queryParams, headers = new AddShareLinkToFolderHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '#add_shared_link'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeAddShareLinkToFolderRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
        updateSharedLinkOnFolder(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, requestBody = {}, queryParams, headers = new UpdateSharedLinkOnFolderHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '#update_shared_link'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeUpdateSharedLinkOnFolderRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
        removeSharedLinkFromFolder(folderId_1) {
            return __awaiter(this, arguments, void 0, function* (folderId, requestBody = {}, queryParams, headers = new RemoveSharedLinkFromFolderHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/folders/', toString(folderId), '#remove_shared_link'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeRemoveSharedLinkFromFolderRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
    }
    function serializeAddShareLinkToFolderRequestBodySharedLinkAccessField(val) {
        return val;
    }
    function serializeAddShareLinkToFolderRequestBodySharedLinkPermissionsField(val) {
        return {
            ['can_download']: val.canDownload == void 0 ? void 0 : val.canDownload,
            ['can_preview']: val.canPreview == void 0 ? void 0 : val.canPreview,
            ['can_edit']: val.canEdit == void 0 ? void 0 : val.canEdit,
        };
    }
    function serializeAddShareLinkToFolderRequestBodySharedLinkField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeAddShareLinkToFolderRequestBodySharedLinkAccessField(val.access),
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['vanity_name']: val.vanityName == void 0 ? void 0 : val.vanityName,
            ['unshared_at']: val.unsharedAt == void 0 ? void 0 : val.unsharedAt,
            ['permissions']: val.permissions == void 0
                ? void 0
                : serializeAddShareLinkToFolderRequestBodySharedLinkPermissionsField(val.permissions),
        };
    }
    function serializeAddShareLinkToFolderRequestBody(val) {
        return {
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeAddShareLinkToFolderRequestBodySharedLinkField(val.sharedLink),
        };
    }
    function serializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField(val) {
        return val;
    }
    function serializeUpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField(val) {
        return {
            ['can_download']: val.canDownload == void 0 ? void 0 : val.canDownload,
            ['can_preview']: val.canPreview == void 0 ? void 0 : val.canPreview,
            ['can_edit']: val.canEdit == void 0 ? void 0 : val.canEdit,
        };
    }
    function serializeUpdateSharedLinkOnFolderRequestBodySharedLinkField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeUpdateSharedLinkOnFolderRequestBodySharedLinkAccessField(val.access),
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['vanity_name']: val.vanityName == void 0 ? void 0 : val.vanityName,
            ['unshared_at']: val.unsharedAt == void 0 ? void 0 : val.unsharedAt,
            ['permissions']: val.permissions == void 0
                ? void 0
                : serializeUpdateSharedLinkOnFolderRequestBodySharedLinkPermissionsField(val.permissions),
        };
    }
    function serializeUpdateSharedLinkOnFolderRequestBody(val) {
        return {
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeUpdateSharedLinkOnFolderRequestBodySharedLinkField(val.sharedLink),
        };
    }
    function serializeRemoveSharedLinkFromFolderRequestBodySharedLinkField(val) {
        return {};
    }
    function serializeRemoveSharedLinkFromFolderRequestBody(val) {
        return {
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeRemoveSharedLinkFromFolderRequestBodySharedLinkField(val.sharedLink),
        };
    }

    class CreateWebLinkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetWebLinkByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateWebLinkByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteWebLinkByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class WebLinksManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        createWebLink(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateWebLinkHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateWebLinkRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebLink(response.data);
            });
        }
        getWebLinkById(webLinkId_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, headers = new GetWebLinkByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({ ['boxapi']: toString(headers.boxapi) }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebLink(response.data);
            });
        }
        updateWebLinkById(webLinkId_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, requestBody = {}, headers = new UpdateWebLinkByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateWebLinkByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebLink(response.data);
            });
        }
        deleteWebLinkById(webLinkId_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, headers = new DeleteWebLinkByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateWebLinkRequestBodyParentField(val) {
        return { ['id']: val.id };
    }
    function serializeCreateWebLinkRequestBody(val) {
        return {
            ['url']: val.url,
            ['parent']: serializeCreateWebLinkRequestBodyParentField(val.parent),
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['description']: val.description == void 0 ? void 0 : val.description,
        };
    }
    function serializeUpdateWebLinkByIdRequestBodyParentField(val) {
        return { ['id']: val.id == void 0 ? void 0 : val.id };
    }
    function serializeUpdateWebLinkByIdRequestBodySharedLinkAccessField(val) {
        return val;
    }
    function serializeUpdateWebLinkByIdRequestBodySharedLinkField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeUpdateWebLinkByIdRequestBodySharedLinkAccessField(val.access),
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['vanity_name']: val.vanityName == void 0 ? void 0 : val.vanityName,
            ['unshared_at']: val.unsharedAt == void 0 ? void 0 : val.unsharedAt,
        };
    }
    function serializeUpdateWebLinkByIdRequestBody(val) {
        return {
            ['url']: val.url == void 0 ? void 0 : val.url,
            ['parent']: val.parent == void 0
                ? void 0
                : serializeUpdateWebLinkByIdRequestBodyParentField(val.parent),
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeUpdateWebLinkByIdRequestBodySharedLinkField(val.sharedLink),
        };
    }

    class RestoreWeblinkFromTrashHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetTrashedWebLinkByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteTrashedWebLinkByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TrashedWebLinksManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        restoreWeblinkFromTrash(webLinkId_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, requestBody = {}, queryParams = {}, headers = new RestoreWeblinkFromTrashHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId)), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeRestoreWeblinkFromTrashRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTrashWebLinkRestored(response.data);
            });
        }
        getTrashedWebLinkById(webLinkId_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, queryParams = {}, headers = new GetTrashedWebLinkByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId), '/trash'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTrashWebLink(response.data);
            });
        }
        deleteTrashedWebLinkById(webLinkId_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, headers = new DeleteTrashedWebLinkByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId), '/trash'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeRestoreWeblinkFromTrashRequestBodyParentField(val) {
        return { ['id']: val.id == void 0 ? void 0 : val.id };
    }
    function serializeRestoreWeblinkFromTrashRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['parent']: val.parent == void 0
                ? void 0
                : serializeRestoreWeblinkFromTrashRequestBodyParentField(val.parent),
        };
    }

    class GetSharedLinkForWebLinkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class AddShareLinkToWebLinkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateSharedLinkOnWebLinkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class RemoveSharedLinkFromWebLinkHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class SharedLinksWebLinksManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        findWebLinkForSharedLink() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers, cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({
                    ['if-none-match']: toString(headers.ifNoneMatch),
                    ['boxapi']: toString(headers.boxapi),
                }, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shared_items#web_links'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebLink(response.data);
            });
        }
        getSharedLinkForWebLink(webLinkId_1, queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, queryParams, headers = new GetSharedLinkForWebLinkHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId), '#get_shared_link'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebLink(response.data);
            });
        }
        addShareLinkToWebLink(webLinkId_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, requestBody = {}, queryParams, headers = new AddShareLinkToWebLinkHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId), '#add_shared_link'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeAddShareLinkToWebLinkRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebLink(response.data);
            });
        }
        updateSharedLinkOnWebLink(webLinkId_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, requestBody = {}, queryParams, headers = new UpdateSharedLinkOnWebLinkHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId), '#update_shared_link'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeUpdateSharedLinkOnWebLinkRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebLink(response.data);
            });
        }
        removeSharedLinkFromWebLink(webLinkId_1) {
            return __awaiter(this, arguments, void 0, function* (webLinkId, requestBody = {}, queryParams, headers = new RemoveSharedLinkFromWebLinkHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({ ['fields']: toString(queryParams.fields) });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/web_links/', toString(webLinkId), '#remove_shared_link'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeRemoveSharedLinkFromWebLinkRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebLink(response.data);
            });
        }
    }
    function serializeAddShareLinkToWebLinkRequestBodySharedLinkAccessField(val) {
        return val;
    }
    function serializeAddShareLinkToWebLinkRequestBodySharedLinkPermissionsField(val) {
        return {
            ['can_download']: val.canDownload == void 0 ? void 0 : val.canDownload,
            ['can_preview']: val.canPreview == void 0 ? void 0 : val.canPreview,
            ['can_edit']: val.canEdit == void 0 ? void 0 : val.canEdit,
        };
    }
    function serializeAddShareLinkToWebLinkRequestBodySharedLinkField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeAddShareLinkToWebLinkRequestBodySharedLinkAccessField(val.access),
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['vanity_name']: val.vanityName == void 0 ? void 0 : val.vanityName,
            ['unshared_at']: val.unsharedAt == void 0 ? void 0 : val.unsharedAt,
            ['permissions']: val.permissions == void 0
                ? void 0
                : serializeAddShareLinkToWebLinkRequestBodySharedLinkPermissionsField(val.permissions),
        };
    }
    function serializeAddShareLinkToWebLinkRequestBody(val) {
        return {
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeAddShareLinkToWebLinkRequestBodySharedLinkField(val.sharedLink),
        };
    }
    function serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField(val) {
        return val;
    }
    function serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField(val) {
        return {
            ['can_download']: val.canDownload == void 0 ? void 0 : val.canDownload,
            ['can_preview']: val.canPreview == void 0 ? void 0 : val.canPreview,
            ['can_edit']: val.canEdit == void 0 ? void 0 : val.canEdit,
        };
    }
    function serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkField(val) {
        return {
            ['access']: val.access == void 0
                ? void 0
                : serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkAccessField(val.access),
            ['password']: val.password == void 0 ? void 0 : val.password,
            ['vanity_name']: val.vanityName == void 0 ? void 0 : val.vanityName,
            ['unshared_at']: val.unsharedAt == void 0 ? void 0 : val.unsharedAt,
            ['permissions']: val.permissions == void 0
                ? void 0
                : serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkPermissionsField(val.permissions),
        };
    }
    function serializeUpdateSharedLinkOnWebLinkRequestBody(val) {
        return {
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeUpdateSharedLinkOnWebLinkRequestBodySharedLinkField(val.sharedLink),
        };
    }
    function serializeRemoveSharedLinkFromWebLinkRequestBodySharedLinkField(val) {
        return {};
    }
    function serializeRemoveSharedLinkFromWebLinkRequestBody(val) {
        return {
            ['shared_link']: val.sharedLink == void 0
                ? void 0
                : serializeRemoveSharedLinkFromWebLinkRequestBodySharedLinkField(val.sharedLink),
        };
    }

    class GetUsersHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateUserHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetUserMeHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetUserByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateUserByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteUserByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UsersManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getUsers() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetUsersHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['filter_term']: toString(queryParams.filterTerm),
                    ['user_type']: toString(queryParams.userType),
                    ['external_app_user_id']: toString(queryParams.externalAppUserId),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['offset']: toString(queryParams.offset),
                    ['limit']: toString(queryParams.limit),
                    ['usemarker']: toString(queryParams.usemarker),
                    ['marker']: toString(queryParams.marker),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUsers(response.data);
            });
        }
        createUser(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, queryParams = {}, headers = new CreateUserHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeCreateUserRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUserFull(response.data);
            });
        }
        getUserMe() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetUserMeHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/me'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUserFull(response.data);
            });
        }
        getUserById(userId_1) {
            return __awaiter(this, arguments, void 0, function* (userId, queryParams = {}, headers = new GetUserByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUserFull(response.data);
            });
        }
        updateUserById(userId_1) {
            return __awaiter(this, arguments, void 0, function* (userId, requestBody = {}, queryParams = {}, headers = new UpdateUserByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId)), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeUpdateUserByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUserFull(response.data);
            });
        }
        deleteUserById(userId_1) {
            return __awaiter(this, arguments, void 0, function* (userId, queryParams = {}, headers = new DeleteUserByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['notify']: toString(queryParams.notify),
                    ['force']: toString(queryParams.force),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId)), {
                    method: 'DELETE',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateUserRequestBodyRoleField(val) {
        return val;
    }
    function serializeCreateUserRequestBodyStatusField(val) {
        return val;
    }
    function serializeCreateUserRequestBody(val) {
        return {
            ['name']: val.name,
            ['login']: val.login == void 0 ? void 0 : val.login,
            ['is_platform_access_only']: val.isPlatformAccessOnly == void 0 ? void 0 : val.isPlatformAccessOnly,
            ['role']: val.role == void 0
                ? void 0
                : serializeCreateUserRequestBodyRoleField(val.role),
            ['language']: val.language == void 0 ? void 0 : val.language,
            ['is_sync_enabled']: val.isSyncEnabled == void 0 ? void 0 : val.isSyncEnabled,
            ['job_title']: val.jobTitle == void 0 ? void 0 : val.jobTitle,
            ['phone']: val.phone == void 0 ? void 0 : val.phone,
            ['address']: val.address == void 0 ? void 0 : val.address,
            ['space_amount']: val.spaceAmount == void 0 ? void 0 : val.spaceAmount,
            ['tracking_codes']: val.trackingCodes == void 0
                ? void 0
                : val.trackingCodes.map(function (item) {
                    return serializeTrackingCode(item);
                }),
            ['can_see_managed_users']: val.canSeeManagedUsers == void 0 ? void 0 : val.canSeeManagedUsers,
            ['timezone']: val.timezone == void 0 ? void 0 : val.timezone,
            ['is_external_collab_restricted']: val.isExternalCollabRestricted == void 0
                ? void 0
                : val.isExternalCollabRestricted,
            ['is_exempt_from_device_limits']: val.isExemptFromDeviceLimits == void 0
                ? void 0
                : val.isExemptFromDeviceLimits,
            ['is_exempt_from_login_verification']: val.isExemptFromLoginVerification == void 0
                ? void 0
                : val.isExemptFromLoginVerification,
            ['status']: val.status == void 0
                ? void 0
                : serializeCreateUserRequestBodyStatusField(val.status),
            ['external_app_user_id']: val.externalAppUserId == void 0 ? void 0 : val.externalAppUserId,
        };
    }
    function serializeUpdateUserByIdRequestBodyRoleField(val) {
        return val;
    }
    function serializeUpdateUserByIdRequestBodyStatusField(val) {
        return val;
    }
    function serializeUpdateUserByIdRequestBodyNotificationEmailField(val) {
        return { ['email']: val.email == void 0 ? void 0 : val.email };
    }
    function serializeUpdateUserByIdRequestBody(val) {
        return {
            ['enterprise']: val.enterprise == void 0 ? void 0 : val.enterprise,
            ['notify']: val.notify == void 0 ? void 0 : val.notify,
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['login']: val.login == void 0 ? void 0 : val.login,
            ['role']: val.role == void 0
                ? void 0
                : serializeUpdateUserByIdRequestBodyRoleField(val.role),
            ['language']: val.language == void 0 ? void 0 : val.language,
            ['is_sync_enabled']: val.isSyncEnabled == void 0 ? void 0 : val.isSyncEnabled,
            ['job_title']: val.jobTitle == void 0 ? void 0 : val.jobTitle,
            ['phone']: val.phone == void 0 ? void 0 : val.phone,
            ['address']: val.address == void 0 ? void 0 : val.address,
            ['tracking_codes']: val.trackingCodes == void 0
                ? void 0
                : val.trackingCodes.map(function (item) {
                    return serializeTrackingCode(item);
                }),
            ['can_see_managed_users']: val.canSeeManagedUsers == void 0 ? void 0 : val.canSeeManagedUsers,
            ['timezone']: val.timezone == void 0 ? void 0 : val.timezone,
            ['is_external_collab_restricted']: val.isExternalCollabRestricted == void 0
                ? void 0
                : val.isExternalCollabRestricted,
            ['is_exempt_from_device_limits']: val.isExemptFromDeviceLimits == void 0
                ? void 0
                : val.isExemptFromDeviceLimits,
            ['is_exempt_from_login_verification']: val.isExemptFromLoginVerification == void 0
                ? void 0
                : val.isExemptFromLoginVerification,
            ['is_password_reset_required']: val.isPasswordResetRequired == void 0
                ? void 0
                : val.isPasswordResetRequired,
            ['status']: val.status == void 0
                ? void 0
                : serializeUpdateUserByIdRequestBodyStatusField(val.status),
            ['space_amount']: val.spaceAmount == void 0 ? void 0 : val.spaceAmount,
            ['notification_email']: val.notificationEmail == void 0
                ? void 0
                : serializeUpdateUserByIdRequestBodyNotificationEmailField(val.notificationEmail),
            ['external_app_user_id']: val.externalAppUserId == void 0 ? void 0 : val.externalAppUserId,
        };
    }

    class TerminateUsersSessionsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TerminateGroupsSessionsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class SessionTerminationManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        terminateUsersSessions(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new TerminateUsersSessionsHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/terminate_sessions'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeTerminateUsersSessionsRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSessionTerminationMessage(response.data);
            });
        }
        terminateGroupsSessions(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new TerminateGroupsSessionsHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/groups/terminate_sessions'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeTerminateGroupsSessionsRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSessionTerminationMessage(response.data);
            });
        }
    }
    function serializeTerminateUsersSessionsRequestBody(val) {
        return {
            ['user_ids']: val.userIds.map(function (item) {
                return item;
            }),
            ['user_logins']: val.userLogins.map(function (item) {
                return item;
            }),
        };
    }
    function serializeTerminateGroupsSessionsRequestBody(val) {
        return {
            ['group_ids']: val.groupIds.map(function (item) {
                return item;
            }),
        };
    }

    class GetUserAvatarHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateUserAvatarHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteUserAvatarHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class AvatarsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getUserAvatar(userId_1) {
            return __awaiter(this, arguments, void 0, function* (userId, headers = new GetUserAvatarHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId), '/avatar'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'binary',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return response.content;
            });
        }
        createUserAvatar(userId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (userId, requestBody, headers = new CreateUserAvatarHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId), '/avatar'), {
                    method: 'POST',
                    headers: headersMap,
                    multipartData: [
                        {
                            partName: 'pic',
                            fileStream: requestBody.pic,
                            fileName: requestBody.picFileName,
                            contentType: requestBody.picContentType,
                        },
                    ],
                    contentType: 'multipart/form-data',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeUserAvatar(response.data);
            });
        }
        deleteUserAvatar(userId_1) {
            return __awaiter(this, arguments, void 0, function* (userId, headers = new DeleteUserAvatarHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId), '/avatar'), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }

    class TransferOwnedFolderHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TransferManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        transferOwnedFolder(userId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (userId, requestBody, queryParams = {}, headers = new TransferOwnedFolderHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['notify']: toString(queryParams.notify),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId), '/folders/0'), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeTransferOwnedFolderRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFolderFull(response.data);
            });
        }
    }
    function serializeTransferOwnedFolderRequestBodyOwnedByField(val) {
        return { ['id']: val.id };
    }
    function serializeTransferOwnedFolderRequestBody(val) {
        return {
            ['owned_by']: serializeTransferOwnedFolderRequestBodyOwnedByField(val.ownedBy),
        };
    }

    class GetUserEmailAliasesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateUserEmailAliasHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteUserEmailAliasByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class EmailAliasesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getUserEmailAliases(userId_1) {
            return __awaiter(this, arguments, void 0, function* (userId, headers = new GetUserEmailAliasesHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId), '/email_aliases'), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeEmailAliases(response.data);
            });
        }
        createUserEmailAlias(userId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (userId, requestBody, headers = new CreateUserEmailAliasHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId), '/email_aliases'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateUserEmailAliasRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeEmailAlias(response.data);
            });
        }
        deleteUserEmailAliasById(userId_1, emailAliasId_1) {
            return __awaiter(this, arguments, void 0, function* (userId, emailAliasId, headers = new DeleteUserEmailAliasByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId), '/email_aliases/', toString(emailAliasId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateUserEmailAliasRequestBody(val) {
        return { ['email']: val.email };
    }

    class GetUserMembershipsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetGroupMembershipsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateGroupMembershipHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetGroupMembershipByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateGroupMembershipByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteGroupMembershipByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class MembershipsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getUserMemberships(userId_1) {
            return __awaiter(this, arguments, void 0, function* (userId, queryParams = {}, headers = new GetUserMembershipsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['limit']: toString(queryParams.limit),
                    ['offset']: toString(queryParams.offset),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/users/', toString(userId), '/memberships'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeGroupMemberships(response.data);
            });
        }
        getGroupMemberships(groupId_1) {
            return __awaiter(this, arguments, void 0, function* (groupId, queryParams = {}, headers = new GetGroupMembershipsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['limit']: toString(queryParams.limit),
                    ['offset']: toString(queryParams.offset),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/groups/', toString(groupId), '/memberships'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeGroupMemberships(response.data);
            });
        }
        createGroupMembership(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, queryParams = {}, headers = new CreateGroupMembershipHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/group_memberships'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeCreateGroupMembershipRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeGroupMembership(response.data);
            });
        }
        getGroupMembershipById(groupMembershipId_1) {
            return __awaiter(this, arguments, void 0, function* (groupMembershipId, queryParams = {}, headers = new GetGroupMembershipByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/group_memberships/', toString(groupMembershipId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeGroupMembership(response.data);
            });
        }
        updateGroupMembershipById(groupMembershipId_1) {
            return __awaiter(this, arguments, void 0, function* (groupMembershipId, requestBody = {}, queryParams = {}, headers = new UpdateGroupMembershipByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/group_memberships/', toString(groupMembershipId)), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeUpdateGroupMembershipByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeGroupMembership(response.data);
            });
        }
        deleteGroupMembershipById(groupMembershipId_1) {
            return __awaiter(this, arguments, void 0, function* (groupMembershipId, headers = new DeleteGroupMembershipByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/group_memberships/', toString(groupMembershipId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateGroupMembershipRequestBodyUserField(val) {
        return { ['id']: val.id };
    }
    function serializeCreateGroupMembershipRequestBodyGroupField(val) {
        return { ['id']: val.id };
    }
    function serializeCreateGroupMembershipRequestBodyRoleField(val) {
        return val;
    }
    function serializeCreateGroupMembershipRequestBody(val) {
        return {
            ['user']: serializeCreateGroupMembershipRequestBodyUserField(val.user),
            ['group']: serializeCreateGroupMembershipRequestBodyGroupField(val.group),
            ['role']: val.role == void 0
                ? void 0
                : serializeCreateGroupMembershipRequestBodyRoleField(val.role),
            ['configurable_permissions']: val.configurablePermissions == void 0
                ? void 0
                : val.configurablePermissions,
        };
    }
    function serializeUpdateGroupMembershipByIdRequestBodyRoleField(val) {
        return val;
    }
    function serializeUpdateGroupMembershipByIdRequestBody(val) {
        return {
            ['role']: val.role == void 0
                ? void 0
                : serializeUpdateGroupMembershipByIdRequestBodyRoleField(val.role),
            ['configurable_permissions']: val.configurablePermissions == void 0
                ? void 0
                : val.configurablePermissions,
        };
    }

    class CreateInviteHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetInviteByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class InvitesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        createInvite(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, queryParams = {}, headers = new CreateInviteHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/invites'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeCreateInviteRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeInvite(response.data);
            });
        }
        getInviteById(inviteId_1) {
            return __awaiter(this, arguments, void 0, function* (inviteId, queryParams = {}, headers = new GetInviteByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/invites/', toString(inviteId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeInvite(response.data);
            });
        }
    }
    function serializeCreateInviteRequestBodyEnterpriseField(val) {
        return { ['id']: val.id };
    }
    function serializeCreateInviteRequestBodyActionableByField(val) {
        return { ['login']: val.login == void 0 ? void 0 : val.login };
    }
    function serializeCreateInviteRequestBody(val) {
        return {
            ['enterprise']: serializeCreateInviteRequestBodyEnterpriseField(val.enterprise),
            ['actionable_by']: serializeCreateInviteRequestBodyActionableByField(val.actionableBy),
        };
    }

    class GetGroupsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateGroupHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetGroupByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateGroupByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteGroupByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GroupsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getGroups() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetGroupsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['filter_term']: toString(queryParams.filterTerm),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['limit']: toString(queryParams.limit),
                    ['offset']: toString(queryParams.offset),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/groups'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeGroups(response.data);
            });
        }
        createGroup(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, queryParams = {}, headers = new CreateGroupHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/groups'), {
                    method: 'POST',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeCreateGroupRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeGroupFull(response.data);
            });
        }
        getGroupById(groupId_1) {
            return __awaiter(this, arguments, void 0, function* (groupId, queryParams = {}, headers = new GetGroupByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/groups/', toString(groupId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeGroupFull(response.data);
            });
        }
        updateGroupById(groupId_1) {
            return __awaiter(this, arguments, void 0, function* (groupId, requestBody = {}, queryParams = {}, headers = new UpdateGroupByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/groups/', toString(groupId)), {
                    method: 'PUT',
                    params: queryParamsMap,
                    headers: headersMap,
                    data: serializeUpdateGroupByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeGroupFull(response.data);
            });
        }
        deleteGroupById(groupId_1) {
            return __awaiter(this, arguments, void 0, function* (groupId, headers = new DeleteGroupByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/groups/', toString(groupId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateGroupRequestBodyInvitabilityLevelField(val) {
        return val;
    }
    function serializeCreateGroupRequestBodyMemberViewabilityLevelField(val) {
        return val;
    }
    function serializeCreateGroupRequestBody(val) {
        return {
            ['name']: val.name,
            ['provenance']: val.provenance == void 0 ? void 0 : val.provenance,
            ['external_sync_identifier']: val.externalSyncIdentifier == void 0
                ? void 0
                : val.externalSyncIdentifier,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['invitability_level']: val.invitabilityLevel == void 0
                ? void 0
                : serializeCreateGroupRequestBodyInvitabilityLevelField(val.invitabilityLevel),
            ['member_viewability_level']: val.memberViewabilityLevel == void 0
                ? void 0
                : serializeCreateGroupRequestBodyMemberViewabilityLevelField(val.memberViewabilityLevel),
        };
    }
    function serializeUpdateGroupByIdRequestBodyInvitabilityLevelField(val) {
        return val;
    }
    function serializeUpdateGroupByIdRequestBodyMemberViewabilityLevelField(val) {
        return val;
    }
    function serializeUpdateGroupByIdRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['provenance']: val.provenance == void 0 ? void 0 : val.provenance,
            ['external_sync_identifier']: val.externalSyncIdentifier == void 0
                ? void 0
                : val.externalSyncIdentifier,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['invitability_level']: val.invitabilityLevel == void 0
                ? void 0
                : serializeUpdateGroupByIdRequestBodyInvitabilityLevelField(val.invitabilityLevel),
            ['member_viewability_level']: val.memberViewabilityLevel == void 0
                ? void 0
                : serializeUpdateGroupByIdRequestBodyMemberViewabilityLevelField(val.memberViewabilityLevel),
        };
    }

    class GetWebhooksHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateWebhookHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetWebhookByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateWebhookByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteWebhookByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class WebhooksManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getWebhooks() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetWebhooksHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/webhooks'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebhooks(response.data);
            });
        }
        createWebhook(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateWebhookHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/webhooks'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateWebhookRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebhook(response.data);
            });
        }
        getWebhookById(webhookId_1) {
            return __awaiter(this, arguments, void 0, function* (webhookId, headers = new GetWebhookByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/webhooks/', toString(webhookId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebhook(response.data);
            });
        }
        updateWebhookById(webhookId_1) {
            return __awaiter(this, arguments, void 0, function* (webhookId, requestBody = {}, headers = new UpdateWebhookByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/webhooks/', toString(webhookId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateWebhookByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWebhook(response.data);
            });
        }
        deleteWebhookById(webhookId_1) {
            return __awaiter(this, arguments, void 0, function* (webhookId, headers = new DeleteWebhookByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/webhooks/', toString(webhookId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateWebhookRequestBodyTargetTypeField(val) {
        return val;
    }
    function serializeCreateWebhookRequestBodyTargetField(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0
                ? void 0
                : serializeCreateWebhookRequestBodyTargetTypeField(val.type),
        };
    }
    function serializeCreateWebhookRequestBodyTriggersField(val) {
        return val;
    }
    function serializeCreateWebhookRequestBody(val) {
        return {
            ['target']: serializeCreateWebhookRequestBodyTargetField(val.target),
            ['address']: val.address,
            ['triggers']: val.triggers.map(function (item) {
                return serializeCreateWebhookRequestBodyTriggersField(item);
            }),
        };
    }
    function serializeUpdateWebhookByIdRequestBodyTargetTypeField(val) {
        return val;
    }
    function serializeUpdateWebhookByIdRequestBodyTargetField(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0
                ? void 0
                : serializeUpdateWebhookByIdRequestBodyTargetTypeField(val.type),
        };
    }
    function serializeUpdateWebhookByIdRequestBodyTriggersField(val) {
        return val;
    }
    function serializeUpdateWebhookByIdRequestBody(val) {
        return {
            ['target']: val.target == void 0
                ? void 0
                : serializeUpdateWebhookByIdRequestBodyTargetField(val.target),
            ['address']: val.address == void 0 ? void 0 : val.address,
            ['triggers']: val.triggers == void 0
                ? void 0
                : val.triggers.map(function (item) {
                    return serializeUpdateWebhookByIdRequestBodyTriggersField(item);
                }),
        };
    }

    class GetEventsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetEventsWithLongPollingHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class EventsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getEvents() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetEventsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['stream_type']: toString(queryParams.streamType),
                    ['stream_position']: toString(queryParams.streamPosition),
                    ['limit']: toString(queryParams.limit),
                    ['event_type']: queryParams.eventType
                        ? queryParams.eventType.map(toString).join(',')
                        : undefined,
                    ['created_after']: toString(queryParams.createdAfter),
                    ['created_before']: toString(queryParams.createdBefore),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/events'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeEvents(response.data);
            });
        }
        getEventsWithLongPolling() {
            return __awaiter(this, arguments, void 0, function* (headers = new GetEventsWithLongPollingHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/events'), {
                    method: 'OPTIONS',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeRealtimeServers(response.data);
            });
        }
    }

    class GetCollectionsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetCollectionItemsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CollectionsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getCollections() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetCollectionsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['offset']: toString(queryParams.offset),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collections'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollections(response.data);
            });
        }
        getCollectionItems(collectionId_1) {
            return __awaiter(this, arguments, void 0, function* (collectionId, queryParams = {}, headers = new GetCollectionItemsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['offset']: toString(queryParams.offset),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collections/', toString(collectionId), '/items'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeItems(response.data);
            });
        }
    }

    class GetRecentItemsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class RecentItemsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getRecentItems() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetRecentItemsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['limit']: toString(queryParams.limit),
                    ['marker']: toString(queryParams.marker),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/recent_items'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeRecentItems(response.data);
            });
        }
    }

    class GetRetentionPoliciesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateRetentionPolicyHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetRetentionPolicyByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateRetentionPolicyByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteRetentionPolicyByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class RetentionPoliciesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getRetentionPolicies() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetRetentionPoliciesHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['policy_name']: toString(queryParams.policyName),
                    ['policy_type']: toString(queryParams.policyType),
                    ['created_by_user_id']: toString(queryParams.createdByUserId),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['limit']: toString(queryParams.limit),
                    ['marker']: toString(queryParams.marker),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policies'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeRetentionPolicies(response.data);
            });
        }
        createRetentionPolicy(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateRetentionPolicyHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policies'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateRetentionPolicyRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeRetentionPolicy(response.data);
            });
        }
        getRetentionPolicyById(retentionPolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (retentionPolicyId, queryParams = {}, headers = new GetRetentionPolicyByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policies/', toString(retentionPolicyId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeRetentionPolicy(response.data);
            });
        }
        updateRetentionPolicyById(retentionPolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (retentionPolicyId, requestBody = {}, headers = new UpdateRetentionPolicyByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policies/', toString(retentionPolicyId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateRetentionPolicyByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeRetentionPolicy(response.data);
            });
        }
        deleteRetentionPolicyById(retentionPolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (retentionPolicyId, headers = new DeleteRetentionPolicyByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policies/', toString(retentionPolicyId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateRetentionPolicyRequestBodyPolicyTypeField(val) {
        return val;
    }
    function serializeCreateRetentionPolicyRequestBodyDispositionActionField(val) {
        return val;
    }
    function serializeCreateRetentionPolicyRequestBodyRetentionTypeField(val) {
        return val;
    }
    function serializeCreateRetentionPolicyRequestBody(val) {
        return {
            ['policy_name']: val.policyName,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['policy_type']: serializeCreateRetentionPolicyRequestBodyPolicyTypeField(val.policyType),
            ['disposition_action']: serializeCreateRetentionPolicyRequestBodyDispositionActionField(val.dispositionAction),
            ['retention_length']: val.retentionLength == void 0 ? void 0 : val.retentionLength,
            ['retention_type']: val.retentionType == void 0
                ? void 0
                : serializeCreateRetentionPolicyRequestBodyRetentionTypeField(val.retentionType),
            ['can_owner_extend_retention']: val.canOwnerExtendRetention == void 0
                ? void 0
                : val.canOwnerExtendRetention,
            ['are_owners_notified']: val.areOwnersNotified == void 0 ? void 0 : val.areOwnersNotified,
            ['custom_notification_recipients']: val.customNotificationRecipients == void 0
                ? void 0
                : val.customNotificationRecipients.map(function (item) {
                    return serializeUserMini(item);
                }),
        };
    }
    function serializeUpdateRetentionPolicyByIdRequestBody(val) {
        return {
            ['policy_name']: val.policyName == void 0 ? void 0 : val.policyName,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['disposition_action']: val.dispositionAction == void 0 ? void 0 : val.dispositionAction,
            ['retention_type']: val.retentionType == void 0 ? void 0 : val.retentionType,
            ['retention_length']: val.retentionLength == void 0 ? void 0 : val.retentionLength,
            ['status']: val.status == void 0 ? void 0 : val.status,
            ['can_owner_extend_retention']: val.canOwnerExtendRetention == void 0
                ? void 0
                : val.canOwnerExtendRetention,
            ['are_owners_notified']: val.areOwnersNotified == void 0 ? void 0 : val.areOwnersNotified,
            ['custom_notification_recipients']: val.customNotificationRecipients == void 0
                ? void 0
                : val.customNotificationRecipients.map(function (item) {
                    return serializeUserBase(item);
                }),
        };
    }

    class GetRetentionPolicyAssignmentsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateRetentionPolicyAssignmentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetRetentionPolicyAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteRetentionPolicyAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFilesUnderRetentionPolicyAssignmentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFileVersionsUnderRetentionPolicyAssignmentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class RetentionPolicyAssignmentsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getRetentionPolicyAssignments(retentionPolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (retentionPolicyId, queryParams = {}, headers = new GetRetentionPolicyAssignmentsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['type']: toString(queryParams.type),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policies/', toString(retentionPolicyId), '/assignments'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeRetentionPolicyAssignments(response.data);
            });
        }
        createRetentionPolicyAssignment(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateRetentionPolicyAssignmentHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policy_assignments'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateRetentionPolicyAssignmentRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeRetentionPolicyAssignment(response.data);
            });
        }
        getRetentionPolicyAssignmentById(retentionPolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (retentionPolicyAssignmentId, queryParams = {}, headers = new GetRetentionPolicyAssignmentByIdHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policy_assignments/', toString(retentionPolicyAssignmentId)), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeRetentionPolicyAssignment(response.data);
            });
        }
        deleteRetentionPolicyAssignmentById(retentionPolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (retentionPolicyAssignmentId, headers = new DeleteRetentionPolicyAssignmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policy_assignments/', toString(retentionPolicyAssignmentId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getFilesUnderRetentionPolicyAssignment(retentionPolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (retentionPolicyAssignmentId, queryParams = {}, headers = new GetFilesUnderRetentionPolicyAssignmentHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policy_assignments/', toString(retentionPolicyAssignmentId), '/files_under_retention'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFilesUnderRetention(response.data);
            });
        }
        getFileVersionsUnderRetentionPolicyAssignment(retentionPolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (retentionPolicyAssignmentId, queryParams = {}, headers = new GetFileVersionsUnderRetentionPolicyAssignmentHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/retention_policy_assignments/', toString(retentionPolicyAssignmentId), '/file_versions_under_retention'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFilesUnderRetention(response.data);
            });
        }
    }
    function serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField(val) {
        return val;
    }
    function serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField(val) {
        return {
            ['type']: serializeCreateRetentionPolicyAssignmentRequestBodyAssignToTypeField(val.type),
            ['id']: val.id == void 0 ? void 0 : val.id,
        };
    }
    function serializeCreateRetentionPolicyAssignmentRequestBodyFilterFieldsField(val) {
        return {
            ['field']: val.field == void 0 ? void 0 : val.field,
            ['value']: val.value == void 0 ? void 0 : val.value,
        };
    }
    function serializeCreateRetentionPolicyAssignmentRequestBody(val) {
        return {
            ['policy_id']: val.policyId,
            ['assign_to']: serializeCreateRetentionPolicyAssignmentRequestBodyAssignToField(val.assignTo),
            ['filter_fields']: val.filterFields == void 0
                ? void 0
                : val.filterFields.map(function (item) {
                    return serializeCreateRetentionPolicyAssignmentRequestBodyFilterFieldsField(item);
                }),
            ['start_date_field']: val.startDateField == void 0 ? void 0 : val.startDateField,
        };
    }

    class GetLegalHoldPoliciesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateLegalHoldPolicyHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetLegalHoldPolicyByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateLegalHoldPolicyByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteLegalHoldPolicyByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class LegalHoldPoliciesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getLegalHoldPolicies() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetLegalHoldPoliciesHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['policy_name']: toString(queryParams.policyName),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policies'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeLegalHoldPolicies(response.data);
            });
        }
        createLegalHoldPolicy(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateLegalHoldPolicyHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policies'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateLegalHoldPolicyRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeLegalHoldPolicy(response.data);
            });
        }
        getLegalHoldPolicyById(legalHoldPolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (legalHoldPolicyId, headers = new GetLegalHoldPolicyByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policies/', toString(legalHoldPolicyId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeLegalHoldPolicy(response.data);
            });
        }
        updateLegalHoldPolicyById(legalHoldPolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (legalHoldPolicyId, requestBody = {}, headers = new UpdateLegalHoldPolicyByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policies/', toString(legalHoldPolicyId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateLegalHoldPolicyByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeLegalHoldPolicy(response.data);
            });
        }
        deleteLegalHoldPolicyById(legalHoldPolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (legalHoldPolicyId, headers = new DeleteLegalHoldPolicyByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policies/', toString(legalHoldPolicyId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateLegalHoldPolicyRequestBody(val) {
        return {
            ['policy_name']: val.policyName,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['filter_started_at']: val.filterStartedAt == void 0 ? void 0 : val.filterStartedAt,
            ['filter_ended_at']: val.filterEndedAt == void 0 ? void 0 : val.filterEndedAt,
            ['is_ongoing']: val.isOngoing == void 0 ? void 0 : val.isOngoing,
        };
    }
    function serializeUpdateLegalHoldPolicyByIdRequestBody(val) {
        return {
            ['policy_name']: val.policyName == void 0 ? void 0 : val.policyName,
            ['description']: val.description == void 0 ? void 0 : val.description,
            ['release_notes']: val.releaseNotes == void 0 ? void 0 : val.releaseNotes,
        };
    }

    class GetLegalHoldPolicyAssignmentsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateLegalHoldPolicyAssignmentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetLegalHoldPolicyAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteLegalHoldPolicyAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetLegalHoldPolicyAssignmentFileOnHoldHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetLegalHoldPolicyAssignmentFileVersionOnHoldHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class LegalHoldPolicyAssignmentsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getLegalHoldPolicyAssignments(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetLegalHoldPolicyAssignmentsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['policy_id']: toString(queryParams.policyId),
                    ['assign_to_type']: toString(queryParams.assignToType),
                    ['assign_to_id']: toString(queryParams.assignToId),
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policy_assignments'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeLegalHoldPolicyAssignments(response.data);
            });
        }
        createLegalHoldPolicyAssignment(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateLegalHoldPolicyAssignmentHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policy_assignments'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateLegalHoldPolicyAssignmentRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeLegalHoldPolicyAssignment(response.data);
            });
        }
        getLegalHoldPolicyAssignmentById(legalHoldPolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (legalHoldPolicyAssignmentId, headers = new GetLegalHoldPolicyAssignmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policy_assignments/', toString(legalHoldPolicyAssignmentId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeLegalHoldPolicyAssignment(response.data);
            });
        }
        deleteLegalHoldPolicyAssignmentById(legalHoldPolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (legalHoldPolicyAssignmentId, headers = new DeleteLegalHoldPolicyAssignmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policy_assignments/', toString(legalHoldPolicyAssignmentId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getLegalHoldPolicyAssignmentFileOnHold(legalHoldPolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (legalHoldPolicyAssignmentId, queryParams = {}, headers = new GetLegalHoldPolicyAssignmentFileOnHoldHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policy_assignments/', toString(legalHoldPolicyAssignmentId), '/files_on_hold'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersionLegalHolds(response.data);
            });
        }
        getLegalHoldPolicyAssignmentFileVersionOnHold(legalHoldPolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (legalHoldPolicyAssignmentId, queryParams = {}, headers = new GetLegalHoldPolicyAssignmentFileVersionOnHoldHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/legal_hold_policy_assignments/', toString(legalHoldPolicyAssignmentId), '/file_versions_on_hold'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersionLegalHolds(response.data);
            });
        }
    }
    function serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField(val) {
        return val;
    }
    function serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToField(val) {
        return {
            ['type']: serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeCreateLegalHoldPolicyAssignmentRequestBody(val) {
        return {
            ['policy_id']: val.policyId,
            ['assign_to']: serializeCreateLegalHoldPolicyAssignmentRequestBodyAssignToField(val.assignTo),
        };
    }

    class GetFileVersionRetentionsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFileVersionRetentionByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FileVersionRetentionsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileVersionRetentions() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetFileVersionRetentionsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['file_id']: toString(queryParams.fileId),
                    ['file_version_id']: toString(queryParams.fileVersionId),
                    ['policy_id']: toString(queryParams.policyId),
                    ['disposition_action']: toString(queryParams.dispositionAction),
                    ['disposition_before']: toString(queryParams.dispositionBefore),
                    ['disposition_after']: toString(queryParams.dispositionAfter),
                    ['limit']: toString(queryParams.limit),
                    ['marker']: toString(queryParams.marker),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/file_version_retentions'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersionRetentions(response.data);
            });
        }
        getFileVersionRetentionById(fileVersionRetentionId_1) {
            return __awaiter(this, arguments, void 0, function* (fileVersionRetentionId, headers = new GetFileVersionRetentionByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/file_version_retentions/', toString(fileVersionRetentionId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersionRetention(response.data);
            });
        }
    }

    class GetFileVersionLegalHoldByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetFileVersionLegalHoldsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class FileVersionLegalHoldsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getFileVersionLegalHoldById(fileVersionLegalHoldId_1) {
            return __awaiter(this, arguments, void 0, function* (fileVersionLegalHoldId, headers = new GetFileVersionLegalHoldByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/file_version_legal_holds/', toString(fileVersionLegalHoldId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersionLegalHold(response.data);
            });
        }
        getFileVersionLegalHolds(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetFileVersionLegalHoldsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['policy_id']: toString(queryParams.policyId),
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/file_version_legal_holds'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeFileVersionLegalHolds(response.data);
            });
        }
    }

    class GetShieldInformationBarrierByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateShieldInformationBarrierStatusHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetShieldInformationBarriersHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateShieldInformationBarrierHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ShieldInformationBarriersManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getShieldInformationBarrierById(shieldInformationBarrierId_1) {
            return __awaiter(this, arguments, void 0, function* (shieldInformationBarrierId, headers = new GetShieldInformationBarrierByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barriers/', toString(shieldInformationBarrierId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrier(response.data);
            });
        }
        updateShieldInformationBarrierStatus(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new UpdateShieldInformationBarrierStatusHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barriers/change_status'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeUpdateShieldInformationBarrierStatusRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrier(response.data);
            });
        }
        getShieldInformationBarriers() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetShieldInformationBarriersHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barriers'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarriers(response.data);
            });
        }
        createShieldInformationBarrier(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateShieldInformationBarrierHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barriers'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateShieldInformationBarrierRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrier(response.data);
            });
        }
    }
    function serializeUpdateShieldInformationBarrierStatusRequestBodyStatusField(val) {
        return val;
    }
    function serializeUpdateShieldInformationBarrierStatusRequestBody(val) {
        return {
            ['id']: val.id,
            ['status']: serializeUpdateShieldInformationBarrierStatusRequestBodyStatusField(val.status),
        };
    }
    function serializeCreateShieldInformationBarrierRequestBody(val) {
        return { ['enterprise']: serializeEnterpriseBase(val.enterprise) };
    }

    class GetShieldInformationBarrierReportsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateShieldInformationBarrierReportHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetShieldInformationBarrierReportByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ShieldInformationBarrierReportsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getShieldInformationBarrierReports(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetShieldInformationBarrierReportsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['shield_information_barrier_id']: toString(queryParams.shieldInformationBarrierId),
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_reports'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierReports(response.data);
            });
        }
        createShieldInformationBarrierReport(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateShieldInformationBarrierReportHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_reports'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeShieldInformationBarrierReference(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierReport(response.data);
            });
        }
        getShieldInformationBarrierReportById(shieldInformationBarrierReportId_1) {
            return __awaiter(this, arguments, void 0, function* (shieldInformationBarrierReportId, headers = new GetShieldInformationBarrierReportByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_reports/', toString(shieldInformationBarrierReportId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierReport(response.data);
            });
        }
    }

    class GetShieldInformationBarrierSegmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateShieldInformationBarrierSegmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteShieldInformationBarrierSegmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetShieldInformationBarrierSegmentsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateShieldInformationBarrierSegmentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ShieldInformationBarrierSegmentsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getShieldInformationBarrierSegmentById(shieldInformationBarrierSegmentId_1) {
            return __awaiter(this, arguments, void 0, function* (shieldInformationBarrierSegmentId, headers = new GetShieldInformationBarrierSegmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segments/', toString(shieldInformationBarrierSegmentId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegment(response.data);
            });
        }
        updateShieldInformationBarrierSegmentById(shieldInformationBarrierSegmentId_1) {
            return __awaiter(this, arguments, void 0, function* (shieldInformationBarrierSegmentId, requestBody = {}, headers = new UpdateShieldInformationBarrierSegmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segments/', toString(shieldInformationBarrierSegmentId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateShieldInformationBarrierSegmentByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegment(response.data);
            });
        }
        deleteShieldInformationBarrierSegmentById(shieldInformationBarrierSegmentId_1) {
            return __awaiter(this, arguments, void 0, function* (shieldInformationBarrierSegmentId, headers = new DeleteShieldInformationBarrierSegmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segments/', toString(shieldInformationBarrierSegmentId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getShieldInformationBarrierSegments(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetShieldInformationBarrierSegmentsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['shield_information_barrier_id']: toString(queryParams.shieldInformationBarrierId),
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segments'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegments(response.data);
            });
        }
        createShieldInformationBarrierSegment(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateShieldInformationBarrierSegmentHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segments'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateShieldInformationBarrierSegmentRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegment(response.data);
            });
        }
    }
    function serializeUpdateShieldInformationBarrierSegmentByIdRequestBody(val) {
        return {
            ['name']: val.name == void 0 ? void 0 : val.name,
            ['description']: val.description == void 0 ? void 0 : val.description,
        };
    }
    function serializeCreateShieldInformationBarrierSegmentRequestBody(val) {
        return {
            ['shield_information_barrier']: serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
            ['name']: val.name,
            ['description']: val.description == void 0 ? void 0 : val.description,
        };
    }

    class GetShieldInformationBarrierSegmentMemberByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteShieldInformationBarrierSegmentMemberByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetShieldInformationBarrierSegmentMembersHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateShieldInformationBarrierSegmentMemberHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ShieldInformationBarrierSegmentMembersManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getShieldInformationBarrierSegmentMemberById(shieldInformationBarrierSegmentMemberId_1) {
            return __awaiter(this, arguments, void 0, function* (shieldInformationBarrierSegmentMemberId, headers = new GetShieldInformationBarrierSegmentMemberByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segment_members/', toString(shieldInformationBarrierSegmentMemberId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegmentMember(response.data);
            });
        }
        deleteShieldInformationBarrierSegmentMemberById(shieldInformationBarrierSegmentMemberId_1) {
            return __awaiter(this, arguments, void 0, function* (shieldInformationBarrierSegmentMemberId, headers = new DeleteShieldInformationBarrierSegmentMemberByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segment_members/', toString(shieldInformationBarrierSegmentMemberId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getShieldInformationBarrierSegmentMembers(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetShieldInformationBarrierSegmentMembersHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['shield_information_barrier_segment_id']: toString(queryParams.shieldInformationBarrierSegmentId),
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segment_members'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegmentMembers(response.data);
            });
        }
        createShieldInformationBarrierSegmentMember(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateShieldInformationBarrierSegmentMemberHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segment_members'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateShieldInformationBarrierSegmentMemberRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegmentMember(response.data);
            });
        }
    }
    function serializeCreateShieldInformationBarrierSegmentMemberRequestBodyTypeField(val) {
        return val;
    }
    function serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField(val) {
        return val;
    }
    function serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0
                ? void 0
                : serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentTypeField(val.type),
        };
    }
    function serializeCreateShieldInformationBarrierSegmentMemberRequestBody(val) {
        return {
            ['type']: val.type == void 0
                ? void 0
                : serializeCreateShieldInformationBarrierSegmentMemberRequestBodyTypeField(val.type),
            ['shield_information_barrier']: val.shieldInformationBarrier == void 0
                ? void 0
                : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
            ['shield_information_barrier_segment']: serializeCreateShieldInformationBarrierSegmentMemberRequestBodyShieldInformationBarrierSegmentField(val.shieldInformationBarrierSegment),
            ['user']: serializeUserBase(val.user),
        };
    }

    class GetShieldInformationBarrierSegmentRestrictionByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteShieldInformationBarrierSegmentRestrictionByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetShieldInformationBarrierSegmentRestrictionsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateShieldInformationBarrierSegmentRestrictionHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ShieldInformationBarrierSegmentRestrictionsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getShieldInformationBarrierSegmentRestrictionById(shieldInformationBarrierSegmentRestrictionId_1) {
            return __awaiter(this, arguments, void 0, function* (shieldInformationBarrierSegmentRestrictionId, headers = new GetShieldInformationBarrierSegmentRestrictionByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segment_restrictions/', toString(shieldInformationBarrierSegmentRestrictionId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegmentRestriction(response.data);
            });
        }
        deleteShieldInformationBarrierSegmentRestrictionById(shieldInformationBarrierSegmentRestrictionId_1) {
            return __awaiter(this, arguments, void 0, function* (shieldInformationBarrierSegmentRestrictionId, headers = new DeleteShieldInformationBarrierSegmentRestrictionByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segment_restrictions/', toString(shieldInformationBarrierSegmentRestrictionId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getShieldInformationBarrierSegmentRestrictions(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetShieldInformationBarrierSegmentRestrictionsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['shield_information_barrier_segment_id']: toString(queryParams.shieldInformationBarrierSegmentId),
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segment_restrictions'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegmentRestrictions(response.data);
            });
        }
        createShieldInformationBarrierSegmentRestriction(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateShieldInformationBarrierSegmentRestrictionHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/shield_information_barrier_segment_restrictions'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateShieldInformationBarrierSegmentRestrictionRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeShieldInformationBarrierSegmentRestriction(response.data);
            });
        }
    }
    function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField(val) {
        return val;
    }
    function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField(val) {
        return val;
    }
    function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0
                ? void 0
                : serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentTypeField(val.type),
        };
    }
    function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField(val) {
        return val;
    }
    function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField(val) {
        return {
            ['id']: val.id == void 0 ? void 0 : val.id,
            ['type']: val.type == void 0
                ? void 0
                : serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentTypeField(val.type),
        };
    }
    function serializeCreateShieldInformationBarrierSegmentRestrictionRequestBody(val) {
        return {
            ['type']: serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyTypeField(val.type),
            ['shield_information_barrier']: val.shieldInformationBarrier == void 0
                ? void 0
                : serializeShieldInformationBarrierBase(val.shieldInformationBarrier),
            ['shield_information_barrier_segment']: serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyShieldInformationBarrierSegmentField(val.shieldInformationBarrierSegment),
            ['restricted_segment']: serializeCreateShieldInformationBarrierSegmentRestrictionRequestBodyRestrictedSegmentField(val.restrictedSegment),
        };
    }

    class GetDevicePinnerByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteDevicePinnerByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetEnterpriseDevicePinnersHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DevicePinnersManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getDevicePinnerById(devicePinnerId_1) {
            return __awaiter(this, arguments, void 0, function* (devicePinnerId, headers = new GetDevicePinnerByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/device_pinners/', toString(devicePinnerId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeDevicePinner(response.data);
            });
        }
        deleteDevicePinnerById(devicePinnerId_1) {
            return __awaiter(this, arguments, void 0, function* (devicePinnerId, headers = new DeleteDevicePinnerByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/device_pinners/', toString(devicePinnerId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getEnterpriseDevicePinners(enterpriseId_1) {
            return __awaiter(this, arguments, void 0, function* (enterpriseId, queryParams = {}, headers = new GetEnterpriseDevicePinnersHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                    ['direction']: toString(queryParams.direction),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/enterprises/', toString(enterpriseId), '/device_pinners'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeDevicePinners(response.data);
            });
        }
    }

    class GetTermsOfServiceHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateTermsOfServiceHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetTermsOfServiceByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateTermsOfServiceByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TermsOfServicesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getTermsOfService() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetTermsOfServiceHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['tos_type']: toString(queryParams.tosType),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/terms_of_services'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTermsOfServices(response.data);
            });
        }
        createTermsOfService(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateTermsOfServiceHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/terms_of_services'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateTermsOfServiceRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTermsOfService(response.data);
            });
        }
        getTermsOfServiceById(termsOfServiceId_1) {
            return __awaiter(this, arguments, void 0, function* (termsOfServiceId, headers = new GetTermsOfServiceByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/terms_of_services/', toString(termsOfServiceId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTermsOfService(response.data);
            });
        }
        updateTermsOfServiceById(termsOfServiceId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (termsOfServiceId, requestBody, headers = new UpdateTermsOfServiceByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/terms_of_services/', toString(termsOfServiceId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateTermsOfServiceByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTermsOfService(response.data);
            });
        }
    }
    function serializeCreateTermsOfServiceRequestBodyStatusField(val) {
        return val;
    }
    function serializeCreateTermsOfServiceRequestBodyTosTypeField(val) {
        return val;
    }
    function serializeCreateTermsOfServiceRequestBody(val) {
        return {
            ['status']: serializeCreateTermsOfServiceRequestBodyStatusField(val.status),
            ['tos_type']: val.tosType == void 0
                ? void 0
                : serializeCreateTermsOfServiceRequestBodyTosTypeField(val.tosType),
            ['text']: val.text,
        };
    }
    function serializeUpdateTermsOfServiceByIdRequestBodyStatusField(val) {
        return val;
    }
    function serializeUpdateTermsOfServiceByIdRequestBody(val) {
        return {
            ['status']: serializeUpdateTermsOfServiceByIdRequestBodyStatusField(val.status),
            ['text']: val.text,
        };
    }

    class GetTermsOfServiceUserStatusesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateTermsOfServiceStatusForUserHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateTermsOfServiceStatusForUserByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class TermsOfServiceUserStatusesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getTermsOfServiceUserStatuses(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetTermsOfServiceUserStatusesHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['tos_id']: toString(queryParams.tosId),
                    ['user_id']: toString(queryParams.userId),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/terms_of_service_user_statuses'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTermsOfServiceUserStatuses(response.data);
            });
        }
        createTermsOfServiceStatusForUser(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateTermsOfServiceStatusForUserHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/terms_of_service_user_statuses'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateTermsOfServiceStatusForUserRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTermsOfServiceUserStatus(response.data);
            });
        }
        updateTermsOfServiceStatusForUserById(termsOfServiceUserStatusId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (termsOfServiceUserStatusId, requestBody, headers = new UpdateTermsOfServiceStatusForUserByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/terms_of_service_user_statuses/', toString(termsOfServiceUserStatusId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateTermsOfServiceStatusForUserByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeTermsOfServiceUserStatus(response.data);
            });
        }
    }
    function serializeCreateTermsOfServiceStatusForUserRequestBodyTosTypeField(val) {
        return val;
    }
    function serializeCreateTermsOfServiceStatusForUserRequestBodyTosField(val) {
        return {
            ['type']: serializeCreateTermsOfServiceStatusForUserRequestBodyTosTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeCreateTermsOfServiceStatusForUserRequestBodyUserTypeField(val) {
        return val;
    }
    function serializeCreateTermsOfServiceStatusForUserRequestBodyUserField(val) {
        return {
            ['type']: serializeCreateTermsOfServiceStatusForUserRequestBodyUserTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeCreateTermsOfServiceStatusForUserRequestBody(val) {
        return {
            ['tos']: serializeCreateTermsOfServiceStatusForUserRequestBodyTosField(val.tos),
            ['user']: serializeCreateTermsOfServiceStatusForUserRequestBodyUserField(val.user),
            ['is_accepted']: val.isAccepted,
        };
    }
    function serializeUpdateTermsOfServiceStatusForUserByIdRequestBody(val) {
        return { ['is_accepted']: val.isAccepted };
    }

    class GetCollaborationWhitelistEntriesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateCollaborationWhitelistEntryHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetCollaborationWhitelistEntryByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteCollaborationWhitelistEntryByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CollaborationAllowlistEntriesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getCollaborationWhitelistEntries() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetCollaborationWhitelistEntriesHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaboration_whitelist_entries'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborationAllowlistEntries(response.data);
            });
        }
        createCollaborationWhitelistEntry(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateCollaborationWhitelistEntryHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaboration_whitelist_entries'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateCollaborationWhitelistEntryRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborationAllowlistEntry(response.data);
            });
        }
        getCollaborationWhitelistEntryById(collaborationWhitelistEntryId_1) {
            return __awaiter(this, arguments, void 0, function* (collaborationWhitelistEntryId, headers = new GetCollaborationWhitelistEntryByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaboration_whitelist_entries/', toString(collaborationWhitelistEntryId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborationAllowlistEntry(response.data);
            });
        }
        deleteCollaborationWhitelistEntryById(collaborationWhitelistEntryId_1) {
            return __awaiter(this, arguments, void 0, function* (collaborationWhitelistEntryId, headers = new DeleteCollaborationWhitelistEntryByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaboration_whitelist_entries/', toString(collaborationWhitelistEntryId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateCollaborationWhitelistEntryRequestBodyDirectionField(val) {
        return val;
    }
    function serializeCreateCollaborationWhitelistEntryRequestBody(val) {
        return {
            ['domain']: val.domain,
            ['direction']: serializeCreateCollaborationWhitelistEntryRequestBodyDirectionField(val.direction),
        };
    }

    class GetCollaborationWhitelistExemptTargetsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateCollaborationWhitelistExemptTargetHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetCollaborationWhitelistExemptTargetByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteCollaborationWhitelistExemptTargetByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CollaborationAllowlistExemptTargetsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getCollaborationWhitelistExemptTargets() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetCollaborationWhitelistExemptTargetsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaboration_whitelist_exempt_targets'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborationAllowlistExemptTargets(response.data);
            });
        }
        createCollaborationWhitelistExemptTarget(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateCollaborationWhitelistExemptTargetHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaboration_whitelist_exempt_targets'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateCollaborationWhitelistExemptTargetRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborationAllowlistExemptTarget(response.data);
            });
        }
        getCollaborationWhitelistExemptTargetById(collaborationWhitelistExemptTargetId_1) {
            return __awaiter(this, arguments, void 0, function* (collaborationWhitelistExemptTargetId, headers = new GetCollaborationWhitelistExemptTargetByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaboration_whitelist_exempt_targets/', toString(collaborationWhitelistExemptTargetId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeCollaborationAllowlistExemptTarget(response.data);
            });
        }
        deleteCollaborationWhitelistExemptTargetById(collaborationWhitelistExemptTargetId_1) {
            return __awaiter(this, arguments, void 0, function* (collaborationWhitelistExemptTargetId, headers = new DeleteCollaborationWhitelistExemptTargetByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/collaboration_whitelist_exempt_targets/', toString(collaborationWhitelistExemptTargetId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField(val) {
        return { ['id']: val.id };
    }
    function serializeCreateCollaborationWhitelistExemptTargetRequestBody(val) {
        return {
            ['user']: serializeCreateCollaborationWhitelistExemptTargetRequestBodyUserField(val.user),
        };
    }

    class GetStoragePoliciesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetStoragePolicyByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class StoragePoliciesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getStoragePolicies() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetStoragePoliciesHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['fields']: queryParams.fields
                        ? queryParams.fields.map(toString).join(',')
                        : undefined,
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/storage_policies'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeStoragePolicies(response.data);
            });
        }
        getStoragePolicyById(storagePolicyId_1) {
            return __awaiter(this, arguments, void 0, function* (storagePolicyId, headers = new GetStoragePolicyByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/storage_policies/', toString(storagePolicyId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeStoragePolicy(response.data);
            });
        }
    }

    class GetStoragePolicyAssignmentsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateStoragePolicyAssignmentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetStoragePolicyAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateStoragePolicyAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteStoragePolicyAssignmentByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class StoragePolicyAssignmentsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getStoragePolicyAssignments(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetStoragePolicyAssignmentsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['resolved_for_type']: toString(queryParams.resolvedForType),
                    ['resolved_for_id']: toString(queryParams.resolvedForId),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/storage_policy_assignments'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeStoragePolicyAssignments(response.data);
            });
        }
        createStoragePolicyAssignment(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateStoragePolicyAssignmentHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/storage_policy_assignments'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeCreateStoragePolicyAssignmentRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeStoragePolicyAssignment(response.data);
            });
        }
        getStoragePolicyAssignmentById(storagePolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (storagePolicyAssignmentId, headers = new GetStoragePolicyAssignmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/storage_policy_assignments/', toString(storagePolicyAssignmentId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeStoragePolicyAssignment(response.data);
            });
        }
        updateStoragePolicyAssignmentById(storagePolicyAssignmentId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (storagePolicyAssignmentId, requestBody, headers = new UpdateStoragePolicyAssignmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/storage_policy_assignments/', toString(storagePolicyAssignmentId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateStoragePolicyAssignmentByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeStoragePolicyAssignment(response.data);
            });
        }
        deleteStoragePolicyAssignmentById(storagePolicyAssignmentId_1) {
            return __awaiter(this, arguments, void 0, function* (storagePolicyAssignmentId, headers = new DeleteStoragePolicyAssignmentByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/storage_policy_assignments/', toString(storagePolicyAssignmentId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField(val) {
        return val;
    }
    function serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField(val) {
        return {
            ['type']: serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField(val) {
        return val;
    }
    function serializeCreateStoragePolicyAssignmentRequestBodyAssignedToField(val) {
        return {
            ['type']: serializeCreateStoragePolicyAssignmentRequestBodyAssignedToTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeCreateStoragePolicyAssignmentRequestBody(val) {
        return {
            ['storage_policy']: serializeCreateStoragePolicyAssignmentRequestBodyStoragePolicyField(val.storagePolicy),
            ['assigned_to']: serializeCreateStoragePolicyAssignmentRequestBodyAssignedToField(val.assignedTo),
        };
    }
    function serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField(val) {
        return val;
    }
    function serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField(val) {
        return {
            ['type']: serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyTypeField(val.type),
            ['id']: val.id,
        };
    }
    function serializeUpdateStoragePolicyAssignmentByIdRequestBody(val) {
        return {
            ['storage_policy']: serializeUpdateStoragePolicyAssignmentByIdRequestBodyStoragePolicyField(val.storagePolicy),
        };
    }

    class CreateZipDownloadHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetZipDownloadContentHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetZipDownloadStatusHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DownloadZipHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ZipDownloadsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        createZipDownload(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateZipDownloadHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/zip_downloads'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeZipDownloadRequest(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeZipDownload(response.data);
            });
        }
        getZipDownloadContent(downloadUrl_1) {
            return __awaiter(this, arguments, void 0, function* (downloadUrl, headers = new GetZipDownloadContentHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(downloadUrl, {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'binary',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return response.content;
            });
        }
        getZipDownloadStatus(statusUrl_1) {
            return __awaiter(this, arguments, void 0, function* (statusUrl, headers = new GetZipDownloadStatusHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(statusUrl, {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeZipDownloadStatus(response.data);
            });
        }
        downloadZip(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new DownloadZipHeaders({}), cancellationToken) {
                const zipDownloadSession = yield this.createZipDownload({
                    items: requestBody.items,
                    downloadFileName: requestBody.downloadFileName,
                }, new CreateZipDownloadHeaders({ extraHeaders: headers.extraHeaders }), cancellationToken);
                return yield this.getZipDownloadContent(zipDownloadSession.downloadUrl, new GetZipDownloadContentHeaders({ extraHeaders: headers.extraHeaders }), cancellationToken);
            });
        }
    }

    class CancelSignRequestHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class ResendSignRequestHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetSignRequestByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetSignRequestsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateSignRequestHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class SignRequestsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        cancelSignRequest(signRequestId_1) {
            return __awaiter(this, arguments, void 0, function* (signRequestId, headers = new CancelSignRequestHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/sign_requests/', toString(signRequestId), '/cancel'), {
                    method: 'POST',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSignRequest(response.data);
            });
        }
        resendSignRequest(signRequestId_1) {
            return __awaiter(this, arguments, void 0, function* (signRequestId, headers = new ResendSignRequestHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/sign_requests/', toString(signRequestId), '/resend'), {
                    method: 'POST',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
        getSignRequestById(signRequestId_1) {
            return __awaiter(this, arguments, void 0, function* (signRequestId, headers = new GetSignRequestByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/sign_requests/', toString(signRequestId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSignRequest(response.data);
            });
        }
        getSignRequests() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetSignRequestsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/sign_requests'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSignRequests(response.data);
            });
        }
        createSignRequest(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateSignRequestHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/sign_requests'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeSignRequestCreateRequest(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSignRequest(response.data);
            });
        }
    }

    class GetWorkflowsHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class StartWorkflowHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class WorkflowsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getWorkflows(queryParams_1) {
            return __awaiter(this, arguments, void 0, function* (queryParams, headers = new GetWorkflowsHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['folder_id']: toString(queryParams.folderId),
                    ['trigger_type']: toString(queryParams.triggerType),
                    ['limit']: toString(queryParams.limit),
                    ['marker']: toString(queryParams.marker),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/workflows'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeWorkflows(response.data);
            });
        }
        startWorkflow(workflowId_1, requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (workflowId, requestBody, headers = new StartWorkflowHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/workflows/', toString(workflowId), '/start'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeStartWorkflowRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeStartWorkflowRequestBodyTypeField(val) {
        return val;
    }
    function serializeStartWorkflowRequestBodyFlowField(val) {
        return {
            ['type']: val.type == void 0 ? void 0 : val.type,
            ['id']: val.id == void 0 ? void 0 : val.id,
        };
    }
    function serializeStartWorkflowRequestBodyFilesTypeField(val) {
        return val;
    }
    function serializeStartWorkflowRequestBodyFilesField(val) {
        return {
            ['type']: val.type == void 0
                ? void 0
                : serializeStartWorkflowRequestBodyFilesTypeField(val.type),
            ['id']: val.id == void 0 ? void 0 : val.id,
        };
    }
    function serializeStartWorkflowRequestBodyFolderTypeField(val) {
        return val;
    }
    function serializeStartWorkflowRequestBodyFolderField(val) {
        return {
            ['type']: val.type == void 0
                ? void 0
                : serializeStartWorkflowRequestBodyFolderTypeField(val.type),
            ['id']: val.id == void 0 ? void 0 : val.id,
        };
    }
    function serializeStartWorkflowRequestBody(val) {
        return {
            ['type']: val.type == void 0
                ? void 0
                : serializeStartWorkflowRequestBodyTypeField(val.type),
            ['flow']: serializeStartWorkflowRequestBodyFlowField(val.flow),
            ['files']: val.files.map(function (item) {
                return serializeStartWorkflowRequestBodyFilesField(item);
            }),
            ['folder']: serializeStartWorkflowRequestBodyFolderField(val.folder),
            ['outcomes']: val.outcomes == void 0
                ? void 0
                : val.outcomes.map(function (item) {
                    return serializeOutcome(item);
                }),
        };
    }

    class GetSignTemplatesHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class GetSignTemplateByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class SignTemplatesManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getSignTemplates() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetSignTemplatesHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/sign_templates'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSignTemplates(response.data);
            });
        }
        getSignTemplateById(templateId_1) {
            return __awaiter(this, arguments, void 0, function* (templateId, headers = new GetSignTemplateByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/sign_templates/', toString(templateId)), {
                    method: 'GET',
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeSignTemplate(response.data);
            });
        }
    }

    class GetSlackIntegrationMappingHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class CreateSlackIntegrationMappingHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class UpdateSlackIntegrationMappingByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class DeleteSlackIntegrationMappingByIdHeaders {
        constructor(fields) {
            this.extraHeaders = {};
            Object.assign(this, fields);
        }
    }
    class IntegrationMappingsManager {
        constructor(fields) {
            this.networkSession = new NetworkSession({});
            Object.assign(this, fields);
        }
        getSlackIntegrationMapping() {
            return __awaiter(this, arguments, void 0, function* (queryParams = {}, headers = new GetSlackIntegrationMappingHeaders({}), cancellationToken) {
                const queryParamsMap = prepareParams({
                    ['marker']: toString(queryParams.marker),
                    ['limit']: toString(queryParams.limit),
                    ['partner_item_type']: toString(queryParams.partnerItemType),
                    ['partner_item_id']: toString(queryParams.partnerItemId),
                    ['box_item_id']: toString(queryParams.boxItemId),
                    ['box_item_type']: toString(queryParams.boxItemType),
                    ['is_manually_created']: toString(queryParams.isManuallyCreated),
                });
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/integration_mappings/slack'), {
                    method: 'GET',
                    params: queryParamsMap,
                    headers: headersMap,
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeIntegrationMappings(response.data);
            });
        }
        createSlackIntegrationMapping(requestBody_1) {
            return __awaiter(this, arguments, void 0, function* (requestBody, headers = new CreateSlackIntegrationMappingHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/integration_mappings/slack'), {
                    method: 'POST',
                    headers: headersMap,
                    data: serializeIntegrationMappingSlackCreateRequest(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeIntegrationMapping(response.data);
            });
        }
        updateSlackIntegrationMappingById(integrationMappingId_1) {
            return __awaiter(this, arguments, void 0, function* (integrationMappingId, requestBody = {}, headers = new UpdateSlackIntegrationMappingByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                const response = (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/integration_mappings/slack/', toString(integrationMappingId)), {
                    method: 'PUT',
                    headers: headersMap,
                    data: serializeUpdateSlackIntegrationMappingByIdRequestBody(requestBody),
                    contentType: 'application/json',
                    responseFormat: 'json',
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return deserializeIntegrationMapping(response.data);
            });
        }
        deleteSlackIntegrationMappingById(integrationMappingId_1) {
            return __awaiter(this, arguments, void 0, function* (integrationMappingId, headers = new DeleteSlackIntegrationMappingByIdHeaders({}), cancellationToken) {
                const headersMap = prepareParams(Object.assign({}, headers.extraHeaders));
                (yield fetch(''.concat(this.networkSession.baseUrls.baseUrl, '/integration_mappings/slack/', toString(integrationMappingId)), {
                    method: 'DELETE',
                    headers: headersMap,
                    responseFormat: void 0,
                    auth: this.auth,
                    networkSession: this.networkSession,
                    cancellationToken: cancellationToken,
                }));
                return void 0;
            });
        }
    }
    function serializeUpdateSlackIntegrationMappingByIdRequestBody(val) {
        return {
            ['box_item']: val.boxItem == void 0
                ? void 0
                : serializeIntegrationMappingBoxItemSlack(val.boxItem),
            ['options']: val.options == void 0
                ? void 0
                : serializeIntegrationMappingSlackOptions(val.options),
        };
    }

    class BaseUrls {
        constructor(fields) {
            this.baseUrl = 'https://api.box.com/2.0';
            this.uploadUrl = 'https://upload.box.com/api/2.0';
            this.oauth2Url = 'https://account.box.com/api/oauth2';
            Object.assign(this, fields);
        }
    }

    class BoxClient {
        constructor(fields) {
            this.networkSession = new NetworkSession({
                baseUrls: new BaseUrls({}),
            });
            Object.assign(this, fields);
            this.authorization = new AuthorizationManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.files = new FilesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.trashedFiles = new TrashedFilesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.downloads = new DownloadsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.uploads = new UploadsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.chunkedUploads = new ChunkedUploadsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.listCollaborations = new ListCollaborationsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.comments = new CommentsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.tasks = new TasksManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.fileVersions = new FileVersionsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.fileMetadata = new FileMetadataManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.fileClassifications = new FileClassificationsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.skills = new SkillsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.fileWatermarks = new FileWatermarksManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.fileRequests = new FileRequestsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.folders = new FoldersManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.trashedFolders = new TrashedFoldersManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.folderMetadata = new FolderMetadataManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.folderClassifications = new FolderClassificationsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.trashedItems = new TrashedItemsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.folderWatermarks = new FolderWatermarksManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.folderLocks = new FolderLocksManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.metadataTemplates = new MetadataTemplatesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.classifications = new ClassificationsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.metadataCascadePolicies = new MetadataCascadePoliciesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.search = new SearchManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.userCollaborations = new UserCollaborationsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.taskAssignments = new TaskAssignmentsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.sharedLinksFiles = new SharedLinksFilesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.sharedLinksFolders = new SharedLinksFoldersManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.webLinks = new WebLinksManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.trashedWebLinks = new TrashedWebLinksManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.sharedLinksWebLinks = new SharedLinksWebLinksManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.users = new UsersManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.sessionTermination = new SessionTerminationManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.avatars = new AvatarsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.transfer = new TransferManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.emailAliases = new EmailAliasesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.memberships = new MembershipsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.invites = new InvitesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.groups = new GroupsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.webhooks = new WebhooksManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.events = new EventsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.collections = new CollectionsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.recentItems = new RecentItemsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.retentionPolicies = new RetentionPoliciesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.retentionPolicyAssignments = new RetentionPolicyAssignmentsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.legalHoldPolicies = new LegalHoldPoliciesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.legalHoldPolicyAssignments = new LegalHoldPolicyAssignmentsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.fileVersionRetentions = new FileVersionRetentionsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.fileVersionLegalHolds = new FileVersionLegalHoldsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.shieldInformationBarriers = new ShieldInformationBarriersManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.shieldInformationBarrierReports =
                new ShieldInformationBarrierReportsManager({
                    auth: this.auth,
                    networkSession: this.networkSession,
                });
            this.shieldInformationBarrierSegments =
                new ShieldInformationBarrierSegmentsManager({
                    auth: this.auth,
                    networkSession: this.networkSession,
                });
            this.shieldInformationBarrierSegmentMembers =
                new ShieldInformationBarrierSegmentMembersManager({
                    auth: this.auth,
                    networkSession: this.networkSession,
                });
            this.shieldInformationBarrierSegmentRestrictions =
                new ShieldInformationBarrierSegmentRestrictionsManager({
                    auth: this.auth,
                    networkSession: this.networkSession,
                });
            this.devicePinners = new DevicePinnersManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.termsOfServices = new TermsOfServicesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.termsOfServiceUserStatuses = new TermsOfServiceUserStatusesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.collaborationAllowlistEntries =
                new CollaborationAllowlistEntriesManager({
                    auth: this.auth,
                    networkSession: this.networkSession,
                });
            this.collaborationAllowlistExemptTargets =
                new CollaborationAllowlistExemptTargetsManager({
                    auth: this.auth,
                    networkSession: this.networkSession,
                });
            this.storagePolicies = new StoragePoliciesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.storagePolicyAssignments = new StoragePolicyAssignmentsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.zipDownloads = new ZipDownloadsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.signRequests = new SignRequestsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.workflows = new WorkflowsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.signTemplates = new SignTemplatesManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
            this.integrationMappings = new IntegrationMappingsManager({
                auth: this.auth,
                networkSession: this.networkSession,
            });
        }
        withAsUserHeader(userId) {
            return new BoxClient({
                auth: this.auth,
                networkSession: this.networkSession.withAdditionalHeaders({
                    ['As-User']: userId,
                }),
            });
        }
        withSuppressedNotifications() {
            return new BoxClient({
                auth: this.auth,
                networkSession: this.networkSession.withAdditionalHeaders({
                    ['Box-Notifications']: 'off',
                }),
            });
        }
        withExtraHeaders(extraHeaders = {}) {
            return new BoxClient({
                auth: this.auth,
                networkSession: this.networkSession.withAdditionalHeaders(extraHeaders),
            });
        }
        withCustomBaseUrls(baseUrls) {
            return new BoxClient({
                auth: this.auth,
                networkSession: this.networkSession.withCustomBaseUrls(baseUrls),
            });
        }
        withCustomAgentOptions(agentOptions) {
            return new BoxClient({
                auth: this.auth,
                networkSession: this.networkSession.withCustomAgentOptions(agentOptions),
            });
        }
        withInterceptors(interceptors) {
            return new BoxClient({
                auth: this.auth,
                networkSession: this.networkSession.withInterceptors(interceptors),
            });
        }
    }

    exports.BoxCcgAuth = BoxCcgAuth;
    exports.BoxClient = BoxClient;
    exports.BoxDeveloperTokenAuth = BoxDeveloperTokenAuth;
    exports.BoxJwtAuth = BoxJwtAuth;
    exports.BoxOAuth = BoxOAuth;
    exports.CcgConfig = CcgConfig;
    exports.JwtConfig = JwtConfig;

}));
//# sourceMappingURL=bundle.js.map
