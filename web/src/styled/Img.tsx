import styled from '@emotion/styled';

import parseCssProp from '~/lib/parseCssProp';

export interface ImgProps {
  width: number | string;
  height: number | string;
}

export default styled.img<ImgProps>`
  width: ${({ width }) => parseCssProp(width)};
  height: ${({ height }) => parseCssProp(height)};
  max-width: 100%;
  margin: 0 auto;
`;
