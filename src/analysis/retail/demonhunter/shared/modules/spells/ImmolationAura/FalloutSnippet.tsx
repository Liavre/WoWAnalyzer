import { useInfo } from 'interface/guide';
import { TALENTS_DEMON_HUNTER } from 'common/TALENTS/demonhunter';
import { SpellLink } from 'interface';
import SPELLS from 'common/SPELLS/demonhunter';

const FalloutSnippet = () => {
  const info = useInfo();
  if (!info || !info.combatant.hasTalent(TALENTS_DEMON_HUNTER.FALLOUT_TALENT)) {
    // This is intentionally an empty fragment.
    return <></>;
  }
  return (
    <>
      {' '}
      and having a chance to shatter a <SpellLink spell={SPELLS.SOUL_FRAGMENT} /> with{' '}
      <SpellLink spell={TALENTS_DEMON_HUNTER.FALLOUT_TALENT} />
    </>
  );
};

export default FalloutSnippet;
