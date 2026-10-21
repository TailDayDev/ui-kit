import type { ReactElement } from 'react';
/** Settings row: title and caption on the left, a control on the right. */
export interface InfoRowProps {
    /** Trailing control (switch, button, value). Never shrinks. */
    children: ReactElement;
    /** Row title (`headline/regular`). */
    title: string;
    /** Caption under the title (`caption/regular`). Hidden when empty. */
    description: string;
}
//# sourceMappingURL=InfoRow.types.d.ts.map