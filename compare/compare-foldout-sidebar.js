/**
 * CompareFoldoutSidebar — Details rails in compare margins; panels are fixed overlays.
 * Triggers live in #compareStage; panels in #compareDetailsOverlay (no preview resize).
 */
(function (global) {
  'use strict';

  var SIDES = ['left', 'right'];
  var PANEL_IDS = {
    left: 'compareFoldoutPanel-left',
    right: 'compareFoldoutPanel-right'
  };

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  function CompareFoldoutSidebar(stageEl, overlayEl) {
    this.stageEl = stageEl;
    this.overlayEl = overlayEl;
    this.panels = {};
    this.openSide = null;
    this.onPanelOpen = null;
    this._onStageClick = this._handleStageClick.bind(this);
    this._onOverlayClick = this._handleOverlayClick.bind(this);
    this._onKeydown = this._handleKeydown.bind(this);
    this._cachePanels();
    this._bind();
  }

  CompareFoldoutSidebar.prototype._cachePanels = function () {
    var self = this;
    SIDES.forEach(function (side) {
      var foldout = self.stageEl.querySelector('[data-compare-foldout="' + side + '"]');
      var panelId = PANEL_IDS[side];
      var panel = self.overlayEl
        ? self.overlayEl.querySelector('#' + panelId)
        : null;
      if (!foldout || !panel) {
        return;
      }
      self.panels[side] = {
        foldout: foldout,
        panel: panel,
        trigger: foldout.querySelector('.compare-foldout-trigger'),
        body: panel.querySelector('[data-compare-foldout-body="' + side + '"]')
      };
    });
  };

  CompareFoldoutSidebar.prototype._bind = function () {
    this.stageEl.addEventListener('click', this._onStageClick);
    if (this.overlayEl) {
      this.overlayEl.addEventListener('click', this._onOverlayClick);
    }
    document.addEventListener('keydown', this._onKeydown);
  };

  CompareFoldoutSidebar.prototype._setOverlayActive = function (active) {
    if (!this.overlayEl) {
      return;
    }
    if (active) {
      this.overlayEl.classList.add('is-active');
      this.overlayEl.removeAttribute('hidden');
      this.overlayEl.setAttribute('aria-hidden', 'false');
    } else {
      this.overlayEl.classList.remove('is-active');
      this.overlayEl.setAttribute('hidden', '');
      this.overlayEl.setAttribute('aria-hidden', 'true');
    }
  };

  CompareFoldoutSidebar.prototype._handleStageClick = function (evt) {
    var target = evt.target;
    if (!target || !target.closest) {
      return;
    }

    var trigger = target.closest('.compare-foldout-trigger');
    if (!trigger) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();

    var foldout = trigger.closest('[data-compare-foldout]');
    var side = foldout && foldout.getAttribute('data-compare-foldout');
    if (!side || !this.panels[side]) {
      console.log('Compare foldout: click ignored (side=' + side + ')');
      return;
    }
    this.toggle(side);
  };

  CompareFoldoutSidebar.prototype._handleOverlayClick = function (evt) {
    var target = evt.target;
    if (!target || !target.closest) {
      return;
    }

    if (target.closest('.compare-foldout-panel-close')) {
      evt.preventDefault();
      evt.stopPropagation();
      if (this.openSide) {
        this.close(this.openSide);
      }
      return;
    }

    if (target.classList.contains('compare-foldout-backdrop') && this.openSide) {
      evt.preventDefault();
      this.close(this.openSide);
    }
  };

  CompareFoldoutSidebar.prototype._handleKeydown = function (evt) {
    if (evt.key === 'Escape' && this.openSide) {
      this.close(this.openSide);
    }
  };

  CompareFoldoutSidebar.prototype.open = function (side) {
    var rec = this.panels[side];
    if (!rec || !rec.panel || !rec.trigger) {
      return;
    }
    if (this.openSide && this.openSide !== side) {
      this.close(this.openSide);
    }
    this._setOverlayActive(true);
    rec.panel.classList.add('is-open');
    rec.panel.removeAttribute('hidden');
    rec.trigger.classList.add('is-open');
    rec.trigger.setAttribute('aria-expanded', 'true');
    this.openSide = side;
    if (typeof this.onPanelOpen === 'function') {
      this.onPanelOpen(side);
    }
  };

  CompareFoldoutSidebar.prototype.close = function (side) {
    var rec = this.panels[side];
    if (!rec || !rec.panel || !rec.trigger) {
      return;
    }
    rec.panel.classList.remove('is-open');
    rec.panel.setAttribute('hidden', '');
    rec.trigger.classList.remove('is-open');
    rec.trigger.setAttribute('aria-expanded', 'false');
    if (this.openSide === side) {
      this.openSide = null;
    }
    if (!this.openSide) {
      this._setOverlayActive(false);
    }
  };

  CompareFoldoutSidebar.prototype.toggle = function (side) {
    if (this.openSide === side) {
      this.close(side);
    } else {
      this.open(side);
    }
  };

  CompareFoldoutSidebar.prototype.loadContent = function (side, content) {
    var rec = this.panels[side];
    if (!rec || !rec.body) {
      return;
    }
    if (typeof content === 'string') {
      rec.body.innerHTML = content;
      return;
    }
    rec.body.innerHTML = '';
    if (content && content.nodeType === 1) {
      rec.body.appendChild(content);
    }
  };

  CompareFoldoutSidebar.prototype.setTitle = function (side, title) {
    var rec = this.panels[side];
    if (!rec || !rec.panel) {
      return;
    }
    var titleEl = rec.panel.querySelector('.compare-foldout-panel-title');
    if (titleEl) {
      titleEl.textContent = title;
    }
  };

  CompareFoldoutSidebar.prototype.destroy = function () {
    this.stageEl.removeEventListener('click', this._onStageClick);
    if (this.overlayEl) {
      this.overlayEl.removeEventListener('click', this._onOverlayClick);
    }
    document.removeEventListener('keydown', this._onKeydown);
    this.openSide = null;
    this.panels = {};
    this._setOverlayActive(false);
  };

  function buildVersionMetaHtml(version) {
    if (!version) {
      return '<p class="sidebar-placeholder">No version loaded for this side.</p>';
    }
    var userName = 'Unknown';
    var userEmail = '';
    if (version.modified_by) {
      userName = version.modified_by.name || userName;
      userEmail = version.modified_by.login || '';
    }
    var modified = version.modified_at || version.created_at || '';
    return (
      '<ul class="compare-foldout-meta-list">' +
      '<li><span class="compare-foldout-meta-label">Version</span>' +
      '<span class="compare-foldout-meta-value">Version ' +
      escapeHtml(String(version.versionNumber)) +
      (version.isCurrent ? ' (Current)' : '') +
      '</span></li>' +
      '<li><span class="compare-foldout-meta-label">Modified</span>' +
      '<span class="compare-foldout-meta-value">' +
      escapeHtml(modified) +
      '</span></li>' +
      '<li><span class="compare-foldout-meta-label">User</span>' +
      '<span class="compare-foldout-meta-value">' +
      escapeHtml(userName) +
      (userEmail ? '<br>' + escapeHtml(userEmail) : '') +
      '</span></li>' +
      '<li><span class="compare-foldout-meta-label">Version ID</span>' +
      '<span class="compare-foldout-meta-value"><code>' +
      escapeHtml(version.id) +
      '</code></span></li>' +
      '</ul>'
    );
  }

  function mount(stageEl, overlayEl) {
    if (!stageEl) {
      console.log('Compare foldout: no #compareStage element');
      return null;
    }
    overlayEl = overlayEl || document.getElementById('compareDetailsOverlay');
    if (!overlayEl) {
      console.log('Compare foldout: no #compareDetailsOverlay element');
      return null;
    }
    var instance = new CompareFoldoutSidebar(stageEl, overlayEl);
    var bound = SIDES.filter(function (s) {
      return !!instance.panels[s];
    });
    if (bound.length < 1) {
      console.log('Compare foldout: no fold-out panels found');
      return null;
    }
    return instance;
  }

  global.CompareFoldoutSidebar = CompareFoldoutSidebar;
  global.CompareFoldoutSidebar.mount = mount;
  global.CompareFoldoutSidebar.buildVersionMetaHtml = buildVersionMetaHtml;
  global.CompareFoldoutSidebar.SIDES = SIDES;
})(typeof window !== 'undefined' ? window : this);
