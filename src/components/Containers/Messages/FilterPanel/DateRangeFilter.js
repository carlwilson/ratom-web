import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

// Components
import { AccountContext } from '../MessagesMain';
import { FilterPanelItem } from './FilterPanelItem';
import Input from '../../../Components/Inputs/Input';

const DateRangeFilter = ({ buildQuery, filterQuery }) => {
  const { account } = useContext(AccountContext);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [originalFromDate, setOriginalFromDate] = useState();
  const [originalToDate, setOriginalToDate] = useState();

  const setDates = (fd, td) => {
    buildQuery({ ...filterQuery, dateRange: [fd, td] });
  };

  const setOriginalDates = (fd, td) => {
    buildQuery({ ...filterQuery, origDates: [fd, td] });
  };

  const addFromDate = date => {
    setFromDate(date);
    setDates(date, toDate);
  };

  const addToDate = date => {
    setToDate(date);
    setDates(fromDate, date);
  };

  useEffect(() => {
    if (account && originalFromDate === undefined && originalToDate === undefined) {
      const fromTo = [
        moment(account.inclusive_dates[0]).format('YYYY-MM-DD'),
        moment(account.inclusive_dates[1]).format('YYYY-MM-DD')
      ];
      setFromDate(fromTo[0]);
      setToDate(fromTo[1]);
      setOriginalFromDate(fromTo[0]);
      setOriginalToDate(fromTo[1]);
      setOriginalDates(fromTo[0], fromTo[1]);
    }

    if (filterQuery['dateRange'].length > 0) {
      setFromDate(filterQuery['dateRange'][0]);
      setToDate(filterQuery['dateRange'][1]);
      setOriginalFromDate(filterQuery['origDates'][0]);
      setOriginalToDate(filterQuery['origDates'][1]);
    }
  }, [account]);

  return (
    <DateRangeFilterStyled data-cy="date_range_filter_input">
      <h3>From:</h3>
      <Input
        data-cy="date_from_input"
        type="date"
        icon="calendar"
        onChange={e => addFromDate(e.target.value)}
        min={originalFromDate}
        max={originalToDate}
        value={fromDate}
      />
      <h3>To:</h3>
      <Input
        data-cy="date_to_input"
        type="date"
        icon="calendar"
        onChange={e => addToDate(e.target.value)}
        min={originalFromDate}
        max={originalToDate}
        value={toDate}
      />
    </DateRangeFilterStyled>
  );
};

const DateRangeFilterStyled = styled(FilterPanelItem)``;

export default DateRangeFilter;
