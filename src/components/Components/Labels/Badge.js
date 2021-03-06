import React from 'react';
import styled from 'styled-components';
import { colorBadgeBlue, colorBadgeGreen, colorBadgeRed } from '../../../styles/styleVariables';

import { darken, lighten } from '../../../styles/styleUtils/lighten-darken';
import { STATUSES } from '../../Containers/Accounts/AccountsList/AccountDetails';

const Badge = ({ name, remove, ...props }) => {
  return (
    <BadgeStyled {...props} data-cy="badge">
      <p>{name}</p>
      {remove && (
        <IconStyled onClick={remove} data-cy="badge_close">
          x
        </IconStyled>
      )}
    </BadgeStyled>
  );
};

const AutoCompleteBadge = ({ name, ...props }) => {
  return (
    <AutoCompleteBadgeStyled {...props} data-cy="badge">
      <p>{name}</p>
    </AutoCompleteBadgeStyled>
  );
};

const StatusBadge = ({ status, ...props }) => {
  return (
    <StatusBadgeStyled status={status} {...props} data-cy="status-badge">
      <p>{status}</p>
    </StatusBadgeStyled>
  );
};

const getBadgeColor = props => {
  let baseColor;
  switch (props.type) {
    case 'I':
      baseColor = colorBadgeGreen;
      break;
    case 'U':
      baseColor = colorBadgeBlue;
      break;
    case 'R':
      baseColor = colorBadgeRed;
      break;
    default:
      baseColor = colorBadgeBlue;
      break;
  }

  return props.isHighlighted ? lighten(baseColor) : baseColor;
};

const getStatusBadgeColor = props => {
  let baseColor;
  switch (props.status) {
    case STATUSES.CM:
      baseColor = colorBadgeGreen;
      break;
    case STATUSES.FA || STATUSES.RE:
      baseColor = colorBadgeRed;
      break;
    case STATUSES.CR:
      baseColor = colorBadgeBlue;
      break;
    default:
      baseColor = colorBadgeBlue;
      break;
  }

  return props.isHighlighted ? lighten(baseColor) : baseColor;
};

const AutoCompleteBadgeStyled = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 0 2px 2px 0;
  border-radius: 1px;

  p:first-of-type {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 1.5rem;

    color: ${props => props.theme.textColorLight};
    font-size: 1rem;
    font-weight: bold;
  }

  background-color: ${props => getBadgeColor(props)};
`;

const StatusBadgeStyled = styled(AutoCompleteBadgeStyled)`
  background-color: ${props => getStatusBadgeColor(props)};
  height: 18px;
`;

const BadgeStyled = styled.div`
  max-width: 100%;
  height: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  margin: 0 2px 2px 0;
  border-radius: 1px;

  p:first-of-type {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 1.5rem;

    color: ${props => props.theme.textColorLight};
    font-size: 1rem;
  }

  background-color: ${props => getBadgeColor(props)};
`;

const IconStyled = styled.p`
  color: ${props => props.theme.textColorLight};
  font-size: 1rem;
  margin-left: 1rem;
  align-self: center;
  cursor: pointer;
  padding-right: 0.6rem;

  &:hover {
    color: ${props => darken(props.theme.textColorLight)};
  }
`;

export { Badge, AutoCompleteBadge, StatusBadge };
