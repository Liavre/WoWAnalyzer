import React from 'react';

import SPELLS from 'common/SPELLS/index';
import { formatPercentage } from 'common/format';
import { calculateAzeriteEffects } from 'common/stats';
import Analyzer from 'parser/core/Analyzer';
import TraitStatisticBox, { STATISTIC_ORDER } from 'interface/others/TraitStatisticBox';
import StatTracker from 'parser/shared/modules/StatTracker';

const bloodRiteStats = traits => Object.values(traits).reduce((obj, rank) => {
  const [haste] = calculateAzeriteEffects(SPELLS.BLOOD_RITE.id, rank);
  obj.haste += haste;
  return obj;
}, {
  haste: 0,
});

/**
 * Blood Rite
 * Gain x haste while active
 *
 * Example report: https://www.warcraftlogs.com/reports/k4bAJZKWVaGt12j9#fight=3&type=auras&source=14
 */
class BloodRite extends Analyzer {
  static dependencies = {
    statTracker: StatTracker,
  };

  haste = 0;
  bloodRiteProcs = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTrait(SPELLS.BLOOD_RITE.id);
    if (!this.active) {
      return;
    }

    const { haste } = bloodRiteStats(this.selectedCombatant.traitsBySpellId[SPELLS.BLOOD_RITE.id]);
    this.haste = haste;

    this.statTracker.add(SPELLS.BLOOD_RITE_BUFF.id, {
      haste,
    });
  }

  on_byPlayer_applybuff(event) {
    this.handleBuff(event);
  }

  on_byPlayer_refreshbuff(event) {
    this.handleBuff(event);
  }

  handleBuff(event) {
    if (event.ability.guid !== SPELLS.BLOOD_RITE_BUFF.id) {
      return;
    }

    this.bloodRiteProcs += 1;
  }

  get uptime() {
    return this.selectedCombatant.getBuffUptime(SPELLS.BLOOD_RITE_BUFF.id) / this.owner.fightDuration;
  }

  get averageHaste() {
    return (this.haste * this.uptime).toFixed(0);
  }

  statistic() {
    return (
      <TraitStatisticBox
        position={STATISTIC_ORDER.OPTIONAL()}
        trait={SPELLS.BLOOD_RITE.id}
        value={`${this.averageHaste} average Haste`}
        tooltip={(<>
          {SPELLS.BLOOD_RITE.name} grants <strong>{this.haste} Haste</strong> while active.<br />
          You had <strong>{this.bloodRiteProcs} {SPELLS.BLOOD_RITE.name} procs</strong> resulting in {formatPercentage(this.uptime)}% uptime.
        </>)}
      />
    );
  }
}

export default BloodRite;
