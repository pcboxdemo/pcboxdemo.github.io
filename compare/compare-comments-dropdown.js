/**
 * File-level comments dropdown — centered above compare previews (not per-version).
 */
(function (global) {
  'use strict';

  var config = {
    getAccessToken: null,
    getFileId: null,
    getCanComment: null
  };

  var cache = null;
  var ui = null;
  var isOpen = false;
  var selectedId = null;
  var composeMode = 'file';
  var composeParentId = null;

  function log(msg) {
    console.log('Compare comments: ' + msg);
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  function userCanComment() {
    if (typeof config.getCanComment === 'function') {
      return config.getCanComment() !== false;
    }
    return true;
  }

  function formatWhen(iso) {
    if (!iso) {
      return '';
    }
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) {
        return String(iso);
      }
      return d.toLocaleString();
    } catch (ignoreErr) {
      return String(iso);
    }
  }

  function listTitleForComment(item) {
    if (item.message && String(item.message).trim()) {
      var msg = String(item.message).trim();
      if (msg.length > 60) {
        msg = msg.substring(0, 60) + '…';
      }
      return msg;
    }
    return item.authorLabel || 'Comment';
  }

  function configure(options) {
    if (!options) {
      return;
    }
    Object.keys(options).forEach(function (key) {
      if (typeof options[key] === 'function') {
        config[key] = options[key];
      }
    });
  }

  function getBodyEl() {
    return document.querySelector('[data-compare-comments-body]');
  }

  function getRepliesForComment(parentId) {
    var all = cache && cache.allComments ? cache.allComments : [];
    var out = [];
    var i;
    for (i = 0; i < all.length; i++) {
      if (all[i].isReply && all[i].parentCommentId === String(parentId)) {
        out.push(all[i]);
      }
    }
    return out;
  }

  function findCommentById(id) {
    if (!cache || !id) {
      return null;
    }
    var all = cache.allComments || cache.comments || [];
    var i;
    for (i = 0; i < all.length; i++) {
      if (all[i].id === String(id)) {
        return all[i];
      }
    }
    return null;
  }

  function updateCompose() {
    if (!ui || !ui.composeEl) {
      return;
    }
    var canComment = userCanComment();
    if (ui.composeInput) {
      ui.composeInput.disabled = !canComment;
    }
    if (ui.composePostBtn) {
      ui.composePostBtn.disabled = !canComment;
    }
    if (ui.composeHint) {
      if (!canComment) {
        ui.composeHint.textContent = 'You do not have permission to comment on this file.';
      } else if (composeMode === 'reply' && composeParentId) {
        var parent = findCommentById(composeParentId);
        var who = parent && parent.authorLabel ? parent.authorLabel : 'this comment';
        ui.composeHint.textContent = 'Replying to ' + who;
      } else {
        ui.composeHint.textContent = 'Comments apply to the whole file, not a specific version.';
      }
    }
    if (ui.composeInput && canComment) {
      ui.composeInput.placeholder = composeMode === 'reply' ? 'Write a reply…' : 'Write a comment…';
    }
    if (ui.composeError) {
      ui.composeError.hidden = true;
      ui.composeError.textContent = '';
    }
  }

  function setComposeMode(mode, parentId, shouldFocus) {
    composeMode = mode === 'reply' ? 'reply' : 'file';
    composeParentId = mode === 'reply' ? parentId : null;
    updateCompose();
    if (shouldFocus !== false && ui && ui.composeInput && userCanComment()) {
      ui.composeInput.focus();
    }
  }

  function clearComposeInput() {
    if (ui && ui.composeInput) {
      ui.composeInput.value = '';
    }
    setComposeMode('file', null, false);
  }

  function showComposeError(message) {
    if (ui && ui.composeError) {
      ui.composeError.textContent = message;
      ui.composeError.hidden = false;
    }
  }

  function renderListItemHtml(item, isSel) {
    var title = listTitleForComment(item);
    var metaParts = [];
    var extraHtml = '';
    var r;
    if (item.authorLabel) {
      metaParts.push(item.authorLabel);
    }
    if (item.createdAt) {
      metaParts.push(formatWhen(item.createdAt));
    }
    var bodyHtml = '<div class="compare-ann-card-body">' + escapeHtml(item.message || '(empty)') + '</div>';
    if (isSel) {
      var replies = getRepliesForComment(item.id);
      if (replies.length) {
        extraHtml += '<ul class="compare-ann-replies-list">';
        for (r = 0; r < replies.length; r++) {
          extraHtml +=
            '<li class="compare-ann-reply">' +
            '<div class="compare-ann-reply-author">' + escapeHtml(replies[r].authorLabel || '—') + '</div>' +
            '<div class="compare-ann-reply-meta">' + escapeHtml(formatWhen(replies[r].createdAt) || '') + '</div>' +
            '<div class="compare-ann-reply-message">' + escapeHtml(replies[r].message || '') + '</div>' +
            '</li>';
        }
        extraHtml += '</ul>';
      }
      if (userCanComment()) {
        extraHtml += '<button type="button" class="compare-ann-reply-btn" data-reply-to="' + escapeHtml(item.id) + '">Reply</button>';
      }
    }
    return (
      '<li class="compare-ann-card' + (isSel ? ' is-selected' : '') + '">' +
      '<button type="button" class="compare-ann-list-item" data-comment-id="' + escapeHtml(item.id) + '">' +
      '<div class="compare-ann-list-item-title">' + escapeHtml(title) + '</div>' +
      (metaParts.length ? '<div class="compare-ann-list-item-meta">' + escapeHtml(metaParts.join(' · ')) + '</div>' : '') +
      bodyHtml +
      '</button>' +
      (extraHtml ? '<div class="compare-ann-card-extra">' + extraHtml + '</div>' : '') +
      '</li>'
    );
  }

  function renderList() {
    if (!ui || !ui.listEl) {
      return;
    }
    if (!cache) {
      updateCompose();
      return;
    }
    var items = cache.comments || [];
    var html = '';
    var i;
    if (!items.length) {
      ui.listEl.innerHTML = '';
      updateCompose();
      return;
    }
    html = '<ul class="compare-ann-list">';
    for (i = 0; i < items.length; i++) {
      html += renderListItemHtml(items[i], selectedId === items[i].id);
    }
    html += '</ul>';
    ui.listEl.innerHTML = html;
    updateCompose();
  }

  function selectItem(id) {
    selectedId = id;
    renderList();
  }

  function buildShell() {
    var bodyEl = getBodyEl();
    if (!bodyEl) {
      return null;
    }
    bodyEl.innerHTML =
      '<div class="compare-comments-panel-inner">' +
      '<div class="compare-comments-panel-toolbar">' +
      '<p class="compare-comments-panel-title">File comments</p>' +
      '<button type="button" class="compare-comments-refresh" data-compare-comments-refresh title="Reload from Box">Refresh</button>' +
      '</div>' +
      '<div class="compare-comments-list-wrap">' +
      '<div class="compare-comments-list-col"><p class="compare-ann-status">Loading…</p></div>' +
      '<div class="compare-comments-compose">' +
      '<p class="compare-ann-compose-hint">Comments apply to the whole file, not a specific version.</p>' +
      '<textarea class="compare-ann-compose-input" rows="3" placeholder="Write a comment…"></textarea>' +
      '<div class="compare-ann-compose-actions">' +
      '<button type="button" class="compare-ann-compose-cancel">Cancel</button>' +
      '<button type="button" class="compare-ann-compose-post">Post</button>' +
      '</div>' +
      '<p class="compare-ann-compose-error compare-ann-status is-error" hidden></p>' +
      '</div></div></div>';

    var root = bodyEl.querySelector('.compare-comments-panel-inner');
    ui = {
      root: root,
      listEl: root.querySelector('.compare-comments-list-col'),
      composeEl: root.querySelector('.compare-comments-compose'),
      composeHint: root.querySelector('.compare-ann-compose-hint'),
      composeInput: root.querySelector('.compare-ann-compose-input'),
      composePostBtn: root.querySelector('.compare-ann-compose-post'),
      composeCancelBtn: root.querySelector('.compare-ann-compose-cancel'),
      composeError: root.querySelector('.compare-ann-compose-error'),
      refreshBtn: root.querySelector('[data-compare-comments-refresh]')
    };
    if (ui.refreshBtn) {
      ui.refreshBtn.addEventListener('click', function (evt) {
        evt.stopPropagation();
        refresh();
      });
    }
    if (ui.composePostBtn) {
      ui.composePostBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        submitCompose();
      });
    }
    if (ui.composeCancelBtn) {
      ui.composeCancelBtn.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        clearComposeInput();
      });
    }
    if (ui.composeInput) {
      ui.composeInput.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter' && (evt.ctrlKey || evt.metaKey)) {
          evt.preventDefault();
          submitCompose();
        }
      });
    }
    if (ui.composeEl) {
      ui.composeEl.addEventListener('click', function (evt) {
        evt.stopPropagation();
      });
    }
    root.addEventListener('click', function (evt) {
      var listBtn = evt.target.closest('.compare-ann-list-item');
      if (listBtn) {
        selectItem(listBtn.getAttribute('data-comment-id'));
        return;
      }
      var replyBtn = evt.target.closest('.compare-ann-reply-btn');
      if (replyBtn) {
        setComposeMode('reply', replyBtn.getAttribute('data-reply-to'));
      }
    });
    selectedId = null;
    composeMode = 'file';
    composeParentId = null;
    updateCompose();
    return ui;
  }

  function applyResult(result) {
    var warn = result.commentsError ? ['Comments: ' + result.commentsError] : [];
    cache = {
      comments: result.comments || [],
      allComments: result.allComments || result.comments || []
    };
    log('loaded ' + cache.comments.length + ' file comments');
    if (ui && ui.listEl && ui.root) {
      var oldNotes = ui.root.querySelectorAll('.compare-comments-warn');
      var n;
      for (n = 0; n < oldNotes.length; n++) {
        oldNotes[n].parentNode.removeChild(oldNotes[n]);
      }
      if (warn.length) {
        var note = document.createElement('p');
        note.className = 'compare-ann-status is-error compare-comments-warn';
        note.textContent = warn.join(' ');
        ui.listEl.parentNode.insertBefore(note, ui.listEl);
      }
    }
    renderList();
    if (ui && ui.refreshBtn) {
      ui.refreshBtn.disabled = false;
      ui.refreshBtn.textContent = 'Refresh';
    }
  }

  function fetchComments() {
    var token = config.getAccessToken ? config.getAccessToken() : null;
    var fid = config.getFileId ? config.getFileId() : null;
    if (!token || !fid) {
      if (ui && ui.listEl) {
        ui.listEl.innerHTML = '<p class="compare-ann-status is-error">Missing token or file.</p>';
      }
      return Promise.resolve();
    }
    return CompareAnnotationsApi.loadFileComments(token, fid).then(function (result) {
      applyResult(result);
    }).catch(function (err) {
      if (ui && ui.listEl) {
        ui.listEl.innerHTML = '<p class="compare-ann-status is-error">' + escapeHtml(err.message || String(err)) + '</p>';
      }
      if (ui && ui.refreshBtn) {
        ui.refreshBtn.disabled = false;
        ui.refreshBtn.textContent = 'Refresh';
      }
    });
  }

  function loadIfNeeded() {
    if (!ui) {
      buildShell();
    }
    if (cache) {
      renderList();
      return Promise.resolve();
    }
    return fetchComments();
  }

  function refresh() {
    cache = null;
    if (ui && ui.refreshBtn) {
      ui.refreshBtn.disabled = true;
      ui.refreshBtn.textContent = 'Refreshing…';
    }
    if (ui && ui.listEl) {
      ui.listEl.innerHTML = '<p class="compare-ann-status">Refreshing…</p>';
    }
    return fetchComments();
  }

  function submitCompose() {
    var token = config.getAccessToken ? config.getAccessToken() : null;
    var fid = config.getFileId ? config.getFileId() : null;
    if (!token || !fid || !ui || !ui.composeInput) {
      showComposeError('Cannot post: missing token or file.');
      return;
    }
    if (!userCanComment()) {
      showComposeError('Commenting is not allowed for this file.');
      return;
    }
    var text = String(ui.composeInput.value || '').trim();
    if (!text) {
      showComposeError('Enter a comment before posting.');
      return;
    }
    if (ui.composePostBtn) {
      ui.composePostBtn.disabled = true;
      ui.composePostBtn.textContent = 'Posting…';
    }
    var promise;
    if (composeMode === 'reply' && composeParentId) {
      promise = CompareAnnotationsApi.createCommentReply(token, composeParentId, text);
    } else {
      promise = CompareAnnotationsApi.createFileComment(token, fid, text);
    }
    promise.then(function (created) {
      clearComposeInput();
      cache = null;
      return refresh().then(function () {
        if (created && created.id) {
          selectItem(created.id);
        }
      });
    }).catch(function (err) {
      showComposeError(err.message || String(err));
    }).then(function () {
      if (ui.composePostBtn) {
        ui.composePostBtn.disabled = !userCanComment();
        ui.composePostBtn.textContent = 'Post';
      }
    });
  }

  function setOpen(open) {
    var root = document.getElementById('compareCommentsDropdown');
    var panel = document.getElementById('compareCommentsPanel');
    var trigger = root ? root.querySelector('.compare-comments-trigger') : null;
    isOpen = !!open;
    if (panel) {
      panel.hidden = !isOpen;
    }
    if (trigger) {
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      trigger.classList.toggle('is-open', isOpen);
    }
    if (isOpen) {
      loadIfNeeded();
    }
  }

  function toggle() {
    setOpen(!isOpen);
  }

  function close() {
    setOpen(false);
  }

  function bindTrigger() {
    var root = document.getElementById('compareCommentsDropdown');
    if (!root || root._compareCommentsBound) {
      return;
    }
    var trigger = root.querySelector('.compare-comments-trigger');
    if (trigger) {
      trigger.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        toggle();
      });
    }
    document.addEventListener('click', function (evt) {
      if (!isOpen) {
        return;
      }
      if (root.contains(evt.target)) {
        return;
      }
      close();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' && isOpen) {
        close();
      }
    });
    root._compareCommentsBound = true;
  }

  function mount() {
    bindTrigger();
    var bodyEl = getBodyEl();
    if (bodyEl) {
      bodyEl.innerHTML = '<p class="sidebar-placeholder">Open Comments to view file discussion.</p>';
    }
  }

  function invalidate() {
    cache = null;
    ui = null;
    selectedId = null;
    composeMode = 'file';
    composeParentId = null;
    close();
  }

  function setPlaceholder() {
    var bodyEl = getBodyEl();
    if (bodyEl) {
      bodyEl.innerHTML = '<p class="sidebar-placeholder">Open Comments for file discussion.</p>';
    }
    cache = null;
    ui = null;
  }

  global.CompareCommentsDropdown = {
    configure: configure,
    mount: mount,
    invalidate: invalidate,
    setPlaceholder: setPlaceholder,
    close: close,
    refresh: refresh
  };
})(typeof window !== 'undefined' ? window : this);
