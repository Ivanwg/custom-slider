

export interface ITimerInterval {
  timer?: NodeJS.Timer;
  clear: () => void;
}


export function interval(cb: () => void, ms: number){
  const a: ITimerInterval= {
    clear : function() {
      clearTimeout(a.timer)
    }
  };
  (function run(){
    // cb();
    a.timer = setTimeout(run, ms);
    // if (timeLeft <= 0) a.clear();
  })();
  
  return a;
}