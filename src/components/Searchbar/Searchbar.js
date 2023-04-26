import {
  SearchbarBoxHeder,
  SearchbarBoxSearchForm,
  SearchbarBoxButton,
  SearchbarBoxSpan,
  SearchbarBoxInput,
} from './Searchbar.styled';
import { ReactComponent as IconInput } from '../../icons/searchIcon.svg';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useState } from 'react';

export default function Searchbar({ submit }) {
  const [query, setQuery] = useState('');
  //   const [page, setPage] = useState(1);

  const handleNameChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      Notify.failure('Введите что-то');
      return;
    }
    submit(query);
  };

  return (
    <SearchbarBoxHeder>
      <SearchbarBoxSearchForm onSubmit={handleSubmit}>
        <SearchbarBoxButton type="submit">
          <SearchbarBoxSpan>Search</SearchbarBoxSpan>
          <IconInput width="20px" height="20px" />
        </SearchbarBoxButton>

        <SearchbarBoxInput
          onChange={handleNameChange}
          value={query}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </SearchbarBoxSearchForm>
    </SearchbarBoxHeder>
  );
}

Searchbar.propTypes = {
  submit: PropTypes.func.isRequired,
};
