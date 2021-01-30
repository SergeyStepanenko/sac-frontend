import axios from 'axios';

interface IItem {
  title: string;
  description: string;
}

const URL = 'https://sac-node-api.herokuapp.com/items';

export async function fetchItems(): Promise<IItem[]> {
  const { data } = await axios.request({
    url: URL,
    method: 'GET',
  });

  return data;
}

export async function deleteItem(id: string): Promise<IItem> {
  const { data } = await axios.request({
    url: URL,
    method: 'DELETE',
    data: { id },
  });

  return data;
}

export async function addItem(
  title: string,
  description: string,
): Promise<IItem> {
  const { data } = await axios.request({
    url: URL,
    method: 'POST',
    data: { title, description },
  });

  return data;
}
