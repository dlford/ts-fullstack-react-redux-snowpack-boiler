import styled from '@emotion/styled';

import parseCssProp from '~/lib/parseCssProp';

export interface MinWidthProps {
  width: string | number;
}

export default styled.div<MinWidthProps>`
  max-width: 100%;
  min-width: ${({ width }: MinWidthProps) => parseCssProp(width)};
`;
