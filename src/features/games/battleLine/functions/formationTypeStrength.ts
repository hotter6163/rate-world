import { FormationType } from '../types';

export const formationTypeStrength = (formationType: FormationType) =>
  ({
    [FormationType.WEDGE]: 5,
    [FormationType.PHALANX]: 4,
    [FormationType.BATTALION]: 3,
    [FormationType.SKIRMISHER]: 2,
    [FormationType.HOST]: 1,
    [FormationType.NONE]: 0,
  }[formationType]);
