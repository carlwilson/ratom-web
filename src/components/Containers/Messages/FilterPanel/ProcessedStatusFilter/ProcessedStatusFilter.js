import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

// Context
import { AccountContext } from '../../MessagesMain';

// Utils
import formatNumber from '../../../../../util/formatNumber';

// Children
import { FilterPanelItem } from '../FilterPanelItem';
import Radio from '../../../../Components/Inputs/Radio';

const ALL = 'All';
const PROCESSED = 'Processed';
const UNPROCESSED = 'Unprocessed';

const ProcessedStatusFilter = () => {
  const { setFilterQuery, filterQuery, facets } = useContext(AccountContext);
  const { processedStatus } = filterQuery;
  const [selected, setSelected] = useState(processedStatus);
  const [processedFacets, setProcessedFacets] = useState({
    [PROCESSED]: 0,
    [UNPROCESSED]: 0
  });

  const options = [
    { name: ALL, accessor: ALL },
    { name: PROCESSED, accessor: PROCESSED, extra: formatNumber(processedFacets[PROCESSED]) },
    { name: UNPROCESSED, accessor: UNPROCESSED, extra: formatNumber(processedFacets[UNPROCESSED]) }
  ];

  const handleChange = e => {
    setSelected(e.target.value);
    setFilterQuery({
      ...filterQuery,
      processedStatus: e.target.value
    });
  };

  const _getUnfacetedValue = facetedValue => {
    const total = facets._filter_processed.doc_count;
    return total - parseInt(facetedValue, 10);
  };

  useEffect(() => {
    if (facets && facets._filter_processed) {
      const processedFacetsIncoming = facets._filter_processed.processed.buckets;
      const newProcessedFacets = { ...processedFacets };

      const trues = processedFacetsIncoming.find(fac => fac.key_as_string === 'true');
      const falses = processedFacetsIncoming.find(fac => fac.key_as_string === 'false');

      if (trues && falses) {
        newProcessedFacets.Processed = trues.doc_count;
        newProcessedFacets.Unprocessed = falses.doc_count;
      }
      if (falses && !trues) {
        newProcessedFacets.Unprocessed = falses.doc_count;
        newProcessedFacets.Processed = _getUnfacetedValue(falses.doc_count);
      }
      if (trues && !falses) {
        newProcessedFacets.Processed = trues.doc_count;
        newProcessedFacets.Unprocessed = _getUnfacetedValue(trues.doc_count);
      }

      setProcessedFacets(newProcessedFacets);
    }
  }, [facets]);

  return (
    <ProcessedStatusFilterStyled data-cy="processed_status_widget">
      <h3>Processed status</h3>
      <RadioStyled
        options={options}
        selected={selected}
        name="messageProcessed"
        onChange={handleChange}
      />
    </ProcessedStatusFilterStyled>
  );
};

const ProcessedStatusFilterStyled = styled(FilterPanelItem)`
  display: flex;
  flex-direction: column;
  height: 18rem;

  h3 {
    margin-bottom: 1.5rem;
  }
`;

const RadioStyled = styled(Radio)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0;
`;

export default ProcessedStatusFilter;
