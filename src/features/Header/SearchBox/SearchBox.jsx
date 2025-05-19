import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "../../../shared/hooks/useForm";
import { usePixabay } from "../../../contexts/PixabayContext";
import "./SearchBox.css"

export const SearchBox = () => {
  const initialForm = {
    search: "",
  };

  const { startFetching } = usePixabay();
  const { formState, onInputChange } = useForm(initialForm);

  const { search } = formState;

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = `&q=${search}`;
    startFetching(query);
  };

  return (
    <form onSubmit={handleSubmit} className={`search`}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="search__icon" />
      <input
        className="search__input"
        type="text"
        placeholder="Search image..."
        name="search"
        value={search}
        onChange={onInputChange}
        autoComplete="off"
      />
    </form>
  );
};
