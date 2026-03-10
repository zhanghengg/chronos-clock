'use client';

import { AnalogClock } from './AnalogClock';
import { DigitalClock } from './DigitalClock';
import { WorldClocks } from './WorldClocks';
import type { TimeTick } from '@/hooks/useTime';

type Props = {
  tick: TimeTick;
  mounted: boolean;
};

export function ClockPage({ tick, mounted }: Props) {
  return (
    <div className="animate-fade-in-up">
      <div className="glass rounded-2xl p-6 sm:p-8 shadow-theme">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Analog */}
          <div className="w-full max-w-[280px] flex-shrink-0">
            <AnalogClock hours={tick.hours} minutes={tick.minutes} seconds={tick.seconds} />
          </div>

          {/* Digital */}
          <div className="flex-1 w-full">
            <DigitalClock
              hours={tick.hours}
              minutes={tick.minutes}
              seconds={tick.seconds}
              date={tick.date}
              mounted={mounted}
            />
          </div>
        </div>
      </div>

      <WorldClocks />
    </div>
  );
}
