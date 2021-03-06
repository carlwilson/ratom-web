import React from 'react';
import styled, { css } from 'styled-components';

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faQuestion,
  faSearch,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { lighten } from '../../../styles/styleUtils/lighten-darken';

const Input = ({ label, icon, onEnterKey, className, onIconClick, ...props }) => {
  let derivedIcon;
  switch (icon) {
    case 'search':
      derivedIcon = faSearch;
      break;
    case 'add':
      derivedIcon = faPlus;
      break;
    case 'chevronLeft':
      derivedIcon = faChevronLeft;
      break;
    case 'chevronRight':
      derivedIcon = faChevronRight;
      break;
    case 'question':
      derivedIcon = faQuestion;
      break;
    case 'calendar':
      derivedIcon = faCalendar;
      break;
    default:
      derivedIcon = faQuestion;
      break;
  }

  const handleKeyPressed = e => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      if (onEnterKey) onEnterKey();
    }
  };

  const handleIconClick = onIconClick || function() {};

  return (
    <FieldSetStyled className={className}>
      <LabelStyled>{label}</LabelStyled>
      <div style={{ position: 'relative' }}>
        <InputStyled {...props} type={props.type || 'text'} onKeyPress={handleKeyPressed} />
        {icon && (
          <IconStyled
            icon={derivedIcon}
            onClick={props.value ? handleIconClick : undefined}
            data-cy="button_icon"
            focusable
          />
        )}
      </div>
    </FieldSetStyled>
  );
};

export default Input;

const FieldSetStyled = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
  }
`;

const LabelStyled = styled.label`
  margin-bottom: 1rem;
`;

const InputStyled = styled.input`
  width: 100%;
  padding: 1rem 2rem;
  border: 2px solid ${props => props.theme.colorGrey};
`;

const IconStyled = styled(FontAwesomeIcon)`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;
  color: ${props => props.theme.colorPrimary};
  cursor: pointer;

  ${props => {
    if (props.onClick) {
      return css`
        &:hover {
          color: ${props => lighten(props.theme.colorPrimary)};
        }

        &:active {
          transform: translate(-1px, -45%);
        }
      `;
    }
  }}

  transition: all 0.1s linear;
`;
