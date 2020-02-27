import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import dateToIso from '../../../../util/dateToIso';

// Components
import { AccountContext } from '../MessagesMain';
import { FilterPanelItem } from './FilterPanelItem';
import Input from '../../../Components/Inputs/Input';
import FormErrors from '../../../Components/Form/FormErrors';

const DateRangeFilter = ({ buildQuery, filterQuery }) => {
  const { account } = useContext(AccountContext);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [originalFromDate, setOriginalFromDate] = useState();
  const [originalToDate, setOriginalToDate] = useState();
  const [error, setError] = useState();

  const setDates = (fd, td) => {
    buildQuery({ ...filterQuery, dateRange: [fd, td] });
  };

  const addFromDate = date => {
    setError();
    if (dateToIso(date) <= dateToIso(toDate)) {
      setFromDate(date);
      setDates(date, toDate);
      return;
    }
    setError('The "From" date may not be after the "To" date');
  };

  const addToDate = date => {
    setError();
    if (dateToIso(date) >= dateToIso(fromDate)) {
      setToDate(date);
      setDates(fromDate, date);
      return;
    }
    setError('The "To" date may not be before the "From" date');
  };

  useEffect(() => {
    if (account && originalFromDate === undefined && originalToDate === undefined) {
      const fromTo = [dateToIso(account.inclusive_dates[0]), dateToIso(account.inclusive_dates[1])];
      setFromDate(fromTo[0]);
      setToDate(fromTo[1]);
      setOriginalFromDate(fromTo[0]);
      setOriginalToDate(fromTo[1]);
    }

    if (filterQuery['dateRange'].length > 0) {
      setFromDate(filterQuery['dateRange'][0]);
      setToDate(filterQuery['dateRange'][1]);
    }
  }, [account]);

  return (
    <DateRangeFilterStyled data-cy="date_range_filter_input">
      <h3>From:</h3>
      <Input
        data-cy="date_from_input"
        type="date"
        onChange={e => addFromDate(e.target.value)}
        min={originalFromDate}
        max={toDate || originalToDate}
        value={fromDate}
      />
      <h3>To:</h3>
      <Input
        data-cy="date_to_input"
        type="date"
        onChange={e => addToDate(e.target.value)}
        min={fromDate || originalFromDate}
        max={originalToDate}
        value={toDate}
      />
      <FormErrors errors={[error]} />
    </DateRangeFilterStyled>
  );
};

const DateRangeFilterStyled = styled(FilterPanelItem)``;

export default DateRangeFilter;
