import React from 'react';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

describe('JSX', () => {
  it('calls React.createElement', () => {
    const createElementSpy = jest.spyOn(React, 'createElement');
    <h1>Hello, JSX!</h1>;
    expect(createElementSpy).toHaveBeenCalledWith('h1', null, 'Hello, JSX!');
  });
});