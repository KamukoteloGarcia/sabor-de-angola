// Scroll entrance from alternating sides (see .reveal-left / .reveal-right in globals.css):
// even items come in from the left, odd ones from the right, so a grid fits together.
export const revealFromSide = (index: number) => (index % 2 === 0 ? "reveal-left" : "reveal-right");
