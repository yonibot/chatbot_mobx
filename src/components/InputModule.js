import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import submitIcon from '../assets/submit_icon.png';
import {LIGHT_GRAY} from '../constants/fontSettings';
import PropTypes from 'prop-types';

const InputBackground = styled.div`
  height: 100%;
  background-color: ${LIGHT_GRAY};
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%
`;

const StyledInput = styled.input`
  flex: 0.8;
  height: 2rem;
  font-size: 1rem;
`;

const SubmitButton = styled.img.attrs ({
  src: submitIcon,
})`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

@observer
export class InputModule extends Component {
  @observable userInput = '';

  static propTypes = {
    onSubmitUserInput: PropTypes.func,
  };

  onSubmitUserInput = e => {
    e.preventDefault ();
    this.props.onSubmitUserInput (this.userInput);
    this.userInput = '';
  };

  render () {
    return (
      <InputBackground>
        <StyledForm {...{onSubmit: this.onSubmitUserInput}}>
          <StyledInput
            {...{
              value: this.userInput,
              onChange: t => (this.userInput = t.target.value),
            }}
          />
          <SubmitButton {...{onClick: this.onSubmitUserInput}} />
        </StyledForm>
      </InputBackground>
    );
  }
}
