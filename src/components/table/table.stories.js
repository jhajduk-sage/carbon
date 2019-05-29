import React from 'react';
import { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import countriesList from '../../../demo/data/countries';
import Button from '../button';
import MultiActionButton from '../multi-action-button';
import TextArea from '../../__experimental__/components/textarea';
import {
  Table, TableCell, TableHeader, TableRow
} from '.';
import TextBox from '../../__experimental__/components/textbox';
import NumberInput from '../../__experimental__/components/number';
import Decimal from '../../__experimental__/components/decimal';
import DateInput from '../../__experimental__/components/date';
import { Select } from '../../__experimental__/components/select';
import classic from '../../style/themes/classic';
import small from '../../style/themes/small';
import OptionsHelper from '../../utils/helpers/options-helper';
import { notes, info } from './documentation';

const getCommonKnobs = () => {
  const paginate = boolean('paginate', false);

  return {
    sortOrder: select('sortOrder', ['', 'asc', 'desc'], ''),
    sortColumn: select('sortColumn', ['', 'name', 'code'], ''),
    pageSize: text('pageSize', '5'),
    selectable: boolean('selectable', false),
    highlightable: boolean('highlightable', false),
    shrink: boolean('shrink', false),
    caption: text('caption', 'Country and Country Codes'),
    totalRecords: text('totalRecords', '50'),
    paginate,
    showPageSizeSelection: paginate && boolean('showPageSizeSelection', false),
    theme: select(
      'theme',
      [
        OptionsHelper.tableThemes[0],
        OptionsHelper.tableThemes[1],
        OptionsHelper.tableThemes[2]
      ],
      Table.defaultProps.theme
    )
  };
};

const store = new Store({
  sortOrder: getCommonKnobs().sortOrder,
  sortedColumn: getCommonKnobs().sortedColumn,
  currentPage: '1',
  children: undefined
});

const handleChange = (e, tableOptions) => {
  const { sortOrder, sortedColumn, currentPage } = tableOptions;

  store.set({ sortOrder, sortedColumn, currentPage });
  action('change')(e, tableOptions);
};

const recordsForActivePage = (start, end) => {
  let records = countriesList;
  if (store.get('sortOrder') === 'desc' && store.get('sortedColumn').length) {
    records = records.reverse();
  }
  return records.slice(start, end).toJS();
};

const buildRows = ({ pageSize, totalRecords }) => {
  const currentPage = store.get('currentPage');
  const candidateIndex = pageSize * currentPage;

  const endIndex = (candidateIndex <= totalRecords) ? candidateIndex : totalRecords;
  const currentPageSize = (endIndex === totalRecords) ? (endIndex % pageSize) : pageSize;
  const startIndex = endIndex - currentPageSize;
  const rowsCountries = recordsForActivePage(startIndex, endIndex);

  return (
    <>
      <TableRow
        key='header'
        as='header'
        uniqueID='header'
      >
        <TableHeader
          sortable
          name='name'
          scope='col'
        >
        Country
        </TableHeader>
        <TableHeader
          sortable
          scope='col'
          name='code'
        >
        Code
        </TableHeader>
      </TableRow>
      {rowsCountries.map(row => (
        <TableRow
          key={ row.id }
          uniqueID={ row.id }
        >
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.value}</TableCell>
        </TableRow>
      ))}
  </>
  );
};

const pickInput = (name) => {
  const { inputTypes } = OptionsHelper;
  switch (name) {
    case inputTypes[1]:
      return <TextArea />;
    case inputTypes[2]:
      return <DateInput />;
    case inputTypes[3]:
      return <NumberInput />;
    case inputTypes[4]:
      return <Decimal />;
    case inputTypes[5]:
      return <Select />;
    default:
      return <TextBox />;
  }
};

