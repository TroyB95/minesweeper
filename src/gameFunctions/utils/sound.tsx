export function playSound(soundFile: string, volume: number): void {
  const sound = new Audio(soundFile);
  sound.volume = volume;
  sound.play();
  sound.currentTime = 0;
}
