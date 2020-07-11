export function playSound(soundFile: string, volume: number): void {
  const sound = new Audio(soundFile);
  sound.volume = volume;
  sound.play();
  sound.currentTime = 0;
}

export function toggleSound(sound: number): number | undefined {
  switch (sound) {
    case 1:
      return 0.7;
    case 0.7:
      return 0.3;
    case 0.3:
      return 0;
    case 0:
      return 1;
  }
}
