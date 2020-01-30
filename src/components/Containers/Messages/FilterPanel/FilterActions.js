import React, { useContext } from 'react';
import styled from 'styled-components';
import { borderSeparator } from '../../../../styles/styleVariables';

// Util
import emptyQuery from '../emptyQuery';

// Components
import Button from '../../../Components/Buttons/Button';

// Context
import { CollectionContext } from '../MessagesMain';

const FilterActions = ({ sendQuery }) => {
  const { clearFilters } = useContext(CollectionContext);

  return (
    <FilterActionsStyled>
      <Button neutral small onClick={clearFilters}>
        Reset
      </Button>
      <Button positive small onClick={sendQuery}>
        Apply
      </Button>
    </FilterActionsStyled>
  );
};

const FilterActionsStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 3rem 0;
  border-bottom: ${borderSeparator};
`;

export default FilterActions;
