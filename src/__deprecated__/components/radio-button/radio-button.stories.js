import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { classicThemeSelector } from '../../../../.storybook/theme-selectors';
import OptionsHelper from '../../../utils/helpers/options-helper';
import RadioButton from './radio-button';
import { notes, info } from './documentation';
import getDocGenInfo from '../../../utils/helpers/docgen-info';

RadioButton.__docgenInfo = getDocGenInfo(
  require('./docgenInfo.json'),
  /radio-button(?!spec)/
);

storiesOf('__deprecated__/Radio Button', module)
  .addParameters({
    chromatic: {
      disable: true
    }
  })
  .add(
    'classic',
    () => {
      const fieldHelp = text('fieldHelp', 'Additional information below the input.');
      const fieldHelpInline = boolean('fieldHelpInline', RadioButton.defaultProps.fieldHelpInline);
      const label = text('label', 'Example RadioButton');
      const labelInline = boolean('labelInline', false);
      const labelWidth = labelInline ? text('labelWidth', '') : undefined;
      const labelAlign = labelInline ? select('labelAlign', OptionsHelper.alignBinary, 'left') : undefined;
      const labelHelp = text('labelHelp', 'Example label help text');
      const inputWidth = text('inputWidth', '');

      return (
        <React.Fragment>
          <RadioButton
            key='first-button'
            fieldHelp={ fieldHelp }
            fieldHelpInline={ fieldHelpInline }
            inputWidth={ inputWidth }
            label={ label }
            labelAlign={ labelAlign }
            labelHelp={ labelHelp }
            labelInline={ labelInline }
            labelWidth={ labelWidth }
            name='radio-buttons-example'
          />
          <RadioButton
            key='second-button'
            fieldHelp={ fieldHelp }
            fieldHelpInline={ fieldHelpInline }
            inputWidth={ inputWidth }
            label={ label }
            labelAlign={ labelAlign }
            labelHelp={ labelHelp }
            labelInline={ labelInline }
            labelWidth={ labelWidth }
            name='radio-buttons-example'
          />
        </React.Fragment>
      );
    },
    {
      notes: { markdown: notes },
      info: {
        text: info,
        propTablesExclude: [React.Fragment]
      },
      themeSelector: classicThemeSelector
    }
  );