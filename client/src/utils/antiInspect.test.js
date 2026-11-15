import { describe, it, expect, vi, beforeEach } from 'vitest';
import { initInspectProtection } from './antiInspect';

describe('antiInspect Utility', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('adds contextmenu and keydown event listeners', () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    initInspectProtection();

    expect(addEventListenerSpy).toHaveBeenCalledWith('contextmenu', expect.any(Function), { capture: true });
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function), { capture: true });
  });

  it('prevents default on F12 keydown', () => {
    initInspectProtection();

    const event = new KeyboardEvent('keydown', { key: 'F12', cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    document.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('prevents default on Ctrl+Shift+I keydown', () => {
    initInspectProtection();

    const event = new KeyboardEvent('keydown', {
      key: 'I',
      ctrlKey: true,
      shiftKey: true,
      cancelable: true
    });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    document.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('prevents default on right click on general elements', () => {
    initInspectProtection();

    const div = document.createElement('div');
    document.body.appendChild(div);

    const event = new MouseEvent('contextmenu', { cancelable: true, bubbles: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    div.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('allows right click inside input text fields for copy/paste', () => {
    initInspectProtection();

    const input = document.createElement('input');
    document.body.appendChild(input);

    const event = new MouseEvent('contextmenu', { cancelable: true, bubbles: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    input.dispatchEvent(event);
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });
});

