type Bridge = {
  stop: () => void;
  start: () => void;
  scrollTo: (target: number, opts?: { immediate?: boolean }) => void;
};

let bridge: Bridge | null = null;

export function registerLenis(next: Bridge | null) {
  bridge = next;
}

export function stopLenis() {
  bridge?.stop();
}

export function startLenis() {
  bridge?.start();
}

export function scrollTopImmediate() {
  if (bridge) bridge.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}
