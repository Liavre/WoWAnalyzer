import SPELLS from 'common/SPELLS/classic/hunter';
import CoreAbilities from 'parser/core/modules/Abilities';
import SPELL_CATEGORY from 'parser/core/SPELL_CATEGORY';
import RACIALS from 'common/SPELLS/classic/racials';

class Abilities extends CoreAbilities {
  spellbook() {
    return [
      // Rotational
      // KILL_SHOT is handled in shared KillShot.ts because it only is valid in execute phase
      {
        spell: SPELLS.AUTO_SHOT.id,
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: null,
      },
      {
        spell: [SPELLS.SERPENT_STING.id, ...SPELLS.SERPENT_STING.lowRanks],
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: { base: 1500 },
      },
      {
        spell: [SPELLS.EXPLOSIVE_SHOT.id, ...SPELLS.EXPLOSIVE_SHOT.lowRanks],
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: { base: 1500 },
      },
      {
        spell: [SPELLS.BLACK_ARROW.id, ...SPELLS.BLACK_ARROW.lowRanks],
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: { base: 1500 },
        // 1/3 resources reduces cooldown by 2 seconds
        // cooldown: 30,
        cooldown: 28,
      },
      {
        spell: [SPELLS.EXPLOSIVE_TRAP.id, ...SPELLS.EXPLOSIVE_TRAP.lowRanks],
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: { base: 1500 },
      },
      {
        spell: [SPELLS.AIMED_SHOT.id, ...SPELLS.AIMED_SHOT.lowRanks],
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: { base: 1500 },
        cooldown: 10,
      },
      {
        spell: [SPELLS.MULTI_SHOT.id, ...SPELLS.MULTI_SHOT.lowRanks],
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: { base: 1500 },
        cooldown: 10,
      },
      {
        spell: [SPELLS.STEADY_SHOT.id, ...SPELLS.STEADY_SHOT.lowRanks],
        category: SPELL_CATEGORY.ROTATIONAL,
        gcd: { base: 1500 },
      },

      // Rotational AOE

      // Cooldowns
      {
        spell: [SPELLS.RAPID_FIRE.id],
        category: SPELL_CATEGORY.COOLDOWNS,
        gcd: null,
        cooldown: 300,
      },
      {
        spell: RACIALS.BERSERKING.id,
        buffSpellId: RACIALS.BERSERKING.id,
        category: SPELL_CATEGORY.COOLDOWNS,
        cooldown: 180,
        isUndetectable: true,
        gcd: null,
        castEfficiency: {
          suggestion: true,
          majorIssueEfficiency: 0.2,
          averageIssueEfficiency: 0.5,
          recommendedEfficiency: 0.7,
        },
      },

      // Defensive
      {
        spell: [SPELLS.DISENGAGE.id],
        category: SPELL_CATEGORY.DEFENSIVE,
        gcd: null,
        cooldown: 25,
      },

      // Other spells (not apart of the normal rotation)
      {
        spell: [SPELLS.LOCK_AND_LOAD.id],
        category: SPELL_CATEGORY.UTILITY,
        gcd: null,
      },

      // Utility

      // Pet Related
      {
        spell: [SPELLS.KILL_COMMAND.id],
        category: SPELL_CATEGORY.UTILITY,
        gcd: null,
      },

      // Consumable
    ];
  }
}

export default Abilities;
