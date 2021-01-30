import React from 'react';
import { PageProps } from 'gatsby';
import { fetchItems, deleteItem, addItem } from '@/api/items';
import { encrypt, decrypt } from '@/utils/crypto';

const Home: React.FC<PageProps> = () => {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      setList(await fetchItems());
    })();
  }, []);

  const handleDelete = (id: string) => {
    (async () => {
      try {
        await deleteItem(id);
      } catch (error) {
        // TODO
      }

      setList((prevList) => prevList.filter((item) => item.id !== id));
    })();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { elements } = event.target as any;

    const title = elements.title.value;
    const description = elements.description.value;

    const item = await addItem(encrypt(title), encrypt(description));

    setList((prevList) => [...prevList, item]);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <input type="text" name="title" />
        </label>
        <label htmlFor="description">
          Description
          <input type="text" name="description" />
        </label>
        <button type="submit">submit</button>
      </form>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <span>{decrypt(item.title)}</span>{' '}
            <span>{decrypt(item.description)}</span>
            <button type="button" onClick={() => handleDelete(item.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;