const buildRowsWithInputs = ({ pageSize, totalRecords, inputType }) => {
  const currentPage = store.get('currentPage');
  const candidateIndex = pageSize * currentPage;

  const endIndex = (candidateIndex <= totalRecords) ? candidateIndex : totalRecords;
  const currentPageSize = (endIndex === totalRecords) ? (endIndex % pageSize) : pageSize;
  const startIndex = endIndex - currentPageSize;
  const rowsCountries = recordsForActivePage(startIndex, endIndex);

  return (
    <>
      <TableRow
        key='header'
        as='header'
        uniqueID='header'
      >
        <TableHeader
          sortable
          name='name'
          scope='col'
        >
        Country
        </TableHeader>
        <TableHeader
          sortable
          scope='col'
          name='code'
        >
        Code
        </TableHeader>
      </TableRow>
      {rowsCountries.map((row) => {
        return (
          <TableRow
            key={ row.id }
            uniqueID={ row.id }
          >
            <TableCell>{ pickInput(inputType)}
            </TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        );
      })}
  </>
  );
};

storiesOf('Table', module)
  .addParameters({
    info: {
      propTablesExclude: [State]
    }
  })
  .add('classic', () => {
    const props = getCommonKnobs();
    const theme = select(
      'theme',
      [
        OptionsHelper.tableThemes[0],
        OptionsHelper.tableThemes[1]
      ],
      Table.defaultProps.theme
    );

    store.set({ sortOrder: props.sortOrder });
    store.set({ sortedColumn: props.sortColumn });

    return (
      <ThemeProvider theme={ classic }>
        <State
          store={ store }
          parseState={ state => ({ ...state, children: buildRows(props) }) }
        >
          <Table
            actionToolbarChildren={ (context) => {
              return [
                <Button disabled={ context.disabled } key='single-action'>
                    Test Action
                </Button>,
                <MultiActionButton
                  text='Actions' disabled={ context.disabled }
                  key='multi-actions'
                >
                  <Button>foo</Button>
                  <Button>bar</Button>
                  <Button>qux</Button>
                </MultiActionButton>
              ];
            } }
            path='/countries'
            actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
            { ...props }
            onChange={ handleChange }
            theme={ theme }
            sortOrder={ store.sortOrder }
            sortedColumn={ store.sortedColumn }
          />
        </State>
      </ThemeProvider>
    );
  }, {
    info: { text: info },
    notes: { markdown: notes }
  })
  .add(
    'default',
    () => {
      const props = getCommonKnobs();
      props.size = select('size', OptionsHelper.tableSizes, Table.defaultProps.size);
      props.isZebra = boolean('zebra striping', false);

      store.set({ sortOrder: props.sortOrder });
      store.set({ sortedColumn: props.sortColumn });

      return (
        <ThemeProvider theme={ small }>
          <State
            store={ store }
            parseState={ state => ({ ...state, children: buildRows(props) }) }
          >
            <Table
              actionToolbarChildren={ (context) => {
                return [
                  <Button disabled={ context.disabled } key='single-action'>
                    Test Action
                  </Button>,
                  <MultiActionButton
                    text='Actions' disabled={ context.disabled }
                    key='multi-actions'
                  >
                    <Button>foo</Button>
                    <Button>bar</Button>
                    <Button>qux</Button>
                  </MultiActionButton>
                ];
              } }
              path='/countries'
              actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
              onChange={ handleChange }
              { ...props }
            />
          </State>
        </ThemeProvider>
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  )
  .add(
    'with inputs',
    () => {
      const props = getCommonKnobs();
      props.size = select('size', OptionsHelper.tableSizes, Table.defaultProps.size);
      props.isZebra = boolean('zebra striping', false);
      props.inputType = select('input type', OptionsHelper.inputTypes, OptionsHelper.inputTypes[0]);

      store.set({ sortOrder: props.sortOrder });
      store.set({ sortedColumn: props.sortColumn });


      return (
        <State
          store={ store }
          parseState={
            state => ({ ...state, children: buildRowsWithInputs(props) })
          }
        >
          <Table
            actionToolbarChildren={ (context) => {
              return [
                <Button disabled={ context.disabled } key='single-action'>
                    Test Action
                </Button>,
                <MultiActionButton
                  text='Actions' disabled={ context.disabled }
                  key='multi-actions'
                >
                  <Button>foo</Button>
                  <Button>bar</Button>
                  <Button>qux</Button>
                </MultiActionButton>
              ];
            } }
            path='/countries'
            actions={ { delete: { icon: 'bin' }, settings: { icon: 'settings' } } }
            onChange={ handleChange }
            { ...props }
          />
        </State>
      );
    },
    {
      info: { text: info },
      notes: { markdown: notes }
    },
  );
