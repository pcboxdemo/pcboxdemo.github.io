/**
 * Custom fold-out panel: version-scoped annotations only (undoc API).
 */
(function (global) {
  'use strict';

  var config = {
    getAccessToken: null,
    getFileId: null,
    getCompareFoldoutSidebar: null,
    getFoldoutSideForPanelIndex: null,
    getPanelIndexForFoldoutSide: null,
    getVersionForSide: null,
    getBoxAnnotationsForPanel: null
  };

  var cacheBySide = { left: null, right: null };
  var uiBySide = { left: null, right: null };
  var selectedIdBySide = { left: null, right: null };
  var previewDomBound = false;
  var clickPopupEl = null;
  var clickPopupDismissBound = false;
  var lastPreviewClickPoint = null;
  var skipNextActivePopup = false;
  var lastPopupShown = { id: null, at: 0 };
  var suppressPopupDismiss = false;

  function log(msg) {
    console.log('Compare annotations panel: ' + msg);
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
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

  function getBodyEl(side) {
    return document.querySelector('[data-compare-foldout-body="' + side + '"]');
  }

  function toPanelIndex(panelIndex) {
    return parseInt(panelIndex, 10);
  }

  function emitActiveOnPanel(panelIndex, annotationId) {
    var ba = config.getBoxAnnotationsForPanel ? config.getBoxAnnotationsForPanel(toPanelIndex(panelIndex)) : null;
    if (ba && typeof ba.emit === 'function') {
      ba.emit('annotations_active_set', annotationId);
    }
  }

  function formatTargetType(type) {
    if (!type) {
      return 'Annotation';
    }
    var s = String(type);
    return s.charAt(0).toUpperCase() + s.slice(1);
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

  function listTitleForItem(item) {
    if (item.message && String(item.message).trim()) {
      var msg = String(item.message).trim();
      if (msg.length > 60) {
        msg = msg.substring(0, 60) + '…';
      }
      return msg;
    }
    var parts = [];
    if (item.page != null) {
      parts.push('Page ' + item.page);
    }
    parts.push(formatTargetType(item.targetType));
    return parts.join(' · ');
  }

  function renderListItemHtml(item, isSel) {
    var title = listTitleForItem(item);
    var metaParts = [];
    if (formatTargetType(item.targetType)) {
      metaParts.push(formatTargetType(item.targetType));
    }
    if (item.page != null) {
      metaParts.push('page ' + item.page);
    }
    if (item.authorLabel) {
      metaParts.push(item.authorLabel);
    }
    if (item.createdAt) {
      metaParts.push(formatWhen(item.createdAt));
    }
    return (
      '<li class="compare-ann-card' + (isSel ? ' is-selected' : '') + '">' +
      '<button type="button" class="compare-ann-list-item" data-ann-id="' + escapeHtml(item.id) + '" data-ann-kind="annotations">' +
      '<div class="compare-ann-list-item-title">' + escapeHtml(title) + '</div>' +
      (metaParts.length ? '<div class="compare-ann-list-item-meta">' + escapeHtml(metaParts.join(' · ')) + '</div>' : '') +
      '<div class="compare-ann-card-body">' + escapeHtml(item.message || '(no note)') + '</div>' +
      '</button></li>'
    );
  }

  function renderList(side) {
    var ui = uiBySide[side];
    var data = cacheBySide[side];
    if (!ui || !ui.listEl) {
      return;
    }
    if (!data) {
      return;
    }
    var items = data.annotations || [];
    var selectedId = selectedIdBySide[side];
    var html = '';
    var i;
    if (!items.length) {
      ui.listEl.innerHTML = '<p class="compare-ann-status">No annotations for this version.</p>';
      return;
    }
    html = '<ul class="compare-ann-list">';
    for (i = 0; i < items.length; i++) {
      html += renderListItemHtml(items[i], selectedId === items[i].id);
    }
    html += '</ul>';
    ui.listEl.innerHTML = html;
  }

  function selectItem(side, id, highlightPreview) {
    selectedIdBySide[side] = id;
    renderList(side);
    if (highlightPreview) {
      skipNextActivePopup = true;
      var panelIndex = config.getPanelIndexForFoldoutSide ? config.getPanelIndexForFoldoutSide(side) : -1;
      if (panelIndex >= 0) {
        emitActiveOnPanel(panelIndex, id);
      }
    }
  }

  function findAnnotationById(side, id) {
    var data = cacheBySide[side];
    if (!data || !id) {
      return null;
    }
    var i;
    for (i = 0; i < data.annotations.length; i++) {
      if (data.annotations[i].id === String(id)) {
        return data.annotations[i];
      }
    }
    return null;
  }

  function buildPanelShell(side, version) {
    var bodyEl = getBodyEl(side);
    if (!bodyEl) {
      return null;
    }
    var versionLabel = 'Version ' + (version.versionNumber || '?');
    if (version.isCurrent) {
      versionLabel += ' (Current)';
    }
    bodyEl.innerHTML =
      '<div class="compare-ann-panel" data-side="' + side + '">' +
      '<div class="compare-ann-panel-header">' +
      '<div class="compare-ann-panel-header-row">' +
      '<p class="compare-ann-panel-version">' + escapeHtml(versionLabel) + '</p>' +
      '<button type="button" class="compare-ann-refresh" data-compare-ann-refresh title="Reload from Box">Refresh</button>' +
      '</div></div>' +
      '<div class="compare-ann-panel-body">' +
      '<div class="compare-ann-list-wrap">' +
      '<div class="compare-ann-list-col"><p class="compare-ann-status">Loading…</p></div>' +
      '</div></div></div>';

    var panel = bodyEl.querySelector('.compare-ann-panel');
    var ui = {
      panel: panel,
      listEl: panel.querySelector('.compare-ann-list-col'),
      refreshBtn: panel.querySelector('[data-compare-ann-refresh]')
    };
    if (ui.refreshBtn) {
      ui.refreshBtn.addEventListener('click', function () {
        refreshPanel(side);
      });
    }
    panel.addEventListener('click', function (evt) {
      var listBtn = evt.target.closest('.compare-ann-list-item');
      if (listBtn) {
        selectItem(side, listBtn.getAttribute('data-ann-id'), true);
      }
    });
    uiBySide[side] = ui;
    selectedIdBySide[side] = null;
    return ui;
  }

  function showLoadError(side, message) {
    var ui = uiBySide[side];
    if (ui && ui.listEl) {
      ui.listEl.innerHTML = '<p class="compare-ann-status is-error">' + escapeHtml(message) + '</p>';
    }
  }

  function applyPanelResult(side, version, result) {
    var warn = [];
    var ui = uiBySide[side];
    if (result.annotationsError) {
      warn.push('Annotations: ' + result.annotationsError);
    }
    var versionId = version.id || null;
    cacheBySide[side] = {
      versionId: versionId,
      versionNumber: version.versionNumber,
      annotations: result.annotations || [],
      warnings: warn
    };
    log('loaded ' + side + ' v' + version.versionNumber + ': ' + cacheBySide[side].annotations.length + ' annotations');
    if (ui && ui.listEl && ui.panel) {
      var oldNotes = ui.panel.querySelectorAll('.compare-ann-warn');
      var n;
      for (n = 0; n < oldNotes.length; n++) {
        oldNotes[n].parentNode.removeChild(oldNotes[n]);
      }
      if (warn.length) {
        var note = document.createElement('p');
        note.className = 'compare-ann-status is-error compare-ann-warn';
        note.textContent = warn.join(' ');
        ui.listEl.parentNode.insertBefore(note, ui.listEl);
      }
    }
    renderList(side);
    if (ui && ui.refreshBtn) {
      ui.refreshBtn.disabled = false;
      ui.refreshBtn.textContent = 'Refresh';
    }
  }

  function fetchPanelData(side, version) {
    var token = config.getAccessToken ? config.getAccessToken() : null;
    var fid = config.getFileId ? config.getFileId() : null;
    if (!token || !fid || !version) {
      showLoadError(side, 'Missing token, file, or version.');
      return Promise.resolve();
    }
    var versionId = version.id || null;
    return CompareAnnotationsApi.loadAnnotationsOnly(token, fid, versionId).then(function (result) {
      applyPanelResult(side, version, result);
    }).catch(function (err) {
      showLoadError(side, err.message || String(err));
      var ui = uiBySide[side];
      if (ui && ui.refreshBtn) {
        ui.refreshBtn.disabled = false;
        ui.refreshBtn.textContent = 'Refresh';
      }
    });
  }

  function loadPanelData(side, version) {
    if (!uiBySide[side]) {
      buildPanelShell(side, version);
    }
    return fetchPanelData(side, version);
  }

  function refreshPanel(side) {
    var version = config.getVersionForSide ? config.getVersionForSide(side) : null;
    if (!version) {
      return Promise.resolve();
    }
    var ui = uiBySide[side];
    if (ui && ui.refreshBtn) {
      ui.refreshBtn.disabled = true;
      ui.refreshBtn.textContent = 'Refreshing…';
    }
    if (ui && ui.listEl) {
      ui.listEl.innerHTML = '<p class="compare-ann-status">Refreshing…</p>';
    }
    return fetchPanelData(side, version);
  }

  function invalidateCacheForPanel(panelIndex) {
    var side = config.getFoldoutSideForPanelIndex
      ? config.getFoldoutSideForPanelIndex(toPanelIndex(panelIndex))
      : null;
    if (!side) {
      return;
    }
    cacheBySide[side] = null;
  }

  function onAnnotationListChanged(panelIndex) {
    var side = config.getFoldoutSideForPanelIndex
      ? config.getFoldoutSideForPanelIndex(toPanelIndex(panelIndex))
      : null;
    if (!side) {
      return;
    }
    var foldout = config.getCompareFoldoutSidebar ? config.getCompareFoldoutSidebar() : null;
    var isPanelOpen = foldout && foldout.openSide === side && uiBySide[side];
    if (isPanelOpen) {
      log('annotation changed — refreshing ' + side);
      refreshPanel(side);
      return;
    }
    invalidateCacheForPanel(panelIndex);
  }

  function onPanelOpen(side) {
    var version = config.getVersionForSide ? config.getVersionForSide(side) : null;
    if (!version) {
      return;
    }
    var cached = cacheBySide[side];
    if (cached && cached.versionId === version.id && uiBySide[side]) {
      renderList(side);
      return;
    }
    loadPanelData(side, version);
  }

  function getClickPopupEl() {
    if (clickPopupEl) {
      return clickPopupEl;
    }
    clickPopupEl = document.createElement('div');
    clickPopupEl.className = 'compare-ann-click-popup';
    clickPopupEl.setAttribute('role', 'dialog');
    clickPopupEl.setAttribute('aria-label', 'Annotation');
    clickPopupEl.hidden = true;
    clickPopupEl.innerHTML =
      '<div class="compare-ann-click-popup-header">' +
      '<p class="compare-ann-click-popup-meta"></p>' +
      '<button type="button" class="compare-ann-click-popup-close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="compare-ann-click-popup-body"></div>';
    clickPopupEl.querySelector('.compare-ann-click-popup-close').addEventListener('click', dismissClickPopup);
    document.body.appendChild(clickPopupEl);
    bindClickPopupDismiss();
    return clickPopupEl;
  }

  function bindClickPopupDismiss() {
    if (clickPopupDismissBound) {
      return;
    }
    document.addEventListener('click', function (evt) {
      if (suppressPopupDismiss) {
        return;
      }
      if (!clickPopupEl || clickPopupEl.hidden) {
        return;
      }
      if (clickPopupEl.contains(evt.target)) {
        return;
      }
      if (evt.target.closest && evt.target.closest('.ba-RegionAnnotation, .ba-PointAnnotation, [data-resin-itemid]')) {
        return;
      }
      dismissClickPopup();
    }, true);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        dismissClickPopup();
      }
    });
    clickPopupDismissBound = true;
  }

  function dismissClickPopup() {
    if (clickPopupEl) {
      clickPopupEl.hidden = true;
    }
  }

  function positionClickPopup(popup, point) {
    var pad = 10;
    var offset = 12;
    var x = point && point.x != null ? point.x + offset : window.innerWidth / 2 - 140;
    var y = point && point.y != null ? point.y + offset : window.innerHeight / 2 - 60;
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.hidden = false;
    requestAnimationFrame(function () {
      var rect = popup.getBoundingClientRect();
      var left = x;
      var top = y;
      if (left + rect.width > window.innerWidth - pad) {
        left = window.innerWidth - rect.width - pad;
      }
      if (top + rect.height > window.innerHeight - pad) {
        top = point && point.y != null ? point.y - rect.height - offset : window.innerHeight - rect.height - pad;
      }
      if (left < pad) {
        left = pad;
      }
      if (top < pad) {
        top = pad;
      }
      popup.style.left = left + 'px';
      popup.style.top = top + 'px';
    });
  }

  function resolveClickPoint(annotationId, fallbackPoint) {
    if (fallbackPoint && fallbackPoint.x != null && fallbackPoint.y != null) {
      return fallbackPoint;
    }
    var safeId = String(annotationId).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    var el = document.querySelector('[data-resin-itemid="' + safeId + '"]');
    if (el && el.getBoundingClientRect) {
      var r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    return { x: window.innerWidth / 2 - 100, y: window.innerHeight / 3 };
  }

  function popupMetaLine(item) {
    var parts = [];
    if (item.page != null) {
      parts.push('Page ' + item.page);
    }
    if (formatTargetType(item.targetType)) {
      parts.push(formatTargetType(item.targetType));
    }
    if (item.authorLabel) {
      parts.push(item.authorLabel);
    }
    if (item.createdAt) {
      parts.push(formatWhen(item.createdAt));
    }
    return parts.join(' · ');
  }

  function ensureSideDataLoaded(side, version) {
    if (!version) {
      return Promise.reject(new Error('No version for side'));
    }
    var cached = cacheBySide[side];
    if (cached && cached.versionId === version.id) {
      return Promise.resolve();
    }
    if (!uiBySide[side]) {
      buildPanelShell(side, version);
    }
    return fetchPanelData(side, version);
  }

  function showClickPopupContent(popup, item, point) {
    var metaEl = popup.querySelector('.compare-ann-click-popup-meta');
    var bodyEl = popup.querySelector('.compare-ann-click-popup-body');
    metaEl.textContent = popupMetaLine(item);
    bodyEl.className = 'compare-ann-click-popup-body';
    bodyEl.textContent = item.message && String(item.message).trim() ? item.message : '(no note)';
    positionClickPopup(popup, point);
  }

  function showClickPopupLoading(popup, point) {
    var metaEl = popup.querySelector('.compare-ann-click-popup-meta');
    var bodyEl = popup.querySelector('.compare-ann-click-popup-body');
    metaEl.textContent = 'Annotation';
    bodyEl.className = 'compare-ann-click-popup-body is-loading';
    bodyEl.textContent = 'Loading…';
    positionClickPopup(popup, point);
  }

  function showClickPopupError(popup, message, point) {
    var metaEl = popup.querySelector('.compare-ann-click-popup-meta');
    var bodyEl = popup.querySelector('.compare-ann-click-popup-body');
    metaEl.textContent = 'Annotation';
    bodyEl.className = 'compare-ann-click-popup-body is-error';
    bodyEl.textContent = message;
    positionClickPopup(popup, point);
  }

  function showAnnotationPopup(panelIndex, annotationId, clickPoint) {
    var side = config.getFoldoutSideForPanelIndex
      ? config.getFoldoutSideForPanelIndex(toPanelIndex(panelIndex))
      : null;
    if (!side || !annotationId) {
      return;
    }
    var now = Date.now();
    if (lastPopupShown.id === String(annotationId) && now - lastPopupShown.at < 120) {
      return;
    }
    lastPopupShown = { id: String(annotationId), at: now };

    var version = config.getVersionForSide ? config.getVersionForSide(side) : null;
    var point = resolveClickPoint(annotationId, clickPoint || lastPreviewClickPoint);
    var popup = getClickPopupEl();
    var cachedItem = findAnnotationById(side, annotationId);

    emitActiveOnPanel(panelIndex, annotationId);

    suppressPopupDismiss = true;
    setTimeout(function () {
      suppressPopupDismiss = false;
    }, 150);

    if (cachedItem) {
      showClickPopupContent(popup, cachedItem, point);
      return;
    }

    showClickPopupLoading(popup, point);
    ensureSideDataLoaded(side, version).then(function () {
      var item = findAnnotationById(side, annotationId);
      if (item) {
        showClickPopupContent(popup, item, point);
      } else {
        showClickPopupError(popup, 'Note text not loaded yet. Open Annotations for the full list or try Refresh.', point);
      }
    }).catch(function (err) {
      showClickPopupError(popup, err.message || 'Could not load annotation.', point);
    });
  }

  function syncFoldoutSelectionIfOpen(panelIndex, annotationId) {
    var side = config.getFoldoutSideForPanelIndex
      ? config.getFoldoutSideForPanelIndex(toPanelIndex(panelIndex))
      : null;
    if (!side) {
      return;
    }
    var foldout = config.getCompareFoldoutSidebar ? config.getCompareFoldoutSidebar() : null;
    if (foldout && foldout.openSide === side && findAnnotationById(side, annotationId)) {
      selectedIdBySide[side] = String(annotationId);
      renderList(side);
    }
  }

  function openFoldoutForPanel(panelIndex, annotationId) {
    var side = config.getFoldoutSideForPanelIndex
      ? config.getFoldoutSideForPanelIndex(toPanelIndex(panelIndex))
      : null;
    if (!side) {
      return;
    }
    var foldout = config.getCompareFoldoutSidebar ? config.getCompareFoldoutSidebar() : null;
    var version = config.getVersionForSide ? config.getVersionForSide(side) : null;

    function afterLoad() {
      if (annotationId) {
        if (findAnnotationById(side, annotationId)) {
          selectItem(side, String(annotationId), false);
        } else {
          renderList(side);
          if (uiBySide[side] && uiBySide[side].listEl) {
            var note = document.createElement('p');
            note.className = 'compare-ann-status';
            note.textContent = 'This mark-up is in the preview but not in the list yet. Try Refresh.';
            uiBySide[side].listEl.insertBefore(note, uiBySide[side].listEl.firstChild);
          }
        }
      }
    }

    if (!cacheBySide[side] || cacheBySide[side].versionId !== (version && version.id)) {
      loadPanelData(side, version).then(afterLoad);
    } else {
      afterLoad();
    }

    if (foldout && foldout.openSide !== side) {
      foldout.open(side);
    }
  }

  function handlePreviewAnnotationActive(panelIndex, evt) {
    var normalized = evt && typeof evt === 'object' ? evt : { annotationId: evt };
    var annotationId = normalized.annotationId || normalized.id;
    if (!annotationId) {
      return;
    }
    if (skipNextActivePopup) {
      skipNextActivePopup = false;
      syncFoldoutSelectionIfOpen(panelIndex, String(annotationId));
      return;
    }
    log('preview click annotation ' + annotationId + ' panel ' + panelIndex);
    showAnnotationPopup(panelIndex, String(annotationId), lastPreviewClickPoint);
    lastPreviewClickPoint = null;
  }

  function removeCompareListeners(boxAnnotations, key) {
    if (!boxAnnotations || !boxAnnotations._compareAnnHandlers) {
      return;
    }
    var prev = boxAnnotations._compareAnnHandlers[key];
    if (!prev || typeof boxAnnotations.removeListener !== 'function') {
      return;
    }
    try {
      boxAnnotations.removeListener(prev.event, prev.handler);
    } catch (ignoreErr) {
      log('remove listener skipped');
    }
    boxAnnotations._compareAnnHandlers[key] = null;
  }

  function addCompareListener(boxAnnotations, event, key, handler) {
    if (!boxAnnotations || typeof boxAnnotations.addListener !== 'function') {
      return;
    }
    if (!boxAnnotations._compareAnnHandlers) {
      boxAnnotations._compareAnnHandlers = {};
    }
    removeCompareListeners(boxAnnotations, key);
    boxAnnotations._compareAnnHandlers[key] = { event: event, handler: handler };
    boxAnnotations.addListener(event, handler);
  }

  function wireBoxAnnotations(panelIndex, boxAnnotations) {
    if (!boxAnnotations || typeof boxAnnotations.addListener !== 'function') {
      return;
    }
    var idx = toPanelIndex(panelIndex);
    addCompareListener(boxAnnotations, 'annotations_active_change', 'active', function (e) {
      handlePreviewAnnotationActive(idx, e);
    });
    addCompareListener(boxAnnotations, 'annotations_create', 'create', function () {
      onAnnotationListChanged(idx);
    });
    addCompareListener(boxAnnotations, 'annotations_remove', 'remove', function () {
      onAnnotationListChanged(idx);
    });
    log('wired BoxAnnotations panel ' + idx);
  }

  function extractIdFromDomTarget(target) {
    if (!target || !target.closest) {
      return null;
    }
    var el = target.closest('[data-resin-itemid], .ba-RegionAnnotation, .ba-PointAnnotation');
    if (!el) {
      return null;
    }
    return el.getAttribute('data-resin-itemid') || null;
  }

  function handlePreviewDomEvent(evt) {
    var panelEl = evt.target && evt.target.closest ? evt.target.closest('.preview-panel') : null;
    if (!panelEl) {
      return;
    }
    var panelIndex = -1;
    if (panelEl.id === 'previewPanelLeft') {
      panelIndex = 0;
    } else if (panelEl.id === 'previewPanelCenter') {
      panelIndex = 1;
    } else if (panelEl.id === 'previewPanelRight') {
      panelIndex = 2;
    }
    if (panelIndex < 0) {
      return;
    }
    lastPreviewClickPoint = { x: evt.clientX, y: evt.clientY };
    var id = extractIdFromDomTarget(evt.target);
    if (!id) {
      return;
    }
    handlePreviewAnnotationActive(panelIndex, { annotationId: id });
  }

  function bindPreviewClicks() {
    if (previewDomBound) {
      return;
    }
    var stage = document.getElementById('compareStage');
    if (!stage) {
      return;
    }
    stage.addEventListener('click', handlePreviewDomEvent, true);
    previewDomBound = true;
  }

  function enhancePreviewOptions(options, panelIndex, boxAnnotations) {
    bindPreviewClicks();
    var prevOnAnnotator = options.onAnnotator;
    options.onAnnotator = function (annotator) {
      if (typeof prevOnAnnotator === 'function') {
        prevOnAnnotator(annotator);
      }
      var inst = annotator || boxAnnotations;
      if (inst) {
        wireBoxAnnotations(panelIndex, inst);
      }
    };
    if (boxAnnotations) {
      wireBoxAnnotations(panelIndex, boxAnnotations);
    }
    return options;
  }

  function invalidateAll() {
    cacheBySide.left = null;
    cacheBySide.right = null;
    uiBySide.left = null;
    uiBySide.right = null;
    selectedIdBySide.left = null;
    selectedIdBySide.right = null;
    dismissClickPopup();
  }

  function setPlaceholder(side) {
    var bodyEl = getBodyEl(side);
    if (bodyEl) {
      bodyEl.innerHTML = '<p class="sidebar-placeholder">Open Annotations for notes on this version.</p>';
    }
  }

  global.CompareFoldoutAnnotations = {
    configure: configure,
    onPanelOpen: onPanelOpen,
    enhancePreviewOptions: enhancePreviewOptions,
    wireBoxAnnotations: wireBoxAnnotations,
    invalidateAll: invalidateAll,
    setPlaceholder: setPlaceholder,
    openFoldoutForPanel: openFoldoutForPanel,
    showAnnotationPopup: showAnnotationPopup,
    dismissClickPopup: dismissClickPopup,
    refreshPanel: refreshPanel
  };
})(typeof window !== 'undefined' ? window : this);
