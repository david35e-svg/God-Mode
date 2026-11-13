// מסגרת HUD קבועה מסביב למסך, כמו בממשק של משחק. דקורטיבית בלבד.
export function Hud() {
  return (
    <div className="hud" aria-hidden>
      <span className="hud-c tl" /><span className="hud-c tr" />
      <span className="hud-c bl" /><span className="hud-c br" />
      <span className="hud-scan" />
    </div>
  );
}
