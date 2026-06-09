/**
 * Box undoc annotations + file comments (browser). Same endpoints as redaction / hmrc-demo.
 */
(function (global) {
  'use strict';

  var BOX_API = 'https://api.box.com/2.0';
  var ANNOTATIONS_PATH = '/undoc/annotations';

  function authHeader(accessToken) {
    if (!accessToken) {
      return null;
    }
    if (String(accessToken).indexOf('Bearer ') === 0) {
      return accessToken;
    }
    return 'Bearer ' + accessToken;
  }

  function getReplyMessage(entry) {
    var d = entry && entry.description;
    if (!d || typeof d !== 'object') {
      return '';
    }
    return typeof d.message === 'string' ? d.message : '';
  }

  function getAnnotationPage(entry) {
    var t = entry && entry.target;
    if (!t || !t.location) {
      return null;
    }
    if (t.location.type !== 'page') {
      return null;
    }
    var v = t.location.value;
    if (typeof v === 'number' && !isNaN(v)) {
      return v;
    }
    if (typeof v === 'string' && /^\d+$/.test(v.trim())) {
      return parseInt(v.trim(), 10);
    }
    return null;
  }

  function getTargetType(entry) {
    var t = entry && entry.target;
    if (t && t.type) {
      return String(t.type);
    }
    if (entry && entry.type) {
      return String(entry.type);
    }
    return 'annotation';
  }

  function getAuthorLabel(user) {
    if (!user || typeof user !== 'object') {
      return '';
    }
    if (user.name) {
      return String(user.name);
    }
    if (user.login) {
      return String(user.login);
    }
    return user.id != null ? String(user.id) : '';
  }

  /** Undoc list can include non-spatial thread rows; keep only on-page markup. */
  function isSpatialAnnotationEntry(entry) {
    if (!entry || typeof entry !== 'object') {
      return false;
    }
    var target = entry.target;
    if (!target || typeof target !== 'object') {
      return false;
    }
    if (target.location && target.location.type === 'page') {
      return true;
    }
    var spatialTypes = ['region', 'highlight', 'drawing', 'point'];
    var targetType = target.type != null ? String(target.type) : '';
    return spatialTypes.indexOf(targetType) >= 0;
  }

  function normalizeAnnotation(entry) {
    if (!entry || !entry.id || !isSpatialAnnotationEntry(entry)) {
      return null;
    }
    return {
      id: String(entry.id),
      targetType: getTargetType(entry),
      page: getAnnotationPage(entry),
      message: getReplyMessage(entry),
      createdAt: entry.created_at || entry.createdAt || '',
      authorLabel: getAuthorLabel(entry.created_by || entry.createdBy),
      fileVersionId: entry.file_version && entry.file_version.id ? String(entry.file_version.id) : '',
      raw: entry
    };
  }

  function normalizeComment(entry) {
    if (!entry || !entry.id) {
      return null;
    }
    var isReply = entry.is_reply_comment === true;
    var item = entry.item;
    if (!isReply && item && item.type === 'comment') {
      isReply = true;
    }
    var parentCommentId = '';
    if (isReply && item && item.id != null) {
      parentCommentId = String(item.id);
    }
    return {
      id: String(entry.id),
      message: typeof entry.message === 'string' ? entry.message : '',
      createdAt: entry.created_at || entry.createdAt || '',
      authorLabel: getAuthorLabel(entry.created_by || entry.createdBy),
      isReply: isReply,
      parentCommentId: parentCommentId
    };
  }

  function filterTopLevelComments(comments) {
    var top = [];
    var i;
    for (i = 0; i < comments.length; i++) {
      if (comments[i] && !comments[i].isReply) {
        top.push(comments[i]);
      }
    }
    return top;
  }

  function createComment(accessToken, itemType, itemId, message) {
    var body = {
      message: String(message),
      item: { type: itemType, id: String(itemId) }
    };
    return fetch(BOX_API + '/comments', {
      method: 'POST',
      headers: {
        Authorization: authHeader(accessToken),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) {
          var errText = data && data.message ? data.message : JSON.stringify(data);
          throw new Error('Create comment HTTP ' + res.status + ': ' + errText);
        }
        return normalizeComment(data);
      });
    });
  }

  function createFileComment(accessToken, fileId, message) {
    return createComment(accessToken, 'file', fileId, message);
  }

  function createCommentReply(accessToken, parentCommentId, message) {
    return createComment(accessToken, 'comment', parentCommentId, message);
  }

  function fetchAnnotationsPage(accessToken, fileId, fileVersionId, marker) {
    var params = new URLSearchParams({ file_id: String(fileId), marker: marker || '', limit: '1000' });
    if (fileVersionId) {
      params.set('file_version_id', String(fileVersionId));
    }
    var url = BOX_API + ANNOTATIONS_PATH + '?' + params.toString();
    return fetch(url, { headers: { Authorization: authHeader(accessToken) } }).then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, status: res.status, data: data };
      });
    });
  }

  function getAllAnnotations(accessToken, fileId, fileVersionId) {
    var all = [];
    var marker = '';
    function next() {
      return fetchAnnotationsPage(accessToken, fileId, fileVersionId, marker).then(function (result) {
        if (!result.ok) {
          var errText = result.data && result.data.message ? result.data.message : JSON.stringify(result.data);
          throw new Error('Annotations HTTP ' + result.status + ': ' + errText);
        }
        var entries = Array.isArray(result.data.entries) ? result.data.entries : [];
        var i;
        for (i = 0; i < entries.length; i++) {
          var row = normalizeAnnotation(entries[i]);
          if (row) {
            all.push(row);
          }
        }
        var nextMarker = result.data.next_marker;
        if (nextMarker != null && nextMarker !== '') {
          marker = String(nextMarker);
          return next();
        }
        return all;
      });
    }
    return next();
  }

  function fetchCommentsPage(accessToken, fileId, offset, limit) {
    var url = BOX_API + '/files/' + encodeURIComponent(String(fileId)) + '/comments?limit=' + limit + '&offset=' + offset;
    return fetch(url, { headers: { Authorization: authHeader(accessToken) } }).then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, status: res.status, data: data };
      });
    });
  }

  function getAllFileComments(accessToken, fileId) {
    var all = [];
    var offset = 0;
    var limit = 100;
    function next() {
      return fetchCommentsPage(accessToken, fileId, offset, limit).then(function (result) {
        if (!result.ok) {
          var errText = result.data && result.data.message ? result.data.message : JSON.stringify(result.data);
          throw new Error('Comments HTTP ' + result.status + ': ' + errText);
        }
        var entries = Array.isArray(result.data.entries) ? result.data.entries : [];
        var i;
        for (i = 0; i < entries.length; i++) {
          var row = normalizeComment(entries[i]);
          if (row) {
            all.push(row);
          }
        }
        if (entries.length < limit) {
          return all;
        }
        offset += limit;
        if (offset > 5000) {
          return all;
        }
        return next();
      });
    }
    return next();
  }

  function loadAnnotationsOnly(accessToken, fileId, fileVersionId) {
    return getAllAnnotations(accessToken, fileId, fileVersionId).catch(function (err) {
      return { error: err.message || String(err), items: [] };
    }).then(function (annResult) {
      var annotations = Array.isArray(annResult) ? annResult : (annResult.items || []);
      return {
        annotations: annotations,
        annotationsError: annResult.error || null
      };
    });
  }

  function loadFileComments(accessToken, fileId) {
    return getAllFileComments(accessToken, fileId).catch(function (err) {
      return { error: err.message || String(err), items: [] };
    }).then(function (comResult) {
      var comments = Array.isArray(comResult) ? comResult : (comResult.items || []);
      return {
        comments: filterTopLevelComments(comments),
        allComments: comments,
        commentsError: comResult.error || null
      };
    });
  }

  function loadAnnotationsAndComments(accessToken, fileId, fileVersionId) {
    var annPromise = getAllAnnotations(accessToken, fileId, fileVersionId).catch(function (err) {
      return { error: err.message || String(err), items: [] };
    });
    var comPromise = getAllFileComments(accessToken, fileId).catch(function (err) {
      return { error: err.message || String(err), items: [] };
    });
    return Promise.all([annPromise, comPromise]).then(function (results) {
      var annResult = results[0];
      var comResult = results[1];
      var annotations = Array.isArray(annResult) ? annResult : (annResult.items || []);
      var comments = Array.isArray(comResult) ? comResult : (comResult.items || []);
      return {
        annotations: annotations,
        comments: filterTopLevelComments(comments),
        allComments: comments,
        annotationsError: annResult.error || null,
        commentsError: comResult.error || null
      };
    });
  }

  global.CompareAnnotationsApi = {
    getAllAnnotations: getAllAnnotations,
    getAllFileComments: getAllFileComments,
    loadAnnotationsOnly: loadAnnotationsOnly,
    loadFileComments: loadFileComments,
    loadAnnotationsAndComments: loadAnnotationsAndComments,
    createFileComment: createFileComment,
    createCommentReply: createCommentReply,
    filterTopLevelComments: filterTopLevelComments,
    normalizeAnnotation: normalizeAnnotation,
    normalizeComment: normalizeComment,
    isSpatialAnnotationEntry: isSpatialAnnotationEntry,
    getReplyMessage: getReplyMessage
  };
})(typeof window !== 'undefined' ? window : this);
