/* Paste into the single reports/*.html <script> — do not add a separate .js file in the target project. */
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-prompt-item]'));
  var modal = document.getElementById('modal');
  var out = document.getElementById('prompt-out');
  var projectName = document.querySelector('h1') ? document.querySelector('h1').textContent.trim() : 'this project';

  function parseData(card) {
    var el = card.querySelector('.agent-data');
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch (e) { return null; }
  }

  function formatItem(d) {
    var lines = [];
    if (d.priority) lines.push(d.priority);
    if (d.title) lines.push(d.title);
    if (d.priority || d.title) lines.push('');
    if (d.body) lines.push(d.body);
    return lines.join('\n');
  }

  function isChecked(card) {
    var cb = card.querySelector('input[type="checkbox"]');
    return cb && cb.checked;
  }

  function selected() {
    return items.filter(isChecked).map(function (card) {
      return { kind: card.getAttribute('data-kind'), data: parseData(card) };
    }).filter(function (x) { return x.data; });
  }

  function updateCount() {
    var n = selected().length;
    var dock = document.getElementById('dock-meta');
    if (dock) dock.textContent = String(n);
  }

  function copyText(text, btn) {
    function ok() {
      if (!btn) return;
      var old = btn.textContent;
      btn.textContent = '✓';
      setTimeout(function () { btn.textContent = old; }, 1200);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok).catch(function () { fallback(text); ok(); });
    } else {
      fallback(text); ok();
    }
  }

  function fallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { }
    document.body.removeChild(ta);
  }

  items.forEach(function (card) {
    var cb = card.querySelector('input[type="checkbox"]');
    if (cb) cb.addEventListener('change', updateCount);

    var data = parseData(card);
    var opt = card.querySelector('.prompt-opt');
    if (!data || !opt) return;

    var details = document.createElement('details');
    details.className = 'spoiler';
    details.innerHTML =
      '<summary>Agent text</summary>' +
      '<div class="spoiler-body">' +
      '<pre class="spoiler-text"></pre>' +
      '<button type="button" class="copy-one">Copy</button>' +
      '</div>';
    var pre = details.querySelector('.spoiler-text');
    pre.textContent = formatItem(data);
    details.querySelector('.copy-one').addEventListener('click', function (e) {
      e.preventDefault();
      copyText(pre.textContent, this);
    });
    opt.insertAdjacentElement('afterend', details);
  });
  updateCount();

  function section(title, list) {
    if (!list.length) return '';
    return '\n\n' + title + '\n\n' + list.map(function (x, i) {
      return (i + 1) + '.\n' + formatItem(x.data);
    }).join('\n\n');
  }

  function buildPrompt() {
    var sel = selected();
    var instruction = [
      'After this architecture audit of "' + projectName + '" (TypeScript full-stack/SPA), create a remediation plan.',
      '',
      'Do not rewrite the whole codebase.',
      'Do not fix everything at once.',
      'Prefer FIX NOW before FIX SOON.',
      'Respect KEEP constraints.',
      'WATCH items are for awareness only unless the plan needs them.',
      'After the plan, wait for confirmation before implementing unless the user already asked to implement.'
    ].join('\n');

    return [
      instruction,
      section('Problems', sel.filter(function (x) { return x.kind === 'problem'; })),
      section('Do not break', sel.filter(function (x) { return x.kind === 'keep'; })),
      section('Watch', sel.filter(function (x) { return x.kind === 'watch'; })),
      section('Context', sel.filter(function (x) { return x.kind === 'context'; }))
    ].filter(Boolean).join('') + '\n';
  }

  document.getElementById('btn-build').addEventListener('click', function () {
    out.value = buildPrompt();
    modal.classList.add('open');
  });
  document.getElementById('btn-close').addEventListener('click', function () {
    modal.classList.remove('open');
  });
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });
  document.getElementById('btn-copy-all').addEventListener('click', function () {
    copyText(out.value, this);
  });
})();
