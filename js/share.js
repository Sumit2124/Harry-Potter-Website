(function () {
  const setButtonState = (button, label) => {
    if (!button) return;
    const original = button.dataset.originalLabel || button.textContent;
    button.dataset.originalLabel = original;
    button.textContent = label;
    window.setTimeout(() => { button.textContent = original; }, 2200);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
    document.body.append(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
    field.remove();
    return copied;
  };

  const share = async (text, button) => {
    const url = location.href;
    const message = `${text}\n\nExplore The Wizarding Archive: ${url}`;
    const canUseNativeShare = typeof navigator.share === 'function'
      && window.isSecureContext
      && /^https?:$/.test(location.protocol);
    if (canUseNativeShare) {
      try {
        await navigator.share({ title: 'The Wizarding Archive', text, url });
        setButtonState(button, 'Shared ✦');
        return true;
      } catch (error) {
        if (error && error.name === 'AbortError') return false;
      }
    }
    const copied = await copyText(message);
    if (copied) {
      setButtonState(button, 'Copied to clipboard');
      return true;
    }
    window.prompt('Copy your result to share it:', message);
    return false;
  };

  const attach = (root = document) => {
    root.querySelectorAll('[data-share]').forEach(button => {
      if (button.dataset.shareReady) return;
      button.dataset.shareReady = 'true';
      button.addEventListener('click', () => share(button.dataset.share, button));
    });
  };

  window.archiveShare = { share, attach };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => attach());
  else attach();
})();
