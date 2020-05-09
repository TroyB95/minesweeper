export function playSound(soundFile: any, volume: number) {
  const sound = new Audio(soundFile);
  sound.volume = volume;
  sound.play();
  sound.currentTime = 0;
}
